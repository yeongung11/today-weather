import { useState, useEffect } from "react";
import { placeName, getCurrentCoords } from "../api/openweather";

export default function MyLocationComp() {
    const [location, setLocation] = useState(null);
    const [place, setPlace] = useState(null);
    const [weather, setWeather] = useState(null);
    const [air, setAir] = useState(null);
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

    if (loading) return <p>로딩 중</p>;
    const airPol = air?.list?.[0];

    return (
        <div>
            <h1>{place?.name_ko ?? place?.name ?? "-"}</h1>

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
                    <p>
                        초미세먼지 :
                        {airPol?.components?.pm2_5?.toFixed(1) ||
                            "초미세먼지 정보 없음"}
                        μg/m
                    </p>
                    <p>
                        미세먼지 :
                        {airPol?.components?.pm10?.toFixed(1) ||
                            "미세먼지 정보 없음"}
                        μg/m
                    </p>
                </>
            )}
        </div>
    );
}
