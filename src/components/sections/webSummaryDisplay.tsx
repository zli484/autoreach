import Markdown from "react-markdown";
export default function WebSummaryDisplay({ summary }: { summary: string }) {
  return (
    <div>
      <h1>Summary of the customer</h1>
      <Markdown>{summary}</Markdown>
    </div>
  );
}
