import { OWM_API_KEY, OWM_BASE_URL } from "../library/env";

export async function CurrentWeather(city = "Seoul,KR") {
    const url = `/weather/data/2.5/weather?q=${city}&appid=${OWM_API_KEY}&units=metric&lang=kr`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`API 오류${response.status}`);
    return response.json();
}
