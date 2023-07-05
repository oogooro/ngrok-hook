declare global {
    namespace NodeJS {
        interface ProcessEnv {
            HOOK_URL: string;
            NGROK_KEY: string;
        }
    }
}

export { };