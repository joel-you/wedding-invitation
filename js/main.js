// 페이지 로드 완료 후 실행
document.addEventListener('DOMContentLoaded', function() {
    initCopyButtons();
    initShareButtons();
    initSmoothScroll();
});

// 계좌번호 복사 기능
function initCopyButtons() {
    const copyButtons = document.querySelectorAll('.copy-btn');

    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const accountNumber = this.getAttribute('data-account');

            // 클립보드에 복사
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(accountNumber)
                    .then(() => {
                        showCopySuccess(this);
                    })
                    .catch(err => {
                        console.error('복사 실패:', err);
                        fallbackCopy(accountNumber, this);
                    });
            } else {
                fallbackCopy(accountNumber, this);
            }
        });
    });
}

// 복사 성공 피드백
function showCopySuccess(button) {
    const originalText = button.textContent;
    button.textContent = '복사 완료!';
    button.style.backgroundColor = '#4CAF50';

    setTimeout(() => {
        button.textContent = originalText;
        button.style.backgroundColor = '';
    }, 2000);
}

// 구형 브라우저용 복사 기능
function fallbackCopy(text, button) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();

    try {
        document.execCommand('copy');
        showCopySuccess(button);
    } catch (err) {
        console.error('복사 실패:', err);
        alert('복사에 실패했습니다. 계좌번호: ' + text);
    }

    document.body.removeChild(textarea);
}

// 공유 기능
function initShareButtons() {
    const linkCopyBtn = document.getElementById('link-copy');
    const kakaoShareBtn = document.getElementById('kakao-share');

    // 링크 복사 버튼
    if (linkCopyBtn) {
        linkCopyBtn.addEventListener('click', function() {
            const currentUrl = window.location.href;

            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(currentUrl)
                    .then(() => {
                        showShareSuccess(this, '링크가 복사되었습니다!');
                    })
                    .catch(err => {
                        console.error('링크 복사 실패:', err);
                    });
            } else {
                fallbackCopyUrl(currentUrl, this);
            }
        });
    }

    // 카카오톡 공유 버튼
    if (kakaoShareBtn) {
        kakaoShareBtn.addEventListener('click', function() {
            // 카카오톡 공유 기능 (카카오 SDK 필요)
            // 현재는 Web Share API 사용
            if (navigator.share) {
                navigator.share({
                    title: '모바일 청첩장',
                    text: '우리의 결혼식에 초대합니다',
                    url: window.location.href
                }).then(() => {
                    console.log('공유 성공');
                }).catch(err => {
                    console.error('공유 실패:', err);
                });
            } else {
                alert('이 기능은 모바일에서만 지원됩니다.\n링크 복사 버튼을 이용해주세요.');
            }
        });
    }
}

// 공유 성공 피드백
function showShareSuccess(button, message) {
    const originalText = button.textContent;
    button.textContent = message;
    button.style.backgroundColor = '#4CAF50';
    button.style.color = 'white';

    setTimeout(() => {
        button.textContent = originalText;
        button.style.backgroundColor = '';
        button.style.color = '';
    }, 2000);
}

// 구형 브라우저용 URL 복사
function fallbackCopyUrl(url, button) {
    const textarea = document.createElement('textarea');
    textarea.value = url;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();

    try {
        document.execCommand('copy');
        showShareSuccess(button, '링크가 복사되었습니다!');
    } catch (err) {
        console.error('복사 실패:', err);
        alert('링크 복사에 실패했습니다.');
    }

    document.body.removeChild(textarea);
}

// 부드러운 스크롤
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// 갤러리 이미지 클릭 시 확대 (선택 사항)
function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            // 이미지 확대 기능 구현
            // 모달이나 라이트박스 라이브러리 사용 권장
            console.log('갤러리 아이템 클릭');
        });
    });
}

// D-Day 카운터 (선택 사항)
function calculateDday(targetDate) {
    const today = new Date();
    const wedding = new Date(targetDate);
    const diffTime = wedding - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
}

// D-Day 표시 예제
// const dday = calculateDday('2025-06-15');
// console.log(`D-${dday}`);

// 카카오맵 API 초기화 (선택 사항)
function initKakaoMap() {
    // 카카오맵 API 사용 시 아래 코드 참고
    /*
    const container = document.getElementById('map-container');
    const options = {
        center: new kakao.maps.LatLng(37.5665, 126.9780),
        level: 3
    };
    const map = new kakao.maps.Map(container, options);

    const markerPosition = new kakao.maps.LatLng(37.5665, 126.9780);
    const marker = new kakao.maps.Marker({
        position: markerPosition
    });
    marker.setMap(map);
    */
}

// Google Maps API 초기화 (선택 사항)
function initGoogleMap() {
    // Google Maps API 사용 시 아래 코드 참고
    /*
    const mapContainer = document.getElementById('map-container');
    const location = { lat: 37.5665, lng: 126.9780 };

    const map = new google.maps.Map(mapContainer, {
        zoom: 16,
        center: location
    });

    const marker = new google.maps.Marker({
        position: location,
        map: map
    });
    */
}
