import { Input } from "../../../components/ui/input"
import { Button } from "../../../components/ui/button"
import { useNavigate } from "react-router-dom"

export default function FooterSection() {
  const navigate = useNavigate()

  return (
    <footer className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-4 text-lg font-semibold">한국 축제 소개</h3>
            <p className="text-sm text-gray-600">
              연중 다양한 축제와 행사를 통해 한국의 활기찬 문화유산을 발견해보세요.
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">빠른 링크</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Button variant="ghost" className="h-auto p-0 text-gray-600 hover:text-rose-500" onClick={() => navigate("/festivals")}>전체 축제</Button>
              </li>
              <li>
                <Button variant="ghost" className="h-auto p-0 text-gray-600 hover:text-rose-500" onClick={() => navigate("/festivals/period")}>기간별 축제</Button>
              </li>
              <li>
                <Button variant="ghost" className="h-auto p-0 text-gray-600 hover:text-rose-500" onClick={() => navigate("/community")}>커뮤니티</Button>
              </li>
              <li>
                <Button variant="ghost" className="h-auto p-0 text-gray-600 hover:text-rose-500" onClick={() => navigate("/mypage")}>마이페이지</Button>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">구독하기</h3>
            <p className="mb-4 text-sm text-gray-600">최신 축제 정보를 받아보세요.</p>
            <form className="flex gap-2">
              <Input type="email" placeholder="이메일 주소" className="h-10" />
              <Button type="submit" className="absolute relative right-0 w-10 h-auto bg-[#ff651b]/90 hover:bg-[#ff651b] rounded-xl text-[#fffefb]">
                구독
              </Button>
            </form>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8 text-center text-sm text-gray-500">
          <p>&copy; 2024 한국 축제 가이드. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
