import { JSX, createSignal, splitProps, mergeProps } from 'solid-js';
import styles from './input.module.less';

export type InputSize = 'small' | 'middle' | 'large';

export interface InputProps extends Omit<
    JSX.InputHTMLAttributes<HTMLInputElement>,
    'size' | 'prefix'
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
    status?: 'error' | 'warning';
    /** 是否显示阴影 */
    shadow?: boolean;
    /** 默认值 */
    defaultValue?: string | number;
    /** 清除回调 */
    onClear?: () => void;
}

export const Input = (props: InputProps) => {
    const merged = mergeProps({ size: 'middle' as InputSize, allowClear: false, shadow: false, disabled: false }, props);
    const [local, rest] = splitProps(merged, [
        'size',
        'prefix',
        'suffix',
        'allowClear',
        'status',
        'shadow',
        'disabled',
        'class',
        'classList',
        'value',
        'defaultValue',
        'onChange',
        'onClear',
    ]);

    const [innerValue, setInnerValue] = createSignal(local.defaultValue ?? '');
    const currentValue = () => local.value !== undefined ? local.value : innerValue();

    const handleChange = (e: Event & { target: HTMLInputElement }) => {
        if (local.value === undefined) setInnerValue(e.target.value);
        if (typeof local.onChange === 'function') {
            (local.onChange as any)(e);
        }
    };

    const handleClear = () => {
        if (local.value === undefined) setInnerValue('');
        local.onClear?.();
    };

    return (
        <span 
            class={local.class}
            classList={{
                [styles.wrapper]: true,
                [styles[`wrapper-${local.size}`]]: true,
                [styles[`wrapper-${local.status}`]]: !!local.status,
                [styles['wrapper-disabled']]: local.disabled,
                [styles['wrapper-no-shadow']]: !local.shadow,
                ...local.classList
            }}
        >
            {local.prefix && <span class={styles.prefix}>{local.prefix}</span>}
            <input
                class={styles.input}
                disabled={local.disabled}
                value={currentValue()}
                onInput={handleChange}
                {...rest}
            />
            {local.allowClear && currentValue() !== '' && !local.disabled && (
                <span
                    class={styles.clear}
                    onClick={handleClear}
                    role="button"
                    tabIndex={-1}
                >
                    ×
                </span>
            )}
            {local.suffix && <span class={styles.suffix}>{local.suffix}</span>}
        </span>
    );
};
