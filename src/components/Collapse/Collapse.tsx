import { JSX, createSignal, splitProps, mergeProps } from 'solid-js';
import styles from './collapse.module.less';

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
    const merged = mergeProps({ defaultExpanded: false, disabled: false }, props);
    const [local, rest] = splitProps(merged, [
        'question',
        'answer',
        'defaultExpanded',
        'disabled',
        'class',
        'classList',
        'style'
    ]);

    const [expanded, setExpanded] = createSignal(local.defaultExpanded);

    const handleClick = () => {
        if (!local.disabled) {
            setExpanded(!expanded());
        }
    };

    return (
        <div 
            class={local.class} 
            classList={{
                [styles.faqCard]: true,
                [styles.expanded]: expanded(),
                [styles.disabled]: local.disabled,
                ...local.classList
            }}
            style={local.style}
        >
            <button
                class={styles.questionHeader}
                onClick={handleClick}
                disabled={local.disabled}
                aria-expanded={expanded()}
            >
                <span class={styles.questionIcon}>
                    {expanded() ? '−' : '+'}
                </span>
                <span class={styles.questionText}>{local.question}</span>
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
                <div class={styles.answerContent}>{local.answer}</div>
            </div>
        </div>
    );
};
