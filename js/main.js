// 페이지 로드 완료 후 실행
document.addEventListener('DOMContentLoaded', function() {
    initCopyButtons();
    initShareButtons();
    initSmoothScroll();
    initGalleryModal();
    initNaverMap();
    initFallingPetals();
    initScrollAnimations();
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

// 갤러리 이미지 모달 기능
function initGalleryModal() {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const closeBtn = document.querySelector('.modal-close');
    const prevBtn = document.getElementById('modalPrev');
    const nextBtn = document.getElementById('modalNext');
    const galleryItems = document.querySelectorAll('.gallery-item');

    let currentIndex = 0;
    const totalImages = galleryItems.length;

    // 갤러리 아이템 클릭 이벤트
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            currentIndex = index;
            openModal();
        });
    });

    // 모달 열기
    function openModal() {
        const img = galleryItems[currentIndex].querySelector('img');
        modal.style.display = 'block';
        modalImg.src = img.src;
        modalCaption.textContent = img.alt;
        document.body.style.overflow = 'hidden';
    }

    // 모달 닫기
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // 이전 이미지
    function showPrevImage() {
        currentIndex = (currentIndex - 1 + totalImages) % totalImages;
        const img = galleryItems[currentIndex].querySelector('img');
        modalImg.src = img.src;
        modalCaption.textContent = img.alt;
    }

    // 다음 이미지
    function showNextImage() {
        currentIndex = (currentIndex + 1) % totalImages;
        const img = galleryItems[currentIndex].querySelector('img');
        modalImg.src = img.src;
        modalCaption.textContent = img.alt;
    }

    // 이벤트 리스너
    closeBtn.addEventListener('click', closeModal);
    prevBtn.addEventListener('click', showPrevImage);
    nextBtn.addEventListener('click', showNextImage);

    // 모달 배경 클릭 시 닫기
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // 키보드 네비게이션
    document.addEventListener('keydown', function(e) {
        if (modal.style.display === 'block') {
            if (e.key === 'Escape') {
                closeModal();
            } else if (e.key === 'ArrowLeft') {
                showPrevImage();
            } else if (e.key === 'ArrowRight') {
                showNextImage();
            }
        }
    });

    // 터치 스와이프 지원
    let touchStartX = 0;
    let touchEndX = 0;

    modalImg.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });

    modalImg.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            showNextImage();
        }
        if (touchEndX > touchStartX + swipeThreshold) {
            showPrevImage();
        }
    }
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

// 네이버 지도 API 초기화
function initNaverMap() {
    // 웨딩홀 주소와 좌표
    const weddingHallAddress = '서울특별시 강남구 논현로 79길 72';
    const weddingHallName = '올림피아센터빌딩 2층 세인트홀';

    // 강남역 근처 올림피아센터빌딩 좌표
    const position = new naver.maps.LatLng(37.4991, 127.0287);

    const mapOptions = {
        center: position,
        zoom: 16,
        zoomControl: true,
        zoomControlOptions: {
            position: naver.maps.Position.TOP_RIGHT
        }
    };

    const map = new naver.maps.Map('map', mapOptions);

    // 마커 생성
    const marker = new naver.maps.Marker({
        position: position,
        map: map,
        title: weddingHallName,
        icon: {
            content: '<div style="background-color: #d4a373; color: white; padding: 10px 15px; border-radius: 20px; font-weight: bold; box-shadow: 0 2px 6px rgba(0,0,0,0.3);">💒 세인트홀</div>',
            anchor: new naver.maps.Point(50, 50)
        }
    });

    // 정보창 생성
    const infoWindow = new naver.maps.InfoWindow({
        content: `
            <div style="padding: 15px; min-width: 200px;">
                <h4 style="margin: 0 0 10px 0; color: #d4a373; font-size: 1.1rem;">💒 ${weddingHallName}</h4>
                <p style="margin: 5px 0; font-size: 0.9rem; color: #666;">${weddingHallAddress}</p>
                <div style="margin-top: 10px; display: flex; gap: 5px;">
                    <a href="https://map.naver.com/p/search/${encodeURIComponent(weddingHallAddress)}"
                       target="_blank"
                       style="display: inline-block; padding: 8px 12px; background-color: #03C75A; color: white; text-decoration: none; border-radius: 5px; font-size: 0.85rem;">
                       네이버지도
                    </a>
                    <a href="https://m.map.kakao.com/actions/searchView?q=${encodeURIComponent(weddingHallAddress)}"
                       target="_blank"
                       style="display: inline-block; padding: 8px 12px; background-color: #FEE500; color: #000; text-decoration: none; border-radius: 5px; font-size: 0.85rem;">
                       카카오맵
                    </a>
                </div>
            </div>
        `
    });

    // 마커 클릭 시 정보창 표시
    naver.maps.Event.addListener(marker, 'click', function() {
        if (infoWindow.getMap()) {
            infoWindow.close();
        } else {
            infoWindow.open(map, marker);
        }
    });

    // 페이지 로드 시 정보창 자동 표시
    infoWindow.open(map, marker);
}

// 떨어지는 꽃잎 효과
function initFallingPetals() {
    const petalsContainer = document.querySelector('.falling-petals');

    if (!petalsContainer) {
        return;
    }

    // 꽃잎 모양 배열 (다양한 꽃 이모지)
    const petalShapes = ['🌸', '🌺', '🌼', '✿', '❀', '💐'];

    // 꽃잎 생성 개수 (은은하게 하기 위해 적게 설정)
    const petalCount = 15;

    // 꽃잎 생성 함수
    function createPetal() {
        const petal = document.createElement('div');
        petal.className = 'petal';

        // 랜덤 꽃잎 모양 선택
        petal.textContent = petalShapes[Math.floor(Math.random() * petalShapes.length)];

        // 랜덤 시작 위치 (가로)
        petal.style.left = Math.random() * 100 + '%';

        // 랜덤 크기 (작게)
        const size = 15 + Math.random() * 10;
        petal.style.fontSize = size + 'px';

        // 랜덤 애니메이션 지속 시간 (느리게)
        const duration = 8 + Math.random() * 7;
        petal.style.animationDuration = duration + 's';

        // 랜덤 지연 시간
        petal.style.animationDelay = Math.random() * 5 + 's';

        // 은은한 투명도 (0.2 ~ 0.4)
        petal.style.opacity = 0.2 + Math.random() * 0.2;

        petalsContainer.appendChild(petal);

        // 애니메이션 끝나면 꽃잎 재생성
        petal.addEventListener('animationiteration', function() {
            petal.style.left = Math.random() * 100 + '%';
            const newDuration = 8 + Math.random() * 7;
            petal.style.animationDuration = newDuration + 's';
        });
    }

    // 초기 꽃잎 생성
    for (let i = 0; i < petalCount; i++) {
        setTimeout(() => {
            createPetal();
        }, i * 200); // 0.2초 간격으로 생성
    }
}

// GSAP 스크롤 애니메이션 (현재 비활성화됨)
function initScrollAnimations() {
    // GSAP 애니메이션 비활성화
    // 필요시 나중에 다시 활성화 가능
    console.log('GSAP animations disabled for stability');
    return;
}
