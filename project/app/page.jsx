import Company from "@/components/Company";
import Home from "../components/Home";
import Home_2 from "@/components/Home_2";
import WeDesign from "@/components/WeDesign";
import PartnershipCarousel from "@/components/PartnershipCarousel";
import Beyond from "@/components/Beyond";
import Journey from "@/components/Journey";
import Price from "@/components/Price";
import FAQ from "@/components/FAQ";
import Outro from "@/components/Outro";

export default function Page() {
  return (
    <div className="overflow-x-hidden w-full">
      <Home />
      <Company />
      <Home_2 />
      <WeDesign/>
      <PartnershipCarousel/>
      <Beyond/>
      <Journey/>
      <Price/>
      <div className="bg-black">
      <FAQ/>
      </div>
      
      <Outro/>
    </div>
  );
}
