import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import {Navigation, Pagination} from "swiper/modules";

window.onload = function() {
    document.getElementById('burger').onclick = function () {
        document.getElementById('menu').classList.add('open');
    };

    document.querySelectorAll('#menu *').forEach((item) => {
        item.onclick = () => {
            document.getElementById('menu').classList.remove('open');
        }
    });

    new Swiper('.swiper', {
        modules: [Navigation, Pagination],
        effect: 'slide',
        autoHeight: true,
        loop: true,
        pagination: {
            clickable: true,
            el: '.swiper-pagination',
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
                spaceBetween: 24
            },
            550: {
                slidesPerView: 2,
                spaceBetween: 24
            },
            769: {
                slidesPerView: 3,
                spaceBetween: 32
            }
        }
    });

    function alignSlideHeights() {
        const slides = document.querySelectorAll('.swiper-slide');
        let maxHeight = 0;

        // Находим максимальную высоту элемента слайдера
        slides.forEach(function (slide) {
            let slideHeight = slide.clientHeight;
            if (slideHeight > maxHeight) {
                maxHeight = slideHeight;
            }
        });

        // Применяем максимальную высоту ко всем элементам слайдера
        slides.forEach(function (slide) {
            slide.style.height = maxHeight + 'px';
        });
    }

    // Выравниваем высоту при загрузке страницы
    alignSlideHeights();

    // Выравниваем высоту при изменении размера экрана
    window.addEventListener('resize', function () {
        alignSlideHeights();
    });

    document.querySelectorAll('#accordion .ui-accordion-header').forEach((item) => {
        item.addEventListener('click', function () {
            this.nextElementSibling.classList.toggle('slow');
            this.classList.toggle('ui-accordion-header-active');
        });
    });

    const formGroup = document.querySelectorAll('.form-group');
    const formInputs = document.querySelectorAll('.form-input');

    document.getElementById('process-form').addEventListener('click', async function () {
        formGroup.forEach((item) => {
            item.classList.remove('error');
            item.classList.remove('correct');
        });

        if (!validForm()) {
            const response = await fetch('path/to/server', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: formInputs[0].value,
                    phone: formInputs[1].value
                })
            });

            const result = await response.json();
        }

        formInputs.forEach(item => {
            item.addEventListener('blur', function () {
                validForm();
            });
        });
    });

    function validForm() {
        let hasError = false;

        formInputs.forEach(item => {
            if (item.value === null || item.value === "") {
                hasError = true;
                item.parentElement.classList.add('error');
                item.parentElement.classList.remove('correct');
            } else {
                item.parentElement.classList.remove('error');
                item.parentElement.classList.add('correct');
            }

            item.addEventListener('blur', function () {
                validForm();
            });
        });

        return hasError;
    }
}