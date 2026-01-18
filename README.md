# 모바일 청첩장 (Mobile Wedding Invitation)

모바일 최적화된 반응형 웹 청첩장입니다.

## 🎯 주요 기능

- **모바일 최적화 디자인**: 480px 모바일 중심 디자인
- **우아한 히어로 이미지**: 전체화면 메인 사진 + 텍스트 오버레이
- **웨딩 폰트**: Great Vibes, Nanum Myeongjo 적용
- **날짜/장소 정보**: 예식 정보 표시
- **연락처**: 신랑/신부 전화/문자 바로가기
- **네이버 지도 연동**: 실시간 지도 + 마커 + 정보창
- **고급 갤러리**: 22개 사진 + 모달 확대 + 스와이프 지원
- **이미지 최적화**: 78MB → 2MB (97% 압축)
- **계좌번호**: 축의금 계좌 정보 (원클릭 복사)
- **공유하기**: 링크 복사 및 카카오톡 공유

## 🚀 시작하기

### 로컬 실행

1. 프로젝트 클론
```bash
git clone <repository-url>
cd mobile-wedding-invitation
```

2. 브라우저에서 `index.html` 파일 열기

또는 간단한 로컬 서버 실행:
```bash
# Python 3
python -m http.server 8000

# Node.js (http-server 설치 필요)
npx http-server
```

브라우저에서 `http://localhost:8000` 접속

## 📝 커스터마이징

### 1. 기본 정보 수정
`index.html` 파일에서 다음 정보를 수정하세요:
- 신랑/신부 이름
- 부모님 성함
- 예식 날짜/시간
- 예식장 주소
- 연락처
- 계좌번호

### 2. 사진 추가 및 최적화
1. 원본 사진을 `images/` 폴더에 업로드
2. 이미지 최적화 실행:
```bash
npm install
npm run optimize-images
```
3. 최적화된 이미지는 `images/optimized/` 폴더에 생성됩니다
4. 메인 이미지: `main.jpg`
5. 갤러리 이미지: `gallery-01.jpg` ~ `gallery-22.jpg`

### 3. 색상 변경
`css/style.css` 파일의 `:root` 섹션에서 색상 변수 수정:
```css
:root {
    --primary-color: #d4a373;    /* 메인 컬러 */
    --secondary-color: #f5e6d3;  /* 보조 컬러 */
    --text-color: #333;          /* 텍스트 컬러 */
}
```

### 4. 네이버 지도 연동 (필수)

**⚠️ 중요**: 지도가 정상 작동하려면 네이버 지도 API 키 설정이 필요합니다.

상세한 설정 방법은 **[NAVER_MAP_SETUP.md](./NAVER_MAP_SETUP.md)** 파일을 참고하세요.

#### 간단 설정 방법
1. [네이버 클라우드 플랫폼](https://www.ncloud.com/) 가입
2. Maps API 신청 및 Client ID 발급
3. `index.html`에서 `YOUR_CLIENT_ID`를 실제 Client ID로 교체:
```html
<script type="text/javascript" src="https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=실제_CLIENT_ID&submodules=geocoder"></script>
```
4. 웹 서비스 URL 등록 (localhost, 배포 도메인)

#### 좌표 수정
`js/main.js`에서 웨딩홀 좌표 수정:
```javascript
const position = new naver.maps.LatLng(37.4991, 127.0287);
```

## 🌐 배포하기

### GitHub Pages
1. GitHub 저장소 생성
2. 코드 푸시
3. Settings → Pages → Source를 `main` 브랜치로 설정
4. 배포된 URL 확인

### Vercel
```bash
# Vercel CLI 설치
npm install -g vercel

# 배포
vercel
```

### Netlify
1. [Netlify](https://www.netlify.com/)에 로그인
2. "New site from Git" 선택
3. GitHub 저장소 연결
4. 배포 설정 확인 후 배포

## 📂 프로젝트 구조

```
mobile-wedding-invitation/
├── index.html              # 메인 HTML 파일
├── package.json            # npm 설정 파일
├── css/
│   └── style.css          # 스타일시트
├── js/
│   └── main.js            # JavaScript 기능
├── images/
│   ├── optimized/         # 최적화된 이미지 (2MB)
│   │   ├── main.jpg       # 메인 히어로 이미지
│   │   └── gallery-*.jpg  # 갤러리 이미지 (22개)
│   └── *.jpeg             # 원본 이미지 (78MB)
├── scripts/
│   └── optimize-images.js # 이미지 최적화 스크립트
├── README.md              # 프로젝트 문서
└── NAVER_MAP_SETUP.md     # 네이버 지도 설정 가이드
```

## 🎨 스타일 가이드

### 색상 테마
- 골드/베이지 테마 (기본)
- 커스터마이징 가능

### 폰트
- **Great Vibes**: 영문 웨딩 타이틀 (손글씨 스타일)
- **Nanum Myeongjo**: 한글 서브타이틀 (명조체)
- 시스템 폰트 폴백

## 📱 브라우저 지원

- Chrome (최신 2버전)
- Safari (최신 2버전)
- Firefox (최신 2버전)
- Edge (최신 2버전)
- 모바일 브라우저 (iOS Safari, Chrome)

## 🔧 향후 추가 가능한 기능

- [x] ~~갤러리 이미지 확대 모달~~ (완료)
- [x] ~~네이버 지도 연동~~ (완료)
- [x] ~~이미지 최적화~~ (완료)
- [ ] RSVP (참석 의사 수집)
- [ ] 방명록
- [ ] 축의금 QR 코드
- [ ] 캘린더 일정 추가
- [ ] D-Day 카운터
- [ ] 배경 음악

## 📄 라이선스

MIT License

## 👤 문의

프로젝트 관련 문의사항이 있으시면 이슈를 등록해주세요.
