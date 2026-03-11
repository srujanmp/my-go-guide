import { useEffect, useState } from "react";
import { sections } from "./data/sections";

const GO_KEYWORDS = new Set([
  "package", "import", "func", "return", "if", "else", "for", "range", "type", "struct",
  "var", "const", "interface", "map", "switch", "case", "default", "defer", "go", "chan", "select",
  "break", "continue", "fallthrough"
]);

const GO_TYPES = new Set(["string", "int", "float64", "bool", "error", "byte", "rune"]);

function colorizeGoLine(line, lineIndex) {
  const trimmed = line.trim();
  if (trimmed.startsWith("//")) {
    return <span key={lineIndex} style={{ color: "#8b949e" }}>{line}</span>;
  }

  const parts = line.split(/(`[^`]*`|"[^"]*"|\b)/);
  return (
    <span key={lineIndex}>
      {parts.map((part, idx) => {
        if (!part) return null;
        if (part.startsWith("\"") || part.startsWith("`")) {
          return <span key={idx} style={{ color: "#a5d6ff" }}>{part}</span>;
        }
        if (GO_KEYWORDS.has(part)) {
          return <span key={idx} style={{ color: "#ff7b72" }}>{part}</span>;
        }
        if (GO_TYPES.has(part)) {
          return <span key={idx} style={{ color: "#79c0ff" }}>{part}</span>;
        }
        if (/^[0-9]+$/.test(part)) {
          return <span key={idx} style={{ color: "#79c0ff" }}>{part}</span>;
        }
        return <span key={idx}>{part}</span>;
      })}
    </span>
  );
}

function renderGoCode(code) {
  const lines = (code ?? "").split("\n");
  return lines.map((line, idx) => (
    <span key={idx}>
      {colorizeGoLine(line, idx)}
      {idx < lines.length - 1 ? <br /> : null}
    </span>
  ));
}

export default function GoGuide() {
  const [activeSection, setActiveSection] = useState(0);
  const [activeLesson, setActiveLesson] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const section = sections?.[activeSection];
  const lesson = section?.lessons?.[activeLesson];
  const copy = async () => {
    if (!lesson?.code) return;
    if (!navigator?.clipboard?.writeText) return;
    await navigator.clipboard.writeText(lesson.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    const media = window.matchMedia("(max-width: 960px)");
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  if (!section || !lesson) {
    return null;
  }

  return (
    <div style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace", background: "#0d1117", minHeight: "100vh", color: "#e6edf3" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #161b22 0%, #0d1117 100%)", borderBottom: "1px solid #30363d", padding: "20px 32px", display: "flex", alignItems: "center", gap: "16px" }}>
        <div style={{ fontSize: "28px" }}>🐹</div>
        <div>
          <h1 style={{ margin: 0, fontSize: "20px", fontWeight: 700, color: "#58a6ff", letterSpacing: "-0.5px" }}>Go + Gin + Redis + Postgres + RabbitMQ</h1>
          <p style={{ margin: 0, fontSize: "12px", color: "#8b949e", marginTop: "2px" }}>Complete Beginner's Guide — Zero to Production</p>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: "8px" }}>
          {sections.map((s, i) => (
            <div key={s.id} style={{ width: "8px", height: "8px", borderRadius: "50%", background: i === activeSection ? s.color : "#30363d", transition: "all 0.2s" }} />
          ))}
        </div>
      </div>

      <div style={{ display: "flex", height: isMobile ? "auto" : "calc(100vh - 73px)", flexDirection: isMobile ? "column" : "row" }}>
        {/* Left sidebar — sections */}
        <div style={{ width: isMobile ? "100%" : "200px", background: "#161b22", borderRight: isMobile ? "none" : "1px solid #30363d", borderBottom: isMobile ? "1px solid #30363d" : "none", overflowY: "auto", flexShrink: 0, display: isMobile ? "grid" : "block", gridTemplateColumns: isMobile ? "repeat(2, minmax(0, 1fr))" : undefined }}>
          {sections.map((s, i) => (
            <div
              key={s.id}
              onClick={() => { setActiveSection(i); setActiveLesson(0); }}
              style={{
                padding: "14px 16px",
                cursor: "pointer",
                borderLeft: i === activeSection ? `3px solid ${s.color}` : "3px solid transparent",
                background: i === activeSection ? "#1c2128" : "transparent",
                transition: "all 0.15s",
              }}
            >
              <div style={{ fontSize: "18px", marginBottom: "4px" }}>{s.icon}</div>
              <div style={{ fontSize: "11px", fontWeight: 600, color: i === activeSection ? s.color : "#8b949e", textTransform: "uppercase", letterSpacing: "0.5px" }}>{s.title}</div>
            </div>
          ))}
        </div>

        {/* Middle — lesson list */}
        <div style={{ width: isMobile ? "100%" : "220px", background: "#0d1117", borderRight: isMobile ? "none" : "1px solid #30363d", borderBottom: isMobile ? "1px solid #30363d" : "none", overflowY: "auto", flexShrink: 0, maxHeight: isMobile ? "200px" : "none" }}>
          <div style={{ padding: "12px 16px", fontSize: "10px", fontWeight: 700, color: "#8b949e", textTransform: "uppercase", letterSpacing: "1px", borderBottom: "1px solid #21262d" }}>
            {section.icon} {section.title}
          </div>
          {section.lessons.map((l, i) => (
            <div
              key={i}
              onClick={() => setActiveLesson(i)}
              style={{
                padding: "12px 16px",
                cursor: "pointer",
                background: i === activeLesson ? "#161b22" : "transparent",
                borderLeft: i === activeLesson ? `2px solid ${section.color}` : "2px solid transparent",
                transition: "all 0.15s",
              }}
            >
              <div style={{ fontSize: "11px", color: i === activeLesson ? "#e6edf3" : "#8b949e", lineHeight: "1.4" }}>
                <span style={{ color: section.color, marginRight: "6px", opacity: 0.7 }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                {l.title}
              </div>
            </div>
          ))}
        </div>

        {/* Main content */}
        <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", minWidth: 0 }}>
          {/* Lesson header */}
          <div style={{ padding: isMobile ? "18px 16px 12px" : "24px 32px 16px", borderBottom: "1px solid #21262d" }}>
            <div style={{ fontSize: "11px", color: section.color, fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px" }}>
              {section.icon} {section.title} · Lesson {activeLesson + 1} of {section.lessons.length}
            </div>
            <h2 style={{ margin: 0, fontSize: "22px", fontWeight: 700, color: "#e6edf3" }}>{lesson.title}</h2>
          </div>

          {/* Explanation */}
          <div style={{ padding: isMobile ? "14px 16px 0" : "20px 32px 0", background: "#0d1117" }}>
            <div style={{
              background: "#161b22",
              border: `1px solid ${section.color}33`,
              borderLeft: `4px solid ${section.color}`,
              borderRadius: "6px",
              padding: "16px 20px",
              fontSize: "13px",
              lineHeight: "1.7",
              color: "#c9d1d9"
            }}>
              💡 {lesson.content}
            </div>
          </div>

          {/* Beginner support (every page) */}
          <div style={{ padding: "14px 32px 0", background: "#0d1117" }}>
            <div style={{
              background: "#111827",
              border: "1px solid #30363d",
              borderRadius: "8px",
              padding: "14px 16px"
            }}>
              <div style={{ fontSize: "11px", color: "#8b949e", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px" }}>
                Beginner Context
              </div>
              <div style={{ fontSize: "12px", lineHeight: "1.7", color: "#c9d1d9" }}>
                <div><strong style={{ color: "#e6edf3" }}>🎯 Lesson Goal:</strong> {support.lessonGoal}</div>
                <div style={{ marginTop: "6px" }}><strong style={{ color: "#e6edf3" }}>🧠 Mental Model:</strong> {support.mentalModel}</div>
                <div style={{ marginTop: "6px" }}><strong style={{ color: "#e6edf3" }}>🚀 Why it matters:</strong> {support.whyItMatters}</div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginTop: "12px" }}>
                <div style={{ background: "#0d1117", border: "1px solid #30363d", borderRadius: "6px", padding: "10px 12px" }}>
                  <div style={{ fontSize: "11px", color: section.color, fontWeight: 700, marginBottom: "6px" }}>🧪 Practice Tasks</div>
                  {support.practice.map((item, idx) => (
                    <div key={idx} style={{ fontSize: "11px", color: "#8b949e", lineHeight: "1.6" }}>• {item}</div>
                  ))}
                </div>
                <div style={{ background: "#0d1117", border: "1px solid #30363d", borderRadius: "6px", padding: "10px 12px" }}>
                  <div style={{ fontSize: "11px", color: "#f0883e", fontWeight: 700, marginBottom: "6px" }}>⚠️ Common Mistakes</div>
                  {support.pitfalls.map((item, idx) => (
                    <div key={idx} style={{ fontSize: "11px", color: "#8b949e", lineHeight: "1.6" }}>• {item}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Code block */}
          <div style={{ padding: isMobile ? "12px 16px 18px" : "16px 32px 32px", flex: 1 }}>
            <div style={{ background: "#161b22", border: "1px solid #30363d", borderRadius: "8px", overflow: "hidden" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 16px", borderBottom: "1px solid #30363d", background: "#1c2128" }}>
                <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                  <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ff5f57" }} />
                  <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ffbd2e" }} />
                  <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#28c840" }} />
                  <span style={{ marginLeft: "8px", fontSize: "11px", color: "#8b949e" }}>main.go</span>
                </div>
                <button
                  onClick={copy}
                  style={{
                    background: copied ? "#238636" : "#21262d",
                    border: `1px solid ${copied ? "#2ea043" : "#30363d"}`,
                    color: copied ? "#aff5b4" : "#8b949e",
                    padding: "4px 12px",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "11px",
                    fontFamily: "inherit",
                    transition: "all 0.2s"
                  }}
                >
                  {copied ? "✓ Copied!" : "Copy"}
                </button>
              </div>
              <pre style={{
                margin: 0,
                padding: "20px",
                overflowX: "auto",
                fontSize: isMobile ? "11.5px" : "12.5px",
                lineHeight: "1.7",
                color: "#e6edf3",
                background: "#0d1117",
                fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace"
              }}>
                <code>{renderGoCode(lesson.code)}</code>
              </pre>
            </div>
          </div>
        </div>

        {/* Right — navigation */}
        <div style={{ width: isMobile ? "100%" : "180px", background: "#161b22", borderLeft: isMobile ? "none" : "1px solid #30363d", borderTop: isMobile ? "1px solid #30363d" : "none", padding: "20px 16px", display: "flex", flexDirection: "column", gap: "8px", flexShrink: 0 }}>
          <div style={{ fontSize: "10px", fontWeight: 700, color: "#8b949e", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px" }}>Navigate</div>

          {/* Prev lesson */}
          <button
            onClick={() => {
              if (activeLesson > 0) setActiveLesson(l => l - 1);
              else if (activeSection > 0) { setActiveSection(s => s - 1); setActiveLesson(sections[activeSection - 1].lessons.length - 1); }
            }}
            disabled={activeSection === 0 && activeLesson === 0}
            style={{ background: "#21262d", border: "1px solid #30363d", color: "#c9d1d9", padding: "8px", borderRadius: "6px", cursor: "pointer", fontSize: "11px", fontFamily: "inherit", opacity: activeSection === 0 && activeLesson === 0 ? 0.4 : 1 }}
          >
            ← Previous
          </button>

          <button
            onClick={() => {
              if (activeLesson < section.lessons.length - 1) setActiveLesson(l => l + 1);
              else if (activeSection < sections.length - 1) { setActiveSection(s => s + 1); setActiveLesson(0); }
            }}
            disabled={activeSection === sections.length - 1 && activeLesson === section.lessons.length - 1}
            style={{ background: section.color, border: "none", color: "#fff", padding: "8px", borderRadius: "6px", cursor: "pointer", fontSize: "11px", fontFamily: "inherit", fontWeight: 600 }}
          >
            Next →
          </button>

          <div style={{ borderTop: "1px solid #30363d", marginTop: "12px", paddingTop: "12px" }}>
            <div style={{ fontSize: "10px", color: "#8b949e", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "1px" }}>Progress</div>
            {sections.map((s, si) => (
              <div key={s.id} style={{ marginBottom: "6px" }}>
                <div style={{ fontSize: "10px", color: si === activeSection ? s.color : "#8b949e", marginBottom: "3px" }}>{s.icon} {s.title}</div>
                <div style={{ display: "flex", gap: "2px" }}>
                  {s.lessons.map((_, li) => (
                    <div key={li} style={{
                      height: "3px", flex: 1, borderRadius: "2px",
                      background: si < activeSection || (si === activeSection && li <= activeLesson) ? s.color : "#30363d"
                    }} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div style={{ borderTop: "1px solid #30363d", marginTop: "8px", paddingTop: "12px" }}>
            <div style={{ fontSize: "10px", color: "#8b949e", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "1px" }}>Quick Tips</div>
            <div style={{ fontSize: "10px", color: "#8b949e", lineHeight: "1.6" }}>
              <div>🔑 Always handle errors</div>
              <div style={{ marginTop: "4px" }}>🔒 Use $1 $2 in SQL</div>
              <div style={{ marginTop: "4px" }}>⚡ Cache with Redis</div>
              <div style={{ marginTop: "4px" }}>📨 Async with MQ</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
