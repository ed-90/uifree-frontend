import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getComponentById } from "../api";
import ComponentPreview from "../components/ComponentPreview";
import "./ComponentPage.css";

function ComponentPage() {
  const { id } = useParams();
  const [component, setComponent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copiedHtml, setCopiedHtml] = useState(false);
  const [copiedCss, setCopiedCss] = useState(false);
  const [activeTab, setActiveTab] = useState("preview");

  useEffect(() => {
    loadComponent();
  }, [id]);

  const loadComponent = async () => {
    setLoading(true);
    try {
      const data = await getComponentById(id);
      setComponent(data);
    } catch (error) {
      console.error("Ошибка загрузки компонента:", error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === "html") {
      setCopiedHtml(true);
      setTimeout(() => setCopiedHtml(false), 2000);
    } else if (type === "css") {
      setCopiedCss(true);
      setTimeout(() => setCopiedCss(false), 2000);
    }
  };

  if (loading) {
    return <div className="loading">Загрузка компонента...</div>;
  }

  if (!component) {
    return <div className="error">Компонент не найден</div>;
  }

  return (
    <div className="component-page">
      <div className="container">
        <div className="page-header">
          <h1>{component.title}</h1>
          <div className="tags">
            {component.tags?.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
          <p className="description">{component.description}</p>
        </div>

        <div className="tabs">
          <button
            className={`tab ${activeTab === "preview" ? "active" : ""}`}
            onClick={() => setActiveTab("preview")}
          >
            Preview
          </button>
          <button
            className={`tab ${activeTab === "html" ? "active" : ""}`}
            onClick={() => setActiveTab("html")}
          >
            HTML
          </button>
          <button
            className={`tab ${activeTab === "css" ? "active" : ""}`}
            onClick={() => setActiveTab("css")}
          >
            CSS
          </button>
        </div>

        <div className="tab-content">
          {activeTab === "preview" && component && (
            <div className="preview-area">
              <ComponentPreview 
                html={component.html} 
                css={component.css} 
              />
            </div>
          )}

          {activeTab === "html" && component && (
            <div className="code-area">
              <button
                className="copy-code-btn"
                onClick={() => copyToClipboard(component.html, "html")}
              >
                {copiedHtml ? "✓ Скопировано!" : "📋 Копировать HTML"}
              </button>
              <pre className="code-block">{component.html}</pre>
            </div>
          )}

          {activeTab === "css" && component && (
            <div className="code-area">
              <button
                className="copy-code-btn"
                onClick={() => copyToClipboard(component.css, "css")}
              >
                {copiedCss ? "✓ Скопировано!" : "📋 Копировать CSS"}
              </button>
              <pre className="code-block">{component.css}</pre>
            </div>
          )}
        </div>

        <div className="similar-section">
          <h2>Похожие компоненты</h2>
          <p className="soon">Скоро здесь будут рекомендации</p>
        </div>
      </div>
    </div>
  );
}

export default ComponentPage;