import { NextResponse, type NextRequest } from "next/server";
import { chatModelGPT4 } from "@/lib/openai";
import { chatModelGPT3P5 } from "@/lib/openai";

export async function POST(request: NextRequest) {
  console.log("POST /api/analyze");

  const data = await request.json();
  const productDescription = data.productDescription;
  const company = data.companyName;
  const companyDescription = data.companyDescription;
  const targetCompanyName = data.targetCompanyName;
  const targetCompanyWebSummary = data.targetCompanyWebSummary;

  console.log("product description is", productDescription);

  // const companyShortDescription =
  //   "Aimeil diamond company which specializes in exporting industrial diamonds.";
  // const targetCompanyName = "3M international Inc";

  const text = `
  Hi gpt, I need your help drafting a business outreach email for me to reach out to potential buyers in the U.S for my products based on the following information:

  company name: ${company}
  company description: ${companyDescription}
  product description: ${productDescription}
  customer company name: ${targetCompanyName}
  customer company description:: ${targetCompanyWebSummary}
  

  Keep it under 200 words. Thanks!
  `.trim();

  console.log("text is", text);

  const chatModelResult = await chatModelGPT3P5.predict(text);

  console.log(chatModelResult);

  return NextResponse.json({ draft: chatModelResult });
}
