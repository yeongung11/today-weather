function formatHour(dt, timezoneSeconds) {
    const d = new Date((dt + timezoneSeconds) * 1000);

    return d.toLocaleTimeString("ko-KR", {
        hour: "2-digit",
        hour12: false,
        timeZone: "UTC",
    });
}

function formatDay(dt, timezoneSeconds) {
    const d = new Date((dt + timezoneSeconds) * 1000);
    return d.toLocaleDateString("ko-KR", {
        month: "numeric",
        day: "numeric",
        weekday: "short",
        timeZone: "UTC",
    });
}

function onWheel(e) {
    const wheelSpeed = 0.1;
    if (e.deltaY === 0) return;
    e.currentTarget.scrollLeft += e.deltaY * wheelSpeed;
    e.preventDefault();
}

function dateKey(dt, tz) {
    const d = new Date((dt + tz) * 1000);
    const y = d.getUTCFullYear();
    const m = String(d.getUTCMonth() + 1).padStart(2, "0");
    const day = String(d.getUTCDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
}

export default function HourlyRow({ forecast }) {
    const tz = forecast?.city?.timezone ?? 0;
    const hourly = (forecast?.list ?? []).slice();
    if (hourly.length === 0) return null;

    return (
        <div
            onWheel={onWheel}
            className="flex flex-row justify-center gap-7 overflow-x-auto scrollbar-hide py-2 mb-7 mt-5"
        >
            {hourly.map((item, idx) => {
                const showDate =
                    idx === 0 ||
                    dateKey(item.dt, tz) !== dateKey(hourly[idx - 1].dt, tz);

                return (
                    <div
                        key={item.dt}
                        className="flex flex-col items-center gap-1 shrink-0"
                    >
                        {showDate && (
                            <div className="text-[11px] opacity-80">
                                {formatDay(item.dt, tz)}
                            </div>
                        )}

                        <div>{formatHour(item.dt, tz)}</div>

                        <img
                            src={`https://openweathermap.org/img/wn/${item.weather?.[0]?.icon}.png`}
                            alt={item.weather?.[0]?.description ?? ""}
                            width={32}
                            height={32}
                        />

                        <div>{Math.round(item.main.temp)} °</div>
                    </div>
                );
            })}
        </div>
    );
}
