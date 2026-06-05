import { merge, omit } from "solid-js";
import type { JSX } from "@solidjs/web";
import styles from "./icon.module.less";

export type IconName =
  | "icon-miles"
  | "icon-camera"
  | "icon-chat"
  | "icon-critterpedia"
  | "icon-design"
  | "icon-diy"
  | "icon-helicopter"
  | "icon-map"
  | "icon-shopping"
  | "icon-variant";

// 物品图标：400+ 个独立物品图。
// 通过 Vite import.meta.glob 在构建期收集为 URL 字典，避免在 less 中维护数百条规则。
const itemModules = import.meta.glob<string>("../../assets/img/icons/items/item-*.png", {
  eager: true,
  query: "?url",
  import: "default",
});

const ITEM_URL_MAP: Record<number, string> = (() => {
  const map: Record<number, string> = {};
  for (const path in itemModules) {
    const match = /item-(\d+)\.png$/.exec(path);
    if (match) {
      map[match[1] as any] = itemModules[path];
    }
  }
  return map;
})();

export const ITEM_COUNT = Object.keys(ITEM_URL_MAP).length;

/** 物品图标编号列表（1 ~ ITEM_COUNT），按自上而下、自左而右排序 */
export const ITEM_LIST: number[] = Object.keys(ITEM_URL_MAP)
  .map(Number)
  .sort((a, b) => a - b);

export interface IconProps {
  /** 内置具名图标。与 item 二选一 */
  name?: IconName;
  /** 物品图标编号（1 ~ ITEM_COUNT），来自 figma "Items" 设计稿。与 name 二选一 */
  item?: number;
  size?: number | string;
  class?: string;
  classList?: Record<string, boolean>;
  style?: JSX.CSSProperties;
  bounce?: boolean;
}

export const Icon = (props: IconProps) => {
  const merged = merge({ size: 24, bounce: false }, props);
  const rest = omit(merged,
    "name",
    "item",
    "size",
    "class",
    "classList",
    "style",
    "bounce",
  );

  const itemUrl = () => (merged.item !== undefined ? ITEM_URL_MAP[merged.item] : undefined);

  return (
    <span
      class={[
        merged.class,
        {
          [styles.icon]: true,
          [styles[merged.name!]]: !!merged.name,
          [styles["icon-bounce"]]: merged.bounce,
        },
        merged.classList,
      ].flat() as any}
      style={{
        width: typeof merged.size === "number" ? `${merged.size}px` : merged.size,
        height: typeof merged.size === "number" ? `${merged.size}px` : merged.size,
        ...(itemUrl() ? { "background-image": `url(${itemUrl()})` } : null),
        ...merged.style,
      }}
      {...rest}
    />
  );
};

export const ICON_LIST: { name: IconName; label: string }[] = [
  { name: "icon-miles", label: "NookMiles" },
  { name: "icon-camera", label: "Camera" },
  { name: "icon-chat", label: "Chat" },
  { name: "icon-critterpedia", label: "Critterpedia" },
  { name: "icon-design", label: "Design" },
  { name: "icon-diy", label: "DIY" },
  { name: "icon-helicopter", label: "Helicopter" },
  { name: "icon-map", label: "Map" },
  { name: "icon-shopping", label: "Shopping" },
  { name: "icon-variant", label: "Variant" },
];
