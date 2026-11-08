import { useCallback, useRef, useState } from "react";
import { ASSISTANT } from "../../content/admin";
import useAsyncData from "../../hooks/useAsyncData";
import { askResearchQuestion } from "../../services/researchService";
import { HEALTH_FALLBACK, getHealth } from "../../services/statusService";

const HEALTH_OPTIONS = { fallbackData: HEALTH_FALLBACK };

export default function useResearchAssistant() {
  const { data: health } = useAsyncData(getHealth, HEALTH_OPTIONS);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const nextId = useRef(1);
  const pending = useRef(null);

  const stop = useCallback(() => {
    pending.current?.abort();
    pending.current = null;
    setLoading(false);
  }, []);

  const askText = useCallback(async (raw) => {
    const submitted = raw.trim();
    if (!submitted || pending.current) return;
    const controller = new AbortController();
    pending.current = controller;
    setLoading(true);
    setQuestion("");
    try {
      const answer = await askResearchQuestion(submitted, { signal: controller.signal });
      setMessages((current) => [
        ...current,
        { id: String(nextId.current++), question: submitted, answer },
      ]);
    } catch (error) {
      if (error.name === "AbortError") return;
      setMessages((current) => [
        ...current,
        { id: String(nextId.current++), question: submitted, answer: ASSISTANT.unreachableAnswer },
      ]);
    } finally {
      if (pending.current === controller) pending.current = null;
      setLoading(false);
    }
  }, []);

  const ask = useCallback(
    (event) => {
      event.preventDefault();
      askText(question);
    },
    [askText, question],
  );

  const clearDraft = useCallback(() => setQuestion(""), []);

  const startOver = useCallback(() => {
    stop();
    setMessages([]);
    setQuestion("");
  }, [stop]);

  const remove = useCallback((id) => {
    setMessages((current) => current.filter((item) => item.id !== id));
  }, []);

  const edit = useCallback((id) => {
    setMessages((current) => {
      const index = current.findIndex((item) => item.id === id);
      if (index < 0) return current;
      setQuestion(current[index].question);
      return current.slice(0, index);
    });
  }, []);

  return {
    health,
    question,
    setQuestion,
    messages,
    loading,
    ask,
    askText,
    clearDraft,
    startOver,
    remove,
    edit,
    stop,
  };
}
