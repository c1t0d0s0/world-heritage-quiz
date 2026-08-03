import ALL_SITES from './world_heritage_sites.json';

// World Heritage Basic Knowledge & Fundamentals Questions
export const BASIC_KNOWLEDGE_QUESTIONS = [
  {
    question: '「世界遺産条約」がユネスコ（UNESCO）総会で採択されたのは西暦何年でしょう？',
    options: ['1972年', '1945年', '1985年', '2000年'],
    correctIndex: 0,
    explanation: '1972年のユネスコ総会で「世界の文化遺産及び自然遺産の保護に関する条約（世界遺産条約）」が採択されました。'
  },
  {
    question: 'UNESCOが定める世界遺産の3つの分類に含まれないものはどれでしょう？',
    options: ['産業遺産', '文化遺産', '自然遺産', '複合遺産'],
    correctIndex: 0,
    explanation: '世界遺産は「文化遺産」「自然遺産」「複合遺産」の3種類に分類されます。'
  },
  {
    question: '1993年に日本で初めて世界遺産（文化遺産）に登録されたもののうち、正しい組み合わせはどれでしょう？',
    options: ['法隆寺地域の仏教建造物と姫路城', '富士山と原爆ドーム', '古都京都の文化財と厳島神社', '日光の社寺と琉球王国のグスク'],
    correctIndex: 0,
    explanation: '1993年、日本初の文化遺産として「法隆寺地域の仏教建造物」「姫路城」の2件（自然遺産として屋久島・白神山地）が登録されました。'
  },
  {
    question: '1993年に日本で初めて「自然遺産」として登録された2つの地域はどこでしょう？',
    options: ['屋久島と白神山地', '知床と小笠原諸島', '富士山と奄美大島', '阿蘇山と知床'],
    correctIndex: 0,
    explanation: '1993年に「屋久島（鹿児島県）」と「白神山地（青森県・秋田県）」が日本初の自然遺産として同時に登録されました。'
  },
  {
    question: '武力紛争や自然災害、開発などで存続が危ぶまれている世界遺産が指定されるリストの名称は？',
    options: ['危機にさらされている世界遺産リスト（危機遺産）', '赤データ世界遺産', '限定保護リスト', '緊急保全対象遺産'],
    correctIndex: 0,
    explanation: '顕著な不可換の価値が重大な危険にさらされている場合、「危機遺産リスト」に記載され優先的な国際支援が行われます。'
  },
  {
    question: 'UNESCO（国連教育科学文化機関）の本部事務局が置かれている都市はどこでしょう？',
    options: ['パリ（フランス）', 'ジュネーブ（スイス）', 'ニューヨーク（アメリカ）', 'ローマ（イタリア）'],
    correctIndex: 0,
    explanation: 'ユネスコの本部はフランスの首都パリに置かれています。'
  },
  {
    question: '文化遺産の登録審査やモニタリングを行う、ユネスコの専門諮問機関（NGO）はどれでしょう？',
    options: ['ICOMOS（イコモス / 国際記念物遺跡会議）', 'IUCN（国際自然保護連合）', 'UNICEF（ユニセフ）', 'WHO（世界保健機関）'],
    correctIndex: 0,
    explanation: '文化遺産についてはICOMOS（イコモス）、自然遺産についてはIUCN（国際自然保護連合）が専門評価を担当します。'
  },
  {
    question: '自然遺産の価値や保全状態の専門評価を担当する、ユネスコの諮問機関はどれでしょう？',
    options: ['IUCN（国際自然保護連合）', 'ICOMOS（国際記念物遺跡会議）', 'ICCROM（文化財保存修復研究国際センター）', 'WWF（世界自然保護基金）'],
    correctIndex: 0,
    explanation: 'IUCN（International Union for Conservation of Nature）が自然遺産の事前審査や保全状況報告を担当しています。'
  },
  {
    question: '日本に存在する世界遺産のうち、「複合遺産」に分類されているものはいくつあるでしょう？',
    options: ['0件（該当なし）', '1件', '2件', '5件'],
    correctIndex: 0,
    explanation: '2026年現在、日本が保有する世界遺産は文化遺産と自然遺産であり、文化と自然の双方を満たす「複合遺産」はまだ登録されていません。'
  },
  {
    question: '1978年に世界で初めて世界遺産リストに登録された12件のうち、アメリカの代表的な自然遺産は？',
    options: ['イエローストーン国立公園', 'グランドキャニオン国立公園', 'ヨセミテ国立公園', '自由の女神像'],
    correctIndex: 0,
    explanation: '1978年の第1回世界遺産委員会で、イエローストーン国立公園（アメリカ）やガラパゴス諸島（エクアドル）など12件が初登録されました。'
  },
  {
    question: '世界遺産委員会が世界遺産の新規登録や保全状態の審査のために開催される頻度は通常どれくらいでしょう？',
    options: ['年に1回', '年に2回', '2年に1回', '5年に1回'],
    correctIndex: 0,
    explanation: '世界遺産委員会（World Heritage Committee）は毎年1回開催され、各国からの推薦遺産の審査や危機遺産リストの更新を行います。'
  },
  {
    question: '文化遺産の登録基準（ⅰ〜ⅵ）や自然遺産の登録基準（ⅶ〜ⅹ）の根底にある、世界遺産として必須の概念は何でしょう？',
    options: ['顕著な普遍的価値（OUV: Outstanding Universal Value）', '歴史的最古の証明', '国家の代表的シンボル', '観客動員実績'],
    correctIndex: 0,
    explanation: '世界遺産に登録されるためには、人類全体にとって稀有で卓越した価値を持つ「顕著な普遍的価値（OUV）」の証明が必須となります。'
  }
];

// Special rich hand-crafted quizzes for featured / famous sites
export const HANDCRAFTED_QUESTIONS = {
  'machu_picchu': [
    {
      question: 'マチュ・ピチュは標高およそ何メートルに位置していますか？',
      options: ['約2,430m', '約1,200m', '約3,800m', '約4,500m'],
      correctIndex: 0,
      explanation: 'マチュ・ピチュはアンデス山脈の高山地帯、標高約2,430mの絶壁の上に建てられています。'
    },
    {
      question: 'マチュ・ピチュを建設したとされる文明はどれですか？',
      options: ['インカ帝国', 'マヤ文明', 'アステカ文明', 'オルメカ文明'],
      correctIndex: 0,
      explanation: '15世紀半ば、インカ帝国の皇帝パチャクティの時代に建設されたと考えられています。'
    }
  ],
  'taj_mahal': [
    {
      question: 'タージ・マハルは何のために建設された建造物でしょうか？',
      options: ['王妃の墓廟（お墓）', '仏教の寺院', '皇帝の要塞', '天体観測所'],
      correctIndex: 0,
      explanation: 'シャー・ジャハーン皇帝が亡き最愛の妃ムムターズ・マハルの冥福を祈るために建設しました。'
    },
    {
      question: 'タージ・マハルの主材料として使われている建材は何ですか？',
      options: ['白大理石', '赤砂岩', '花崗岩', 'レンガ'],
      correctIndex: 0,
      explanation: 'インド各地やアジア全域から集められた高品質な純白の大理石が使われています。'
    }
  ],
  'colosseum': [
    {
      question: '古代ローマのコロッセオの主な用途は何でしたか？',
      options: ['円形闘技場', '皇帝の宮殿', '元老院の議事堂', '中央市場'],
      correctIndex: 0,
      explanation: '剣闘士（グラディエーター）の戦いや猛獣狩りなどの娯楽イベントが開催された大闘技場です。'
    },
    {
      question: 'コロッセオは約何人の観客を収容できたとされていますか？',
      options: ['約5万人', '約1万人', '約15万人', '約20万人'],
      correctIndex: 0,
      explanation: '最大で約5万人〜8万人の観客を収容できたと推計されています。'
    }
  ]
};

// Export full 1273 dataset
export const SITES_DATA = ALL_SITES;

// Achievements system
export const ACHIEVEMENTS = [
  { id: 'first_quiz', name: '世界遺産への第一歩', desc: '初めてクイズを完了する', icon: '🌍' },
  { id: 'perfect_score', name: '遺産マスター', desc: '満点でクイズをクリアする', icon: '🏆' },
  { id: 'speedrunner', name: 'スピード探検家', desc: 'スピードランモードをクリアする', icon: '⚡' },
  { id: 'streak_5', name: '連勝の波', desc: '5問連続正解を達成する', icon: '🔥' },
  { id: 'explorer_10', name: '熱心な図鑑愛好家', desc: '図鑑で10個以上の遺産の詳細を閲覧する', icon: '📚' }
];
