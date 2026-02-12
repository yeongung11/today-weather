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
                    <p>현재 기온 : {weatherData.main.temp}</p>
                    <p>현재 상태 : {weatherData.weather[0].description}</p>
                    <p>현재 상태 : {weatherData.weather[0].icon}</p>
                </div>
            )}
            {/* <h1>{JSON.stringify(weatherData.null, 2)}</h1> */}
        </>
    );
}
