import { blocksFromAnswer } from "../../utils/answerFormat";

function List({ ordered, items }) {
  const Tag = ordered ? "ol" : "ul";
  return (
    <Tag>
      {items.map((item, index) => (
        <li key={`${index}-${item}`}>{item}</li>
      ))}
    </Tag>
  );
}

export default function AnswerCopy({ text }) {
  const blocks = blocksFromAnswer(text);
  if (!blocks.length) return null;

  return (
    <div className="answer-copy">
      {blocks.map((block, index) =>
        block.type === "list" ? (
          <List key={index} ordered={block.ordered} items={block.items} />
        ) : (
          <p key={index}>{block.text}</p>
        ),
      )}
    </div>
  );
}
