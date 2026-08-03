import confetti from 'canvas-confetti';
import { QuizEngine } from './quiz.js';
import { ExplorerModule } from './explorer.js';
import { audio } from './audio.js';
import { ACHIEVEMENTS } from './data/sites.js';

class App {
  constructor() {
    this.quiz = new QuizEngine();
    this.explorer = null;
    this.currentView = 'home';
    this.lastMode = 'all';
    this.lastSpeedrun = false;

    this.initElements();
    this.initExplorer();
    this.bindEvents();
    this.updateAchievementsView();
  }

  initElements() {
    // Navigation
    this.navBtns = document.querySelectorAll('.nav-btn');
    this.viewSections = document.querySelectorAll('.view-section');
    this.audioBtn = document.getElementById('audio-toggle-btn');
    this.logoHomeLink = document.getElementById('logo-home-link');

    // Quiz UI
    this.scoreEl = document.getElementById('quiz-score');
    this.progressTextEl = document.getElementById('quiz-progress-text');
    this.progressBarEl = document.getElementById('quiz-progress-bar');
    this.streakContainer = document.getElementById('streak-container');
    this.timerWrapper = document.getElementById('timer-bar-wrapper');
    this.timerBarEl = document.getElementById('quiz-timer-bar');

    this.questionTag = document.getElementById('question-tag');
    this.questionSiteRegion = document.getElementById('question-site-region');
    this.questionText = document.getElementById('question-text');
    this.optionsContainer = document.getElementById('options-container');

    this.explanationBox = document.getElementById('explanation-box');
    this.explanationText = document.getElementById('explanation-text');
    this.nextBtnWrap = document.getElementById('next-btn-wrap');
    this.nextBtn = document.getElementById('next-question-btn');

    // Results UI
    this.resultsBadgeIcon = document.getElementById('results-badge-icon');
    this.resultsTitle = document.getElementById('results-title');
    this.resultsRankName = document.getElementById('results-rank-name');
    this.resultsScoreVal = document.getElementById('results-score-val');
    this.resultsAccuracy = document.getElementById('results-accuracy');
    this.resultsMaxStreak = document.getElementById('results-max-streak');
    this.resultsPercentage = document.getElementById('results-percentage');
    this.retryBtn = document.getElementById('retry-quiz-btn');
    this.goExplorerBtn = document.getElementById('go-explorer-btn');

    // Modal
    this.modalOverlay = document.getElementById('site-modal-overlay');
    this.modalCloseBtn = document.getElementById('modal-close-btn');

    // Explorer Search/Filter
    this.explorerSearchInput = document.getElementById('explorer-search-input');
    this.catFilterBtns = document.querySelectorAll('#cat-filter-tags .filter-btn');
    this.regFilterBtns = document.querySelectorAll('#reg-filter-tags .filter-btn-reg');

    // Achievements UI
    this.highScoreVal = document.getElementById('high-score-val');
    this.achievementsGrid = document.getElementById('achievements-grid-container');
  }

  initExplorer() {
    const gridContainer = document.getElementById('sites-grid-container');
    this.explorer = new ExplorerModule(gridContainer, this.modalOverlay);
    this.explorer.render();
  }

  bindEvents() {
    // Navigation
    this.navBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const view = btn.getAttribute('data-view');
        this.switchView(view);
        audio.playClick();
      });
    });

    if (this.logoHomeLink) {
      this.logoHomeLink.addEventListener('click', (e) => {
        e.preventDefault();
        this.switchView('home');
        audio.playClick();
      });
    }

    // Audio toggle
    if (this.audioBtn) {
      this.audioBtn.addEventListener('click', () => {
        const muted = audio.toggleMute();
        this.audioBtn.textContent = muted ? '🔇' : '🔊';
      });
    }

    // Start Quiz Buttons
    document.querySelectorAll('.start-quiz-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const mode = btn.getAttribute('data-mode') || 'all';
        const speedrun = btn.getAttribute('data-speedrun') === 'true';
        this.startQuiz(mode, speedrun);
        audio.playClick();
      });
    });

    // Next Question Button
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => {
        this.advanceQuiz();
        audio.playClick();
      });
    }

    // Retry & Explorer Buttons
    if (this.retryBtn) {
      this.retryBtn.addEventListener('click', () => {
        this.startQuiz(this.lastMode, this.lastSpeedrun);
        audio.playClick();
      });
    }

    if (this.goExplorerBtn) {
      this.goExplorerBtn.addEventListener('click', () => {
        this.switchView('explorer');
        audio.playClick();
      });
    }

    // Modal Close
    if (this.modalCloseBtn) {
      this.modalCloseBtn.addEventListener('click', () => {
        this.explorer.closeModal();
        audio.playClick();
      });
    }

    if (this.modalOverlay) {
      this.modalOverlay.addEventListener('click', (e) => {
        if (e.target === this.modalOverlay) {
          this.explorer.closeModal();
        }
      });
    }

    // Explorer Search
    if (this.explorerSearchInput) {
      this.explorerSearchInput.addEventListener('input', (e) => {
        this.explorer.setSearch(e.target.value);
      });
    }

    // Explorer Category Filters
    this.catFilterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.catFilterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.getAttribute('data-cat');
        this.explorer.setCategory(cat);
        audio.playClick();
      });
    });

    // Explorer Region Filters
    this.regFilterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.regFilterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const reg = btn.getAttribute('data-reg');
        this.explorer.setRegion(reg);
        audio.playClick();
      });
    });
  }

  switchView(viewName) {
    this.currentView = viewName;
    this.navBtns.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-view') === viewName);
    });

    this.viewSections.forEach(section => {
      section.classList.toggle('active', section.id === `view-${viewName}`);
    });

    if (viewName === 'achievements') {
      this.updateAchievementsView();
    }
  }

  startQuiz(mode, speedrun) {
    this.lastMode = mode;
    this.lastSpeedrun = speedrun;
    this.switchView('quiz');

    const q = this.quiz.startQuiz(mode, speedrun, 10);
    this.renderQuestion(q);
    this.checkAchievement('first_quiz');
  }

  renderQuestion(q) {
    if (!q) return;

    this.scoreEl.textContent = this.quiz.score;
    this.progressTextEl.textContent = `${this.quiz.currentIndex + 1} / ${this.quiz.questions.length}`;

    const progressPercent = ((this.quiz.currentIndex) / this.quiz.questions.length) * 100;
    this.progressBarEl.style.width = `${progressPercent}%`;

    // Streak badge
    if (this.quiz.streak > 1) {
      this.streakContainer.innerHTML = `<span class="streak-badge">🔥 ${this.quiz.streak} コンボ</span>`;
    } else {
      this.streakContainer.innerHTML = '';
    }

    // Question content
    this.questionTag.textContent = q.title;
    if (this.questionSiteRegion && q.site) {
      this.questionSiteRegion.textContent = `📍 ${q.site.region} / ${q.site.categoryJa}`;
    }
    this.questionText.textContent = q.question;

    // Hide explanation & next button initially
    this.explanationBox.classList.remove('active');
    this.nextBtnWrap.style.display = 'none';

    // Options buttons
    this.optionsContainer.innerHTML = q.options.map((opt, idx) => `
      <button class="option-btn" data-index="${idx}">
        <span>${opt}</span>
        <span class="option-indicator"></span>
      </button>
    `).join('');

    this.optionsContainer.querySelectorAll('.option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-index'), 10);
        this.handleAnswer(idx);
      });
    });

    // Speedrun timer
    if (this.quiz.speedrun) {
      this.timerWrapper.style.display = 'block';
      this.quiz.startQuestionTimer(
        (timeLeft) => {
          const percent = (timeLeft / 15) * 100;
          this.timerBarEl.style.width = `${percent}%`;
        },
        () => {
          // Time's up -> wrong answer (index -1)
          this.handleAnswer(-1);
        }
      );
    } else {
      this.timerWrapper.style.display = 'none';
    }
  }

  handleAnswer(selectedIndex) {
    const res = this.quiz.answerCurrentQuestion(selectedIndex);
    if (!res) return;

    // Disable option buttons
    const buttons = this.optionsContainer.querySelectorAll('.option-btn');
    buttons.forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === res.correctIndex) {
        btn.classList.add('correct');
      } else if (idx === selectedIndex) {
        btn.classList.add('wrong');
      }
    });

    // Play Sound & Effects
    if (res.isCorrect) {
      audio.playCorrect();
      if (res.streak >= 3) {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 }
        });
      }
      if (res.streak >= 5) {
        this.checkAchievement('streak_5');
      }
    } else {
      audio.playWrong();
    }

    // Update Score UI
    this.scoreEl.textContent = res.totalScore;
    if (res.streak > 1) {
      this.streakContainer.innerHTML = `<span class="streak-badge">🔥 ${res.streak} コンボ (+${res.pointsEarned}pt)</span>`;
    }

    // Show Explanation
    this.explanationText.textContent = res.explanation;
    this.explanationBox.classList.add('active');
    this.nextBtnWrap.style.display = 'block';
  }

  advanceQuiz() {
    const nextQ = this.quiz.nextQuestion();
    if (nextQ) {
      this.renderQuestion(nextQ);
    } else {
      this.showResults();
    }
  }

  showResults() {
    const summary = this.quiz.getSummary();

    this.resultsBadgeIcon.textContent = summary.badge;
    this.resultsRankName.textContent = summary.rank;
    this.resultsScoreVal.textContent = summary.score.toLocaleString();
    this.resultsAccuracy.textContent = `${summary.correctCount} / ${summary.totalQuestions}`;
    this.resultsMaxStreak.textContent = `🔥 ${summary.maxStreak}`;
    this.resultsPercentage.textContent = `${summary.accuracy}%`;

    this.switchView('results');

    // Update High Score
    const currentHighScore = parseInt(localStorage.getItem('whq_highscore') || '0', 10);
    if (summary.score > currentHighScore) {
      localStorage.setItem('whq_highscore', summary.score.toString());
    }

    // Achievements check
    if (summary.accuracy === 100) {
      this.checkAchievement('perfect_score');
    }
    if (this.lastSpeedrun) {
      this.checkAchievement('speedrunner');
    }

    // Big confetti celebrate
    if (summary.accuracy >= 70) {
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.6 }
      });
    }
  }

  checkAchievement(id) {
    const unlocked = JSON.parse(localStorage.getItem('whq_achievements') || '[]');
    if (!unlocked.includes(id)) {
      unlocked.push(id);
      localStorage.setItem('whq_achievements', JSON.stringify(unlocked));
    }
  }

  updateAchievementsView() {
    const highScore = localStorage.getItem('whq_highscore') || '0';
    if (this.highScoreVal) {
      this.highScoreVal.textContent = parseInt(highScore, 10).toLocaleString();
    }

    const unlocked = JSON.parse(localStorage.getItem('whq_achievements') || '[]');

    if (this.achievementsGrid) {
      this.achievementsGrid.innerHTML = ACHIEVEMENTS.map(ach => {
        const isUnlocked = unlocked.includes(ach.id);
        return `
          <div class="achievement-card ${isUnlocked ? 'unlocked' : 'locked'}">
            <span class="achievement-icon">${ach.icon}</span>
            <div class="achievement-info">
              <h4>${ach.name}</h4>
              <p>${ach.desc}</p>
              <span class="achievement-status">${isUnlocked ? '✅ 達成済み' : '🔒 未開放'}</span>
            </div>
          </div>
        `;
      }).join('');
    }
  }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  new App();
});
