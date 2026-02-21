-   Today Weather

소개

-   지역별로 날씨를 볼 수있는 페이지 입니다.
-   제가 원하는 정보만 간단하게 얻기 위해 만들었습니다.

주요기능

-   지역별 날씨 조회(온도, 습도, 기온 등)

기술 스택

-   React, Vite, Tailwind(추가 예정), Axios(예정), Fetch
-   API : OpenWeatherMap

시작 방법

-   npm install
-   npm run dev

`Trouble Shooting`

### 1.

에러 코드

-   `import.meta.env.VITE_OWM_API_KEY`가 `undefined`로 찍혀 화면에 표시 되지 않았음.

원인

-   `.env` 파일을 프로젝트 루트인 `today-weather`에 넣고 `dev` 서버를 재시작 해야했지만 프로젝트 루트 바깥에 `.env` 파일을 생성.

해결

-   `today-weather` 폴더 안에 `.env` 파일을 넣고 `dev` 서버 재시작

### 2.

에러코드

-   `Cannot read properties of undefined (reading 'temp')` 렌더링 에러 `weatherData.main.temp`에 접근시 `undefined`에러

원인

-   API가 응답하기 전에 초기 렌더링에서 `null` 접근

해결

1. 로딩 조건문을 추가
   1-1. `if(loading)` + `if(!weatherData)` 조건문 추가
2. 옵셔널 체이닝
   2-1. `{weatherData?.main?.temp?.toFixed(1) || "정보 없음"}`

-   로딩 조건문과 옵셔널 체이닝을 항상 사용함으로써 해결

### 3.

에러코드

-   `Cannot access 'weather' before initialization` 구조 분해 에러

원인

-   초기 렌더링 `useState(null)` 때문에 `weatherData = null`이 됐고 그 상태로 구조 분해를 시도해서 TDZ 문제
-   `const`는 호이스팅 되지만 초기화 전에 접근

해결

-   데이터 체크, 구조 분해, 렌더링 순으로 순서를 지키서 구조 분해는 조건문 아래 쓰는 등 ESLint 규칙 엄수

### 4.

에러 코드

원인

-   다른 도시로 변경하려고 하면 404만 호출되고 화면 전환 실패.
    id값을 불러오지 못해서 오류 발생

해결

### 5.

에러 코드

원인

-   현재 좌표에 `getCurrentCity`를 써서 지역 데이터를 가져오려고 했으나, 받아 오는 데이터가 `id`, `문자열`로 받아오기 때문에 `lat`, `lng`를 같이 사용하게 되면 두 번째 인자가 없어지고 도시`id`가 들어가 잘못된 요청으로 처리

해결

-   openweather.js에 있는 함수도 같이 사용될 수 있게 현재 위치의 좌표만 가져오는 함수를 추가

### 6.

에러 코드

원인

해결
