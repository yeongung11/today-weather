import { useState, useEffect } from "react";
import { getCurrentCity, getForecast } from "../api/openweather";
import OtherCity from "./OtherCity";
import MyLocationComp from "./MyLocationComp";
import TimeWeather from "./TimeWeather";

export default function Weather() {
    const [forecast, setForecast] = useState(null);
    const [weatherData, setWeatherData] = useState(null); // 아직 데이터가 없으므로 null openWeatherAPI는 객체를 반환하는데  { name: "Seoul", main: { temp: 15 }, weather: [...] }
    const [myLocation, setMyLocation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [switchObj, setSwitchObj] = useState("my");
    const [selectedCityQ, setSelectedCityQ] = useState(null);

    // 단기 날씨 예보
    useEffect(() => {
        let ignore = false;

        async function run() {
            if (switchObj === "city") {
                if (!selectedCityQ) return; // 400에러 방지
                const data = await getForecast({
                    q: selectedCityQ,
                    cnt: 3,
                });
                if (!ignore) setForecast(data);
                return;
            }

            if (!myLocation?.lat || !myLocation?.lng) return;
            const data = await getForecast({
                lat: myLocation.lat,
                lng: myLocation.lng,
                cnt: 3,
            });
            if (!ignore) setForecast(data);
        }

        run().catch(console.error);
        return () => {
            ignore = true;
        };
    }, [switchObj, selectedCityQ, myLocation?.lat, myLocation?.lng]);

    // 위치 불러오기
    useEffect(() => {
        if (!navigator.geolocation) return;
        navigator.geolocation.getCurrentPosition(
            (pos) =>
                setMyLocation({
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                }),
            (error) => {
                console.error("위치 에러:", error);
                setMyLocation({ lat: 37.5665, lng: 126.978 });
            },
        );
    }, []);

    //날씨 불러오기
    useEffect(() => {
        getCurrentCity()
            .then((data) => {
                console.log("날씨 데이터 + 미세먼지 데이터", data);
                setWeatherData(data); // {weather, air}
            })
            .catch((err) => console.error("API 에러:", err))
            .finally(() => setLoading(false));
    }, []); // 도시가 바뀔 때 마다 새로고침

    // 로딩
    if (loading) return <p>날씨 불러오는 중...</p>;
    if (!weatherData) return <p>날씨 정보가 없습니다.</p>;
    // 로딩

    // ------------------------------------- 렌더링 ------------------------------------------

    return (
        <>
            <div>
                <button onClick={() => setSwitchObj("my")}>현재 위치</button>
                <button onClick={() => setSwitchObj("city")}>다른 도시</button>
            </div>
            {switchObj === "my" ? (
                <MyLocationComp />
            ) : (
                <OtherCity onSelectCity={setSelectedCityQ} />
            )}
            <TimeWeather forecast={forecast} />

            {/* {CITIES.map((city) => (
                <button
                    key={city.id}
                    onClick={() => {
                        setCityId(city.id);
                        setCityLabel(city.label);
                        setSwitchObj("city");
                    }}
                >
                    {city.label}
                </button>
            ))} */}
            {/* {weather && (
                <div>
                    <div>
                        <img
                            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                            alt="Weather icon"
                        />
                        <p>{Math.round(weather.main.temp)} °C</p>
                    </div>

                    <div>
                        <p>최저 : {Math.round(weather.main.temp_min)}°C</p>
                        <p>최고 : {Math.round(weather.main.temp_max)}°C</p>
                    </div>

                    <h1>{weather.name}</h1>
                    <p>체감 온도 : {weather.main.feels_like.toFixed(1)} °C</p>
                    <p>습도 : {weather.main.humidity} %</p>
                    <p>현재 상태 : {weather.weather[0].description}</p>
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
                        위도/경도 : {weather.coord.lat.toFixed(2)},
                        {weather.coord.lon.toFixed(2)}
                    </p>

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
                </div>
            )} */}
        </>
    );
}
