import { SITES_DATA, HANDCRAFTED_QUESTIONS, BASIC_KNOWLEDGE_QUESTIONS } from './data/sites.js';

export class QuizEngine {
  constructor() {
    this.mode = 'all'; // 'basic' | 'country' | 'year' | 'description' | 'all'
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
    // Basic Knowledge Mode
    if (mode === 'basic') {
      const basicPool = BASIC_KNOWLEDGE_QUESTIONS.map(q => ({
        type: 'basic',
        site: { region: 'UNESCO基礎知識', categoryJa: '制度・基本概念' },
        title: '📘 基礎知識・制度クイズ',
        question: q.question,
        options: [...q.options],
        correctIndex: q.correctIndex,
        explanation: q.explanation
      }));
      return basicPool.sort(() => 0.5 - Math.random()).slice(0, count);
    }

    const questionsPool = [];

    // Add basic knowledge questions to 'all' mode pool as well
    if (mode === 'all') {
      for (const q of BASIC_KNOWLEDGE_QUESTIONS) {
        questionsPool.push({
          type: 'basic',
          site: { region: 'UNESCO基礎知識', categoryJa: '制度・基本概念' },
          title: '📘 基礎知識・制度クイズ',
          question: q.question,
          options: [...q.options],
          correctIndex: q.correctIndex,
          explanation: q.explanation
        });
      }
    }

    const shuffledSites = [...SITES_DATA].sort(() => 0.5 - Math.random());
    const allCountries = Array.from(new Set(SITES_DATA.map(s => s.country))).filter(c => c && c !== '不明');

    for (const site of shuffledSites) {
      // 1. Country match question
      if (mode === 'country' || mode === 'all') {
        const otherCountries = allCountries
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
          options: options,
          correctIndex: correctIndex,
          explanation: `正解は「${site.country}」です！${site.name}（${site.categoryJa}）は${site.region}の${site.country}に位置します。`
        });
      }

      // 2. Name identification question from Description & Region
      if (mode === 'description' || mode === 'all') {
        const otherSites = SITES_DATA.filter(s => s.id !== site.id)
          .sort(() => 0.5 - Math.random())
          .slice(0, 3);
        const options = [site.name, ...otherSites.map(s => s.name)].sort(() => 0.5 - Math.random());
        const correctIndex = options.indexOf(site.name);

        questionsPool.push({
          type: 'description',
          site: site,
          title: '🏛 遺産当てクイズ',
          question: `【${site.country}】にある${site.categoryJa}（${site.yearInscribed}年登録）で、「${site.description}」という特徴を持つ世界遺産はどれでしょう？`,
          options: options,
          correctIndex: correctIndex,
          explanation: `正解は「${site.name}」です！${site.country}の${site.categoryJa}として登録されています。`
        });
      }

      // 3. Year inscribed question
      if (mode === 'year' || mode === 'all') {
        const baseYear = site.yearInscribed;
        const dummyYears = new Set();
        while (dummyYears.size < 3) {
          const offset = (Math.floor(Math.random() * 7) + 1) * (Math.random() < 0.5 ? 1 : -1);
          const y = baseYear + offset;
          if (y !== baseYear && y >= 1978 && y <= 2026) {
            dummyYears.add(y);
          }
        }
        const options = [`${baseYear}年`, ...Array.from(dummyYears).map(y => `${y}年`)].sort(() => 0.5 - Math.random());
        const correctIndex = options.indexOf(`${baseYear}年`);

        questionsPool.push({
          type: 'year',
          site: site,
          title: '📅 登録年クイズ',
          question: `世界遺産「${site.name}」（${site.country}）がUNESCO世界遺産に登録された年はいつでしょう？`,
          options: options,
          correctIndex: correctIndex,
          explanation: `正解は「${baseYear}年」です！${site.name}は${baseYear}年に世界遺産に登録されました。`
        });
      }

      // 4. Handcrafted trivia if available
      if (HANDCRAFTED_QUESTIONS[site.id]) {
        for (const q of HANDCRAFTED_QUESTIONS[site.id]) {
          questionsPool.push({
            type: 'trivia',
            site: site,
            title: '📜 トリビア・歴史クイズ',
            question: q.question,
            options: q.options,
            correctIndex: q.correctIndex,
            explanation: q.explanation
          });
        }
      }
    }

    // Shuffle pool and return requested count
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

      if (this.speedrun) {
        // Bonus for time left
        multiplier += (this.timeLeft / 15) * 0.5;
      }

      pointsEarned = Math.round(100 * multiplier);
      this.score += pointsEarned;
    } else {
      this.streak = 0;
    }

    this.history.push({
      question: q,
      selectedIndex,
      isCorrect,
      pointsEarned
    });

    return {
      isCorrect,
      correctIndex: q.correctIndex,
      explanation: q.explanation,
      pointsEarned,
      totalScore: this.score,
      streak: this.streak
    };
  }

  nextQuestion() {
    this.currentIndex += 1;
    return this.getCurrentQuestion();
  }

  getSummary() {
    const total = this.questions.length;
    const accuracy = total > 0 ? Math.round((this.correctCount / total) * 100) : 0;
    
    let rank = '見習い探検家';
    let badge = '🥉';
    if (accuracy === 100 && total >= 10) {
      rank = '伝説の世界遺産マスター';
      badge = '👑';
    } else if (accuracy >= 80) {
      rank = '一流の遺産研究家';
      badge = '🥇';
    } else if (accuracy >= 50) {
      rank = '熟練探検家';
      badge = '🥈';
    }

    return {
      score: this.score,
      correctCount: this.correctCount,
      totalQuestions: total,
      accuracy,
      maxStreak: this.maxStreak,
      rank,
      badge
    };
  }
}
