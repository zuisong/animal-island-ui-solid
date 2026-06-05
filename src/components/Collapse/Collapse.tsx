import { createSignal } from "solid-js";
import styles from "./collapse.module.less";
import { JSX } from "@solidjs/web/jsx-runtime";

export interface CollapseProps {
  /** 问题标题 */
  question: JSX.Element;
  /** 答案内容 */
  answer: JSX.Element;
  /** 是否默认展开 */
  defaultExpanded?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 自定义类名 */
  class?: string;
  /** 自定义类名列表 */
  classList?: { [key: string]: boolean | undefined };
  /** 自定义样式 */
  style?: JSX.CSSProperties;
}

export const Collapse = (props: CollapseProps) => {
  const [expanded, setExpanded] = createSignal(props.defaultExpanded ?? false);

  const handleClick = (e: MouseEvent) => {
    if (!props.disabled) {
      setExpanded(!expanded());
    }
  };

  return (
    <div
      class={[
        props.class,
        styles.faqCard,
        expanded() ? styles.expanded : undefined,
        props.disabled ? styles.disabled : undefined,
        props.classList,
      ]
        .flat()
        .filter(Boolean) as any}
      style={props.style}
    >
      <button
        class={styles.questionHeader}
        onClick={handleClick}
        disabled={props.disabled}
        aria-expanded={expanded() ? "true" : "false"}
      >
        <span class={styles.questionIcon}>{expanded() ? "−" : "+"}</span>
        <span class={styles.questionText}>{props.question}</span>
        <span class={styles.leafDecoration}>
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path
              fill="currentColor"
              d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z"
            />
          </svg>
        </span>
      </button>
      <div class={styles.answerWrapper}>
        <div class={styles.answerContent}>{props.answer}</div>
      </div>
    </div>
  );
};
