import { useRef, useState } from "react";
import {
  ContactSection,
  Footer,
  SiteHeader,
  SubmitButton,
  clamp,
  ease,
  range,
  useProgress,
} from "./shared";

const C = "/assets/royalgreens";
const PAD = "px-[clamp(20px,2.8vw,40px)]";
const png = (name: string) => `${C}/${name}.webp`;
const cut = (t: number) => `${(1 - t) * 100}%`;

const GALLERY = [
  {
    img: "66ee5",
    title: ["Timeless Forms, ", "Thoughtfully Designed"],
    text: "Every architectural element is considered with purpose, creating spaces that balance form, function, and a timeless sense of character. From the overall planning to the smallest structural details, design works together to create places that feel cohesive, refined, and enduring.",
  },
  {
    img: "969e5",
    title: ["Nature Woven ", "Into Living"],
    text: "Green spaces and natural surroundings are thoughtfully integrated into the community, creating a seamless connection between the built environment and nature. Landscapes provide room to pause, explore, connect, and experience a more balanced way of everyday living.",
  },
  {
    img: "4d4d1",
    title: ["Life Designed ", "Around You"],
    text: "Every space is shaped around the experiences that make everyday life meaningful. From moments of connection and recreation to quiet time and exploration, the community creates opportunities to live, gather, unwind, and enjoy life at your own pace.",
  },
  {
    img: "398d9",
    title: ["Thoughtful Touches, ", "Meaningful Moments"],
    text: "It is the considered details that bring a place together. From materials and finishes to shared spaces and everyday conveniences, each element is thoughtfully resolved to create an experience that feels intentional, comfortable, and lasting.",
  },
];

const HOTSPOTS = [
  {
    x: 46.9,
    y: 55.9,
    icon: "5aa80",
    title: "Green spaces",
    text: "Green spaces at Royal Greens go beyond landscaped gardens, bringing nature closer through thoughtfully planned berry plantations. These lush spaces offer opportunities to enjoy fresh produce, connect with nature, and experience the simple pleasures of outdoor living. Surrounded by greenery, the plantations add to the community's natural charm while creating a refreshing environment for relaxation, exploration, and a healthier lifestyle.",
  },
  {
    x: 16.7,
    y: 20.8,
    icon: "cb61c",
    title: "Community spaces",
    text: "Community spaces at Royal Greens are designed to bring residents closer to nature and create opportunities for meaningful connections. Thoughtfully planned open areas and landscaped surroundings offer room to unwind, spend quality time with family, and enjoy outdoor activities. These shared spaces foster a sense of belonging, encouraging interaction and a stronger community spirit while making everyday living more enjoyable.",
  },
  {
    x: 61.2,
    y: 15.9,
    icon: "f2640",
    title: "Amenities",
    text: "Royal Greens offers thoughtfully curated amenities that bring comfort, recreation, and convenience into everyday living. From spaces for relaxation and outdoor activities to facilities that encourage social interaction, every amenity is designed to complement a nature-inspired lifestyle. These shared spaces create opportunities to unwind, stay active, and connect with the community, making everyday experiences more enriching.",
  },
];

const Shade = () => (
  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.6)] from-[15.37%] to-transparent to-[53.45%]" />
);

/* Hero, idea, masterplan and landscape storytelling share one pinned scroll stage. */
function Story() {
  const ref = useRef<HTMLElement>(null);
  const p = useProgress(ref);

  const zoom = ease(range(p, 0, 0.08));
  const drift = ease(range(p, 0.08, 0.13));
  const exit = ease(range(p, 0.13, 0.22));
  const plan = ease(range(p, 0.26, 0.35));
  const card = ease(range(p, 0.37, 0.43));
  const hotspotProgress = range(p, 0.37, 0.57);

const activeSpot = Math.min(
  HOTSPOTS.length - 1,
  Math.floor(hotspotProgress * HOTSPOTS.length)
);
const goToSpot = (i: number) => {
  const el = ref.current;
  if (!el) return;

  const target =
    0.37 + ((i + 0.5) / HOTSPOTS.length) * 0.27;

  window.scrollTo({
    top:
      el.offsetTop +
      target * (el.offsetHeight - window.innerHeight),
    behavior: "smooth",
  });
};
  const landscape = ease(range(p, 0.59, 0.69));
const future = ease(range(p, 0.77, 0.87));
  const fade = 1 - zoom;
  const lift = `translateY(${-zoom * 110}px)`;

  return (
    <section ref={ref} className="relative h-[1050vh] bg-[#fffdf0]">
      <div className="sticky top-0 h-svh overflow-hidden">
        {/* The Idea Behind the Project */}
        <div className="absolute inset-0 bg-[#fffdf0]">
          <img
  src={png("14a21")}
  alt=""
  className="absolute right-[5.5%] top-0 h-full w-[38.5%] object-cover max-md:left-1/2 max-md:top-[87.5%] max-md:bottom-auto max-md:h-[100vw] max-md:w-[25svh] max-md:-translate-x-1/2 max-md:-translate-y-1/2 max-md:rotate-90 max-md:object-cover"
/>
          <div className={`absolute left-0 top-1/2 flex w-full max-w-[calc(61%+40px)] max-md:max-w-none -translate-y-1/2 flex-col gap-[20px] ${PAD}`}>
            <p className="n-sm text-[14px] uppercase leading-[1.5] tracking-[-0.025em] text-[#444342]">
              THE IDEA <span className="font-['Satoshi'] font-medium italic">BEHIND THE PROJECT</span>
            </p>
            <p className="text-[clamp(30px,3.9vw,56px)] leading-[1.2] tracking-[-0.025em] text-[#1e1e1e]">
              <span className="f-serif">
                Envisioned as a place to step away from the everyday rush, it offers an opportunity to {" "}
              </span>
              <span className="f-serif-sbi">
                embrace open spaces, enjoy meaningful moments, and shape a lifestyle that feels closer to nature.
              </span>
            </p>
          </div>
        </div>

        {/* Hero */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ transform: `translateY(${-exit * 100}%)` }}
        >
          <div
            className="absolute inset-0"
            style={{
              transform: `translate(${-zoom * 17.64}vw, ${zoom * 17.07}vh) scale(${1 + zoom * 0.4236})`,
            }}
          >
            <img
  src={png("9604b")}
  alt="Royal Greens entrance and landscaped development"
  className="absolute inset-0 size-full object-cover"
/>
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#142219]/65 via-transparent to-black/20" />
          </div>

          <div
            className={`absolute left-0 top-[40.9%] flex flex-col ${PAD}`}
            style={{ opacity: fade, transform: lift }}
          >
            <p className="n-sm text-[14px] uppercase leading-[1.5] tracking-[-0.025em] text-[#ddd]">
              ONGOING{" "}
              <span className="font-['Satoshi'] font-bold italic">
                PROJECT
              </span>
            </p>

            <h1 className="mt-[clamp(24px,3vw,40px)] text-[clamp(72px,11.1vw,160px)] leading-[0.8] tracking-[-0.025em] text-[#fffdf0]">
              <span className="f-serif-m block">Royal</span>
              <span className="f-serif-bi block">Greens</span>
            </h1>

            <p className="mt-[clamp(16px,1.8vw,24px)] max-w-[340px] text-[16px] leading-[1.5] tracking-[-0.025em] text-[#fffdf0]">
              A thoughtfully envisioned retreat where comfortable living, leisure, and the natural surroundings come together to create a more considered way of life.
            </p>
          </div>

          <div
            className="absolute bottom-[25%] right-0 w-[max(320px,34.93%)] bg-[#1b3022] p-[clamp(20px,2.2vw,32px)] max-sm:w-[calc(100%-40px)]"
            style={{
              clipPath: `inset(${cut(zoom)} 0 0 0)`,
              transform: `translateY(${-(drift * 12 + exit * 18)}vh)`,
            }}
          >
            <p className="f-serif-m text-[clamp(22px,2.5vw,36px)] leading-none tracking-[-0.025em] text-[#fffdf0]">
Royal Greens is thoughtfully envisioned as a peaceful retreat where natural surroundings, open spaces, and comfortable living come together to create a more balanced way of life.
            </p>
          </div>
        </div>

        {/* Aerial masterplan and markers */}
        <div
          className="absolute inset-0 hidden bg-white md:block"
          style={{
            clipPath: `inset(${cut(plan)} 0 0 0)`,
            pointerEvents: plan > 0.5 && landscape < 0.5 ? "auto" : "none",
          }}
        >
          <img
            src={png("66bf1")}
            alt="Aerial masterplan of Royal Greens"
            className="absolute inset-0 size-full object-cover"
          />

                    {HOTSPOTS.map((spot, i) => (
            <button
              key={i}
              type="button"
              aria-label={spot.title}
              onClick={() => goToSpot(i)}
              className="absolute grid size-8 -translate-x-1/2 -translate-y-1/2 cursor-pointer place-items-center outline-none"
              style={{
                left: `${spot.x}%`,
                top: `${spot.y}%`,
              }}
            >
              <span
                className={`absolute -inset-[6px] rounded-full border-2 border-white transition-all duration-500 ${
                  i === activeSpot && card > 0.5
                    ? "scale-100 opacity-100"
                    : "scale-50 opacity-0"
                }`}
              />

              <img
  src={`${C}/${spot.icon}.svg`}
  width={32}
  height={32}
  alt=""
  className="block size-8"
/>
            </button>
          ))}

          <div
  className="absolute bottom-0 left-0 w-[min(519px,100%)] bg-[#1b3022]"
  style={{ clipPath: `inset(${cut(card)} 0 0 0)` }}
>
  <div className="grid px-[clamp(20px,2.8vw,40px)] pb-[clamp(24px,2.8vw,40px)] pt-[clamp(20px,2.5vw,36px)]">
    {HOTSPOTS.map((item, i) => (
      <div
        key={item.title}
        className="col-start-1 row-start-1 flex flex-col gap-[16px] transition-all duration-500 ease-out"
        style={{
          opacity: activeSpot === i ? 1 : 0,
          transform: `translateY(${activeSpot === i ? 0 : 12}px)`,
        }}
        aria-hidden={activeSpot !== i}
      >
        
        <h2 className="f-serif-m text-[clamp(28px,2.8vw,40px)] leading-none tracking-[-0.025em] text-[#fffdf0]">
          {item.title}
        </h2>

        <p className="n-sr text-[clamp(14px,1.39vw,20px)] leading-[1.5] tracking-[-0.025em] text-[#ddd]">
          {item.text}
        </p>
      </div>
    ))}
  </div>
</div>
        </div>
        {/* Mobile masterplan */}
<div
  className="absolute inset-0 flex flex-col bg-white md:hidden"
  style={{
    clipPath: `inset(${cut(plan)} 0 0 0)`,
    pointerEvents: plan > 0.5 && landscape < 0.5 ? "auto" : "none",
  }}
>
  {/* Aerial image */}
  <div className="relative min-h-0 flex-1">
    <img
      src={png("66bf1")}
      alt="Aerial masterplan of Royal Greens"
      className="size-full object-cover"
    />

    {/* Hotspot selectors */}
    <div className="absolute bottom-[16px] left-[12px] right-[12px] flex flex-wrap gap-[8px]">
      {HOTSPOTS.map((spot, i) => (
        <button
          key={spot.title}
          type="button"
          onClick={() => goToSpot(i)}
          className={`rounded-full border border-white/40 px-[14px] py-[8px] text-[12px] transition-colors ${
            activeSpot === i
              ? "bg-[#fffdf0] text-[#1b3022]"
              : "bg-[#1b3022]/70 text-white"
          }`}
        >
          {spot.title}
        </button>
      ))}
    </div>
  </div>

  {/* Hotspot information */}
  <div className="relative flex-none bg-[#1b3022] px-[clamp(20px,2.8vw,40px)] py-[clamp(24px,4vh,40px)]">
    {HOTSPOTS.map((item, i) => (
      <div
        key={item.title}
        className="transition-all duration-500"
        style={{
          display: activeSpot === i ? "flex" : "none",
        }}
      >
        <div className="flex flex-col gap-[16px]">
          <h2 className="f-serif-m text-[clamp(28px,7vw,36px)] leading-none text-[#fffdf0]">
            {item.title}
          </h2>
          <p className="n-sr text-[14px] leading-[1.5] text-[#ddd]">
            {item.text}
          </p>
        </div>
      </div>
    ))}
  </div>
</div>

        {/* Landscape image and statement */}
        <div
          className="absolute inset-0 bg-white"
          style={{ transform: `translateY(${(1 - landscape) * 100}%)` }}
        >
          <img
            src={`${C}/landscape.webp`}
            alt="A quiet outdoor space surrounded by greenery"
            className="absolute inset-0 size-full object-cover"
          />
          <Shade />
          <p className={`absolute bottom-[clamp(32px,9vh,120px)] left-0 max-w-[calc(83.2%+40px)] text-[clamp(28px,3.9vw,56px)] leading-none tracking-[-0.025em] text-[#fffdf0] ${PAD}`}>
            <span className="f-serif">
              Landscapes, open spaces, and natural surroundings form an integral part of the community -{" "}
            </span>
            <span className="f-serif-sbi">creating room to slow down, connect,</span>
            <span className="f-serif"> and experience the outdoors.</span>
          </p>
        </div>

        {/* Future-home message */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 0 0 ${cut(future)})` }}
        >
          <img
  src={png("66bf1")}
  alt="Aerial view of Shankar Enclave"
  className="absolute inset-0 size-full object-cover"
/>
          <Shade />
          <p className={`n-sr absolute bottom-[clamp(32px,12vh,150px)] left-0 max-w-[524px] text-[clamp(16px,1.39vw,20px)] leading-[1.2] tracking-[-0.025em] text-[#fffdf0] ${PAD}`}>
            A connection to nature can change the way a place feels. At Royal Greens, the vision is to create an environment where open spaces and natural surroundings offer a welcome sense of calm, making room for slower moments and a more balanced way of living.
          </p>
        </div>
      </div>
    </section>
    
  );
}


function PlotOptions() {
  const [selectedPlot, setSelectedPlot] = useState(0);
  const [previousPlot, setPreviousPlot] = useState(0);

  const plots = [
    { size: "30X40", image: "plot-30x40" },
    { size: "30X50", image: "plot-30x50" },
    { size: "40X60", image: "plot-40x60" },
  ];

  const activePlot = plots[selectedPlot];
  const oldPlot = plots[previousPlot];

  const handlePlotChange = (index: number) => {
    if (index === selectedPlot) return;

    setPreviousPlot(selectedPlot);
    setSelectedPlot(index);
  };

  return (
    <section className="relative min-h-svh bg-[#fffdf0] px-[clamp(24px,3.7vw,56px)] py-[clamp(48px,6vw,88px)] text-[#1e1e1e]">

      <style>{`
        @keyframes plotImageReveal {
          from {
            clip-path: inset(100% 0 0 0);
          }
          to {
            clip-path: inset(0 0 0 0);
          }
        }

        .plot-image-reveal {
          animation: plotImageReveal 900ms cubic-bezier(0.76, 0, 0.24, 1) both;
        }
      `}</style>

      <div className="grid min-h-[calc(100svh-12vw)] grid-cols-2 items-stretch gap-[clamp(40px,5vw,80px)] max-md:grid-cols-1 max-md:grid-rows-[auto_minmax(0,1fr)]">

        {/* Left content */}
        <div className="flex flex-col justify-between max-md:justify-start">
          <div>
            <p className="n-sm text-[14px] uppercase tracking-[-0.025em]">
              PLOT <span className="font-['Satoshi'] font-bold italic">OPTIONS</span>
            </p>

            <h2 className="mt-7 max-w-[570px] text-[clamp(38px,4vw,58px)] leading-[1.08] tracking-[-0.035em]">
              <span className="f-serif block">
                Choose the Right Size
              </span>
              <span className="f-serif-sbi block">
                for your Dreams
              </span>
            </h2>
          </div>

          <p className="n-sr max-w-[530px] text-[clamp(16px,1.35vw,20px)] leading-[1.3] tracking-[-0.025em] text-[#34463a] max-md:mt-6">
            Carefully designed plots available in various sizes to
            accommodate diverse lifestyles, ranging from a charming
            family residence to a large, modern estate ready for the future.
          </p>
        </div>

        {/* Right image and selector */}
        <div className="relative flex min-h-0 items-center justify-center max-md:h-full">
  <div className="relative h-full w-full">

            {/* Layered image reveal */}
            <div className="relative h-full min-h-0 w-full overflow-hidden">

              {/* Previous image stays underneath */}
              <img
                src={png(oldPlot.image)}
                alt={`Royal Greens ${oldPlot.size} plot`}
                className="absolute inset-0 size-full object-cover"
              />

              {/* New image reveals from bottom to top */}
              <img
                key={selectedPlot}
                src={png(activePlot.image)}
                alt={`Royal Greens ${activePlot.size} plot`}
                className="plot-image-reveal absolute inset-0 size-full object-cover"
              />

            </div>

            {/* Plot size selector */}
            <div className="absolute left-[2%] right-[2%] top-[2%] grid grid-cols-3 bg-[#fffdf0] p-[4px]">

              {/* Sliding active background */}
              <div
                className="absolute bottom-[4px] left-[4px] top-[4px] w-[calc((100%-8px)/3)] bg-[#1b3022] transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(${selectedPlot * 100}%)`,
                }}
              />

              {plots.map((plot, i) => (
                <button
                  key={plot.size}
                  type="button"
                  onClick={() => handlePlotChange(i)}
                  aria-pressed={selectedPlot === i}
                  className={`relative z-10 flex min-h-[56px] items-center justify-center text-[clamp(15px,1.7vw,25px)] transition-colors duration-300 ${
                    selectedPlot === i
                      ? "font-semibold text-[#fffdf0]"
                      : "text-[#555]"
                  }`}
                >
                  {plot.size}
                </button>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}


export default function RoyalGreensPage() {
  return (
    <main className="bg-[#fffdf0]">
            <SiteHeader base="/assets/countryside" logo="ba7b1" />
      <Story />
      <PlotOptions />
      <ContactSection submit={<SubmitButton base={C} />} />
      <Footer />
    </main>
  );
}