function formatHour(dt, timezoneSeconds) {
    const d = new Date((dt + timezoneSeconds) * 1000);

    return d.toLocaleTimeString("ko-KR", {
        hour: "2-digit",
        hour12: false,
        timeZone: "UTC",
    });
}

export default function HourlyRow({ forecast }) {
    const tz = forecast?.city?.timezone ?? 0; // timezone이 있으면 쓰고 없으면 0
    const hourly = (forecast?.list ?? []).slice(0, 16); // 배열 앞에서 16개만 잘라서 가져옴
    if (hourly.length === 0) return null; // 데이터가 없으면 종료
    return (
        <div className="flex flex-row justify-center gap-7 overflow-x-auto py-2 mb-7">
            {hourly.map((item) => (
                <div
                    key={item.dt}
                    className="flex flex-col items-center gap-1 shrink-0"
                >
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
