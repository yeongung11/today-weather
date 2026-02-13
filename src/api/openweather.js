import { OWM_API_KEY, OWM_BASE_URL } from "../library/env";

export async function CurrentWeather(city = "Seoul,KR") {
    const weatherUrl = `${OWM_BASE_URL}/data/2.5/weather?q=${city}&appid=${OWM_API_KEY}&units=metric&lang=kr`;
    const res1 = await fetch(weatherUrl);
    if (!res1.ok) throw new Error(`API 오류${res1.status}`);
    return res1.json();
}

export async function AirPollution() {
    const AirPollutionUrl = `${OWM_BASE_URL}/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${OWM_API_KEY}&units=metric&lang=kr`;
    const res2 = await fetch(AirPollutionUrl);
    if (res2.ok) throw new Error(`API 오류 ${res2}`);
    return res2.json();
}
