export const FESTIVAL_SEARCH_LANGUAGES = [
  "kor",
  "eng",
  "jpn",
  "chn",
  "fra",
  "spa",
  "rus",
] as const;

export type FestivalSearchLanguage = (typeof FESTIVAL_SEARCH_LANGUAGES)[number];

export const DEFAULT_FESTIVAL_SEARCH_LANGUAGE: FestivalSearchLanguage = "kor";

export function isFestivalSearchLanguage(
  value: string | null,
): value is FestivalSearchLanguage {
  return value !== null && FESTIVAL_SEARCH_LANGUAGES.includes(value as FestivalSearchLanguage);
}

export type FestivalSearchTerms = {
  aliases: readonly string[];
  tags: readonly string[];
};

type FestivalSearchAliases = Record<
  FestivalSearchLanguage,
  FestivalSearchTerms
>;

const FESTIVAL_FILTER_TERMS: Record<
  FestivalSearchLanguage,
  readonly string[]
> = {
  kor: [
    "봄",
    "여름",
    "가을",
    "겨울",
    "전통",
    "체험",
    "공연",
    "음식",
    "불꽃",
    "등불",
    "벚꽃",
    "야경",
    "서울",
    "부산",
    "제주도",
    "강원도",
  ],
  eng: [
    "Spring",
    "Summer",
    "Autumn",
    "Winter",
    "Traditional",
    "Experience",
    "Performance",
    "Food",
    "Fireworks",
    "Lantern",
    "Cherry Blossom",
    "Night View",
    "Seoul",
    "Busan",
    "Jeju",
    "Gangwon",
  ],
  jpn: [
    "春",
    "夏",
    "秋",
    "冬",
    "伝統",
    "体験",
    "公演",
    "グルメ",
    "花火",
    "提灯",
    "桜",
    "夜景",
    "ソウル",
    "釜山",
    "済州島",
    "江原道",
  ],
  chn: [
    "春",
    "夏",
    "秋",
    "冬",
    "传统",
    "体验",
    "表演",
    "美食",
    "烟花",
    "灯笼",
    "樱花",
    "夜景",
    "首尔",
    "釜山",
    "济州岛",
    "江原道",
  ],
  fra: [
    "Printemps",
    "Été",
    "Automne",
    "Hiver",
    "Tradition",
    "Expérience",
    "Spectacle",
    "Gastronomie",
    "Feux d'artifice",
    "Lanternes",
    "Cerisiers",
    "Paysage nocturne",
    "Séoul",
    "Busan",
    "Jeju",
    "Gangwon",
  ],
  spa: [
    "Primavera",
    "Verano",
    "Otoño",
    "Invierno",
    "Tradición",
    "Experiencia",
    "Espectáculo",
    "Gastronomía",
    "Fuegos artificiales",
    "Faroles",
    "Cerezos",
    "Paisaje nocturno",
    "Seúl",
    "Busan",
    "Jeju",
    "Gangwon",
  ],
  rus: [
    "Весна",
    "Лето",
    "Осень",
    "Зима",
    "Традиция",
    "Опыт",
    "Шоу",
    "Еда",
    "Фейерверк",
    "Фонарь",
    "Сакура",
    "Ночной пейзаж",
    "Сеул",
    "Пусан",
    "Чеджу",
    "Канвондо",
  ],
};

function normalizeFilterTerm(value: string) {
  return value.trim().toLowerCase();
}

export function isFestivalFilterKeyword(
  value: string,
  lang: FestivalSearchLanguage,
) {
  const normalizedValue = normalizeFilterTerm(value);
  return FESTIVAL_FILTER_TERMS[lang].some(
    (term) => normalizeFilterTerm(term) === normalizedValue,
  );
}

export const festivalSearchAliases: Record<string, FestivalSearchAliases> = {
  "mock-festival-001": {
    kor: { aliases: ["서울빛축제", "빛"], tags: ["서울", "야경"] },
    eng: { aliases: ["Seoul Light Festival", "Light"], tags: ["Seoul", "Night View"] },
    jpn: { aliases: ["ソウル光祭り", "光"], tags: ["ソウル", "夜景"] },
    chn: { aliases: ["首尔灯光节", "灯光"], tags: ["首尔", "夜景"] },
    fra: {
      aliases: ["Festival des lumières de Séoul", "Lumière"],
      tags: ["Séoul", "Paysage nocturne"],
    },
    spa: {
      aliases: ["Festival de luces de Seúl", "Luz"],
      tags: ["Seúl", "Paisaje nocturno"],
    },
    rus: {
      aliases: ["Фестиваль света в Сеуле", "Свет"],
      tags: ["Сеул", "Ночной пейзаж"],
    },
  },
  "mock-festival-002": {
    kor: { aliases: ["바다", "예술"], tags: ["부산", "가을", "체험"] },
    eng: { aliases: ["Sea", "Art"], tags: ["Busan", "Autumn", "Experience"] },
    jpn: { aliases: ["海", "アート"], tags: ["釜山", "秋", "体験"] },
    chn: { aliases: ["海", "艺术"], tags: ["釜山", "秋", "体验"] },
    fra: { aliases: ["Mer", "Art"], tags: ["Busan", "Automne", "Expérience"] },
    spa: { aliases: ["Mar", "Arte"], tags: ["Busan", "Otoño", "Experiencia"] },
    rus: { aliases: ["Море", "Искусство"], tags: ["Пусан", "Осень", "Опыт"] },
  },
  "mock-festival-003": {
    kor: { aliases: ["인천", "역사"], tags: ["전통", "공연", "벚꽃", "봄"] },
    eng: {
      aliases: ["Incheon", "History"],
      tags: ["Traditional", "Performance", "Cherry Blossom", "Spring"],
    },
    jpn: {
      aliases: ["仁川", "歴史"],
      tags: ["伝統", "公演", "桜", "春"],
    },
    chn: {
      aliases: ["仁川", "历史"],
      tags: ["传统", "表演", "樱花", "春"],
    },
    fra: {
      aliases: ["Incheon", "Histoire"],
      tags: ["Tradition", "Spectacle", "Cerisiers", "Printemps"],
    },
    spa: {
      aliases: ["Incheon", "Historia"],
      tags: ["Tradición", "Espectáculo", "Cerezos", "Primavera"],
    },
    rus: {
      aliases: ["Инчхон", "История"],
      tags: ["Традиция", "Шоу", "Сакура", "Весна"],
    },
  },
  "mock-festival-004": {
    kor: { aliases: ["대전", "과학", "가족"], tags: ["체험", "공연"] },
    eng: {
      aliases: ["Daejeon", "Science", "Family"],
      tags: ["Experience", "Performance"],
    },
    jpn: {
      aliases: ["大田", "科学", "家族"],
      tags: ["体験", "公演"],
    },
    chn: {
      aliases: ["大田", "科学", "家庭"],
      tags: ["体验", "表演"],
    },
    fra: {
      aliases: ["Daejeon", "Science", "Famille"],
      tags: ["Expérience", "Spectacle"],
    },
    spa: {
      aliases: ["Daejeon", "Ciencia", "Familia"],
      tags: ["Experiencia", "Espectáculo"],
    },
    rus: {
      aliases: ["Тэджон", "Наука", "Семья"],
      tags: ["Опыт", "Шоу"],
    },
  },
  "mock-festival-005": {
    kor: { aliases: ["대구", "음악"], tags: ["공연", "여름"] },
    eng: { aliases: ["Daegu", "Music"], tags: ["Performance", "Summer"] },
    jpn: { aliases: ["大邱", "音楽"], tags: ["公演", "夏"] },
    chn: { aliases: ["大邱", "音乐"], tags: ["表演", "夏"] },
    fra: { aliases: ["Daegu", "Musique"], tags: ["Spectacle", "Été"] },
    spa: { aliases: ["Daegu", "Música"], tags: ["Espectáculo", "Verano"] },
    rus: { aliases: ["Тэгу", "Музыка"], tags: ["Шоу", "Лето"] },
  },
  "mock-festival-006": {
    kor: { aliases: ["광주", "거리", "예술"], tags: ["공연", "체험"] },
    eng: {
      aliases: ["Gwangju", "Street", "Art"],
      tags: ["Performance", "Experience"],
    },
    jpn: {
      aliases: ["光州", "街", "アート"],
      tags: ["公演", "体験"],
    },
    chn: {
      aliases: ["光州", "街头", "艺术"],
      tags: ["表演", "体验"],
    },
    fra: {
      aliases: ["Gwangju", "Rue", "Art"],
      tags: ["Spectacle", "Expérience"],
    },
    spa: {
      aliases: ["Gwangju", "Calle", "Arte"],
      tags: ["Espectáculo", "Experiencia"],
    },
    rus: {
      aliases: ["Кванджу", "Улица", "Искусство"],
      tags: ["Шоу", "Опыт"],
    },
  },
  "mock-festival-007": {
    kor: { aliases: ["울산", "고래", "바다", "해양"], tags: ["체험"] },
    eng: {
      aliases: ["Ulsan", "Whale", "Sea", "Ocean"],
      tags: ["Experience"],
    },
    jpn: {
      aliases: ["蔚山", "クジラ", "海", "海洋"],
      tags: ["体験"],
    },
    chn: {
      aliases: ["蔚山", "鲸鱼", "海", "海洋"],
      tags: ["体验"],
    },
    fra: {
      aliases: ["Ulsan", "Baleine", "Mer", "Océan"],
      tags: ["Expérience"],
    },
    spa: {
      aliases: ["Ulsan", "Ballena", "Mar", "Océano"],
      tags: ["Experiencia"],
    },
    rus: {
      aliases: ["Ульсан", "Кит", "Море", "Океан"],
      tags: ["Опыт"],
    },
  },
  "mock-festival-008": {
    kor: { aliases: ["세종", "호수", "음악"], tags: ["공연", "여름"] },
    eng: {
      aliases: ["Sejong", "Lake", "Music"],
      tags: ["Performance", "Summer"],
    },
    jpn: {
      aliases: ["世宗", "湖", "音楽"],
      tags: ["公演", "夏"],
    },
    chn: {
      aliases: ["世宗", "湖", "音乐"],
      tags: ["表演", "夏"],
    },
    fra: {
      aliases: ["Sejong", "Lac", "Musique"],
      tags: ["Spectacle", "Été"],
    },
    spa: {
      aliases: ["Sejong", "Lago", "Música"],
      tags: ["Espectáculo", "Verano"],
    },
    rus: {
      aliases: ["Седжон", "Озеро", "Музыка"],
      tags: ["Шоу", "Лето"],
    },
  },
  "mock-festival-009": {
    kor: { aliases: ["수원", "화성", "역사"], tags: ["전통", "공연"] },
    eng: {
      aliases: ["Suwon", "Hwaseong", "History"],
      tags: ["Traditional", "Performance"],
    },
    jpn: {
      aliases: ["水原", "華城", "歴史"],
      tags: ["伝統", "公演"],
    },
    chn: {
      aliases: ["水原", "华城", "历史"],
      tags: ["传统", "表演"],
    },
    fra: {
      aliases: ["Suwon", "Hwaseong", "Histoire"],
      tags: ["Tradition", "Spectacle"],
    },
    spa: {
      aliases: ["Suwon", "Hwaseong", "Historia"],
      tags: ["Tradición", "Espectáculo"],
    },
    rus: {
      aliases: ["Сувон", "Хвасон", "История"],
      tags: ["Традиция", "Шоу"],
    },
  },
  "mock-festival-010": {
    kor: {
      aliases: ["춘천", "호수", "별빛"],
      tags: ["강원도", "가을", "야경"],
    },
    eng: {
      aliases: ["Chuncheon", "Lake", "Starlight"],
      tags: ["Gangwon", "Autumn", "Night View"],
    },
    jpn: {
      aliases: ["春川", "湖", "星明かり"],
      tags: ["江原道", "秋", "夜景"],
    },
    chn: {
      aliases: ["春川", "湖", "星光"],
      tags: ["江原道", "秋", "夜景"],
    },
    fra: {
      aliases: ["Chuncheon", "Lac", "Clair de lune"],
      tags: ["Gangwon", "Automne", "Paysage nocturne"],
    },
    spa: {
      aliases: ["Chuncheon", "Lago", "Luz de las estrellas"],
      tags: ["Gangwon", "Otoño", "Paisaje nocturno"],
    },
    rus: {
      aliases: ["Чхунчхон", "Озеро", "Звёздный свет"],
      tags: ["Канвондо", "Осень", "Ночной пейзаж"],
    },
  },
  "mock-festival-011": {
    kor: { aliases: ["청주", "직지"], tags: ["전통", "체험", "공연"] },
    eng: {
      aliases: ["Cheongju", "Jikji"],
      tags: ["Traditional", "Experience", "Performance"],
    },
    jpn: {
      aliases: ["清州", "直指"],
      tags: ["伝統", "体験", "公演"],
    },
    chn: {
      aliases: ["清州", "直指"],
      tags: ["传统", "体验", "表演"],
    },
    fra: {
      aliases: ["Cheongju", "Jikji"],
      tags: ["Tradition", "Expérience", "Spectacle"],
    },
    spa: {
      aliases: ["Cheongju", "Jikji"],
      tags: ["Tradición", "Experiencia", "Espectáculo"],
    },
    rus: {
      aliases: ["Чхонджу", "Чикчи"],
      tags: ["Традиция", "Опыт", "Шоу"],
    },
  },
  "mock-festival-012": {
    kor: { aliases: ["공주", "백제", "역사"], tags: ["전통", "공연"] },
    eng: {
      aliases: ["Gongju", "Baekje", "History"],
      tags: ["Traditional", "Performance"],
    },
    jpn: {
      aliases: ["公州", "百済", "歴史"],
      tags: ["伝統", "公演"],
    },
    chn: {
      aliases: ["公州", "百济", "历史"],
      tags: ["传统", "表演"],
    },
    fra: {
      aliases: ["Gongju", "Baekje", "Histoire"],
      tags: ["Tradition", "Spectacle"],
    },
    spa: {
      aliases: ["Gongju", "Baekje", "Historia"],
      tags: ["Tradición", "Espectáculo"],
    },
    rus: {
      aliases: ["Конджу", "Пэкче", "История"],
      tags: ["Традиция", "Шоу"],
    },
  },
  "mock-festival-013": {
    kor: { aliases: ["경주", "신라", "역사"], tags: ["전통", "겨울"] },
    eng: {
      aliases: ["Gyeongju", "Silla", "History"],
      tags: ["Traditional", "Winter"],
    },
    jpn: {
      aliases: ["慶州", "新羅", "歴史"],
      tags: ["伝統", "冬"],
    },
    chn: {
      aliases: ["庆州", "新罗", "历史"],
      tags: ["传统", "冬"],
    },
    fra: {
      aliases: ["Gyeongju", "Silla", "Histoire"],
      tags: ["Tradition", "Hiver"],
    },
    spa: {
      aliases: ["Gyeongju", "Silla", "Historia"],
      tags: ["Tradición", "Invierno"],
    },
    rus: {
      aliases: ["Кёнджу", "Силла", "История"],
      tags: ["Традиция", "Зима"],
    },
  },
  "mock-festival-014": {
    kor: { aliases: ["진주", "남강"], tags: ["등불", "야경", "공연"] },
    eng: {
      aliases: ["Jinju", "Namgang"],
      tags: ["Lantern", "Night View", "Performance"],
    },
    jpn: {
      aliases: ["晋州", "南江"],
      tags: ["提灯", "夜景", "公演"],
    },
    chn: {
      aliases: ["晋州", "南江"],
      tags: ["灯笼", "夜景", "表演"],
    },
    fra: {
      aliases: ["Jinju", "Namgang"],
      tags: ["Lanternes", "Paysage nocturne", "Spectacle"],
    },
    spa: {
      aliases: ["Jinju", "Namgang"],
      tags: ["Faroles", "Paisaje nocturno", "Espectáculo"],
    },
    rus: {
      aliases: ["Чинджу", "Намган"],
      tags: ["Фонарь", "Ночной пейзаж", "Шоу"],
    },
  },
  "mock-festival-015": {
    kor: { aliases: ["전주", "한옥", "문화"], tags: ["전통", "가을"] },
    eng: {
      aliases: ["Jeonju", "Hanok", "Culture"],
      tags: ["Traditional", "Autumn"],
    },
    jpn: {
      aliases: ["全州", "韓屋", "文化"],
      tags: ["伝統", "秋"],
    },
    chn: {
      aliases: ["全州", "韩屋", "文化"],
      tags: ["传统", "秋"],
    },
    fra: {
      aliases: ["Jeonju", "Hanok", "Culture"],
      tags: ["Tradition", "Automne"],
    },
    spa: {
      aliases: ["Jeonju", "Hanok", "Cultura"],
      tags: ["Tradición", "Otoño"],
    },
    rus: {
      aliases: ["Чонджу", "Ханок", "Культура"],
      tags: ["Традиция", "Осень"],
    },
  },
  "mock-festival-016": {
    kor: { aliases: ["여수", "밤바다", "바다"], tags: ["불꽃", "공연"] },
    eng: { aliases: ["Yeosu", "Night Sea", "Sea"], tags: ["Fireworks", "Performance"] },
    jpn: { aliases: ["麗水", "夜の海", "海"], tags: ["花火", "公演"] },
    chn: { aliases: ["丽水", "夜海", "海"], tags: ["烟花", "表演"] },
    fra: {
      aliases: ["Yeosu", "Mer nocturne", "Mer"],
      tags: ["Feux d'artifice", "Spectacle"],
    },
    spa: {
      aliases: ["Yeosu", "Mar nocturno", "Mar"],
      tags: ["Fuegos artificiales", "Espectáculo"],
    },
    rus: {
      aliases: ["Йосу", "Ночное море", "Море"],
      tags: ["Фейерверк", "Шоу"],
    },
  },
  "mock-festival-017": {
    kor: { aliases: ["목포", "항구", "음악"], tags: ["가을", "음식"] },
    eng: { aliases: ["Mokpo", "Port", "Music"], tags: ["Autumn", "Food"] },
    jpn: { aliases: ["木浦", "港", "音楽"], tags: ["秋", "グルメ"] },
    chn: { aliases: ["木浦", "港口", "音乐"], tags: ["秋", "美食"] },
    fra: { aliases: ["Mokpo", "Port", "Musique"], tags: ["Automne", "Gastronomie"] },
    spa: {
      aliases: ["Mokpo", "Puerto", "Música"],
      tags: ["Otoño", "Gastronomía"],
    },
    rus: { aliases: ["Мокпхо", "Порт", "Музыка"], tags: ["Осень", "Еда"] },
  },
  "mock-festival-018": {
    kor: { aliases: ["제주", "해녀", "바다"], tags: ["제주도", "전통", "체험"] },
    eng: {
      aliases: ["Jeju Island", "Haenyeo", "Sea"],
      tags: ["Jeju", "Traditional", "Experience"],
    },
    jpn: {
      aliases: ["済州", "海女", "海"],
      tags: ["済州島", "伝統", "体験"],
    },
    chn: {
      aliases: ["济州", "海女", "海"],
      tags: ["济州岛", "传统", "体验"],
    },
    fra: {
      aliases: ["Île de Jeju", "Haenyeo", "Mer"],
      tags: ["Jeju", "Tradition", "Expérience"],
    },
    spa: {
      aliases: ["Isla de Jeju", "Haenyeo", "Mar"],
      tags: ["Jeju", "Tradición", "Experiencia"],
    },
    rus: {
      aliases: ["Остров Чеджу", "Хэнё", "Море"],
      tags: ["Чеджу", "Традиция", "Опыт"],
    },
  },
};
