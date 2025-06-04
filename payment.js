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
    const buttonText = document.querySelector('.pay-button-text');
    let startX = 0;
    let currentTranslateX = 0;
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
        const buttonWidth = payButton.offsetWidth;
        
        if (diff > 0) {
            currentTranslateX = Math.min(diff, buttonWidth - 80);
            payButton.style.transform = `translateX(${currentTranslateX}px)`;
        }
    });

    payButton.addEventListener('touchend', () => {
        isDragging = false;
        payButton.style.transition = 'transform 0.3s ease';
        
        const buttonWidth = payButton.offsetWidth;
        if (currentTranslateX > buttonWidth * 0.7) {
            payButton.style.transform = 'translateX(0)';
            processPayment();
        } else {
            payButton.style.transform = 'translateX(0)';
        }
        currentTranslateX = 0;
    });

    // 결제 수단 선택
    const paymentMethods = document.querySelectorAll('.payment-method');
    const paymentButton = document.querySelector('.payment-button');
    
    paymentMethods.forEach(method => {
        method.addEventListener('click', function() {
            // 이전 선택 해제
            paymentMethods.forEach(m => m.classList.remove('selected'));
            // 현재 선택
            this.classList.add('selected');
            // 결제하기 버튼 활성화
            if (paymentButton) {
                paymentButton.disabled = false;
            }
        });
    });

    // 주소 검색 버튼
    const addressSearchBtn = document.querySelector('.address-search-btn');
    if (addressSearchBtn) {
        addressSearchBtn.addEventListener('click', function() {
            // 카카오 주소 검색 API 호출
            new daum.Postcode({
                oncomplete: function(data) {
                    // 주소 필드에 값 설정
                    document.querySelector('input[name="address"]').value = data.address;
                    // 상세주소 필드로 포커스 이동
                    document.querySelector('input[name="address_detail"]').focus();
                }
            }).open();
        });
    }

    // 약관 동의 체크박스
    const termsCheckbox = document.querySelector('#terms-agree');
    if (termsCheckbox && paymentButton) {
        termsCheckbox.addEventListener('change', function() {
            // 결제 수단이 선택되어 있고, 약관에 동의했을 때만 결제하기 버튼 활성화
            const isPaymentMethodSelected = document.querySelector('.payment-method.selected');
            paymentButton.disabled = !(this.checked && isPaymentMethodSelected);
        });
    }

    // 결제하기 버튼
    if (paymentButton) {
        paymentButton.addEventListener('click', function() {
            if (!this.disabled) {
                // 결제 처리 로직
                processPayment();
            }
        });
    }
});

// 결제 처리 함수
function processPayment() {
    // 선택된 결제 수단 확인
    const selectedMethod = document.querySelector('.payment-method.selected');
    if (!selectedMethod) {
        alert('결제 수단을 선택해주세요.');
        return;
    }

    // 배송 정보 확인
    const name = document.querySelector('input[name="name"]').value;
    const phone = document.querySelector('input[name="phone"]').value;
    const address = document.querySelector('input[name="address"]').value;
    const addressDetail = document.querySelector('input[name="address_detail"]').value;

    if (!name || !phone || !address || !addressDetail) {
        alert('배송 정보를 모두 입력해주세요.');
        return;
    }

    // 결제 정보 수집
    const paymentData = {
        method: selectedMethod.dataset.method,
        orderItems: getOrderItems(),
        shipping: {
            name,
            phone,
            address: `${address} ${addressDetail}`
        },
        amount: calculateTotalAmount()
    };

    // 결제 요청 (실제 구현 시 서버로 전송)
    console.log('Payment processing...', paymentData);
    
    // 결제 성공 시 처리 (실제 구현 시 서버 응답에 따라 처리)
    alert('결제가 완료되었습니다.');
    // 주문 완료 페이지로 이동
    window.location.href = '/order-complete';
}

// 주문 상품 정보 수집
function getOrderItems() {
    const items = document.querySelectorAll('.order-item');
    return Array.from(items).map(item => ({
        id: item.dataset.id,
        name: item.querySelector('h3').textContent,
        price: parseInt(item.dataset.price),
        quantity: parseInt(item.dataset.quantity)
    }));
}

// 총 결제 금액 계산
function calculateTotalAmount() {
    const items = getOrderItems();
    const itemsTotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shippingFee = 3000; // 배송비
    return itemsTotal + shippingFee;
} 