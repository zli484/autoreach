import { NextResponse, type NextRequest } from "next/server";
import { loadWeb } from "@/lib/loaders";
import { Document } from "langchain/document";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { embedding } from "@/lib/openai";

let source_url = "https://www.actionsuper.com/";

export async function POST(request: NextRequest) {
  console.log("POST /api/webpage/extract");
  const data = await request.json();
  //   const splitDocs = data.splitDocs;

  const loadedData = await loadWeb(source_url);
  console.log("loadedData", loadedData);
  console.log("loadedData 2", loadedData[0].pageContent);

  return NextResponse.json({
    webContent: loadedData[0].pageContent,
    status: 200,
  });

  //   const relevantDocs = await vectorStore.similaritySearch(jd);
  //   console.log("relevantDocs", relevantDocs);

  //   return NextResponse.json({ courseRecommendation: answer });
}
