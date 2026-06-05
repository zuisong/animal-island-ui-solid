import { JSX, splitProps, mergeProps } from 'solid-js';
import './cursor.css';

export interface CursorProps {
    /** 子元素 */
    children?: JSX.Element;
    /** 自定义类名 */
    class?: string;
    /** 自定义类名列表 */
    classList?: { [key: string]: boolean | undefined };
    /** 自定义样式 */
    style?: JSX.CSSProperties;
    /**
     * 是否对所有后代元素强制覆盖光标。默认 `true`。
     * - `true`：全覆盖，所有后代（含 a/button 等交互元素）统一使用自定义光标
     * - `false`：仅容器自身设置自定义光标，交互元素保留 `pointer`、文本输入保留 `text`、禁用态保留 `not-allowed`
     */
    forceAll?: boolean;
}

export const Cursor = (props: CursorProps) => {
    const merged = mergeProps({ forceAll: true }, props);
    const [local, rest] = splitProps(merged, ['children', 'class', 'classList', 'style', 'forceAll']);

    return (
        <div 
            class={local.class}
            classList={{
                'animal-cursor': true,
                'animal-cursor--force': local.forceAll,
                'animal-cursor--scoped': !local.forceAll,
                ...local.classList
            }}
            style={local.style}
        >
            {local.children}
        </div>
    );
};
