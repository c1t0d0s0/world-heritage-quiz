import { SITES_DATA, getCountryFlagHtml } from './data/sites.js';

export class ExplorerModule {
  constructor(containerEl, modalEl) {
    this.container = containerEl;
    this.modal = modalEl;
    this.currentCategory = 'all';
    this.currentRegion = 'all';
    this.searchQuery = '';
    this.pageSize = 40;
    this.displayedCount = 40;
    this.viewedSites = new Set();
  }

  render() {
    if (!this.container) return;

    const filtered = this.getFilteredSites();

    if (filtered.length === 0) {
      this.container.innerHTML = `
        <div class="empty-state">
          <span class="empty-icon">🔍</span>
          <p>該当する世界遺産が見つかりませんでした。</p>
        </div>
      `;
      return;
    }

    const itemsToDisplay = filtered.slice(0, this.displayedCount);

    const cardsHtml = itemsToDisplay.map(site => {
      const categoryIcon = site.category === 'natural' ? '🌿' : site.category === 'mixed' ? '🌋' : '🏛️';
      
      return `
        <div class="site-card site-card-text site-card-${site.category}" data-id="${site.id}">
          <div class="site-card-header-gradient">
            <div class="site-card-top-tags">
              <span class="badge badge-${site.category}">${categoryIcon} ${site.categoryJa}</span>
              <span class="region-badge">📍 ${site.region}</span>
            </div>
            <h3 class="site-title">${site.name}</h3>
            <p class="site-title-en">${site.nameEn}</p>
          </div>
          <div class="site-card-body">
            <div class="site-card-meta">
              <span class="site-country">${getCountryFlagHtml(site.country)} ${site.country}</span>
              <span class="site-year">📜 ${site.yearInscribed}年登録</span>
            </div>
            <p class="site-desc">${site.description.substring(0, 80)}${site.description.length > 80 ? '...' : ''}</p>
            <button class="btn btn-outline btn-sm view-detail-btn" data-id="${site.id}">詳細を見る ➔</button>
          </div>
        </div>
      `;
    }).join('');

    let loadMoreHtml = '';
    if (this.displayedCount < filtered.length) {
      const remaining = filtered.length - this.displayedCount;
      const progressPercent = Math.min(100, Math.round((this.displayedCount / filtered.length) * 100));

      loadMoreHtml = `
        <div class="load-more-continuation-wrap">
          <!-- フェードオーバーレイ（下へカードが隠れている視覚効果） -->
          <div class="load-more-fade-overlay"></div>

          <!-- チラ見せゴーストカード（続きの存在を表現） -->
          <div class="load-more-ghost-preview">
            <div class="ghost-card-skeleton"></div>
            <div class="ghost-card-skeleton"></div>
            <div class="ghost-card-skeleton"></div>
          </div>

          <!-- 展開アクションボタン・プログレス -->
          <div class="load-more-action-center">
            <button id="load-more-btn" class="load-more-stream-btn">
              <span class="stream-icon-arrow">⬇</span>
              <span class="stream-btn-label">続きの遺産を表示する</span>
              <span class="stream-badge">残り ${remaining} 件</span>
            </button>
            <div class="stream-progress-wrap">
              <div class="stream-progress-bar" style="width: ${progressPercent}%"></div>
            </div>
            <span class="stream-counter-info">表示中: ${this.displayedCount} / 全 ${filtered.length} 件 (${progressPercent}%)</span>
          </div>
        </div>
      `;
    }

    const countSummaryHtml = `
      <div class="explorer-results-count">
        検索結果: <strong>${filtered.length}</strong> 件の世界遺産
      </div>
    `;

    this.container.innerHTML = countSummaryHtml + `<div class="sites-grid">${cardsHtml}</div>` + loadMoreHtml;

    // Attach click handlers
    this.container.querySelectorAll('.site-card, .view-detail-btn').forEach(el => {
      el.addEventListener('click', (e) => {
        // Prevent trigger twice if button inside card clicked
        const id = el.getAttribute('data-id');
        this.openModal(id);
      });
    });

    const loadMoreBtn = document.getElementById('load-more-btn');
    if (loadMoreBtn) {
      loadMoreBtn.addEventListener('click', () => {
        this.displayedCount += this.pageSize;
        this.render();
      });
    }
  }

  getFilteredSites() {
    return SITES_DATA.filter(site => {
      const matchesCat = this.currentCategory === 'all' || site.category === this.currentCategory;
      const matchesReg = this.currentRegion === 'all' || site.region === this.currentRegion;
      const query = this.searchQuery.toLowerCase().trim();
      const matchesSearch = !query || 
        site.name.toLowerCase().includes(query) ||
        site.nameEn.toLowerCase().includes(query) ||
        site.country.toLowerCase().includes(query) ||
        site.countryEn.toLowerCase().includes(query) ||
        site.region.toLowerCase().includes(query) ||
        String(site.yearInscribed).includes(query);
      
      return matchesCat && matchesReg && matchesSearch;
    });
  }

  setCategory(cat) {
    this.currentCategory = cat;
    this.displayedCount = this.pageSize;
    this.render();
  }

  setRegion(reg) {
    this.currentRegion = reg;
    this.displayedCount = this.pageSize;
    this.render();
  }

  setSearch(query) {
    this.searchQuery = query;
    this.displayedCount = this.pageSize;
    this.render();
  }

  openModal(siteId) {
    const site = SITES_DATA.find(s => s.id === siteId);
    if (!site || !this.modal) return;

    this.viewedSites.add(siteId);
    this.checkAchievements();

    const categoryIcon = site.category === 'natural' ? '🌿' : site.category === 'mixed' ? '🌋' : '🏛️';

    this.modal.querySelector('.modal-content-area').innerHTML = `
      <div class="site-detail-modal">
        <div class="modal-header-text-wrap modal-header-${site.category}">
          <div class="modal-top-meta">
            <span class="badge badge-${site.category}">${categoryIcon} ${site.categoryJa}</span>
            <span class="region-badge">📍 ${site.region}</span>
          </div>
          <h2>${site.name}</h2>
          <p class="en-title">${site.nameEn}</p>
        </div>
        <div class="modal-body-content">
          <div class="detail-grid">
            <div class="detail-item">
              <span class="detail-label">所在国</span>
              <span class="detail-val">${getCountryFlagHtml(site.country, 'flag-icon-lg')} ${site.country} (${site.countryEn})</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">登録年</span>
              <span class="detail-val">🏛️ ${site.yearInscribed}年</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">地域区分</span>
              <span class="detail-val">🗺️ ${site.region}</span>
            </div>
          </div>

          <div class="detail-section">
            <h3>📖 遺産概要</h3>
            <p>${site.description}</p>
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
