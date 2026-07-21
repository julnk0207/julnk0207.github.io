import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const BUFFER_API_URL = "https://api.buffer.com";
const slug = process.argv[2];
const dryRun = process.argv.includes("--dry-run");
const shouldWrite = process.argv.includes("--write");

if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
  throw new Error("Provide a valid post slug, such as: welcome");
}

const filename = path.join(process.cwd(), "content", "posts", `${slug}.md`);
if (!fs.existsSync(filename)) {
  throw new Error(`Post not found: ${filename}`);
}

const source = fs.readFileSync(filename, "utf8");
const { data } = matter(source);
const linkedin = data.linkedin;

if (!linkedin || typeof linkedin !== "object" || Array.isArray(linkedin)) {
  throw new Error(`${slug}: LinkedIn frontmatter is missing.`);
}
if (typeof linkedin.summary !== "string" || !linkedin.summary.trim()) {
  throw new Error(`${slug}: LinkedIn summary is empty.`);
}
if (typeof linkedin.postId === "string" && linkedin.postId.trim()) {
  throw new Error(`${slug}: a Buffer post ID is already recorded; refusing to create a duplicate.`);
}

if (dryRun) {
  console.log(`Dry run passed for ${slug} (${linkedin.summary.trim().length} summary characters).`);
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

const linkedInChannels = channels.filter((channel) =>
  String(channel.service).toLowerCase().includes("linkedin"),
);

if (linkedInChannels.length !== 1) {
  const available = channels
    .map((channel) => `${channel.displayName || channel.name} (${channel.service})`)
    .join(", ") || "none";
  throw new Error(
    `Expected exactly one LinkedIn channel, found ${linkedInChannels.length}. Available channels: ${available}`,
  );
}

const channel = linkedInChannels[0];
const draftData = await bufferRequest(`
  mutation CreateDraftPost {
    createPost(input: {
      text: ${JSON.stringify(linkedin.summary.trim())}
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
  const linkedinIndex = lines.findIndex((line) => line === "linkedin:");
  const nextTopLevelIndex = lines.findIndex(
    (line, index) => index > linkedinIndex && line && !line.startsWith(" "),
  );
  const blockEnd = nextTopLevelIndex === -1 ? lines.length : nextTopLevelIndex;
  const statusIndex = lines.findIndex(
    (line, index) => index > linkedinIndex && index < blockEnd && /^  status:/.test(line),
  );
  const postIdIndex = lines.findIndex(
    (line, index) => index > linkedinIndex && index < blockEnd && /^  postId:/.test(line),
  );

  if (linkedinIndex === -1 || statusIndex === -1 || postIdIndex === -1) {
    throw new Error("The Buffer draft was created, but its ID could not be recorded in frontmatter.");
  }

  lines[statusIndex] = "  status: review";
  lines[postIdIndex] = `  postId: ${JSON.stringify(result.post.id)}`;
  fs.writeFileSync(filename, lines.join("\n"));
}

console.log(
  `Created Buffer draft ${result.post.id} for ${channel.displayName || channel.name} and ${
    shouldWrite ? "recorded it" : "did not change the article"
  }.`,
);
