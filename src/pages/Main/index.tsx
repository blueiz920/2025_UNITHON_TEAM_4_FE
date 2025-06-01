import Hero from "./components/Hero"
import SeasonalSection from "./components/SeasonSection"
import KeywordSection from "./components/KeywordSection"
import FooterSection from "./components/FooterSection"
import  Navbar  from "../../components/Navbar"
import { useState } from "react"


export default function MainPage() {
  const [currentSeason, setCurrentSeason] = useState(0)
  return (
    <div className="min-h-screen bg-[#fffefb] ">
      <Navbar />
      <Hero setCurrentSeason={setCurrentSeason}/>
      <SeasonalSection currentSeason={currentSeason}/>
      <KeywordSection />
      <FooterSection />
    </div>
  )
}
