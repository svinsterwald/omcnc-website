window.Webflow ||= [];
window.Webflow.push(() => {
  console.log('git code');

  const checkNavActive = () => {
    const url = document.URL;
    if (url.indexOf('therapies') > 0) {
      console.log(url);

      const megaMenuLink = document.getElementById('megamenu-link');
      megaMenuLink.classList.add('w--current');
    }
  };
  checkNavActive();
  try {
    //HOME HERO SLIDER
    const homeSlides = document.querySelectorAll('.section-home-hero .hero_slide');
    const paginationWrapper = document.querySelector('.pagination-wrapper');

    homeSlides.forEach((slide, i) => {
      slide.setAttribute('slide-id', i);
      const newDot = document.createElement('div');
      newDot.className = 'pagination-dot';
      newDot.setAttribute('dot-id', i);
      paginationWrapper.append(newDot);
    });
    paginationWrapper.firstChild.classList.toggle('visible');
    homeSlides[0].classList.toggle('visible');

    const dots = paginationWrapper?.querySelectorAll('.pagination-dot');

    const selectSlideFromDot = (id) => {
      const prevSlide = document.querySelector('.hero_slide.visible');
      const newSlideToShow = document.querySelector(`[slide-id="${id}"]`);
      const prevDot = document.querySelector('.pagination-dot.visible');
      const clickedDot = document.querySelector(`[dot-id="${id}"]`);
      prevSlide.classList.toggle('visible');
      newSlideToShow.classList.toggle('visible');
      prevDot.classList.toggle('visible');
      clickedDot.classList.toggle('visible');
      clearInterval(changeSlideInterval);
      changeSlideInterval = setInterval(nextSlide, 5000);
    };

    dots.forEach((dot) => {
      dot.addEventListener('click', selectSlideFromDot.bind(this, dot.getAttribute('dot-id')));
    });

    const nextSlide = () => {
      const activeSlide = document.querySelector('.hero_slide.visible');
      const activeSlideId = activeSlide?.getAttribute('slide-id');
      const activeDot = paginationWrapper.querySelector(`[dot-id="${activeSlideId}"]`);
      const nextDot = activeDot.nextElementSibling;
      const nextSlide = activeSlide.nextElementSibling;

      activeSlide.classList.toggle('visible');
      activeDot.classList.toggle('visible');

      if (nextSlide) {
        nextSlide.classList.toggle('visible');
        nextDot.classList.toggle('visible');
      } else {
        homeSlides[0].classList.toggle('visible');
        paginationWrapper.firstElementChild.classList.toggle('visible');
      }
    };
    let changeSlideInterval = setInterval(nextSlide, 5000);
    const startSlide = setTimeout(changeSlideInterval, 5000);
  } catch (error) {
    console.error(error);
  }

  /////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////

  class DOMAnimations {
    /**
     * Masque un élément avec un effet de repli
     * @param {HTMLElement} element
     * @param {Number} duration
     * @returns {Promise<boolean>}
     */
    static slideUp(element, duration = 500) {
      return new Promise(function (resolve, reject) {
        element.style.height = element.offsetHeight + 'px';
        element.style.transitionProperty = `height, margin, padding`;
        element.style.transitionDuration = duration + 'ms';
        element.offsetHeight; // eslint-disable-line no-unused-expressions
        element.style.overflow = 'hidden';
        element.style.height = 0;
        element.style.paddingTop = 0;
        element.style.paddingBottom = 0;
        element.style.marginTop = 0;
        element.style.marginBottom = 0;
        window.setTimeout(function () {
          element.style.display = 'none';
          element.style.removeProperty('height');
          element.style.removeProperty('padding-top');
          element.style.removeProperty('padding-bottom');
          element.style.removeProperty('margin-top');
          element.style.removeProperty('margin-bottom');
          element.style.removeProperty('overflow');
          element.style.removeProperty('transition-duration');
          element.style.removeProperty('transition-property');
          resolve(false);
        }, duration);
      });
    }

    /**
     * Affiche un élément avec un effet de dépliement
     * @param {HTMLElement} element
     * @param {Number} duration
     * @returns {Promise<boolean>}
     */
    static slideDown(element, duration = 500) {
      return new Promise(function (resolve, reject) {
        element.style.removeProperty('display');
        let display = window.getComputedStyle(element).display;
        if (display === 'none') display = 'block';
        element.style.display = display;
        let height = element.offsetHeight;
        element.style.overflow = 'hidden';
        element.style.height = 0;
        element.style.paddingTop = 0;
        element.style.paddingBottom = 0;
        element.style.marginTop = 0;
        element.style.marginBottom = 0;
        element.offsetHeight; // eslint-disable-line no-unused-expressions
        element.style.transitionProperty = `height, margin, padding`;
        element.style.transitionDuration = duration + 'ms';
        element.style.height = height + 'px';
        element.style.removeProperty('padding-top');
        element.style.removeProperty('padding-bottom');
        element.style.removeProperty('margin-top');
        element.style.removeProperty('margin-bottom');
        window.setTimeout(function () {
          element.style.removeProperty('height');
          element.style.removeProperty('overflow');
          element.style.removeProperty('transition-duration');
          element.style.removeProperty('transition-property');
        }, duration);
      });
    }

    /**
     * Affiche ou Masque un élément avec un effet de repli
     * @param {HTMLElement} element
     * @param {Number} duration
     * @returns {Promise<boolean>}
     */
    static slideToggle(element, duration = 500) {
      if (window.getComputedStyle(element).display === 'none') {
        return this.slideDown(element, duration);
      } else {
        return this.slideUp(element, duration);
      }
    }
  }

  // CMS HIDE PIC IF THERE IS ANY
  const uploadedPictures = document.querySelectorAll('.square_cover');
  uploadedPictures.forEach((img) => {
    if (img.classList.contains('w-dyn-bind-empty')) {
      const imageColumn = img.closest('.square_image-column') || img;
      const imageLayout = img.closest('.layout-square') || img;
      imageColumn.remove();
      imageLayout.classList.toggle('layout-center');
    }
  });

  const megaMenuLink = document.querySelector('#megamenu-link');
  const megaMenu = document.querySelector('#mega-menu');

  $('.navbar_link-wrapper.megamenu , #mega-menu').hover(
    () => {
      megaMenu.classList.add('visible');
    },
    () => {
      megaMenu.classList.remove('visible');
    }
  );
  //EVENT BUTTONS CARDS
  const developButtons = document.querySelectorAll('.button.develop');
  const toggleEventDesc = (element) => {
    const button = element;
    const buttonLabel = button.querySelector('.button_label');
    const hiddenDesc = button.closest('.event_item').querySelector('.event_desc-wrapper');
    const isActive = button.classList.contains('active');
    if (isActive) {
      buttonLabel.textContent = 'En savoir plus';
      DOMAnimations.slideUp(hiddenDesc);
      button.classList.remove('active');
    } else {
      buttonLabel.textContent = 'Cacher';
      DOMAnimations.slideDown(hiddenDesc);
      button.classList.add('active');
    }
  };

  for (const button of developButtons) {
    button.addEventListener('click', toggleEventDesc.bind(null, button));
  }
  // CHECK IF EVENT IS PAST
  let todayDate = new Date();
  const eventCards = document.querySelectorAll('.event_item');
  for (const item of eventCards) {
    const eventDateInput = item.querySelector('.event_date').textContent;
    const splitEventDate = eventDateInput.split('.');
    const eventDateYY = splitEventDate[2];
    const eventDateMM = splitEventDate[1];
    const eventDateDD = splitEventDate[0];
    let eventDate = new Date(eventDateYY, eventDateMM - 1, eventDateDD);

    if (eventDate.getTime() < todayDate.getTime()) {
      item.classList.add('old');
      item.querySelector('.event_subscription').textContent = "Cet événement n'est plus disponible";
    }
  }

  //HOVER MEMBER CARDS
  const standardMembers = $('.member-hidden_item');
  standardMembers.hover(
    function () {
      const description = $(this).find('.member_hidden-block');
      description.toggleClass('active');
    },
    function () {
      const description = $(this).find('.member_hidden-block');
      description.toggleClass('active');
    }
  );

  //HOVER MEMBER CARDS
  const donItem = $('.don_item');
  donItem.hover(
    function () {
      const description = $(this).find('.don_hidden-block');
      description.toggleClass('active');
      $(this).find('.don_title-wrapper').toggleClass('hidden');
    },
    function () {
      const description = $(this).find('.don_hidden-block');
      description.toggleClass('active');
      $(this).find('.don_title-wrapper').toggleClass('hidden');
    }
  );

  //FOOTER
  $('.collection-footer-therapie').eq(0).show();
  $('.footer_menu-category-wrapper').eq(0).addClass('active');
  const toggleFooterMenu = (menuTitle) => {
    const list = menuTitle.target.nextSibling;
    const lists = $('.collection-footer-therapie');
    lists.slideUp();
    DOMAnimations.slideDown(list);
  };

  const footerTitles = document.querySelectorAll('.footer_menu-cat');
  for (const title of footerTitles) {
    title.addEventListener('click', toggleFooterMenu.bind(title));
  }
  $('.footer_menu-category-wrapper');
});
