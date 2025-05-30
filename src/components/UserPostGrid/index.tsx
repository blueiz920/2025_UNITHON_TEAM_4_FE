import { useState, useEffect } from "react";
import Modal from "react-modal";

interface UserPostGridProps {
  type: "posts" | "likes" | "bookmarks";
  maxCount?: number; // 상위 컴포넌트에서 전달받을 수 있도록
}

const dummyPosts = [
  {
    id: 1,
    title: "진주 남강유등축제 방문 후기",
    image: "/sample1.jpg",
    date: "2023-10-15",
    likes: 128,
    comments: 24,
    tag: "한국어",
    nickname: "festival_lover",
  },
  {
    id: 2,
    title: "Jinhae Cherry Blossom Festival Experience",
    image: "/sample2.jpg",
    date: "2023-04-10",
    likes: 58,
    comments: 12,
    tag: "English",
    nickname: "traveler123",
  },
  {
    id: 3,
    title: "釜山花火祭りの素晴らしい瞬間",
    image: "/sample3.jpg",
    date: "2023-11-05",
    likes: 92,
    comments: 7,
    tag: "日本語",
    nickname: "sakura_fan",
  },
  {
    id: 4,
    title: "보령 머드축제에서의 즐거운 하루",
    image: "/sample4.jpg",
    date: "2023-07-22",
    likes: 44,
    comments: 3,
    tag: "한국어",
    nickname: "mud_lover",
  },
  {
    id: 5,
    title: "首尔灯节美丽夜景",
    image: "/sample5.jpg",
    date: "2023-11-15",
    likes: 31,
    comments: 2,
    tag: "中文",
    nickname: "light_chaser",
  },
  {
    id: 6,
    title: "Festival de Máscaras de Andong: Una experiencia cultural",
    image: "/sample6.jpg",
    date: "2023-10-01",
    likes: 18,
    comments: 1,
    tag: "Español",
    nickname: "cultura_fan",
  },
  {
    id: 7,
    title: "전주 비빔밥 축제 맛집 추천",
    image: "/sample7.jpg",
    date: "2023-05-20",
    likes: 25,
    comments: 0,
    tag: "한국어",
    nickname: "food_lover",
  },
];

export default function UserPostGrid({ maxCount = 6 }: UserPostGridProps) {
  const [modalOpenId, setModalOpenId] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const rootEl = document.getElementById("__next") || document.getElementById("root");
      if (rootEl) {
        Modal.setAppElement(rootEl);
      }
    }
  }, []);

  // 최대 6개만 보여주고, 6개 초과 시 스크롤
  const displayPosts = dummyPosts.slice(0, maxCount);

  // 게시물이 1개일 때도 3칸 그리드 유지
  const emptySlots =
    displayPosts.length === 1 ? 2 : displayPosts.length < 6 ? 6 - displayPosts.length : 0;

  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
      style={{
        minHeight: "440px", // 카드 높이와 맞추기
        maxHeight: "480px",
        overflowY: dummyPosts.length > 6 ? "auto" : "visible",
      }}
    >
      {displayPosts.map((post) => (
        <div
          key={post.id}
          className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden flex flex-col hover:shadow-md transition relative min-h-[200px] h-[210px] md:h-[220px]"
        >
          {/* 더보기 버튼 */}
          <button
            className="absolute top-2 right-2 z-10 p-1 rounded-full hover:bg-gray-100"
            onClick={() => setModalOpenId(post.id)}
          >
            <svg width="28" height="28" fill="none">
              <circle cx="7" cy="14" r="2" fill="#888" />
              <circle cx="14" cy="14" r="2" fill="#888" />
              <circle cx="21" cy="14" r="2" fill="#888" />
            </svg>
          </button>
          {/* 이미지 영역 */}
          <div className="relative w-full h-28 md:h-32 bg-gray-100 flex items-center justify-center">
            <img
              src={post.image}
              alt={post.title}
              className="object-cover w-full h-full"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/placeholder.svg?height=200&width=200";
              }}
            />
            <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full flex justify-between items-end px-3 pb-2 text-sm text-white z-10">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <svg
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="inline"
                  >
                    <path d="M12 21V19C12 17.8954 11.1046 17 10 17H6C4.89543 17 4 17.8954 4 19V21" />
                    <path d="M16 8C16 5.23858 13.7614 3 11 3C8.23858 3 6 5.23858 6 8C6 11.3137 11 17 11 17C11 17 16 11.3137 16 8Z" />
                  </svg>
                  {post.likes}
                </span>
                <span className="flex items-center gap-1">
                  <svg
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="inline"
                  >
                    <path d="M21 15V5C21 3.89543 20.1046 3 19 3H5C3.89543 3 3 3.89543 3 5V15C3 16.1046 3.89543 17 5 17H19C20.1046 17 21 16.1046 21 15Z" />
                    <path d="M7 9H17" />
                    <path d="M7 13H13" />
                  </svg>
                  {post.comments}
                </span>
              </div>
              <span className="font-medium">{post.date}</span>
            </div>
          </div>
          {/* 본문 */}
          <div className="p-4 pt-3 flex flex-col flex-1">
            <h2 className="text-lg font-semibold text-green-700 truncate mb-1">{post.title}</h2>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-600">{post.tag}</span>
              <span>@{post.nickname}</span>
            </div>
          </div>
          {/* 모달 */}
          {modalOpenId === post.id && (
            <Modal
              isOpen={true}
              onRequestClose={() => setModalOpenId(null)}
              ariaHideApp={false}
              style={{
                overlay: {
                  backgroundColor: "rgba(0,0,0,0.15)",
                  zIndex: 50,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                },
                content: {
                  position: "relative",
                  top: "auto",
                  left: "auto",
                  right: "auto",
                  bottom: "auto",
                  margin: "0",
                  padding: "0",
                  border: "none",
                  borderRadius: "18px",
                  width: "340px",
                  maxWidth: "95vw",
                  minHeight: "240px",
                  background: "#fff",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                },
              }}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-lg font-bold text-gray-900">게시물 관리</h3>
                  <button
                    onClick={() => setModalOpenId(null)}
                    className="text-gray-400 hover:text-gray-600"
                    aria-label="닫기"
                  >
                    <svg width="24" height="24" fill="none">
                      <line
                        x1="6"
                        y1="6"
                        x2="18"
                        y2="18"
                        stroke="#888"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <line
                        x1="18"
                        y1="6"
                        x2="6"
                        y2="18"
                        stroke="#888"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </div>
                <button className="w-full text-left px-2 py-3 text-base text-gray-800 hover:bg-gray-50 rounded transition">
                  게시물 수정
                </button>
                <button className="w-full text-left px-2 py-3 text-base text-red-500 hover:bg-red-50 rounded transition">
                  게시물 삭제
                </button>
                <div className="border-t my-3" />
                <button
                  className="w-full text-left px-2 py-3 text-base text-gray-500 hover:bg-gray-50 rounded transition"
                  onClick={() => setModalOpenId(null)}
                >
                  취소
                </button>
              </div>
            </Modal>
          )}
        </div>
      ))}
      {/* 게시물이 1개일 때 나머지 칸은 여백으로 */}
      {emptySlots > 0 &&
        Array.from({ length: emptySlots }).map((_, i) => (
          <div key={`empty-${i}`} className="bg-transparent" />
        ))}
    </div>
  );
}
