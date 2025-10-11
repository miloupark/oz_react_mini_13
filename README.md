# 🎞️ FilmArchive

엔딩 크레딧 뒤, FilmArchive와 함께 감상은 기록으로, 기록은 다시 감동으로

- 🚀 [Deployment](https://filmarchive.vercel.app/)

<br>

## 🔖 Tech Stack

### Frontend

- React / Vite / React Router DOM
- [TailwindCSS](https://tailwindcss.com/) / [shadcn/ui](https://ui.shadcn.com/) / [react-bits](https://reactbits.dev/)

### Backend & Database

- Supabase

### API

- TMDB API

### Assets & Icons

- [Lucide Icons](https://lucide.dev/)

### Development Tools

- Postman / Git & GitHub / Vercel / VSCode

<br>

## 🗂️ React Mini Project Guide

<details>
<summary> STEP 1. 메인페이지 및 영화 상세 페이지 레이아웃 구성</summary>

<br>

- [x] 1. 더미데이터를 사용한 메인 페이지 (App.jsx) 레이아웃 구성
- [x] 2. 더미데이터를 사용한 상세 페이지 (MovieDetail.jsx) 레이아웃 구성
- [x] 3. React-Router-Dom을 사용하여 라우팅 구성
- [x] 4. Layout Component를 사용하여 Nav바 상단에 표시
- [x] 🔥. 슬라이드 구현하기 (Swiper 사용 또는 Swiper 없이 구현하기)

<br>
</details>
<details>
<summary> STEP 2. TMdb API를 이용한 영화 웹 애플리케이션 확장</summary>

<br>

- [x] 1. TMdb DB와 프로젝트를 연결 (API 읽기 액세스 토큰)
- [x] 2. API 호출해서 더미데이터를 응답 데이터로 변경
- [x] 3. 클릭한 MovieCard에 맞는 MovieDetail로 이동하도록 라우팅
- [ ] 🔥. 사용자 경험 개선해보기 (스켈레톤 UI / 로딩 인디케이터)

<br>
</details>
<details>
<summary> STEP 3. Nav-bar 검색 기능 구현 및 반응형 디자인</summary>

<br>

- [x] 1. Nav-bar 검색 기능 구현하기 (API 사용)
- [x] 2. 메인, 상세, NavBar 반응형 디자인 구현(모바일, 태블릿 뷰)
- [ ] 🔥. 다크모드/라이트모드 구현

<br>
</details>
<details>
<summary> STEP 4. Supabase를 이용한 회원가입, 로그인 기능 구현</summary>

<br>

- [x] 1. 회원가입/로그인 페이지 구현하기
- [x] 2. NavBar에 회원가입/로그인 UI 구현하기
- [x] 3. 기능 구현하기
- [ ] 🔥. 소셜 로그인(OAuth) 사용하기

<br>
</details>
<details>
<summary> STEP 5. 유저정보를 활용한 마이페이지 구현 및 무한 스크롤 구현현</summary>

<br>

- [x] 1. 로그인 유저정보를 사용하여 마이페이지 구현하기
- [ ] 2. 무한 스크롤 구현하기
- [ ] 🔥. 북마크 기능 구현하기

<br>
</details>

<br>

## 📁 Project Structure

```plaintext
filmarchive
├── index.css
├── main.jsx
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── components/
│   │   ├── bits/
│   │   │   └── beams.jsx
│   │   ├── command/
│   │   │   └── CommandPalette.jsx
│   │   ├── NavBar/
│   │   │   ├── AuthButtons.jsx
│   │   │   ├── Logo.jsx
│   │   │   ├── NavBar.jsx
│   │   │   ├── SearchTrigger.jsx
│   │   │   └── UserMenu.jsx
│   │   ├── ui/
│   │   ├── Hero.jsx
│   │   ├── InputField.jsx
│   │   └── MovieCard.jsx
│   ├── constants/
│   │   └── tmdb.js
│   ├── contexts/
│   │   ├── AuthContext.jsx
│   │   └── command-context.js
│   ├── hooks/
│   │   └── useDebounce.jsx
│   ├── layouts/
│   │   └── Layout.jsx
│   ├── lib/
│   │   ├── api.js
│   │   ├── authSchemas.js
│   │   ├── supabase.jsx
│   │   └── utils.js
│   ├── pages/
│   │   ├── user/
│   │   ├── App.jsx
│   │   ├── Login.jsx
│   │   ├── MovieDetail.jsx
│   │   ├── Search.jsx
│   │   └── Signup.jsx
│   └── routes/
│       ├── AppRoutes.jsx
│       ├── RedirectIfAuthed.jsx
│       └── RequireAuth.jsx
├── README.md
├── .gitignore
└── package.json

```
