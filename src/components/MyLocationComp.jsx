import { useState, useEffect } from "react";
import { MyLocation } from "../api/openweather";

export default function MyLocationComp() {
    // const [location, setLocation] = useState(null);
    // const [myweather, setMyWeather] = useState(null);

    // useEffect(() => {
    //     navigator.geolocation.getCurrentPosition(
    //         (pos) => {
    //             setLocation({
    //                 lat: pos.coords.latitude,
    //                 lng: pos.coords.longitude,
    //             });
    //         },
    //         () => setLocation({ lat: 37.5665, lng: 126.978 }),
    //     );
    // }, []);

    // useEffect(() => {
    //     if (location) {
    //         MyLocation(location.lat, location.lng).then(setMyWeather);
    //     }
    // }, [location]);
    const [location, setLocation] = useState(null);
    const [place, setPlace] = useState(null); // 지역명 저장

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                const coords = {
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                };
                setLocation(coords);

                // 역지오코딩 호출!
                try {
                    const placeData = await MyLocation(coords.lat, coords.lng);
                    setPlace(placeData); // { name: "Anyang-si", country: "KR" }
                } catch (e) {
                    console.error("지역명 에러:", e);
                }
            },
            () => setLocation({ lat: 37.5665, lng: 126.978 }),
        );
    }, []);

    return (
        <div>
            <p>{place?.name ?? "로딩중"}</p>
            {/* <p>국가: {place?.country ?? "-"}</p>
            <p>지역: {place?.state ?? "-"}</p>
            <p>
                좌표: {location?.lat?.toFixed(2)}, {location?.lng?.toFixed(2)}
            </p> */}
        </div>
    );
}
