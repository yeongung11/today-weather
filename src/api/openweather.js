import { OWM_API_KEY, OWM_BASE_URL } from "../library/env";

// API, URL을 받으면 fetch해서 JSON으로 변환 해주는 함수
const fetchJson = async (url, apiError = "API 에러") => {
    try {
        const res = await fetch(url);
        if (!res.ok) {
            const errorText = await res.text();
            console.error(`${apiError} [${res.status}]: errorText`);
            throw new Error(
                `${apiError} ${res.status}: ${errorText.slice(0, 200)}`,
            );
        }
        return res.json();
    } catch (error) {
        console.error("fetchjson 에러", error);
        throw error;
    }
};
// 미세먼지 데이터
export const getAir = async (lat, lon) => {
    const url = `${OWM_BASE_URL}/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${OWM_API_KEY}`;
    return fetchJson(url, "미세먼지 오류");
};
// 도시 날씨, 미세먼지 데이터
export const getCurrentCity = async (p = "Seoul") => {
    const weatherUrl =
        typeof p === "number"
            ? `${OWM_BASE_URL}/data/2.5/weather?id=${p}&appid=${OWM_API_KEY}&units=metric&lang=kr`
            : `${OWM_BASE_URL}/data/2.5/weather?q=${p}&appid=${OWM_API_KEY}&units=metric&lang=kr`;
    const weather = await fetchJson(weatherUrl, "날씨 오류");
    const { lat, lon } = weather.coord;
    const air = await getAir(lat, lon);
    return { weather, air };
};

export const getCurrentCoords = async (lat, lng) => {
    const weatherUrl =
        `${OWM_BASE_URL}/data/2.5/weather?lat=${lat}&lon=${lng}` +
        `&appid=${OWM_API_KEY}&units=metric&lang=kr`;
    const weather = await fetchJson(weatherUrl, "날씨 오류");
    const air = await getAir(lat, lng);
    return { weather, air };
};

// 현재 위치 지역명을 한글로 변환
export const placeName = async (lat, lng) => {
    const url =
        `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lng}` +
        `&limit=1&appid=${OWM_API_KEY}`;
    const data = await fetchJson(url, "지역명 오류");
    const place = data?.[0] ?? null;

    return {
        ...place,
        name_ko: place?.local_names?.ko ?? place?.name ?? null,
    };
};

// 3시간 간격 예보
export const getForecast = async ({ cityId, q, lat, lng, cnt = 40 }) => {
    let base = `${OWM_BASE_URL}/data/2.5/forecast`;

    if (cityId != null) base += `?id=${cityId}`;
    else if (q != null) base += `?q=${encodeURIComponent(q)}`;
    else base += `?lat=${lat}&lon=${lng}`;
    const url = `${base}&appid=${OWM_API_KEY}&units=metric&lang=kr&cnt=${cnt}`;
    return fetchJson(url, "예보 오류");
};

// 5일 예보
export const get5Forecast = async ({ q, lat, lon }) => {
    const p = new URLSearchParams({
        appid: OWM_API_KEY,
        units: "metric",
        lang: "kr",
    });
    if (q) p.set("q", q);
    else {
        p.set("lat", String(lat));
        p.set("lon", String(lon));
    }
    const url = `${OWM_BASE_URL}/data/2.5/forecast?${p.toString()}`;
    return fetchJson(url, "5일 예보 오류");
};
