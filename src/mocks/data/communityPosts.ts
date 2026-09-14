import type { Comment, Image, PostDetail, Writer } from "../../apis/post";

export const DEMO_USER_ID = 1;

export const DEMO_USER: Writer = {
  id: DEMO_USER_ID,
  name: "Demo User",
  profileImage: "",
};

const festivalLover: Writer = {
  id: 2,
  name: "Festival Lover",
  profileImage: "",
};

const travelMate: Writer = {
  id: 3,
  name: "Travel Mate",
  profileImage: "",
};

const makeImage = (seed: string): Image => ({
  imageUrl: "https://picsum.photos/seed/" + seed + "/900/600",
});

const makeComment = (
  commentId: number,
  content: string,
  writer: Writer,
  createdAt: string,
): Comment => ({
  commentId,
  content,
  writerId: writer.id,
  writerName: writer.name,
  writerProfileImageUrl: writer.profileImage,
  createdAt,
  updatedAt: createdAt,
});

export const mockCommunityPosts: PostDetail[] = [
  {
    postId: 1,
    likes: 7,
    title: "서울 야간 축제, 어디가 좋을까요?",
    content:
      "가을 저녁에 가볍게 다녀올 수 있는 서울 축제를 찾고 있어요.\n\n빛 전시와 야외 공연을 함께 즐길 수 있는 곳이면 좋겠습니다.",
    thumbnailUrl: makeImage("community-post-01").imageUrl,
    images: [
      makeImage("community-post-01"),
      makeImage("community-post-01-detail"),
    ],
    comments: [
      makeComment(
        101,
        "서울광장 쪽 야간 축제가 산책하기 좋았어요.",
        festivalLover,
        "2026-08-31T12:30:00.000Z",
      ),
    ],
    writer: DEMO_USER,
    createdAt: "2026-08-31T10:00:00.000Z",
    updatedAt: "2026-08-31T10:00:00.000Z",
  },
  {
    postId: 2,
    likes: 12,
    title: "부산 바다 축제 하루 코스 추천",
    content:
      "해운대에서 축제를 즐기고 근처에서 식사까지 할 수 있는 하루 코스를 정리해 봤습니다.\n\n대중교통으로 이동하기도 편해서 주말 나들이로 추천해요.",
    thumbnailUrl: makeImage("community-post-02").imageUrl,
    images: [makeImage("community-post-02")],
    comments: [
      makeComment(
        201,
        "저도 지난달에 다녀왔는데 바다 공연이 특히 좋았습니다.",
        travelMate,
        "2026-08-29T09:15:00.000Z",
      ),
      makeComment(
        202,
        "주차보다 지하철을 이용하는 편이 편해요.",
        DEMO_USER,
        "2026-08-29T11:45:00.000Z",
      ),
    ],
    writer: travelMate,
    createdAt: "2026-08-29T08:20:00.000Z",
    updatedAt: "2026-08-29T11:45:00.000Z",
  },
  {
    postId: 3,
    likes: 4,
    title: "축제 사진을 예쁘게 남기는 방법",
    content:
      "사람이 많은 축제에서 사진을 찍을 때는 메인 무대보다 주변 조명을 활용하면 좋아요.\n\n해가 지기 전부터 도착해서 장소를 미리 둘러보는 것도 도움이 됩니다.",
    thumbnailUrl: makeImage("community-post-03").imageUrl,
    images: [
      makeImage("community-post-03"),
      makeImage("community-post-03-night"),
    ],
    comments: [],
    writer: festivalLover,
    createdAt: "2026-08-27T14:10:00.000Z",
    updatedAt: "2026-08-27T14:10:00.000Z",
  },
  {
    postId: 4,
    likes: 9,
    title: "아이와 함께 가기 좋은 체험 축제",
    content:
      "아이와 함께 방문할 때는 체험 프로그램의 운영 시간을 먼저 확인하는 것이 좋아요.\n\n이번 주말에는 만들기와 전통 놀이를 중심으로 둘러볼 예정입니다.",
    thumbnailUrl: makeImage("community-post-04").imageUrl,
    images: [makeImage("community-post-04")],
    comments: [
      makeComment(
        401,
        "체험 부스는 오전에 가면 대기 시간이 짧더라고요.",
        travelMate,
        "2026-08-26T07:40:00.000Z",
      ),
    ],
    writer: DEMO_USER,
    createdAt: "2026-08-26T06:50:00.000Z",
    updatedAt: "2026-08-26T06:50:00.000Z",
  },
  {
    postId: 5,
    likes: 6,
    title: "전주 한옥마을 근처 축제 후기",
    content:
      "한옥마을 골목을 천천히 걷다가 작은 공연을 만나는 재미가 있었습니다.\n\n저녁에는 조명이 켜져 분위기가 완전히 달라지니 시간을 나눠 방문해 보세요.",
    thumbnailUrl: makeImage("community-post-05").imageUrl,
    images: [
      makeImage("community-post-05"),
      makeImage("community-post-05-street"),
    ],
    comments: [],
    writer: travelMate,
    createdAt: "2026-08-24T16:00:00.000Z",
    updatedAt: "2026-08-24T16:00:00.000Z",
  },
  {
    postId: 6,
    likes: 3,
    title: "비 오는 날에도 즐길 수 있는 축제",
    content:
      "비 예보가 있는 날에는 실내 전시와 체험 공간이 있는 축제를 고르면 일정이 편해집니다.\n\n우산과 방수 신발을 준비하면 야외 프로그램도 짧게 즐길 수 있어요.",
    thumbnailUrl: makeImage("community-post-06").imageUrl,
    images: [makeImage("community-post-06")],
    comments: [
      makeComment(
        601,
        "실내 프로그램 정보를 미리 확인해야겠네요.",
        festivalLover,
        "2026-08-22T13:05:00.000Z",
      ),
    ],
    writer: festivalLover,
    createdAt: "2026-08-22T11:25:00.000Z",
    updatedAt: "2026-08-22T13:05:00.000Z",
  },
  {
    postId: 7,
    likes: 10,
    title: "지역 축제에서 꼭 먹어봐야 할 메뉴",
    content:
      "지역마다 대표 먹거리가 달라서 축제에 가면 시장과 푸드존을 함께 둘러보는 편입니다.\n\n이번에는 지역 재료를 활용한 간식들을 중심으로 맛봤어요.",
    thumbnailUrl: makeImage("community-post-07").imageUrl,
    images: [
      makeImage("community-post-07"),
      makeImage("community-post-07-food"),
    ],
    comments: [],
    writer: DEMO_USER,
    createdAt: "2026-08-20T09:00:00.000Z",
    updatedAt: "2026-08-20T09:00:00.000Z",
  },
  {
    postId: 8,
    likes: 5,
    title: "대중교통으로 떠나는 가을 축제",
    content:
      "기차역이나 버스 터미널에서 행사장까지 셔틀이 연결되는 축제가 생각보다 많습니다.\n\n출발 전에 막차 시간과 셔틀 운행 간격만 확인하면 부담 없이 다녀올 수 있어요.",
    thumbnailUrl: makeImage("community-post-08").imageUrl,
    images: [makeImage("community-post-08")],
    comments: [
      makeComment(
        801,
        "셔틀 시간표를 행사 페이지에서 꼭 확인해야겠어요.",
        DEMO_USER,
        "2026-08-18T10:10:00.000Z",
      ),
    ],
    writer: travelMate,
    createdAt: "2026-08-18T08:35:00.000Z",
    updatedAt: "2026-08-18T10:10:00.000Z",
  },
  {
    postId: 9,
    likes: 8,
    title: "축제 방문 전 준비물 체크리스트",
    content:
      "보조 배터리, 물, 작은 돗자리, 휴대용 손 소독제를 챙기면 현장에서 유용합니다.\n\n오래 걸을 수 있으니 편한 신발을 신는 것도 잊지 마세요.",
    thumbnailUrl: makeImage("community-post-09").imageUrl,
    images: [
      makeImage("community-post-09"),
      makeImage("community-post-09-checklist"),
    ],
    comments: [],
    writer: festivalLover,
    createdAt: "2026-08-16T15:20:00.000Z",
    updatedAt: "2026-08-16T15:20:00.000Z",
  },
  {
    postId: 10,
    likes: 11,
    title: "처음 가는 축제에서 동선 짜기",
    content:
      "행사장에 도착하면 안내 부스에서 전체 지도를 먼저 받아 보세요.\n\n공연 시간과 체험 마감 시간을 기준으로 동선을 정하면 놓치는 프로그램이 줄어듭니다.",
    thumbnailUrl: makeImage("community-post-10").imageUrl,
    images: [makeImage("community-post-10")],
    comments: [
      makeComment(
        1001,
        "지도와 시간표를 함께 보는 방법이 좋네요.",
        travelMate,
        "2026-08-14T17:00:00.000Z",
      ),
    ],
    writer: DEMO_USER,
    createdAt: "2026-08-14T12:05:00.000Z",
    updatedAt: "2026-08-14T12:05:00.000Z",
  },
];
