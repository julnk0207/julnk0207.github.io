import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const sourceDirectory = path.join(root, "Old Contents");
const destinationDirectory = path.join(root, "content", "posts");

const topicRules = [
  ["Database", /database|dbms|relational model|데이터베이스/i],
  ["SQL", /\bsql\b|\bselect\b|group by|order by|subquery/i],
  ["Python", /\bpython\b|파이썬/i],
  ["Pandas", /\bpandas\b/i],
  ["NumPy", /\bnumpy\b/i],
  ["TensorFlow", /\btensorflow\b|텐서플로/i],
  ["Keras", /\bkeras\b|케라스/i],
  ["Baseball Analytics", /baseball|wins above replacement|\bwar\b|야구/i],
  ["Ensemble Learning", /ensemble|stacking|random forest|xgboost|앙상블|랜덤 포레스트/i],
  ["Deep Learning", /deep learning|딥러닝|심층 신경망/i],
  ["Machine Learning", /machine learning|머신러닝/i],
  ["Neural Networks", /neural network|신경망/i],
  ["Linear Regression", /linear regression|선형 회귀/i],
  ["Logistic Regression", /logistic regression|로지스틱 회귀/i],
  ["Classification", /classification|분류/i],
  ["Optimization", /optimization|최적화|경사하강/i],
  ["Statistics", /statistics|statistical|\bstats\b|통계|가설검정|confidence interval/i],
  ["Data Science", /data science|데이터 사이언스|데이터 분석/i],
  ["Computer Vision", /computer vision|컴퓨터 비전|image recognition|이미지 인식|얼굴 인식/i],
  ["CNN", /\bcnn|convnet|convolutional|합성곱/i],
  ["RNN", /\brnn|recurrent|순환 신경망/i],
  ["NLP", /natural language processing|자연어 처리|\bnlp\b/i],
  ["Reinforcement Learning", /reinforcement learning|강화 학습/i],
  ["Clustering", /clustering|군집/i],
];

function field(source, name) {
  return source.match(new RegExp(`^${name}:\\s*(.+?)\\s*$`, "m"))?.[1]?.trim();
}

function isoDate(value, filename) {
  const parsed = new Date(`${value} 00:00:00 UTC`);
  if (Number.isNaN(parsed.getTime())) {
    throw new Error(`${filename}: invalid Created date: ${value}`);
  }
  return parsed.toISOString().slice(0, 10);
}

function slugify(value) {
  return value
    .normalize("NFKC")
    .toLocaleLowerCase("en-US")
    // GitHub Pages returns 404 for exported route directories containing
    // percent-encoded Unicode. Keep route segments portable and ASCII-only;
    // the source ID below still guarantees uniqueness when a Korean-only
    // title has no ASCII representation.
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90)
    .replace(/-+$/g, "");
}

function removeImageLinks(markdown) {
  return markdown
    .split("\n")
    .filter((line) => !/!\[[^\]]*\]\(/.test(line) && !/<img\b/i.test(line))
    .join("\n")
    .replace(/<figure\b[\s\S]*?<\/figure>/gi, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function plainText(markdown) {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/[*_~>#|]/g, " ")
    .replace(/^\s*[-+\d.)]+\s+/gm, "")
    .replace(/\s+/g, " ")
    .trim();
}

function descriptionFor(body, title, course) {
  const candidates = body
    .replace(/```[\s\S]*?```/g, "")
    .split(/\n\s*\n/)
    .map((block) => plainText(block))
    .filter((block) => block.length >= 45 && !/^https?:\/\//.test(block));
  const fallback = `${course}의 ${title} 내용을 정리한 학습 노트입니다.`;
  const text = candidates[0] || fallback;
  if (text.length <= 180) return text;
  const shortened = text.slice(0, 177).replace(/\s+\S*$/, "").trim();
  return `${shortened || text.slice(0, 177)}…`;
}

function tagsFor(title, course, body) {
  // References often mention tools that are incidental to the post. Prefer
  // the title, course, headings, and opening sections when assigning tags.
  const withoutReferences = body.split(/^##\s+(?:References|참고문헌)\s*$/im)[0];
  const searchable = `${title}\n${course}\n${withoutReferences.slice(0, 4_000)}`;
  const tags = [course];
  for (const [tag, pattern] of topicRules) {
    if (pattern.test(searchable) && !tags.includes(tag)) tags.push(tag);
    if (tags.length === 5) break;
  }
  return tags;
}

function frontmatter({ title, description, date, category, course, tags }) {
  return [
    "---",
    `title: ${JSON.stringify(`[${course}] ${title}`)}`,
    `description: ${JSON.stringify(description)}`,
    `date: ${date}`,
    `category: ${JSON.stringify(category)}`,
    `subcategory: ${JSON.stringify(course)}`,
    "tags:",
    ...tags.map((tag) => `  - ${JSON.stringify(tag)}`),
    "linkedin:",
    "  status: draft",
    '  summary: ""',
    '  postId: ""',
    "x:",
    "  status: draft",
    '  summary: ""',
    '  postId: ""',
    "---",
  ].join("\n");
}

const sourceFiles = fs.readdirSync(sourceDirectory)
  .filter((filename) => filename.endsWith(".md"))
  .sort((a, b) => a.localeCompare(b, "en"));

const generated = [];
const emptyBodies = [];
const inferredCategories = [];

for (const filename of sourceFiles) {
  const source = fs.readFileSync(path.join(sourceDirectory, filename), "utf8");
  const title = source.match(/^#\s+(.+?)\s*$/m)?.[1]?.trim();
  const course = field(source, "Course Name");
  const created = field(source, "Created");
  const explicitCategory = field(source, "Format");
  if (!title || !course || !created) {
    throw new Error(`${filename}: title, Course Name, and Created are required`);
  }

  // Personal notes predate the Format field; retain their declared course as
  // the category instead of inventing an unrelated publishing format.
  const category = explicitCategory || course;
  if (!explicitCategory) inferredCategories.push(filename);

  const sectionIndex = source.search(/^##\s+/m);
  const lastEditedMatch = source.match(/^Last edited:.*$/m);
  const bodyStart = sectionIndex !== -1
    ? sectionIndex
    : lastEditedMatch
      ? lastEditedMatch.index + lastEditedMatch[0].length
      : source.length;
  const body = removeImageLinks(source.slice(bodyStart));
  if (!body) emptyBodies.push(filename);

  const date = isoDate(created, filename);
  const sourceId = filename.match(/([a-f0-9]{32})\.md$/i)?.[1]?.slice(0, 8) || "post";
  const outputFilename = `${date}-${slugify(title) || "post"}-${sourceId}.md`;
  const description = descriptionFor(body, title, course);
  const tags = tagsFor(title, course, body);
  const output = `${frontmatter({ title, description, date, category, course, tags })}\n\n${body}${body ? "\n" : ""}`;

  for (const existingFilename of fs.readdirSync(destinationDirectory)) {
    if (existingFilename.endsWith(`-${sourceId}.md`) && existingFilename !== outputFilename) {
      fs.unlinkSync(path.join(destinationDirectory, existingFilename));
    }
  }
  fs.writeFileSync(path.join(destinationDirectory, outputFilename), output, "utf8");
  generated.push(outputFilename);
}

console.log(JSON.stringify({
  generated: generated.length,
  emptyBodies,
  inferredCategories,
}, null, 2));
