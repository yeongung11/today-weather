import { useState, useEffect } from "react";
import { CurrentWeather } from "../api/openweather";

export default function Weather() {
    const [weatherData, setWeatherData] = useState(null); // 아직 데이터가 없으므로 null openWeatherAPI는 객체를 반환하는데  { name: "Seoul", main: { temp: 15 }, weather: [...] }
    useEffect(() => {
        CurrentWeather()
            .then((data) => {
                console.log("날씨 데이터:", data);
                setWeatherData(data);
            })
            .catch((err) => console.error("API 에러:", err));
    }, []);

    return (
        <>
            <h1>오늘의 서울 날씨</h1>
            {weatherData && (
                <div>
                    <h2>{weatherData.name}</h2>
                    <p>현재 기온 : {weatherData.main.temp.toFixed(1)} °C</p>
                    <p>현재 상태 : {weatherData.weather[0].description}</p>
                    <p>
                        체감 온도 : {weatherData.main.feels_like.toFixed(1)} °C
                    </p>
                    <p>습도 : {weatherData.main.humidity} %</p>
                    <p>
                        가시거리 :{" "}
                        {weatherData?.visibility != null
                            ? `${(weatherData.visibility / 1000).toFixed(1)} km`
                            : "-"}
                    </p>
                    <img
                        src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                        alt="Weather icon"
                    />
                </div>
            )}
            {!weatherData && <p>날씨 정보가 없습니다</p>}
        </>
    );
}
