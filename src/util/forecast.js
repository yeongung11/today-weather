export function Daily5Forecast(forecast) {
    const list = forecast?.list ?? [];
    const tz = forecast?.city?.timezone ?? 0;

    const map = new Map(); //
    for (const item of list) {
        const local = new Date((item.dt + tz) * 1000);
        // const year = local.getUTCFullYear();
        const month = String(local.getUTCMonth() + 1).padStart(2, "0");
        const day = String(local.getUTCDate()).padStart(2, "0");
        const key = `${month}-${day}`;

        if (!map.has(key)) map.set(key, []);
        map.get(key).push(item);
    }

    const days = Array.from(map.entries())
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([date, items]) => {
            let rep = items[0];
            let best = Infinity;
            for (const it of items) {
                const time = new Date((it.dt + tz) * 1000);
                const diff = Math.abs(time.getUTCHours() - 12);
                if (diff < best) {
                    best = diff;
                    rep = it;
                }
            }

            const temps = items
                .map((x) => x.main?.temp)
                .filter((v) => typeof v === "number");
            const min = temps.length ? Math.min(...temps) : null;
            const max = temps.length ? Math.max(...temps) : null;

            const pop = Math.max(
                0,
                ...items.map((x) => (typeof x.pop === "number" ? x.pop : 0)),
            );
            const rainMm = items.reduce(
                (sum, x) => sum + (x.rain?.["3h"] ?? 0),
                0,
            );

            return {
                date,
                icon: rep.weather?.[0]?.icon,
                desc: rep.weather?.[0]?.description,
                min,
                max,
                pop,
                rainMm,
            };
        });

    return days.slice(0, 5);
}
