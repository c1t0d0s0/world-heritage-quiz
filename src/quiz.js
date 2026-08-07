import { SITES_DATA, HANDCRAFTED_QUESTIONS, BASIC_KNOWLEDGE_QUESTIONS } from './data/sites.js';
import { KENTEI_GRADES, KENTEI_SPECIFIC_QUESTIONS } from './data/kentei.js';

/**
 * 国名および別称・英語表記の包括的マッピング
 */
export const COUNTRY_ALIASES = {
  // アジア
  '中華人民共和国': ['中華人民共和国', '中国', 'China', 'PRC', 'チャイナ'],
  '中国': ['中華人民共和国', '中国', 'China', 'PRC', 'チャイナ'],
  'China': ['中華人民共和国', '中国', 'China', 'PRC', 'チャイナ'],

  '日本': ['日本国', '日本', 'Japan', 'ジャパン'],
  '日本国': ['日本国', '日本', 'Japan', 'ジャパン'],
  'Japan': ['日本国', '日本', 'Japan', 'ジャパン'],

  '大韓民国': ['大韓民国', '韓国', 'Korea', 'South Korea', 'ROK'],
  '韓国': ['大韓民国', '韓国', 'Korea', 'South Korea', 'ROK'],
  'Korea': ['大韓民国', '韓国', 'Korea', 'South Korea', 'ROK'],

  'インド': ['インド共和国', 'インド', 'India'],
  'India': ['インド共和国', 'インド', 'India'],

  'フィリピン': ['フィリピン共和国', 'フィリピン', 'Philippines'],
  'Philippines': ['フィリピン共和国', 'フィリピン', 'Philippines'],

  'ベトナム': ['ベトナム社会主義共和国', 'ベトナム', 'Viet Nam', 'Vietnam'],
  'Vietnam': ['ベトナム社会主義共和国', 'ベトナム', 'Viet Nam', 'Vietnam'],

  'タイ': ['タイ王国', 'タイ', 'Thailand'],
  'Thailand': ['タイ王国', 'タイ', 'Thailand'],

  'インドネシア': ['インドネシア共和国', 'インドネシア', 'Indonesia'],
  'Indonesia': ['インドネシア共和国', 'インドネシア', 'Indonesia'],

  'スリランカ': ['スリランカ民主社会主義共和国', 'スリランカ', 'Sri Lanka'],
  'Sri Lanka': ['スリランカ民主社会主義共和国', 'スリランカ', 'Sri Lanka'],

  // 北米・南米
  'アメリカ合衆国': ['アメリカ合衆国', 'アメリカ', '米国', 'USA', 'United States of America', 'United States', 'America'],
  'アメリカ': ['アメリカ合衆国', 'アメリカ', '米国', 'USA', 'United States of America', 'United States', 'America'],
  '米国': ['アメリカ合衆国', 'アメリカ', '米国', 'USA', 'United States of America', 'United States', 'America'],
  'United States': ['アメリカ合衆国', 'アメリカ', '米国', 'USA', 'United States of America', 'United States', 'America'],

  'カナダ': ['カナダ', 'カナディアン', 'Canada'],
  'Canada': ['カナダ', 'カナディアン', 'Canada'],

  'メキシコ': ['メキシコ合衆国', 'メキシコ', 'Mexico'],
  'Mexico': ['メキシコ合衆国', 'メキシコ', 'Mexico'],

  'ブラジル': ['ブラジル連邦共和国', 'ブラジル', 'Brazil'],
  'Brazil': ['ブラジル連邦共和国', 'ブラジル', 'Brazil'],

  'ペルー': ['ペルー共和国', 'ペルー', 'Peru'],
  'Peru': ['ペルー共和国', 'ペルー', 'Peru'],

  // ヨーロッパ
  'イギリス': ['イギリス', '英国', 'ユナイテッド・キングダム', 'UK', 'United Kingdom', 'Great Britain', 'England', 'Scotland', 'Wales'],
  '英国': ['イギリス', '英国', 'ユナイテッド・キングダム', 'UK', 'United Kingdom', 'Great Britain', 'England', 'Scotland', 'Wales'],
  'United Kingdom': ['イギリス', '英国', 'ユナイテッド・キングダム', 'UK', 'United Kingdom', 'Great Britain', 'England', 'Scotland', 'Wales'],

  'フランス': ['フランス共和国', 'フランス', 'France', '仏国', 'French'],
  'フランス共和国': ['フランス共和国', 'フランス', 'France', '仏国', 'French'],
  'France': ['フランス共和国', 'フランス', 'France', '仏国', 'French'],

  'ドイツ': ['ドイツ連邦共和国', 'ドイツ', 'Germany', '独国', 'German'],
  'ドイツ連邦共和国': ['ドイツ連邦共和国', 'ドイツ', 'Germany', '独国', 'German'],
  'Germany': ['ドイツ連邦共和国', 'ドイツ', 'Germany', '独国', 'German'],

  'イタリア': ['イタリア共和国', 'イタリア', 'Italy', '伊国', 'Italian'],
  'イタリア共和国': ['イタリア共和国', 'イタリア', 'Italy', '伊国', 'Italian'],
  'Italy': ['イタリア共和国', 'イタリア', 'Italy', '伊国', 'Italian'],

  'スペイン': ['スペイン王国', 'スペイン', 'Spain', 'Spanish'],
  'スペイン王国': ['スペイン王国', 'スペイン', 'Spain', 'Spanish'],
  'Spain': ['スペイン王国', 'スペイン', 'Spain', 'Spanish'],

  'ロシア': ['ロシア連邦', 'ロシア', 'Russia', 'Russian'],
  'ロシア連邦': ['ロシア連邦', 'ロシア', 'Russia', 'Russian'],
  'Russia': ['ロシア連邦', 'ロシア', 'Russia', 'Russian'],

  'スイス': ['スイス連邦', 'スイス', 'Switzerland', 'Swiss'],
  'Switzerland': ['スイス連邦', 'スイス', 'Switzerland', 'Swiss'],

  'ギリシャ': ['ギリシャ共和国', 'ギリシャ', 'Greece', 'Greek'],
  'Greece': ['ギリシャ共和国', 'ギリシャ', 'Greece', 'Greek'],

  'トルコ': ['トルコ共和国', 'トルコ', 'Turkey', 'Türkiye', 'Turkish'],
  'Turkey': ['トルコ共和国', 'トルコ', 'Turkey', 'Türkiye', 'Turkish'],

  'オーストリア': ['オーストリア共和国', 'オーストリア', 'Austria', 'Austrian'],
  'Austria': ['オーストリア共和国', 'オーストリア', 'Austria', 'Austrian'],

  'オランダ': ['オランダ王国', 'オランダ', 'Netherlands', 'Dutch'],
  'Netherlands': ['オランダ王国', 'オランダ', 'Netherlands', 'Dutch'],

  'ベルギー': ['ベルギー王国', 'ベルギー', 'Belgium', 'Belgian'],
  'Belgium': ['ベルギー王国', 'ベルギー', 'Belgium', 'Belgian'],

  'ポルトガル': ['ポルトガル共和国', 'ポルトガル', 'Portugal', 'Portuguese'],
  'Portugal': ['ポルトガル共和国', 'ポルトガル', 'Portugal', 'Portuguese'],

  'スウェーデン': ['スウェーデン王国', 'スウェーデン', 'Sweden', 'Swedish'],
  'Sweden': ['スウェーデン王国', 'スウェーデン', 'Sweden', 'Swedish'],

  'ノルウェー': ['ノルウェー王国', 'ノルウェー', 'Norway', 'Norwegian'],
  'Norway': ['ノルウェー王国', 'ノルウェー', 'Norway', 'Norwegian'],

  'ポーランド': ['ポーランド共和国', 'ポーランド', 'Poland', 'Polish'],
  'Poland': ['ポーランド共和国', 'ポーランド', 'Poland', 'Polish'],

  // オセアニア
  'オーストラリア': ['オーストラリア連邦', 'オーストラリア', 'Australia', 'Australian'],
  'Australia': ['オーストラリア連邦', 'オーストラリア', 'Australia', 'Australian'],

  'ニュージーランド': ['ニュージーランド', 'New Zealand'],
  'New Zealand': ['ニュージーランド', 'New Zealand'],

  // 中東・アフリカ
  'エジプト': ['エジプト・アラブ共和国', 'エジプト', 'Egypt', 'Egyptian'],
  'Egypt': ['エジプト・アラブ共和国', 'エジプト', 'Egypt', 'Egyptian'],

  'イラン': ['イラン・イスラム共和国', 'イラン', 'Iran', 'Persian'],
  'Iran': ['イラン・イスラム共和国', 'イラン', 'Iran', 'Persian'],

  'ケニア': ['ケニア共和国', 'ケニア', 'Kenya'],
  'Kenya': ['ケニア共和国', 'ケニア', 'Kenya'],

  '南アフリカ': ['南アフリカ共和国', '南アフリカ', 'South Africa'],
  'South Africa': ['南アフリカ共和国', '南アフリカ', 'South Africa'],
};

/**
 * 所在地クイズ用の遺産名・選択肢サニタイズ（正解となる国名・別称・英語表記を伏字「〇〇」に置換）
 */
export function sanitizeSiteNameForCountryQuestion(siteName, country) {
  if (!siteName || !country || country === '不明') return siteName;

  let sanitized = siteName;
  const countryList = country.split(/[/,、・\s]+/).map(c => c.trim()).filter(Boolean);

  const targetsToMask = new Set();
  for (const c of countryList) {
    targetsToMask.add(c);
    if (COUNTRY_ALIASES[c]) {
      COUNTRY_ALIASES[c].forEach(a => targetsToMask.add(a));
    }
  }

  const sortedTargets = Array.from(targetsToMask)
    .filter(t => t && t.length >= 2)
    .sort((a, b) => b.length - a.length);

  for (const target of sortedTargets) {
    if (!target) continue;
    const escaped = target.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const isAscii = /^[A-Za-z0-9\s]+$/.test(target);
    const pattern = isAscii ? `\\b${escaped}\\b` : escaped;
    const reg = new RegExp(pattern, 'gi');
    if (reg.test(sanitized)) {
      sanitized = sanitized.replace(reg, '〇〇');
    }
  }

  return sanitized;
}

/**
 * 遺産当てクイズ用の説明文サニタイズ（遺産名を「この遺産」等に置換）
 */
export function sanitizeDescriptionForQuiz(description, siteName) {
  if (!description || !siteName) return description;
  let sanitized = description;
  if (sanitized.includes(siteName)) {
    sanitized = sanitized.replaceAll(siteName, 'この遺産');
  }
  return sanitized;
}

/**
 * 選択肢の並び順をランダムにシャッフルし、正解インデックスを新位置に追従させる
 */
export function shuffleOptions(options, correctIndex) {
  if (!options || options.length <= 1) return { options: [...options], correctIndex };

  const paired = options.map((opt, idx) => ({
    option: opt,
    isCorrect: idx === correctIndex
  }));

  for (let i = paired.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [paired[i], paired[j]] = [paired[j], paired[i]];
  }

  return {
    options: paired.map(p => p.option),
    correctIndex: paired.findIndex(p => p.isCorrect)
  };
}

/**
 * 伏字化（〇〇）した結果、固有名詞が失われて不成立（「〇〇国立公園」「〇〇島」など答えようがない）となるか判定する
 */
export function isMaskedSiteNameUnsolvable(maskedName) {
  if (!maskedName) return true;
  const cleaned = maskedName.trim();

  // 完全空または〇〇のみ
  if (/^〇*$/.test(cleaned)) return true;

  // 〇〇を除去した残りの文字列
  const remaining = cleaned.replace(/〇/g, '').replace(/^[・\s\-_()（）:：,、.]+|[・\s\-_()（）:：,、.]+$ /g, '').trim();

  // 一般名詞・カテゴリ単語のみで固有の名称が残らないパターン
  const genericOnlyRegex = /^(の)?(国立公園|山国立公園|湖国立公園|自然保護区|自然公園|山|湖|島|要塞|植物園|遺跡|歴史地区|旧市街|歴史的建造物群|の歴史地区|の旧市街|の歴史的建造物群|都市|港町)$/;

  if (genericOnlyRegex.test(remaining)) return true;

  // 固有名詞が極端に短く識別不能な場合
  if (remaining.length < 2) return true;

  return false;
}

/**
 * 説明文がプレースホルダー（「〜にあるUNESCO世界遺産。」など内容が薄い定型文）か判定する
 */
export function isGenericDescription(description) {
  if (!description) return true;
  const trimmed = description.trim();
  if (trimmed.length < 15) return true;
  if (trimmed.includes('にあるUNESCO世界遺産') || trimmed.includes('にあるユネスコ世界遺産')) return true;
  return false;
}

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
      const basicPool = BASIC_KNOWLEDGE_QUESTIONS.map(q => {
        const { options, correctIndex } = shuffleOptions(q.options, q.correctIndex);
        return {
          type: 'basic',
          site: { region: 'UNESCO基礎知識', categoryJa: '制度・基本概念' },
          title: '📘 基礎知識・制度クイズ',
          question: q.question,
          options,
          correctIndex,
          explanation: q.explanation
        };
      });
      return basicPool.sort(() => 0.5 - Math.random()).slice(0, count);
    }

    const questionsPool = [];

    // Add basic knowledge questions to 'all' mode pool as well
    if (mode === 'all') {
      for (const q of BASIC_KNOWLEDGE_QUESTIONS) {
        const { options, correctIndex } = shuffleOptions(q.options, q.correctIndex);
        questionsPool.push({
          type: 'basic',
          site: { region: 'UNESCO基礎知識', categoryJa: '制度・基本概念' },
          title: '📘 基礎知識・制度クイズ',
          question: q.question,
          options,
          correctIndex,
          explanation: q.explanation
        });
      }
    }

    const shuffledSites = [...SITES_DATA].sort(() => 0.5 - Math.random());
    const allCountries = Array.from(new Set(SITES_DATA.map(s => s.country))).filter(c => c && c !== '不明');

    for (const site of shuffledSites) {
      // 1. Country match question
      if (mode === 'country' || mode === 'all') {
        const maskedName = sanitizeSiteNameForCountryQuestion(site.name, site.country);
        if (!isMaskedSiteNameUnsolvable(maskedName)) {
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
            question: `世界遺産「${maskedName}」が位置する国はどこでしょう？`,
            options: options,
            correctIndex: correctIndex,
            explanation: `正解は「${site.country}」です！${site.name}（${site.categoryJa}）は${site.region}の${site.country}に位置します。`
          });
        }
      }

      // 2. Name identification question from Description & Region
      if (mode === 'description' || mode === 'all') {
        if (!isGenericDescription(site.description)) {
          const otherSites = SITES_DATA.filter(s => s.id !== site.id)
            .sort(() => 0.5 - Math.random())
            .slice(0, 3);
          const rawOptions = [site.name, ...otherSites.map(s => s.name)].sort(() => 0.5 - Math.random());
          const correctIndex = rawOptions.indexOf(site.name);
          const options = rawOptions.map(optName => sanitizeSiteNameForCountryQuestion(optName, site.country));
          const maskedDesc = sanitizeDescriptionForQuiz(site.description, site.name);

          questionsPool.push({
            type: 'description',
            site: site,
            title: '🏛 遺産当てクイズ',
            question: `【${site.country}】にある${site.categoryJa}（${site.yearInscribed}年登録）で、「${maskedDesc}」という特徴を持つ世界遺産はどれでしょう？`,
            options: options,
            correctIndex: correctIndex,
            explanation: `正解は「${site.name}」です！${site.country}の${site.categoryJa}として登録されています。`
          });
        }
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
          const { options, correctIndex } = shuffleOptions(q.options, q.correctIndex);
          questionsPool.push({
            type: 'trivia',
            site: site,
            title: '📜 トリビア・歴史クイズ',
            question: q.question,
            options,
            correctIndex,
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
        const { options, correctIndex } = shuffleOptions(q.options, q.correctIndex);
        pool.push({
          type: 'kentei',
          site: { id: `kentei_${q.question}`, region: '世界遺産検定', categoryJa: `${config.name} 公式クイズ` },
          title: `🎓 世界遺産検定 ${config.name}`,
          question: q.question,
          options,
          correctIndex,
          explanation: q.explanation
        });
      }
    }

    // 2. Add UNESCO basic questions for lower/mid grades (Randomly sample 2-3 items)
    if (grade === '4' || grade === '3' || grade === '2') {
      const basicShuffled = [...BASIC_KNOWLEDGE_QUESTIONS].sort(() => 0.5 - Math.random());
      for (const q of basicShuffled.slice(0, 3)) {
        const { options, correctIndex } = shuffleOptions(q.options, q.correctIndex);
        pool.push({
          type: 'basic',
          site: { id: `basic_${q.question}`, region: 'UNESCO基礎知識', categoryJa: '制度・概念' },
          title: `🎓 世界遺産検定 ${config.name}（基礎知識）`,
          question: q.question,
          options,
          correctIndex,
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
        const maskedName = sanitizeSiteNameForCountryQuestion(site.name, site.country);
        if (!isMaskedSiteNameUnsolvable(maskedName)) {
          const otherCountries = allCountries.filter(c => c !== site.country).sort(() => 0.5 - Math.random()).slice(0, 3);
          const options = [site.country, ...otherCountries].sort(() => 0.5 - Math.random());
          pool.push({
            type: 'country',
            site: site,
            title: `🎓 世界遺産検定 ${config.name}（所在地問題）`,
            question: `【検定出題】世界遺産「${maskedName}」が位置する国はどこでしょう？`,
            options: options,
            correctIndex: options.indexOf(site.country),
            explanation: `正解は「${site.country}」です！${site.name}（${site.categoryJa}）は${site.region}に所在します。`
          });
        }
      } else if (r < 0.7) {
        if (!isGenericDescription(site.description)) {
          const otherSites = SITES_DATA.filter(s => s.id !== site.id).sort(() => 0.5 - Math.random()).slice(0, 3);
          const rawOptions = [site.name, ...otherSites.map(s => s.name)].sort(() => 0.5 - Math.random());
          const correctIndex = rawOptions.indexOf(site.name);
          const options = rawOptions.map(optName => sanitizeSiteNameForCountryQuestion(optName, site.country));
          const maskedDesc = sanitizeDescriptionForQuiz(site.description, site.name);
          pool.push({
            type: 'description',
            site: site,
            title: `🎓 世界遺産検定 ${config.name}（遺産同定問題）`,
            question: `【検定出題】${site.country}にある${site.categoryJa}で、「${maskedDesc}」という記述が該当する世界遺産は？`,
            options: options,
            correctIndex: correctIndex,
            explanation: `正解は「${site.name}」です！`
          });
        }
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

