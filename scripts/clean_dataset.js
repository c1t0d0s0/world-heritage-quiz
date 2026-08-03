import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rawDataPath = path.join(__dirname, '../src/data/world_heritage_sites.json');
const rawData = JSON.parse(fs.readFileSync(rawDataPath, 'utf-8'));

console.log(`Initial total loaded: ${rawData.length}`);

// Complete List of Japan's 26 World Heritage Sites for Priority & Accuracy
const JAPAN_SITES_EXACT = [
  { name: '屋久島', nameEn: 'Yakushima', country: '日本', countryEn: 'Japan', region: 'アジア', category: 'natural', categoryJa: '自然遺産', yearInscribed: 1993, description: '鹿児島県屋久島にある樹齢数千年の屋久杉と特有の生態系を誇る日本初の自然遺産。' },
  { name: '白神山地', nameEn: 'Shirakami-Sanchi', country: '日本', countryEn: 'Japan', region: 'アジア', category: 'natural', categoryJa: '自然遺産', yearInscribed: 1993, description: '青森県と秋田県にまたがる東アジア最大級の原生的なブナ林が広がる自然遺産。' },
  { name: '知床', nameEn: 'Shiretoko', country: '日本', countryEn: 'Japan', region: 'アジア', category: 'natural', categoryJa: '自然遺産', yearInscribed: 2005, description: '北海道知床半島に位置し、流氷が育む豊かな海洋・陸上生態系を擁する自然遺産。' },
  { name: '小笠原諸島', nameEn: 'Ogasawara Islands', country: '日本', countryEn: 'Japan', region: 'アジア', category: 'natural', categoryJa: '自然遺産', yearInscribed: 2011, description: '独自の進化を遂げた多くの固有種が生息し「東洋のガラパゴス」とも称される自然遺産。' },
  { name: '奄美大島、徳之島、沖縄島北部及び西表島', nameEn: 'Amami-Oshima Island, Tokunoshima Island, Northern part of Okinawa Island, and Iriomote Island', country: '日本', countryEn: 'Japan', region: 'アジア', category: 'natural', categoryJa: '自然遺産', yearInscribed: 2021, description: 'アマミノクロウサギなど多くの固有種や絶滅危惧種が棲息する豊かな亜熱帯の自然遺産。' },

  { name: '法隆寺地域の仏教建造物', nameEn: 'Buddhist Monuments in the Horyu-ji Area', country: '日本', countryEn: 'Japan', region: 'アジア', category: 'cultural', categoryJa: '文化遺産', yearInscribed: 1993, description: '世界最古の木造建築群である法隆寺などを含む日本初の文化遺産。' },
  { name: '姫路城', nameEn: 'Himeji-jo', country: '日本', countryEn: 'Japan', region: 'アジア', category: 'cultural', categoryJa: '文化遺産', yearInscribed: 1993, description: '白鷺城とも呼ばれる美しさと高度な防衛機能を兼ね備えた日本屈指の木造城郭。' },
  { name: '古都京都の文化財', nameEn: 'Historic Monuments of Ancient Kyoto', country: '日本', countryEn: 'Japan', region: 'アジア', category: 'cultural', categoryJa: '文化遺産', yearInscribed: 1994, description: '清水寺や金閣寺など京都・宇治・大津に点在する17の寺社・城郭群。' },
  { name: '白川郷・五箇山の合掌造り集落', nameEn: 'Historic Villages of Shirakawa-go and Gokayama', country: '日本', countryEn: 'Japan', region: 'アジア', category: 'cultural', categoryJa: '文化遺産', yearInscribed: 1995, description: '急勾配のカヤブキ屋根が特徴的な日本の伝統的山村集落。' },
  { name: '原爆ドーム', nameEn: 'Hiroshima Peace Memorial (Genbaku Dome)', country: '日本', countryEn: 'Japan', region: 'アジア', category: 'cultural', categoryJa: '文化遺産', yearInscribed: 1996, description: '核兵器の惨禍を伝え、恒久平和を訴え続ける世界恒久平和の象徴。' },
  { name: '厳島神社', nameEn: 'Itsukushima Shinto Shrine', country: '日本', countryEn: 'Japan', region: 'アジア', category: 'cultural', categoryJa: '文化遺産', yearInscribed: 1996, description: '海上に浮かぶ美しい大鳥居と社殿構造で知られる安芸の宮島の神社。' },
  { name: '古都奈良の文化財', nameEn: 'Historic Monuments of Ancient Nara', country: '日本', countryEn: 'Japan', region: 'アジア', category: 'cultural', categoryJa: '文化遺産', yearInscribed: 1998, description: '東大寺の大仏や春日大社など、8世紀平城京の歴史を伝える文化財群。' },
  { name: '日光の社寺', nameEn: 'Shrines and Temples of Nikko', country: '日本', countryEn: 'Japan', region: 'アジア', category: 'cultural', categoryJa: '文化遺産', yearInscribed: 1999, description: '徳川家康を祀る日光東照宮をはじめとする豪華絢爛な神社・寺院群。' },
  { name: '琉球王国のグスク及び関連遺産群', nameEn: 'Gusuku Sites and Related Properties of the Kingdom of Ryukyu', country: '日本', countryEn: 'Japan', region: 'アジア', category: 'cultural', categoryJa: '文化遺産', yearInscribed: 2000, description: '首里城跡など、独自のアジア交易文化を育んだ琉球王国の城郭遺跡群。' },
  { name: '紀伊山地の霊場と参詣道', nameEn: 'Sacred Sites and Pilgrimage Routes in the Kii Mountain Range', country: '日本', countryEn: 'Japan', region: 'アジア', category: 'cultural', categoryJa: '文化遺産', yearInscribed: 2004, description: '高野山・熊野三山・吉野大峰の霊場とそれらを結ぶ修験・信仰の参詣道。' },
  { name: '石見銀山遺跡とその文化的景観', nameEn: 'Iwami Ginzan Silver Mine and its Cultural Landscape', country: '日本', countryEn: 'Japan', region: 'アジア', category: 'cultural', categoryJa: '文化遺産', yearInscribed: 2007, description: 'かつて世界の銀の産出を支え環境に配慮した銀鉱山遺跡とその景観。' },
  { name: '平泉―仏国土（浄土）を表す建築・庭園及び考古学的遺跡群―', nameEn: 'Hiraizumi – Temples, Gardens and Archaeological Sites Representing the Buddhist Pure Land', country: '日本', countryEn: 'Japan', region: 'アジア', category: 'cultural', categoryJa: '文化遺産', yearInscribed: 2011, description: '中尊寺金色堂など奥州藤原氏が理想とした浄土思想を表わす遺跡群。' },
  { name: '富士山―信仰の対象と芸術の源泉', nameEn: 'Fujisan, sacred place and source of artistic inspiration', country: '日本', countryEn: 'Japan', region: 'アジア', category: 'cultural', categoryJa: '文化遺産', yearInscribed: 2013, description: '日本最高峰の美と信仰を集める文化的景観・芸術の源泉。' },
  { name: '富岡製糸場と絹産業遺産群', nameEn: 'Tomioka Silk Mill and Related Sites', country: '日本', countryEn: 'Japan', region: 'アジア', category: 'cultural', categoryJa: '文化遺産', yearInscribed: 2014, description: '日本の近代化と世界の絹産業発展に貢献した官営製糸場遺産。' },
  { name: '明治日本の産業革命遺産 製鉄・製鋼、造船、石炭産業', nameEn: 'Sites of Japan’s Meiji Industrial Revolution: Iron and Steel, Shipbuilding and Coal Mining', country: '日本', countryEn: 'Japan', region: 'アジア', category: 'cultural', categoryJa: '文化遺産', yearInscribed: 2015, description: '端島（軍艦島）など非西洋地域で初めて短期間に達成された産業遺産群。' },
  { name: '国立西洋美術館（ル・コルビュジエの建築作品）', nameEn: 'The Architectural Work of Le Corbusier', country: '日本', countryEn: 'Japan', region: 'アジア', category: 'cultural', categoryJa: '文化遺産', yearInscribed: 2016, description: '近代建築の巨匠ル・コルビュジエが設計した上野公園の美術館。' },
  { name: '「神宿る島」宗像・沖ノ島と関連遺産群', nameEn: 'Sacred Island of Okinoshima and Associated Sites in the Munakata Region', country: '日本', countryEn: 'Japan', region: 'アジア', category: 'cultural', categoryJa: '文化遺産', yearInscribed: 2017, description: '古代から継承されてきた航海安全の国家祭祀が残る神聖な島。' },
  { name: '長崎と天草地方の潜伏キリシタン関連遺産', nameEn: 'Hidden Christian Sites in the Nagasaki and Amakusa Region', country: '日本', countryEn: 'Japan', region: 'アジア', category: 'cultural', categoryJa: '文化遺産', yearInscribed: 2018, description: '禁教期に密かに信仰を守り続けた日本のキリシタン歴史を物語る遺産。' },
  { name: '百舌鳥・古市古墳群 -古代日本の墳墓群-', nameEn: 'Mozu-Furuichi Kofun Group: Mounded Tombs of Ancient Japan', country: '日本', countryEn: 'Japan', region: 'アジア', category: 'cultural', categoryJa: '文化遺産', yearInscribed: 2019, description: '仁徳天皇陵古墳など古代日本の権力を象徴する巨大前方後円墳群。' },
  { name: '北海道・北東北の縄文遺跡群', nameEn: 'Jomon Prehistoric Sites in Northern Japan', country: '日本', countryEn: 'Japan', region: 'アジア', category: 'cultural', categoryJa: '文化遺産', yearInscribed: 2021, description: '三内丸山遺跡など1万年以上続いた先史縄文文化の生活と精神世界。' },
  { name: '佐渡島の金山', nameEn: 'Sado Island Gold Mines', country: '日本', countryEn: 'Japan', region: 'アジア', category: 'cultural', categoryJa: '文化遺産', yearInscribed: 2024, description: '手作業による高度な採掘・精錬技術を誇った江戸時代の金鉱山遺跡。' }
];

// Famous Global Natural & Mixed Sites
const FAMOUS_GLOBAL_NATURAL = [
  { keywords: ['ガラパゴス'], category: 'natural', categoryJa: '自然遺産' },
  { keywords: ['イエローストーン'], category: 'natural', categoryJa: '自然遺産' },
  { keywords: ['グランド・キャニオン', 'グランドキャニオン'], category: 'natural', categoryJa: '自然遺産' },
  { keywords: ['グレート・バリア・リーフ', 'グレートバリアリーフ'], category: 'natural', categoryJa: '自然遺産' },
  { keywords: ['キリマンジャロ'], category: 'natural', categoryJa: '自然遺産' },
  { keywords: ['セレンゲティ'], category: 'natural', categoryJa: '自然遺産' },
  { keywords: ['ヨセミテ'], category: 'natural', categoryJa: '自然遺産' },
  { keywords: ['フィヨルド'], category: 'natural', categoryJa: '自然遺産' },
  { keywords: ['マチュ・ピチュ', 'マチュピチュ'], category: 'mixed', categoryJa: '複合遺産' },
  { keywords: ['複合'], category: 'mixed', categoryJa: '複合遺産' }
];

// Natural Keywords
const NATURAL_KEYWORDS = [
  '国立公園', '保護区', '自然保護区', 'サンクチュアリ', '生物圏', '山地', '山脈', '火山',
  '島', '諸島', '環礁', 'デルタ', '峡谷', '滝', '洞窟', '海', '海洋', '森林', '原生林',
  'national park', 'nature', 'natural', 'sanctuary', 'reserve', 'wilderness',
  'volcano', 'reef', 'atoll', 'canyon', 'fjord', 'forest', 'island', 'lake', 'river'
];

const siteMap = new Map();

// Insert Japan's exact 26 World Heritage sites first
JAPAN_SITES_EXACT.forEach(jSite => {
  const key = jSite.name.trim();
  siteMap.set(key, {
    unescoId: null,
    ...jSite
  });
});

for (let site of rawData) {
  if (!site.name || site.name.length < 2) continue;
  if (/^Q\d+$/.test(site.name)) continue;

  const key = site.name.trim();

  // If Japan exact site already added, update optional unescoId
  if (siteMap.has(key)) {
    const existing = siteMap.get(key);
    if (!existing.unescoId && site.unescoId) {
      existing.unescoId = site.unescoId;
    }
    continue;
  }

  // Determine category for global sites
  let cat = site.category || 'cultural';
  let catJa = site.categoryJa || '文化遺産';

  const combined = (site.name + ' ' + (site.nameEn || '') + ' ' + (site.description || '')).toLowerCase();

  for (const glob of FAMOUS_GLOBAL_NATURAL) {
    if (glob.keywords.some(k => combined.includes(k.toLowerCase()))) {
      cat = glob.category;
      catJa = glob.categoryJa;
      break;
    }
  }

  if (cat === 'cultural') {
    for (const kw of NATURAL_KEYWORDS) {
      if (combined.includes(kw.toLowerCase())) {
        cat = 'natural';
        catJa = '自然遺産';
        break;
      }
    }
  }

  site.category = cat;
  site.categoryJa = catJa;

  siteMap.set(key, site);
}

let cleanedList = Array.from(siteMap.values());

// Sort: Items with unescoId or Japan items first
cleanedList.sort((a, b) => {
  if (a.country === '日本' && b.country !== '日本') return -1;
  if (a.country !== '日本' && b.country === '日本') return 1;
  if (a.unescoId && !b.unescoId) return -1;
  if (!a.unescoId && b.unescoId) return 1;
  return a.name.localeCompare(b.name, 'ja');
});

if (cleanedList.length > 1273) {
  cleanedList = cleanedList.slice(0, 1273);
}

console.log(`Cleaned dataset count: ${cleanedList.length} items.`);

// Re-assign neat index IDs
cleanedList = cleanedList.map((item, index) => {
  return {
    id: `site_${index + 1}`,
    unescoId: item.unescoId || null,
    name: item.name,
    nameEn: item.nameEn,
    country: item.country,
    countryEn: item.countryEn,
    region: item.region,
    category: item.category,
    categoryJa: item.categoryJa,
    yearInscribed: item.yearInscribed,
    description: item.description
  };
});

fs.writeFileSync(rawDataPath, JSON.stringify(cleanedList, null, 2), 'utf-8');
console.log(`Saved refined ${cleanedList.length} items to ${rawDataPath}`);
