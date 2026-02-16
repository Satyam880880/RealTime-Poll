import { useState } from "react";
import { createPoll } from "../api";

export default function CreatePoll() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [shareLink, setShareLink] = useState("");

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => setOptions([...options, ""]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await createPoll({ question, options });
    setShareLink(res.data.shareLink);
  };

  return (
    <div className="container">
      <h2>Create a Poll</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            placeholder="Enter question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
        </div>

        {options.map((opt, i) => (
          <div className="form-group" key={i}>
            <input
              placeholder={`Option ${i + 1}`}
              value={opt}
              onChange={(e) => handleOptionChange(i, e.target.value)}
              required
            />
          </div>
        ))}

        <button type="button" className="secondary-btn" onClick={addOption}>
          Add Option
        </button>

        <button type="submit">Create Poll</button>
      </form>

      {shareLink && (
        <div className="share-section">
          <p>Share this link:</p>
          <a href={shareLink} className="share-link">
            {shareLink}
          </a>
        </div>
      )}
    </div>
  );
}
