import type { IHighlight } from "./react-pdf-highlighter";

interface Props {
  highlights: Array<IHighlight>;
  resetHighlights: () => void;
  toggleDocument: () => void;
}

const updateHash = (highlight: IHighlight) => {
  document.location.hash = `highlight-${highlight.id}`;
};

declare const APP_VERSION: string;

export function Sidebar({
  highlights,
  toggleDocument,
  resetHighlights,
}: Props) {
  return (
    <div className="sidebar" style={{ width: "25vw" }}>
      <div className="description" style={{ padding: "1rem" }}>
        <h2 style={{ marginBottom: "1rem" }}>
          React PDF Highlighter
        </h2>
      </div>

      {/* <ul className="sidebar__highlights">
        {highlights.map((highlight, index) => (
          <li
            // biome-ignore lint/suspicious/noArrayIndexKey: This is an example app
            key={index}
            className="sidebar__highlight"
            onClick={() => {
              updateHash(highlight);
            }}
          >
            <div>
              <strong>{highlight.comment.text}</strong>
              {highlight.content.text ? (
                <blockquote style={{ marginTop: "0.5rem" }}>
                  {`${highlight.content.text.slice(0, 90).trim()}…`}
                </blockquote>
              ) : null}
              {highlight.content.image ? (
                <div
                  className="highlight__image"
                  style={{ marginTop: "0.5rem" }}
                >
                  <img src={highlight.content.image} alt={"Screenshot"} />
                </div>
              ) : null}
            </div>
            <div className="highlight__location">
              Page {highlight.position.pageNumber}
            </div>
          </li>
        ))}
      </ul> */}
      <ul className="sidebar__highlights">
        {highlights.map((highlight, index) => {
          const id = highlight.id ?? highlight.id ?? `hl-${index}`;
          const pageNumber = highlight.position?.pageNumber ?? "—";
          const mainContent = highlight.content?.text ?? "";
          const highlightedText = highlight.comment?.text ?? null;
          const imageSrc = highlight.content?.image ?? null;

          return (
            // biome-ignore lint/suspicious/noArrayIndexKey: This is an example app
            <li key={index} className="sidebar__highlight">
              <div className="highlight__meta-and-content">
                {/* PageNumber (bold blue underlined) - Content.text in normal format */}
                <div style={{ marginBottom: "0.25rem" }}>
                  <span
                    className="highlight__page"
                    style={{ fontWeight: "700", color: "blue", textDecoration: "underline", marginRight: "0.5rem" }}
                  >
                    Page {pageNumber}
                  </span>
                  <span className="highlight__content">{mainContent}</span>
                </div>

                <div style={{ marginTop: "0.5rem" }}>
                  {highlightedText ? (
                    <div className="highlight__selected-text" style={{ whiteSpace: "pre-wrap" }}>
                      {highlightedText}
                    </div>
                  ) : imageSrc ? (
                    <div className="highlight__image" style={{ marginTop: "0.25rem" }}>
                      <img src={imageSrc} alt="Highlighted screenshot" style={{ maxWidth: "100%", height: "auto" }} />
                    </div>
                  ) : null}
                </div>

                <div style={{ marginTop: "0.5rem" }}>
                  <button
                    type="button"
                    onClick={() => updateHash(highlight)}
                    className="highlight__id-btn"
                    style={{
                      background: "none",
                      border: "none",
                      padding: 0,
                      cursor: "pointer",
                      fontWeight: 700,
                      color: "orange",
                      textDecoration: "underline",
                    }}
                    aria-label={`Jump to highlight ${id}`}
                  >
                    [{id}]
                  </button>
                </div>
              </div>

              {/* small page label on the right (optional) */}
              <div className="highlight__location" aria-hidden style={{ marginTop: "0.5rem", color: "#666", fontSize: "0.9rem" }}>
                Page {pageNumber}
              </div>
            </li>
          );
        })}
      </ul>

    </div>
  );
}
