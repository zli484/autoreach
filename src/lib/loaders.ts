import { CheerioWebBaseLoader } from "langchain/document_loaders/web/cheerio";

export async function loadWeb(url: string) {
  const loader = new CheerioWebBaseLoader(
    // "https://guide.wisc.edu/courses/comp_sci/"
    url
  );
  const data = await loader.load();

  return data;
}
