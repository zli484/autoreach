"use client";
import { Divider, Textarea } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { useState } from "react";
import { Spinner } from "@chakra-ui/react";
import Markdown from "react-markdown";
import InputSection from "./input";
import EmailDraftDisplay from "./emailDraftDisplay";
import WebSummaryDisplay from "./webSummaryDisplay";

export default function Recommendation() {
  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log("formData is", formData);
  };

  const [loading, setLoading] = useState(false);
  // const [webContent, setWebContent] = useState("");
  // const [webSummary, setWebSummary] = useState("");

  const [webSummary, setWebSummary] = useState("");

  const [formData, setFormData] = useState({
    companyName: "Luoyang Aimeil Diamond Co., Ltd",
    companyDescription:
      "Luoyang Aimeil Diamond Co., Ltd. was founded in 2011, owns a core expert team who used to work in the field of super abrasives material for more than 20 years.",
    productDescription: "",
    targetCompanyName: "",
    targetCompanyURL: "",
    draft: "",
  });

  const handleLoadWebInfo = async (e: any) => {
    // const formData = new FormData(e.target);
    e.preventDefault();
    setLoading(true);

    const webSummaryJSON = await fetch("/api/webpage/summarize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ targetCompanyURL: formData.targetCompanyURL }),
    }).then((res) => res.json());

    console.log("websummary is", webSummaryJSON.webSummary);
    setWebSummary(webSummaryJSON.webSummary);
  };

  const handleSubmitGenerateDraft = async (e: any) => {
    // const formData = new FormData(e.target);
    e.preventDefault();
    setLoading(true);
    console.log("formData is", formData);

    await handleLoadWebInfo(e);

    console.log("after handle load info, now formdata is", formData);
    console.log("after handle load info, now websummary is", webSummary);

    const response = await fetch("/api/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ formData, webSummary }),
    });

    const responseJson = await response.json();
    setFormData({ ...formData, draft: responseJson.draft });
    setLoading(false);
  };

  return (
    <div className="flex flex-col w-full space-y-3">
      <InputSection
        textChangeHandler={handleChange}
        submitHandler={handleSubmitGenerateDraft}
      />
      {loading ? (
        <div className="bg-white p-3 rounded-3xl">
          <Spinner size="xl" />
        </div>
      ) : (
        webSummary && (
          <div>
            <div className="bg-white p-3 mb-3 rounded-3xl">
              <EmailDraftDisplay emailDraft={formData.draft} />
            </div>
            <Divider />
            <div className="bg-white p-3 rounded-3xl">
              <WebSummaryDisplay summary={webSummary} />
            </div>
          </div>
        )
      )}
    </div>
  );
}
