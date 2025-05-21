import Navbar from "../../components/Navbar";

export default function MainPage() {
  return (
    <div className="flex flex-col w-screen h-screen ">
      <div
        className="fixed top-0 left-0 w-full h-screen bg-cover z-0"
      
      />
      <div className="relative"><Navbar /></div>
      <div className="flex flex-col items-center justify-start w-screen h-auto p-8 overflow-y-hidden pt-[90px]">
        <h1 className="text-3xl font-bold text-red-900">메인d 페이지입니다 🎉</h1>
        <p className="mt-4 text-blue-600">이곳은 메인 콘텐츠 영역입니다.</p>
    
    <div className="flex gap-6 bg-yellow-200 p-4 ">
  <span className="bg-blue-300 w-20 h-20 text-yellow-500">A</span>
  <div className="bg-green-300 w-20 h-20">B</div>
  <div className="bg-red-300 w-20 h-20">C</div>
</div>
<div className="bg-red-500 text-green text-xl mt-4">🔥 Tailwind 테스트</div>

      </div>
    </div>
  );
}
