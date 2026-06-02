/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_API_URL?: string;
	readonly VITE_ADMIN_ACCESS_KEY?: string;
	readonly VITE_PUBLIC_PATH?: string;
	// add more env variable types as needed
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
