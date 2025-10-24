"use client";
import { useRef, useEffect, useState } from "react";
import PriceBox from "../PriceBox";
import { trackBookCall } from "@/lib/gtag";

export default function PriceMobile() {
  const videoRef = useRef(null);
  const [currencyData, setCurrencyData] = useState({
    symbol: "$",
    code: "USD",
    rate: 1,
  });
  const [convertedPrices, setConvertedPrices] = useState({
    price1: null,
    price2: null,
    price3: null,
  });

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    v.muted = true;
    v.playsInline = true;

    const start = async () => {
      try {
        await v.play();
      } catch (err) {
        console.error("Autoplay blocked or failed:", err);
      }
    };

    if (v.readyState >= 2) start();
    else v.addEventListener("canplay", start, { once: true });

    return () => v.removeEventListener("canplay", start);
  }, []);

  useEffect(() => {
    const fetchCurrencyData = async () => {
      try {
        // Get user's country from IP
        const ipResponse = await fetch("https://ipapi.co/json/");
        const ipData = await ipResponse.json();
        const countryCode = ipData.country_code;
        const currencyCode = ipData.currency;

        // Get exchange rates
        const ratesResponse = await fetch(
          `https://api.exchangerate-api.com/v4/latest/USD`
        );
        const ratesData = await ratesResponse.json();
        const rate = ratesData.rates[currencyCode] || 1;

        // Currency symbols map
        const currencySymbols = {
          USD: "$", EUR: "€", GBP: "£", JPY: "¥", INR: "₹", AUD: "A$",
          CAD: "C$", CHF: "Fr", CNY: "¥", SEK: "kr", NZD: "NZ$", MXN: "Mex$",
          SGD: "S$", HKD: "HK$", NOK: "kr", KRW: "₩", TRY: "₺", RUB: "₽",
          BRL: "R$", ZAR: "R", DKK: "kr", PLN: "zł", THB: "฿", IDR: "Rp",
          HUF: "Ft", CZK: "Kč", ILS: "₪", CLP: "CLP$", PHP: "₱", AED: "د.إ",
          SAR: "﷼", MYR: "RM", RON: "lei", VND: "₫", ARS: "ARS$", UAH: "₴",
          NGN: "₦", BDT: "৳", PKR: "₨", EGP: "E£", QAR: "﷼", KWD: "د.ك",
          COP: "COL$", PEN: "S/", OMR: "﷼", KES: "KSh", CRC: "₡", UYU: "$U",
          GTQ: "Q", HRK: "kn", MAD: "د.م.", JOD: "د.ا", BHD: "د.ب", LKR: "Rs",
          TND: "د.ت", DZD: "د.ج", IQD: "ع.د", LBP: "ل.ل", VEF: "Bs", GHS: "₵",
          TZS: "TSh", XOF: "CFA", UGX: "USh", ZMW: "ZK", BIF: "FBu",
          MUR: "₨", ISK: "kr", BGN: "лв", AMD: "֏", MNT: "₮", NPR: "₨",
          ETB: "Br", RSD: "din", GEL: "₾", MZN: "MT", KZT: "₸", ALL: "L",
          MKD: "ден", BWP: "P", JMD: "J$", PYG: "₲", AZN: "₼", DOP: "RD$",
          LYD: "ل.د", BOB: "Bs.", SYP: "£", HNL: "L", NAD: "N$", TTD: "TT$",
          AWG: "ƒ", SRD: "$", NIO: "C$", MMK: "K", PAB: "B/.", AFN: "؋",
        };

        const symbol = currencySymbols[currencyCode] || currencyCode;

        setCurrencyData({
          symbol,
          code: currencyCode,
          rate,
        });

        // Convert prices
        const prices = [4800, 6500, 8000];
        const converted = prices.map((price) => {
          const convertedAmount = Math.round(price * rate);
          return new Intl.NumberFormat("en-US").format(convertedAmount);
        });

        setConvertedPrices({
          price1: `${symbol}${converted[0]}`,
          price2: `${symbol}${converted[1]}`,
          price3: `${symbol}${converted[2]}+`,
        });
      } catch (error) {
        console.error("Error fetching currency data:", error);
        // Keep defaults on error
      }
    };

    fetchCurrencyData();
  }, []);

  const openCalendly = () => {
    trackBookCall('pricing_section_mobile');
    window.open('https://calendly.com/hello-designresponsible/new-meeting?background_color=000000&text_color=ffffff&primary_color=e8fc53&month=2025-10', '_blank');
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-800">
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        
      >
        <source src="/videos/price.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Black transparent overlay */}
      <div className="absolute inset-0 bg-black/70 z-[5]"></div>

      {/* Mobile Content */}
      <div className="relative z-10 py-12 px-4">
        <div className="w-full">
          {/* Headers Container */}
          <div className="max-w-sm mx-auto mb-12">
            {/* Main Header */}
            <h1
              className="text-center mb-6 text-[42px] leading-[1.1]"
              style={{
                fontFamily: "Syne, sans-serif",
                color: "#FFFFFF"
              }}
            >
              Plans made clear. <br /> Designs <br />made unforgettable.
            </h1>

            {/* Sub Header */}
            <p
              className="text-center text-[24px] leading-[1.3]"
              style={{
                fontFamily: "Questrial, sans-serif",
                color: "#FFFFFF"
              }}
            >
              No hidden costs. No compromises. <br /> Just thoughtful design at a <br/> price that respects your growth.
            </p>
          </div>

          {/* Stacked Pricing Cards */}
          <div className="space-y-8 flex flex-col items-center [&_.group:hover_.opacity-0]:!opacity-100 [&_.opacity-0]:!opacity-100">
            <PriceBox 
              title="PURELY WEBSITE"
              tag="Quick"
              price="4800"
              formattedPrice={convertedPrices.price1}
              description="For startups,<br/> small businesses."
              cta="Get started"
              onCtaClick={openCalendly}
              backgroundImage="/image/price/img_1.png"
              bulletPoints={[
                "Starter Landing Page<br/>[1-5 Pages]",
                "A high-performing website.",
                "Modern, responsive design.",
                "Essential integrations<br/> with contact forms, analytics,<br/>SEO basics.",
                "Fast turnaround,<br/>future-ready build.",
              ]}
            />
            <PriceBox 
              title="WEBSITE+"
              tag="Popular"
              isTagYellow={true}
              price="6500"
              formattedPrice={convertedPrices.price2}
              description="For growing businesses that<br/>need their website to work as<br/>hard as they do."
              cta="Get started"
              onCtaClick={openCalendly}
              backgroundImage="/image/price/img_2.png"
              bulletPoints={[
                "6–15 pages,<br/>with Content Management<br/>System & Payment setup",
                "Everything in Purely Website",
                "Deeper brand alignment<br/>& storytelling-driven design",
                "Advanced integrations<br/>(CRM, e-commerce,<br/>automation)",
                "Performance optimisation<br/>for speed, SEO, & conversions",
                "Ongoing support & light<br/>content management",
              ]}
            />
            <PriceBox 
              title="BEYOND SITE"
              tag="Comprehensive +"
              price="8000+"
              formattedPrice={convertedPrices.price3}
              description="For ambitious brands,<br/>non-profits, and enterprises<br/>who want to lead change."
              cta="Get Started"
              onCtaClick={openCalendly}
              backgroundImage="/image/price/img_3.png"
              bulletPoints={[
                "Custom Website for a tailored digital product or SaaS platform<br/>with core features. Highly<br/>customizable, scalable.",
                "Everything in Website +",
                "Continuous strategy & evolution",
                "Conversion-focused<br/>campaigns, landing pages,<br/>and A/B testing",
                "Content strategy<br/>& storytelling guidance",
                "Dedicated design support<br/>(retainer-style)",
                "Priority access to the DR team",
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 