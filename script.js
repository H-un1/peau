document.addEventListener('DOMContentLoaded', function() {
    // 캘린더 초기화
    initializeCalendar();

    // 하단 네비게이션 이벤트 리스너
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // 인기 검색어 업데이트 시작
    updateTrendingTag();
    setInterval(updateTrendingTag, 5000);
});

function initializeCalendar() {
    const calendarContainer = document.querySelector('.calendar-container');
    const date = new Date();
    const currentMonth = date.getMonth();
    const currentYear = date.getFullYear();

    // 달력 헤더 생성
    const calendarHeader = document.createElement('div');
    calendarHeader.className = 'calendar-header';
    calendarHeader.innerHTML = `
        <h3>${currentYear}년 ${currentMonth + 1}월</h3>
    `;

    // 요일 헤더 생성
    const weekDays = ['일', '월', '화', '수', '목', '금', '토'];
    const weekDaysHeader = document.createElement('div');
    weekDaysHeader.className = 'week-days';
    weekDaysHeader.innerHTML = weekDays.map(day => `<div class="week-day">${day}</div>`).join('');

    // 달력 그리드 생성
    const calendarGrid = document.createElement('div');
    calendarGrid.className = 'calendar-grid';

    // 해당 월의 첫 날과 마지막 날 구하기
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    
    // 달력 날짜 채우기
    let dateGrid = '';
    
    // 첫 날 이전의 빈 칸
    for (let i = 0; i < firstDay.getDay(); i++) {
        dateGrid += '<div class="calendar-day empty"></div>';
    }

    // 이벤트가 있는 날짜 정의
    const events = {
        1: 'mask',
        2: 'ampoule',
        4: 'evening',
        7: 'ampoule',
        8: 'mask',
        11: 'morning',
        12: 'ampoule',
        15: 'mask',
        17: 'ampoule',
        18: 'evening',
        22: 'ampoule',
        27: 'ampoule',
        25: 'morning',
        29: 'mask'
    };

    // 실제 날짜 채우기
    for (let day = 1; day <= lastDay.getDate(); day++) {
        const isToday = day === date.getDate();
        const event = events[day];
        dateGrid += `
            <div class="calendar-day ${isToday ? 'today' : ''} ${event ? 'has-event' : ''}">
                <span class="date">${day}</span>
                ${event ? `<div class="dot ${event}"></div>` : ''}
            </div>
        `;
    }

    calendarGrid.innerHTML = dateGrid;

    // 캘린더 조립
    calendarContainer.innerHTML = ''; // 기존 내용 제거
    calendarContainer.appendChild(calendarHeader);
    calendarContainer.appendChild(weekDaysHeader);
    calendarContainer.appendChild(calendarGrid);

    // 범례 추가
    const legend = document.createElement('div');
    legend.className = 'calendar-legend';
    legend.innerHTML = `
        <div class="legend-item">
            <div class="legend-dot mask"></div>
            <span>마스크팩 DAY</span>
        </div>
        <div class="legend-item">
            <div class="legend-dot ampoule"></div>
            <span>앰플 DAY</span>
        </div>
        <div class="legend-item">
            <div class="legend-dot evening"></div>
            <span>저녁 루틴</span>
        </div>
        <div class="legend-item">
            <div class="legend-dot morning"></div>
            <span>아침 루틴</span>
        </div>
    `;
    calendarContainer.appendChild(legend);
}

// 인기 검색어 순환
const trendingItems = [
    { rank: 1, text: '샘플' },
    { rank: 2, text: '토너' },
    { rank: 3, text: '에센스' }
];

let currentTrendingIndex = 0;

function updateTrendingTag() {
    const trendingTag = document.querySelector('.trending-tag');
    const rankSpan = trendingTag.querySelector('.highlight-text');
    const textSpan = trendingTag.querySelector('span:last-child');
    
    rankSpan.textContent = trendingItems[currentTrendingIndex].rank;
    textSpan.textContent = trendingItems[currentTrendingIndex].text;
    
    currentTrendingIndex = (currentTrendingIndex + 1) % trendingItems.length;
} 