import { OWM_API_KEY, OWM_BASE_URL } from "../library/env";

const fetchJson = async (url, apiError = "API 에러") => {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`${apiError} ${res.status}`);
    return res.json();
};

export const getAir = async (lat, lon) => {
    const url = `${OWM_BASE_URL}/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${OWM_API_KEY}`;
    return fetchJson(url, "미세먼지 오류");
};

export const getCurrentCity = async (p = "Seoul") => {
    const weatherUrl =
        typeof param === "number"
            ? `${OWM_BASE_URL}/data/2.5/weather?id=${p}&appid=${OWM_API_KEY}&units=metric&lang=kr`
            : `${OWM_BASE_URL}/data/2.5/weather?q=${p}&appid=${OWM_API_KEY}&units=metric&lang=kr`;
    const weather = await fetchJson(weatherUrl, "날씨 오류");
    const { lat, lon } = weather.coord;
    const air = await getAir(lat, lon);
    return { weather, air };
};

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

// export const getForecast = async ({ cityId, lat, lng }) => {
//   const url =
//     cityId != null
//       ? `${OWM_BASE_URL}/data/2.5/forecast?id=${cityId}&appid=${OWM_API_KEY}&units=metric&lang=kr`
//       : `${OWM_BASE_URL}/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=${OWM_API_KEY}&units=metric&lang=kr`;

//   return fetchJson(url, "예보 오류");
// };

// export async function CityWeather(param = "Seoul") {
//     let weatherUrl;
//     if (typeof param === "number") {
//         weatherUrl = `${OWM_BASE_URL}/data/2.5/weather?id=${param}&appid=${OWM_API_KEY}&units=metric&lang=kr`;
//     } else {
//         weatherUrl = `${OWM_BASE_URL}/data/2.5/weather?q=${param}&appid=${OWM_API_KEY}&units=metric&lang=kr`;
//     }

//     const resWeather = await fetch(weatherUrl);
//     if (!resWeather.ok) throw new Error(`API 오류 ${resWeather.status}`);
//     const weather = await resWeather.json();

//     const { lat, lon } = weather.coord;
//     const airUrl = `${OWM_BASE_URL}/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${OWM_API_KEY}`;
//     const resAir = await fetch(airUrl);
//     if (!resAir.ok) throw new Error(`미세먼지 API 오류 ${resAir.status}`);
//     const air = await resAir.json();

//     return { weather, air };
// }

// // 현재 위치
// export const MyLocation = async (lat, lng) => {
//     const resMyLocation = await fetch(
//         `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lng}&limit=1&appid=${OWM_API_KEY}`,
//     ); // 지역 정보 결과 1개만 받기
//     if (!resMyLocation.ok)
//         throw new Error(`reverseGeo 오류 ${resMyLocation.status}`); // HTTP 응답이 200대가 아니면 catch로 넘김
//     const data = await resMyLocation.json(); // 배열
//     const place = data?.[0] ?? null;
//     return {
//         ...place,
//         name_ko: place?.local_names?.ko ?? place?.name ?? null, // 첫 번째 place에서 장소 이름에 한글이 있으면 한글로 없으면 place.name
//     };
// };

// 다른 도시
// export const FetchOtherCity = (city = "Seoul") =>
//     fetch(
//         `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OWM_API_KEY}&units=metric&lang=kr`,
//     ).then((res) => res.json());

// export async function SeoulWeather(city = "Seoul,KR") {
//     // 날씨
//     const weatherUrl = `${OWM_BASE_URL}/data/2.5/weather?q=${city}&appid=${OWM_API_KEY}&units=metric&lang=kr`;
//     const resWeather = await fetch(weatherUrl);
//     if (!resWeather.ok) throw new Error(`API 오류${resWeather.status}`);
//     const weather = await resWeather.json();
//     // return resWeather.json();

//     // 미세먼지

//     const { lat, lon } = weather.coord;
//     const AirPollutionUrl = `${OWM_BASE_URL}/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${OWM_API_KEY}`;
//     const resAir = await fetch(AirPollutionUrl);
//     if (!resAir.ok) throw new Error(`API 오류 ${resAir.status}`);
//     const air = await resAir.json();

//     return { weather, air };
// }
