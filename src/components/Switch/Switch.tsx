import { JSX, createSignal, Show } from 'solid-js';
import styles from './switch.module.less';

export type SwitchSize = 'small' | 'default';

export interface SwitchProps {
    /** 是否选中（受控） */
    checked?: boolean;
    /** 默认是否选中 */
    defaultChecked?: boolean;
    /** 尺寸 */
    size?: SwitchSize;
    /** 禁用 */
    disabled?: boolean;
    /** 加载状态 */
    loading?: boolean;
    /** 选中时文案 */
    checkedChildren?: JSX.Element;
    /** 未选中时文案 */
    unCheckedChildren?: JSX.Element;
    /** 变化回调 */
    onChange?: (checked: boolean) => void;
    class?: string;
    classList?: { [key: string]: boolean | undefined };
}

export const Switch = (props: SwitchProps) => {
    const [innerChecked, setInnerChecked] = createSignal(props.defaultChecked || false);
    const isChecked = () => (props.checked !== undefined ? props.checked : innerChecked());

    const handleClick = () => {
        if (props.disabled || props.loading) return;
        const next = !isChecked();
        if (props.checked === undefined) setInnerChecked(next);
        props.onChange?.(next);
    };

    return (
        <button
            type="button"
            role="switch"
            aria-checked={isChecked()}
            class={props.class}
            classList={{
                [styles.switch]: true,
                [styles[`switch-${props.size || 'default'}`]]: true,
                [styles['switch-checked']]: isChecked(),
                [styles['switch-disabled']]: props.disabled,
                [styles['switch-loading']]: props.loading,
                ...props.classList
            }}
            onClick={handleClick}
            disabled={props.disabled}
        >
            <span class={styles.handle}>
                <Show when={props.loading}>
                    <span class={styles.spinner} />
                </Show>
            </span>
            <span class={styles.inner}>
                {isChecked() ? props.checkedChildren : props.unCheckedChildren}
            </span>
        </button>
    );
};
