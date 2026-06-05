import { For } from "solid-js";
import { Icon, ICON_LIST, ITEM_LIST, ITEM_COUNT } from "../../../src";
import {
  ApiTable,
  ApiRow,
  sectionStyle,
  sectionTitleStyle,
  tagStyle,
  CodeBlock,
  labelStyle,
} from "../../tools";

const ICON_API: ApiRow[] = [
  {
    prop: "name",
    desc: "图标名称（与 item 二选一）",
    type: "IconName",
    defaultVal: "-",
  },
  {
    prop: "item",
    desc: "物品图标编号（与 name 二选一）",
    type: "number",
    defaultVal: "-",
  },
  {
    prop: "size",
    desc: "图标尺寸",
    type: "number | string",
    defaultVal: "24",
  },
  {
    prop: "bounce",
    desc: "弹跳动画",
    type: "boolean",
    defaultVal: "false",
  },
  {
    prop: "class",
    desc: "自定义类名",
    type: "string",
    defaultVal: "-",
  },
  {
    prop: "style",
    desc: "自定义样式",
    type: "JSX.CSSProperties",
    defaultVal: "-",
  },
];

const IconDemo = () => (
  <div style={sectionStyle}>
    <div style={sectionTitleStyle}>
      Icon <span style={tagStyle}>10 icons</span>
    </div>
    <div style={labelStyle}>基础用法</div>
    <div style={{ display: "flex", gap: "20px", "flex-wrap": "wrap", "align-items": "center" }}>
      <Icon name="icon-miles" size={32} />
      <Icon name="icon-camera" size={32} />
      <Icon name="icon-chat" size={32} />
      <Icon name="icon-design" size={32} />
      <Icon name="icon-map" size={32} />
    </div>
    <div style={labelStyle}>size 尺寸</div>
    <div style={{ display: "flex", gap: "20px", "align-items": "center" }}>
      <Icon name="icon-miles" size={16} />
      <Icon name="icon-miles" size={24} />
      <Icon name="icon-miles" size={32} />
      <Icon name="icon-miles" size={48} />
    </div>
    <div style={labelStyle}>bounce 弹跳动画（鼠标悬停查看效果）</div>
    <div style={{ display: "flex", gap: "20px", "align-items": "center" }}>
      <Icon name="icon-miles" size={32} bounce />
      <Icon name="icon-camera" size={32} bounce />
      <Icon name="icon-chat" size={32} bounce />
    </div>
    <div style={labelStyle}>图标列表</div>
    <div
      style={{
        border: "1px solid #e8e2d6",
        "border-radius": "12px",
        overflow: "hidden",
        padding: "5px 16px",
        "margin-bottom": "20px",
      }}
    >
      <For each={ICON_LIST}>
        {(icon, index) => (
          <div
            style={{
              display: "flex",
              "align-items": "center",
              gap: "20px",
              padding: "12px 5px",
              "border-bottom": index() < ICON_LIST.length - 1 ? "1px dashed #f0e8d8" : "none",
              background: "#fff",
            }}
          >
            <Icon name={icon.name} size={32} />
            <span style={{ "font-size": "14px", color: "#725d42", "font-family": "inherit" }}>
              {icon.label}
            </span>
            <span
              style={{
                "margin-left": "auto",
                "font-size": "12px",
                color: "#a0936e",
                "font-family": "'SF Mono', 'Fira Code', Consolas, monospace",
              }}
            >
              {icon.name}
            </span>
          </div>
        )}
      </For>
    </div>
    <div style={sectionTitleStyle}>
      Items <span style={tagStyle}>{ITEM_COUNT} items</span>
    </div>
    <div style={labelStyle}>
      {ITEM_COUNT} 个物品图标。通过 <code>item</code> 编号引用。
    </div>
    <div style={{ display: "flex", gap: "12px", "align-items": "center", "flex-wrap": "wrap" }}>
      <Icon item={1} size={48} bounce />
      <Icon item={5} size={48} bounce />
      <Icon item={20} size={48} bounce />
      <Icon item={100} size={48} bounce />
      <Icon item={200} size={48} bounce />
      <Icon item={300} size={48} bounce />
      <Icon item={400} size={48} bounce />
      <Icon item={ITEM_LIST[ITEM_LIST.length - 1]} size={48} bounce />
    </div>
    <div style={labelStyle}>全部 {ITEM_COUNT} 个物品</div>
    <div
      style={{
        display: "grid",
        "grid-template-columns": "repeat(auto-fill, minmax(72px, 1fr))",
        gap: "8px",
        padding: "12px",
        background: "#fff",
        border: "1px solid #e8e2d6",
        "border-radius": "12px",
        "max-height": "550px",
        "overflow-y": "auto",
      }}
    >
      <For each={ITEM_LIST}>
        {(id) => (
          <div
            title={`item={${id}}`}
            style={{
              display: "flex",
              "flex-direction": "column",
              "align-items": "center",
              gap: "4px",
              padding: "10px 12px 4px 12px",
              background: "#faf6ec",
              "border-radius": "8px",
            }}
          >
            <Icon item={id} size={40} />
            <span
              style={{
                "font-size": "10px",
                color: "#a0936e",
                "font-family": "'SF Mono', 'Fira Code', Consolas, monospace",
              }}
            >
              {id}
            </span>
          </div>
        )}
      </For>
    </div>
    <CodeBlock
      code={`import { Icon } from 'animal-island-ui-solid';

const App = () => {
    return (
        <div>
            {/* 基础用法 */}
            <Icon name="icon-miles" size={32} />
            {/* 弹跳动画 */}
            <Icon name="icon-camera" size={48} bounce />
            {/* 物品图标 */}
            <Icon item={1} size={48} />
        </div>
    );
};

export default App;`}
    />
    <ApiTable rows={ICON_API} />
  </div>
);

export default IconDemo;
