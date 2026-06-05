import { JSX, splitProps } from "solid-js";
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
}

export const Button = (props: ButtonProps) => {
  const [local, rest] = splitProps(props, [
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
  ]);

  return (
    <button
      type={local.htmlType || "button"}
      disabled={local.disabled}
      class={local.class}
      classList={{
        [styles.btn]: true,
        [styles[`btn-${local.type || "default"}`]]: true,
        [styles[`btn-${local.size || "middle"}`]]: true,
        [styles["btn-danger"]]: local.danger,
        [styles["btn-ghost"]]: local.ghost,
        [styles["btn-block"]]: local.block,
        [styles["btn-loading"]]: local.loading,
        ...local.classList,
      }}
      {...rest}
    >
      {local.icon && !local.loading && <span class={styles["btn-icon"]}>{local.icon}</span>}
      {local.children && <span>{local.children}</span>}
    </button>
  );
};
