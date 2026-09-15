import type { FestivalSearchLanguage } from "./festivalSearchAliases";
import type { FestivalContentId } from "./festivals";

export type FestivalLocalizedFields = {
  title: string;
  addr1: string;
  addr2: string;
  overview: string;
};

type FestivalLocaleMap = Record<
  FestivalSearchLanguage,
  FestivalLocalizedFields
>;

export const festivalLocales = {
  "mock-festival-001": {
    kor: {
      title: "서울빛축제",
      addr1: "서울특별시 중구 세종대로",
      addr2: "서울광장",
      overview: "도심의 밤을 빛으로 채우는 서울 대표 야간 문화축제입니다.",
    },
    eng: {
      title: "Seoul Light Festival",
      addr1: "Sejong-daero, Jung-gu, Seoul",
      addr2: "Seoul Plaza",
      overview:
        "A signature nighttime cultural festival that fills downtown Seoul with light.",
    },
    jpn: {
      title: "ソウル光祭り",
      addr1: "ソウル特別市 中区 世宗大路",
      addr2: "ソウル広場",
      overview: "都心の夜を光で彩るソウルを代表する夜間文化祭です。",
    },
    chn: {
      title: "首尔灯光节",
      addr1: "首尔特别市 中区 世宗大路",
      addr2: "首尔广场",
      overview: "用灯光点亮首尔市中心夜晚的代表性夜间文化节。",
    },
    fra: {
      title: "Festival des lumières de Séoul",
      addr1: "Sejong-daero, Jung-gu, Séoul",
      addr2: "Place de Séoul",
      overview:
        "Un grand festival culturel nocturne qui illumine le centre de Séoul.",
    },
    spa: {
      title: "Festival de luces de Seúl",
      addr1: "Sejong-daero, Jung-gu, Seúl",
      addr2: "Plaza de Seúl",
      overview:
        "Un festival cultural nocturno que llena de luz el centro de Seúl.",
    },
    rus: {
      title: "Фестиваль света в Сеуле",
      addr1: "улица Седжон-даэро, район Чунгу, Сеул",
      addr2: "Сеульская площадь",
      overview:
        "Главный ночной культурный фестиваль Сеула, который наполняет центр города светом.",
    },
  },
  "mock-festival-002": {
    kor: {
      title: "부산바다예술제",
      addr1: "부산광역시 해운대구 해운대해변로",
      addr2: "해운대해수욕장",
      overview: "해변과 예술이 만나는 부산의 가을 바다 문화축제입니다.",
    },
    eng: {
      title: "Busan Sea Art Festival",
      addr1: "Haeundae Beach Road, Haeundae-gu, Busan",
      addr2: "Haeundae Beach",
      overview:
        "A Busan autumn seaside festival where the beach meets contemporary art.",
    },
    jpn: {
      title: "釜山海の芸術祭",
      addr1: "釜山広域市 海雲台区 海雲台海辺路",
      addr2: "海雲台海水浴場",
      overview: "海辺と芸術が出会う釜山の秋の海文化祭です。",
    },
    chn: {
      title: "釜山海洋艺术节",
      addr1: "釜山广域市 海云台区 海云台海边路",
      addr2: "海云台海水浴场",
      overview: "在釜山秋日海边感受海滩与艺术相遇的文化节。",
    },
    fra: {
      title: "Festival des arts de la mer de Busan",
      addr1: "Haeundae Beach Road, Haeundae-gu, Busan",
      addr2: "Plage de Haeundae",
      overview:
        "Un festival culturel maritime d'automne où la plage rencontre l'art à Busan.",
    },
    spa: {
      title: "Festival de arte del mar de Busan",
      addr1: "Haeundae Beach Road, Haeundae-gu, Busan",
      addr2: "Playa de Haeundae",
      overview:
        "Un festival cultural marítimo de otoño donde la playa se encuentra con el arte en Busan.",
    },
    rus: {
      title: "Фестиваль морского искусства в Пусане",
      addr1: "улица Хэундэ-хэбёнро, район Хэундэ, Пусан",
      addr2: "Пляж Хэундэ",
      overview:
        "Осенний морской культурный фестиваль Пусана, где встречаются пляж и искусство.",
    },
  },
  "mock-festival-003": {
    kor: {
      title: "인천개항문화축제",
      addr1: "인천광역시 중구 차이나타운로",
      addr2: "개항장 문화지구",
      overview: "개항장의 역사와 현재를 함께 즐기는 거리 문화축제입니다.",
    },
    eng: {
      title: "Incheon Open Port Culture Festival",
      addr1: "Chinatown-ro, Jung-gu, Incheon",
      addr2: "Open Port Cultural District",
      overview:
        "A street culture festival where visitors experience the history and present of Incheon's open port.",
    },
    jpn: {
      title: "仁川開港文化祭",
      addr1: "仁川広域市 中区 チャイナタウン路",
      addr2: "開港場文化地区",
      overview: "開港場の歴史と現在を一緒に楽しむストリート文化祭です。",
    },
    chn: {
      title: "仁川开港文化节",
      addr1: "仁川广域市 中区 唐人街路",
      addr2: "开港场文化区",
      overview: "在街头文化节中一起感受开港场的历史与现在。",
    },
    fra: {
      title: "Festival culturel du port ouvert d'Incheon",
      addr1: "Chinatown-ro, Jung-gu, Incheon",
      addr2: "Quartier culturel du port ouvert",
      overview:
        "Un festival de rue qui fait découvrir l'histoire et le présent du port ouvert d'Incheon.",
    },
    spa: {
      title: "Festival cultural del puerto abierto de Incheon",
      addr1: "Chinatown-ro, Jung-gu, Incheon",
      addr2: "Distrito cultural del puerto abierto",
      overview:
        "Un festival callejero para conocer la historia y el presente del puerto abierto de Incheon.",
    },
    rus: {
      title: "Культурный фестиваль открытого порта Инчхона",
      addr1: "улица Чайна-таун, район Чунгу, Инчхон",
      addr2: "Культурный квартал открытого порта",
      overview:
        "Уличный культурный фестиваль, знакомящий с историей и настоящим открытого порта Инчхона.",
    },
  },
  "mock-festival-004": {
    kor: {
      title: "대전사이언스페스티벌",
      addr1: "대전광역시 유성구 대덕대로",
      addr2: "엑스포시민광장",
      overview: "과학 체험과 공연을 한자리에서 만나는 가족 축제입니다.",
    },
    eng: {
      title: "Daejeon Science Festival",
      addr1: "Daedeok-daero, Yuseong-gu, Daejeon",
      addr2: "Expo Citizen Plaza",
      overview:
        "A family festival bringing science experiences and performances together.",
    },
    jpn: {
      title: "大田サイエンスフェスティバル",
      addr1: "大田広域市 儒城区 大徳大路",
      addr2: "エキスポ市民広場",
      overview: "科学体験と公演を一度に楽しめる家族向けの祭りです。",
    },
    chn: {
      title: "大田科学节",
      addr1: "大田广域市 儒城区 大德大路",
      addr2: "世博市民广场",
      overview: "在同一场地体验科学活动并欣赏演出的家庭节日。",
    },
    fra: {
      title: "Festival des sciences de Daejeon",
      addr1: "Daedeok-daero, Yuseong-gu, Daejeon",
      addr2: "Place citoyenne de l'Expo",
      overview:
        "Un festival familial qui réunit expériences scientifiques et spectacles.",
    },
    spa: {
      title: "Festival de ciencia de Daejeon",
      addr1: "Daedeok-daero, Yuseong-gu, Daejeon",
      addr2: "Plaza Ciudadana de la Expo",
      overview:
        "Un festival familiar que reúne experiencias científicas y espectáculos.",
    },
    rus: {
      title: "Научный фестиваль Тэджона",
      addr1: "улица Тэдок-даэро, район Юсон, Тэджон",
      addr2: "Гражданская площадь Экспо",
      overview:
        "Семейный фестиваль, объединяющий научные эксперименты и представления.",
    },
  },
  "mock-festival-005": {
    kor: {
      title: "대구도심음악축제",
      addr1: "대구광역시 달서구 두류공원로",
      addr2: "두류공원",
      overview: "도심 곳곳에서 다양한 장르의 음악을 즐기는 시민 축제입니다.",
    },
    eng: {
      title: "Daegu Downtown Music Festival",
      addr1: "Duryu Park Road, Dalseo-gu, Daegu",
      addr2: "Duryu Park",
      overview:
        "A civic festival where visitors enjoy music in many genres throughout the city.",
    },
    jpn: {
      title: "大邱都心音楽祭",
      addr1: "大邱広域市 達西区 頭流公園路",
      addr2: "頭流公園",
      overview: "都心の各所でさまざまなジャンルの音楽を楽しむ市民祭です。",
    },
    chn: {
      title: "大邱市中心音乐节",
      addr1: "大邱广域市 达西区 头流公园路",
      addr2: "头流公园",
      overview: "在城市各处欣赏多种音乐类型的市民节日。",
    },
    fra: {
      title: "Festival de musique du centre de Daegu",
      addr1: "Duryu Park Road, Dalseo-gu, Daegu",
      addr2: "Parc Duryu",
      overview:
        "Un festival citoyen qui permet de découvrir de nombreux genres musicaux dans la ville.",
    },
    spa: {
      title: "Festival de música del centro de Daegu",
      addr1: "Duryu Park Road, Dalseo-gu, Daegu",
      addr2: "Parque Duryu",
      overview:
        "Un festival ciudadano para disfrutar de diversos géneros musicales por toda la ciudad.",
    },
    rus: {
      title: "Музыкальный фестиваль в центре Тэгу",
      addr1: "улица парка Турыу, район Тальсо, Тэгу",
      addr2: "Парк Турыу",
      overview:
        "Городской фестиваль с музыкой разных жанров в разных уголках города.",
    },
  },
  "mock-festival-006": {
    kor: {
      title: "광주거리예술축제",
      addr1: "광주광역시 북구 비엔날레로",
      addr2: "광주비엔날레전시관",
      overview: "거리 공연과 전시를 자유롭게 만날 수 있는 예술 축제입니다.",
    },
    eng: {
      title: "Gwangju Street Arts Festival",
      addr1: "Biennale-ro, Buk-gu, Gwangju",
      addr2: "Gwangju Biennale Exhibition Hall",
      overview:
        "An arts festival where visitors can freely encounter street performances and exhibitions.",
    },
    jpn: {
      title: "光州ストリートアートフェスティバル",
      addr1: "光州広域市 北区 ビエンナーレ路",
      addr2: "光州ビエンナーレ展示館",
      overview: "ストリート公演と展示に自由に出会える芸術祭です。",
    },
    chn: {
      title: "光州街头艺术节",
      addr1: "光州广域市 北区 双年展路",
      addr2: "光州双年展展馆",
      overview: "可以自由欣赏街头演出和展览的艺术节。",
    },
    fra: {
      title: "Festival des arts de rue de Gwangju",
      addr1: "Biennale-ro, Buk-gu, Gwangju",
      addr2: "Hall d'exposition de la Biennale de Gwangju",
      overview:
        "Un festival artistique où l'on découvre librement spectacles de rue et expositions.",
    },
    spa: {
      title: "Festival de artes callejeras de Gwangju",
      addr1: "Biennale-ro, Buk-gu, Gwangju",
      addr2: "Sala de exposiciones de la Bienal de Gwangju",
      overview:
        "Un festival de arte para descubrir libremente espectáculos callejeros y exposiciones.",
    },
    rus: {
      title: "Фестиваль уличного искусства Кванджу",
      addr1: "улица Бьеннале, район Пукку, Кванджу",
      addr2: "Выставочный зал биеннале Кванджу",
      overview:
        "Фестиваль искусства, где можно свободно увидеть уличные выступления и выставки.",
    },
  },
  "mock-festival-007": {
    kor: {
      title: "울산고래문화축제",
      addr1: "울산광역시 남구 장생포고래로",
      addr2: "장생포 고래문화마을",
      overview: "장생포의 바다 이야기와 체험을 만나는 해양 문화축제입니다.",
    },
    eng: {
      title: "Ulsan Whale Culture Festival",
      addr1: "Jangsaengpo Whale Road, Nam-gu, Ulsan",
      addr2: "Jangsaengpo Whale Culture Village",
      overview:
        "A marine culture festival featuring Jangsaengpo's stories of the sea and hands-on activities.",
    },
    jpn: {
      title: "蔚山クジラ文化祭",
      addr1: "蔚山広域市 南区 長生浦クジラ路",
      addr2: "長生浦クジラ文化村",
      overview: "長生浦の海の物語と体験に出会う海洋文化祭です。",
    },
    chn: {
      title: "蔚山鲸鱼文化节",
      addr1: "蔚山广域市 南区 长生浦鲸鱼路",
      addr2: "长生浦鲸鱼文化村",
      overview: "通过体验活动感受长生浦海洋故事的海洋文化节。",
    },
    fra: {
      title: "Festival de la culture de la baleine d'Ulsan",
      addr1: "Jangsaengpo Whale Road, Nam-gu, Ulsan",
      addr2: "Village culturel de la baleine de Jangsaengpo",
      overview:
        "Un festival maritime consacré aux récits de la mer et aux expériences de Jangsaengpo.",
    },
    spa: {
      title: "Festival de la cultura de las ballenas de Ulsan",
      addr1: "Jangsaengpo Whale Road, Nam-gu, Ulsan",
      addr2: "Pueblo cultural de ballenas de Jangsaengpo",
      overview:
        "Un festival marítimo con historias del mar y actividades prácticas en Jangsaengpo.",
    },
    rus: {
      title: "Фестиваль культуры китов в Ульсане",
      addr1: "улица Чансэнпхо-когорэ, район Намгу, Ульсан",
      addr2: "Культурная деревня китов Чансэнпхо",
      overview:
        "Морской культурный фестиваль с историями моря и практическими занятиями в Чансэнпхо.",
    },
  },
  "mock-festival-008": {
    kor: {
      title: "세종호수공원음악축제",
      addr1: "세종특별자치시 연기면 세종호수공원길",
      addr2: "세종호수공원",
      overview: "호수의 풍경과 함께 즐기는 야외 음악과 문화 프로그램입니다.",
    },
    eng: {
      title: "Sejong Lake Park Music Festival",
      addr1: "Sejong Lake Park Road, Yeongi-myeon, Sejong",
      addr2: "Sejong Lake Park",
      overview:
        "Outdoor music and cultural programs enjoyed alongside the lake scenery.",
    },
    jpn: {
      title: "世宗湖公園音楽祭",
      addr1: "世宗特別自治市 燕岐面 世宗湖公園路",
      addr2: "世宗湖公園",
      overview: "湖の景色とともに楽しむ屋外音楽と文化プログラムです。",
    },
    chn: {
      title: "世宗湖公园音乐节",
      addr1: "世宗特别自治市 燕岐面 世宗湖公园路",
      addr2: "世宗湖公园",
      overview: "伴着湖景欣赏户外音乐和文化活动。",
    },
    fra: {
      title: "Festival de musique du parc du lac de Sejong",
      addr1: "Sejong Lake Park Road, Yeongi-myeon, Sejong",
      addr2: "Parc du lac de Sejong",
      overview:
        "Des programmes musicaux et culturels en plein air à apprécier au bord du lac.",
    },
    spa: {
      title: "Festival de música del parque del lago de Sejong",
      addr1: "Sejong Lake Park Road, Yeongi-myeon, Sejong",
      addr2: "Parque del lago de Sejong",
      overview:
        "Programas musicales y culturales al aire libre para disfrutar junto al lago.",
    },
    rus: {
      title: "Музыкальный фестиваль у озера Седжон",
      addr1: "дорога парка озера Седжон, волость Ёнги, Седжон",
      addr2: "Парк озера Седжон",
      overview:
        "Музыкальные и культурные программы на открытом воздухе на фоне озера.",
    },
  },
  "mock-festival-009": {
    kor: {
      title: "수원화성문화제",
      addr1: "경기도 수원시 팔달구 정조로",
      addr2: "수원화성행궁",
      overview: "수원화성의 역사와 전통 공연을 함께 즐기는 문화축제입니다.",
    },
    eng: {
      title: "Suwon Hwaseong Cultural Festival",
      addr1: "Jeongjo-ro, Paldal-gu, Suwon, Gyeonggi-do",
      addr2: "Suwon Hwaseong Haenggung",
      overview:
        "A cultural festival combining the history of Suwon Hwaseong with traditional performances.",
    },
    jpn: {
      title: "水原華城文化祭",
      addr1: "京畿道 水原市 八達区 正祖路",
      addr2: "水原華城行宮",
      overview: "水原華城の歴史と伝統公演を一緒に楽しむ文化祭です。",
    },
    chn: {
      title: "水原华城文化节",
      addr1: "京畿道 水原市 八达区 正祖路",
      addr2: "水原华城行宫",
      overview: "结合水原华城历史与传统演出的文化节。",
    },
    fra: {
      title: "Festival culturel de Hwaseong à Suwon",
      addr1: "Jeongjo-ro, Paldal-gu, Suwon, Gyeonggi-do",
      addr2: "Haenggung de Suwon Hwaseong",
      overview:
        "Un festival culturel qui associe l'histoire de Suwon Hwaseong à des spectacles traditionnels.",
    },
    spa: {
      title: "Festival cultural de Hwaseong en Suwon",
      addr1: "Jeongjo-ro, Paldal-gu, Suwon, Gyeonggi-do",
      addr2: "Haenggung de Suwon Hwaseong",
      overview:
        "Un festival cultural que combina la historia de Suwon Hwaseong con espectáculos tradicionales.",
    },
    rus: {
      title: "Культурный фестиваль Хвасон в Сувоне",
      addr1: "улица Чонджо, район Пхальдаль, Сувон, Кёнгидо",
      addr2: "Дворец Хэнгун Сувон Хвасон",
      overview:
        "Культурный фестиваль, объединяющий историю Сувон Хвасон и традиционные выступления.",
    },
  },
  "mock-festival-010": {
    kor: {
      title: "춘천호수별빛축제",
      addr1: "강원특별자치도 춘천시 춘천로",
      addr2: "춘천역 앞 광장",
      overview: "춘천의 호수와 가을밤을 배경으로 펼쳐지는 빛 축제입니다.",
    },
    eng: {
      title: "Chuncheon Lake Starlight Festival",
      addr1: "Chuncheon-ro, Chuncheon, Gangwon-do",
      addr2: "Plaza in front of Chuncheon Station",
      overview:
        "A light festival set against Chuncheon's lake and autumn night scenery.",
    },
    jpn: {
      title: "春川湖星明かり祭り",
      addr1: "江原特別自治道 春川市 春川路",
      addr2: "春川駅前広場",
      overview: "春川の湖と秋の夜を背景に開かれる光の祭りです。",
    },
    chn: {
      title: "春川湖畔星光节",
      addr1: "江原特别自治道 春川市 春川路",
      addr2: "春川站前广场",
      overview: "以春川湖泊和秋夜景色为背景举办的灯光节。",
    },
    fra: {
      title: "Festival des étoiles du lac de Chuncheon",
      addr1: "Chuncheon-ro, Chuncheon, Gangwon-do",
      addr2: "Place devant la gare de Chuncheon",
      overview:
        "Un festival de lumières sur fond de lac et de nuits d'automne à Chuncheon.",
    },
    spa: {
      title: "Festival de luces del lago de Chuncheon",
      addr1: "Chuncheon-ro, Chuncheon, Gangwon-do",
      addr2: "Plaza frente a la estación de Chuncheon",
      overview:
        "Un festival de luces ambientado en el lago y las noches otoñales de Chuncheon.",
    },
    rus: {
      title: "Фестиваль звёздного света у озера Чхунчхон",
      addr1: "улица Чхунчхон, Чхунчхон, Канвондо",
      addr2: "Площадь перед вокзалом Чхунчхон",
      overview:
        "Фестиваль света на фоне озера Чхунчхона и осенней ночи.",
    },
  },
  "mock-festival-011": {
    kor: {
      title: "청주직지문화제",
      addr1: "충청북도 청주시 흥덕구 직지대로",
      addr2: "청주고인쇄박물관",
      overview: "기록문화와 시민 체험을 연결하는 인쇄문화 축제입니다.",
    },
    eng: {
      title: "Cheongju Jikji Culture Festival",
      addr1: "Jikji-daero, Heungdeok-gu, Cheongju",
      addr2: "Cheongju Early Printing Museum",
      overview:
        "A printing culture festival connecting the heritage of records with civic experiences.",
    },
    jpn: {
      title: "清州直指文化祭",
      addr1: "忠清北道 清州市 興徳区 直指大路",
      addr2: "清州古印刷博物館",
      overview: "記録文化と市民体験をつなぐ印刷文化祭です。",
    },
    chn: {
      title: "清州直指文化节",
      addr1: "忠清北道 清州市 兴德区 直指大路",
      addr2: "清州古印刷博物馆",
      overview: "连接记录文化与市民体验的印刷文化节。",
    },
    fra: {
      title: "Festival culturel Jikji de Cheongju",
      addr1: "Jikji-daero, Heungdeok-gu, Cheongju",
      addr2: "Musée de l'ancienne imprimerie de Cheongju",
      overview:
        "Un festival de l'imprimerie qui relie la culture écrite aux expériences citoyennes.",
    },
    spa: {
      title: "Festival cultural Jikji de Cheongju",
      addr1: "Jikji-daero, Heungdeok-gu, Cheongju",
      addr2: "Museo de la Imprenta Antigua de Cheongju",
      overview:
        "Un festival de la cultura impresa que conecta la tradición escrita con experiencias ciudadanas.",
    },
    rus: {
      title: "Культурный фестиваль Чикчи в Чхонджу",
      addr1: "улица Чикчи-даэро, район Хындок, Чхонджу",
      addr2: "Музей древней печати Чхонджу",
      overview:
        "Фестиваль печатной культуры, соединяющий письменное наследие и занятия для горожан.",
    },
  },
  "mock-festival-012": {
    kor: {
      title: "공주백제문화제",
      addr1: "충청남도 공주시 웅진로",
      addr2: "공산성 일원",
      overview: "백제의 역사와 문화를 공연과 체험으로 만나는 축제입니다.",
    },
    eng: {
      title: "Gongju Baekje Culture Festival",
      addr1: "Ungjin-ro, Gongju, Chungcheongnam-do",
      addr2: "Gongsanseong Fortress area",
      overview:
        "A festival where visitors discover Baekje history and culture through performances and activities.",
    },
    jpn: {
      title: "公州百済文化祭",
      addr1: "忠清南道 公州市 熊津路",
      addr2: "公山城一帯",
      overview: "公演と体験を通して百済の歴史と文化に出会う祭りです。",
    },
    chn: {
      title: "公州百济文化节",
      addr1: "忠清南道 公州市 熊津路",
      addr2: "公山城一带",
      overview: "通过演出和体验活动了解百济历史与文化的节日。",
    },
    fra: {
      title: "Festival culturel de Baekje à Gongju",
      addr1: "Ungjin-ro, Gongju, Chungcheongnam-do",
      addr2: "Environs de la forteresse de Gongsanseong",
      overview:
        "Un festival pour découvrir l'histoire et la culture de Baekje grâce aux spectacles et aux activités.",
    },
    spa: {
      title: "Festival cultural de Baekje en Gongju",
      addr1: "Ungjin-ro, Gongju, Chungcheongnam-do",
      addr2: "Zona de la fortaleza de Gongsanseong",
      overview:
        "Un festival para conocer la historia y la cultura de Baekje mediante espectáculos y actividades.",
    },
    rus: {
      title: "Культурный фестиваль Пэкче в Кончжу",
      addr1: "улица Унджин, Кончжу, Чхунчхон-намдо",
      addr2: "Район крепости Консансон",
      overview:
        "Фестиваль, знакомящий с историей и культурой Пэкче через представления и занятия.",
    },
  },
  "mock-festival-013": {
    kor: {
      title: "경주신라문화제",
      addr1: "경상북도 경주시 첨성로",
      addr2: "황리단길 및 대릉원 일원",
      overview: "천년 고도 경주의 역사와 전통을 현대적으로 즐기는 축제입니다.",
    },
    eng: {
      title: "Gyeongju Silla Culture Festival",
      addr1: "Cheomseong-ro, Gyeongju, Gyeongsangbuk-do",
      addr2: "Hwangnidan-gil and Daereungwon area",
      overview:
        "A festival offering a modern way to enjoy the history and traditions of thousand-year-old Gyeongju.",
    },
    jpn: {
      title: "慶州新羅文化祭",
      addr1: "慶尚北道 慶州市 瞻星路",
      addr2: "皇理団通り・大陵苑一帯",
      overview: "千年古都慶州の歴史と伝統を現代的に楽しむ祭りです。",
    },
    chn: {
      title: "庆州新罗文化节",
      addr1: "庆尚北道 庆州市 瞻星路",
      addr2: "皇理团路及大陵苑一带",
      overview: "以现代方式体验千年古都庆州历史与传统的节日。",
    },
    fra: {
      title: "Festival culturel Silla de Gyeongju",
      addr1: "Cheomseong-ro, Gyeongju, Gyeongsangbuk-do",
      addr2: "Hwangnidan-gil et environs de Daereungwon",
      overview:
        "Un festival pour découvrir autrement l'histoire et les traditions de Gyeongju, ville millénaire.",
    },
    spa: {
      title: "Festival cultural Silla de Gyeongju",
      addr1: "Cheomseong-ro, Gyeongju, Gyeongsangbuk-do",
      addr2: "Hwangnidan-gil y zona de Daereungwon",
      overview:
        "Un festival para disfrutar de forma moderna de la historia y las tradiciones de la milenaria Gyeongju.",
    },
    rus: {
      title: "Культурный фестиваль Силла в Кёнджу",
      addr1: "улица Чхомсон, Кёнджу, Кёнсан-пукто",
      addr2: "улица Хваннидан и район Тэрынвон",
      overview:
        "Фестиваль, позволяющий по-современному познакомиться с историей и традициями тысячелетнего Кёнджу.",
    },
  },
  "mock-festival-014": {
    kor: {
      title: "진주남강유등축제",
      addr1: "경상남도 진주시 남강로",
      addr2: "진주성 및 남강변",
      overview: "남강을 수놓은 등불과 함께하는 진주의 대표 야간 축제입니다.",
    },
    eng: {
      title: "Jinju Namgang Lantern Festival",
      addr1: "Namgang-ro, Jinju, Gyeongsangnam-do",
      addr2: "Jinjuseong Fortress and Namgang riverside",
      overview:
        "Jinju's signature nighttime festival featuring lanterns across the Namgang River.",
    },
    jpn: {
      title: "晋州南江灯祭り",
      addr1: "慶尚南道 晋州市 南江路",
      addr2: "晋州城と南江沿い",
      overview: "南江を彩る灯りとともに楽しむ晋州を代表する夜間祭です。",
    },
    chn: {
      title: "晋州南江灯笼节",
      addr1: "庆尚南道 晋州市 南江路",
      addr2: "晋州城及南江沿岸",
      overview: "灯笼装点南江的晋州代表性夜间节日。",
    },
    fra: {
      title: "Festival des lanternes de Namgang à Jinju",
      addr1: "Namgang-ro, Jinju, Gyeongsangnam-do",
      addr2: "Forteresse de Jinjuseong et rives du Namgang",
      overview:
        "Le grand festival nocturne de Jinju, avec des lanternes qui illuminent le fleuve Namgang.",
    },
    spa: {
      title: "Festival de faroles de Namgang en Jinju",
      addr1: "Namgang-ro, Jinju, Gyeongsangnam-do",
      addr2: "Fortaleza de Jinjuseong y ribera del Namgang",
      overview:
        "El gran festival nocturno de Jinju, con faroles que adornan el río Namgang.",
    },
    rus: {
      title: "Фестиваль фонарей Намган в Чинджу",
      addr1: "улица Намган, Чинджу, Кёнсан-намдо",
      addr2: "Крепость Чинджусон и берег Намгана",
      overview:
        "Главный ночной фестиваль Чинджу с фонарями, украшающими реку Намган.",
    },
  },
  "mock-festival-015": {
    kor: {
      title: "전주한옥마을문화축제",
      addr1: "전북특별자치도 전주시 완산구 태조로",
      addr2: "전주한옥마을",
      overview: "한옥마을의 전통과 지역 예술을 함께 만나는 문화축제입니다.",
    },
    eng: {
      title: "Jeonju Hanok Village Culture Festival",
      addr1: "Taejo-ro, Wansan-gu, Jeonju",
      addr2: "Jeonju Hanok Village",
      overview:
        "A cultural festival where visitors meet the traditions and local arts of the hanok village.",
    },
    jpn: {
      title: "全州韓屋村文化祭",
      addr1: "全北特別自治道 全州市 完山区 太祖路",
      addr2: "全州韓屋村",
      overview: "韓屋村の伝統と地域芸術に出会う文化祭です。",
    },
    chn: {
      title: "全州韩屋村文化节",
      addr1: "全北特别自治道 全州市 完山区 太祖路",
      addr2: "全州韩屋村",
      overview: "体验韩屋村传统与地方艺术的文化节。",
    },
    fra: {
      title: "Festival culturel du village hanok de Jeonju",
      addr1: "Taejo-ro, Wansan-gu, Jeonju",
      addr2: "Village hanok de Jeonju",
      overview:
        "Un festival culturel à la rencontre des traditions et des arts locaux du village hanok.",
    },
    spa: {
      title: "Festival cultural de la aldea hanok de Jeonju",
      addr1: "Taejo-ro, Wansan-gu, Jeonju",
      addr2: "Aldea hanok de Jeonju",
      overview:
        "Un festival cultural para conocer las tradiciones y el arte local de la aldea hanok.",
    },
    rus: {
      title: "Культурный фестиваль деревни ханок Чонджу",
      addr1: "улица Тэджо, район Вансан, Чонджу",
      addr2: "Деревня ханок Чонджу",
      overview:
        "Культурный фестиваль, знакомящий с традициями и местным искусством деревни ханок.",
    },
  },
  "mock-festival-016": {
    kor: {
      title: "여수밤바다불꽃축제",
      addr1: "전라남도 여수시 이순신광장로",
      addr2: "여수해양공원",
      overview: "여수 밤바다와 불꽃 공연을 즐기는 해양 관광축제입니다.",
    },
    eng: {
      title: "Yeosu Night Sea Fireworks Festival",
      addr1: "Yi Sun-sin Square Road, Yeosu, Jeollanam-do",
      addr2: "Yeosu Marine Park",
      overview:
        "A marine tourism festival featuring Yeosu's night sea and spectacular fireworks.",
    },
    jpn: {
      title: "麗水夜の海花火祭り",
      addr1: "全羅南道 麗水市 李舜臣広場路",
      addr2: "麗水海洋公園",
      overview: "麗水の夜の海と花火公演を楽しむ海洋観光祭です。",
    },
    chn: {
      title: "丽水夜海烟花节",
      addr1: "全罗南道 丽水市 李舜臣广场路",
      addr2: "丽水海洋公园",
      overview: "欣赏丽水夜海与烟花表演的海洋旅游节。",
    },
    fra: {
      title: "Festival des feux d'artifice de la mer nocturne de Yeosu",
      addr1: "Yi Sun-sin Square Road, Yeosu, Jeollanam-do",
      addr2: "Parc marin de Yeosu",
      overview:
        "Un festival touristique maritime avec la mer nocturne de Yeosu et un spectacle pyrotechnique.",
    },
    spa: {
      title: "Festival de fuegos artificiales del mar nocturno de Yeosu",
      addr1: "Yi Sun-sin Square Road, Yeosu, Jeollanam-do",
      addr2: "Parque Marino de Yeosu",
      overview:
        "Un festival turístico marítimo con el mar nocturno de Yeosu y un espectáculo de fuegos artificiales.",
    },
    rus: {
      title: "Фестиваль фейерверков на ночном море Ёсу",
      addr1: "улица площади Ли Сунсина, Ёсу, Чолла-намдо",
      addr2: "Морской парк Ёсу",
      overview:
        "Морской туристический фестиваль с ночным морем Ёсу и фейерверками.",
    },
  },
  "mock-festival-017": {
    kor: {
      title: "목포항구축제",
      addr1: "전라남도 목포시 해안로",
      addr2: "목포항 및 평화광장",
      overview: "항구의 맛과 음악을 만나는 목포의 가을 대표 축제입니다.",
    },
    eng: {
      title: "Mokpo Port Festival",
      addr1: "Haean-ro, Mokpo, Jeollanam-do",
      addr2: "Mokpo Port and Peace Square",
      overview:
        "Mokpo's signature autumn festival celebrating the flavors and music of the port.",
    },
    jpn: {
      title: "木浦港祭り",
      addr1: "全羅南道 木浦市 海岸路",
      addr2: "木浦港と平和広場",
      overview: "港の味と音楽に出会う木浦を代表する秋の祭りです。",
    },
    chn: {
      title: "木浦港口节",
      addr1: "全罗南道 木浦市 海岸路",
      addr2: "木浦港及和平广场",
      overview: "感受港口美食与音乐的木浦代表性秋季节日。",
    },
    fra: {
      title: "Festival du port de Mokpo",
      addr1: "Haean-ro, Mokpo, Jeollanam-do",
      addr2: "Port de Mokpo et place de la Paix",
      overview:
        "Le grand festival d'automne de Mokpo qui célèbre les saveurs et la musique du port.",
    },
    spa: {
      title: "Festival del puerto de Mokpo",
      addr1: "Haean-ro, Mokpo, Jeollanam-do",
      addr2: "Puerto de Mokpo y Plaza de la Paz",
      overview:
        "El festival otoñal de Mokpo que celebra los sabores y la música del puerto.",
    },
    rus: {
      title: "Фестиваль порта Мокпхо",
      addr1: "улица Хэан, Мокпхо, Чолла-намдо",
      addr2: "Порт Мокпхо и площадь Мира",
      overview:
        "Главный осенний фестиваль Мокпхо, посвящённый вкусам и музыке порта.",
    },
  },
  "mock-festival-018": {
    kor: {
      title: "제주해녀문화축제",
      addr1: "제주특별자치도 제주시 구좌읍 해맞이해안로",
      addr2: "해녀박물관 일원",
      overview: "제주 해녀의 삶과 바다 문화를 체험하는 지역 축제입니다.",
    },
    eng: {
      title: "Jeju Haenyeo Culture Festival",
      addr1: "Haemajihaean-ro, Gujwa-eup, Jeju-si",
      addr2: "Haenyeo Museum area",
      overview:
        "A local festival where visitors experience the lives of Jeju haenyeo and the culture of the sea.",
    },
    jpn: {
      title: "済州海女文化祭",
      addr1: "済州特別自治道 済州市 旧左邑 日の出海岸路",
      addr2: "海女博物館一帯",
      overview: "済州の海女の暮らしと海の文化を体験する地域祭です。",
    },
    chn: {
      title: "济州海女文化节",
      addr1: "济州特别自治道 济州市 旧左邑 迎日海岸路",
      addr2: "海女博物馆一带",
      overview: "体验济州海女生活与海洋文化的地方节日。",
    },
    fra: {
      title: "Festival de la culture des haenyeo de Jeju",
      addr1: "Haemajihaean-ro, Gujwa-eup, Jeju-si",
      addr2: "Environs du musée des haenyeo",
      overview:
        "Un festival local pour découvrir la vie des haenyeo de Jeju et la culture de la mer.",
    },
    spa: {
      title: "Festival de la cultura haenyeo de Jeju",
      addr1: "Haemajihaean-ro, Gujwa-eup, Jeju-si",
      addr2: "Zona del Museo Haenyeo",
      overview:
        "Un festival local para experimentar la vida de las haenyeo de Jeju y la cultura del mar.",
    },
    rus: {
      title: "Фестиваль культуры хэнё в Чеджу",
      addr1: "улица Хэмаджихэан, волость Куджва, Чеджу",
      addr2: "Район музея хэнё",
      overview:
        "Местный фестиваль, знакомящий с жизнью хэнё Чеджу и морской культурой.",
    },
  },
} satisfies Record<FestivalContentId, FestivalLocaleMap>;
