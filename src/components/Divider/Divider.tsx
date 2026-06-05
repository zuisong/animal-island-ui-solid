import { JSX, splitProps, mergeProps } from 'solid-js';
import styles from './divider.module.less';

export type DividerType =
    | 'line-brown'
    | 'line-teal'
    | 'line-white'
    | 'line-yellow'
    | 'wave-yellow'
    | 'dashed-brown'
    | 'dashed-teal'
    | 'dashed-white'
    | 'dashed-yellow';

export interface DividerProps {
    /** 分隔线类型 */
    type?: DividerType;
    /** 自定义类名 */
    class?: string;
    /** 自定义类名列表 */
    classList?: { [key: string]: boolean | undefined };
    /** 自定义样式 */
    style?: JSX.CSSProperties;
}

export const Divider = (props: DividerProps) => {
    const merged = mergeProps({ type: 'line-brown' as DividerType }, props);
    const [local, rest] = splitProps(merged, ['type', 'class', 'classList', 'style']);
    
    return (
        <div 
            class={local.class}
            classList={{
                [styles.divider]: true,
                [styles[local.type]]: true,
                ...local.classList
            }}
            style={local.style} 
        />
    );
};
