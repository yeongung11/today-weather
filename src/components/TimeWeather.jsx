function formatHour(dt, timezoneSeconds) {
    const d = new Date((dt + timezoneSeconds) * 1000);

    return d.toLocaleTimeString("ko-KR", {
        hour: "2-digit",
        hour12: false,
        timeZone: "UTC",
    });
}

export default function HourlyRow({ forecast }) {
    const tz = forecast?.city?.timezone ?? 0;
    const hourly = forecast?.list ?? [];
    if (hourly.length === 0) return null;
    return (
        <div>
            {hourly.map((item) => (
                <div key={item.dt}>
                    <div>{formatHour(item.dt, tz)}</div>

                    <img
                        src={`https://openweathermap.org/img/wn/${item.weather?.[0]?.icon}.png`}
                        alt={item.weather?.[0]?.description ?? ""}
                        width={32}
                        height={32}
                    />

                    <div>{Math.round(item.main.temp)}°</div>
                </div>
            ))}
        </div>
    );
}
