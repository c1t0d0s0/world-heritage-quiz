export const SITES_DATA = [
  {
    id: 'machu_picchu',
    name: 'マチュ・ピチュの歴史保護区',
    nameEn: 'Historic Sanctuary of Machu Picchu',
    country: 'ペルー',
    countryEn: 'Peru',
    region: '南アメリカ',
    regionEn: 'South America',
    category: 'mixed', // cultural, natural, mixed
    categoryJa: '複合遺産',
    yearInscribed: 1983,
    image: './images/sites/machu_picchu.jpg',
    description: 'アンデス山脈の標高約2,430mの尾根に位置するインカ帝国の遺跡。15世紀半ばに建設されたとされ、空中都市として世界的に有名です。',
    funFact: '文字を持たなかったインカ帝国では「キープ」と呼ばれる縄の結び目で記録を残していました。',
    coordinates: '13.1631° S, 72.5450° W',
    questions: [
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
    ]
  },
  {
    id: 'taj_mahal',
    name: 'タージ・マハル',
    nameEn: 'Taj Mahal',
    country: 'インド',
    countryEn: 'India',
    region: 'アジア',
    regionEn: 'Asia',
    category: 'cultural',
    categoryJa: '文化遺産',
    yearInscribed: 1983,
    image: './images/sites/taj_mahal.jpg',
    description: 'ムガル帝国第5代皇帝シャー・ジャハーンが、最愛の妃ムムターズ・マハルのために建てた総白亜の総大理石造りの墓廟。',
    funFact: '朝、夕方、月夜で大理石の色が時間帯によって微妙に異なる美しさを見せます。',
    coordinates: '27.1751° N, 78.0421° E',
    questions: [
      {
        question: 'タージ・マハルは何のために建設された建造物でしょうか？',
        options: ['王妃の墓廟（お墓）', '仏教の寺院', '皇帝の要塞 palace', '天体観測所'],
        correctIndex: 0,
        explanation: 'シャー・ジャハーン皇帝が亡き最愛の妃ムムターズ・マハルの冥福を祈るために建設しました。'
      },
      {
        question: 'タージ・マハルの主材料として使われている建材は何ですか？',
        options: ['白大理石', '赤砂岩', '花崗岩', 'レンガ'],
        correctIndex: 0,
        explanation: 'インド各地やアジア全域から集められた高品質な純白の大理石が使われています。'
      }
    ]
  },
  {
    id: 'colosseum',
    name: 'ローマ歴史地区とコロッセオ',
    nameEn: 'Historic Centre of Rome and Colosseum',
    country: 'イタリア',
    countryEn: 'Italy',
    region: 'ヨーロッパ',
    regionEn: 'Europe',
    category: 'cultural',
    categoryJa: '文化遺産',
    yearInscribed: 1980,
    image: './images/sites/colosseum.jpg',
    description: '古代ローマ帝国時代に建設された円形闘技場。収容人数は約5万人を超え、剣闘士の闘いや模擬海戦などが行われました。',
    funFact: '古代ローマ時代、地下構造からグラディエーターや猛獣を昇降機で地上へ引き揚げる仕掛けがありました。',
    coordinates: '41.8902° N, 12.4922° E',
    questions: [
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
  },
  {
    id: 'great_wall',
    name: '万里の長城',
    nameEn: 'The Great Wall',
    country: '中国',
    countryEn: 'China',
    region: 'アジア',
    regionEn: 'Asia',
    category: 'cultural',
    categoryJa: '文化遺産',
    yearInscribed: 1987,
    image: './images/sites/great_wall.jpg',
    description: '北方民族の侵入を防ぐために春秋戦国時代から明代にかけて建設された世界最大級の城壁遺跡。全長は2万kmを超えます。',
    funFact: '城壁のレンガを固めるためのモルタルには、米粉（もち米）が混ぜられていた箇所があります。',
    coordinates: '40.4319° N, 116.5704° E',
    questions: [
      {
        question: '万里の長城の総延長はおよそどれくらいあると算出されていますか？',
        options: ['約21,000km', '約3,000km', '約8,000km', '約50,000km'],
        correctIndex: 0,
        explanation: '総調査結果によると、現存・全支線含め約21,196kmに及ぶと発表されています。'
      },
      {
        question: '万里の長城が主に作られた最大の目的は何ですか？',
        options: ['北方遊牧民族の侵入防御', '交易ルートの建設', '水害を防ぐ堤防', '宗教的な巡礼路'],
        correctIndex: 0,
        explanation: '北方の騎馬遊牧民族の侵入から防衛するための軍事要塞・城壁です。'
      }
    ]
  },
  {
    id: 'pyramids_giza',
    name: 'メンフィスとその墓地遺跡 - ギザからダハシュールまでのピラミッド地帯',
    nameEn: 'Memphis and its Necropolis - Pyramid Fields from Giza to Dahshur',
    country: 'エジプト',
    countryEn: 'Egypt',
    region: 'アフリカ',
    regionEn: 'Africa',
    category: 'cultural',
    categoryJa: '文化遺産',
    yearInscribed: 1979,
    image: './images/sites/pyramids_giza.jpg',
    description: 'クフ王、カフラー王、メンカウラー王の三大ピラミッドとスフィンクスが立つ古代エジプト文明の象徴的遺跡。',
    funFact: 'クフ王の大ピラミッドは、約3800年もの間、世界で最も高い人工建造物でした。',
    coordinates: '29.9792° N, 31.1342° E',
    questions: [
      {
        question: 'ギザの三大ピラミッドの中で最も大きいピラミッドを作ったファラオは誰ですか？',
        options: ['クフ王', 'ツタンカーメン王', 'カフラー王', 'ラムセス2世'],
        correctIndex: 0,
        explanation: 'クフ王の大ピラミッドは高さ約146m（建設時）あり、三大ピラミッドの中で最大です。'
      },
      {
        question: 'ピラミッドの前に横たわる、ライオンの体に人間の頭を持つ巨大像の名前は何ですか？',
        options: ['スフィンクス', 'アヌビス', 'バステト', 'オシリス'],
        correctIndex: 0,
        explanation: '聖なる守護者として知られる大スフィンクスです。'
      }
    ]
  },
  {
    id: 'mount_fuji',
    name: '富士山―信仰の対象と芸術の源泉',
    nameEn: 'Fujisan, sacred place and source of artistic inspiration',
    country: '日本',
    countryEn: 'Japan',
    region: 'アジア',
    regionEn: 'Asia',
    category: 'cultural',
    categoryJa: '文化遺産',
    yearInscribed: 2013,
    image: './images/sites/mount_fuji.jpg',
    description: '日本の最高峰（3,776m）であり、古くから信仰の山として崇められ、葛飾北斎の浮世絵など多くの芸術を生み出した象徴。',
    funFact: '自然遺産ではなく「信仰の対象と芸術の源泉」という文化的価値から「文化遺産」として登録されました。',
    coordinates: '35.3606° N, 138.7274° E',
    questions: [
      {
        question: '富士山が世界遺産に登録された種別はどれですか？',
        options: ['文化遺産', '自然遺産', '複合遺産', '無形文化遺産'],
        correctIndex: 0,
        explanation: '自然景観だけでなく「信仰の対象と芸術の源泉」としての文化価値が評価され、文化遺産に登録されました。'
      },
      {
        question: '富士山の標高は何メートルですか？',
        options: ['3,776m', '3,190m', '4,100m', '2,980m'],
        correctIndex: 0,
        explanation: '日本最高峰の標高は3,776メートルです。'
      }
    ]
  },
  {
    id: 'angkor_wat',
    name: 'アンコール遺跡群',
    nameEn: 'Angkor',
    country: 'カンボジア',
    countryEn: 'Cambodia',
    region: 'アジア',
    regionEn: 'Asia',
    category: 'cultural',
    categoryJa: '文化遺産',
    yearInscribed: 1992,
    image: './images/sites/angkor_wat.jpg',
    description: '9世紀から15世紀にかけて栄えたクメール王朝の首都遺跡。中心となるアンコール・ワットはヒンドゥー教から仏教寺院へと変化しました。',
    funFact: 'カンボジアの国旗の中央にはアンコール・ワットのシルエットが描かれています。',
    coordinates: '13.4125° N, 103.8670° E',
    questions: [
      {
        question: 'アンコール・ワットが位置する東南アジアの国はどこですか？',
        options: ['カンボジア', 'タイ', 'ベトナム', 'ミャンマー'],
        correctIndex: 0,
        explanation: 'アンコール遺跡群はカンボジアシェムリアップに位置しています。'
      },
      {
        question: 'アンコール・ワットが最初に建てられた際に捧げられた宗教は何ですか？',
        options: ['ヒンドゥー教', '仏教', 'イスラム教', 'キリスト教'],
        correctIndex: 0,
        explanation: '12世紀前半、スーリヤヴァルマン2世によってヒンドゥー教のヴィシュヌ神に捧げる寺院として建設されました。'
      }
    ]
  },
  {
    id: 'petra',
    name: 'ペトラ遺跡',
    nameEn: 'Petra',
    country: 'ヨルダン',
    countryEn: 'Jordan',
    region: '中東・アジア',
    regionEn: 'Middle East',
    category: 'cultural',
    categoryJa: '文化遺産',
    yearInscribed: 1985,
    image: './images/sites/petra.jpg',
    description: '紀元前にナバテア人が岩山を彫り込んで築いた砂漠の交易都市。バラ色の岩肌から「ローズ・レッド・シティ」とも呼ばれます。',
    funFact: '映画『インディ・ジョーンズ/最後の聖戦』の聖杯の寺院のロケ地として有名です。',
    coordinates: '30.3289° N, 35.4444° E',
    questions: [
      {
        question: 'ペトラ遺跡の代表的な岩窟建造物「エル・カズネ」は日本語で何と呼ばれますか？',
        options: ['宝物殿', '大劇場', '修道院', '王の墓'],
        correctIndex: 0,
        explanation: 'アラビア語で「エル・カズネ」は宝物殿を意味します。'
      },
      {
        question: 'ペトラ遺跡を築いた古代アラビアの遊牧民は何人ですか？',
        options: ['ナバテア人', 'フェニキア人', 'ペルシア人', 'ヒッタイト人'],
        correctIndex: 0,
        explanation: 'ナバテア王国が紀元前にキャラバン交易の拠点として岩壁を切り開いて築きました。'
      }
    ]
  },
  {
    id: 'great_barrier_reef',
    name: 'グレート・バリア・リーフ',
    nameEn: 'Great Barrier Reef',
    country: 'オーストラリア',
    countryEn: 'Australia',
    region: 'オセアニア',
    regionEn: 'Oceania',
    category: 'natural',
    categoryJa: '自然遺産',
    yearInscribed: 1981,
    image: './images/sites/great_barrier_reef.jpg',
    description: '全長約2,300kmにわたって広がる世界最大のサンゴ礁地帯。宇宙空間からも視認できる豊かな生物多様性の宝庫です。',
    funFact: '約1,500種の魚類、400種のサンゴ、4,000種の軟体動物が生息しています。',
    coordinates: '18.2871° S, 147.6992° E',
    questions: [
      {
        question: 'グレート・バリア・リーフは何で形成されている地帯ですか？',
        options: ['世界最大のサンゴ礁地帯', '巨大な火山列島', '氷河が削ったフィヨルド', '巨大なマングローブ原生林'],
        correctIndex: 0,
        explanation: '数千年にわたり成長したサンゴが作り上げた世界最大のサンゴ礁生態系です。'
      },
      {
        question: 'グレート・バリア・リーフはどの国に属していますか？',
        options: ['オーストラリア', 'ニュージーランド', 'フィジー', 'インドネシア'],
        correctIndex: 0,
        explanation: 'オーストラリア北東部のクイーンズランド州沖に広がる大サンゴ礁です。'
      }
    ]
  },
  {
    id: 'stonehenge',
    name: 'ストーンヘンジ、エイヴベリーと関連する遺跡群',
    nameEn: 'Stonehenge, Avebury and Associated Sites',
    country: 'イギリス',
    countryEn: 'United Kingdom',
    region: 'ヨーロッパ',
    regionEn: 'Europe',
    category: 'cultural',
    categoryJa: '文化遺産',
    yearInscribed: 1986,
    image: './images/sites/stonehenge.jpg',
    description: '紀元前3000年〜紀元前2000年頃に建設されたとされる巨石建造物（ストーンサークル）。太陽の運行と深く結びついています。',
    funFact: '夏至の日に中心の石から見ると、ヒール・ストーンと呼ばれる特定の石から太陽が昇る計算になっています。',
    coordinates: '51.1789° N, 1.8262° W',
    questions: [
      {
        question: 'ストーンヘンジの立石群が特に正確に指し示す天体現象は何ですか？',
        options: ['夏至と冬至の太陽の出没', '月食のサイクル', '北極星の位置', '彗星の周期'],
        correctIndex: 0,
        explanation: 'ストーンヘンジは夏至の日の出や冬至の日の入りの方位と精密に一致しています。'
      },
      {
        question: 'ストーンヘンジが存在する国はどこですか？',
        options: ['イギリス', 'アイルランド', 'フランス', 'スコットランド'],
        correctIndex: 0,
        explanation: 'イギリス・イングランド南部のソールズベリー平原に位置しています。'
      }
    ]
  },
  {
    id: 'sagrada_familia',
    name: 'アントニ・ガウディの作品群（サグラダ・ファミリア等）',
    nameEn: 'Works of Antoni Gaudí',
    country: 'スペイン',
    countryEn: 'Spain',
    region: 'ヨーロッパ',
    regionEn: 'Europe',
    category: 'cultural',
    categoryJa: '文化遺産',
    yearInscribed: 1984,
    image: './images/sites/sagrada_familia.jpg',
    description: '天才建築家アントニ・ガウディが手がけたバルセロナの革新的な建築群。サグラダ・ファミリア教会やグエル公園が含まれます。',
    funFact: '1882年に着工し、140年以上経った現在も建築が続けられている未完の大聖堂です。',
    coordinates: '41.4036° N, 2.1744° E',
    questions: [
      {
        question: 'サグラダ・ファミリアを設計した世界的に有名なスペインの建築家は誰ですか？',
        options: ['アントニ・ガウディ', 'パブロ・ピカソ', 'ミケランジェロ', 'ル・コルビュジエ'],
        correctIndex: 0,
        explanation: '自然の造形美を取り入れた独自のスタイルを持つアントニ・ガウディです。'
      },
      {
        question: 'ガウディの作品群が多く存在するスペインの都市はどこですか？',
        options: ['バルセロナ', 'マドリード', 'セビリア', 'バレンシア'],
        correctIndex: 0,
        explanation: 'カタルーニャ州の都市バルセロナに集中しています。'
      }
    ]
  },
  {
    id: 'himeji_castle',
    name: '姫路城',
    nameEn: 'Himeji-jo',
    country: '日本',
    countryEn: 'Japan',
    region: 'アジア',
    regionEn: 'Asia',
    category: 'cultural',
    categoryJa: '文化遺産',
    yearInscribed: 1993,
    image: './images/sites/himeji_castle.jpg',
    description: '白漆喰総塗籠造の美しさから「白鷺城（しらさぎじょう）」の別名を持つ、木造建築の最高峰と讃えられる日本のお城。',
    funFact: '太平洋戦争の空襲や大地震を奇跡的に免れ、築城当時の天守が現存しています。',
    coordinates: '34.8394° N, 134.6939° E',
    questions: [
      {
        question: '姫路城はその美しい白壁から何城という別名で呼ばれていますか？',
        options: ['白鷺城（しらさぎじょう）', '烏城（うじょう）', '金鯱城（きんこじょう）', '鶴ヶ城（つるがじょう）'],
        correctIndex: 0,
        explanation: '羽を広げた白いサギのように見えることから「白鷺城」と親しまれています。'
      },
      {
        question: '姫路城が法隆寺とともに日本で初めて世界遺産に登録された年は西暦何年ですか？',
        options: ['1993年', '1985年', '2000年', '2013年'],
        correctIndex: 0,
        explanation: '1993年、法隆寺地域の仏教建造物とともに日本初の文化遺産として登録されました。'
      }
    ]
  },
  {
    id: 'galapagos',
    name: 'ガラパゴス諸島',
    nameEn: 'Galápagos Islands',
    country: 'エクアドル',
    countryEn: 'Ecuador',
    region: '南アメリカ',
    regionEn: 'South America',
    category: 'natural',
    categoryJa: '自然遺産',
    yearInscribed: 1978,
    image: './images/sites/galapagos.jpg',
    description: '太平洋上の火山列島。ガラパゴスゾウガメやウミイグアナなど固有種の寶庫で、ダーウィンの進化論のヒントとなりました。',
    funFact: '「ガラパゴ」はスペイン語で「ゾウガメ」や「馬の鞍」を意味します。',
    coordinates: '0.9538° S, 90.9656° W',
    questions: [
      {
        question: 'ガラパゴス諸島での固有動物の観察から進化論の着想を得た科学者は誰ですか？',
        options: ['チャールズ・ダーウィン', 'アイザック・ニュートン', 'グレゴール・メンデル', 'アレクサンダー・フンボルト'],
        correctIndex: 0,
        explanation: 'ビーグル号で訪問したチャールズ・ダーウィンが「種起源」の着想を得ました。'
      },
      {
        question: 'ガラパゴス諸島はどの国に属している領土ですか？',
        options: ['エクアドル', 'コロンビア', 'チリ', 'ペルー'],
        correctIndex: 0,
        explanation: '南米エクアドルの本土から西へ約1,000km離れた太平洋上に位置します。'
      }
    ]
  }
];

export const ACHIEVEMENTS = [
  { id: 'first_quiz', name: '初挑戦', desc: '初めてクイズを完了した', icon: '🐣' },
  { id: 'perfect_score', name: '世界遺産マスター', desc: '100%全問正解を達成した', icon: '👑' },
  { id: 'streak_5', name: 'コンボスター', desc: '5連続正解を達成した', icon: '🔥' },
  { id: 'explorer_view', name: '熱心な研究者', desc: '図鑑で10個以上の遺産を閲覧した', icon: '📖' },
  { id: 'speedrun_clear', name: 'スピードスター', desc: 'スピードランモードを完走した', icon: '⚡' }
];
