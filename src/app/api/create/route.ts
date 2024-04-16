import { NextResponse, type NextRequest } from "next/server";
import { chatModelGPT4 } from "@/lib/openai";
import { chatModelGPT3P5 } from "@/lib/openai";

export async function POST(request: NextRequest) {
  console.log("POST /api/analyze");

  const data = await request.json();

  console.log("data received in Analyze API is", data);

  const productDescription = data.formData.productDescription;
  const company = data.formData.companyName;
  const companyDescription = data.formData.companyDescription;
  const targetCompanyName = data.formData.targetCompanyName;
  const webSummary = data.webSummary;

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
  customer company description:: ${webSummary}

  Also provide Chinese translation.

  Keep it under 200 words (not including the translation). Thanks!
  `.trim();

  console.log("text is", text);

  const chatModelResult = await chatModelGPT3P5.predict(text);

  console.log(chatModelResult);

  return NextResponse.json({ draft: chatModelResult });
}
