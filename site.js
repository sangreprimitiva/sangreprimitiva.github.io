(() => {
  const storageKey = 'lete-site-language';
  const titles = {
    home: {
      en: 'Lete — EPUB reader & reading tracker',
      es: 'Lete — Lector EPUB y registro de lecturas',
    },
    privacy: { en: 'Privacy policy — Lete', es: 'Política de privacidad — Lete' },
    terms: { en: 'Terms of use — Lete', es: 'Términos de uso — Lete' },
  };

  function setLanguage(language, persist) {
    const selected = language === 'es' ? 'es' : 'en';
    document.documentElement.lang = selected;
    document.title = titles[document.body.dataset.page]?.[selected] || 'Lete';
    document.querySelectorAll('[data-en][data-es]').forEach((element) => {
      element.textContent = element.dataset[selected];
    });
    document.querySelectorAll('[data-label-en][data-label-es]').forEach((element) => {
      element.setAttribute(
        'aria-label',
        element.dataset[selected === 'es' ? 'labelEs' : 'labelEn'],
      );
    });
    document.querySelectorAll('[data-language]').forEach((element) => {
      element.hidden = element.dataset.language !== selected;
    });
    document.querySelectorAll('[data-set-language]').forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.setLanguage === selected));
    });
    if (persist) {
      try {
        localStorage.setItem(storageKey, selected);
      } catch {
        /* Language selection still works when storage is blocked. */
      }
    }
  }

  let initial = 'en';
  try {
    initial = localStorage.getItem(storageKey) || 'en';
  } catch {
    /* No storage is required to read the site. */
  }
  setLanguage(initial, false);
  document.querySelectorAll('[data-set-language]').forEach((button) => {
    button.addEventListener('click', () => setLanguage(button.dataset.setLanguage, true));
  });
})();
