import type { JSX } from "@solidjs/web";
import styles from "./divider.module.less";

export type DividerType =
  | "line-brown"
  | "line-teal"
  | "line-white"
  | "line-yellow"
  | "wave-yellow"
  | "dashed-brown"
  | "dashed-teal"
  | "dashed-white"
  | "dashed-yellow";

export interface DividerProps {
  /** 分隔线类型 */
  type?: DividerType;
  /** 自定义类名 */
  class?: string;
  /** 自定义类名列表 */
  classList?: { [key: string]: boolean | undefined };
  /** 自定义样式 */
  style?: JSX.CSSProperties;
}

export const Divider = (props: DividerProps) => {
  return (
    <div
      class={[props.class, styles.divider, styles[props.type || "line-brown"], props.classList]
        .flat()
        .filter(Boolean) as any}
      style={props.style}
    />
  );
};
