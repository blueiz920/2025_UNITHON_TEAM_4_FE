import type { FestivalListItem } from "../../types/festival";
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

const festivalDetailSectionLabels: Record<
  FestivalSearchLanguage,
  FestivalDetailSectionLabels
> = {
  kor: { intro: "행사소개", detail: "행사내용" },
  eng: { intro: "Introduction", detail: "Details" },
  jpn: { intro: "イベント紹介", detail: "イベント内容" },
  chn: { intro: "活动介绍", detail: "活动内容" },
  fra: { intro: "Présentation de l'événement", detail: "Contenu de l'événement" },
  spa: { intro: "Introducción al evento", detail: "Contenido del evento" },
  rus: { intro: "Введение", detail: "Описание мероприятия" },
};

export function getFestivalDetailSectionLabels(
  lang: string | null | undefined,
): FestivalDetailSectionLabels {
  return festivalDetailSectionLabels[lang as FestivalSearchLanguage]
    ?? festivalDetailSectionLabels.kor;
}

const festivalDetailMetadata: Partial<Record<string, FestivalDetailMetadata>> = {
  "mock-festival-001": {
    sponsor1: "서울특별시 문화본부",
    sponsor1tel: "02-0000-0001",
    eventplace: "서울광장",
    program: "빛 전시, 야간 공연, 시민 참여형 미디어아트 체험",
    intro: "서울 도심의 밤을 다양한 빛과 음악으로 채우는 야간 문화축제입니다.",
    detail:
      "<p>서울광장 곳곳에 설치된 빛 작품을 자유롭게 감상할 수 있습니다.</p><p>주말에는 야외 공연과 시민 참여 프로그램이 함께 운영됩니다.</p>",
    foods: [
      {
        title: "광장 국수집",
        addr1: "서울특별시 중구 세종대로 110",
        addr2: "서울광장 인근",
        dist: "320",
        tel: "02-0000-1010",
        overview: "따뜻한 국수와 만두를 즐길 수 있는 광장 인근 식당입니다.",
      },
      {
        title: "시청 야시장 푸드코트",
        addr1: "서울특별시 중구 세종대로 101",
        addr2: "시청역 5번 출구 앞",
        dist: "680",
        tel: "02-0000-1011",
        overview: "축제 기간에 다양한 간식과 음료를 판매하는 야시장입니다.",
      },
    ],
  },
  "mock-festival-010": {
    sponsor1: "춘천시 관광과",
    sponsor1tel: "033-0000-0010",
    eventplace: "춘천역 앞 광장",
    program: "호수 빛 산책, 별빛 음악회, 야간 포토존",
    intro: "춘천의 호수와 가을밤을 배경으로 펼쳐지는 빛 테마 축제입니다.",
    detail:
      "<p>호수 주변 산책로를 따라 계절의 풍경과 어울리는 조명 작품을 만날 수 있습니다.</p><p>저녁 시간에는 소규모 음악회와 야간 체험 프로그램이 진행됩니다.</p>",
    foods: [
      {
        title: "춘천 닭갈비 골목",
        addr1: "강원특별자치도 춘천시 명동길",
        addr2: "명동 닭갈비골목",
        dist: "420",
        tel: "033-0000-1010",
        overview: "춘천을 대표하는 닭갈비와 막국수를 맛볼 수 있는 음식 거리입니다.",
      },
      {
        title: "호수 카페 라운지",
        addr1: "강원특별자치도 춘천시 소양강로",
        addr2: "호수공원 산책로 입구",
        dist: "760",
        tel: "033-0000-1011",
        overview: "호수 풍경을 바라보며 음료와 디저트를 즐길 수 있는 카페입니다.",
      },
    ],
  },
  "mock-festival-018": {
    sponsor1: "제주특별자치도 해양수산과",
    sponsor1tel: "064-0000-0018",
    eventplace: "해녀박물관 일원",
    program: "해녀 문화 전시, 바다 체험, 지역 해산물 시식",
    intro: "제주 해녀의 삶과 바다 문화를 가까이에서 만나는 지역 축제입니다.",
    detail:
      "<p>해녀 문화 전시와 이야기 마당을 통해 제주 바다의 생활 문화를 소개합니다.</p><p>지역 어촌이 준비한 체험과 해산물 시식 프로그램도 함께 운영됩니다.</p>",
    foods: [
      {
        title: "구좌 해녀의 집",
        addr1: "제주특별자치도 제주시 구좌읍 해맞이해안로",
        addr2: "해녀박물관 해안 인근",
        dist: "380",
        tel: "064-0000-1010",
        overview: "제주 해산물과 전복 요리를 맛볼 수 있는 바닷가 식당입니다.",
      },
      {
        title: "월정리 바다식당",
        addr1: "제주특별자치도 제주시 구좌읍 월정리",
        addr2: "월정리 해변 방향",
        dist: "920",
        tel: "064-0000-1011",
        overview: "제주식 식사와 간단한 해산물 메뉴를 제공하는 지역 식당입니다.",
      },
    ],
  },
};

function createFallbackMetadata(festival: FestivalListItem): FestivalDetailMetadata {
  const venue = festival.addr2 || festival.addr1;
  const phone = festival.tel || "02-0000-0000";
  const overview = festival.overview || `${festival.title}에서 지역 문화를 즐길 수 있는 축제입니다.`;

  return {
    sponsor1: "마크클라우드 Demo 운영팀",
    sponsor1tel: phone,
    eventplace: venue,
    program: `${festival.title} 전시, 공연, 체험 프로그램`,
    intro: overview,
    detail: `<p>${festival.title}은(는) ${venue}에서 열리는 지역 문화축제입니다.</p><p>축제 현장에서 다양한 프로그램과 지역 문화를 경험해 보세요.</p>`,
    foods: [
      {
        title: `${venue} 대표 식당`,
        addr1: festival.addr1,
        addr2: `${venue} 인근`,
        dist: "450",
        tel: phone,
        overview: `${festival.title} 방문객이 이용하기 좋은 지역 음식점입니다.`,
      },
      {
        title: `${festival.title} 푸드마켓`,
        addr1: festival.addr1,
        addr2: `${venue} 행사장 주변`,
        dist: "820",
        tel: phone,
        overview: "축제 주변에서 간단한 식사와 지역 간식을 즐길 수 있습니다.",
      },
    ],
  };
}

export function getFestivalDetailMetadata(festival: FestivalListItem) {
  return festivalDetailMetadata[festival.contentid] ?? createFallbackMetadata(festival);
}
