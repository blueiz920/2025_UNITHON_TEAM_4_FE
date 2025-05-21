import { Link } from "react-router-dom";
import routePath from "../../routes/routePath";

export default function Navbar() {
  return (
    <div className="fixed top-0 z-30 w-full h-[90px] bg-white border-b shadow-sm">
      <div className="flex items-center h-full px-10 justify-between">
        {/* 왼쪽 정렬 */}
        <div className="flex gap-6 text-lg font-medium flex-grow text-[19px] mr-auto">
          <Link to={routePath.Onboarding} type='button'>온보딩</Link>
          <Link to={routePath.Main}>홈</Link>
          <Link to={routePath.Festival}>전국축제</Link>
          <Link to={routePath.FestivalPeriod}>기간별축제</Link>
          <Link to={routePath.Community}>커뮤니티</Link>
        </div>

        {/* 오른쪽 정렬 */}
        <div className="flex gap-4 items-center text-lg font-medium text-[19px]">
          <div className="relative group cursor-pointer">
            <span>🌐 언어</span>
            <div className="absolute hidden group-hover:block bg-white shadow-md rounded p-2 mt-2 z-10">
              {["한국어", "중국어", "일본어", "영어", "스페인어", "독일어", "프랑스어", "러시아어"].map((lang) => (
                <div key={lang} className="px-4 py-1 hover:bg-gray-100">{lang}</div>
              ))}
            </div>
          </div>
          <Link to={routePath.Login} type='button' className="px-2 py-1 bg-yellow-100">로그인</Link>
<Link to={routePath.Signup} className="px-2 py-1 text-red-400">회원가입</Link>
<Link to={routePath.MyPage} className="px-2 py-1">마이페이지</Link>
        </div>
      </div>
    </div>
  );
}
