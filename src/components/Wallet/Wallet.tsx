import { JSX, Show } from 'solid-js';
import styles from './wallet.module.less';
import { Icon } from '../Icon';

export type WalletSize = 'small' | 'medium' | 'large';

export interface WalletProps {
    /** 金额数值，数字会按千分位格式化；字符串则原样展示 */
    value?: number | string;
    /** 自定义货币图标，默认使用动森风格钱袋 */
    icon?: JSX.Element;
    /** 尺寸预设 */
    size?: WalletSize;
    /** 千分位分隔符，默认 ","，传 "" 可关闭 */
    thousandSeparator?: string;
    class?: string;
    classList?: { [key: string]: boolean | undefined };
    style?: JSX.CSSProperties;
}

/** 数值格式化：仅对 number 类型按千分位插入分隔符 */
const formatValue = (value: WalletProps['value'], sep: string): string => {
    if (value === undefined || value === null) return '00,000';
    if (typeof value !== 'number') return String(value);
    if (sep === '') return String(value);
    const sign = value < 0 ? '-' : '';
    const [int, frac] = Math.abs(value).toString().split('.');
    const intWithSep = int.replace(/\B(?=(\d{3})+(?!\d))/g, sep || ',');
    return frac ? `${sign}${intWithSep}.${frac}` : `${sign}${intWithSep}`;
};

const SIZE_CLASS: Record<WalletSize, string> = {
    small: styles['size-small'],
    medium: '',
    large: styles['size-large'],
};

export const Wallet = (props: WalletProps) => {
    return (
        <div
            class={props.class}
            classList={{
                [styles.wallet]: true,
                [SIZE_CLASS[props.size || 'medium']]: !!SIZE_CLASS[props.size || 'medium'],
                ...props.classList,
            }}
            style={props.style}
        >
            <div class={styles.bagSlot} aria-hidden="true">
                <Show when={props.icon} fallback={<Icon item={22} size="80%" />}>
                    {props.icon}
                </Show>
            </div>
            <div class={styles.pill}>
                <span class={styles.value}>{formatValue(props.value, props.thousandSeparator ?? ',')}</span>
            </div>
        </div>
    );
};
