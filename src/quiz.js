import { SITES_DATA } from './data/sites.js';

export class QuizEngine {
  constructor() {
    this.mode = 'all'; // 'photo' | 'country' | 'trivia' | 'all'
    this.speedrun = false;
    this.questions = [];
    this.currentIndex = 0;
    this.score = 0;
    this.streak = 0;
    this.maxStreak = 0;
    this.correctCount = 0;
    this.timer = null;
    this.timeLeft = 15;
    this.onTimerTick = null;
    this.onTimerEnd = null;
    this.history = [];
  }

  startQuiz(mode = 'all', speedrun = false, questionCount = 10) {
    this.mode = mode;
    this.speedrun = speedrun;
    this.currentIndex = 0;
    this.score = 0;
    this.streak = 0;
    this.maxStreak = 0;
    this.correctCount = 0;
    this.history = [];

    this.questions = this.generateQuestions(mode, questionCount);
    return this.getCurrentQuestion();
  }

  generateQuestions(mode, count) {
    const questionsPool = [];
    const shuffledSites = [...SITES_DATA].sort(() => 0.5 - Math.random());

    for (const site of shuffledSites) {
      if (mode === 'photo' || mode === 'all') {
        // Photo identification question
        const otherSites = SITES_DATA.filter(s => s.id !== site.id)
          .sort(() => 0.5 - Math.random())
          .slice(0, 3);
        const options = [site.name, ...otherSites.map(s => s.name)].sort(() => 0.5 - Math.random());
        const correctIndex = options.indexOf(site.name);

        questionsPool.push({
          type: 'photo',
          site: site,
          title: '📸 写真鑑定クイズ',
          question: '写真に写っている世界遺産の名称として正しいものはどれ？',
          image: site.image,
          options: options,
          correctIndex: correctIndex,
          explanation: `${site.name}（${site.country}）\n${site.description}`
        });
      }

      if (mode === 'country' || mode === 'all') {
        // Country match question
        const otherCountries = Array.from(new Set(SITES_DATA.map(s => s.country)))
          .filter(c => c !== site.country)
          .sort(() => 0.5 - Math.random())
          .slice(0, 3);
        const options = [site.country, ...otherCountries].sort(() => 0.5 - Math.random());
        const correctIndex = options.indexOf(site.country);

        questionsPool.push({
          type: 'country',
          site: site,
          title: '🌍 所在地クイズ',
          question: `世界遺産「${site.name}」が位置する国はどこでしょう？`,
          image: site.image,
          options: options,
          correctIndex: correctIndex,
          explanation: `正解は「${site.country}」です！${site.name}は${site.region}の${site.country}に位置します。`
        });
      }

      if (mode === 'trivia' || mode === 'all') {
        // Trivia questions from site.questions
        for (const q of site.questions) {
          questionsPool.push({
            type: 'trivia',
            site: site,
            title: '📜 トリビア・歴史クイズ',
            question: q.question,
            image: site.image,
            options: q.options,
            correctIndex: q.correctIndex,
            explanation: q.explanation
          });
        }
      }
    }

    // Shuffle pool and take count
    return questionsPool.sort(() => 0.5 - Math.random()).slice(0, count);
  }

  getCurrentQuestion() {
    if (this.currentIndex >= this.questions.length) return null;
    return this.questions[this.currentIndex];
  }

  startQuestionTimer(onTick, onEnd) {
    this.stopTimer();
    if (!this.speedrun) return;

    this.timeLeft = 15;
    this.onTimerTick = onTick;
    this.onTimerEnd = onEnd;

    if (this.onTimerTick) this.onTimerTick(this.timeLeft);

    this.timer = setInterval(() => {
      this.timeLeft -= 1;
      if (this.onTimerTick) this.onTimerTick(this.timeLeft);

      if (this.timeLeft <= 0) {
        this.stopTimer();
        if (this.onTimerEnd) this.onTimerEnd();
      }
    }, 1000);
  }

  stopTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  answerCurrentQuestion(selectedIndex) {
    this.stopTimer();
    const q = this.getCurrentQuestion();
    if (!q) return null;

    const isCorrect = selectedIndex === q.correctIndex;

    let pointsEarned = 0;
    if (isCorrect) {
      this.streak += 1;
      if (this.streak > this.maxStreak) this.maxStreak = this.streak;
      this.correctCount += 1;

      // Base points = 100
      let multiplier = 1.0;
      if (this.streak >= 5) multiplier = 2.0;
      else if (this.streak >= 3) multiplier = 1.5;

      let speedBonus = 0;
      if (this.speedrun) {
        speedBonus = this.timeLeft * 10;
      }

      pointsEarned = Math.round((100 + speedBonus) * multiplier);
      this.score += pointsEarned;
    } else {
      this.streak = 0;
    }

    const result = {
      question: q,
      selectedIndex: selectedIndex,
      isCorrect: isCorrect,
      pointsEarned: pointsEarned,
      currentStreak: this.streak,
      totalScore: this.score
    };

    this.history.push(result);
    return result;
  }

  nextQuestion() {
    this.currentIndex += 1;
    return this.getCurrentQuestion();
  }

  isFinished() {
    return this.currentIndex >= this.questions.length;
  }

  getSummary() {
    const total = this.questions.length;
    const accuracy = total > 0 ? Math.round((this.correctCount / total) * 100) : 0;
    
    let rank = '旅の見習い';
    let rankBadge = '🥉';
    if (accuracy === 100) {
      rank = '世界遺産グランドマスター';
      rankBadge = '🏆';
    } else if (accuracy >= 80) {
      rank = '熟練のエクスプローラー';
      rankBadge = '🥇';
    } else if (accuracy >= 60) {
      rank = '旅のトラベラー';
      rankBadge = '🥈';
    }

    return {
      score: this.score,
      correctCount: this.correctCount,
      totalQuestions: total,
      accuracy: accuracy,
      maxStreak: this.maxStreak,
      rank: rank,
      rankBadge: rankBadge,
      mode: this.mode,
      speedrun: this.speedrun
    };
  }
}
