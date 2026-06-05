import { merge, omit } from "solid-js";
import type { JSX } from "@solidjs/web";
import styles from "./button.module.less";

export type ButtonType = "primary" | "default" | "dashed" | "text" | "link";
export type ButtonSize = "small" | "middle" | "large";
export type ButtonHTMLType = "submit" | "reset" | "button";

export interface ButtonProps extends Omit<JSX.ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  /** 按钮类型 */
  type?: ButtonType;
  /** 按钮尺寸 */
  size?: ButtonSize;
  /** 是否危险按钮 */
  danger?: boolean;
  /** 是否幽灵按钮（透明背景） */
  ghost?: boolean;
  /** 是否块级按钮 */
  block?: boolean;
  /** 加载状态 */
  loading?: boolean;
  /** 禁用状态 */
  disabled?: boolean;
  /** 图标 */
  icon?: JSX.Element;
  /** 原生 button type */
  htmlType?: ButtonHTMLType;
  children?: JSX.Element;
  /** 自定义类名列表 */
  classList?: Record<string, boolean>;
}

export const Button = (props: ButtonProps) => {
  const merged = merge({ type: "default" as ButtonType, size: "middle" as ButtonSize }, props);
  const rest = omit(merged,
    "type",
    "size",
    "danger",
    "ghost",
    "block",
    "loading",
    "disabled",
    "icon",
    "htmlType",
    "children",
    "class",
    "classList",
  );

  return (
    <button
      type={merged.htmlType || "button"}
      disabled={merged.disabled}
      class={[
        merged.class,
        {
          [styles.btn]: true,
          [styles[`btn-${merged.type}`]]: true,
          [styles[`btn-${merged.size}`]]: true,
          [styles["btn-danger"]]: merged.danger,
          [styles["btn-ghost"]]: merged.ghost,
          [styles["btn-block"]]: merged.block,
          [styles["btn-loading"]]: merged.loading,
        },
        merged.classList,
      ].flat() as any}
      {...rest}
    >
      {merged.icon && !merged.loading && <span class={styles["btn-icon"]}>{merged.icon}</span>}
      {merged.children && <span>{merged.children}</span>}
    </button>
  );
};
