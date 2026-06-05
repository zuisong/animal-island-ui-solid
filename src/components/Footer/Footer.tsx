import { JSX, splitProps, mergeProps } from 'solid-js';
import styles from './footer.module.less';

export type FooterType = 'sea' | 'tree';

export interface FooterProps {
    /** Footer 类型 */
    type?: FooterType;
    /** 自定义类名 */
    class?: string;
    /** 自定义类名列表 */
    classList?: { [key: string]: boolean | undefined };
    /** 自定义样式 */
    style?: JSX.CSSProperties;
}

export const Footer = (props: FooterProps) => {
    const merged = mergeProps({ type: 'tree' as FooterType }, props);
    const [local, rest] = splitProps(merged, ['type', 'class', 'classList', 'style']);

    return (
        <div 
            class={local.class}
            classList={{
                [styles.footer]: true,
                [styles[local.type]]: true,
                ...local.classList
            }}
            style={local.style} 
        />
    );
};
