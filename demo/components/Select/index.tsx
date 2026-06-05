import { JSX, createSignal } from 'solid-js';
import { Select } from '../../../src';
import type { SelectOption } from '../../../src';
import {
    labelStyle,
    ApiTable,
    CodeBlock,
    sectionStyle,
    sectionTitleStyle,
    tagStyle,
    demoBoxStyle,
    demoDashedBoxStyle,
} from '../../tools';

const SELECT_API = [
    { prop: 'options', desc: '选项列表', type: 'SelectOption[]', defaultVal: '-', required: true },
    { prop: 'value', desc: '当前选中值', type: 'string', defaultVal: '-', required: true },
    { prop: 'onChange', desc: '选中变化回调', type: '(key: string) => void', defaultVal: '-', required: true },
    { prop: 'placeholder', desc: '占位文本', type: 'string', defaultVal: '请选择' },
    { prop: 'disabled', desc: '禁用状态', type: 'boolean', defaultVal: 'false' },
];

const SelectDemo = () => {
    const [value1, setValue1] = createSignal('fish1');
    const [value2, setValue2] = createSignal('');
    const [value3, setValue3] = createSignal('flower2');
    const [value4, setValue4] = createSignal('');
    
    const fishOptions: SelectOption[] = [
        { key: 'fish1', label: '鲈鱼' },
        { key: 'fish2', label: '鲷鱼' },
        { key: 'fish3', label: '草鱼' },
        { key: 'fish4', label: '龙睛鱼' },
        { key: 'fish5', label: '神仙鱼' },
    ];
    
    const flowerOptions: SelectOption[] = [
        { key: 'flower1', label: '樱花' },
        { key: 'flower2', label: '玫瑰' },
        { key: 'flower3', label: '向日葵' },
        { key: 'flower4', label: '薰衣草' },
        { key: 'flower5', label: '郁金香' },
    ];
    
    const fruitOptions: SelectOption[] = [
        { key: 'fruit1', label: '草莓' },
        { key: 'fruit2', label: '蓝莓' },
        { key: 'fruit3', label: '桃子' },
        { key: 'fruit4', label: '樱桃' },
        { key: 'fruit5', label: '猕猴桃' },
    ];

    return (
        <div style={sectionStyle}>
            <div style={sectionTitleStyle}>
                Select <span style={tagStyle}>基础用法</span>
            </div>
            <div style={labelStyle}>默认状态</div>
            <div style={{ 'margin-bottom': '8px', 'font-size': '13px', color: '#a08060' }}>
                当前选中:{' '}
                <span style={{ color: '#19c8b9', 'font-weight': 600 }}>
                    {fishOptions.find((o) => o.key === value1())?.label}
                </span>
            </div>
            <div style={demoBoxStyle}>
                <Select options={fishOptions} value={value1()} onChange={setValue1} />
            </div>
            <div style={labelStyle}>自定义占位文本</div>
            <div style={demoDashedBoxStyle}>
                <Select options={flowerOptions} value={value2()} onChange={setValue2} placeholder="请选择花朵" />
                <Select options={fruitOptions} value={value4()} onChange={setValue4} placeholder="请选择水果" />
            </div>
            <div style={labelStyle}>禁用状态</div>
            <div style={S_demoBox}>
                <Select options={flowerOptions} value={value3()} onChange={setValue3} disabled />
            </div>
            <CodeBlock
                code={`import { createSignal } from 'solid-js';
import { Select } from 'animal-island-ui-solid';

const App = () => {
    const [value, setValue] = createSignal('option1');
    return (
        <Select options={options} value={value()} onChange={setValue} />
    );
};

export default App;`}
            />
            <ApiTable rows={SELECT_API} />
        </div>
    );
};

// Local hack for demoBoxStyle because it was used as S.demoBox in original code
const S_demoBox = demoBoxStyle;

export default SelectDemo;
