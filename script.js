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

(() => {
  const picker = document.querySelector('.club-picker');
  const select = document.querySelector('#clubSelect');
  if (!picker || !select) return;

  const clubs = [
  {
    "id": "surgery",
    "name": "外科社",
    "en": "Surgery Society",
    "category": "醫學與研究",
    "description": "從一場病例討論開始，練習看見臨床問題背後的人。外科社連結醫學院與健康科學院，讓對外科有興趣的學生在模擬教學與經驗分享中探索志向。",
    "activities": [
      "模擬教學觀摩",
      "病例討論",
      "外科職涯分享"
    ],
    "place": "醫學院模擬教學空間"
  },
  {
    "id": "radiochemistry",
    "name": "放射化學社",
    "en": "Radiochemistry Society",
    "category": "醫學與研究",
    "description": "一個同位素，也能打開一整座研究世界。放射醫學院與藥學院的學生在這裡交流分子探針、放射藥物與 PET／SPECT 的研究故事。",
    "activities": [
      "放射藥物文獻共讀",
      "分子影像主題交流",
      "研究海報討論"
    ],
    "place": "放射醫學院與藥學院討論室"
  },
  {
    "id": "midnight-coffee",
    "name": "午夜咖啡社",
    "en": "Midnight Coffee Society",
    "category": "交流與日常",
    "description": "當講堂的燈熄了，咖啡館裡的話題才剛開始。這裡收留讀書讀到一半的人、寫不完的研究筆記，以及想找人聊聊的漫長夜晚。",
    "activities": [
      "夜讀小聚",
      "咖啡風味交流",
      "考季陪讀"
    ],
    "place": "皇家中央圖書館周邊咖啡館"
  },
  {
    "id": "classics",
    "name": "古典文學會",
    "en": "Classical Literature Society",
    "category": "藝文與音樂",
    "description": "在醫學古籍與詩句之間，保留一點慢下來的時間。成員共讀歐洲古典作品，也從文學中的疾病、生命與命運，重新理解醫學的人文面貌。",
    "activities": [
      "經典作品共讀",
      "詩歌朗讀",
      "醫學與文學沙龍"
    ],
    "place": "皇家中央圖書館閱覽與討論空間"
  },
  {
    "id": "golf",
    "name": "高爾夫球社",
    "en": "Golf Club",
    "category": "運動與競技",
    "description": "把緊湊的課表暫時留在身後，在草地與風之間練習專注。社團歡迎初學者與有經驗的球友，一起認識球場禮儀、交流技巧與享受戶外時光。",
    "activities": [
      "基礎練習",
      "球場禮儀交流",
      "友誼賽"
    ],
    "place": "聯邦體育設施與合作練習場"
  },
  {
    "id": "tennis",
    "name": "網球社",
    "en": "Tennis Club",
    "category": "運動與競技",
    "description": "下課後的球場，是另一種跨院交流。從雙打搭檔到友誼對賽，網球社讓來自不同學院的學生，在來回擊球中找到共同節奏。",
    "activities": [
      "分組練習",
      "雙打交流",
      "跨院友誼賽"
    ],
    "place": "校園網球場"
  },
  {
    "id": "climbing",
    "name": "攀岩社",
    "en": "Climbing Club",
    "category": "運動與競技",
    "description": "每一條路線，都需要耐心、觀察與夥伴之間的信任。從室內抱石與體能練習出發，成員一起研究路線，並在教練帶領下累積攀登經驗。",
    "activities": [
      "室內抱石",
      "路線討論",
      "體能與協作練習"
    ],
    "place": "校園攀岩訓練空間"
  },
  {
    "id": "orchestra",
    "name": "管弦樂團",
    "en": "University Orchestra",
    "category": "藝文與音樂",
    "description": "當不同學院的樂手坐進同一個聲部，城市便有了另一種心跳。樂團參與新年交響樂與校園演出，也為冬季大舞會留下屬於阿爾特萊茵的旋律。",
    "activities": [
      "分部與合奏排練",
      "新年交響樂",
      "校園音樂演出"
    ],
    "place": "校園音樂排練室與聯邦劇院"
  },
  {
    "id": "fencing",
    "name": "擊劍社",
    "en": "Fencing Club",
    "category": "運動與競技",
    "description": "禮節、距離與出手的時機，構成一場安靜而迅速的對話。擊劍社延續聯邦的競技傳統，透過教練指導與分組練習，培養專注和判斷。",
    "activities": [
      "步伐與基礎訓練",
      "規則與禮儀交流",
      "分組對練"
    ],
    "place": "校園擊劍訓練館"
  },
  {
    "id": "equestrian",
    "name": "馬術社",
    "en": "Equestrian Club",
    "category": "運動與競技",
    "description": "馬術不只關乎騎乘，也關乎理解另一個生命。社團與獸醫學院保持交流，在教練帶領下認識馬匹照護、騎乘禮儀與聯邦的馬術文化。",
    "activities": [
      "馬匹照護交流",
      "教練指導騎乘",
      "馬術文化分享"
    ],
    "place": "聯邦馬術訓練場"
  },
  {
    "id": "castle-exploration",
    "name": "城堡探索社",
    "en": "Castle Exploration Society",
    "category": "探索與踏查",
    "description": "城牆、石階與舊地圖，記錄著學術城成形以前的故事。成員循著史料與核准的導覽路線踏查古堡，將建築細節與地方傳說整理成探索筆記。",
    "activities": [
      "城堡史料共讀",
      "建築速寫",
      "古堡導覽踏查"
    ],
    "place": "聯邦歷史街區與開放參訪的古堡"
  },
  {
    "id": "caving",
    "name": "洞穴探險社",
    "en": "Caving Society",
    "category": "探索與踏查",
    "description": "把對未知的好奇，變成有準備的探索。社團從地質知識、讀圖與裝備認識出發，並由領隊帶領成員踏查核准路線，記錄地下景觀與環境觀察。",
    "activities": [
      "地質與讀圖交流",
      "裝備認識",
      "核准路線踏查"
    ],
    "place": "校園行前教室與核准踏查區域"
  },
  {
    "id": "student-union",
    "name": "學生會",
    "en": "Student Union",
    "category": "交流與日常",
    "description": "讓學生的聲音，成為城市運作的一部分。學生會協調社團資源、蒐集校園提案，也與各學院一起籌備新生嘉年華、冬季市集及跨院活動。",
    "activities": [
      "學生意見交流",
      "社團活動協調",
      "冬季市集籌備"
    ],
    "place": "學生會辦公室與校園活動空間"
  }
];
  const storageKey = 'rumsa-selected-club';

  function showClub(id, remember = false) {
    const club = clubs.find((item) => item.id === id) || clubs[0];
    select.value = club.id;
    document.querySelector('#clubCategory').textContent = club.category;
    document.querySelector('#clubName').textContent = club.name;
    document.querySelector('#clubEnglish').textContent = club.en;
    document.querySelector('#clubDescription').textContent = club.description;
    document.querySelector('#clubPlace').textContent = club.place;
    document.querySelector('#clubActivities').replaceChildren(...club.activities.map((activity) => {
      const item = document.createElement('li');
      item.textContent = activity;
      return item;
    }));
    document.querySelector('#clubSelectionStatus').textContent = `目前瀏覽：${club.name}`;
    if (remember) {
      try { window.localStorage.setItem(storageKey, club.id); } catch {}
    }
  }

  let initialClub = select.value;
  try { initialClub = window.localStorage.getItem(storageKey) || initialClub; } catch {}
  showClub(initialClub);
  picker.hidden = false;
  select.addEventListener('change', () => showClub(select.value, true));
})();
