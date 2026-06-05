import { JSX, createSignal, createEffect, onCleanup, Show } from "solid-js";
import { Portal } from "solid-js/web";
import { Button } from "../Button";
import { Cursor } from "../Cursor";
import { Typewriter } from "../Typewriter";
import styles from "./modal.module.less";

// Inline SVG clip-path — same organic blob shape as Dialog
const ClipDef = () => (
  <svg style={{ position: "absolute", width: 0, height: 0 }} aria-hidden="true">
    <clipPath id="animal-modal-clip" clipPathUnits="objectBoundingBox">
      <path d="M0.501,0.005 L0.501,0.005 L0.523,0.005 L0.549,0.006 C0.704,0.01,0.796,0.017,0.825,0.027 L0.827,0.028 C0.872,0.045,0.939,0.044,0.978,0.17 C1,0.254,1,0.365,0.99,0.505 L0.988,0.513 C0.979,0.558,0.971,0.598,0.965,0.633 C0.956,0.689,0.979,0.77,0.964,0.865 C0.953,0.928,0.921,0.966,0.869,0.979 C0.821,0.986,0.773,0.992,0.726,0.995 L0.712,0.996 L0.694,0.997 C0.648,1,0.586,1,0.507,1 L0.501,1 L0.464,1 C0.385,1,0.325,0.998,0.283,0.995 C0.234,0.992,0.184,0.987,0.133,0.979 C0.081,0.966,0.05,0.928,0.039,0.865 C0.023,0.77,0.047,0.689,0.037,0.633 C0.031,0.595,0.023,0.552,0.013,0.505 C-0.006,0.365,-0.002,0.254,0.024,0.17 C0.064,0.045,0.13,0.045,0.174,0.028 L0.175,0.028 C0.204,0.017,0.303,0.009,0.474,0.005 L0.501,0.005" />
    </clipPath>
  </svg>
);

export interface ModalProps {
  /** 是否可见 */
  open: boolean;
  /** 标题 */
  title?: JSX.Element;
  /** 宽度 */
  width?: number | string;
  /** 点击遮罩关闭 */
  maskClosable?: boolean;
  /** 底部按钮区域 */
  footer?: JSX.Element | null;
  /** 关闭回调 */
  onClose?: () => void;
  /** 确认回调 */
  onOk?: () => void;
  /** 自定义内容 */
  children?: JSX.Element;
  class?: string;
  classList?: { [key: string]: boolean | undefined };
  /** 打字机每字间隔 (ms), 默认 80 */
  typeSpeed?: number;
  /** 是否启用打字机效果, 默认 true */
  typewriter?: boolean;
}

export const Modal = (props: ModalProps) => {
  // 每次 open 变为 true 时重启打字机
  const [playKey, setPlayKey] = createSignal(0);
  createEffect(() => {
    if (props.open) setPlayKey((k) => k + 1);
  });

  // ESC 关闭
  createEffect(() => {
    if (!props.open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") props.onClose?.();
    };
    document.addEventListener("keydown", handler);
    onCleanup(() => document.removeEventListener("keydown", handler));
  });

  // 禁止滚动
  createEffect(() => {
    if (props.open) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      onCleanup(() => {
        document.body.style.overflow = original;
      });
    }
  });

  const handleMaskClick = () => {
    if (props.maskClosable !== false) props.onClose?.();
  };

  const handleContentClick = (e: MouseEvent) => {
    e.stopPropagation();
  };

  const defaultFooter = (
    <>
      <Button type="primary" onClick={() => props.onClose?.()}>
        取消
      </Button>
      <Button type="primary" onClick={() => props.onOk?.()}>
        确定
      </Button>
    </>
  );

  return (
    <Show when={props.open}>
      <Portal>
        <Cursor>
          <div class={styles.mask} onClick={handleMaskClick}>
            <div
              class={props.class}
              classList={{
                [styles.modal]: true,
                ...props.classList,
              }}
              style={{
                width:
                  typeof props.width === "number" ? `${props.width}px` : props.width || "520px",
              }}
              onClick={handleContentClick}
              role="dialog"
              aria-modal="true"
            >
              <ClipDef />
              <div class={styles.modalClipped}>
                <Show when={props.title}>
                  <div class={styles.header}>
                    <div class={styles.title}>{props.title}</div>
                  </div>
                </Show>
                <div class={styles.body}>
                  <Show when={props.typewriter !== false} fallback={props.children}>
                    <Typewriter speed={props.typeSpeed || 80} trigger={playKey()}>
                      {props.children}
                    </Typewriter>
                  </Show>
                </div>
                <Show when={props.footer !== null}>
                  <div class={styles.footer}>
                    {props.footer === undefined ? defaultFooter : props.footer}
                  </div>
                </Show>
              </div>
            </div>
          </div>
        </Cursor>
      </Portal>
    </Show>
  );
};
