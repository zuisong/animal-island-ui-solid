import { JSX, createSignal, For, createMemo, createEffect } from "solid-js";
import styles from "./radio.module.less";

export type RadioSize = "small" | "middle" | "large";

export interface RadioOption {
  /** 选项标签 */
  label: JSX.Element;
  /** 选项值 */
  value: string | number;
  /** 是否禁用该选项 */
  disabled?: boolean;
}

export interface RadioProps {
  /** 选中的值（受控） */
  value?: string | number;
  /** 默认选中的值 */
  defaultValue?: string | number;
  /** 选项列表 */
  options: RadioOption[];
  /** 尺寸 */
  size?: RadioSize;
  /** 禁用全部 */
  disabled?: boolean;
  /** 布局方向 */
  direction?: "horizontal" | "vertical";
  /** 变化回调 */
  onChange?: (value: string | number) => void;
  /** 自定义类名 */
  class?: string;
  /** 自定义类名列表 */
  classList?: { [key: string]: boolean | undefined };
  /** 自定义样式 */
  style?: JSX.CSSProperties;
}

export const Radio = (props: RadioProps) => {
  const [innerValue, setInnerValue] = createSignal<string | number | undefined>(props.defaultValue);
  const checkedValue = () => (props.value !== undefined ? props.value : innerValue());

  let groupRef: HTMLDivElement | undefined;

  const initialFocusedIndex = props.options.findIndex((o) => o.value === checkedValue());
  const [focusedIndex, setFocusedIndex] = createSignal<number>(
    initialFocusedIndex >= 0 ? initialFocusedIndex : 0,
  );

  createEffect(() => {
    const idx = props.options.findIndex((o) => o.value === checkedValue());
    if (idx >= 0) setFocusedIndex(idx);
  });

  const enabledIndices = createMemo(() => {
    return props.options
      .map((opt, idx) => ({ opt, idx }))
      .filter(({ opt }) => !props.disabled && !opt.disabled)
      .map(({ idx }) => idx);
  });

  const currentEnabledPos = createMemo(() => {
    return enabledIndices().indexOf(focusedIndex());
  });

  const handleChange = (optValue: string | number, optDisabled?: boolean) => {
    if (props.disabled || optDisabled) return;
    if (props.value === undefined) setInnerValue(optValue);
    props.onChange?.(optValue);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    const indices = enabledIndices();
    if (indices.length === 0) return;

    const pos = currentEnabledPos();
    let nextPos = -1;

    switch (e.key) {
      case "ArrowRight":
      case "ArrowDown":
        e.preventDefault();
        nextPos = (pos + 1) % indices.length;
        break;
      case "ArrowLeft":
      case "ArrowUp":
        e.preventDefault();
        nextPos = (pos - 1 + indices.length) % indices.length;
        break;
      case "Home":
        e.preventDefault();
        nextPos = 0;
        break;
      case "End":
        e.preventDefault();
        nextPos = indices.length - 1;
        break;
      default:
        return;
    }

    if (nextPos >= 0) {
      const nextIdx = indices[nextPos];
      setFocusedIndex(nextIdx);
      handleChange(props.options[nextIdx].value, props.options[nextIdx].disabled);

      const circles = groupRef?.querySelectorAll("[data-radio-circle]");
      (circles?.[nextIdx] as HTMLElement)?.focus();
    }
  };

  return (
    <div
      ref={groupRef}
      class={props.class}
      classList={{
        [styles.radioGroup]: true,
        [styles[props.direction || "horizontal"]]: true,
        [styles.groupDisabled]: props.disabled,
        ...props.classList,
      }}
      style={props.style}
      role="radiogroup"
      onKeyDown={handleKeyDown}
    >
      <For each={props.options}>
        {(opt, idx) => {
          const isChecked = () => checkedValue() === opt.value;
          const isDisabled = () => props.disabled || opt.disabled;
          const isFocusable = () => idx() === focusedIndex() && !isDisabled();

          return (
            <label
              class={styles.radioItem}
              classList={{
                [styles[props.size || "middle"]]: true,
                [styles.checked]: isChecked(),
                [styles.disabled]: isDisabled(),
              }}
              onClick={() => {
                if (!isDisabled()) {
                  setFocusedIndex(idx());
                  handleChange(opt.value, opt.disabled);
                }
              }}
            >
              <span
                class={styles.circle}
                data-radio-circle
                role="radio"
                aria-checked={isChecked()}
                aria-disabled={isDisabled() || undefined}
                tabIndex={isFocusable() ? 0 : -1}
                onFocus={() => {
                  if (!isDisabled()) setFocusedIndex(idx());
                }}
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
