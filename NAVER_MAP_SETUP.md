# 네이버 지도 API 설정 가이드

네이버 지도가 정상적으로 작동하려면 네이버 클라우드 플랫폼에서 API 키를 발급받아야 합니다.

## 1. 네이버 클라우드 플랫폼 가입

1. [네이버 클라우드 플랫폼](https://www.ncloud.com/) 접속
2. 회원가입 또는 로그인
3. 콘솔로 이동

## 2. Maps API 신청

1. 콘솔에서 **AI·NAVER API** 선택
2. **Application 등록** 클릭
3. Application 이름 입력 (예: "모바일청첩장")
4. **Maps** 선택
5. **Web Dynamic Map** 체크
6. **Geocoding** 체크 (주소 검색용)
7. 등록 완료

## 3. Client ID 확인

1. 등록한 Application 클릭
2. **인증 정보** 탭에서 **Client ID** 확인
3. Client ID 복사

## 4. HTML 파일 수정

`index.html` 파일을 열어서 다음 부분을 수정하세요:

```html
<!-- 변경 전 -->
<script type="text/javascript" src="https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=YOUR_CLIENT_ID&submodules=geocoder"></script>

<!-- 변경 후 -->
<script type="text/javascript" src="https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=발급받은_CLIENT_ID&submodules=geocoder"></script>
```

`YOUR_CLIENT_ID` 부분을 실제 발급받은 Client ID로 교체하세요.

## 5. 웹 서비스 URL 등록

네이버 클라우드 플랫폼 콘솔에서:

1. 등록한 Application 선택
2. **Web 서비스 URL** 설정
3. 테스트용: `http://localhost`, `http://127.0.0.1`
4. 배포용: 실제 도메인 주소 입력 (예: `https://yourdomain.com`)

## 6. 테스트

1. 웹 브라우저에서 `index.html` 파일 열기
2. 지도가 정상적으로 표시되는지 확인
3. 마커 클릭 시 정보창이 나타나는지 확인

## 주의사항

- **무료 할당량**: 월 100만 건까지 무료
- **API 키 보안**: Client ID는 프론트엔드에 노출되므로, 웹 서비스 URL 제한 설정 필수
- **좌표 확인**: 현재 설정된 좌표(37.4991, 127.0287)가 정확한지 확인하고 필요시 수정

## 좌표 수정 방법

`js/main.js` 파일에서 좌표를 수정할 수 있습니다:

```javascript
// 웨딩홀 좌표 수정
const position = new naver.maps.LatLng(37.4991, 127.0287);
```

정확한 좌표를 찾으려면:
1. [네이버 지도](https://map.naver.com/)에서 주소 검색
2. 해당 위치 우클릭 → "여기가 어딘가요?" 클릭
3. 표시되는 좌표 복사

## 문제 해결

### 지도가 표시되지 않는 경우

1. 브라우저 개발자 도구(F12) 열기
2. Console 탭에서 에러 메시지 확인
3. 일반적인 에러:
   - `Invalid Client ID`: Client ID 오류 → 다시 확인
   - `Refused to load`: 웹 서비스 URL 미등록 → URL 등록
   - `Map container not found`: HTML 요소 ID 불일치 → 확인

### 지원

- [네이버 지도 API 가이드](https://navermaps.github.io/maps.js.ncp/)
- [네이버 클라우드 고객센터](https://www.ncloud.com/support/question)
