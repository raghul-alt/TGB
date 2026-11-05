import { useEffect, useRef, useState } from "react";
import { ContactSection, Footer, SiteHeader, SubmitButton, ease, range, useProgress } from "./shared";

const B = "/assets/about";
const A = "/assets";
const PAD = "px-[clamp(20px,2.8vw,40px)]";

const STEPS = [
  { n: "01", title: "Discover", layers: ["a5476"], white: false, text: "We understand the land, the location, and the people who will shape the community before defining what it should become." },
  { n: "02", title: "Design", layers: ["b00af"], white: true, text: "We transform that understanding into purposeful spaces where architecture, nature, and lifestyle come together." },
  { n: "03", title: "Develop", layers: ["7f7d2", "ca372"], white: true, text: "We bring every detail to life through disciplined planning, precise execution, and uncompromising standards of quality." },
  { n: "04", title: "Deliver", layers: ["094fc", "9c716"], white: true, text: "We create enduring communities that people are proud to own, live in, and be part of for years to come." },
];

const Img = ({ src, className = "" }: { src: string; className?: string }) => (
  <img src={`${B}/${src}.png`} alt="" className={`absolute inset-0 size-full object-cover ${className}`} />
);

/* Pinned intro: hero -> split panel wipes in (image top-down, green panel bottom-up) -> philosophy wipes up. */
function Intro() {
  const ref = useRef<HTMLElement>(null);
  const p = useProgress(ref);
  const split = ease(range(p, 0.06, 0.36));
  const philo = ease(range(p, 0.5, 0.82));
  const cut = (t: number) => `${(1 - t) * 100}%`;

  return (
    <section ref={ref} className="relative h-[400vh] bg-[#1b3022]">
      <div className="sticky top-0 h-svh overflow-hidden">
        {/* Hero */}
        <div className="absolute inset-0">
          <img src={`${B}/57b5f.png`} alt="A timber cottage behind a white picket fence" className="absolute inset-0 size-full object-cover" />
          <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(90.42deg, rgba(0,0,0,0.6) 0.21%, rgba(102,102,102,0) 69.8%)" }} />
          <h1
            className={`absolute bottom-[clamp(28px,4.4vw,48px)] text-[clamp(72px,11.1vw,160px)] leading-[0.8] tracking-[-0.025em] text-[#fffdf0] ${PAD}`}
            style={{ transform: `translateY(${-split * 6}%)` }}
          >
            <span className="block whitespace-nowrap">
              <span className="f-serif-m">The </span>
              <span className="f-serif-bi">Great</span>
            </span>
            <span className="f-serif-bi block">Builds</span>
          </h1>
        </div>

        {/* Split panel */}
        <div className="absolute inset-0 flex flex-col md:flex-row">
          <div className="relative h-1/2 overflow-hidden md:h-full md:w-1/2" style={{ clipPath: `inset(0 0 ${cut(split)} 0)` }}>
            <div className="absolute inset-0 bg-[#d9d9d9]" />
            <div className="absolute inset-0 overflow-hidden">
              <img src={`${B}/b7007.png`} alt="" className="absolute left-[-52.66%] top-0 h-full w-[205.32%] max-w-none" />
            </div>
            <Img src="e8adc" />
            <Img src="615b7" />
            <Img src="b9df2" />
            <div className="absolute inset-0 bg-black/10" />
            <img src={`${B}/60899.png`} alt="Reviewing a project brochure" className="absolute inset-0 size-full object-cover" />
          </div>
          <div
            className="relative flex h-1/2 flex-none flex-col justify-between gap-[16px] overflow-hidden bg-[#1b3022] px-[clamp(20px,2.8vw,40px)] py-[20px] md:h-auto md:flex-1 md:gap-[24px] md:py-[clamp(28px,5.6vw,80px)] md:w-1/2"
            style={{ clipPath: `inset(${cut(split)} 0 0 0)` }}
          >
            <h2 className="max-w-[640px] text-[clamp(30px,3.9vw,56px)] leading-none tracking-[-0.025em] text-white">
              <span className="f-serif-m">We Build More Than Places. </span>
              <span className="f-serif-bi">We Build Possibility.</span>
            </h2>
            <div className="flex min-h-0 flex-1 flex-col items-start justify-between gap-[12px] md:flex-row md:items-end md:gap-[clamp(16px,2.8vw,40px)]">
              <p className="n-sr max-w-[300px] text-[14px] leading-[1.25] tracking-[-0.025em] text-[#fffdf0] md:text-[clamp(15px,1.67vw,24px)]">
                We believe the places we create should do more than occupy land. They should bring people closer to nature, create opportunities for connection, and offer lasting value for generations to come.
              </p>
              <div className="relative aspect-[16/7] w-full shrink-0 md:aspect-[300/371] md:w-[clamp(110px,20.8vw,300px)]">
                <img src={`${B}/e2e8d.png`} alt="Tree-lined boulevard through a planned township" className="absolute inset-0 size-full object-cover" />
              </div>
            </div>
          </div>
        </div>

        {/* Philosophy */}
        <div className="absolute inset-0" style={{ clipPath: `inset(${cut(philo)} 0 0 0)` }}>
          <img src={`${B}/69b07.png`} alt="A glass-fronted sales pavilion at sunset" className="absolute inset-0 size-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.6)] from-[15.37%] to-transparent to-[53.45%]" />
          <p className={`n-sm absolute top-[40px] text-[14px] uppercase leading-[1.5] tracking-[-0.025em] text-[#f7f5f0] ${PAD}`}>
            OUR <span className="font-['Satoshi'] font-medium italic">PHILOSOPHY</span>
          </p>
          <div
            className={`n-sr absolute bottom-[clamp(24px,4vw,40px)] flex max-w-[874px] flex-col gap-[clamp(20px,2.8vw,40px)] text-[clamp(17px,1.67vw,24px)] leading-[1.2] tracking-[-0.025em] text-[#fffdf0] ${PAD}`}
            style={{ transform: `translateY(${(1 - philo) * 40}px)` }}
          >
            <p>
              Every community begins with a vision of what life could be. At The Great Builds, we bring together{" "}
              <span className="font-['Satoshi'] font-bold italic">thoughtful planning, purposeful design, and a long term perspective</span> to create places where people can live, grow, and belong.
            </p>
            <p>
              Our focus goes beyond the immediate development. It extends to{" "}
              <span className="font-['Satoshi'] font-bold italic">the experiences a place creates, the relationships it nurtures, and the value it continues </span>
              to offer over time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Pinned statement with images drifting past at different speeds. */
function Statement() {
  const ref = useRef<HTMLElement>(null);
  const p = useProgress(ref);
  const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  const mediaQuery = window.matchMedia("(max-width: 767px)");

  const updateViewport = () => setIsMobile(mediaQuery.matches);

  updateViewport();
  mediaQuery.addEventListener("change", updateViewport);

  return () => mediaQuery.removeEventListener("change", updateViewport);
}, []);

const drift = (speed: number) => ({
  transform: isMobile
    ? `translateX(${(0.5 - p) * speed}vw)`
    : `translateY(${(0.5 - p) * speed}vh)`,
});

  return (
    <section ref={ref} className="relative h-[220vh] bg-[#1b3022]">
      <div className="sticky top-0 h-svh overflow-hidden">
        <div className="absolute left-[2.78%] top-[49.9%] h-[45.3%] w-[80%] min-w-[120px] md:left-[2.78%] md:top-[39.9%] md:h-[55.3%] md:w-[25%]" style={drift(70)}>
          <div className="absolute inset-0 bg-[#d9d9d9]" />
          <img src={`${B}/9032f.png`} alt="" className="absolute inset-0 size-full object-cover" />
          <div className="absolute inset-0 bg-black/20" />
        </div>
        <div className="absolute right-0 top-0 h-[22.8%] w-[70%] min-w-[140px] md:h-[72.8%] md:w-[32.4%]" style={drift(40)}>
          <div className="absolute inset-0 bg-[#d9d9d9]" />
          <img src={`${B}/4615a.png`} alt="" className="absolute inset-0 size-full object-cover" />
          <div className="absolute inset-0 bg-black/20" />
        </div>
        <div className="absolute left-[35.5%] top-[20.8%] h-[10.6%] w-[45%] min-w-[70px] md:top-[8.8%] md:h-[27.6%] md:w-[11.5%]" style={drift(110)}>
          <div className="absolute inset-0 bg-[#d9d9d9]" />
          <img src={`${B}/7183d.png`} alt="" className="absolute inset-0 size-full object-cover" />
        </div>
        <p className="absolute left-1/2 top-1/2 w-[88.1%] -translate-x-1/2 -translate-y-1/2 text-[clamp(22px,2.78vw,40px)] leading-[1.2] tracking-[-0.025em] text-[#f7f5f0]">
          <span className="f-serif-m">We exist to create thoughtfully planned communities that </span>
          <span className="f-serif-bi">connect people with nature, encourage meaningful experiences, and support a better way of living.</span>
          <span className="f-serif-m"> Every decision begins with understanding the land, the people it will serve, and the possibilities it holds for the future.</span>
        </p>
      </div>
    </section>
  );
}

/* Sticky heading with step panels that stack over each other as you scroll. */
function GreatBuildsWay() {
  const ref = useRef<HTMLElement>(null);
  const p = useProgress(ref);

  const steps = [
    {
      number: "01",
      title: "Discover",
      text: "We understand the land, the location, and the people who will shape the community before defining what it should become.",
      image: "Discover.png",
    },
    {
      number: "02",
      title: "Design",
      text: "We transform that understanding into purposeful spaces where architecture, nature, and lifestyle come together.",
      image: "Design.png",
    },
    {
      number: "03",
      title: "Develop",
      text: "We bring every detail to life through disciplined planning, precise execution, and uncompromising standards of quality.",
      image: "Develop.png",
    },
    {
      number: "04",
      title: "Deliver",
      text: "We create enduring communities that people are proud to own, live in, and be part of for years to come.",
      image: "Deliver.png",
    },
  ];

  return (
    <section
      ref={ref}
      className="relative h-[500vh] bg-[#1b3022]"
      aria-label="The Greatbuild Way"
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-[#1b3022] text-[#f9f6e6]">
        {/* This heading stays fixed while the four steps change on scroll. */}
        <header className="absolute inset-x-0 top-0 z-20 h-[27vh] border-b border-white/35 px-[clamp(20px,2.8vw,40px)] pt-[12vh] md:pt-[4vh]">
          <p className="f-sans text-[14px] tracking-[-0.35px]">
            THE GREATBUILD WAY
          </p>

          <h2 className="mt-[20px] text-[clamp(40px,3.9vw,56px)] leading-[1.2] tracking-[-1.4px]">
            <span className="f-serif-m">Purpose in </span>
            <span className="f-serif-bi">Every Step</span>
          </h2>
        </header>

        {/* Each step occupies the same frame and crossfades vertically. */}
        <div className="absolute inset-x-0 bottom-0 top-[27vh]">
          {steps.map((step, i) => {
            const start = i / steps.length;

const enter =
  i === 0
    ? 1
    : ease(range(p, start, start + 0.18));

const opacity = 1;

const translateY = (1 - enter) * 100;

            return (
              <article
  key={step.number}
  className="absolute inset-0 px-[clamp(20px,2.8vw,40px)]"
  aria-hidden={enter < 0.95}
  style={{
    opacity: 1,
    transform: `translate3d(0, ${translateY}%, 0)`,
    zIndex: i + 1,
    pointerEvents: enter > 0.95 ? "auto" : "none",
    willChange: "transform",
    backgroundColor: "#1b3022",
  }}
              >
                <div className="grid h-full grid-cols-1 md:grid-cols-[44%_56%]">
                  {/* Large step number on the left, matching the Figma frame. */}
                  <div className="flex items-start pt-[2vh] md:pt-[9vh]">
                    <span className="f-serif-bi text-[clamp(100px,12vw,180px)] leading-[0.9] tracking-[-7px]">
                      {step.number}
                    </span>
                  </div>

                  {/* Step title, wide image frame and supporting copy on the right. */}
<div className="flex min-w-0 flex-col items-start pt-0 md:pt-[4.3vh]">
<h3 className="f-serif-bi mb-[3vh] text-[clamp(28px,2.5vw,38px)] leading-none">
                        {step.title}
                    </h3>

                    <div className="relative aspect-[1.60/1] max-h-[58vh] w-full overflow-hidden bg-[#344637] md:max-h-[46vh]">
  <img
    src={`${A}/${step.image}`}
    alt={`${step.title} — The GreatBuild Way`}
    className="absolute inset-0 size-full object-cover"
    loading="lazy"
  />
</div>

<p className="f-sans-r mt-[2.5vh] max-w-[520px] text-[clamp(16px,1.05vw,16px)] leading-[1.5] text-[#d8d1c5]">                      {step.text}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <main className="bg-[#1b3022]">
  <SiteHeader base={B} logo="15ac5" />
  <Intro />
      <Statement />
      <GreatBuildsWay />
      <ContactSection submit={<SubmitButton base={B} />} />
      <Footer />
    </main>
  );
}
