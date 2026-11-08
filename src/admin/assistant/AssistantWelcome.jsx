import Icon from "../../components/Icon";
import { ASSISTANT } from "../../content/admin";

export default function AssistantWelcome({ onSelect }) {
  return (
    <div className="assistant-welcome">
      <p className="eyebrow">{ASSISTANT.welcome.startersLabel}</p>
      <div className="suggestion-grid">
        {ASSISTANT.suggestions.map((suggestion) => (
          <button key={suggestion} type="button" onClick={() => onSelect(suggestion)}>
            {suggestion}
            <Icon name="arrowRight" variant="soft" />
          </button>
        ))}
      </div>
    </div>
  );
}
