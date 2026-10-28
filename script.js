const header = document.querySelector('.site-header');
const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 24);
});

navToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  navToggle.classList.toggle('active', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
  navToggle.setAttribute('aria-label', isOpen ? '關閉選單' : '開啟選單');
});

mainNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    navToggle.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const facultyCards = [...document.querySelectorAll('.faculty-card')];
const searchInput = document.querySelector('#facultySearch');
const filterButtons = [...document.querySelectorAll('.filter-button')];
const emptyState = document.querySelector('#emptyState');
let activeFilter = 'all';

function normalizeText(text) {
  return text.toLowerCase().replace(/\s+/g, ' ').trim();
}

function updateFacultyCards() {
  const query = normalizeText(searchInput.value);
  let visibleCount = 0;

  facultyCards.forEach((card) => {
    const matchesCategory = activeFilter === 'all' || card.dataset.category === activeFilter;
    const matchesSearch = !query || normalizeText(card.dataset.search).includes(query) || normalizeText(card.textContent).includes(query);
    const shouldShow = matchesCategory && matchesSearch;
    card.hidden = !shouldShow;
    if (shouldShow) visibleCount += 1;
  });

  emptyState.hidden = visibleCount !== 0;
}

searchInput.addEventListener('input', updateFacultyCards);

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    activeFilter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.toggle('active', item === button));
    updateFacultyCards();
  });
});


const noticeFilters = document.querySelector('.notice-filters');
const noticeItems = [...document.querySelectorAll('.notice-item')];
const noticeCount = document.querySelector('.notice-count');

if (noticeFilters && noticeCount) {
  noticeFilters.hidden = false;
  const noticeButtons = [...noticeFilters.querySelectorAll('[data-notice-filter]')];
  noticeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const category = button.dataset.noticeFilter;
      let count = 0;
      noticeItems.forEach((item) => {
        item.hidden = category !== 'all' && item.dataset.noticeCategory !== category;
        if (item.hidden) item.open = false;
        else count += 1;
      });
      noticeButtons.forEach((item) => {
        const selected = item === button;
        item.classList.toggle('active', selected);
        item.setAttribute('aria-pressed', String(selected));
      });
      noticeCount.textContent = category === 'all'
        ? `共 ${count} 則公告`
        : `${button.textContent}・共 ${count} 則公告`;
    });
  });
}
