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
                        {d.min == null ? "-" : Math.round(d.min)}° /{" "}
                        {d.max == null ? "-" : Math.round(d.max)}°
                    </div>

                    <div>
                        {Math.round((d.pop ?? 0) * 100)}%
                        {d.rainMm ? ` • ${d.rainMm.toFixed(1)}mm` : ""}
                    </div>
                </div>
            ))}
        </div>
    );
}
