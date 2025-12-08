// 페이지 로드 완료 시 로딩 화면 제거
window.addEventListener('load', () => {
    const loader = document.getElementById('loading-screen');
    loader.style.opacity = '0';
    setTimeout(() => {
        loader.style.display = 'none';
    }, 500); // 0.5초 뒤에 완전히 사라짐
});

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. 라이트/다크 모드 토글 기능 ---
    const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
    const currentTheme = localStorage.getItem('theme');

    // 저장된 테마가 있으면 불러오기
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') {
            toggleSwitch.checked = true;
        } else {
            toggleSwitch.checked = false;
        }
    }

    // 스위치 변경 이벤트 리스너
    function switchTheme(e) {
        if (e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark'); // 설정 저장
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light'); // 설정 저장
        }
    }
    toggleSwitch.addEventListener('change', switchTheme);


    // --- 2. 사운드 재생 컨트롤 ---
    const soundBtn = document.getElementById('sound-toggle-btn');
    const bgMusic = document.getElementById('bg-music');
    let isPlaying = false;

    // 브라우저 정책상 자동 재생이 막히는 경우가 많아 버튼으로 제어합니다.
    soundBtn.addEventListener('click', () => {
        if (!isPlaying) {
            bgMusic.play().then(() => {
                isPlaying = true;
                soundBtn.textContent = "🔊 Sound On";
                // 사운드가 시작되면 분위기를 위해 다크모드로 자동 전환 (선택사항)
                /*if(toggleSwitch.checked === false) {
                     toggleSwitch.click();
                }*/
            }).catch(error => {
                console.log("사운드 재생 실패 (브라우저 정책):", error);
            });
        } else {
            bgMusic.pause();
            isPlaying = false;
            soundBtn.textContent = "🔈 Sound Off";
        }
    });


    // --- 3. 표류 타이머 (기존 코드 유지) ---
    const startDriftBtn = document.getElementById('startDriftBtn');
    const timerDisplay = document.getElementById('timer-display');
    const timerStatus = document.getElementById('timer-status');
    let timeLeft = 180;
    let timerId = null;

    startDriftBtn.addEventListener('click', () => {
        startDriftBtn.style.display = 'none';
        timerStatus.textContent = "영원자의 흐름에 몸을 맡기십시오...";
        timerId = setInterval(() => {
            timeLeft--;
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            if (timeLeft <= 0) {
                clearInterval(timerId);
                timerDisplay.textContent = "00:00";
                timerStatus.innerHTML = "표류 완료. 당신의 질감이 투명해졌습니다.";
                timerStatus.style.color = "var(--accent-color)";
            }
        }, 1000);
    });
});