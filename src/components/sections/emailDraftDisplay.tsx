import Markdown from "react-markdown";
export default function EmailDraftDisplay({
  emailDraft,
}: {
  emailDraft: string;
}) {
  return (
    <div>
      <h1>Email Draft: </h1>
      <Markdown>{emailDraft}</Markdown>
    </div>
  );
}
