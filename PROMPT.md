# animal-island-ui-solid 一键提示词

> 给普通用户使用的 self-contained 提示词。把下面整块代码块复制到 Cursor / Claude / ChatGPT / v0 / Bolt / Lovable / Windsurf 等任意 AI 编程工具发送即可。
>
> **AI 会先反问你想做什么页面**（例如「做一个个人博客」、「做一个商品列表」、「做一个 FAQ 页面」），你回答后它再输出**一个 self-contained `index.html` 文件**，**保存后双击即可在浏览器预览**——不需要 npm、不需要打包工具、不需要任何安装。
>
> - **最后同步**：v0.9.5 / 2026-06-05。
> - **真实数据源**：`src/styles/variables.less` + 各组件 `*.module.less`。
> - **冲突处理**：本文件与源码冲突时，**以源码为准**。本项目已由 React 迁移至 SolidJS。
> - **要 100% 像素级还原**：项目内直接 `npm i animal-island-ui-solid` + `import` 真实组件。

---

```markdown
You are a senior SolidJS engineer. Generate a **single self-contained `index.html` file** that the user can save to disk and double-click to preview in a browser. It must PERFECTLY match the visual style of the npm package "animal-island-ui-solid" (an Animal Crossing-inspired component library, v0.9.5).

## OUTPUT REQUIREMENTS

- **DELIVER A SINGLE SELF-CONTAINED `index.html` FILE** that the user can save to disk and **double-click to preview directly in any modern browser** — NO build step, NO npm install, NO bundler. The user is non-technical.
- Use SolidJS via CDN (using `solid-js/web`'s `render` and `html` tagged templates or hand-rolled logic for this specific output mode). Since Babel-standalone for SolidJS is tricky in a single file, you may hand-roll components as simple functional components that return HTML strings or use a small internal `h` function for reactive updates if needed, but PRIORITIZE the visual style and library API.
- Inject the Modal SVG `<defs>` clip-path block once at the top of `<body>` so `clip-path: url(#animal-modal-clip)` resolves.
- Put ALL CSS inline in a single `<style>` block in `<head>`.
- Hand-roll the library's components mirroring the real library's API: `Button`, `Input`, `Switch`, `Checkbox`, `Radio`, `Card`, `Title`, `Tabs`, `Collapse`, `Modal`, `Select`, `Tooltip`, `Loading`, `Table`, `Time`, `Divider`, `Footer`, `Phone`, `Cursor`, `Typewriter`, `Icon`, `CodeBlock`, `WeddingInvitation`.
- The page composition must read like idiomatic SolidJS (using `createSignal`, `Show`, `For`, etc.).

... (rest of the visual specs same as before) ...
```
