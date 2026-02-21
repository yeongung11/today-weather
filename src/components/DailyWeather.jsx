import { Daily5Forecast } from "../util/forecast";
import { weekdayKoFromMmDd } from "../util/date";

function iconUrl(icon) {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`;
}

export default function DailyWeather({ forecast }) {
    const daily5 = Daily5Forecast(forecast);
    if (!daily5.length) return null;
    console.log("cnt", forecast?.cnt, "len", forecast?.list?.length);
    return (
        <div className="max-w-xl mx-auto space-y-2">
            {daily5.map((d) => (
                <div
                    key={d.date}
                    className="grid items-center justify-items-center gap-3 py-2 grid-cols-[72px_44px_44px_minmax(0,180px)_80px]"
                >
                    <div>{weekdayKoFromMmDd(d.date)}</div>
                    <div className="text-sm leading-tight whitespace-nowrap">
                        {d.date}
                    </div>

                    {d.icon ? (
                        <img
                            className="w-10 h-10"
                            src={iconUrl(d.icon)}
                            alt={d.desc ?? ""}
                        />
                    ) : null}
                    <div className="text-sm text-gray-500 truncate min-w-0">
                        {d.desc}
                    </div>
                    <div className="text-right whitespace-nowrap tabular-nums flex items-center">
                        <span>{d.min == null ? "-" : Math.round(d.min)}°</span>
                        <span className="ml-3">
                            {d.max == null ? "-" : Math.round(d.max)}°
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}
