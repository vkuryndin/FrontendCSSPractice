const header = document.querySelector('[data-header]');
const burgerButton = document.querySelector('.header__burger');
const mobileMenu = document.querySelector('#mobile-menu');
const mobileLinks = document.querySelectorAll('.header__mobile-link');

const closeMenu = () => {
  if (!header || !burgerButton) {
    return;
  }

  header.classList.remove('is-open');
  document.body.classList.remove('is-menu-open');
  burgerButton.setAttribute('aria-expanded', 'false');
  burgerButton.setAttribute('aria-label', 'Открыть меню');
};

if (header && burgerButton && mobileMenu) {
  burgerButton.addEventListener('click', () => {
    const isOpen = header.classList.toggle('is-open');

    document.body.classList.toggle('is-menu-open', isOpen);
    burgerButton.setAttribute('aria-expanded', String(isOpen));
    burgerButton.setAttribute('aria-label', isOpen ? 'Закрыть меню' : 'Открыть меню');
  });

  mobileLinks.forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMenu();
    }
  });
}
