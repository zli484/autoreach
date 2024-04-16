import { NextResponse, type NextRequest } from "next/server";
import { chatModelGPT3P5 } from "@/lib/openai";
import { loadWeb } from "@/lib/loaders";

export async function POST(request: NextRequest) {
  console.log("POST /api/webpage/summarize");

  const data = await request.json();
  const source_url = data.targetCompanyURL;
  const loadedData = await loadWeb(source_url);

  const webContent = loadedData[0].pageContent;

  // const companyShortDescription =
  //   "Aimeil diamond company which specializes in exporting industrial diamonds.";
  // const targetCompanyName = "3M international Inc";

  const text = `
  Please summarize the following content into bullets and only keep information which describes what this company does:

  ${webContent}

  Remember to also provide Chinese translation.
  `.trim();

  const chatModelResult = await chatModelGPT3P5.predict(text);

  console.log(chatModelResult);

  return NextResponse.json({ webSummary: chatModelResult });
}
