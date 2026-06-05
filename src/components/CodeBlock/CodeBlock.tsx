import { merge, omit } from "solid-js";
import type { JSX } from "@solidjs/web";

const COLORS = {
  comment: "#6b5e50",
  string: "#a8d4a0",
  keyword: "#d4a0e0",
  solid: "#e06c75",
  component: "#80c0e0",
  func: "#61afef",
  prop: "#e8c87a",
  jsx: "#f0a870",
  operator: "#d4b896",
  number: "#a8d4a0",
  default: "#e8d5bc",
};

const codeBlockStyle: JSX.CSSProperties = {
  padding: "20px 24px",
  background: "#2b2118",
  border: "1px solid #3d3028",
  "border-radius": "20px",
  "font-size": "14px",
  "line-height": 1.7,
  "font-family": "'SF Mono', 'Fira Code', 'Cascadia Code', Consolas, monospace",
  "font-weight": 600,
  color: "#e8d5bc",
  "white-space": "pre",
  overflow: "auto",
  "tab-size": 4,
};

const highlightJSX = (code: string): JSX.Element[] => {
  const tokens: { start: number; end: number; color: string }[] = [];

  const addPattern = (regex: RegExp, color: string) => {
    let match;
    const re = new RegExp(
      regex.source,
      regex.flags.includes("g") ? regex.flags : regex.flags + "g",
    );
    while ((match = re.exec(code)) !== null) {
      tokens.push({
        start: match.index,
        end: match.index + match[0].length,
        color,
      });
    }
  };

  addPattern(/\/\*[\s\S]*?\*\//g, COLORS.comment);
  addPattern(/\/\/.*$/gm, COLORS.comment);
  addPattern(/`[^`]*`/g, COLORS.string);
  addPattern(/"[^"]*"/g, COLORS.string);
  addPattern(/'[^']*'/g, COLORS.string);
  addPattern(/<\/?[A-Z][\w.$]*/g, COLORS.jsx);
  addPattern(/<\/?[a-z][\w-]*/g, COLORS.jsx);
  addPattern(/\/?>/g, COLORS.jsx);
  addPattern(
    /\b(Solid|createSignal|createEffect|onSettled|onCleanup|createMemo|createUniqueId|useContext|splitProps|mergeProps|Show|For|Index|Switch|Match|Portal|Dynamic|Errored|lazy|Loading|Component|JSX|CSSProperties)\b/g,
    COLORS.solid,
  );
  addPattern(/\b(true|false)\b/g, COLORS.keyword);
  addPattern(/\b(null|undefined|void|NaN|Infinity)\b/gi, COLORS.keyword);
  addPattern(/\b\d+\.?\d*\b/g, COLORS.number);
  addPattern(
    /\b(import|from|as|export|default|const|let|var|function|return|if|else|for|while|switch|case|break|continue|try|catch|throw|finally|new|typeof|instanceof|async|await|type|interface)\b/gi,
    COLORS.keyword,
  );
  addPattern(/\b[A-Z][a-zA-Z0-9_$]*\b/g, COLORS.component);
  addPattern(/\b[a-z][a-zA-Z0-9_$]*\s*(?=\()/g, COLORS.func);
  addPattern(/\b[a-zA-Z_$][\w$]*\s*(?==)/g, COLORS.prop);
  addPattern(/>|===|!==|==|!=|<=|>=|&&|\|\||[+\-*/%=<>!&|^~?:]/g, COLORS.operator);
  addPattern(/[{}[\]();,]/g, COLORS.operator);

  tokens.sort((a, b) => a.start - b.start);

  const result: JSX.Element[] = [];
  let pos = 0;

  for (const token of tokens) {
    if (token.start < pos) continue;

    if (token.start > pos) {
      result.push(code.slice(pos, token.start) as any);
    }

    result.push(<span style={{ color: token.color }}>{code.slice(token.start, token.end)}</span>);
    pos = token.end;
  }

  if (pos < code.length) {
    result.push(code.slice(pos) as any);
  }

  return result;
};

export interface CodeBlockProps {
  /** 代码字符串 */
  code: string;
  /** 自定义样式 */
  style?: JSX.CSSProperties;
  /** 自定义类名 */
  class?: string;
  /** 自定义类名列表 */
  classList?: Record<string, boolean>;
}

export const CodeBlock = (props: CodeBlockProps) => {
  const merged = merge({}, props);
  const rest = omit(merged, "code", "style", "class", "classList");

  return (
    <pre
      style={{ ...codeBlockStyle, ...merged.style }}
      class={[merged.class, merged.classList]}
      {...rest}
    >
      {highlightJSX(merged.code)}
    </pre>
  );
};
