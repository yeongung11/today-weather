import { OWM_API_KEY, OWM_BASE_URL } from "../library/env";

export async function SeoulWeather(city = "Seoul,KR") {
    // 날씨
    const weatherUrl = `${OWM_BASE_URL}/data/2.5/weather?q=${city}&appid=${OWM_API_KEY}&units=metric&lang=kr`;
    const resWeather = await fetch(weatherUrl);
    if (!resWeather.ok) throw new Error(`API 오류${resWeather.status}`);
    const weather = await resWeather.json();
    // return resWeather.json();

    // 미세먼지

    const { lat, lon } = weather.coord;
    const AirPollutionUrl = `${OWM_BASE_URL}/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${OWM_API_KEY}`;
    const resAir = await fetch(AirPollutionUrl);
    if (!resAir.ok) throw new Error(`API 오류 ${resAir.status}`);
    const air = await resAir.json();

    return { weather, air };
}

// 현재 위치
export const MyLocation = async (lat, lng) => {
    const resMyLocation = await fetch(
        `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lng}&limit=1&appid=${OWM_API_KEY}`,
    );
    if (!resMyLocation.ok)
        throw new Error(`reverseGeo 오류 ${resMyLocation.status}`);
    const data = await resMyLocation.json(); // 배열
    return data?.[0] ?? null;
};

// 다른 도시
export const OtherCity = (city = "Seoul") =>
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OWM_API_KEY}&units=metric`,
    ).then((res) => res.json());
