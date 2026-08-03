import { SITES_DATA, HANDCRAFTED_QUESTIONS, BASIC_KNOWLEDGE_QUESTIONS } from './data/sites.js';
import { KENTEI_GRADES, KENTEI_SPECIFIC_QUESTIONS } from './data/kentei.js';

export class QuizEngine {
  constructor() {
    this.mode = 'all'; // 'basic' | 'country' | 'year' | 'description' | 'all' | 'kentei'
    this.grade = null; // '4' | '3' | '2' | 'pre1' | '1'
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

  startQuiz(mode = 'all', speedrun = false, questionCount = 10, grade = null) {
    this.mode = mode;
    this.grade = grade;
    this.speedrun = speedrun;
    this.currentIndex = 0;
    this.score = 0;
    this.streak = 0;
    this.maxStreak = 0;
    this.correctCount = 0;
    this.history = [];

    this.questions = this.generateQuestions(mode, questionCount, grade);
    return this.getCurrentQuestion();
  }

  generateQuestions(mode, count, grade) {
    // Sekai Isan Kentei Mode
    if (mode === 'kentei' && grade && KENTEI_GRADES[grade]) {
      return this.generateKenteiQuestions(grade);
    }

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

    // Deduplicate and select final questions
    const finalQuestions = [];
    const usedTexts = new Set();
    const usedSiteIds = new Set();

    const shuffledPool = questionsPool.sort(() => 0.5 - Math.random());

    for (const q of shuffledPool) {
      if (finalQuestions.length >= count) break;
      const qText = q.question.trim();
      const siteId = q.site && q.site.id ? q.site.id : null;

      if (usedTexts.has(qText)) continue;
      if (siteId && usedSiteIds.has(siteId)) continue;

      usedTexts.add(qText);
      if (siteId) usedSiteIds.add(siteId);
      finalQuestions.push(q);
    }

    if (finalQuestions.length < count) {
      for (const q of shuffledPool) {
        if (finalQuestions.length >= count) break;
        const qText = q.question.trim();
        if (!usedTexts.has(qText)) {
          usedTexts.add(qText);
          finalQuestions.push(q);
        }
      }
    }

    return finalQuestions;
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

    const summary = {
      score: this.score,
      correctCount: this.correctCount,
      totalQuestions: total,
      accuracy,
      maxStreak: this.maxStreak,
      rank,
      badge
    };

    if (this.mode === 'kentei' && this.grade && KENTEI_GRADES[this.grade]) {
      const config = KENTEI_GRADES[this.grade];
      summary.isKentei = true;
      summary.gradeConfig = config;
      summary.isPassed = accuracy >= config.passScorePercent;
    }

    return summary;
  }

  generateKenteiQuestions(grade) {
    const config = KENTEI_GRADES[grade] || KENTEI_GRADES['4'];
    const count = config.questionCount;
    const pool = [];

    // 1. Dedicated grade-specific questions (Randomly sample 2-4 items)
    if (KENTEI_SPECIFIC_QUESTIONS[grade]) {
      const specificShuffled = [...KENTEI_SPECIFIC_QUESTIONS[grade]].sort(() => 0.5 - Math.random());
      for (const q of specificShuffled.slice(0, 4)) {
        pool.push({
          type: 'kentei',
          site: { id: `kentei_${q.question}`, region: '世界遺産検定', categoryJa: `${config.name} 公式クイズ` },
          title: `🎓 世界遺産検定 ${config.name}`,
          question: q.question,
          options: [...q.options],
          correctIndex: q.correctIndex,
          explanation: q.explanation
        });
      }
    }

    // 2. Add UNESCO basic questions for lower/mid grades (Randomly sample 2-3 items)
    if (grade === '4' || grade === '3' || grade === '2') {
      const basicShuffled = [...BASIC_KNOWLEDGE_QUESTIONS].sort(() => 0.5 - Math.random());
      for (const q of basicShuffled.slice(0, 3)) {
        pool.push({
          type: 'basic',
          site: { id: `basic_${q.question}`, region: 'UNESCO基礎知識', categoryJa: '制度・概念' },
          title: `🎓 世界遺産検定 ${config.name}（基礎知識）`,
          question: q.question,
          options: [...q.options],
          correctIndex: q.correctIndex,
          explanation: q.explanation
        });
      }
    }

    // 3. Filter site dataset depending on grade
    let filteredSites = [...SITES_DATA];
    if (grade === '4') {
      // Japan sites + top famous sites
      filteredSites = SITES_DATA.filter(s => s.country === '日本' || s.yearInscribed <= 1985);
    } else if (grade === '3') {
      filteredSites = SITES_DATA.filter(s => s.country === '日本' || s.yearInscribed <= 1998);
    } else if (grade === '2') {
      filteredSites = SITES_DATA.filter(s => s.country === '日本' || s.yearInscribed <= 2010);
    } // pre1 and 1 include all sites

    // Generate site-based questions
    const shuffled = [...filteredSites].sort(() => 0.5 - Math.random());
    const allCountries = Array.from(new Set(SITES_DATA.map(s => s.country))).filter(c => c && c !== '不明');

    for (const site of shuffled.slice(0, count * 2)) {
      const r = Math.random();
      if (r < 0.4) {
        const otherCountries = allCountries.filter(c => c !== site.country).sort(() => 0.5 - Math.random()).slice(0, 3);
        const options = [site.country, ...otherCountries].sort(() => 0.5 - Math.random());
        pool.push({
          type: 'country',
          site: site,
          title: `🎓 世界遺産検定 ${config.name}（所在地問題）`,
          question: `【検定出題】世界遺産「${site.name}」が位置する国はどこでしょう？`,
          options: options,
          correctIndex: options.indexOf(site.country),
          explanation: `正解は「${site.country}」です！${site.name}（${site.categoryJa}）は${site.region}に所在します。`
        });
      } else if (r < 0.7) {
        const otherSites = SITES_DATA.filter(s => s.id !== site.id).sort(() => 0.5 - Math.random()).slice(0, 3);
        const options = [site.name, ...otherSites.map(s => s.name)].sort(() => 0.5 - Math.random());
        pool.push({
          type: 'description',
          site: site,
          title: `🎓 世界遺産検定 ${config.name}（遺産同定問題）`,
          question: `【検定出題】${site.country}にある${site.categoryJa}で、「${site.description}」という記述が該当する世界遺産は？`,
          options: options,
          correctIndex: options.indexOf(site.name),
          explanation: `正解は「${site.name}」です！`
        });
      } else {
        const baseYear = site.yearInscribed;
        const dummyYears = new Set();
        while (dummyYears.size < 3) {
          const offset = (Math.floor(Math.random() * 6) + 1) * (Math.random() < 0.5 ? 1 : -1);
          const y = baseYear + offset;
          if (y !== baseYear && y >= 1978 && y <= 2026) dummyYears.add(y);
        }
        const options = [`${baseYear}年`, ...Array.from(dummyYears).map(y => `${y}年`)].sort(() => 0.5 - Math.random());
        pool.push({
          type: 'year',
          site: site,
          title: `🎓 世界遺産検定 ${config.name}（登録年問題）`,
          question: `【検定出題】世界遺産「${site.name}」（${site.country}）がUNESCO世界遺産に登録された年は？`,
          options: options,
          correctIndex: options.indexOf(`${baseYear}年`),
          explanation: `正解は「${baseYear}年」です！`
        });
      }
    }

    // Deduplicate and select final questions
    const finalQuestions = [];
    const usedTexts = new Set();
    const usedSiteIds = new Set();

    const shuffledPool = pool.sort(() => 0.5 - Math.random());

    for (const q of shuffledPool) {
      if (finalQuestions.length >= count) break;

      const qText = q.question.trim();
      const siteId = q.site && q.site.id ? q.site.id : null;

      // Skip exact question duplicate
      if (usedTexts.has(qText)) continue;

      // Skip site duplicate if we haven't reached fallback limit
      if (siteId && usedSiteIds.has(siteId)) continue;

      usedTexts.add(qText);
      if (siteId) usedSiteIds.add(siteId);

      finalQuestions.push(q);
    }

    // Fallback if not enough questions collected
    if (finalQuestions.length < count) {
      for (const q of shuffledPool) {
        if (finalQuestions.length >= count) break;
        const qText = q.question.trim();
        if (!usedTexts.has(qText)) {
          usedTexts.add(qText);
          finalQuestions.push(q);
        }
      }
    }

    return finalQuestions;
  }

  isKenteiPassed() {
    if (this.mode !== 'kentei' || !this.grade || !KENTEI_GRADES[this.grade]) return false;
    const config = KENTEI_GRADES[this.grade];
    const total = this.questions.length;
    if (total === 0) return false;
    const accuracy = (this.correctCount / total) * 100;
    return accuracy >= config.passScorePercent;
  }
}

