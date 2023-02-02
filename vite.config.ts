import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default ({ mode }) => {
    const config = {
        plugins: [react()],
        base: undefined
    };

    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
    const SKIP_BASE_PATH = process.env.VITE_SKIP_BASE_BATH;
    if (SKIP_BASE_PATH === undefined || SKIP_BASE_PATH === 'false')
        config.base = '/maclab-bsit3a-2023/';

    return defineConfig(config);
}
