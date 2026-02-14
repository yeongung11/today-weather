import { useState, useEffect } from "react";
import { getWeatherByCoords, MyLocation } from "../api/openweather";

export default function MyLocationComp() {
    const [location, setLocation] = useState(null);
    const [place, setPlace] = useState(null);
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!navigator.geolocation) return;

        navigator.geolocation.getCurrentPosition(
            (pos) => {
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
        (async () => {
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
        })();
    }, [location]);

    if (loading) return <p>로딩 중</p>;

    return (
        <div>
            <p>{place?.name_ko ?? place?.name ?? "-"}</p>

            {weather && (
                <>
                    <img
                        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                        alt="Weather icon"
                    />
                    <p>{weather?.weather?.[0]?.description ?? "-"}</p>
                    <p>
                        {weather?.main?.temp != null
                            ? `${Math.round(weather.main.temp)}°C`
                            : "-"}
                    </p>
                </>
            )}
        </div>
    );
}
