import { JSX } from "solid-js";
import styles from "./title.module.less";

export type TitleSize = "small" | "middle" | "large";

export type TitleColor =
  | "default"
  | "app-pink"
  | "purple"
  | "app-blue"
  | "app-yellow"
  | "app-orange"
  | "app-teal"
  | "app-green"
  | "app-red"
  | "lime-green"
  | "yellow-green"
  | "brown"
  | "warm-peach-pink";

export interface TitleProps {
  /** 标题内容 */
  children: JSX.Element;
  /** 尺寸 */
  size?: TitleSize;
  /** 配色，与 Card 同名色板 */
  color?: TitleColor;
  /** 自定义类名 */
  class?: string;
  /** 自定义类名列表 */
  classList?: { [key: string]: boolean | undefined };
  /** 自定义样式 */
  style?: JSX.CSSProperties;
}

const SIZE_MAP: Record<TitleSize, number> = {
  small: 14,
  middle: 20,
  large: 28,
};

const Ribbon = (props: { children: JSX.Element; fontSize: number; color?: TitleColor }) => (
  <span
    class={styles.ribbon}
    classList={{
      [styles[`color-${props.color}`]]: !!props.color && props.color !== "default",
    }}
    style={{ "font-size": `${props.fontSize}px` }}
  >
    <span class={`${styles.ribbonBack} ${styles.ribbonBackLeft}`} aria-hidden="true" />
    <span class={`${styles.ribbonBack} ${styles.ribbonBackRight}`} aria-hidden="true" />
    <span class={`${styles.ribbonFold} ${styles.ribbonFoldLeft}`} aria-hidden="true" />
    <span class={`${styles.ribbonFold} ${styles.ribbonFoldRight}`} aria-hidden="true" />
    <span class={styles.ribbonFront} aria-hidden="true" />
    <span class={styles.ribbonText}>{props.children}</span>
  </span>
);

export const Title = (props: TitleProps) => {
  return (
    <span
      class={props.class}
      classList={{
        [styles.title]: true,
        ...props.classList,
      }}
      style={props.style}
    >
      <Ribbon fontSize={SIZE_MAP[props.size || "middle"]} color={props.color || "default"}>
        {props.children}
      </Ribbon>
    </span>
  );
};
