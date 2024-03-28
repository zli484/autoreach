"use client";
import { Textarea } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { useState } from "react";
import { Spinner } from "@chakra-ui/react";
import Markdown from "react-markdown";
import InputSection from "./input";

export default function Recommendation() {
  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log("formData is", formData);
  };

  const [loading, setLoading] = useState(false);
  // const [webContent, setWebContent] = useState("");
  const [webSummary, setWebSummary] = useState("");

  const [formData, setFormData] = useState({
    companyName: "",
    companyDescription: "",
    productDescription: "",
    targetCompanyName: "",
    draft: "",
  });

  const handleLoadWebInfo = async (e: any) => {
    // const formData = new FormData(e.target);
    e.preventDefault();
    setLoading(true);

    // Pass the description of the job, and expect a list of skills required by the job
    const response = await fetch("/api/webpage/extract", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const responseJson = await response.json();

    console.log("responseJson is", responseJson);

    const webSummary = await fetch("/api/webpage/summarize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ webContent: responseJson.webContent }),
    });

    const webSummaryJson = await webSummary.json();

    console.log("webSummaryJson is", webSummaryJson);

    setWebSummary(webSummaryJson.webSummary);

    setLoading(false);
  };

  const handleSubmitGenerateDraft = async (e: any) => {
    // const formData = new FormData(e.target);
    e.preventDefault();
    setLoading(true);
    console.log("formData is", formData);

    // Pass the description of the job, and expect a list of skills required by the job
    const response = await fetch("/api/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const responseJson = await response.json();
    setFormData({ ...formData, draft: responseJson.draft });
    setLoading(false);
  };

  return (
    <div className="flex flex-col m-16 p-16 space-y-3">
      <div className="space-y-3">
        {/* <Textarea
          rows={10}
          name="jd"
          onChange={handleChange}
          placeholder="Place holder for job description"
          size="lg"
        />
        <Button colorScheme="blue" onClick={handleSubmitAnalyzeSkills}>
          Analyze Skills
        </Button> */}
        <InputSection
          textChangeHandler={handleChange}
          submitHandler={handleSubmitGenerateDraft}
        />
        <div className="">
          {loading ? (
            <Spinner size="xl" />
          ) : (
            <div className="space-y-3">
              <Markdown>{formData.draft}</Markdown>
            </div>
          )}
        </div>
      </div>
      {/* Load web content section */}
      <div>
        <ButtonGroup spacing="6">
          <Button
            colorScheme="blue"
            onClick={handleLoadWebInfo}
            isLoading={loading}
          >
            Load Web Info
          </Button>
        </ButtonGroup>
      </div>
      <div>
        <Markdown>{webSummary}</Markdown>
      </div>
    </div>
  );
}