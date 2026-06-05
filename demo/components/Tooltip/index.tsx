import { JSX } from 'solid-js';
import { Tooltip, Button } from '../../../src';
import {
    labelStyle,
    ApiTable,
    CodeBlock,
    ApiRow,
    sectionStyle,
    sectionTitleStyle,
    tagStyle,
    demoBoxStyle,
} from '../../tools';

const TOOLTIP_API: ApiRow[] = [
    { prop: 'title', desc: '提示内容，支持多行（可用 \\n 或 <br/> 换行）', type: 'JSX.Element', defaultVal: '-', required: true },
    { prop: 'placement', desc: '位置', type: "'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end'", defaultVal: "'top'" },
    { prop: 'trigger', desc: '触发方式', type: "'hover' | 'focus' | 'click'", defaultVal: "'hover'" },
    { prop: 'variant', desc: '视觉风格', type: "'default' | 'island'", defaultVal: "'default'" },
    { prop: 'bordered', desc: '是否显示边框（含箭头描边）', type: 'boolean', defaultVal: 'true' },
    { prop: 'children', desc: '触发元素', type: 'JSX.Element', defaultVal: '-', required: true },
    { prop: 'class', desc: '自定义类名', type: 'string', defaultVal: '-' },
    { prop: 'style', desc: '自定义样式', type: 'JSX.CSSProperties', defaultVal: '-' },
];

const leftColStyle: JSX.CSSProperties = {
    display: 'flex',
    'flex-direction': 'column',
    gap: '12px',
    'align-items': 'flex-start',
};

const rightColStyle: JSX.CSSProperties = {
    display: 'flex',
    'flex-direction': 'column',
    gap: '12px',
    'align-items': 'flex-end',
};

const placementRowStyle: JSX.CSSProperties = {
    display: 'flex',
    gap: '12px',
};

const placementBoxStyle: JSX.CSSProperties = {
    display: 'flex',
    'flex-direction': 'column',
    'align-items': 'center',
    gap: '12px',
};

const centerMarkStyle: JSX.CSSProperties = {
    width: '80px',
    height: '80px',
    display: 'flex',
    'align-items': 'center',
    'justify-content': 'center',
    'border-radius': '16px',
    background: '#f0e8d8',
    color: '#a0936e',
    'font-size': '12px',
    'font-weight': 600,
    'text-align': 'center',
    'line-height': 1.3,
    'flex-shrink': 0,
};

const leftTooltipTitle = (label: string) => (
    <>
        {label}
        <br />
        箭头在右侧
        <br />
        指向触发按钮
    </>
);

const rightTooltipTitle = (label: string) => (
    <>
        {label}
        <br />
        箭头在左侧
        <br />
        指向触发按钮
    </>
);

const TooltipDemo = () => {
    return (
        <div style={sectionStyle}>
            <div style={sectionTitleStyle}>
                Tooltip <span style={tagStyle}>气泡提示</span>
            </div>

            <div style={labelStyle}>基础用法 — hover 触发</div>
            <div style={demoBoxStyle}>
                <div style={{ display: 'flex', gap: '16px', 'align-items': 'center', 'flex-wrap': 'wrap' }}>
                    <Tooltip title="提示文字">
                        <Button type="primary" size="small">Hover 我</Button>
                    </Tooltip>
                </div>
            </div>

            <div style={labelStyle}>风格 — island 动森不规则气泡</div>
            <div style={{ ...demoBoxStyle, overflow: 'visible' }}>
                <div style={{ display: 'flex', gap: '24px', 'align-items': 'center', 'flex-wrap': 'wrap' }}>
                    <Tooltip title="标准矩形气泡" placement="top">
                        <Button size="small">default</Button>
                    </Tooltip>
                    <Tooltip title="无边框矩形" placement="top" bordered={false}>
                        <Button size="small">default 无边框</Button>
                    </Tooltip>
                    <Tooltip
                        variant="island"
                        bordered
                        placement="top"
                        title={
                            <>
                                钓到<span style={{ color: '#d4834a' }}>石头</span>了！
                                <br />
                                竟然连这种都能钓起来…
                            </>
                        }
                    >
                        <Button size="small">island 有边框</Button>
                    </Tooltip>
                    <Tooltip
                        variant="island"
                        bordered={false}
                        placement="top"
                        title={
                            <>
                                无边框有机气泡
                                <br />
                                圆点指示方向
                            </>
                        }
                    >
                        <Button size="small">island 无边框</Button>
                    </Tooltip>
                </div>
            </div>

            <div style={labelStyle}>12 个方向</div>
            <div style={{ ...demoBoxStyle, overflow: 'visible' }}>
                <div style={placementBoxStyle}>
                    <div style={placementRowStyle}>
                        <Tooltip title="top-start" placement="top-start">
                            <Button size="small">top-start</Button>
                        </Tooltip>
                        <Tooltip title="top" placement="top">
                            <Button size="small">top</Button>
                        </Tooltip>
                        <Tooltip title="top-end" placement="top-end">
                            <Button size="small">top-end</Button>
                        </Tooltip>
                    </div>

                    <div style={{ display: 'flex', 'align-items': 'center', gap: '48px' }}>
                        <div style={leftColStyle}>
                            <Tooltip title={leftTooltipTitle('left-start')} placement="left-start">
                                <Button size="small">left-start</Button>
                            </Tooltip>
                            <Tooltip title={leftTooltipTitle('left')} placement="left">
                                <Button size="small">left</Button>
                            </Tooltip>
                            <Tooltip title={leftTooltipTitle('left-end')} placement="left-end">
                                <Button size="small">left-end</Button>
                            </Tooltip>
                        </div>

                        <div style={centerMarkStyle}>
                            12<br />placements
                        </div>

                        <div style={rightColStyle}>
                            <Tooltip title={rightTooltipTitle('right-start')} placement="right-start">
                                <Button size="small">right-start</Button>
                            </Tooltip>
                            <Tooltip title={rightTooltipTitle('right')} placement="right">
                                <Button size="small">right</Button>
                            </Tooltip>
                            <Tooltip title={rightTooltipTitle('right-end')} placement="right-end">
                                <Button size="small">right-end</Button>
                            </Tooltip>
                        </div>
                    </div>

                    <div style={placementRowStyle}>
                        <Tooltip title="bottom-start" placement="bottom-start">
                            <Button size="small">bottom-start</Button>
                        </Tooltip>
                        <Tooltip title="bottom" placement="bottom">
                            <Button size="small">bottom</Button>
                        </Tooltip>
                        <Tooltip title="bottom-end" placement="bottom-end">
                            <Button size="small">bottom-end</Button>
                        </Tooltip>
                    </div>
                </div>
            </div>

            <div style={labelStyle}>触发方式 — click</div>
            <div style={demoBoxStyle}>
                <Tooltip title="点击触发，再点关闭" trigger="click" placement="bottom">
                    <Button size="small">Click 触发</Button>
                </Tooltip>
            </div>

            <div style={labelStyle}>触发方式 — focus</div>
            <div style={demoBoxStyle}>
                <Tooltip title="聚焦时显示" trigger="focus" placement="right">
                    <input
                        type="text"
                        placeholder="点击输入框聚焦"
                        style={{
                            padding: '8px 16px',
                            'border-radius': '50px',
                            border: '2px solid #c4b89e',
                            background: 'rgb(247, 243, 223)',
                            'font-family': 'inherit',
                            'font-size': '14px',
                            color: '#725d42',
                            outline: 'none',
                        }}
                    />
                </Tooltip>
            </div>

            <div style={labelStyle}>多行内容</div>
            <div style={demoBoxStyle}>
                <div style={{ display: 'flex', gap: '16px', 'flex-wrap': 'wrap' }}>
                    <Tooltip
                        title={
                            <>
                                第一行文字
                                <br />
                                第二行文字
                                <br />
                                第三行文字 🍃
                            </>
                        }
                        placement="top"
                    >
                        <Button size="small">多行 JSX</Button>
                    </Tooltip>

                    <Tooltip
                        title={"第一行\n第二行\n第三行 🌿"}
                        placement="top"
                    >
                        <Button size="small">换行符 \n</Button>
                    </Tooltip>
                </div>
            </div>

            <CodeBlock
                code={`import { Tooltip, Button } from 'animal-island-ui-solid';

const App = () => {
    return (
        <Tooltip title="提示文字">
            <Button>Hover 我</Button>
        </Tooltip>
    );
};

export default App;`}
            />
            <ApiTable rows={TOOLTIP_API} />
        </div>
    );
};

export default TooltipDemo;
