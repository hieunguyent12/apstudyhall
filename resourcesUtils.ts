import fs from "fs";
import { extname, join, parse } from "path";
import { remark } from "remark";
import html from "remark-html";
import mappings from "./resources/mappings";

export default async function markdownToHtml(markdown: string) {
  const result = await remark().use(html).process(markdown);
  return result.toString();
}

const resourcesDir = join(process.cwd(), "resources");

export async function getAllResources() {
  const allFiles = fs.readdirSync(resourcesDir);

  const mdxFiles = allFiles.filter((file) => extname(file) === ".mdx");

  const resources = [];

  for (let i = 0; i < mdxFiles.length; i++) {
    const file = mdxFiles[i];
    const fileName = parse(file).name;
    const fullPath = join(resourcesDir, file);
    const fileContent = fs.readFileSync(fullPath, "utf-8");

    const html = await markdownToHtml(fileContent);

    resources.push({
      name: mappings[fileName as keyof typeof mappings],
      content: html,
    });
  }

  return resources;
}
