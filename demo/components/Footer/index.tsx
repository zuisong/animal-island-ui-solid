import { Footer as FooterComponent } from "../../../src";
import {
  CodeBlock,
  ApiTable,
  ApiRow,
  sectionStyle,
  sectionTitleStyle,
  tagStyle,
  demoBodyStyle,
  labelStyle,
} from "../../tools";

const FooterDemo = () => {
  return (
    <div style={sectionStyle}>
      <div style={sectionTitleStyle}>
        Footer <span style={tagStyle}>底部装饰</span>
      </div>
      <div style={labelStyle}>
        Footer 组件 — 页面底部装饰图片，支持 tree（树）和 sea（海）两种类型。
      </div>
      <div style={{ ...demoBodyStyle, padding: "40px 0" }}>
        <div style={labelStyle}>tree 类型（默认）</div>
        <FooterComponent />
      </div>
      <div style={{ ...demoBodyStyle, padding: "40px 0" }}>
        <div style={labelStyle}>sea 类型</div>
        <FooterComponent type="sea" />
      </div>
      <CodeBlock
        code={`import { Footer } from 'animal-island-ui-solid';

const App = () => (
    <div>
        <Footer />
        <Footer type="sea" />
    </div>
);`}
      />
      <ApiTable rows={FOOTER_API} />
    </div>
  );
};

const FOOTER_API: ApiRow[] = [
  { prop: "type", desc: "Footer 类型", type: "'sea' | 'tree'", defaultVal: "'tree'" },
  { prop: "class", desc: "自定义类名", type: "string", defaultVal: "-" },
  { prop: "style", desc: "自定义样式", type: "JSX.CSSProperties", defaultVal: "-" },
];

export default FooterDemo;
