import { Daily5Forecast } from "../util/forecast";

function iconUrl(icon) {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`;
}

export default function DailyWeather({ forecast }) {
    const daily5 = Daily5Forecast(forecast);
    if (!daily5.length) return null;

    return (
        <div>
            {daily5.map((d) => (
                <div key={d.date}>
                    <div>{d.date}</div>

                    {d.icon ? (
                        <img src={iconUrl(d.icon)} alt={d.desc ?? ""} />
                    ) : null}

                    <div>
                        최저 {d.min == null ? "-" : Math.round(d.min)}° / 최고{" "}
                        {d.max == null ? "-" : Math.round(d.max)}°
                    </div>
                </div>
            ))}
        </div>
    );
}
