import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    plugins: [tailwindcss(), react()],
    server: {
        proxy: {
            "/weather": {
                target: "https://api.openweathermap.org",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/weather/, ""),
            },
        },
    },
});
