import { createRoot } from 'react-dom/client';
import 'tailwindcss/tailwind.css';
import 'react-toastify/dist/ReactToastify.css';

import { App } from 'containers';

const container = document.getElementById('root') as HTMLDivElement;
const root = createRoot(container);

root.render(<App />);
