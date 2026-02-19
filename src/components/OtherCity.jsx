import { useState, useEffect } from "react";
import { getCurrentCity } from "../api/openweather";

const CITIES = [
    { label: "서울 특별시", id: "Seoul, KR" },
    { label: "부산 광역시", id: "Busan, KR" },
    { label: "대전 광역시", id: "Daejeon, KR" },
    { label: "대구 광역시", id: "Daegu, KR" },
    { label: "광주 광역시", id: "Gwangju, KR" },
    { label: "인천 광역시", id: "Incheon, KR" },
    { label: "세종 특별자치시", id: "Sejong, KR" },
    { label: "제주도", id: "Jeju City, KR" },
    { label: "울산 광역시", id: "Ulsan, KR" },
];

export default function OtherCity({ onSelectCity }) {
    const [cityD, setCityD] = useState(CITIES[0].id);
    const [data, setData] = useState(null); // { weather, air }
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        onSelectCity?.(cityD);
    }, [cityD, onSelectCity]);

    useEffect(() => {
        let isCancelled = false;
        const loadWeather = async () => {
            try {
                setLoading(true);
                const data = await getCurrentCity(cityD);
                if (!isCancelled) setData(data);
            } catch (e) {
                if (!isCancelled) console.error(e);
            } finally {
                if (!isCancelled) setLoading(false);
            }
        };

        loadWeather();

        return () => {
            isCancelled = true;
        };
    }, [cityD]);

    if (loading) return <p>도시 날씨 불러오는 중...</p>;
    if (!data) return <p>날씨 정보가 없습니다.</p>;

    const { weather, air } = data;
    const airPol = air?.list?.[0];
    const cityLabel = CITIES.find((c) => c.id === cityD)?.label ?? weather.name;

    return (
        <div>
            <div>
                {CITIES.map((c) => (
                    <button key={c.id} onClick={() => setCityD(c.id)}>
                        {c.label}
                    </button>
                ))}
            </div>

            <h1>{cityLabel}</h1>
            <img
                src={`https://openweathermap.org/img/wn/${weather.weather?.[0]?.icon}@2x.png`}
                alt="Weather icon"
            />
            <p>{weather.weather?.[0]?.description}</p>
            <p>{Math.round(weather.main.temp)} °C</p>
            <p>
                초미세먼지 :
                {airPol?.components?.pm2_5?.toFixed(1) ||
                    "초미세먼지 정보 없음"}
                μg/m
            </p>
            <p>
                미세먼지 :
                {airPol?.components?.pm10?.toFixed(1) || "미세먼지 정보 없음"}
                μg/m
            </p>
            {/* <p>aqi{airPol?.main?.aqi ?? "N/A"}</p> */}
        </div>
    );
}
