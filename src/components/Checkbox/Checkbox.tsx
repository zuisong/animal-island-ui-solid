import { createSignal, For } from "solid-js";
import type { JSX } from "@solidjs/web";
import styles from "./checkbox.module.less";

export type CheckboxSize = "small" | "middle" | "large";

export interface CheckboxOption {
  /** 选项标签 */
  label: JSX.Element;
  /** 选项值 */
  value: string | number;
  /** 是否禁用该选项 */
  disabled?: boolean;
}

export interface CheckboxProps {
  /** 选中的值列表（受控） */
  value?: Array<string | number>;
  /** 默认选中的值列表 */
  defaultValue?: Array<string | number>;
  /** 选项列表 */
  options: CheckboxOption[];
  /** 尺寸 */
  size?: CheckboxSize;
  /** 禁用全部 */
  disabled?: boolean;
  /** 布局方向 */
  direction?: "horizontal" | "vertical";
  /** 变化回调 */
  onChange?: (values: Array<string | number>) => void;
  /** 自定义类名 */
  class?: string;
  /** 自定义类名列表 */
  classList?: { [key: string]: boolean | undefined };
  /** 自定义样式 */
  style?: JSX.CSSProperties;
}

export const Checkbox = (props: CheckboxProps) => {
  const [innerValue, setInnerValue] = createSignal<Array<string | number>>(
    props.defaultValue || [],
  );

  const checkedValues = () => (props.value !== undefined ? props.value : innerValue());

  const handleChange = (optValue: string | number, optDisabled?: boolean) => {
    if (props.disabled || optDisabled) return;
    const current = checkedValues();
    const next = current.includes(optValue)
      ? current.filter((v) => v !== optValue)
      : [...current, optValue];

    if (props.value === undefined) {
      setInnerValue(next);
    }
    props.onChange?.(next);
  };

  return (
    <div
      class={[
        props.class,
        styles.checkboxGroup,
        styles[props.direction || "horizontal"],
        props.disabled ? styles.groupDisabled : undefined,
        props.classList,
      ]
        .flat()
        .filter(Boolean) as any}
      style={props.style}
    >
      <For each={props.options}>
        {(opt) => {
          const isChecked = () => checkedValues().includes(opt.value);
          const isDisabled = () => props.disabled || opt.disabled;
          return (
            <label
              class={[
                styles.checkboxItem,
                styles[props.size || "middle"],
                isChecked() ? styles.checked : undefined,
                isDisabled() ? styles.disabled : undefined,
              ]
                .flat()
                .filter(Boolean) as any}
              onClick={() => handleChange(opt.value, opt.disabled)}
            >
              <span
                class={styles.box}
                role="checkbox"
                aria-checked={isChecked() ? "true" : "false"}
                tabindex={isDisabled() ? -1 : 0}
                onKeyDown={(e) => {
                  if (e.key === " " || e.key === "Enter") {
                    e.preventDefault();
                    handleChange(opt.value, opt.disabled);
                  }
                }}
              >
                {isChecked() && (
                  <span class={styles.checkmark}>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2 8L6 12L14 4"
                        stroke="currentColor"
                        stroke-width="2.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                )}
              </span>
              <span class={styles.label}>{opt.label}</span>
            </label>
          );
        }}
      </For>
    </div>
  );
};
