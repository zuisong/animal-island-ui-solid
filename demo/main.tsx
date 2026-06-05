import { render } from 'solid-js/web';
import App from './App';

document.body.style.margin = '0';

const globalStyle = document.createElement('style');
globalStyle.textContent = `
  *::-webkit-scrollbar { display: none; }
`;
document.head.appendChild(globalStyle);

render(() => <App />, document.getElementById('root')!);
