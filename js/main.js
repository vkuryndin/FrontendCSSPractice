const header = document.querySelector('[data-header]');
const burgerButton = document.querySelector('.header__burger');
const mobileMenu = document.querySelector('#mobile-menu');
const mobileLinks = document.querySelectorAll('.header__mobile-link');

const isMenuOpen = () => Boolean(header?.classList.contains('is-open'));

const closeMenu = () => {
  if (!header || !burgerButton || !mobileMenu || !isMenuOpen()) {
    return;
  }

  header.classList.remove('is-open');
  document.body.classList.remove('is-menu-open');
  burgerButton.setAttribute('aria-expanded', 'false');
  burgerButton.setAttribute('aria-label', 'Открыть меню');
  mobileMenu.hidden = true;
};

const openMenu = () => {
  if (!header || !burgerButton || !mobileMenu) {
    return;
  }

  mobileMenu.hidden = false;
  header.classList.add('is-open');
  document.body.classList.add('is-menu-open');
  burgerButton.setAttribute('aria-expanded', 'true');
  burgerButton.setAttribute('aria-label', 'Закрыть меню');
  mobileMenu.querySelector('a, button')?.focus();
};

if (header && burgerButton && mobileMenu) {
  burgerButton.addEventListener('click', (event) => {
    event.stopPropagation();

    if (isMenuOpen()) {
      closeMenu();
      return;
    }

    openMenu();
  });

  mobileMenu.addEventListener('click', (event) => {
    event.stopPropagation();
  });

  mobileLinks.forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('click', () => {
    closeMenu();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMenu();
    }
  });
}
