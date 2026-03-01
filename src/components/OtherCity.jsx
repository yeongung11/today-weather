import { useState, useEffect } from "react";
import { getCurrentCity } from "../api/openweather";

const CITIES = [
    { label: "서울", id: "Seoul, KR" },
    { label: "부산", id: "Busan, KR" },
    { label: "대전", id: "Daejeon, KR" },
    { label: "대구", id: "Daegu, KR" },
    { label: "광주", id: "Gwangju, KR" },
    { label: "인천", id: "Incheon, KR" },
    { label: "세종", id: "Sejong, KR" },
    { label: "제주", id: "Jeju City, KR" },
    { label: "울산", id: "Ulsan, KR" },
];

export default function OtherCity({ onSelectCity }) {
    const [cityD, setCityD] = useState(CITIES[0].id);
    const [data, setData] = useState(null);
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

    if (loading)
        return (
            <p className="text-center text-amber-50">
                도시 날씨 불러오는 중...
            </p>
        );
    if (!data)
        return (
            <p className="text-center text-amber-50">날씨 정보가 없습니다.</p>
        );

    const { weather } = data;
    const cityLabel = CITIES.find((c) => c.id === cityD)?.label ?? weather.name;

    return (
        <div className="text-center justify-items-center text-2xl">
            <div className="fixed top-6 right-6 z-50">
                {CITIES.map((c) => (
                    <button
                        className="w-15 h-15 rounded-full bg-white/20 backdrop-blur-sm text-sm text-white flex items-center justify-center shadow-lg hover:bg-white/30"
                        key={c.id}
                        onClick={() => setCityD(c.id)}
                    >
                        {c.label}
                    </button>
                ))}
            </div>

            <h1>{cityLabel}</h1>
            <div className="flex flex-row items-center">
                <img
                    src={`https://openweathermap.org/img/wn/${weather.weather?.[0]?.icon}@2x.png`}
                    alt="Weather icon"
                />
                <p className="text-6xl">{Math.round(weather.main.temp)} °</p>
            </div>
        </div>
    );
}
