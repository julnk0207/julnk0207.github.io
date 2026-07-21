import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const BUFFER_API_URL = "https://api.buffer.com";
const slug = process.argv[2];
const platform = process.argv[3];
const dryRun = process.argv.includes("--dry-run");
const shouldWrite = process.argv.includes("--write");

const PLATFORM_CONFIG = {
  linkedin: {
    label: "LinkedIn",
    summaryLimit: 3_000,
    matchesService: (service) => service.includes("linkedin"),
  },
  x: {
    label: "X",
    summaryLimit: 280,
    matchesService: (service) => service === "x" || service.includes("twitter"),
  },
};

if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
  throw new Error("Provide a valid post slug, such as: welcome");
}
if (!Object.hasOwn(PLATFORM_CONFIG, platform)) {
  throw new Error("Choose a platform: linkedin or x");
}

const platformConfig = PLATFORM_CONFIG[platform];

const filename = path.join(process.cwd(), "content", "posts", `${slug}.md`);
if (!fs.existsSync(filename)) {
  throw new Error(`Post not found: ${filename}`);
}

const source = fs.readFileSync(filename, "utf8");
const { data } = matter(source);
const social = data[platform];

if (!social || typeof social !== "object" || Array.isArray(social)) {
  throw new Error(`${slug}: ${platformConfig.label} frontmatter is missing.`);
}
if (typeof social.summary !== "string" || !social.summary.trim()) {
  throw new Error(`${slug}: ${platformConfig.label} summary is empty.`);
}
if (social.summary.length > platformConfig.summaryLimit) {
  throw new Error(
    `${slug}: ${platformConfig.label} summary exceeds ${platformConfig.summaryLimit} characters.`,
  );
}
if (typeof social.postId === "string" && social.postId.trim()) {
  throw new Error(
    `${slug}: a ${platformConfig.label} Buffer post ID is already recorded; refusing to create a duplicate.`,
  );
}

if (dryRun) {
  console.log(
    `Dry run passed for ${slug} on ${platformConfig.label} (${social.summary.trim().length} summary characters).`,
  );
  process.exit(0);
}

const apiKey = process.env.BUFFER_API_KEY;
if (!apiKey) {
  throw new Error("BUFFER_API_KEY is not configured.");
}

async function bufferRequest(query) {
  const response = await fetch(BUFFER_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });

  const body = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(`Buffer returned HTTP ${response.status}.`);
  }
  if (!body) {
    throw new Error("Buffer returned an unreadable response.");
  }
  if (Array.isArray(body.errors) && body.errors.length > 0) {
    throw new Error(`Buffer API error: ${body.errors.map((error) => error.message).join("; ")}`);
  }
  return body.data;
}

const organizationData = await bufferRequest(`
  query GetOrganizations {
    account {
      organizations {
        id
        name
      }
    }
  }
`);

const organizations = organizationData?.account?.organizations ?? [];
if (organizations.length === 0) {
  throw new Error("No Buffer organization is available to this API key.");
}

const channels = [];
for (const organization of organizations) {
  const channelData = await bufferRequest(`
    query GetChannels {
      channels(input: { organizationId: ${JSON.stringify(organization.id)} }) {
        id
        name
        displayName
        service
      }
    }
  `);
  for (const channel of channelData?.channels ?? []) {
    channels.push({ ...channel, organizationName: organization.name });
  }
}

const platformChannels = channels.filter((channel) =>
  platformConfig.matchesService(String(channel.service).toLowerCase()),
);

if (platformChannels.length !== 1) {
  const available = channels
    .map((channel) => `${channel.displayName || channel.name} (${channel.service})`)
    .join(", ") || "none";
  throw new Error(
    `Expected exactly one ${platformConfig.label} channel, found ${platformChannels.length}. Available channels: ${available}`,
  );
}

const channel = platformChannels[0];
const draftData = await bufferRequest(`
  mutation CreateDraftPost {
    createPost(input: {
      text: ${JSON.stringify(social.summary.trim())}
      channelId: ${JSON.stringify(channel.id)}
      schedulingType: automatic
      mode: addToQueue
      saveToDraft: true
    }) {
      ... on PostActionSuccess {
        post {
          id
          text
        }
      }
      ... on MutationError {
        message
      }
    }
  }
`);

const result = draftData?.createPost;
if (!result?.post?.id) {
  throw new Error(`Buffer did not create the draft: ${result?.message ?? "unknown error"}`);
}

if (shouldWrite) {
  const lines = source.split("\n");
  const platformIndex = lines.findIndex((line) => line === `${platform}:`);
  const nextTopLevelIndex = lines.findIndex(
    (line, index) => index > platformIndex && line && !line.startsWith(" "),
  );
  const blockEnd = nextTopLevelIndex === -1 ? lines.length : nextTopLevelIndex;
  const statusIndex = lines.findIndex(
    (line, index) => index > platformIndex && index < blockEnd && /^  status:/.test(line),
  );
  const postIdIndex = lines.findIndex(
    (line, index) => index > platformIndex && index < blockEnd && /^  postId:/.test(line),
  );

  if (platformIndex === -1 || statusIndex === -1 || postIdIndex === -1) {
    throw new Error("The Buffer draft was created, but its ID could not be recorded in frontmatter.");
  }

  lines[statusIndex] = "  status: review";
  lines[postIdIndex] = `  postId: ${JSON.stringify(result.post.id)}`;
  fs.writeFileSync(filename, lines.join("\n"));
}

console.log(
  `Created ${platformConfig.label} Buffer draft ${result.post.id} for ${channel.displayName || channel.name} and ${
    shouldWrite ? "recorded it" : "did not change the article"
  }.`,
);
