document.addEventListener('DOMContentLoaded', function() {
    // 수량 조절 기능
    const minusBtn = document.querySelector('.minus');
    const plusBtn = document.querySelector('.plus');
    const quantityInput = document.querySelector('.quantity-input');

    minusBtn.addEventListener('click', () => {
        let currentValue = parseInt(quantityInput.value);
        if (currentValue > 1) {
            quantityInput.value = currentValue - 1;
            updatePrice();
        }
    });

    plusBtn.addEventListener('click', () => {
        let currentValue = parseInt(quantityInput.value);
        quantityInput.value = currentValue + 1;
        updatePrice();
    });

    // 가격 업데이트 함수
    function updatePrice() {
        const basePrice = 18500;
        const quantity = parseInt(quantityInput.value);
        const originalPrice = document.querySelector('.original-price');
        const salePrice = document.querySelector('.sale-price');
        
        originalPrice.textContent = `${(23700 * quantity).toLocaleString()}원`;
        salePrice.textContent = `${(basePrice * quantity).toLocaleString()}원`;
    }

    // 변경 버튼 클릭 이벤트
    const changeButtons = document.querySelectorAll('.change-btn');
    changeButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 여기에 변경 기능 구현
            alert('준비 중인 기능입니다.');
        });
    });

    // 결제 버튼 슬라이드 기능
    const payButton = document.querySelector('.pay-button');
    let startX = 0;
    let isDragging = false;

    payButton.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
        payButton.style.transition = 'none';
    });

    payButton.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        
        const currentX = e.touches[0].clientX;
        const diff = currentX - startX;
        
        if (diff > 0) {
            payButton.style.transform = `translateX(${Math.min(diff, 100)}px)`;
        }
    });

    payButton.addEventListener('touchend', (e) => {
        isDragging = false;
        payButton.style.transition = 'transform 0.3s ease';
        
        const currentX = e.changedTouches[0].clientX;
        const diff = currentX - startX;
        
        if (diff > 100) {
            // 결제 진행
            payButton.textContent = '결제 진행 중...';
            payButton.style.transform = 'translateX(0)';
            processPayment();
        } else {
            payButton.style.transform = 'translateX(0)';
        }
    });

    function processPayment() {
        // 실제 결제 처리 로직 구현
        setTimeout(() => {
            alert('결제가 완료되었습니다.');
            window.location.href = 'index.html'; // 메인 페이지로 이동
        }, 1500);
    }
}); 