import {
  getLocalizedFestival,
  resolveFestivalLanguage,
} from "./festivalLocalization";
import type { FestivalBase } from "./festivals";
import type { FestivalSearchLanguage } from "./festivalSearchAliases";

export type FestivalFoodMetadata = {
  title: string;
  addr1: string;
  addr2: string;
  dist: string;
  tel: string;
  overview: string;
};

export type FestivalDetailMetadata = {
  sponsor1: string;
  sponsor1tel: string;
  eventplace: string;
  program: string;
  intro: string;
  detail: string;
  foods: FestivalFoodMetadata[];
};

export type FestivalDetailSectionLabels = {
  intro: string;
  detail: string;
};

export type FestivalDetailCommonLocale = {
  ageLimit: string;
  bookingPlace: string;
  subEvent: string;
  usageFee: string;
  discountInfo: string;
  spendTime: string;
  fallbackSponsor: string;
  programSuffix: string;
  introSuffix: string;
  detailPrefix: string;
  detailSuffix: string;
  foodTitleSuffix: string;
  foodMarketTitle: string;
  foodOverview: string;
  foodMarketOverview: string;
};

const festivalDetailSectionLabels: Record<
  FestivalSearchLanguage,
  FestivalDetailSectionLabels
> = {
  kor: { intro: "행사소개", detail: "행사내용" },
  eng: { intro: "Introduction", detail: "Details" },
  jpn: { intro: "イベント紹介", detail: "イベント内容" },
  chn: { intro: "活动介绍", detail: "活动内容" },
  fra: {
    intro: "Présentation de l'événement",
    detail: "Contenu de l'événement",
  },
  spa: { intro: "Introducción al evento", detail: "Contenido del evento" },
  rus: { intro: "Введение", detail: "Описание мероприятия" },
};

const festivalDetailCommonLocales: Record<
  FestivalSearchLanguage,
  FestivalDetailCommonLocale
> = {
  kor: {
    ageLimit: "전 연령",
    bookingPlace: "현장 접수",
    subEvent: "현장 참여 프로그램",
    usageFee: "무료",
    discountInfo: "일부 체험 프로그램은 현장 안내를 확인해 주세요.",
    spendTime: "약 2시간",
    fallbackSponsor: "K-Festival Demo 운영팀",
    programSuffix: "전시, 공연, 체험 프로그램",
    introSuffix: "에서 지역 문화를 즐길 수 있는 축제입니다.",
    detailPrefix: "은(는) 지역 문화를 만날 수 있는 축제입니다.",
    detailSuffix: "축제 현장에서 다양한 프로그램과 지역 문화를 경험해 보세요.",
    foodTitleSuffix: " 대표 식당",
    foodMarketTitle: " 푸드마켓",
    foodOverview: "방문객이 이용하기 좋은 지역 음식점입니다.",
    foodMarketOverview: "축제 주변에서 간단한 식사와 지역 간식을 즐길 수 있습니다.",
  },
  eng: {
    ageLimit: "All ages",
    bookingPlace: "On-site registration",
    subEvent: "On-site participation programs",
    usageFee: "Free",
    discountInfo: "Please check on-site information for selected hands-on programs.",
    spendTime: "About 2 hours",
    fallbackSponsor: "K-Festival Demo Operations Team",
    programSuffix: "exhibitions, performances, and hands-on activities",
    introSuffix: " is a festival where visitors can enjoy local culture.",
    detailPrefix: " is a local cultural festival held at the venue.",
    detailSuffix: "Experience diverse programs and local culture at the festival site.",
    foodTitleSuffix: " Signature Restaurant",
    foodMarketTitle: " Festival Food Market",
    foodOverview: "A local restaurant convenient for festival visitors.",
    foodMarketOverview: "Enjoy light meals and local snacks around the festival venue.",
  },
  jpn: {
    ageLimit: "全年齢",
    bookingPlace: "現地受付",
    subEvent: "現地参加プログラム",
    usageFee: "無料",
    discountInfo: "一部の体験プログラムは現地案内をご確認ください。",
    spendTime: "約2時間",
    fallbackSponsor: "K-Festival Demo運営チーム",
    programSuffix: "展示、公演、体験プログラム",
    introSuffix: "で地域文化を楽しめる祭りです。",
    detailPrefix: "で開かれる地域文化祭です。",
    detailSuffix: "会場でさまざまなプログラムと地域文化を体験できます。",
    foodTitleSuffix: " 代表食堂",
    foodMarketTitle: " フードマーケット",
    foodOverview: "来場者が利用しやすい地域の飲食店です。",
    foodMarketOverview: "会場周辺で軽食と地域のおやつを楽しめます。",
  },
  chn: {
    ageLimit: "全年龄",
    bookingPlace: "现场报名",
    subEvent: "现场参与活动",
    usageFee: "免费",
    discountInfo: "部分体验活动请参考现场说明。",
    spendTime: "约2小时",
    fallbackSponsor: "K-Festival Demo运营团队",
    programSuffix: "展览、演出和体验活动",
    introSuffix: "是可以体验地方文化的节日。",
    detailPrefix: "是举办地方文化活动的节日。",
    detailSuffix: "欢迎在节日现场体验丰富的活动与地方文化。",
    foodTitleSuffix: "代表餐厅",
    foodMarketTitle: "美食市场",
    foodOverview: "适合节日游客前往的地方餐厅。",
    foodMarketOverview: "可以在活动场地附近享用简餐和地方小吃。",
  },
  fra: {
    ageLimit: "Tout public",
    bookingPlace: "Inscription sur place",
    subEvent: "Programmes participatifs sur place",
    usageFee: "Gratuit",
    discountInfo: "Consultez les informations sur place pour certaines activités.",
    spendTime: "Environ 2 heures",
    fallbackSponsor: "Équipe opérationnelle K-Festival Demo",
    programSuffix: "expositions, spectacles et activités pratiques",
    introSuffix: " est un festival qui permet de découvrir la culture locale.",
    detailPrefix: " est un festival culturel local organisé sur le site.",
    detailSuffix: "Découvrez de nombreux programmes et la culture locale sur le site du festival.",
    foodTitleSuffix: " Restaurant local",
    foodMarketTitle: " Marché gastronomique du festival",
    foodOverview: "Un restaurant local pratique pour les visiteurs du festival.",
    foodMarketOverview: "Profitez de repas simples et de spécialités locales près du festival.",
  },
  spa: {
    ageLimit: "Todas las edades",
    bookingPlace: "Inscripción en el lugar",
    subEvent: "Programas participativos en el lugar",
    usageFee: "Gratis",
    discountInfo: "Consulta la información del lugar para algunas actividades prácticas.",
    spendTime: "Aproximadamente 2 horas",
    fallbackSponsor: "Equipo operativo de K-Festival Demo",
    programSuffix: "exposiciones, espectáculos y actividades prácticas",
    introSuffix: " es un festival para disfrutar de la cultura local.",
    detailPrefix: " es un festival cultural local que se celebra en el lugar.",
    detailSuffix: "Disfruta de diversos programas y de la cultura local en el festival.",
    foodTitleSuffix: " Restaurante local",
    foodMarketTitle: " Mercado gastronómico del festival",
    foodOverview: "Un restaurante local cómodo para los visitantes del festival.",
    foodMarketOverview: "Disfruta de comidas sencillas y aperitivos locales cerca del festival.",
  },
  rus: {
    ageLimit: "Для всех возрастов",
    bookingPlace: "Регистрация на месте",
    subEvent: "Программы с участием посетителей",
    usageFee: "Бесплатно",
    discountInfo: "Информацию о некоторых практических программах уточняйте на месте.",
    spendTime: "Около 2 часов",
    fallbackSponsor: "Операционная команда K-Festival Demo",
    programSuffix: "выставки, выступления и практические занятия",
    introSuffix: " — фестиваль, где можно познакомиться с местной культурой.",
    detailPrefix: " — местный культурный фестиваль, который проходит на площадке.",
    detailSuffix: "Познакомьтесь с разными программами и местной культурой на фестивале.",
    foodTitleSuffix: " Ресторан местной кухни",
    foodMarketTitle: " Фестивальный фуд-маркет",
    foodOverview: "Местный ресторан, удобный для посетителей фестиваля.",
    foodMarketOverview: "Рядом с фестивалем можно перекусить и попробовать местные закуски.",
  },
};

export function getFestivalDetailSectionLabels(
  lang: string | null | undefined,
): FestivalDetailSectionLabels {
  return festivalDetailSectionLabels[resolveFestivalLanguage(lang)];
}

export function getFestivalDetailCommonLocale(
  lang: string | null | undefined,
) {
  return festivalDetailCommonLocales[resolveFestivalLanguage(lang)];
}

function createFood(
  title: string,
  addr1: string,
  addr2: string,
  overview: string,
  dist: string,
  tel: string,
): FestivalFoodMetadata {
  return { title, addr1, addr2, overview, dist, tel };
}

const festivalDetailMetadataLocales: Partial<
  Record<string, Record<FestivalSearchLanguage, FestivalDetailMetadata>>
> = {
  "mock-festival-001": {
    kor: {
      sponsor1: "서울특별시 문화본부",
      sponsor1tel: "02-0000-0001",
      eventplace: "서울광장",
      program: "빛 전시, 야간 공연, 시민 참여형 미디어아트 체험",
      intro: "서울 도심의 밤을 다양한 빛과 음악으로 채우는 야간 문화축제입니다.",
      detail:
        "<p>서울광장 곳곳에 설치된 빛 작품을 자유롭게 감상할 수 있습니다.</p><p>주말에는 야외 공연과 시민 참여 프로그램이 함께 운영됩니다.</p>",
      foods: [
        createFood("광장 국수집", "서울특별시 중구 세종대로 110", "서울광장 인근", "따뜻한 국수와 만두를 즐길 수 있는 광장 인근 식당입니다.", "320", "02-0000-1010"),
        createFood("시청 야시장 푸드코트", "서울특별시 중구 세종대로 101", "시청역 5번 출구 앞", "축제 기간에 다양한 간식과 음료를 판매하는 야시장입니다.", "680", "02-0000-1011"),
      ],
    },
    eng: {
      sponsor1: "Seoul Metropolitan Government, Culture Division",
      sponsor1tel: "02-0000-0001",
      eventplace: "Seoul Plaza",
      program: "Light exhibitions, night performances, and citizen media art experiences",
      intro: "A nighttime cultural festival that fills downtown Seoul with light and music.",
      detail:
        "<p>Explore light artworks installed throughout Seoul Plaza.</p><p>Outdoor performances and citizen programs are held on weekends.</p>",
      foods: [
        createFood("Plaza Noodle House", "110 Sejong-daero, Jung-gu, Seoul", "Near Seoul Plaza", "A nearby restaurant serving warm noodles and dumplings.", "320", "02-0000-1010"),
        createFood("City Hall Night Market Food Court", "101 Sejong-daero, Jung-gu, Seoul", "In front of City Hall Station Exit 5", "A night market offering snacks and drinks during the festival.", "680", "02-0000-1011"),
      ],
    },
    jpn: {
      sponsor1: "ソウル特別市文化本部",
      sponsor1tel: "02-0000-0001",
      eventplace: "ソウル広場",
      program: "光の展示、夜間公演、市民参加型メディアアート体験",
      intro: "ソウル都心の夜をさまざまな光と音楽で彩る夜間文化祭です。",
      detail:
        "<p>ソウル広場の各所に設置された光の作品を自由に鑑賞できます。</p><p>週末には屋外公演と市民参加プログラムも行われます。</p>",
      foods: [
        createFood("広場の麺料理店", "ソウル特別市 中区 世宗大路110", "ソウル広場周辺", "温かい麺料理と餃子を楽しめる広場近くの食堂です。", "320", "02-0000-1010"),
        createFood("市庁ナイトマーケットフードコート", "ソウル特別市 中区 世宗大路101", "市庁駅5番出口前", "祭りの期間にさまざまな軽食と飲み物を販売します。", "680", "02-0000-1011"),
      ],
    },
    chn: {
      sponsor1: "首尔特别市文化本部",
      sponsor1tel: "02-0000-0001",
      eventplace: "首尔广场",
      program: "灯光展览、夜间演出、市民参与式媒体艺术体验",
      intro: "用丰富的灯光与音乐点亮首尔市中心夜晚的文化节。",
      detail:
        "<p>可以自由欣赏首尔广场各处设置的灯光作品。</p><p>周末还会举办户外演出和市民参与活动。</p>",
      foods: [
        createFood("广场面馆", "首尔特别市 中区 世宗大路110号", "首尔广场附近", "可以品尝热面条和饺子的广场附近餐厅。", "320", "02-0000-1010"),
        createFood("市厅夜市美食广场", "首尔特别市 中区 世宗大路101号", "市厅站5号出口前", "节日期间提供各种小吃和饮料的夜市。", "680", "02-0000-1011"),
      ],
    },
    fra: {
      sponsor1: "Direction de la culture de la ville de Séoul",
      sponsor1tel: "02-0000-0001",
      eventplace: "Place de Séoul",
      program: "Expositions lumineuses, spectacles nocturnes et expériences de media art",
      intro: "Un festival culturel nocturne qui remplit le centre de Séoul de lumière et de musique.",
      detail:
        "<p>Découvrez librement les œuvres lumineuses installées sur la place de Séoul.</p><p>Des spectacles en plein air et des programmes citoyens ont lieu le week-end.</p>",
      foods: [
        createFood("Restaurant de nouilles de la place", "110 Sejong-daero, Jung-gu, Séoul", "Près de la place de Séoul", "Un restaurant voisin qui sert des nouilles chaudes et des raviolis.", "320", "02-0000-1010"),
        createFood("Food court du marché nocturne de l'hôtel de ville", "101 Sejong-daero, Jung-gu, Séoul", "Devant la sortie 5 de la station City Hall", "Un marché nocturne proposant en-cas et boissons pendant le festival.", "680", "02-0000-1011"),
      ],
    },
    spa: {
      sponsor1: "División de Cultura del Gobierno Metropolitano de Seúl",
      sponsor1tel: "02-0000-0001",
      eventplace: "Plaza de Seúl",
      program: "Exposiciones de luz, espectáculos nocturnos y experiencias de arte multimedia",
      intro: "Un festival cultural nocturno que llena el centro de Seúl de luz y música.",
      detail:
        "<p>Disfruta libremente de las obras luminosas instaladas por la Plaza de Seúl.</p><p>Los fines de semana se celebran espectáculos al aire libre y programas ciudadanos.</p>",
      foods: [
        createFood("Restaurante de fideos de la plaza", "110 Sejong-daero, Jung-gu, Seúl", "Cerca de la Plaza de Seúl", "Un restaurante cercano que sirve fideos calientes y dumplings.", "320", "02-0000-1010"),
        createFood("Food court del mercado nocturno del Ayuntamiento", "101 Sejong-daero, Jung-gu, Seúl", "Frente a la salida 5 de City Hall", "Un mercado nocturno con aperitivos y bebidas durante el festival.", "680", "02-0000-1011"),
      ],
    },
    rus: {
      sponsor1: "Культурное управление столичной администрации Сеула",
      sponsor1tel: "02-0000-0001",
      eventplace: "Сеульская площадь",
      program: "Световые выставки, ночные выступления и медиаарт с участием горожан",
      intro: "Ночной культурный фестиваль, наполняющий центр Сеула светом и музыкой.",
      detail:
        "<p>На Сеульской площади можно свободно осмотреть световые произведения.</p><p>По выходным проходят уличные выступления и программы для горожан.</p>",
      foods: [
        createFood("Лапшичная на площади", "Седжон-даэро 110, район Чунгу, Сеул", "Рядом с Сеульской площадью", "Ресторан рядом с площадью, где подают горячую лапшу и пельмени.", "320", "02-0000-1010"),
        createFood("Фудкорт ночного рынка у мэрии", "Седжон-даэро 101, район Чунгу, Сеул", "Перед выходом 5 станции City Hall", "Ночной рынок с закусками и напитками во время фестиваля.", "680", "02-0000-1011"),
      ],
    },
  },
  "mock-festival-010": {
    kor: {
      sponsor1: "춘천시 관광과",
      sponsor1tel: "033-0000-0010",
      eventplace: "춘천역 앞 광장",
      program: "호수 빛 산책, 별빛 음악회, 야간 포토존",
      intro: "춘천의 호수와 가을밤을 배경으로 펼쳐지는 빛 테마 축제입니다.",
      detail:
        "<p>호수 주변 산책로를 따라 계절의 풍경과 어울리는 조명 작품을 만날 수 있습니다.</p><p>저녁 시간에는 소규모 음악회와 야간 체험 프로그램이 진행됩니다.</p>",
      foods: [
        createFood("춘천 닭갈비 골목", "강원특별자치도 춘천시 명동길", "명동 닭갈비골목", "춘천을 대표하는 닭갈비와 막국수를 맛볼 수 있는 음식 거리입니다.", "420", "033-0000-1010"),
        createFood("호수 카페 라운지", "강원특별자치도 춘천시 소양강로", "호수공원 산책로 입구", "호수 풍경을 바라보며 음료와 디저트를 즐길 수 있는 카페입니다.", "760", "033-0000-1011"),
      ],
    },
    eng: {
      sponsor1: "Chuncheon Tourism Division",
      sponsor1tel: "033-0000-0010",
      eventplace: "Plaza in front of Chuncheon Station",
      program: "Lakeside light walk, starlight concert, and night photo zones",
      intro: "A light-themed festival set against Chuncheon's lake and autumn nights.",
      detail:
        "<p>Discover lighting artworks along the lakeside walking trail.</p><p>Small concerts and nighttime activities take place in the evening.</p>",
      foods: [
        createFood("Chuncheon Dakgalbi Street", "Myeongdong-gil, Chuncheon, Gangwon-do", "Myeongdong Dakgalbi Street", "A food street serving Chuncheon's signature spicy chicken and buckwheat noodles.", "420", "033-0000-1010"),
        createFood("Lake Cafe Lounge", "Soyanggang-ro, Chuncheon, Gangwon-do", "Entrance to the lakeside trail", "A cafe serving drinks and desserts with a lake view.", "760", "033-0000-1011"),
      ],
    },
    jpn: {
      sponsor1: "春川市観光課",
      sponsor1tel: "033-0000-0010",
      eventplace: "春川駅前広場",
      program: "湖畔の光散歩、星明かりコンサート、夜のフォトゾーン",
      intro: "春川の湖と秋の夜を背景にした光をテーマにした祭りです。",
      detail:
        "<p>湖周辺の遊歩道で季節の景色に合う照明作品を楽しめます。</p><p>夜には小規模な音楽会と体験プログラムが行われます。</p>",
      foods: [
        createFood("春川タッカルビ通り", "江原特別自治道 春川市 明洞路", "明洞タッカルビ通り", "春川名物のタッカルビとそばを味わえる食の通りです。", "420", "033-0000-1010"),
        createFood("湖カフェラウンジ", "江原特別自治道 春川市 昭陽江路", "湖公園遊歩道入口", "湖の景色を眺めながら飲み物とデザートを楽しめます。", "760", "033-0000-1011"),
      ],
    },
    chn: {
      sponsor1: "春川市旅游科",
      sponsor1tel: "033-0000-0010",
      eventplace: "春川站前广场",
      program: "湖畔灯光漫步、星光音乐会、夜间拍照区",
      intro: "以春川湖泊和秋夜为背景的灯光主题节日。",
      detail:
        "<p>沿湖边步道可以欣赏与季节景色相配的灯光作品。</p><p>夜间还会举办小型音乐会和体验活动。</p>",
      foods: [
        createFood("春川辣炒鸡排街", "江原特别自治道 春川市 明洞路", "明洞辣炒鸡排街", "品尝春川特色辣炒鸡排和荞麦面的美食街。", "420", "033-0000-1010"),
        createFood("湖畔咖啡休息室", "江原特别自治道 春川市 昭阳江路", "湖公园步道入口", "可以一边欣赏湖景一边享用饮料和甜点的咖啡馆。", "760", "033-0000-1011"),
      ],
    },
    fra: {
      sponsor1: "Service du tourisme de Chuncheon",
      sponsor1tel: "033-0000-0010",
      eventplace: "Place devant la gare de Chuncheon",
      program: "Promenade lumineuse au bord du lac, concert étoilé et zones photo nocturnes",
      intro: "Un festival de lumières sur fond de lac et de nuits d'automne à Chuncheon.",
      detail:
        "<p>Découvrez des œuvres lumineuses le long du sentier au bord du lac.</p><p>De petits concerts et des activités nocturnes sont proposés le soir.</p>",
      foods: [
        createFood("Rue du dakgalbi de Chuncheon", "Myeongdong-gil, Chuncheon, Gangwon-do", "Rue du dakgalbi de Myeongdong", "Une rue gourmande où goûter le poulet épicé et les nouilles de sarrasin de Chuncheon.", "420", "033-0000-1010"),
        createFood("Café Lounge du lac", "Soyanggang-ro, Chuncheon, Gangwon-do", "Entrée du sentier du parc du lac", "Un café où déguster boissons et desserts avec vue sur le lac.", "760", "033-0000-1011"),
      ],
    },
    spa: {
      sponsor1: "Departamento de Turismo de Chuncheon",
      sponsor1tel: "033-0000-0010",
      eventplace: "Plaza frente a la estación de Chuncheon",
      program: "Paseo de luces junto al lago, concierto de estrellas y zonas de fotos nocturnas",
      intro: "Un festival de luces ambientado en el lago y las noches otoñales de Chuncheon.",
      detail:
        "<p>Descubre obras luminosas a lo largo del sendero junto al lago.</p><p>Por la noche se ofrecen pequeños conciertos y actividades nocturnas.</p>",
      foods: [
        createFood("Calle Dakgalbi de Chuncheon", "Myeongdong-gil, Chuncheon, Gangwon-do", "Calle Dakgalbi de Myeongdong", "Una calle gastronómica para probar el pollo picante y los fideos de trigo sarraceno de Chuncheon.", "420", "033-0000-1010"),
        createFood("Café Lounge del lago", "Soyanggang-ro, Chuncheon, Gangwon-do", "Entrada del sendero del parque del lago", "Un café para disfrutar de bebidas y postres con vistas al lago.", "760", "033-0000-1011"),
      ],
    },
    rus: {
      sponsor1: "Отдел туризма города Чхунчхон",
      sponsor1tel: "033-0000-0010",
      eventplace: "Площадь перед вокзалом Чхунчхон",
      program: "Световая прогулка у озера, концерт звёздного света и ночные фотозоны",
      intro: "Фестиваль света на фоне озера Чхунчхона и осенних ночей.",
      detail:
        "<p>Вдоль тропы у озера можно увидеть световые произведения, созвучные сезону.</p><p>Вечером проходят небольшие концерты и ночные занятия.</p>",
      foods: [
        createFood("Улица даккальби Чхунчхона", "улица Мёндон, Чхунчхон, Канвондо", "Улица даккальби Мёндона", "Гастрономическая улица с фирменной острой курицей и гречневой лапшой Чхунчхона.", "420", "033-0000-1010"),
        createFood("Кафе у озера", "улица Соянган, Чхунчхон, Канвондо", "Вход на тропу у озёрного парка", "Кафе с напитками и десертами и видом на озеро.", "760", "033-0000-1011"),
      ],
    },
  },
  "mock-festival-018": {
    kor: {
      sponsor1: "제주특별자치도 해양수산과",
      sponsor1tel: "064-0000-0018",
      eventplace: "해녀박물관 일원",
      program: "해녀 문화 전시, 바다 체험, 지역 해산물 시식",
      intro: "제주 해녀의 삶과 바다 문화를 가까이에서 만나는 지역 축제입니다.",
      detail:
        "<p>해녀 문화 전시와 이야기 마당을 통해 제주 바다의 생활 문화를 소개합니다.</p><p>지역 어촌이 준비한 체험과 해산물 시식 프로그램도 함께 운영됩니다.</p>",
      foods: [
        createFood("구좌 해녀의 집", "제주특별자치도 제주시 구좌읍 해맞이해안로", "해녀박물관 해안 인근", "제주 해산물과 전복 요리를 맛볼 수 있는 바닷가 식당입니다.", "380", "064-0000-1010"),
        createFood("월정리 바다식당", "제주특별자치도 제주시 구좌읍 월정리", "월정리 해변 방향", "제주식 식사와 간단한 해산물 메뉴를 제공하는 지역 식당입니다.", "920", "064-0000-1011"),
      ],
    },
    eng: {
      sponsor1: "Jeju Special Self-Governing Province, Fisheries Division",
      sponsor1tel: "064-0000-0018",
      eventplace: "Haenyeo Museum area",
      program: "Haenyeo culture exhibition, sea activities, and local seafood tasting",
      intro: "A local festival offering a close look at the lives of Jeju haenyeo and the culture of the sea.",
      detail:
        "<p>Discover Jeju's coastal life through haenyeo exhibitions and storytelling sessions.</p><p>Activities prepared by local fishing villages and seafood tastings are also available.</p>",
      foods: [
        createFood("Gujwa Haenyeo House", "Haemajihaean-ro, Gujwa-eup, Jeju-si", "Coast near the Haenyeo Museum", "A seaside restaurant serving Jeju seafood and abalone dishes.", "380", "064-0000-1010"),
        createFood("Woljeong-ri Sea Restaurant", "Woljeong-ri, Gujwa-eup, Jeju-si", "Toward Woljeong-ri Beach", "A local restaurant offering Jeju-style meals and simple seafood dishes.", "920", "064-0000-1011"),
      ],
    },
    jpn: {
      sponsor1: "済州特別自治道海洋水産課",
      sponsor1tel: "064-0000-0018",
      eventplace: "海女博物館一帯",
      program: "海女文化展示、海の体験、地域海産物の試食",
      intro: "済州の海女の暮らしと海の文化を身近に感じる地域祭です。",
      detail:
        "<p>海女文化の展示と語りの場を通して済州の海辺の暮らしを紹介します。</p><p>地域の漁村が用意した体験と海産物の試食も行われます。</p>",
      foods: [
        createFood("旧左海女の家", "済州特別自治道 済州市 旧左邑 ヘマジ海岸路", "海女博物館の海岸付近", "済州の海産物とアワビ料理を味わえる海辺の食堂です。", "380", "064-0000-1010"),
        createFood("月汀里海の食堂", "済州特別自治道 済州市 旧左邑 月汀里", "月汀里海岸方面", "済州料理と簡単な海産物メニューを提供する地域食堂です。", "920", "064-0000-1011"),
      ],
    },
    chn: {
      sponsor1: "济州特别自治道海洋水产科",
      sponsor1tel: "064-0000-0018",
      eventplace: "海女博物馆一带",
      program: "海女文化展览、海洋体验、地方海鲜品尝",
      intro: "近距离了解济州海女生活与海洋文化的地方节日。",
      detail:
        "<p>通过海女文化展览和故事分享了解济州海边的生活文化。</p><p>还提供当地渔村准备的体验活动和海鲜品尝。</p>",
      foods: [
        createFood("旧左海女之家", "济州特别自治道 济州市 旧左邑 迎日海岸路", "海女博物馆海岸附近", "可以品尝济州海鲜和鲍鱼料理的海边餐厅。", "380", "064-0000-1010"),
        createFood("月汀里海边餐厅", "济州特别自治道 济州市 旧左邑 月汀里", "月汀里海滩方向", "提供济州风味餐食和简单海鲜菜单的地方餐厅。", "920", "064-0000-1011"),
      ],
    },
    fra: {
      sponsor1: "Service des affaires maritimes et halieutiques de Jeju",
      sponsor1tel: "064-0000-0018",
      eventplace: "Environs du musée des haenyeo",
      program: "Exposition sur la culture haenyeo, activités marines et dégustation de fruits de mer",
      intro: "Un festival local pour découvrir de près la vie des haenyeo de Jeju et la culture de la mer.",
      detail:
        "<p>Les expositions et les récits de haenyeo présentent la vie côtière de Jeju.</p><p>Des activités préparées par les villages de pêcheurs et des dégustations sont également proposées.</p>",
      foods: [
        createFood("Maison des haenyeo de Gujwa", "Haemajihaean-ro, Gujwa-eup, Jeju-si", "Côte près du musée des haenyeo", "Un restaurant de bord de mer qui sert fruits de mer et ormeaux de Jeju.", "380", "064-0000-1010"),
        createFood("Restaurant de la mer de Woljeong-ri", "Woljeong-ri, Gujwa-eup, Jeju-si", "Vers la plage de Woljeong-ri", "Un restaurant local proposant des plats de Jeju et des fruits de mer simples.", "920", "064-0000-1011"),
      ],
    },
    spa: {
      sponsor1: "División de Asuntos Marítimos y Pesqueros de Jeju",
      sponsor1tel: "064-0000-0018",
      eventplace: "Zona del Museo Haenyeo",
      program: "Exposición de la cultura haenyeo, actividades marinas y degustación de mariscos",
      intro: "Un festival local para conocer de cerca la vida de las haenyeo de Jeju y la cultura del mar.",
      detail:
        "<p>Las exposiciones y relatos sobre las haenyeo presentan la vida costera de Jeju.</p><p>También hay actividades preparadas por aldeas pesqueras locales y degustaciones de mariscos.</p>",
      foods: [
        createFood("Casa Haenyeo de Gujwa", "Haemajihaean-ro, Gujwa-eup, Jeju-si", "Costa cerca del Museo Haenyeo", "Un restaurante junto al mar con mariscos y platos de abulón de Jeju.", "380", "064-0000-1010"),
        createFood("Restaurante del mar de Woljeong-ri", "Woljeong-ri, Gujwa-eup, Jeju-si", "Hacia la playa de Woljeong-ri", "Un restaurante local con comida al estilo de Jeju y platos sencillos de marisco.", "920", "064-0000-1011"),
      ],
    },
    rus: {
      sponsor1: "Отдел морского хозяйства и рыболовства провинции Чеджу",
      sponsor1tel: "064-0000-0018",
      eventplace: "Район музея хэнё",
      program: "Выставка культуры хэнё, морские занятия и дегустация местных морепродуктов",
      intro: "Местный фестиваль, знакомящий с жизнью хэнё Чеджу и морской культурой.",
      detail:
        "<p>На выставках и встречах с рассказами представлена повседневная культура побережья Чеджу.</p><p>Также проходят занятия от рыбацких деревень и дегустации морепродуктов.</p>",
      foods: [
        createFood("Дом хэнё Куджва", "улица Хэмаджихэан, волость Куджва, Чеджу", "Побережье рядом с музеем хэнё", "Ресторан у моря с морепродуктами и блюдами из морского ушка Чеджу.", "380", "064-0000-1010"),
        createFood("Морской ресторан Вольчжонни", "Вольчонни, волость Куджва, Чеджу", "В сторону пляжа Вольчонни", "Местный ресторан с блюдами Чеджу и простыми блюдами из морепродуктов.", "920", "064-0000-1011"),
      ],
    },
  },
};

function createFallbackMetadata(
  festival: FestivalBase,
  lang: FestivalSearchLanguage,
): FestivalDetailMetadata {
  const localizedFestival = getLocalizedFestival(festival, lang);
  const common = festivalDetailCommonLocales[lang];
  const venue = localizedFestival.addr2 || localizedFestival.addr1;
  const phone = localizedFestival.tel || "02-0000-0000";
  const overview =
    localizedFestival.overview ||
    `${localizedFestival.title}${common.introSuffix}`;

  return {
    sponsor1: common.fallbackSponsor,
    sponsor1tel: phone,
    eventplace: venue,
    program: `${localizedFestival.title} ${common.programSuffix}`,
    intro: overview,
    detail: `<p>${localizedFestival.title}${common.detailPrefix}</p><p>${common.detailSuffix}</p>`,
    foods: [
      createFood(
        `${venue}${common.foodTitleSuffix}`,
        localizedFestival.addr1,
        venue,
        `${localizedFestival.title} ${common.foodOverview}`,
        "450",
        phone,
      ),
      createFood(
        `${localizedFestival.title}${common.foodMarketTitle}`,
        localizedFestival.addr1,
        venue,
        common.foodMarketOverview,
        "820",
        phone,
      ),
    ],
  };
}

export function getFestivalDetailMetadata(
  festival: FestivalBase,
  lang: string | null | undefined = "kor",
) {
  const language = resolveFestivalLanguage(lang);
  const localizedMetadata = festivalDetailMetadataLocales[festival.contentid];

  return (
    localizedMetadata?.[language] ??
    localizedMetadata?.kor ??
    createFallbackMetadata(festival, language)
  );
}
