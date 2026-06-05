import { JSX, createSignal, splitProps, mergeProps, Show } from 'solid-js';
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
    const merged = mergeProps(
        { defaultChecked: false, size: 'default' as SwitchSize, disabled: false, loading: false },
        props
    );
    const [local, rest] = splitProps(merged, [
        'checked',
        'defaultChecked',
        'size',
        'disabled',
        'loading',
        'checkedChildren',
        'unCheckedChildren',
        'onChange',
        'class',
        'classList',
    ]);

    const [innerChecked, setInnerChecked] = createSignal(local.defaultChecked);
    const isChecked = () => (local.checked !== undefined ? local.checked : innerChecked());

    const handleClick = () => {
        if (local.disabled || local.loading) return;
        const next = !isChecked();
        if (local.checked === undefined) setInnerChecked(next);
        local.onChange?.(next);
    };

    return (
        <button
            type="button"
            role="switch"
            aria-checked={isChecked()}
            class={local.class}
            classList={{
                [styles.switch]: true,
                [styles[`switch-${local.size}`]]: true,
                [styles['switch-checked']]: isChecked(),
                [styles['switch-disabled']]: local.disabled,
                [styles['switch-loading']]: local.loading,
                ...local.classList
            }}
            onClick={handleClick}
            disabled={local.disabled}
        >
            <span class={styles.handle}>
                <Show when={local.loading}>
                    <span class={styles.spinner} />
                </Show>
            </span>
            <span class={styles.inner}>
                {isChecked() ? local.checkedChildren : local.unCheckedChildren}
            </span>
        </button>
    );
};
