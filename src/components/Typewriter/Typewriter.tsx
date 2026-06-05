import { JSX, createSignal, createEffect, onCleanup, createMemo } from 'solid-js';

export interface TypewriterProps {
    /** 需要逐字显示的内容，保留原有元素结构/换行/样式 */
    children?: JSX.Element;
    /** 每字间隔 (ms), 默认 90 */
    speed?: number;
    /**
     * 外部触发重新播放。值变化即重启动画。
     * 常见用法是把弹窗的 open 次数或一个递增的 key 传进来。
     */
    trigger?: unknown;
    /** 是否自动从头开始播放，默认 true；设为 false 可直接显示全部 */
    autoPlay?: boolean;
    /** 播放完成回调 */
    onDone?: () => void;
}

/**
 * 递归计算文本长度
 */
const countText = (node: any): number => {
    if (node == null || typeof node === 'boolean') return 0;
    if (typeof node === 'string' || typeof node === 'number') return String(node).length;
    if (Array.isArray(node)) return node.reduce<number>((s, n) => s + countText(n), 0);
    // For Solid, if children are passed as elements, they might be functions or objects
    if (typeof node === 'object' && node.t) return countText(node.t);
    return 0;
};

interface RenderState {
    remaining: number;
    stopped: boolean;
}

/**
 * 按剩余可显字符数裁剪
 */
const renderTruncated = (node: any, state: RenderState): any => {
    if (state.stopped || state.remaining <= 0) {
        state.stopped = true;
        return null;
    }
    if (node == null || typeof node === 'boolean') return null;

    if (typeof node === 'string' || typeof node === 'number') {
        const text = String(node);
        if (state.remaining >= text.length) {
            state.remaining -= text.length;
            return text;
        }
        const shown = text.slice(0, state.remaining);
        state.remaining = 0;
        state.stopped = true;
        return shown;
    }

    if (Array.isArray(node)) {
        return node.map((child) => renderTruncated(child, state));
    }

    // Default fallback for other node types
    return node;
};

/**
 * Typewriter 打字机组件
 */
export const Typewriter = (props: TypewriterProps) => {
    const total = createMemo(() => countText(props.children));
    const speed = () => props.speed ?? 90;
    const autoPlay = () => props.autoPlay ?? true;
    const [count, setCount] = createSignal(autoPlay() ? 0 : total());

    createEffect(() => {
        // Track trigger
        props.trigger;
        
        if (!autoPlay()) {
            setCount(total());
            return;
        }
        
        setCount(0);
        const t = total();
        if (t === 0) return;

        const timer = setInterval(() => {
            setCount((c) => {
                if (c >= t) {
                    clearInterval(timer);
                    props.onDone?.();
                    return c;
                }
                return c + 1;
            });
        }, speed());

        onCleanup(() => clearInterval(timer));
    });

    return <>{renderTruncated(props.children, { remaining: count(), stopped: false })}</>;
};
