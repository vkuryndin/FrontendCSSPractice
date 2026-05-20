const addMediaQueryChangeListener = (mediaQuery, handler) => {
  if (typeof mediaQuery.addEventListener === 'function') {
    mediaQuery.addEventListener('change', handler);
    return;
  }

  if (typeof mediaQuery.addListener === 'function') {
    mediaQuery.addListener(handler);
  }
};

const getEventPath = (event) => {
  if (typeof event.composedPath === 'function') {
    return event.composedPath();
  }

  const path = [];
  let node = event.target;

  while (node) {
    path.push(node);
    node = node.parentNode;
  }

  path.push(window);

  return path;
};


const focusableSelector = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

const getFocusableElements = (container) => Array.from(
  container.querySelectorAll(focusableSelector),
).filter((element) => {
  const isHidden = element.hidden || element.getAttribute('aria-hidden') === 'true';
  const isVisible = Boolean(element.offsetWidth || element.offsetHeight || element.getClientRects().length);

  return !isHidden && isVisible;
});


const initStubLinks = () => {
  document.querySelectorAll('a[data-stub-link], a[href="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
    });
  });
};

const initStubForms = () => {
  document.querySelectorAll('form[action="#"]').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
    });
  });
};


const initMobileMenu = () => {
  const header = document.querySelector('[data-header]');
  const burgerButton = document.querySelector('.header__burger');
  const mobileMenu = document.querySelector('#mobile-menu');

  if (!header || !burgerButton || !mobileMenu) {
    return;
  }

  const mobileLinks = mobileMenu.querySelectorAll('.header__mobile-link');
  const firstMenuControl = mobileMenu.querySelector('a, button');
  const desktopQuery = window.matchMedia('(min-width: 901px)');

  const isMenuOpen = () => header.classList.contains('is-open');

  const closeMenu = ({ restoreFocus = false } = {}) => {
    if (!isMenuOpen()) {
      return;
    }

    const focusWasInMenu = mobileMenu.contains(document.activeElement);

    header.classList.remove('is-open');
    document.body.classList.remove('is-menu-open');
    burgerButton.setAttribute('aria-expanded', 'false');
    burgerButton.setAttribute('aria-label', 'Открыть меню');
    mobileMenu.hidden = true;

    if (restoreFocus || focusWasInMenu) {
      burgerButton.focus();
    }
  };

  const openMenu = () => {
    mobileMenu.hidden = false;
    header.classList.add('is-open');
    document.body.classList.add('is-menu-open');
    burgerButton.setAttribute('aria-expanded', 'true');
    burgerButton.setAttribute('aria-label', 'Закрыть меню');
    firstMenuControl?.focus();
  };

  const trapMenuFocus = (event) => {
    if (!isMenuOpen() || event.key !== 'Tab') {
      return;
    }

    const focusableElements = getFocusableElements(mobileMenu);

    if (focusableElements.length === 0) {
      event.preventDefault();
      burgerButton.focus();
      return;
    }

    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];
    const activeElement = document.activeElement;

    if (!mobileMenu.contains(activeElement)) {
      event.preventDefault();
      firstFocusableElement.focus();
      return;
    }

    if (event.shiftKey && activeElement === firstFocusableElement) {
      event.preventDefault();
      lastFocusableElement.focus();
      return;
    }

    if (!event.shiftKey && activeElement === lastFocusableElement) {
      event.preventDefault();
      firstFocusableElement.focus();
    }
  };

  burgerButton.addEventListener('click', () => {
    if (isMenuOpen()) {
      closeMenu({ restoreFocus: true });
      return;
    }

    openMenu();
  });

  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => closeMenu({ restoreFocus: true }));
  });

  document.addEventListener('click', (event) => {
    if (!isMenuOpen()) {
      return;
    }

    const clickPath = getEventPath(event);

    if (clickPath.includes(mobileMenu) || clickPath.includes(burgerButton)) {
      return;
    }

    closeMenu();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMenu({ restoreFocus: true });
      return;
    }

    trapMenuFocus(event);
  });

  addMediaQueryChangeListener(desktopQuery, (event) => {
    if (event.matches) {
      closeMenu();
    }
  });
};

const initBlogMoreButton = () => {
  const blogGrid = document.querySelector('[data-blog-grid]');
  const blogMoreButton = document.querySelector('[data-blog-more-button]');
  const mobileExtraCards = document.querySelectorAll('[data-mobile-extra-card]');

  if (!blogGrid || !blogMoreButton || mobileExtraCards.length === 0) {
    return;
  }

  const mobileBlogQuery = window.matchMedia('(max-width: 560px)');

  const syncBlogMoreButton = () => {
    const isMobileBlog = mobileBlogQuery.matches;
    const isExpanded = blogGrid.classList.contains('is-expanded');

    blogMoreButton.hidden = isMobileBlog && isExpanded;
    blogMoreButton.setAttribute('aria-expanded', String(isMobileBlog && isExpanded));
  };

  blogMoreButton.addEventListener('click', () => {
    if (!mobileBlogQuery.matches) {
      return;
    }

    blogGrid.classList.add('is-expanded');
    syncBlogMoreButton();
  });

  syncBlogMoreButton();
  addMediaQueryChangeListener(mobileBlogQuery, (event) => {
    if (!event.matches) {
      blogGrid.classList.remove('is-expanded');
    }

    syncBlogMoreButton();
  });
};

initStubLinks();
initStubForms();
initMobileMenu();
initBlogMoreButton();
