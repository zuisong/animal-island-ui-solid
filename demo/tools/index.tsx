import { createSignal, onCleanup, For } from "solid-js";
import type { JSX } from "@solidjs/web";
import { CodeBlock as CodeBlockBase } from "../../src";

export const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = createSignal(window.innerWidth < breakpoint);

  const handler = () => setIsMobile(window.innerWidth < breakpoint);
  window.addEventListener("resize", handler);
  onCleanup(() => window.removeEventListener("resize", handler));

  return isMobile;
};

export interface ApiRow {
  prop: string;
  desc: string;
  type: string;
  defaultVal?: string;
  required?: boolean;
}

export const sectionStyle: JSX.CSSProperties = {
  "margin-bottom": "36px",
  padding: "24px",
  background: "#fff",
  "border-radius": "12px",
  border: "1px solid #e8e2d6",
};

export const sectionTitleStyle: JSX.CSSProperties = {
  "font-size": "18px",
  "font-weight": 600,
  color: "#725d42",
  display: "flex",
  "align-items": "center",
  gap: "8px",
};

export const tagStyle: JSX.CSSProperties = {
  "font-size": "10px",
  padding: "2px 8px",
  "border-radius": "20px",
  background: "#f0e8d8",
  color: "#a08060",
  "font-weight": 500,
};

export const labelStyle: JSX.CSSProperties = {
  "font-size": "14px",
  color: "#a0936e",
  "margin-top": "20px",
  "margin-bottom": "20px",
  "font-weight": 500,
};

export const textStyle: JSX.CSSProperties = {
  "font-size": "13px",
  color: "#8a7b66",
  margin: 0,
};

export const demoBodyStyle: JSX.CSSProperties = {
  display: "flex",
  "flex-direction": "column",
};

export const demoBoxStyle: JSX.CSSProperties = {
  "margin-top": "12px",
  padding: "16px",
  background: "#faf8f3",
  "border-radius": "12px",
  border: "1px solid #e8e2d6",
};

export const demoDashedBoxStyle: JSX.CSSProperties = {
  display: "flex",
  gap: "16px",
  "align-items": "center",
  "justify-content": "space-between",
  padding: "16px",
  background: "rgb(250, 248, 242)",
  border: "1px dashed rgb(224, 216, 200)",
  "border-radius": "18px",
};

const codeLabelStyle: JSX.CSSProperties = {
  "font-size": "14px",
  "font-weight": 600,
  color: "#e7e4e0",
  "margin-bottom": 0,
  padding: "6px 12px",
  background: "#3d3028",
  "border-radius": "10px 10px 0 0",
  display: "inline-block",
};

export const ApiTable = (props: { rows: ApiRow[] }) => (
  <div style={{ "margin-top": "24px" }}>
    <div style={codeLabelStyle}>API</div>
    <div
      style={{
        background: "#2b2118",
        "border-radius": "0 20px 20px 20px",
        overflow: "hidden",
      }}
    >
      <table
        style={{
          width: "100%",
          "border-collapse": "collapse",
          "font-size": "13px",
        }}
      >
        <thead>
          <tr
            style={{
              background: "#3d3028",
              color: "#e8d5bc",
            }}
          >
            <th style={{ padding: "10px 16px", "text-align": "left", "font-weight": 600 }}>属性</th>
            <th style={{ padding: "10px 16px", "text-align": "left", "font-weight": 600 }}>说明</th>
            <th style={{ padding: "10px 16px", "text-align": "left", "font-weight": 600 }}>类型</th>
            <th style={{ padding: "10px 16px", "text-align": "left", "font-weight": 600 }}>
              默认值
            </th>
          </tr>
        </thead>
        <tbody>
          <For each={props.rows}>
            {(row) => (
              <tr
                style={{
                  color: "#c8bba8",
                  "border-top": "1px solid #3d3028",
                }}
              >
                <td style={{ padding: "10px 16px" }}>
                  <span style={{ color: "#e8c87a" }}>{row.prop}</span>
                  {row.required && (
                    <span style={{ color: "#f0a870", "margin-left": "4px" }}>*</span>
                  )}
                </td>
                <td style={{ padding: "10px 16px" }}>{row.desc}</td>
                <td style={{ padding: "10px 16px", color: "#d4a0e0" }}>{row.type}</td>
                <td style={{ padding: "10px 16px", color: "#a8d4a0" }}>{row.defaultVal}</td>
              </tr>
            )}
          </For>
        </tbody>
      </table>
    </div>
  </div>
);

export const CodeBlock = (props: { code: string }) => (
  <div style={{ "margin-top": "36px" }}>
    <div style={codeLabelStyle}>使用示例</div>

    <CodeBlockBase
      style={{
        "margin-top": 0,
        "border-radius": "0 20px 20px 20px",
      }}
      code={props.code}
    />
  </div>
);
