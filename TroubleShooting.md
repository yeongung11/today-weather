에러 코드
`import.meta.env.VITE_OWM_API_KEY`가 `undefined`로 찍혀 화면에 표시 되지 않았음.

원인
`.env` 파일을 프로젝트 루트인 `today-weather`에 넣고 `dev` 서버를 재시작 해야했지만 프로젝트 루트 바깥에 `.env` 파일을 생성.

해결
`today-weather` 폴더 안에 `.env` 파일을 넣고 `dev` 서버 재시작
