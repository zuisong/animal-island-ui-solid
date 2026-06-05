import { JSX, createSignal, Show } from 'solid-js';
import {
    WeddingInvitation,
    WeddingInvitationExportButton,
    Input,
    Switch,
} from '../../../src';
import type { WeddingInvitationRef } from '../../../src';
import {
    CodeBlock,
    ApiTable,
    ApiRow,
    sectionStyle,
    sectionTitleStyle,
    tagStyle,
    demoBodyStyle,
    labelStyle,
} from '../../tools';

interface FieldProps {
    label: string;
    children: JSX.Element;
}

const Field = (props: FieldProps) => (
    <div style={{ display: 'flex', 'flex-direction': 'column', gap: '4px' }}>
        <span style={{ 'font-size': '12px', color: '#725d42', 'font-weight': 600 }}>{props.label}</span>
        {props.children}
    </div>
);

const WeddingInvitationDemo = () => {
    const [groomName, setGroomName] = createSignal('小狸');
    const [brideName, setBrideName] = createSignal('小兔');
    const [date, setDate] = createSignal('2026.06.15');
    const [weekday, setWeekday] = createSignal('星期六');
    const [time, setTime] = createSignal('10:00 AM');
    const [venue, setVenue] = createSignal('彩虹岛 · 樱花广场');
    const [address, setAddress] = createSignal('动物之森 · 无人岛 · K.K. 演奏台前');
    const [title, setTitle] = createSignal('Wedding Invitation');
    const [message, setMessage] = createSignal(
        '哎呀，恭喜恭喜！我们要在小岛上举办婚礼啦~ 诚挚邀请您一同前来见证这个被花瓣和音符包围的日子！',
    );
    const [showLotteryNumber, setShowLotteryNumber] = createSignal(true);
    const [lotteryNumber, setLotteryNumber] = createSignal('0001');
    const [lotteryLabel, setLotteryLabel] = createSignal('LUCKY NUMBER');
    const [lotteryHint, setLotteryHint] = createSignal(
        '凭此号码参与现场抽奖 · Keep this stub for the lucky draw',
    );

    let cardRef: WeddingInvitationRef | undefined;

    return (
        <div style={sectionStyle}>
            <div style={sectionTitleStyle}>
                WeddingInvitation <span style={tagStyle}>婚礼请柬</span>
            </div>
            <div style={labelStyle}>
                动森风格婚礼请柬，定位为「设计 → 导出图片 → 分享 / 打印」。组件本身只渲染卡面，导出按钮通过 ref 在外部触发。
            </div>

            <div
                style={{
                    ...demoBodyStyle,
                    padding: '32px',
                    display: 'flex',
                    'flex-direction': 'row',
                    'align-items': 'flex-start',
                    'justify-content': 'center',
                    gap: '45px',
                    'flex-wrap': 'wrap',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        'flex-direction': 'column',
                        'align-items': 'center',
                        gap: '16px',
                    }}
                >
                    <WeddingInvitation
                        ref={(el) => (cardRef = el)}
                        brideName={brideName()}
                        groomName={groomName()}
                        date={date()}
                        weekday={weekday()}
                        time={time()}
                        venue={venue()}
                        address={address()}
                        title={title()}
                        message={message()}
                        showLotteryNumber={showLotteryNumber()}
                        lotteryNumber={lotteryNumber()}
                        lotteryLabel={lotteryLabel()}
                        lotteryHint={lotteryHint()}
                    />
                </div>

                <div
                    style={{
                        'max-width': '420px',
                        'min-width': '300px',
                        padding: '20px',
                        'border-radius': '24px',
                        background: '#F8F4E8',
                        display: 'flex',
                        'flex-direction': 'column',
                        gap: '12px',
                    }}
                >
                    <div style={{ 'font-size': '14px', 'font-weight': 700, color: '#725d42' }}>
                        编辑请柬
                    </div>

                    <div style={{ display: 'grid', 'grid-template-columns': '1fr 1fr', gap: '8px' }}>
                        <Field label="新娘">
                            <Input
                                value={brideName()}
                                onInput={(e) => setBrideName(e.target.value)}
                            />
                        </Field>
                        <Field label="新郎">
                            <Input
                                value={groomName()}
                                onInput={(e) => setGroomName(e.target.value)}
                            />
                        </Field>
                    </div>

                    <Field label="主标题">
                        <Input value={title()} onInput={(e) => setTitle(e.target.value)} />
                    </Field>

                    <div style={{ display: 'grid', 'grid-template-columns': '1fr 1fr 1fr', gap: '8px' }}>
                        <Field label="日期">
                            <Input value={date()} onInput={(e) => setDate(e.target.value)} />
                        </Field>
                        <Field label="星期">
                            <Input
                                value={weekday()}
                                onInput={(e) => setWeekday(e.target.value)}
                            />
                        </Field>
                        <Field label="时间">
                            <Input value={time()} onInput={(e) => setTime(e.target.value)} />
                        </Field>
                    </div>

                    <Field label="地点">
                        <Input value={venue()} onInput={(e) => setVenue(e.target.value)} />
                    </Field>
                    <Field label="详细地址">
                        <Input value={address()} onInput={(e) => setAddress(e.target.value)} />
                    </Field>

                    <Field label="邀请正文">
                        <textarea
                            value={message()}
                            onInput={(e) => setMessage(e.target.value)}
                            rows={3}
                            style={{
                                width: '100%',
                                padding: '8px 10px',
                                'border-radius': '8px',
                                border: '2px solid #e9d6a8',
                                background: '#fff',
                                'font-size': '13px',
                                color: '#5b4628',
                                resize: 'vertical',
                                'font-family': 'inherit',
                                outline: 'none',
                                'box-sizing': 'border-box',
                            }}
                        />
                    </Field>

                    <div
                        style={{
                            display: 'flex',
                            'align-items': 'center',
                            'justify-content': 'space-between',
                            padding: '4px 0',
                        }}
                    >
                        <span style={{ 'font-size': '12px', color: '#725d42', 'font-weight': 600 }}>
                            显示抽奖券
                        </span>
                        <Switch
                            checked={showLotteryNumber()}
                            onChange={setShowLotteryNumber}
                        />
                    </div>

                    <Show when={showLotteryNumber()}>
                        <>
                            <div style={{ display: 'grid', 'grid-template-columns': '1fr 1fr', gap: '8px' }}>
                                <Field label="抽奖号码">
                                    <Input
                                        value={lotteryNumber()}
                                        onInput={(e) => setLotteryNumber(e.target.value)}
                                    />
                                </Field>
                                <Field label="抽奖区标题">
                                    <Input
                                        value={lotteryLabel()}
                                        onInput={(e) => setLotteryLabel(e.target.value)}
                                    />
                                </Field>
                            </div>
                            <Field label="抽奖区说明">
                                <Input
                                    value={lotteryHint()}
                                    onInput={(e) => setLotteryHint(e.target.value)}
                                />
                            </Field>
                        </>
                    </Show>

                    <div style={{ 'margin-top': '4px', display: 'flex', 'justify-content': 'center' }}>
                        <WeddingInvitationExportButton
                            targetRef={() => cardRef}
                            filename={`${brideName()}-${groomName()}-请柬`}
                        />
                    </div>
                </div>
            </div>

            <CodeBlock
                code={`import { WeddingInvitation, WeddingInvitationExportButton } from 'animal-island-ui-solid';

let ref;
<WeddingInvitation ref={el => ref = el} />
<WeddingInvitationExportButton targetRef={() => ref} />`}
            />

            <ApiTable rows={WEDDING_API} />
            <ApiTable rows={WEDDING_REF_API} />
            <ApiTable rows={EXPORT_BTN_API} />
        </div>
    );
};

const WEDDING_API: ApiRow[] = [
    { prop: 'brideName', desc: '新娘名字', type: 'string', defaultVal: '小兔' },
    { prop: 'groomName', desc: '新郎名字', type: 'string', defaultVal: '小狸' },
    { prop: 'date', desc: '婚礼日期', type: 'string', defaultVal: '2026.06.15' },
    { prop: 'weekday', desc: '星期', type: 'string', defaultVal: '星期六' },
    { prop: 'time', desc: '时间', type: 'string', defaultVal: '10:00 AM' },
    { prop: 'venue', desc: '婚礼地点', type: 'string', defaultVal: '彩虹岛 · 樱花广场' },
    { prop: 'address', desc: '详细地址', type: 'string', defaultVal: '-' },
    { prop: 'title', desc: '英文主标题', type: 'JSX.Element', defaultVal: 'Wedding Invitation' },
    { prop: 'subtitle', desc: '中文副标题', type: 'JSX.Element', defaultVal: '<img src={...} />' },
    { prop: 'message', desc: '邀请正文', type: 'JSX.Element', defaultVal: '-' },
    { prop: 'showLotteryNumber', desc: '是否显示底部抽奖号码区', type: 'boolean', defaultVal: 'true' },
    { prop: 'lotteryNumber', desc: '抽奖号码', type: 'string', defaultVal: '0001' },
    { prop: 'lotteryLabel', desc: '抽奖区标题', type: 'JSX.Element', defaultVal: 'LUCKY NUMBER' },
    { prop: 'lotteryHint', desc: '抽奖区底部说明', type: 'JSX.Element', defaultVal: '凭此号码参与现场抽奖…' },
    { prop: 'class', desc: '自定义类名', type: 'string', defaultVal: '-' },
    { prop: 'style', desc: '自定义样式', type: 'JSX.CSSProperties', defaultVal: '-' },
];

const WEDDING_REF_API: ApiRow[] = [
    {
        prop: 'exportAsImage',
        desc: '导出为 PNG 并触发下载',
        type: '(filename?: string) => Promise<void>',
        defaultVal: '-',
    },
    { prop: 'getElement', desc: '获取请柬根 DOM', type: '() => HTMLDivElement | undefined', defaultVal: '-' },
];

const EXPORT_BTN_API: ApiRow[] = [
    {
        prop: 'targetRef',
        desc: '关联的 WeddingInvitation ref',
        type: 'WeddingInvitationRef | () => WeddingInvitationRef | { current?: WeddingInvitationRef }',
        defaultVal: '-',
    },
    { prop: 'filename', desc: '文件名（不含扩展名）', type: 'string', defaultVal: 'wedding-invitation' },
    { prop: 'children', desc: '按钮文案', type: 'JSX.Element', defaultVal: '保存为图片' },
    { prop: 'class', desc: '自定义类名', type: 'string', defaultVal: '-' },
    { prop: 'style', desc: '自定义样式', type: 'JSX.CSSProperties', defaultVal: '-' },
];

export default WeddingInvitationDemo;
