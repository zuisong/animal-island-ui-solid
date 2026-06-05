# 🏝 Animal-Island-UI-Solid

<div align="center">
    <img src="docs/img/readme-home.png" alt="animal-island-ui-solid" style="border-radius: 12px; width: 40%; display: block; margin: 0 auto;" />    
</div>
<div align="center">
A SolidJS UI component library inspired by Animal Crossing: New Horizons
</div>
<br/>
<div align="center">
    <a href="https://github.com/zuisong/animal-island-ui-solid/stargazers"><img src="https://img.shields.io/github/stars/zuisong/animal-island-ui-solid?style=flat-square" alt="Stars"></a>
    <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square" alt="License"></a>
    <a href="LICENSE"><img src="https://img.shields.io/npm/dm/animal-island-ui-solid.svg?style=flat-square" alt=""></a>
    <a href="https://github.com/zuisong/animal-island-ui-solid/releases"><img src="https://img.shields.io/github/v/tag/zuisong/animal-island-ui-solid?label=version&style=flat-square" alt="Version"></a>
</div>

<br/>
<p align="center">
    English | <a href="./docs/README.zh-CN.md">简体中文</a>
</p>

## Introduction

This project is a lightweight UI component library built with SolidJS + TypeScript. The design style is inspired by Nintendo's "Animal Crossing: New Horizons" game interface, created for personal front-end technical practice and component development learning.

All visual elements, layouts, icons, and animations are independently designed and implemented, without directly using any official Nintendo art materials, code, or resource files.

## Acknowledgements

This SolidJS port is based on and inspired by the original [animal-island-ui](https://github.com/guokaigdg/animal-island-ui) project. Thanks to the original project and its author for the design direction and implementation reference.

## 🎉 Vue Version

- [animal-island-vue](https://github.com/guokaigdg/animal-island-vue)

## Preview

- Online Preview (PC) [animal-island-ui-solid-pc](https://zuisong.github.io/animal-island-ui-solid/#/)
- Online Preview (Mobile) [animal-island-ui-solid-mobile](https://zuisong.github.io/animal-island-ui-solid/#/)

## 🚀 Use AI to Generate animal-island-ui-solid Pages (No Coding Needed)

Non-developer and don't want to write code yourself? Use [`PROMPT.md`](./PROMPT.md) — no npm, no build step.

**4 steps:**

1. Copy [`PROMPT.md`](./PROMPT.md) in full.
2. Paste into any AI tool (Cursor / Claude / ChatGPT / Gemini / DeepSeek) and send.
3. The AI asks what page you want — reply in one phrase (e.g. "personal blog", "product list", "FAQ").
4. Save the `index.html` it returns and double-click to preview.

## Installation

```bash
npm install animal-island-ui-solid
```

## Quick Start

> ⚠️ **Important**: Please make sure to import the styles with `import 'animal-island-ui-solid/style'`, otherwise the components will have no styles or fonts!

```tsx
import { Button, Card } from "animal-island-ui-solid";
import "animal-island-ui-solid/style";

function App() {
  return (
    <div>
      <Button type="primary">Start Adventure</Button>
      <Card color="app-blue">Welcome to the deserted island!</Card>
    </div>
  );
}
```

## Documentation

Complete reference for different scenarios:

| Document                                 | Purpose                                                                                                                                                         |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`PROMPT.md`](./PROMPT.md)               | 🚀 One-click prompt for non-developers — paste into Cursor / Claude / ChatGPT / v0 / Bolt / Lovable / Windsurf to generate animal-island-ui-solid-styled pages. |
| [`AI_USAGE.md`](./AI_USAGE.md)           | AI code assistant handbook - all component props, types and defaults word-for-word, 19 hard rules and copy-paste boilerplate, no invented APIs.                 |
| [`DESIGN_PROMPT.md`](./DESIGN_PROMPT.md) | Visual-style prompts for v0 / Figma AI / Midjourney / DALL-E, including color palette, fonts, size tables, Modal clip-path and prohibition list.                |
| [`skill/SKILL.md`](./skill/SKILL.md)     | Pixel-perfect style specification Skill - design tokens, all component CSS, Demo layout values, CSS variable templates and new component development checklist. |
| [`CONTRIBUTING.md`](./CONTRIBUTING.md)   | Contributing Guide                                                                                                                                              |

## Local Development

```bash
# Clone the repository
git clone https://github.com/zuisong/animal-island-ui-solid.git
cd animal-island-ui-solid

# Install dependencies
deno install

# Start Demo development server
deno task dev

# Build component library
deno task build

# Build Demo site
deno task build:demo
```

## Usage Cases

...
(omitted cases as they are mostly links and images)
...

## License

MIT
This project is released under the MIT open-source license, for learning use only. The author is not responsible for any legal issues or losses caused by the use of this library.
