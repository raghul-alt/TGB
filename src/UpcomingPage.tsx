import { ContactSection, Footer, SiteHeader, SubmitButton } from "./shared";

const U = "/assets/upcoming";

export default function UpcomingPage() {
  return (
    <main className="bg-[#f7f5f0]">
      <section className="relative flex min-h-[clamp(560px,100svh,832px)] flex-col overflow-hidden bg-[#1b3022]">
        <img
          src={`${U}/hero-leaves.jpg`}
          alt="Sunlight filtering through green leaves"
          className="upcoming-bg absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-black/25" />
        <SiteHeader base={U} logo="e5a13" />
        <div className="relative flex flex-1 flex-col items-center justify-center gap-[clamp(40px,5.6vw,80px)] px-[20px] pb-[86px] text-center">
          <h1 className="upcoming-rise text-[clamp(64px,11.1vw,160px)] leading-[0.8] tracking-[-0.025em] text-[#fffdf0]">
            <span className="f-serif-m">Coming </span>
            <span className="f-serif-bi">Soon...</span>
          </h1>
          <p className="upcoming-rise text-[clamp(16px,1.39vw,20px)] uppercase leading-[1.5] tracking-[-0.025em] text-[#c59d48] [animation-delay:200ms]">
            <span className="font-['Satoshi'] font-light italic">CODE NAME:</span>{" "}
            <span className="font-['Satoshi'] font-bold italic">NATURE</span>
          </p>
        </div>
      </section>

      <ContactSection submit={<SubmitButton base={U} />} />
      <Footer />
    </main>
  );
}
