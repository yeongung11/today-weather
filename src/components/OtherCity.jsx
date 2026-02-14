import { useState, useEffect } from "react";
import { SeoulWeather } from "../api/openweather"; // city 인자 받게 이미 되어 있음

const CITIES = [
    { label: "서울", id: 1835848 },
    { label: "부산", id: 1838524 },
    { label: "대전", id: 1835235 },
    { label: "대구", id: 1835329 },
    { label: "광주", id: 1841811 },
];

export default function OtherCity() {
    const [city, setCity] = useState(CITIES[0].id);
    const [data, setData] = useState(null); // { weather, air }
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isCancelled = false;
        const loadWeather = async () => {
            try {
                setLoading(true);
                const data = await SeoulWeather(city);
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
    }, [city]);

    if (loading) return <p>도시 날씨 불러오는 중...</p>;
    if (!data) return <p>날씨 정보가 없습니다.</p>;

    const { weather, air } = data;
    const airPol = air?.list?.[0];

    return (
        <div>
            <div>
                {CITIES.map((c) => (
                    <button key={c.id} onClick={() => setCity(c.id)}>
                        {c.label}
                    </button>
                ))}
            </div>

            <h1>{weather.name}</h1>
            <img
                src={`https://openweathermap.org/img/wn/${weather.weather?.[0]?.icon}@2x.png`}
                alt="Weather icon"
            />
            <p>{weather.weather?.[0]?.description}</p>
            <p>{Math.round(weather.main.temp)} °C</p>
            <p>AQI : {airPol?.main?.aqi ?? "N/A"}</p>
        </div>
    );
}
