import { NextResponse, type NextRequest } from "next/server";
import { chatModelGPT3P5 } from "@/lib/openai";

export async function POST(request: NextRequest) {
  console.log("POST /api/webpage/summarize");

  const data = await request.json();
  const webContent = data.webContent;

  console.log("web content is", webContent);

  // const companyShortDescription =
  //   "Aimeil diamond company which specializes in exporting industrial diamonds.";
  // const targetCompanyName = "3M international Inc";

  const text = `
  Please summarize the following content into bullets and only keep information which describes what this company does:

    ${webContent}
  `.trim();

  const chatModelResult = await chatModelGPT3P5.predict(text);

  console.log(chatModelResult);

  return NextResponse.json({ webSummary: chatModelResult });
}
