export default function AirPanel({ airPol }) {
    const pm25 = airPol?.components?.pm2_5;
    const pm10 = airPol?.components?.pm10;

    return (
        <>
            <p>
                초미세먼지 :{" "}
                {pm25 != null ? pm25.toFixed(1) : "초미세먼지 정보 없음"} μg/m³
            </p>
            <p>
                미세먼지 :{" "}
                {pm10 != null ? pm10.toFixed(1) : "미세먼지 정보 없음"} μg/m³
            </p>
        </>
    );
}
