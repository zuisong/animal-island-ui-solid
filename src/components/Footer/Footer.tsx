
import type { JSX } from "@solidjs/web";
import styles from "./footer.module.less";

export type FooterType = "sea" | "tree";

export interface FooterProps {
  /** Footer 类型 */
  type?: FooterType;
  /** 自定义类名 */
  class?: string;
  /** 自定义类名列表 */
  classList?: { [key: string]: boolean | undefined };
  /** 自定义样式 */
  style?: JSX.CSSProperties;
}

export const Footer = (props: FooterProps) => {
  return (
    <div
      class={[
        props.class,
        {
          [styles.footer]: true,
          [styles[props.type || "tree"]]: true,
          ...props.classList,
        },
      ].flat() as any}
      style={props.style}
    />
  );
};
