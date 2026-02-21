export function weekdayKoFromMmDd(mmdd) {
    const [m, d] = mmdd.split(".").map(Number);
    const year = new Date().getFullYear();
    const dt = new Date(year, m - 1, d);
    return dt.toLocaleDateString("ko-KR", { weekday: "short" });
}
