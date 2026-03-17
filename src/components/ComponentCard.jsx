import { useState } from "react";
import { Link } from "react-router-dom";
import ComponentPreview from "./ComponentPreview";
import "./ComponentCard.css";

function ComponentCard({ component }) {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    const code = `${component.html}\n\n<style>${component.css}</style>`;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="component-card">
      <div className="preview">
        <ComponentPreview html={component.html} css={component.css} />
      </div>
      
      <div className="card-footer">
        <Link to={`/component/${component.id}`} className="title">
          {component.title}
        </Link>
        <div className="tags">
          {component.tags?.slice(0, 2).map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
        <button
          className={`copy-btn ${copied ? "copied" : ""}`}
          onClick={copyCode}
        >
          {copied ? "✓" : "📋"}
        </button>
      </div>
    </div>
  );
}

export default ComponentCard;