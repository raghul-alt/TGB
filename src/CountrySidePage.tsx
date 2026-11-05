import { useEffect, useRef, useState } from "react";
import { ShaderFill } from "./lib/custom-effect-runtime/index";
import {
  setup as setupFooterShader,
  render as renderFooterShader,
  manifest as manifestFooterShader,
} from "./lib/custom-effects/CodeComponentId_8ce92017e53431a2f04b3574f4ba7c98f6f55f1e_625";
import { ContactSection, Footer, SiteHeader, SubmitButton, clamp, ease, range, useProgress } from "./shared";

const C = "/assets/countryside";
const PAD = "px-[clamp(20px,2.8vw,40px)]";
const png = (n: string) => `${C}/${n}.png`;
const cut = (t: number) => `${(1 - t) * 100}%`;

const HOTSPOTS = [
  { icon: "98794", x: 46.88, y: 55.89, title: "Green spaces", text: "Green spaces are essential for urban environments, providing a breath of fresh air amidst the concrete jungle. They offer a refuge for wildlife, a place for community gatherings, and a venue for recreational activities. Parks, gardens, and green rooftops not only enhance the aesthetic appeal of a city but also contribute to the well-being of its residents by promoting outdoor activities and relaxation." },
  { icon: "30e15", x: 16.74, y: 20.79, title: "Community spaces", text: "Community spaces are the heart of urban life, bringing people together and fostering connections. These areas, whether parks, plazas, or community centers, provide a venue for social interaction, recreation, and cultural events. Well-planned community spaces enhance accessibility, promote safety, and encourage exploration, making them essential for vibrant neighborhoods. From lively gathering spots to serene green spaces, they enrich the daily experiences of both residents and visitors." },
  { icon: "3acf1", x: 61.18, y: 15.87, title: "Amenities", text: "Amenities play a crucial role in enhancing the quality of life in urban environments. They include features like parks, sports facilities, and community centers that cater to diverse needs. These spaces not only provide opportunities for recreation and relaxation but also serve as hubs for social interaction and community engagement. Well-designed amenities promote inclusivity, ensuring everyone can enjoy the benefits they offer." },
  { icon: "2a1f2", x: 69.24, y: 78.13, title: "Roads", text: "Roads are the veins of urban life, connecting neighborhoods and facilitating movement. They serve as pathways for vehicles, cyclists, and pedestrians, enabling the flow of commerce and community interaction. Well-designed roads enhance accessibility, promote safety, and encourage exploration, making them vital for a thriving city. From bustling avenues to quiet lanes, roads shape the daily experiences of residents and visitors alike." },
];

const LIVING = [
  { text: "Spaces that bring people closer together.", layers: ["183c8"] },
  { text: "Moments designed for rest and relaxation.", layers: ["3fb10"] },
  { text: "Nature and experiences beyond your doorstep.", layers: ["4d022"] },
  { text: "Spaces made for movement and recreation.", layers: ["2b4b7", "8da35"] },
  { text: "A community that feels like home.", layers: ["f515a"] },
];

const DETAILS = [
  { value: "10+", label: "Community Amenities", layers: ["03c17", "d7e71"] },
  { value: "12+", label: "Residential Plots", layers: ["9cbd5", "30a9b", "f3e04"] },
  { value: "40 FT", label: "Wide Internal Roads", layers: ["afef2", "277be", "8ef8c"] },
  { value: "45%", label: "Dedicated Green Spaces", layers: ["c6e08", "00968"] },
  { value: "100%", label: "Gated Development", layers: ["aba51", "ca4a8"] },
];

const GALLERY = [
  { img: "000f6", title: ["Timeless Forms, ", "Thoughtfully Designed"], text: "Every architectural element is considered with purpose, creating spaces that balance form, function, and a timeless sense of character. From the overall planning to the smallest structural details, design works together to create places that feel cohesive, refined, and enduring." },
  { img: "8b72b", title: ["Nature Woven ", "Into Living"], text: "Green spaces and natural surroundings are thoughtfully integrated into the community, creating a seamless connection between the built environment and nature. Landscapes provide room to pause, explore, connect, and experience a more balanced way of everyday living." },
  { img: "4eec2", title: ["Life Designed ", "Around You"], text: "Every space is shaped around the experiences that make everyday life meaningful. From moments of connection and recreation to quiet time and exploration, the community creates opportunities to live, gather, unwind, and enjoy life at your own pace." },
  { img: "1aefc", title: ["Thoughtful Touches, ", "Meaningful Moments"], text: "It is the considered details that bring a place together. From materials and finishes to shared spaces and everyday conveniences, each element is thoughtfully resolved to create an experience that feels intentional, comfortable, and lasting." },
];

const Shade = () => <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.6)] from-[15.37%] to-transparent to-[53.45%]" />;

/* Hero -> zoom + story card -> hero slides off the Idea -> masterplan hotspots -> curtain room slides up -> villa wipes in, all on one pinned stage. */
function Story() {
  const ref = useRef<HTMLElement>(null);
  const rawProgress = useProgress(ref);

const p =
  rawProgress <= 0.8
    ? rawProgress * 0.8
    : 0.64 + ((rawProgress - 0.8) / 0.2) * 0.36;
  const zoom = ease(range(p, 0, 0.08));
  const drift = ease(range(p, 0.08, 0.13));
  const exit = ease(range(p, 0.13, 0.21));
  const plan = ease(range(p, 0.24, 0.32));
  const card = ease(range(p, 0.33, 0.37));
  const spotT = range(p, 0.37, 0.64) * HOTSPOTS.length;
  const spot = Math.min(HOTSPOTS.length - 1, Math.floor(spotT));
  const curtain = ease(range(p, 0.67, 0.75));
  const villa = ease(range(p, 0.81, 0.9));
  const fade = 1 - zoom;
  const lift = `translateY(${-zoom * 110}px)`;

  const goToSpot = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const target = 0.37 + ((i + 0.5) / HOTSPOTS.length) * 0.27;
window.scrollTo({
  top: el.offsetTop + (target / 0.8) * (el.offsetHeight - window.innerHeight),
  behavior: "smooth",
});
  };

  return (
    <section ref={ref} className="relative h-[900vh] bg-[#fffdf0]">
      <div className="sticky top-0 h-svh overflow-hidden">
        {/* The idea behind the project (stationary beneath the hero) */}
        <div className="absolute inset-0 bg-[#fffdf0]">
          <img src={png("14a21")} alt="" className="absolute left-[51.6%] top-0 h-full w-[38.52%] object-cover max-md:left-1/2 max-md:top-[87.5%] max-md:bottom-auto max-md:h-[100vw] max-md:w-[25svh] max-md:-translate-x-1/2 max-md:-translate-y-1/2 max-md:rotate-90 max-md:object-cover" />
          <div className={`absolute left-0 top-1/2 flex w-full max-w-[calc(61%+40px)] -translate-y-1/2 flex-col gap-[20px] max-md:max-w-full ${PAD}`}>
            <p className="n-sm text-[14px] uppercase leading-[1.5] tracking-[-0.025em] text-[#444342]">
              The Idea <span className="font-['Satoshi'] font-medium italic">Behind the Project</span>
            </p>
            <p className="text-[clamp(30px,3.9vw,56px)] leading-[1.2] tracking-[-0.025em] text-[#1e1e1e]">
              <span className="f-serif">Every element of Country Side has been considered with a simple intention - </span>
              <span className="f-serif-sbi">to create a place where nature, people, and everyday life</span>
              <span className="f-serif"> can exist in balance.</span>
            </p>
          </div>
        </div>

        {/* Hero + story card, sliding up off the Idea panel */}
        <div className="absolute inset-0 overflow-hidden" style={{ transform: `translateY(${-exit * 100}%)` }}>
          <div
            className="absolute inset-0"
            style={{ transform: `translate(${-zoom * 17.64}vw, ${zoom * 17.07}vh) scale(${1 + zoom * 0.4236})` }}
          >
            <img src={png("13893")} alt="" className="absolute inset-0 size-full object-cover" />
            <img src={png("636c6")} alt="" className="absolute inset-0 size-full object-cover" />
            <img src={png("9aee4")} alt="A couple chatting in a warmly lit modern kitchen" className="absolute inset-0 size-full object-cover" />
            <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(90.42deg, rgba(0,0,0,0.6) 0.21%, rgba(102,102,102,0) 69.8%)" }} />
          </div>
          
<div
  className={`absolute left-0 top-[40.9%] flex flex-col ${PAD}`}
  style={{ opacity: fade, transform: lift }}
>
  <p className="n-sm text-[14px] uppercase leading-[1.5] tracking-[-0.025em] text-[#ddd]">
    COMPLETED{" "}
    <span className="font-['Satoshi'] font-bold italic">
      PROJECT
    </span>
  </p>

  <h1 className="mt-[clamp(24px,3vw,40px)] text-[clamp(72px,11.1vw,160px)] leading-[0.8] tracking-[-0.025em] text-[#fffdf0]">
    <span className="f-serif-m block">Country</span>
    <span className="f-serif-bi block">Side</span>
  </h1>

  <p className="mt-[clamp(16px,1.8vw,24px)] max-w-[340px] text-[16px] leading-[1.5] tracking-[-0.025em] text-[#fffdf0]">
    Country Side is the dream project of The Great Builds Properties, We aim to deliver our passionate service through this upcoming project.
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
    Country Side is thoughtfully shaped around its natural surroundings, bringing together considered planning, open spaces, and places designed for people to live, connect, and grow.
  </p>
</div>
        </div>

        
        {/* Masterplan with hotspots */}
        <div
          className="absolute inset-0 bg-white"
          style={{
            clipPath: `inset(${cut(plan)} 0 0 0)`,
            pointerEvents: plan > 0.5 && curtain < 0.5 ? "auto" : "none",
          }}
        >
          {/* Desktop — original layout unchanged */}
          <div className="absolute inset-0 hidden md:block">
            <img
              src={png("bb5a7")}
              alt="Aerial view of the Country Side masterplan"
              className="absolute inset-0 size-full object-cover"
            />

            {HOTSPOTS.map((h, i) => (
              <button
                key={h.title}
                type="button"
                aria-label={h.title}
                onClick={() => goToSpot(i)}
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                style={{ left: `${h.x + 1.11}%`, top: `${h.y + 1.92}%` }}
              >
                <span className={`absolute -inset-[6px] rounded-full border-2 border-white transition-all duration-500 ${i === spot && card > 0.5 ? "scale-100 opacity-100" : "scale-50 opacity-0"}`} />
                <img src={`${C}/${h.icon}.svg`} width={32} height={32} alt="" className="block" />
              </button>
            ))}

            <div
              className="absolute bottom-0 left-0 w-[min(519px,100%)] bg-[#1b3022]"
              style={{ clipPath: `inset(${cut(card)} 0 0 0)` }}
            >
              <div className="relative grid px-[clamp(20px,2.8vw,40px)] pb-[clamp(24px,2.8vw,40px)] pt-[clamp(20px,2.5vw,36px)]">
                {HOTSPOTS.map((h, i) => (
                  <div
                    key={h.title}
                    className="col-start-1 row-start-1 flex flex-col gap-[16px] transition-all duration-500"
                    style={{
                      opacity: i === spot ? 1 : 0,
                      transform: `translateY(${i === spot ? 0 : i < spot ? -12 : 12}px)`,
                    }}
                    aria-hidden={i !== spot}
                  >
                    <h3 className="f-serif-m text-[clamp(28px,2.8vw,40px)] leading-none tracking-[-0.025em] text-[#fffdf0]">
                      {h.title}
                    </h3>
                    <p className="n-sr text-[clamp(14px,1.39vw,20px)] leading-[1.5] tracking-[-0.025em] text-[#ddd]">
                      {h.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          
{/* Mobile Masterplan — Shankar Enclave layout */}
<div className="absolute inset-0 flex flex-col md:hidden">
  <div className="relative min-h-[40svh] flex-1 overflow-hidden bg-[#e8e8df]">
    <img
      src={png("bb5a7")}
      alt="Aerial view of the Country Side masterplan"
      className="absolute inset-0 size-full object-cover"
    />

    <div className="absolute inset-x-0 bottom-0 flex flex-wrap gap-2 p-4">
      {HOTSPOTS.map((h, i) => (
        <button
          key={h.title}
          type="button"
          onClick={() => goToSpot(i)}
          className={`rounded-full border px-4 py-2 text-xs backdrop-blur-md transition-colors ${
            i === spot
              ? "border-white/70 bg-white/85 text-[#1b3022]"
              : "border-white/40 bg-[#1b3022]/35 text-white"
          }`}
        >
          {h.title}
        </button>
      ))}
    </div>
  </div>

  <div className="shrink-0 bg-[#1b3022] px-5 py-6 text-[#fffdf0]">
    <h3 className="f-serif-m text-3xl leading-none tracking-[-0.025em]">
      {HOTSPOTS[spot].title}
    </h3>

    <p className="n-sr mt-4 text-sm leading-[1.6] text-[#ddd]">
      {HOTSPOTS[spot].text}
    </p>
  </div>
</div>

        </div>


        {/* Curtain room, sliding up over the masterplan */}
        <div className="absolute inset-0 bg-white" style={{ transform: `translateY(${(1 - curtain) * 100}%)` }}>
          <img src={`${C}/curtain-room.jpg`} alt="A softly lit living room seen through sheer curtains" className="absolute inset-0 size-full object-cover" />
          <Shade />
          <p className={`absolute bottom-[clamp(32px,9vh,120px)] left-0 max-w-[calc(83.2%+40px)] text-[clamp(28px,3.9vw,56px)] leading-none tracking-[-0.025em] text-[#fffdf0] ${PAD}`}>
            <span className="f-serif">Landscapes, open spaces, and natural surroundings form an integral part of the community - </span>
            <span className="f-serif-sbi">creating room to slow down, connect,</span>
            <span className="f-serif"> and experience the outdoors.</span>
          </p>
        </div>

        {/* Villa */}
        <div className="absolute inset-0 bg-white" style={{ clipPath: `inset(0 ${cut(villa)} 0 0)` }}>
          <img src={png("8f3c3")} alt="" className="absolute inset-0 size-full object-cover" />
          <img src={png("93578")} alt="" className="absolute inset-0 size-full object-cover" />
          <img src={png("1781f")} alt="A villa and gazebo at sunset among lawns and stepping stones" className="absolute inset-0 size-full object-cover" />
          <Shade />
          <p className={`n-sr absolute bottom-[clamp(32px,12vh,150px)] left-0 max-w-[564px] text-[clamp(16px,1.39vw,20px)] leading-[1.2] tracking-[-0.025em] text-[#fffdf0] ${PAD}`}>
            Open spaces are essential for urban environments, providing areas for relaxation and recreation. Green corridors connect these spaces, allowing wildlife to thrive and offering scenic routes for walkers and cyclists. Walking paths weave through native landscapes, showcasing local flora and fauna while promoting a healthy lifestyle. Together, these elements create a harmonious balance between nature and urban living.
          </p>
        </div>
      </div>
    </section>
  );
}

/* The list block pins while the photo swaps (wiping up); the next section rises beneath it before release. */

function Living() {
  const [active, setActive] = useState(0);

  const imageOffsets = [-203, -153, -93, 7, 97];

  return (
    <section className="bg-[#fffdf0] py-[clamp(40px,7vh,80px)] md:py-[clamp(72px,14vh,160px)]">
      <div className={`flex min-h-[calc(100svh-80px)] flex-col gap-[24px] md:min-h-0 md:gap-[40px] ${PAD}`}>

        {/* Section heading */}
        <div className="relative flex flex-col gap-[20px]">
          <p className="n-sm text-[14px] uppercase leading-[1.5] tracking-[-0.025em] text-[#444342]">
            DESIGNED{" "}
            <span className="font-['Satoshi'] font-medium italic">
              FOR LIVING
            </span>
          </p>

          <h2 className="text-[clamp(36px,3.9vw,56px)] leading-none tracking-[-0.025em] text-[#1e1e1e]">
            <span className="f-serif block">
              A Place for the Way
            </span>
            <span className="f-serif-sbi block">
              You Want to Live.
            </span>
          </h2>
        </div>

        {/* Five full-width interactive rows */}
        <ul className="relative flex flex-col">
          {LIVING.map((item, i) => (
            <li
              key={item.text}
              className="relative z-0 flex h-[64px] md:h-[92px] items-center border-b border-black/10"
            >
              <button
                type="button"
                onPointerEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                aria-pressed={active === i}
                className="n-sm flex h-full w-full items-center text-left text-[clamp(16px,1.39vw,20px)] leading-normal text-[#1b3022]"
              >
                {item.text}
              </button>
            </li>
          ))}

          

{/* Portrait viewport — vertical movement + image reveal */}
<div
  className="pointer-events-none absolute left-[55.9%] top-0 z-20 hidden aspect-[4/5] w-[clamp(160px,29.4vw,400px)] overflow-hidden md:block"
  style={{
    transform: `translate3d(0, ${imageOffsets[active]}px, 0)`,
    transition: "transform 1000ms cubic-bezier(0.82, 0.01, 0.24, 1)",
  }}
>
  {LIVING.map((item, i) => (
    <div
      key={item.text}
      className="absolute inset-0"
      style={{
        zIndex: i,
        clipPath:
          active === i
            ? "inset(0 0 0 0)"
            : "inset(0 0 100% 0)",
        transition:
          "clip-path 1000ms cubic-bezier(0.82, 0.01, 0.24, 1)",
      }}
    >
      {item.layers.map((layer) => (
        <img
          key={layer}
          src={png(layer)}
          alt=""
          draggable={false}
          className="absolute inset-0 size-full object-cover"
        />
      ))}
    </div>
  ))}
</div>


        </ul>
        {/* Mobile static image */}
<div className="relative min-h-[280px] flex-1 w-full self-stretch overflow-hidden md:hidden">
  {LIVING.map((item, i) => (
    <div
      key={item.text}
      className="absolute inset-0"
      style={{
        zIndex: i,
        clipPath:
          active === i
            ? "inset(0 0 0 0)"
            : "inset(0 0 100% 0)",
        transition:
          "clip-path 1000ms cubic-bezier(0.82, 0.01, 0.24, 1)",
      }}
    >
      {item.layers.map((layer) => (
        <img
          key={layer}
          src={png(layer)}
          alt=""
          draggable={false}
          className="absolute inset-0 size-full object-cover"
        />
      ))}
    </div>
  ))}
</div>
      </div>
    </section>
  );
}


/* Highlights slide sideways, then the gallery wipes up and steps through its slides. */
function DetailsGallery() {
  const ref = useRef<HTMLElement>(null);
  const highlightsRef = useRef<HTMLDivElement>(null);
  const lastHighlightRef = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const mobileGalleryRef = useRef<HTMLDivElement>(null);

const mobileGalleryStartProgress = useRef<number | null>(null);
const mobileGalleryProgressRef = useRef(0);


const mobileGalleryProgress = useProgress(mobileGalleryRef);
mobileGalleryProgressRef.current = mobileGalleryProgress;

const mobileGalleryReveal =
  mobileGalleryStartProgress.current !== null
    ? ease(
        range(
          mobileGalleryProgress,
          mobileGalleryStartProgress.current,
          mobileGalleryStartProgress.current + 0.25
        )
      )
    : 0;

useEffect(() => {
  const checkLastCard = () => {
    const card = lastHighlightRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();

    if (
  rect.top <= window.innerHeight / 2 &&
  rect.bottom >= window.innerHeight / 2 &&
  mobileGalleryStartProgress.current === null
) {
  mobileGalleryStartProgress.current = mobileGalleryProgressRef.current;
}
  };

  window.addEventListener("scroll", checkLastCard, { passive: true });
  checkLastCard();

  return () => window.removeEventListener("scroll", checkLastCard);
}, []);
  const p = useProgress(ref);
  const slide = ease(range(p, 0.02, 0.32));
  const gallery = ease(range(p, 0.34, 0.44));
  const g = range(p, 0.46, 0.98);
  const q = g * GALLERY.length;
  const reveals = GALLERY.map((_, k) => (k === 0 ? 1 : ease(clamp((q - k + 0.3) / 0.35))));
  const active = reveals.reduce((a, r, k) => (r > 0.5 ? k : a), 0);
  const overflow = track.current ? Math.max(0, track.current.scrollWidth - track.current.parentElement!.clientWidth) : 0;

  return (
    <section ref={ref} className="relative h-auto bg-[#fffdf0] md:h-[900vh]">
<div
  ref={highlightsRef}
  className="relative min-h-svh overflow-visible md:sticky md:top-0 md:h-svh md:overflow-hidden"
>
          <div className="flex h-full flex-col justify-center gap-[clamp(24px,3vw,40px)]">
          <div className={`flex flex-col gap-[20px] ${PAD}`}>
            <p className="n-sm text-[14px] uppercase leading-[1.5] tracking-[-0.025em] text-[#444342]">
              PROJECT <span className="font-['Satoshi'] font-medium italic">HIGHLIGHTS</span>
            </p>
            <h2 className="text-[clamp(36px,3.9vw,56px)] leading-none tracking-[-0.025em] text-[#1e1e1e]">
              <span className="f-serif">The Details </span>
              <span className="f-serif-sbi">That Matter</span>
            </h2>
          </div>
          <div className="overflow-visible px-[clamp(20px,2.8vw,40px)] md:overflow-hidden md:pl-[clamp(20px,2.8vw,40px)] md:pr-0">
  <div
    ref={track}
    className="flex w-full flex-col gap-[20px] md:w-max md:flex-row md:pr-[clamp(20px,2.8vw,40px)]"
    style={{ transform: `translateX(${-slide * overflow}px)` }}
  >
              {DETAILS.map((d, i) => (
  <article
    ref={i === DETAILS.length - 1 ? lastHighlightRef : undefined}
    key={d.label}
  className="relative aspect-[16/9] w-full shrink-0 overflow-hidden md:aspect-[850/560] md:w-[min(850px,82vw,calc((100svh-260px)*1.518))]"
>
                  <div className="absolute inset-0 bg-[#d9d9d9]" />
                  {d.layers.map((l, j) => (
                    <img key={l} src={png(l)} alt={j === d.layers.length - 1 ? d.label : ""} className="absolute inset-0 size-full object-cover" />
                  ))}
                  <Shade />
                  <div className="absolute bottom-[clamp(20px,2.8vw,40px)] left-[clamp(20px,2.8vw,40px)] flex flex-col gap-[12px] leading-none text-white">
                    <p className="n-sb text-[clamp(24px,2.2vw,32px)] tracking-[-0.025em]">{d.value}</p>
                    <p className="n-sr text-[clamp(18px,1.67vw,24px)] tracking-[-0.025em]">{d.label}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

          </div>

        {/* Gallery */}
        <div ref={mobileGalleryRef} className="relative z-20 -mt-[100svh] min-h-[300vh] md:mt-0 md:contents">
  <div className="sticky top-0 min-h-svh md:sticky md:top-0 md:h-svh md:overflow-hidden">
        <div
  className="relative flex min-h-svh flex-col-reverse bg-[#1b3022] md:absolute md:inset-0 md:flex-row [clip-path:var(--mobile-gallery-clip)] md:[clip-path:var(--desktop-gallery-clip)]"
  style={{
    "--mobile-gallery-clip": `inset(${cut(mobileGalleryReveal)} 0 0 0)`,
    "--desktop-gallery-clip": `inset(${cut(gallery)} 0 0 0)`,
  } as React.CSSProperties}
>
          <div className="relative flex flex-1 flex-col justify-between p-[clamp(20px,2.8vw,40px)] md:w-[34.65%] md:flex-none">
            <p className="n-sm text-[14px] uppercase leading-[1.5] tracking-[-0.025em] text-[#ddd]">GaLLERY</p>
            <div className="flex items-center justify-end gap-[20px] md:mt-[10vh]">
              <div className="grid text-right">
                {GALLERY.map((s, i) => (
                  <p
                    key={s.img}
                    className="col-start-1 row-start-1 text-[clamp(28px,2.8vw,40px)] leading-none tracking-[-0.025em] text-[#f7f5f0] transition-all duration-500"
                    style={{ opacity: i === active ? 1 : 0, transform: `translateY(${i === active ? 0 : i < active ? -16 : 16}px)` }}
                    aria-hidden={i !== active}
                  >
                    <span className="f-serif block">{s.title[0]}</span>
                    <span className="f-serif-sbi block">{s.title[1]}</span>
                  </p>
                ))}
              </div>
              <div className="relative h-[100px] w-[2px] shrink-0 overflow-hidden bg-[#eee]">
                <div className="absolute left-0 top-0 w-[2px] bg-[#c59d48]" style={{ height: `${Math.max(1, g * 100)}px` }} />
              </div>
            </div>
            <div className="grid md:mb-[6vh]">
              {GALLERY.map((s, i) => (
                <p
                  key={s.img}
                  className="n-sr col-start-1 row-start-1 max-w-[425px] text-[clamp(15px,1.39vw,20px)] leading-[1.2] tracking-[-0.025em] text-[#f7f5f0] transition-opacity duration-500"
                  style={{ opacity: i === active ? 1 : 0 }}
                  aria-hidden={i !== active}
                >
                  {s.text}
                </p>
              ))}
            </div>
          </div>
          <div className="relative h-[45svh] min-h-[300px] shrink-0 overflow-hidden md:h-full md:min-h-0 md:flex-1">
            {GALLERY.map((s, i) => (
              <img
                key={s.img}
                src={png(s.img)}
                alt={`${s.title[0]}${s.title[1]}`}
                className="absolute inset-0 size-full object-cover"
                style={{ clipPath: i === 0 ? undefined : `inset(${cut(reveals[i])} 0 0 0)`, zIndex: i }}
              />
            ))}
          </div>
        </div>
      </div>
       </div>
      
    </section>
  );
}

const footerShader = {
  setup: setupFooterShader,
  render: renderFooterShader,
  params: {
    intensity: 2.8499999046325684,
    gradient: {
      stops: [
        { position: 0, color: { r: 0.10588235408067703, g: 0.1882352977991104, b: 0.13333334028720856, a: 1 } },
        { position: 0.5, color: { r: 0.0235294122248888, g: 0.250980406999588, b: 0.16862745583057404, a: 1 } },
        { position: 1, color: { r: 0.10588235408067703, g: 0.1882352977991104, b: 0.13333334028720856, a: 1 } },
      ],
    },
    gradientBalance: 20,
    material: 1,
    morphSpeed: 0.7299999594688416,
    detail: 2.049999952316284,
    twist: 1.4800000190734863,
    zoom: 72,
    gradientMethod: 0,
    warp: 0.8499999642372131,
    rotationSpeed: 46,
  },
  manifest: manifestFooterShader,
};

export default function CountrySidePage() {
  return (
    <main className="bg-[#fffdf0]">
            <SiteHeader base={C} logo="ba7b1" />
      <Story />
      <Living />
      <DetailsGallery />
      <ContactSection submit={<SubmitButton base={C} />} />
      <Footer
        backdrop={
          <>
            <ShaderFill className="absolute" shader={footerShader} />
            <div className="absolute inset-0 bg-[#1b3022]" />
          </>
        }
      />
    </main>
  );
}
