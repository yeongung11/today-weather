const NAVER_CLIENT_ID = import.meta.env.VITE_NAVER_CLIENT_ID;
const NAVER_CLIENT_SECRET = import.meta.env.VITE_NAVER_CLIENT_SECRET;

export default function NaverAreaName(json) {
    const url =
        `https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc` +
        `?coords=${lng},${lat}&output=json&orders=admcode`;

    const regionResult = json?.results?.find((r) => r?.regionResult);
    const region = regionResult?.region;
    if (!region) return null;

    const cityDo = region.area1?.name;
    const citySi = region.area2?.name;
    const cityGu = region.area3?.name;
    const cityDong = region.area4?.name;

    const parts = [cityDo, citySi, cityGu, cityDong]
        .map((v) => (v ?? "").trim())
        .filter(Boolean);
    return parts.json(""); // 네이버 응답은 results[].region.areaN.name
}
