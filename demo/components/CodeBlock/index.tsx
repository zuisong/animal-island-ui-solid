import { CodeBlock } from "../../../src";
import {
  labelStyle,
  ApiTable,
  ApiRow,
  sectionStyle,
  sectionTitleStyle,
  tagStyle,
  demoBoxStyle,
  CodeBlock as CodeBlockBase,
} from "../../tools";

const CODEBLOCK_API: ApiRow[] = [
  { prop: "code", desc: "代码字符串", type: "string", defaultVal: "-", required: true },
  { prop: "style", desc: "自定义样式", type: "JSX.CSSProperties", defaultVal: "-" },
  { prop: "class", desc: "自定义类名", type: "string", defaultVal: "-" },
];

const CodeBlockDemo = () => {
  return (
    <div style={sectionStyle}>
      <div style={sectionTitleStyle}>
        CodeBlock <span style={tagStyle}>代码高亮</span>
      </div>
      <div style={labelStyle}>基础用法</div>
      <div style={demoBoxStyle}>
        <CodeBlock
          code={`import { Button } from 'animal-island-ui-solid';

const App = () => (
    <Button type="primary">按钮</Button>
);

export default App;`}
        />
      </div>

      <div style={labelStyle}>自定义样式</div>
      <div style={demoBoxStyle}>
        <CodeBlock
          code={`import { CodeBlock } from 'animal-island-ui-solid';

<CodeBlock
    code={codeString}
    style={{ 'border-radius': '5px', 'background-color': '#242c46ff' }}
    class="custom-code"
/>`}
          style={{ "border-radius": "5px", "background-color": "#242c46ff" }}
        />
      </div>
      <CodeBlockBase
        code={`import { CodeBlock } from 'animal-island-ui-solid';

const App = () => {
    return (
        <div>
            {/* 基础用法 */}
            <CodeBlock code={'...'} />
            {/* 自定义样式 */}
            <CodeBlock
                code={codeString}
                style={{ 'border-radius': '5px', 'background-color': '#242c46ff' }}
                class="custom-code"
            />
        </div>
    );
};

export default App;`}
      />

      <ApiTable rows={CODEBLOCK_API} />
    </div>
  );
};

export default CodeBlockDemo;
