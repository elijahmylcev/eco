window.addEventListener('DOMContentLoaded', () => {
  const forms = document.querySelectorAll('form');
  const rangeInput = document.querySelectorAll(".range-input input");
  const priceInput = document.querySelectorAll(".price-input input");
  const range = document.querySelector(".slider .progress");

  let priceGap = 1000;

  priceInput.forEach(input => {
    input.addEventListener("input", e => {
      let minPrice = parseInt(priceInput[0].value);
      let maxPrice = parseInt(priceInput[1].value);

      if ((maxPrice - minPrice >= priceGap) && maxPrice <= rangeInput[1].max) {
        if (e.target.className === "input-min") {
          rangeInput[0].value = minPrice;
          range.style.left = `${(minVal / rangeInput[0].max) * 100}%`;
        } else {
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

      if ((maxVal - minVal) < priceGap) {
        if (e.target.className === "range-min") {
          rangeInput[0].value = maxVal - priceGap
        } else {
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

  function closeMenu() {
    document.querySelector('body').style.overflow = 'auto'
    menu.style.height = `0px`;
    menu.style.padding = '0';
    hamburger.classList.toggle('header__menu-hamburger-active');
    if (hamburger.classList.contains('header__menu-hamburger-active')) {
      hamburger.classList.toggle('header__menu-hamburger-active')
    }
    overlay.classList.remove('menu__overlay_active')
  }


  const menu = document.querySelector('.mobile__menu');
  const hamburger = document.querySelector('.header__menu-hamburger');
  const overlay = document.querySelector('.menu__overlay');
  const menuLinks = document.querySelectorAll('.mobile__menu_links > li > a')

  menuLinks.forEach(item => {
    item.addEventListener('click', () => {
      if (hamburger.classList.contains('header__menu-hamburger-active')) {
        closeMenu()
      }
    })
  })

  overlay.addEventListener('click', (e) => {
    if (e.target.classList.contains('menu__overlay_active')) {
      closeMenu()
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
      closeMenu()
    }
    // menu.classList.toggle('mobile__menu-active');
  });

  $('.car').slick({
    infinite: true,
    dots: true,
    speed: 800,
    arrows: false
  });

  $('input[name=phone]').mask('+7 (999) 999 99 99');

  const checkRadio = (arr) => {
    let value_radio
    arr.forEach(item => {
      if (item.checked) {
        value_radio = item.attributes.value.value
      }
    })
    return value_radio
  }

  const formQuery = (form) => {
    if (form.id == 'query') {
      const rooms = document.querySelectorAll('.flat__rooms_room > .form_radio_btn > input');
      const years = document.querySelectorAll('.flat__years_year > .form_radio_btn-year > input')
      const range_min = document.querySelector('.input-min').value;
      const range_max = document.querySelector('.input-max').value;
      const count_room = checkRadio(rooms)
      const year_value = checkRadio(years)

      return {
        range_min,
        range_max,
        count_room,
        year_value
      }
    } else {
      return null
    }
  }

  async function postData(url = '', data = {}) {
    const response = await fetch(url, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin" : "*", 
        "Access-Control-Allow-Credentials" : true,
        // 'Authorization': 'Bearer 709B0D21504685B87D27ADD360FA12E6'
      },
      body: JSON.stringify(data)
    });
    return response;
  }

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const objectQuery = formQuery(form)
      const name = form.name.value;
      const phone = form.phone.value;

      if (objectQuery) {
        const {
          count_room,
          year_value,
          range_min,
          range_max
        } = objectQuery
        const comment = `Ожидаемое кол-во комнат: ${count_room}; Срок сдачи: ${year_value}; Диапазон цен на недвижимость: от ${range_min}млн.₽ до ${range_max}млн.₽.`
        postData(`https://nerielt.app/api/create_lead?token=709B0D21504685B87D27ADD360FA12E6&name=${name}&phone=${phone}&source=${'https://ecoipoteka.com/'}&comment=${comment}`)
      } else {
        postData(`https://nerielt.app/api/create_lead?token=709B0D21504685B87D27ADD360FA12E6&name=${name}&phone=${phone}&source=${'https://ecoipoteka.com/'}`)
      }
      form.name.value = ''
      form.phone.value = ''
    })
  })
})
