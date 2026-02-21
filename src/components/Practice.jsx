import { OWM_API_KEY, OWM_BASE_URL } from "../library/env";
import { useState, useEffect } from "react";

// const lat = 33.49631111;
// const lon = 126.5332083;
const busanLat = 35.1798;
const busanLon = 129.075;
const url = `https://api.openweathermap.org/data/2.5/weather?lat=${busanLat}&lon=${busanLon}&appid=${OWM_API_KEY}&units=metric&lang=kr`;

export default function Practice() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch(url)
            .then(
                (res) => (
                    console.log("status", res.status),
                    res.ok ? res.json() : Promise.reject(res)
                ),
            )
            .then((json) => setData(json))
            .catch(console.error);
    }, []);

    return (
        <>
            <pre>{data ? JSON.stringify(data, null, 2) : "no data"}</pre>
            <p>{data?.name}</p>
            <p>{Math.round(data?.main.temp)}°</p>
            <p>{data?.weather[0].description}</p>
            <img
                src={`https://openweathermap.org/img/wn/${data?.weather?.[0].icon}@2x.png`}
                alt="Weather icon"
            />
        </>
    );
}
