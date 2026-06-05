import { JSX } from "@solidjs/web/jsx-runtime";
import { createSignal, createEffect, onCleanup, createMemo } from "solid-js";

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
  if (node == null || typeof node === "boolean") return 0;
  if (typeof node === "string" || typeof node === "number") return String(node).length;
  if (typeof node === "function") return countText(node());
  if (Array.isArray(node)) return node.reduce<number>((s, n) => s + countText(n), 0);
  if (isDomNode(node)) {
    if (node.nodeType === 3) return node.textContent?.length ?? 0;
    return Array.from(node.childNodes).reduce<number>((s, child) => s + countText(child), 0);
  }
  // For Solid, if children are passed as elements, they might be functions or objects
  if (typeof node === "object" && node.t) return countText(node.t);
  return 0;
};

const isDomNode = (node: any): node is Node => {
  return typeof Node !== "undefined" && node instanceof Node;
};

interface RenderState {
  remaining: number;
  stopped: boolean;
}

/**
 * 按剩余可显字符数裁剪
 */
const renderTruncated = (node: any, state: RenderState): any => {
  if (node == null || typeof node === "boolean") return null;

  if (typeof node === "string" || typeof node === "number") {
    if (state.stopped || state.remaining <= 0) {
      state.stopped = true;
      return null;
    }
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

  if (typeof node === "function") {
    return renderTruncated(node(), state);
  }

  if (Array.isArray(node)) {
    return node.map((child) => renderTruncated(child, state));
  }

  if (isDomNode(node)) {
    const textLength = countText(node);
    if (textLength === 0) return node.cloneNode(true);
    if (state.stopped || state.remaining <= 0) {
      state.stopped = true;
      return null;
    }
    if (state.remaining >= textLength) {
      state.remaining -= textLength;
      return node.cloneNode(true);
    }

    const clone = node.cloneNode(false);
    Array.from(node.childNodes).forEach((child) => {
      const rendered = renderTruncated(child, state);
      appendRenderedNode(clone, rendered);
    });
    return clone;
  }

  return node;
};

const appendRenderedNode = (parent: Node, rendered: any) => {
  if (rendered == null || typeof rendered === "boolean") return;
  if (Array.isArray(rendered)) {
    rendered.forEach((item) => appendRenderedNode(parent, item));
    return;
  }
  if (typeof rendered === "string" || typeof rendered === "number") {
    parent.appendChild(document.createTextNode(String(rendered)));
    return;
  }
  if (isDomNode(rendered)) parent.appendChild(rendered);
};

/**
 * Typewriter 打字机组件
 */
export const Typewriter = (props: TypewriterProps) => {
  const total = createMemo(() => countText(props.children));
  const speed = () => props.speed ?? 90;
  const autoPlay = () => props.autoPlay ?? true;
  const [count, setCount] = createSignal(autoPlay() ? 0 : total());

  createEffect(
    () => ({ trigger: props.trigger, autoPlay: autoPlay(), total: total(), speed: speed() }),
    ({ autoPlay, total, speed }) => {
      if (!autoPlay) {
        setCount(total);
        return;
      }

      setCount(0);
      if (total === 0) return;

      const timer = setInterval(() => {
        setCount((c) => {
          if (c >= total) {
            clearInterval(timer);
            props.onDone?.();
            return c;
          }
          return c + 1;
        });
      }, speed);

      onCleanup(() => clearInterval(timer));
    },
  );

  return <>{renderTruncated(props.children, { remaining: count(), stopped: false })}</>;
};
