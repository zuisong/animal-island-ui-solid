import { createSignal, merge, omit } from "solid-js";
import type { JSX } from "@solidjs/web";
import styles from "./input.module.less";

export type InputSize = "small" | "middle" | "large";

export interface InputProps extends Omit<
  JSX.InputHTMLAttributes<HTMLInputElement>,
  "size" | "prefix"
> {
  /** 输入框尺寸 */
  size?: InputSize;
  /** 前缀图标 */
  prefix?: JSX.Element;
  /** 后缀图标 */
  suffix?: JSX.Element;
  /** 允许清除 */
  allowClear?: boolean;
  /** 错误状态 */
  status?: "error" | "warning";
  /** 是否显示阴影 */
  shadow?: boolean;
  /** 默认值 */
  defaultValue?: string | number;
  /** 清除回调 */
  onClear?: () => void;
  /** 自定义类名列表 */
  classList?: Record<string, boolean>;
}

export const Input = (props: InputProps) => {
  const merged = merge(
    { size: "middle" as InputSize, allowClear: false, shadow: false, disabled: false },
    props,
  );
  const rest = omit(merged,
    "size",
    "prefix",
    "suffix",
    "allowClear",
    "status",
    "shadow",
    "disabled",
    "class",
    "classList",
    "value",
    "defaultValue",
    "onInput",
    "onChange",
    "onClear",
  );

  const [innerValue, setInnerValue] = createSignal(merged.defaultValue ?? "");
  const currentValue = () => (merged.value !== undefined ? merged.value : innerValue());
  let inputRef: HTMLInputElement | undefined;

  const handleChange = (e: Event & { target: HTMLInputElement }) => {
    if (merged.value === undefined) setInnerValue(e.target.value);
    if (typeof merged.onInput === "function") {
      (merged.onInput as any)(e);
    }
    if (typeof merged.onChange === "function") {
      (merged.onChange as any)(e);
    }
  };

  const handleClear = () => {
    if (inputRef) {
      inputRef.value = "";
      inputRef.dispatchEvent(
        new InputEvent("input", { bubbles: true, inputType: "deleteContentBackward" }),
      );
    }
    if (merged.value === undefined) setInnerValue("");
    merged.onClear?.();
  };

  return (
    <span
      class={[
        merged.class,
        {
          [styles.wrapper]: true,
          [styles[`wrapper-${merged.size}`]]: true,
          [styles[`wrapper-${merged.status}`]]: !!merged.status,
          [styles["wrapper-disabled"]]: merged.disabled,
          [styles["wrapper-no-shadow"]]: !merged.shadow,
        },
        merged.classList,
      ].flat() as any}
    >
      {merged.prefix && <span class={styles.prefix}>{merged.prefix}</span>}
      <input
        ref={inputRef}
        class={styles.input}
        disabled={merged.disabled}
        value={currentValue()}
        onInput={handleChange}
        {...rest}
      />
      {merged.allowClear && currentValue() !== "" && !merged.disabled && (
        <span class={styles.clear} onClick={handleClear} role="button" tabindex="-1">
          ×
        </span>
      )}
      {merged.suffix && <span class={styles.suffix}>{merged.suffix}</span>}
    </span>
  );
};
