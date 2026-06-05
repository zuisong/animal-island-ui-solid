import { JSX, splitProps } from "solid-js";
import styles from "./card.module.less";

export type CardType = "default" | "dashed";

export type CardColor =
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

export type CardPattern =
  | "none"
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

export interface CardProps extends JSX.HTMLAttributes<HTMLDivElement> {
  /** 卡片类型 */
  type?: CardType;
  /** 背景颜色类型 */
  color?: CardColor;
  /** 背景花纹类型 */
  pattern?: CardPattern;
  /** 自定义内容 */
  children?: JSX.Element;
}

export const Card = (props: CardProps) => {
  const [local, rest] = splitProps(props, [
    "type",
    "color",
    "pattern",
    "children",
    "class",
    "classList",
  ]);

  return (
    <div
      class={local.class}
      classList={{
        [styles.card]: true,
        [styles["card-dashed"]]: local.type === "dashed",
        [styles[`card-${local.color}`]]: !!local.color && local.color !== "default",
        [styles[`pattern-${local.pattern}`]]: !!local.pattern && local.pattern !== "none",
        ...local.classList,
      }}
      {...rest}
    >
      {local.children}
    </div>
  );
};
