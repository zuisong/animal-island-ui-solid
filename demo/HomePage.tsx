import { JSX, createSignal, createMemo, Show, For } from 'solid-js';
import { Card, Divider, Button, Typewriter } from '../src';
import { useIsMobile } from './tools';

// ============================================
// Syntax highlighting
// ============================================
const HL_TOKENS: { pattern: RegExp; style: JSX.CSSProperties }[] = [
    {
        pattern: /(\/\/.*$|\/\*[\s\S]*?\*\/)/gm,
        style: { color: '#6b5e50', 'font-style': 'italic', 'font-weight': 400 },
    },
    {
        pattern: /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g,
        style: { color: '#a8d4a0' },
    },
    { pattern: /(<\/?[\w.]+|\/?>)/g, style: { color: '#f0a870' } },
    {
        pattern:
            /\b(import|from|const|let|var|function|return|export|default|true|false|null|undefined)\b/g,
        style: { color: '#d4a0e0' },
    },
    { pattern: /\b(npm|yarn|pnpm)\b/g, style: { color: '#f0a870' } },
    {
        pattern: /(install|uninstall|run|add|remove)\b/g,
        style: { color: '#a8d4a0' },
    },
    { pattern: /(\{|\})/g, style: { color: '#d4b896' } },
    { pattern: /(=>)/g, style: { color: '#d4a0e0' } },
    { pattern: /(--[\w-]+)(?=\s*:)/g, style: { color: '#e8c87a' } },
    { pattern: /(:root)/g, style: { color: '#f0a870' } },
    { pattern: /(#[0-9a-fA-F]{3,8})\b/g, style: { color: '#8ab8e0' } },
];

const highlightCode = (code: string): JSX.Element[] => {
    const parts: JSX.Element[] = [];
    const lines = code.split('\n');
    lines.forEach((line, li) => {
        type Seg = { start: number; end: number; style: JSX.CSSProperties };
        const segs: Seg[] = [];
        for (const t of HL_TOKENS) {
            const re = new RegExp(t.pattern.source, t.pattern.flags);
            let m: RegExpExecArray | null;
            while ((m = re.exec(line)) !== null) {
                const s = m.index + (m[0] !== m[1] && m[1] ? m[0].indexOf(m[1]) : 0);
                const text = m[1] || m[0];
                segs.push({ start: s, end: s + text.length, style: t.style });
            }
        }
        segs.sort((a, b) => a.start - b.start);
        const merged: Seg[] = [];
        for (const seg of segs) {
            if (merged.length === 0 || seg.start >= merged[merged.length - 1].end)
                merged.push(seg);
        }
        let idx = 0;
        for (const seg of merged) {
            if (seg.start > idx) parts.push(line.slice(idx, seg.start) as any);
            parts.push(
                <span style={seg.style}>
                    {line.slice(seg.start, seg.end)}
                </span>
            );
            idx = seg.end;
        }
        if (idx < line.length) parts.push(line.slice(idx) as any);
        if (li < lines.length - 1) parts.push('\n' as any);
    });
    return parts;
};

const CodeBlock = (props: { code: string }) => (
    <pre style={S.codeBox}>{highlightCode(props.code)}</pre>
);

const FeatureCard = (props: { feature: typeof features[0] }) => {
    const [hovered, setHovered] = createSignal(false);
    return (
        <Card
            style={{
                ...S.featureCard,
                transform: hovered() ? 'translateY(-4px)' : 'none',
                'box-shadow': hovered()
                    ? '0 8px 24px rgba(114, 93, 66, 0.15)'
                    : 'none',
                transition: 'all 0.3s ease',
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <img
                src={
                    new URL(`./img/nook-phone/${props.feature.icon}`, import.meta.url).href
                }
                style={{
                    width: '42px',
                    height: '42px',
                    transform: hovered()
                        ? 'scale(1.1) rotate(-4deg)'
                        : 'scale(1) rotate(0deg)',
                    transition: 'transform 0.3s ease',
                    animation: hovered() ? 'iconBounce 0.4s ease forwards' : 'none',
                }}
                alt={props.feature.title}
            />
            <div style={S.featureTitle}>{props.feature.title}</div>
            <div style={S.featureDesc}>{props.feature.desc}</div>
        </Card>
    );
};

// ============================================
// Styles
// ============================================
const S = {
    page: {
        width: '100%',
        'min-height': '100vh',
        'overflow-y': 'auto',
        'overflow-x': 'hidden',
    } as JSX.CSSProperties,

    hero: {
        display: 'flex',
        'flex-direction': 'column',
        'align-items': 'center',
        'justify-content': 'center',
        'min-height': '100vh',
        padding: '60px 40px 40px',
        position: 'relative',
    } as JSX.CSSProperties,
    heroContent: {
        display: 'grid',
        'grid-template-columns': '1fr 1fr',
        gap: '150px',
        'align-items': 'center',
        'max-width': '880px',
        width: '100%',
    } as JSX.CSSProperties,
    heroContentMobile: {
        display: 'grid',
        'grid-template-columns': '1fr',
        gap: '32px',
        'align-items': 'center',
        'max-width': '880px',
        width: '100%',
    } as JSX.CSSProperties,
    heroText: {
        'text-align': 'left',
    } as JSX.CSSProperties,
    heroLogo: {
        'font-size': '72px',
        'line-height': 1,
        'margin-bottom': '16px',
        display: 'flex',
        'justify-content': 'center',
        'align-items': 'center',
    } as JSX.CSSProperties,
    heroTitle: {
        'font-family': "Nunito, 'Zen Maru Gothic', -apple-system, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif",
        'font-size': '55px',
        'font-weight': 800,
        'line-height': 1.1,
        color: '#FFF9E6',
        'text-shadow': '0px 4px 1px rgba(0, 0, 0, 0.4)',
        margin: '0 0 12px',
    } as JSX.CSSProperties,
    heroVersion: {
        display: 'inline-block',
        'font-size': '12px',
        'font-weight': 600,
        padding: '2px 10px',
        'border-radius': '10px',
        background: '#e6f9f6',
        color: '#19c8b9',
        'margin-left': '8px',
        'vertical-align': 'middle',
        'text-shadow': 'none',
    } as JSX.CSSProperties,
    heroSubtitle: {
        'font-size': '17px',
        color: '#7c5734',
        'line-height': 1.7,
        margin: '0 0 28px',
        'max-width': '520px',
    } as JSX.CSSProperties,
    heroActions: {
        display: 'flex',
        gap: '16px',
        'align-items': 'center',
    } as JSX.CSSProperties,

    section: {
        padding: '48px 40px',
        'max-width': '960px',
        margin: '0 auto',
    } as JSX.CSSProperties,
    sectionTitle: {
        'font-family': "Nunito, 'Zen Maru Gothic', -apple-system, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif",
        'font-size': '24px',
        'font-weight': 700,
        color: '#725d42',
        margin: '0 0 8px',
        'text-align': 'center',
    } as JSX.CSSProperties,
    sectionDesc: {
        'font-size': '14px',
        color: '#7c5734',
        'text-align': 'center',
        'margin-bottom': '32px',
    } as JSX.CSSProperties,

    features: {
        display: 'grid',
        'grid-template-columns': 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
    } as JSX.CSSProperties,
    featureCard: {
        padding: '24px 20px',
        'text-align': 'center',
    } as JSX.CSSProperties,
    featureTitle: {
        'font-size': '15px',
        'font-weight': 700,
        color: '#725d42',
        'margin-bottom': '6px',
    } as JSX.CSSProperties,
    featureDesc: {
        'font-size': '13px',
        color: '#7c5734',
        'line-height': 1.6,
        display: '-webkit-box',
        '-webkit-line-clamp': 3,
        '-webkit-box-orient': 'vertical',
        overflow: 'hidden',
        'text-overflow': 'ellipsis',
    } as JSX.CSSProperties,

    compGrid: {
        display: 'grid',
        'grid-template-columns': 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '12px',
    } as JSX.CSSProperties,
    compCard: {
        padding: '16px 20px',
        cursor: 'pointer',
    } as JSX.CSSProperties,
    compName: {
        'font-size': '15px',
        'font-weight': 700,
        color: '#725d42',
        'margin-bottom': '4px',
    } as JSX.CSSProperties,
    compDesc: {
        'font-size': '12px',
        color: '#7c5734',
        'line-height': 1.5,
    } as JSX.CSSProperties,

    codeBox: {
        'max-width': '600px',
        margin: '0 auto',
        padding: '20px 28px',
        background: '#2b2118',
        border: '1px solid #3d3028',
        'border-radius': '20px',
        'font-family': "'SF Mono', 'Fira Code', Consolas, monospace",
        'font-size': '13px',
        'font-weight': 600,
        color: '#e8d5bc',
        'text-align': 'left',
        'line-height': 1.8,
        'white-space': 'pre',
        overflow: 'auto',
        'tab-size': 4,
    } as JSX.CSSProperties,

    footer: {
        padding: '32px 40px',
        'text-align': 'center',
        'font-size': '12px',
        color: '#7c5734',
        'margin-top': '32px',
    } as JSX.CSSProperties,
    footerLinks: {
        display: 'flex',
        'justify-content': 'center',
        gap: '20px',
        'margin-bottom': '12px',
    } as JSX.CSSProperties,
    footerLink: {
        'font-size': '13px',
        color: '#7c5734',
        cursor: 'pointer',
    } as JSX.CSSProperties,
};

const features = [
    {
        icon: 'nook1.svg',
        title: 'Animal风格',
        desc: 'SVG 有机形状裁切，3D 按压按钮，温暖质朴的自然 UI 质感',
    },
    {
        icon: 'Property-Shopping.svg',
        title: '18 个组件',
        desc: 'Button / Input / Switch / Modal / Typewriter / Card / Collapse / Cursor / Divider / Time / Phone / Footer / Icon / Checkbox / Select / Tabs / CodeBlock / Loading 等',
    },
    {
        icon: 'Property-Camera.svg',
        title: '主题定制',
        desc: '40+ CSS 自定义属性，运行时换肤无需重新构建',
    },
    {
        icon: 'Property-Recipes.svg',
        title: '开箱即用',
        desc: 'ESM + CJS 双格式输出，TypeScript 类型声明完整',
    },
];

const components = [
    {
        key: 'button',
        name: 'Button',
        desc: '5 种类型、3 种尺寸、加载/危险/幽灵模式',
    },
    { key: 'input', name: 'Input', desc: '前后缀、一键清空、校验状态' },
    {
        key: 'switch',
        name: 'Switch',
        desc: '受控/非受控、自定义文案、加载状态',
    },
    { key: 'checkbox', name: 'Checkbox', desc: '多选框组件，支持水平/垂直排列' },
    {
        key: 'select',
        name: 'Select',
        desc: '下拉选择器，支持搜索和禁用',
    },
    { key: 'tabs', name: 'Tabs', desc: '标签页组件，支持受控/非受控模式' },
    { key: 'modal', name: 'Modal', desc: 'SVG 有机形状弹窗、ESC 关闭' },
    {
        key: 'typewriter',
        name: 'Typewriter',
        desc: '逐字打字机效果，支持多行与富内容',
    },
    { key: 'card', name: 'Card', desc: '默认/标题两种卡片风格' },
    { key: 'collapse', name: 'Collapse', desc: 'FAQ 折叠面板、平滑展开动画' },
    { key: 'cursor', name: 'Cursor', desc: '自定义手指光标，支持多种尺寸' },
    { key: 'divider-comp', name: 'Divider', desc: '装饰性水平分割线' },
    { key: 'icon', name: 'Icon', desc: 'SVG 图标库' },
    { key: 'footer', name: 'Footer', desc: '页脚组件' },
    { key: 'time', name: 'Time', desc: '可爱风格时间显示' },
    { key: 'phone', name: 'Phone', desc: 'Phone 模拟器' },
    { key: 'codeblock', name: 'CodeBlock', desc: '代码语法高亮组件' },
    { key: 'loading', name: 'Loading', desc: '动森风格小岛加载动画' },
];

const HomePage = (props: { onNavigate?: (path: string) => void }) => {
    const isMobile = useIsMobile();
    const [showScrollHint, setShowScrollHint] = createSignal(true);
    let pageRef: HTMLDivElement | undefined;

    const handleScroll = () => {
        if (pageRef) {
            if (pageRef.scrollTop > 70) {
                setShowScrollHint(false);
            } else {
                setShowScrollHint(true);
            }
        }
    };

    return (
        <div ref={pageRef} style={{ ...S.page, overflow: 'auto' }} onScroll={handleScroll}>
            <style>{`
                @keyframes iconBounce {
                    0% { transform: scale(1) rotate(0deg); }
                    50% { transform: scale(1.2) rotate(-5deg); }
                    100% { transform: scale(1.1) rotate(-4deg); }
                }
                @keyframes bounce {
                    0%, 100% { transform: translateX(-50%) translateY(0); opacity: 1; }
                    50% { transform: translateX(-50%) translateY(-8px); opacity: 0.7; }
                }
            `}</style>
            
            {/* Hero */}
            <div style={S.hero}>
                <div style={isMobile() ? S.heroContentMobile : S.heroContent}>
                    <Show when={isMobile()}>
                        <div style={{ 'text-align': 'center' }}>
                            <img
                                src={new URL('./img/animal_icon.png', import.meta.url).href}
                                style={{ width: '180px', height: '112px' }}
                                alt="logo"
                            />
                        </div>
                    </Show>
                    <div style={isMobile() ? { 'text-align': 'center' } : S.heroText}>
                        <h1 style={{ ...S.heroTitle, 'font-size': isMobile() ? '37px' : '60px' }}>
                            <Show when={isMobile()} fallback={<>Animal <br /> Island UI</>}>
                                Animal Island UI
                            </Show>
                            <span style={S.heroVersion}>v0.8.1</span>
                        </h1>
                        <Typewriter speed={60}>
                            <p style={{ ...S.heroSubtitle, 'font-size': isMobile() ? '14px' : '17px' }}>
                                Animal 风格的 SolidJS 组件库，基于 TypeScript + Vite 构建，让 Web 应用充满温暖质感
                            </p>
                        </Typewriter>
                        <div style={{ ...S.heroActions, 'justify-content': isMobile() ? 'center' : 'flex-start' }}>
                            <Button
                                type="primary"
                                size="large"
                                onClick={() => props.onNavigate?.('/button')}
                            >
                                开始使用 →
                            </Button>
                        </div>
                    </div>
                    <Show when={!isMobile()}>
                        <div style={{ 'text-align': 'center' }}>
                            <img
                                src={new URL('./img/animal_icon.png', import.meta.url).href}
                                style={{ width: '320px', height: '200px' }}
                                alt="logo"
                            />
                        </div>
                    </Show>
                </div>
            </div>

            <div style={{
                position: 'absolute',
                bottom: '40px',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                'flex-direction': 'column',
                'align-items': 'center',
                gap: '4px',
                cursor: 'pointer',
                animation: showScrollHint() ? 'bounce 2s ease-in-out infinite' : 'none',
                opacity: showScrollHint() ? 1 : 0,
                transition: 'opacity 0.3s ease',
                'pointer-events': showScrollHint() ? 'auto' : 'none'
            }}>
                <span style={{ color: '#FFF9E6', 'font-size': '12px', 'text-shadow': '0 1px 2px rgba(0,0,0,0.3)' }}>向下滑动</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 5v14M5 12l7 7 7-7" stroke="#FFF9E6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>

            {/* Features */}
            <div style={{ ...S.section, padding: isMobile() ? '32px 16px' : '48px 40px' }}>
                <div style={S.sectionTitle}>特性</div>
                <div style={S.sectionDesc}>为什么选择 animal-island-ui-solid</div>
                <div style={S.features}>
                    <For each={features}>
                        {(f) => <FeatureCard feature={f} />}
                    </For>
                </div>
            </div>

            <Divider style={{ width: isMobile() ? '90%' : '800px', margin: '0 auto' }} />

            {/* Components */}
            <div style={{ ...S.section, padding: isMobile() ? '32px 16px' : '48px 40px' }}>
                <div style={S.sectionTitle}>组件一览</div>
                <div style={S.sectionDesc}>点击卡片查看详细文档和在线演示</div>
                <div style={S.compGrid}>
                    <For each={components}>
                        {(c) => (
                            <Card
                                style={S.compCard}
                                onClick={() => props.onNavigate?.(`/${c.key}`)}
                            >
                                <div style={S.compName}>{c.name}</div>
                                <div style={S.compDesc}>{c.desc}</div>
                            </Card>
                        )}
                    </For>
                </div>
            </div>

            <Divider style={{ width: isMobile() ? '90%' : '800px', margin: '0 auto' }} />

            {/* Install */}
            <div style={{ ...S.section, padding: isMobile() ? '32px 16px' : '48px 40px' }}>
                <div style={S.sectionTitle}>安装</div>
                <div style={S.sectionDesc}>一行命令即可安装</div>
                <CodeBlock
                    code={`// 使用 npm 安装\nnpm install animal-island-ui-solid`}
                />
            </div>

            <Divider style={{ width: isMobile() ? '90%' : '800px', margin: '0 auto' }} />

            {/* Quick Start */}
            <div style={{ ...S.section, padding: isMobile() ? '32px 16px' : '48px 40px' }}>
                <div style={S.sectionTitle}>快速上手</div>
                <div style={S.sectionDesc}>引入组件即可使用，样式自动加载</div>
                <CodeBlock
                    code={`// 1. 引入组件\nimport { Button, Modal, Switch } from 'animal-island-ui-solid';\nimport 'animal-island-ui-solid/style';\n\nfunction App() {\n    return <Button>开始</Button>;\n}`}
                />
            </div>

            <Divider style={{ width: isMobile() ? '90%' : '800px', margin: '0 auto' }} />

            {/* Theme */}
            <div style={{ ...S.section, padding: isMobile() ? '32px 16px' : '48px 40px' }}>
                <div style={S.sectionTitle}>主题定制</div>
                <div style={S.sectionDesc}>
                    通过覆盖 CSS 自定义属性实现运行时换肤，无需重新构建
                </div>
                <CodeBlock
                    code={`/* 覆盖主题变量 */\n:root {\n    --animal-primary-color: #19c8b9;\n    --animal-text-color: #827157;\n    --animal-font-family: 'Noto Sans SC', sans-serif;\n    --animal-border-radius-base: 18px;\n    /* ... 40+ 设计令牌 */\n}`}
                />
            </div>

            {/* Footer */}
            <div style={{ ...S.footer, padding: isMobile() ? '24px 16px' : '32px 40px' }}>
                <div style={S.footerLinks}>
                    <span
                        style={S.footerLink}
                        onClick={() => props.onNavigate?.('/button')}
                    >
                        组件文档
                    </span>
                    <span
                        style={S.footerLink}
                        onClick={() =>
                            window.open(
                                'https://github.com/guokaigdg/animal-island-ui-solid',
                                '_blank'
                            )
                        }
                    >
                        GitHub
                    </span>
                </div>
                <div>MIT License · SolidJS + TypeScript + Vite</div>
            </div>
        </div>
    );
};

export default HomePage;
