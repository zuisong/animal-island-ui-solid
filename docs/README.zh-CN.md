# 🏝 Animal-Island-UI-Solid

<div align="center">
    <img src="../docs/img/readme-home.png" alt="animal-island-ui-solid" style="border-radius: 12px; width: 40%; display: block; margin: 0 auto;" />    
</div>
<div align="center">
一款参考《动物森友会》风格的 SolidJS UI 组件库
</div>
<br/>
<div align="center">
    <a href="https://github.com/guokaigdg/animal-island-ui-solid/stargazers"><img src="https://img.shields.io/github/stars/guokaigdg/animal-island-ui-solid?style=flat-square" alt="Stars"></a>
    <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square" alt="License"></a>
    <a href="LICENSE"><img src="https://img.shields.io/npm/dm/animal-island-ui-solid.svg?style=flat-square" alt=""></a>
    <a href="https://github.com/guokaigdg/animal-island-ui-solid/releases"><img src="https://img.shields.io/github/v/tag/guokaigdg/animal-island-ui-solid?label=version&style=flat-square" alt="Version"></a>
    <a href="https://gitcode.com/guokaigdg/animal-island-ui-solid"><img src="https://gitcode.com/guokaigdg/animal-island-ui-solid/star/badge.svg" alt="Stars"></a>
</div>
<br/>
<div align="center">
    <a href="https://hellogithub.com/repository/guokaigdg/animal-island-ui-solid" target="_blank"><img src="https://api.hellogithub.com/v1/widgets/recommend.svg?rid=98ecff41d142466d8d72694a6fadf9e9&claim_uid=pyGqTPIRMdo7fBS&theme=neutral" alt="Featured｜HelloGitHub" style="width: 250px; height: 54px;" width="250" height="54" /></a>
</div>

<br/>
<p align="center">
    <a href="../README.md">English</a> | 简体中文
</p>


## 简介

本项目是基于 SolidJS + TypeScript 实现的轻量 UI 组件库，设计风格灵感来源于任天堂《集合啦！动物森友会》游戏界面，用于个人前端技术练习与组件化开发学习。

所有视觉元素、布局、图标及动画效果均由独立设计并实现，未直接使用任天堂官方任何美术素材、代码或资源文件。

## 🎉 Vue 版本

- [animal-island-vue](https://github.com/guokaigdg/animal-island-vue)

## 预览

- 在线预览 (PC) [animal-island-ui-solid-pc](https://guokaigdg.github.io/animal-island-ui-solid/#/)
- 在线预览 (Mobile) [animal-island-ui-solid-mobile](https://guokaigdg.github.io/animal-island-ui-solid/#/)

## 🚀 使用 AI 生成 animal-island-ui-solid 页面（无需编码）

如果你不是开发者，或者不想手动写代码，可以使用 [`PROMPT.md`](../PROMPT.md) — 无需安装 npm，无需构建步骤。

**只需 4 步：**

1. 全选并复制 [`PROMPT.md`](../PROMPT.md) 的内容。
2. 粘贴到任何 AI 工具（Cursor / Claude / ChatGPT / Gemini / DeepSeek）并发送。
3. AI 会询问你想要什么样的页面 — 用一句话回复（例如“个人博客”、“产品列表”、“常见问题解答”）。
4. 保存它返回的 `index.html` 并双击预览。

## 安装

```bash
npm install animal-island-ui-solid
```



## 快速上手

> ⚠️ **重要提示**：请务必使用 `import 'animal-island-ui-solid/style'` 导入样式，否则组件将没有样式或字体！

```tsx
import { Button, Card } from 'animal-island-ui-solid';
import 'animal-island-ui-solid/style';

function App() {
    return (
        <div>
            <Button type="primary">开始冒险</Button>
            <Card color="app-blue">
                欢迎来到无人岛！
            </Card>
        </div>
    );
}
```

## 文档

针对不同场景的完整参考：

| 文档 | 用途 |
|---|---|
| [`PROMPT.md`](../PROMPT.md) | 🚀 针对非开发者的“一键提示词” — 粘贴到 Cursor / Claude / ChatGPT / v0 / Bolt / Lovable / Windsurf 即可生成 animal-island-ui-solid 风格的页面。 |
| [`AI_USAGE.md`](../AI_USAGE.md) | AI 编码助手手册 — 逐字逐句列出所有组件属性、类型和默认值，19 条硬性规则和可直接复制的代码模板，杜绝 AI 捏造 API。 |
| [`DESIGN_PROMPT.md`](../DESIGN_PROMPT.md) | 针对 v0 / Figma AI / Midjourney / DALL-E 的视觉风格提示词，包含配色方案、字体、尺寸表、Modal 裁切路径及禁用清单。 |
| [`skill/SKILL.md`](../skill/SKILL.md) | 像素级风格规范 Skill — 设计令牌、所有组件 CSS、Demo 布局数值、CSS 变量模板及新组件开发自检表。 |
| [`CONTRIBUTING.md`](../CONTRIBUTING.md) | 贡献指南 |


## 本地开发

```bash
# 克隆仓库
git clone https://github.com/guokaigdg/animal-island-ui-solid.git
cd animal-island-ui-solid

# 安装依赖
deno install

# 启动 Demo 开发服务器
deno task dev

# 构建组件库
deno task build

# 构建 Demo 站点
deno task build:demo
```


## 使用案例

...
(omitted cases as they are mostly links and images)
...

## 注意事项

- 本项目仅供个人学习、研究及非商业演示使用。禁止任何形式的商业用途、转售或盈利活动。
- 不得用于任何商业产品、企业项目、外部服务或付费模板中。
- 用户需自行承担因使用本组件库而产生的任何风险。

## 版权与免责声明

- 本项目非任天堂官方产品，与任天堂株式会社（Nintendo Co., Ltd.）无任何关联、授权或合作关系。
- 项目名称中包含的游戏名称仅作为风格的描述性引用，不构成商标使用或品牌关联。
- 所有界面风格仅为设计灵感参考，不构成对原作品的复制或侵权。
- 若版权方认为相关内容涉嫌侵权，请通过邮件联系，我将立即进行整改或删除。

## 联系方式

如有任何问题或版权相关的沟通，请通过 Issue 或邮件联系。

## 开源协议

MIT
本项目基于 MIT 开源协议发布，仅供学习使用。作者对因使用本库而导致的任何法律问题或损失不承担责任。
