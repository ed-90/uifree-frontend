import { useEffect, useRef } from 'react';

function ComponentPreview({ html, css }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Очищаем
    container.innerHTML = '';

    const shadow = container.attachShadow({ mode: 'open' });

    // 1. Базовый reset + изоляция
    const baseStyle = document.createElement('style');
    baseStyle.textContent = `
      :host {
        contain: content;
        display: block;
        content-visibility: auto;
        width: 100%;
        height: 100%;
      }

      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      button, input, select, textarea {
        font-family: inherit;
        font-size: inherit;
        line-height: inherit;
      }

      .preview-wrapper {
        width: 100%;
        height: 100%;
        min-height: 180px;
        position: relative;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        line-height: 1.5;
      }

      .preview-wrapper * {
        position: relative;
      }

      .preview-wrapper [style*="fixed"] {
        position: absolute !important;
      }
    `;
    shadow.appendChild(baseStyle);

    // 2. Пользовательский CSS
    if (css) {
      const style = document.createElement('style');
      style.textContent = css;
      shadow.appendChild(style);
    }

    // 3. HTML с правильной обёрткой
    const wrapper = document.createElement('div');
    wrapper.className = 'preview-wrapper';
    wrapper.innerHTML = html.trim();
    shadow.appendChild(wrapper);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [html, css]);

  return <div ref={containerRef} className="component-preview" />;
}

export default ComponentPreview;