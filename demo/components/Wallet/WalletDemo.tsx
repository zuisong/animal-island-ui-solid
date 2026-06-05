import { JSX, createSignal, onCleanup, Show } from 'solid-js';
import { Wallet } from '../../../src';
import {
    ApiTable,
    ApiRow,
    sectionStyle,
    sectionTitleStyle,
    tagStyle,
    demoBodyStyle,
    labelStyle,
    CodeBlock,
} from '../../tools';

const WALLET_API: ApiRow[] = [
    {
        prop: 'value',
        desc: '金额数值，number 会按千分位格式化，string 原样展示',
        type: 'number | string',
        defaultVal: "'00,000'",
    },
    {
        prop: 'size',
        desc: '尺寸预设',
        type: "'small' | 'medium' | 'large'",
        defaultVal: "'medium'",
    },
    {
        prop: 'icon',
        desc: '自定义货币图标，默认是动森风格钱袋',
        type: 'JSX.Element',
        defaultVal: '-',
    },
    {
        prop: 'thousandSeparator',
        desc: '千分位分隔符，传空串关闭',
        type: 'string',
        defaultVal: "','",
    },
    { prop: 'class', desc: '自定义类名', type: 'string', defaultVal: '-' },
    { prop: 'style', desc: '自定义样式', type: 'JSX.CSSProperties', defaultVal: '-' },
];

const WalletDemo = () => {
    const [bells, setBells] = createSignal(12345);
    const timer = setInterval(() => {
        setBells((prev) => (prev + Math.floor(Math.random() * 250)) % 1000000);
    }, 1500);
    onCleanup(() => clearInterval(timer));

    return (
        <div style={sectionStyle}>
            <div style={sectionTitleStyle}>
                Wallet <span style={tagStyle}>钱包</span>
            </div>
            <div style={labelStyle}>
                Wallet 钱包组件 — 动森风格的金币展示，奶油描边的橄榄黄胶囊配上凸的钱袋图标，悬停时钱袋轻晃。
            </div>

            <div style={labelStyle}>基础用法（占位文案 00,000）</div>
            <div style={demoBodyStyle}>
                <Wallet />
            </div>

            <div style={labelStyle}>三种尺寸</div>
            <div style={{ ...demoBodyStyle, gap: '32px', 'align-items': 'center', 'flex-wrap': 'wrap' }}>
                <Wallet size="small" value={1280} />
                <Wallet size="medium" value={12800} />
                <Wallet size="large" value={128000} />
            </div>

            <div style={labelStyle}>动态金额（每 1.5s 自动滚动，hover 钱袋会摇晃）</div>
            <div style={demoBodyStyle}>
                <Wallet value={bells()} />
            </div>

            <div style={labelStyle}>自定义文案 / 图标 / 关闭千分位</div>
            <div style={{ ...demoBodyStyle, gap: '32px', 'align-items': 'center', 'flex-wrap': 'wrap' }}>
                <Wallet value="∞" />
                <Wallet value={9999999} thousandSeparator="" />
                <Wallet
                    value={88}
                    icon={<span style={{ 'font-size': '40px' }}>💰</span>}
                />
            </div>

            <CodeBlock
                code={`import { Wallet } from 'animal-island-ui-solid';

const App = () => (
    <div>
        <Wallet />
        <Wallet value={12800} />
        <Wallet value={88} icon={<span style={{ fontSize: 56 }}>🥕</span>} />
    </div>
);

export default App;`}
            />
            <ApiTable rows={WALLET_API} />
        </div>
    );
};

export default WalletDemo;
