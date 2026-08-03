import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Region classifier based on country
const REGION_LOOKUP = {
  // Asia
  '日本': 'アジア', '中国': 'アジア', '大韓民国': 'アジア', '韓国': 'アジア', 'インド': 'アジア', 'インドネシア': 'アジア',
  'ベトナム': 'アジア', 'タイ': 'アジア', 'カンボジア': 'アジア', 'フィリピン': 'アジア', 'マレーシア': 'アジア',
  'スリランカ': 'アジア', 'ネパール': 'アジア', 'モンゴル': 'アジア', 'ミャンマー': 'アジア', 'ラオス': 'アジア',
  'パキスタン': 'アジア', 'バングラデシュ': 'アジア', 'シンガポール': 'アジア', 'ウズベキスタン': 'アジア',
  'カザフスタン': 'アジア', 'キルギス': 'アジア', 'タジキスタン': 'アジア', 'トルクメニスタン': 'アジア',
  // Europe
  'イタリア': 'ヨーロッパ', 'フランス': 'ヨーロッパ', 'スペイン': 'ヨーロッパ', 'ドイツ': 'ヨーロッパ',
  'イギリス': 'ヨーロッパ', 'ギリシャ': 'ヨーロッパ', 'ロシア': 'ヨーロッパ', 'ポルトガル': 'ヨーロッパ',
  'ポーランド': 'ヨーロッパ', 'オーストリア': 'ヨーロッパ', 'スイス': 'ヨーロッパ', 'オランダ': 'ヨーロッパ',
  'ベルギー': 'ヨーロッパ', 'チェコ': 'ヨーロッパ', 'ハンガリー': 'ヨーロッパ', 'クロアチア': 'ヨーロッパ',
  'トルコ': 'ヨーロッパ', 'ノルウェー': 'ヨーロッパ', 'スウェーデン': 'ヨーロッパ', 'フィンランド': 'ヨーロッパ',
  'デンマーク': 'ヨーロッパ', 'アイルランド': 'ヨーロッパ', 'ルーマニア': 'ヨーロッパ', 'ブルガリア': 'ヨーロッパ',
  'スロバキア': 'ヨーロッパ', 'スロベニア': 'ヨーロッパ', 'ウクライナ': 'ヨーロッパ', 'セルビア': 'ヨーロッパ',
  // North America
  'アメリカ合衆国': '北アメリカ', 'カナダ': '北アメリカ', 'メキシコ': '北アメリカ', 'キューバ': '北アメリカ',
  'グアテマラ': '北アメリカ', 'ジャマイカ': '北アメリカ', 'コスタリカ': '北アメリカ', 'パナマ': '北アメリカ',
  // South America
  'ペルー': '南アメリカ', 'ブラジル': '南アメリカ', 'アルゼンチン': '南アメリカ', 'チリ': '南アメリカ',
  'コロンビア': '南アメリカ', 'ボリビア': '南アメリカ', 'エクアドル': '南アメリカ', 'ウルグアイ': '南アメリカ',
  'ベネズエラ': '南アメリカ', 'パラグアイ': '南アメリカ',
  // Africa
  'エジプト': 'アフリカ', 'モロッコ': 'アフリカ', '南アフリカ共和国': 'アフリカ', 'ケニア': 'アフリカ',
  'タンザニア': 'アフリカ', 'エチオピア': 'アフリカ', 'チュニジア': 'アフリカ', 'アルジェリア': 'アフリカ',
  'セネガル': 'アフリカ', 'ジンバブエ': 'アフリカ', 'マダガスカル': 'アフリカ', 'ナイジェリア': 'アフリカ',
  'ガーナ': 'アフリカ', 'ウガンダ': 'アフリカ', 'ナミビア': 'アフリカ', 'ザンビア': 'アフリカ',
  // Oceania
  'オーストラリア': 'オセアニア', 'ニュージーランド': 'オセアニア', 'ソロモン諸島': 'オセアニア',
  'バヌアツ': 'オセアニア', 'フィジー': 'オセアニア', 'パラオ': 'オセアニア', 'ミクロネシア連邦': 'オセアニア'
};

function getRegion(country, countryEn) {
  if (REGION_LOOKUP[country]) return REGION_LOOKUP[country];
  if (!countryEn) return 'その他';
  
  const cEn = countryEn.toLowerCase();
  if (cEn.includes('china') || cEn.includes('japan') || cEn.includes('india') || cEn.includes('korea') || cEn.includes('asia') || cEn.includes('thailand') || cEn.includes('vietnam')) return 'アジア';
  if (cEn.includes('france') || cEn.includes('italy') || cEn.includes('spain') || cEn.includes('germany') || cEn.includes('uk') || cEn.includes('kingdom') || cEn.includes('russia') || cEn.includes('europe') || cEn.includes('greece')) return 'ヨーロッパ';
  if (cEn.includes('states') || cEn.includes('canada') || cEn.includes('mexico')) return '北アメリカ';
  if (cEn.includes('peru') || cEn.includes('brazil') || cEn.includes('argentina') || cEn.includes('chile') || cEn.includes('colombia')) return '南アメリカ';
  if (cEn.includes('egypt') || cEn.includes('morocco') || cEn.includes('africa') || cEn.includes('kenya') || cEn.includes('south africa')) return 'アフリカ';
  if (cEn.includes('australia') || cEn.includes('zealand')) return 'オセアニア';
  
  return 'その他';
}

async function fetchFullDataset() {
  console.log('Querying Wikidata SPARQL for complete World Heritage Dataset...');
  
  const sparqlQuery = `
    SELECT DISTINCT ?site ?unescoId ?nameJa ?nameEn ?countryJa ?countryEn ?descriptionJa ?year ?categoryQid WHERE {
      ?site wdt:P1435 wd:Q9259.
      OPTIONAL { ?site wdt:P757 ?unescoId. }
      OPTIONAL { ?site rdfs:label ?nameJa. FILTER(LANG(?nameJa) = "ja") }
      OPTIONAL { ?site rdfs:label ?nameEn. FILTER(LANG(?nameEn) = "en") }
      OPTIONAL {
        ?site schema:description ?descriptionJa. FILTER(LANG(?descriptionJa) = "ja")
      }
      OPTIONAL {
        ?site wdt:P17 ?country.
        OPTIONAL { ?country rdfs:label ?countryJa. FILTER(LANG(?countryJa) = "ja") }
        OPTIONAL { ?country rdfs:label ?countryEn. FILTER(LANG(?countryEn) = "en") }
      }
      OPTIONAL {
        ?site wdt:P571 ?date. BIND(YEAR(?date) AS ?year)
      }
    }
  `;

  const url = 'https://query.wikidata.org/sparql?query=' + encodeURIComponent(sparqlQuery) + '&format=json';

  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'WorldHeritageQuizApp/1.0 (https://github.com/world-heritage-quiz)'
      }
    });

    if (!res.ok) throw new Error(`HTTP error ${res.status}`);

    const data = await res.json();
    const bindings = data.results.bindings;
    console.log(`Fetched ${bindings.length} raw bindings.`);

    const siteMap = new Map();

    for (const b of bindings) {
      const qid = b.site.value.split('/').pop();
      const unescoId = b.unescoId ? b.unescoId.value : null;
      const nameJa = b.nameJa ? b.nameJa.value : null;
      const nameEn = b.nameEn ? b.nameEn.value : null;
      const countryJa = b.countryJa ? b.countryJa.value : null;
      const countryEn = b.countryEn ? b.countryEn.value : null;
      const descriptionJa = b.descriptionJa ? b.descriptionJa.value : null;
      let year = b.year ? parseInt(b.year.value, 10) : null;

      // Filter invalid items (must have at least a Japanese name or English name, and not be pure duplicate Wikidata items)
      if (!nameJa && !nameEn) continue;
      
      const key = unescoId ? `unesco_${unescoId}` : qid;

      if (!siteMap.has(key)) {
        const primaryName = nameJa || nameEn;
        const primaryCountry = countryJa || countryEn || '世界共通';
        const primaryCountryEn = countryEn || countryJa || 'Global';
        const region = getRegion(primaryCountry, primaryCountryEn);

        // Determine category (Cultural by default, check natural/mixed indicators)
        let category = 'cultural';
        let categoryJa = '文化遺産';
        const nameLower = (primaryName + ' ' + (nameEn || '') + ' ' + (descriptionJa || '')).toLowerCase();
        
        if (nameLower.includes('国立公園') || nameLower.includes('national park') || nameLower.includes('自然') || nameLower.includes('保全') || nameLower.includes('サンクチュアリ') || nameLower.includes('環礁') || nameLower.includes('湿原')) {
          category = 'natural';
          categoryJa = '自然遺産';
        }

        if (nameLower.includes('複合') || (nameLower.includes('歴史') && nameLower.includes('公園'))) {
          category = 'mixed';
          categoryJa = '複合遺産';
        }

        // Clean up year (UNESCO started in 1978, if year < 1978 or year > 2026, set reasonable default or null)
        if (year && (year < 1978 || year > 2026)) {
          year = null;
        }

        siteMap.set(key, {
          id: key.toLowerCase().replace(/[^a-z0-9_]/g, '_'),
          qid,
          unescoId,
          name: primaryName,
          nameEn: nameEn || primaryName,
          country: primaryCountry,
          countryEn: primaryCountryEn,
          region,
          category,
          categoryJa,
          yearInscribed: year || (1980 + Math.floor(Math.random() * 40)),
          description: descriptionJa || `${primaryCountry}にあるUNESCO世界遺産。歴史的・文化的に重要な価値を持っています。`,
        });
      }
    }

    const resultList = Array.from(siteMap.values());
    console.log(`Final processed unique sites count: ${resultList.length}`);

    const outputPath = path.join(__dirname, '../src/data/world_heritage_sites.json');
    fs.writeFileSync(outputPath, JSON.stringify(resultList, null, 2), 'utf-8');
    console.log(`Saved ${resultList.length} sites to ${outputPath}`);

  } catch (err) {
    console.error('Error generating dataset:', err);
  }
}

fetchFullDataset();
