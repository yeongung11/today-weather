export const OWM_API_KEY = import.meta.env.VITE_OWM_API_KEY;
export const OWM_BASE_URL =
    import.meta.env.VITE_OWM_BASE_URL || "https://api.openweathermap.org";

if (!OWM_API_KEY) {
    console.error("🚨 VITE_OWM_API_KEY가 없습니다!");
} else if (!OWM_BASE_URL) {
    console.error("🚨 VITE_OWM_BASE_URL이 없습니다!");
}
