import { useState, useEffect } from "react";
import { SeoulWeather } from "../api/openweather";

export default function Weather() {
    const [weatherData, setWeatherData] = useState(null); // 아직 데이터가 없으므로 null openWeatherAPI는 객체를 반환하는데  { name: "Seoul", main: { temp: 15 }, weather: [...] }
    const [loading, setLoading] = useState(true);

    // 날씨 불러오기
    useEffect(() => {
        SeoulWeather()
            .then((data) => {
                console.log("날씨 데이터 + 미세먼지 데이터", data);
                setWeatherData(data); // {weather, air}
            })
            .catch((err) => console.error("API 에러:", err))
            .finally(() => setLoading(false));
    }, []);

    // 로딩
    if (loading) return <p>날씨 불러오는 중...</p>;
    if (!weatherData) return <p>날씨 정보가 없습니다.</p>;
    // 로딩

    const { weather, air } = weatherData;
    const airPol = air?.list?.[0];

    return (
        <>
            <h1>오늘의 서울 날씨</h1>
            {weather && (
                <div>
                    <h2>{weather.name}</h2>
                    <p>현재 기온 : {weather.main.temp.toFixed(1)} °C</p>
                    <p>최저 기온 : {weather.main.temp_min.toFixed(1)}°C</p>
                    <p>최고 기온 : {weather.main.temp_max.toFixed(1)}°C</p>
                    <p>현재 상태 : {weather.weather[0].description}</p>
                    <p>체감 온도 : {weather.main.feels_like.toFixed(1)} °C</p>
                    <p>습도 : {weather.main.humidity} %</p>
                    <p>기압 : {weather.main.pressure}</p>
                    <p>
                        가시거리 :
                        {weather?.visibility
                            ? `${(weather.visibility / 1000).toFixed(1)} km`
                            : "-"}
                    </p>

                    <p>풍속 : {weather.wind.speed.toFixed(1)} m/s</p>
                    <p>풍향 : {weather.wind.deg} °</p>
                    <p>구름 : {weather.clouds?.all} %</p>

                    <p>
                        강수량:{" "}
                        {weather.rain?.["1h"]
                            ? `${weather.rain["1h"].toFixed(1)}mm`
                            : "오늘 비 안옴"}
                    </p>
                    <p>
                        적설량:{" "}
                        {weather.snow?.["1h"]
                            ? `${weather.snow["1h"].toFixed(1)}mm`
                            : "오늘 눈 안옴"}
                    </p>
                    <p>
                        위도/경도 : {weather.coord.lat.toFixed(2)},
                        {weather.coord.lon.toFixed(2)}
                    </p>

                    <h3>미먼</h3>
                    <p>AQI : {airPol?.main?.aqi || "N/A"}</p>
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
                    <img
                        src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                        alt="Weather icon"
                    />
                </div>
            )}
        </>
    );
}
