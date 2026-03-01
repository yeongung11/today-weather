import { useState, useEffect } from "react";
import { placeName, getCurrentCoords } from "../api/openweather";

export default function MyLocationComp() {
    const [location, setLocation] = useState(null);
    const [place, setPlace] = useState(null);
    const [weather, setWeather] = useState(null);
    const [, setAir] = useState(null);
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
                const [placeData, currentData] = await Promise.all([
                    placeName(location.lat, location.lng),
                    getCurrentCoords(location.lat, location.lng),
                ]);

                setPlace(placeData);
                setWeather(currentData.weather);
                setAir(currentData.air);
            } catch (e) {
                console.error("현재 위치 데이터 없음", e);
            } finally {
                setLoading(false);
            }
        })();
    }, [location]);

    if (loading) return <p className="text-center text-amber-50">로딩 중</p>;

    return (
        <div className="text-center justify-items-center mb-7 text-2xl">
            <h1>{place?.name_ko ?? place?.name ?? "-"}</h1>

            {weather && (
                <>
                    <div className="flex flex-row items-center">
                        <img
                            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                            alt="Weather icon"
                        />
                        <p className="text-6xl">
                            {weather?.main?.temp != null
                                ? `${Math.round(weather.main.temp)} °`
                                : "-"}
                        </p>
                    </div>
                </>
            )}
        </div>
    );
}
