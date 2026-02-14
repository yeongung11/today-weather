import { useState, useEffect } from "react";
import { getWeatherByCoords, MyLocation } from "../api/openweather";

export default function MyLocationComp() {
    const [location, setLocation] = useState(null);
    const [place, setPlace] = useState(null); // 지역명 저장
    const [weather, setWeather] = useState(null); // 지역명 저장
    const [loading, setLoading] = useState(null); // 지역명 저장

    useEffect(() => {
        if (!navigator.geolocation) return;
        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                setLocation({
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                });
            },
            () => setLocation({ lat: 37.5665, lng: 126.978 }),
        );
    }, []);

    useEffect(() => {
        if (!location) return;
        setLoading(true);
        async () => {
            try {
                const [placeData, weatherData] = await Promise.all([
                    MyLocation(location.lat, location.lng),
                    getWeatherByCoords(location.lat, location.lng),
                ]);
                setPlace(placeData);
                setWeather(weatherData);
            } catch (e) {
                console.error("현재 위치 데이터 없음", e);
            } finally {
                setLoading(false);
            }
        };
    }, [location]);

    if (loading) return <p>로딩 중</p>;

    return (
        <div>
            <p>{place?.name_ko ?? place?.name ?? "-"}</p>
            <p>{weather?.weather?.[0]?.description ?? "-"}</p>
            <p>
                {weather?.main?.temp != null
                    ? `${Math.round(weather.main.temp)}°C`
                    : "-"}
            </p>
            {/* <p>국가: {place?.country ?? "-"}</p>
            <p>지역: {place?.state ?? "-"}</p>
            <p>
                좌표: {location?.lat?.toFixed(2)}, {location?.lng?.toFixed(2)}
            </p> */}
        </div>
    );
}
