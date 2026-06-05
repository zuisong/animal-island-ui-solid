import { merge, omit } from "solid-js";
import type { JSX } from "@solidjs/web";
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
  /** 自定义类名列表 */
  classList?: Record<string, boolean>;
}

export const Card = (props: CardProps) => {
  const merged = merge({}, props);
  const rest = omit(merged, "type", "color", "pattern", "children", "class", "classList");

  return (
    <div
      class={[
        merged.class,
        {
          [styles.card]: true,
          [styles["card-dashed"]]: merged.type === "dashed",
          [styles[`card-${merged.color}`]]: !!merged.color && merged.color !== "default",
          [styles[`pattern-${merged.pattern}`]]: !!merged.pattern && merged.pattern !== "none",
        },
        merged.classList,
      ].flat() as any}
      {...rest}
    >
      {merged.children}
    </div>
  );
};
