import { SITES_DATA } from './data/sites.js';

export class ExplorerModule {
  constructor(containerEl, modalEl) {
    this.container = containerEl;
    this.modal = modalEl;
    this.currentCategory = 'all';
    this.searchQuery = '';
    this.viewedSites = new Set();
  }

  render() {
    if (!this.container) return;

    const filtered = SITES_DATA.filter(site => {
      const matchesCat = this.currentCategory === 'all' || site.category === this.currentCategory;
      const query = this.searchQuery.toLowerCase().trim();
      const matchesSearch = !query || 
        site.name.toLowerCase().includes(query) ||
        site.nameEn.toLowerCase().includes(query) ||
        site.country.toLowerCase().includes(query) ||
        site.countryEn.toLowerCase().includes(query) ||
        site.region.toLowerCase().includes(query);
      
      return matchesCat && matchesSearch;
    });

    if (filtered.length === 0) {
      this.container.innerHTML = `
        <div class="empty-state">
          <span class="empty-icon">🔍</span>
          <p>該当する世界遺産が見つかりませんでした。</p>
        </div>
      `;
      return;
    }

    this.container.innerHTML = filtered.map(site => `
      <div class="site-card" data-id="${site.id}">
        <div class="site-card-image-wrap">
          <img src="${site.image}" alt="${site.name}" loading="lazy" class="site-card-img" />
          <span class="badge badge-${site.category}">${site.categoryJa}</span>
        </div>
        <div class="site-card-body">
          <div class="site-card-meta">
            <span class="site-country">📍 ${site.country}</span>
            <span class="site-year">📜 ${site.yearInscribed}年登録</span>
          </div>
          <h3 class="site-title">${site.name}</h3>
          <p class="site-desc">${site.description.substring(0, 75)}...</p>
          <button class="btn btn-outline btn-sm view-detail-btn" data-id="${site.id}">詳細を見る ➔</button>
        </div>
      </div>
    `).join('');

    // Attach click handlers
    this.container.querySelectorAll('.site-card, .view-detail-btn').forEach(el => {
      el.addEventListener('click', (e) => {
        const id = el.getAttribute('data-id');
        this.openModal(id);
      });
    });
  }

  setCategory(cat) {
    this.currentCategory = cat;
    this.render();
  }

  setSearch(query) {
    this.searchQuery = query;
    this.render();
  }

  openModal(siteId) {
    const site = SITES_DATA.find(s => s.id === siteId);
    if (!site || !this.modal) return;

    this.viewedSites.add(siteId);
    this.checkAchievements();

    const categoryBadgeClass = `badge-${site.category}`;

    this.modal.querySelector('.modal-content-area').innerHTML = `
      <div class="site-detail-modal">
        <div class="modal-header-img-wrap">
          <img src="${site.image}" alt="${site.name}" class="modal-header-img" />
          <div class="modal-header-overlay">
            <span class="badge ${categoryBadgeClass}">${site.categoryJa}</span>
            <h2>${site.name}</h2>
            <p class="en-title">${site.nameEn}</p>
          </div>
        </div>
        <div class="modal-body-content">
          <div class="detail-grid">
            <div class="detail-item">
              <span class="detail-label">国・地域</span>
              <span class="detail-val">📍 ${site.country} (${site.region})</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">登録年</span>
              <span class="detail-val">🏛️ ${site.yearInscribed}年</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">地理座標</span>
              <span class="detail-val">🗺️ ${site.coordinates}</span>
            </div>
          </div>

          <div class="detail-section">
            <h3>📖 概要</h3>
            <p>${site.description}</p>
          </div>

          <div class="detail-section fun-fact-box">
            <h3>💡 豆知識 / トリビア</h3>
            <p>${site.funFact}</p>
          </div>
        </div>
      </div>
    `;

    this.modal.classList.add('active');
  }

  closeModal() {
    if (this.modal) {
      this.modal.classList.remove('active');
    }
  }

  checkAchievements() {
    if (this.viewedSites.size >= 10) {
      const unlocked = JSON.parse(localStorage.getItem('whq_achievements') || '[]');
      if (!unlocked.includes('explorer_view')) {
        unlocked.push('explorer_view');
        localStorage.setItem('whq_achievements', JSON.stringify(unlocked));
      }
    }
  }
}
