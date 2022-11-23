window.addEventListener('DOMContentLoaded', () => {
    const rangeInput = document.querySelectorAll(".range-input input");
    const priceInput = document.querySelectorAll(".price-input input");
    const range = document.querySelector(".slider .progress");

    let priceGap = 1000;

    priceInput.forEach(input => {
        input.addEventListener("input", e => {
            let minPrice = parseInt(priceInput[0].value);
            let maxPrice = parseInt(priceInput[1].value);
            
            if ((maxPrice - minPrice >= priceGap) && maxPrice <= rangeInput[1].max) {
                if (e.target.className === "input-min"){
                    rangeInput[0].value = minPrice;
                    range.style.left = `${(minVal / rangeInput[0].max) * 100}%`;
                }else {
                    rangeInput[1].value = maxPrice;
                    range.style.right = `${100 - (maxVal / rangeInput[1].max) * 100}%`;
                }
            }
        });
    });

    rangeInput.forEach(input => {
        input.addEventListener("input", e => {
            let minVal = parseInt(rangeInput[0].value);
            let maxVal = parseInt(rangeInput[1].value);

            if ((maxVal - minVal) < priceGap){
                if (e.target.className === "range-min") {
                    rangeInput[0].value = maxVal - priceGap
                } else{
                    rangeInput[1].value = minVal + priceGap;
                }
            } else {
                priceInput[0].value = (minVal / priceGap).toFixed(1);
                priceInput[1].value = (maxVal / priceGap).toFixed(1);
                range.style.left = `${(minVal / rangeInput[0].max) * 100}%`;
                range.style.right = `${100 - (maxVal / rangeInput[1].max) * 100}%`;
            }
        });
    });


    const menu = document.querySelector('.mobile__menu');
    const hamburger = document.querySelector('.header__menu-hamburger');
    const overlay = document.querySelector('.menu__overlay');
    
    overlay.addEventListener('click', (e) => {
        if (e.target.classList.contains('menu__overlay_active')) {
            document.querySelector('body').style.overflow = 'auto'
            menu.style.height = `0px`;
            menu.style.padding = '0';
            hamburger.classList.toggle('header__menu-hamburger-active');
            overlay.classList.remove('menu__overlay_active')
        }
    })



    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('header__menu-hamburger-active');
        overlay.classList.toggle('menu__overlay_active')

        if (hamburger.classList.contains('header__menu-hamburger-active')) {
            document.querySelector('body').style.overflow = 'hidden'
            menu.style.paddingTop = '24px';
            menu.style.height = `${menu.scrollHeight + 48}px`;

        } else {
            document.querySelector('body').style.overflow = 'auto'
            menu.style.height = `0px`;
            menu.style.padding = '0';
        }
        // menu.classList.toggle('mobile__menu-active');
    });


})


