export default function AirPanel({ airPol }) {
    const pm25 = airPol?.components?.pm2_5;
    const pm10 = airPol?.components?.pm10;
    const pm25Grade = gradePm25(pm25);
    const pm10Grade = gradePm10(pm10);

    function gradePm25(a) {
        if (a == null) return null;
        if (a <= 15) return "좋음";
        if (a <= 50) return "보통";
        if (a <= 100) return "나쁨";
        return "매우 나쁨";
    }

    function gradePm10(a) {
        if (a == null) return null;
        if (a <= 30) return "좋음";
        if (a <= 80) return "보통";
        if (a <= 150) return "나쁨";
        return "매우 나쁨";
    }

    function ColorGrade(grade) {
        if (grade === "좋음") return "text-green-300";
        if (grade === "보통") return "text-orange-300";
        if (grade === "나쁨") return "text-red-300";
        if (grade === "매우 나쁨") return "text-black";
        return "text-slate-300";
    }
    return (
        <div className="text-center justify-items-center mt-3 mb-7 text-2xl">
            <p>
                초미세먼지:{" "}
                {pm25 != null ? (
                    <>
                        {pm25.toFixed(1)} μg/m³{" "}
                        <span className={ColorGrade(pm25Grade)}>
                            {pm25Grade}
                        </span>
                    </>
                ) : (
                    "미세먼지 정보 없음"
                )}
            </p>
            <p>
                미세먼지:{" "}
                {pm10 != null ? (
                    <>
                        {pm10.toFixed(1)} μg/m³{" "}
                        <span className={ColorGrade(pm10Grade)}>
                            {pm10Grade}
                        </span>
                    </>
                ) : (
                    "미세먼지 정보 없음"
                )}
            </p>
        </div>
    );
}
