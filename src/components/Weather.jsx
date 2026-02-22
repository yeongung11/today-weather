import { useState, useEffect } from "react";
import { getCurrentCity, getForecast, getAir } from "../api/openweather";
import OtherCity from "./OtherCity";
import MyLocationComp from "./MyLocationComp";
import TimeWeather from "./TimeWeather";
import DailyWeather from "./DailyWeather";
import AirPol from "./AirPol";

export default function Weather() {
    const [forecast, setForecast] = useState(null);
    const [weatherData, setWeatherData] = useState(null); // 아직 데이터가 없으므로 null openWeatherAPI는 객체를 반환하는데  { name: "Seoul", main: { temp: 15 }, weather: [...] }
    const [myLocation, setMyLocation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [switchObj, setSwitchObj] = useState("my");
    const [selectedCityQ, setSelectedCityQ] = useState(null);
    const [view, setView] = useState("weather");
    const [airPol, setAirPol] = useState(null);

    useEffect(() => {
        let ignore = false;

        async function run() {
            // 현재 위치
            if (switchObj === "my") {
                if (!myLocation?.lat || !myLocation?.lng) return;
                const airData = await getAir({
                    lat: myLocation.lat,
                    lon: myLocation.lng,
                });
                if (!ignore) setAirPol(airData);
                return;
            }

            // 다른 도시 : q -> lat/lon -> air
            if (switchObj === "city") {
                if (!selectedCityQ) return;

                const { air } = await getCurrentCity(selectedCityQ);
                if (!ignore) setAirPol(air);
            }
        }

        run().catch(console.error);
        return () => {
            ignore = true;
        };
    }, [switchObj, selectedCityQ, myLocation?.lat, myLocation?.lng]);

    // 3시간 날씨 예보
    useEffect(() => {
        let ignore = false;

        async function run() {
            if (switchObj === "city") {
                if (!selectedCityQ) return;
                const data = await getForecast({
                    q: selectedCityQ,
                });
                if (!ignore) setForecast(data);
                return;
            }

            if (!myLocation?.lat || !myLocation?.lng) return;
            const data = await getForecast({
                lat: myLocation.lat,
                lng: myLocation.lng,
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
    const air = weatherData?.air;
    console.log("air", air);
    console.log("air first", air?.list?.[0]);

    // ------------------------------------- 렌더링 ------------------------------------------

    return (
        <div className=" mx-auto px-4 max-w-3xl text-amber-50">
            {switchObj === "my" ? (
                <MyLocationComp />
            ) : (
                <OtherCity onSelectCity={setSelectedCityQ} />
            )}
            <div className="text-right space-x-2">
                <button onClick={() => setView("weather")}>날씨</button>
                <button onClick={() => setView("air")}>미세먼지</button>
                <button onClick={() => setSwitchObj("my")}>현재 위치</button>
                <button onClick={() => setSwitchObj("city")}>다른 도시</button>
            </div>
            {view === "weather" && (
                <>
                    <TimeWeather forecast={forecast} />
                    <DailyWeather forecast={forecast} />
                </>
            )}
            {view === "air" && <AirPol airPol={airPol?.list?.[0]} />}
        </div>
    );
}
