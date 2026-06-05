import { JSX, createSignal, splitProps, mergeProps, Show, onCleanup, createUniqueId } from 'solid-js';
import styles from './tooltip.module.less';

export type TooltipPlacement =
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
    | 'left'
    | 'left-start'
    | 'left-end'
    | 'right'
    | 'right-start'
    | 'right-end';

export type TooltipTrigger = 'hover' | 'focus' | 'click';

/** default 标准矩形；island 动森不规则有机气泡（与 Modal 同款 clip-path） */
export type TooltipVariant = 'default' | 'island';

const ISLAND_CLIP_PATH =
    'M0.501,0.005 L0.501,0.005 L0.523,0.005 L0.549,0.006 C0.704,0.01,0.796,0.017,0.825,0.027 L0.827,0.028 C0.872,0.045,0.939,0.044,0.978,0.17 C1,0.254,1,0.365,0.99,0.505 L0.988,0.513 C0.979,0.558,0.971,0.598,0.965,0.633 C0.956,0.689,0.979,0.77,0.964,0.865 C0.953,0.928,0.921,0.966,0.869,0.979 C0.821,0.986,0.773,0.992,0.726,0.995 L0.712,0.996 L0.694,0.997 C0.648,1,0.586,1,0.507,1 L0.501,1 L0.464,1 C0.385,1,0.325,0.998,0.283,0.995 C0.234,0.992,0.184,0.987,0.133,0.979 C0.081,0.966,0.05,0.928,0.039,0.865 C0.023,0.77,0.047,0.689,0.037,0.633 C0.031,0.595,0.023,0.552,0.013,0.505 C-0.006,0.365,-0.002,0.254,0.024,0.17 C0.064,0.045,0.13,0.045,0.174,0.028 L0.175,0.028 C0.204,0.017,0.303,0.009,0.474,0.005 L0.501,0.005';

const ISLAND_BG = 'rgb(247, 243, 223)';
const ISLAND_STROKE = '#c4b89e';

const IslandClipDef = (props: { id: string }) => (
    <svg style={{ position: 'absolute', width: 0, height: 0 }} aria-hidden="true">
        <clipPath id={props.id} clipPathUnits="objectBoundingBox">
            <path d={ISLAND_CLIP_PATH} />
        </clipPath>
    </svg>
);

/** SVG 沿有机路径 fill + stroke，边框贴合不规则轮廓 */
const IslandShapeSvg = () => (
    <svg
        class={styles.islandSvg}
        viewBox="0 0 1 1"
        preserveAspectRatio="none"
        aria-hidden="true"
    >
        <path
            d={ISLAND_CLIP_PATH}
            fill={ISLAND_BG}
            stroke={ISLAND_STROKE}
            stroke-width="2"
            vector-effect="non-scaling-stroke"
            stroke-linejoin="round"
        />
    </svg>
);

export interface TooltipProps {
    /** 提示内容，支持多行（可用 \n 或 <br/> 换行） */
    title: JSX.Element;
    /** 位置 */
    placement?: TooltipPlacement;
    /** 触发方式 */
    trigger?: TooltipTrigger;
    /** 视觉风格：default 标准矩形 / island 动森有机气泡 */
    variant?: TooltipVariant;
    /** 是否显示边框（含箭头描边）；island 开启后 SVG 沿有机路径描边 */
    bordered?: boolean;
    /** 子元素（触发器） */
    children: JSX.Element;
    /** 自定义类名 */
    class?: string;
    /** 自定义类名列表 */
    classList?: { [key: string]: boolean | undefined };
    /** 自定义样式 */
    style?: JSX.CSSProperties;
}

export const Tooltip = (props: TooltipProps) => {
    const merged = mergeProps(
        {
            placement: 'top' as TooltipPlacement,
            trigger: 'hover' as TooltipTrigger,
            variant: 'default' as TooltipVariant,
            bordered: true,
        },
        props
    );
    const [local, rest] = splitProps(merged, [
        'title',
        'placement',
        'trigger',
        'variant',
        'bordered',
        'children',
        'class',
        'classList',
        'style',
    ]);

    const [visible, setVisible] = createSignal(false);
    let timer: any;
    const clipId = `animal-tooltip-clip-${createUniqueId().replace(/-/g, '')}`;

    const show = () => {
        clearTimeout(timer);
        setVisible(true);
    };

    const hide = () => {
        timer = setTimeout(() => setVisible(false), 100);
    };

    onCleanup(() => clearTimeout(timer));

    const placementClass = () => styles[local.placement.replace(/-/g, '_')];
    const isIsland = () => local.variant === 'island';

    return (
        <div
            class={local.class}
            classList={{
                [styles.tooltipWrapper]: true,
                ...local.classList,
            }}
            style={local.style}
        >
            <div
                class={styles.triggerWrapper}
                onMouseEnter={local.trigger === 'hover' ? show : undefined}
                onMouseLeave={local.trigger === 'hover' ? hide : undefined}
                onFocusIn={local.trigger === 'focus' ? show : undefined}
                onFocusOut={local.trigger === 'focus' ? hide : undefined}
                onClick={local.trigger === 'click' ? () => setVisible(!visible()) : undefined}
            >
                {local.children}
            </div>
            <div
                class={styles.tooltip}
                classList={{
                    [placementClass()]: true,
                    [styles.island]: isIsland(),
                    [styles.bordered]: local.bordered,
                    [styles.borderless]: !local.bordered,
                    [styles.visible]: visible(),
                }}
                role="tooltip"
                aria-hidden={!visible()}
                onMouseEnter={local.trigger === 'hover' ? show : undefined}
                onMouseLeave={local.trigger === 'hover' ? hide : undefined}
            >
                <Show
                    when={isIsland()}
                    fallback={<div class={styles.content}>{local.title}</div>}
                >
                    <div class={styles.islandBody}>
                        <IslandClipDef id={clipId} />
                        <Show when={local.bordered}>
                            <IslandShapeSvg />
                        </Show>
                        <div class={styles.islandContent} style={{ 'clip-path': `url(#${clipId})` }}>
                            <div class={styles.content}>{local.title}</div>
                        </div>
                    </div>
                    <span class={styles.tail} aria-hidden="true" />
                </Show>
            </div>
        </div>
    );
};
