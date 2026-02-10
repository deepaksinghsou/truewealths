import { defaultContent } from "@/lib/default-content";
import { readCmsContent, writeCmsContent } from "@/lib/insforge";
import { CmsContent } from "@/types/cms";

let memoryContent: CmsContent = defaultContent;

export async function getCmsContent(): Promise<CmsContent> {
  try {
    const content = await readCmsContent();
    if (content) {
      memoryContent = content;
      return content;
    }
  } catch {
    return memoryContent;
  }
  return memoryContent;
}

export async function saveCmsContent(content: CmsContent): Promise<void> {
  memoryContent = content;
  try {
    await writeCmsContent(content);
  } catch {
    // fallback to in-memory if MCP is not configured.
  }
}
