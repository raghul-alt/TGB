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

const C = "/assets/shankarenclave";
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
    text: "Green spaces are essential for urban environments, providing a breath of fresh air amidst the concrete jungle. They offer a refuge for wildlife, a place for community gatherings, and a venue for recreational activities. Parks, gardens, and green rooftops not only enhance the aesthetic appeal of a city but also contribute to the well-being of its residents by promoting outdoor activities and relaxation.",
  },
  {
    x: 16.7,
    y: 20.8,
    icon: "cb61c",
    title: "Community spaces",
    text: "Community spaces are the heart of urban life, bringing people together and fostering connections. These areas, whether parks, plazas, or community centers, provide a venue for social interaction, recreation, and cultural events. Well-planned community spaces enhance accessibility, promote safety, and encourage exploration, making them essential for vibrant neighborhoods. From lively gathering spots to serene green spaces, they enrich the daily experiences of both residents and visitors alike.",
  },
  {
    x: 69.2,
    y: 78.1,
    icon: "838ce",
    title: "Connectivity",
    text: "Connectivity is the foundation of a well-connected community, linking neighborhoods, cities, and essential destinations. It enables seamless movement of people, goods, and services through an integrated network of roads and transport routes. Strong connectivity improves accessibility, reduces travel time, and brings opportunities closer, fostering economic growth and stronger communities. From local pathways to major highways, every connection plays a vital role in making everyday life more convenient and connected.",
  },
];

const Shade = () => (
  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.6)] from-[15.37%] to-transparent to-[53.45%]" />
);

/* Hero, idea, masterplan and landscape storytelling share one pinned scroll stage. */
function Story() {
  const ref = useRef<HTMLElement>(null);
const p = useProgress(ref);
const mobileRef = useRef<HTMLElement>(null);
const mobileP = useProgress(mobileRef);

const mobileZoom = ease(range(mobileP, 0, 0.35));
const mobileDrift = ease(range(mobileP, 0.35, 0.45));
const mobileExit = ease(range(mobileP, 0.45, 0.85));

const mobileFade = 1 - mobileZoom;
const mobileLift = `translateY(${-mobileZoom * 110}px)`;

const mobilePlanRef = useRef<HTMLElement>(null);
const mobilePlanProgress = useProgress(mobilePlanRef);
const mobileLandscape = ease(range(mobilePlanProgress, 0.82, 0.90));
const mobileFuture = ease(range(mobilePlanProgress, 0.94, 1.0));
const mobileActiveSpot = Math.min(
  HOTSPOTS.length - 1,
  Math.floor(clamp(mobilePlanProgress) * HOTSPOTS.length)
);

const goToMobileSpot = (i: number) => {
  const el = mobilePlanRef.current;
  if (!el) return;

  const target = (i + 0.5) / HOTSPOTS.length;

  window.scrollTo({
    top: el.offsetTop + target * (el.offsetHeight - window.innerHeight),
    behavior: "smooth",
  });
};

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
  <>
    <div className="md:hidden bg-[#fffdf0]">
      {/* Mobile Hero + Idea Scroll Stage */}
<section ref={mobileRef} className="relative h-[260svh]">
  <div className="sticky top-0 h-svh overflow-hidden">

    {/* Mobile Hero */}
    <div
      className="absolute inset-0 z-10 overflow-hidden"
      style={{
        transform: `translateY(${-mobileExit * 100}%)`,
      }}
    >
      {/* Hero image zoom */}
      <div
        className="absolute inset-0"
        style={{
          transform: `translate(${-mobileZoom * 17.64}vw, ${mobileZoom * 17.07}vh) scale(${1 + mobileZoom * 0.4236})`,
        }}
      >
        <img
          src={png("d2634")}
          alt="Shankar Enclave residential home"
          className="absolute inset-0 size-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#142219]/65 via-transparent to-black/20" />
      </div>


      {/* Hero content fades and lifts */}
      <div
        className="absolute left-0 top-[40.9%] flex flex-col px-5 text-[#fffdf0]"
        style={{
          opacity: mobileFade,
          transform: mobileLift,
        }}
      >
        <p className="n-sm text-[12px] uppercase leading-[1.5] tracking-[-0.025em] text-[#ddd]">
          COMPLETED{" "}
          <span className="font-['Satoshi'] font-bold italic">
            PROJECT
          </span>
        </p>

        <h1 className="mt-6 text-[clamp(58px,16vw,76px)] leading-[0.82] tracking-[-0.04em]">
          <span className="f-serif-m block">Shankar</span>
          <span className="f-serif-bi block">Enclave</span>
        </h1>

        <p className="mt-6 max-w-[320px] text-[15px] leading-[1.5] tracking-[-0.025em]">
          A thoughtfully planned community offering the opportunity to find
          your place, shape your future, and build towards a life that feels
          truly your own.
        </p>
      </div>

      {/* Green story card */}
      <div
        className="absolute bottom-[25%] right-0 z-20 w-[calc(100%-40px)] bg-[#1b3022] p-5 text-[#fffdf0]"
        style={{
          clipPath: `inset(${(1 - mobileZoom) * 100}% 0 0 0)`,
          transform: `translateY(${-(mobileDrift * 12 + mobileExit * 18)}vh)`,
        }}
      >
        <p className="f-serif-m text-[22px] leading-[1.15] tracking-[-0.025em]">
          Shankar Enclave is thoughtfully planned to bring together
          well-considered spaces and future possibilities, creating a place
          where people can put down roots and build towards a future of their own.
        </p>
      </div>
    </div>

    {/* The Idea Behind the Project */}
<div className="absolute inset-0 overflow-hidden bg-[#fffdf0]">

  {/* Decorative image — positioned independently */}
  <img
    src={png("14a21")}
    alt="Shankar Enclave"
    className="absolute left-[51.6%] top-0 h-full w-[38.52%] object-cover
      max-md:left-1/2 max-md:top-[87.5%] max-md:bottom-auto
      max-md:h-[100vw] max-md:w-[25svh]
      max-md:-translate-x-1/2 max-md:-translate-y-1/2
      max-md:rotate-90 max-md:object-cover"
  />

  {/* Text — same positioning as Country Side */}
  <div className="absolute left-0 top-1/2 flex w-full max-w-[calc(61%+40px)] -translate-y-1/2 flex-col gap-[20px] max-md:max-w-full px-5">

    <p className="n-sm text-[14px] uppercase leading-[1.5] tracking-[-0.025em] text-[#444342]">
      The Idea{" "}
      <span className="font-['Satoshi'] font-medium italic">
        Behind the Project
      </span>
    </p>

    <p className="text-[clamp(30px,3.9vw,56px)] leading-[1.2] tracking-[-0.025em] text-[#1e1e1e]">
      <span className="f-serif">
        Shankar Enclave is envisioned as a community where thoughtful
        planning creates the foundation for future possibilities - offering{" "}
      </span>
      <span className="f-serif-sbi">
        a place to plan ahead, put down roots, and shape a space around
        your aspirations.
      </span>
    </p>

  </div>
</div>
  </div>
</section>

  {/* Mobile Aerial Masterplan */}
<section
  ref={mobilePlanRef}
  className="relative h-[300svh]"
>
  <div className="sticky top-0 flex h-svh flex-col overflow-hidden relative">

  <div className="relative min-h-[40svh] flex-1 overflow-hidden bg-[#e8e8df]">
  <img
    src={png("9dd89")}
    alt="Aerial view of the Shankar Enclave masterplan"
    className="absolute inset-0 size-full object-cover"
  />

  <div className="absolute inset-x-0 bottom-0 flex flex-wrap gap-2 p-4">
    {HOTSPOTS.map((spot, i) => (
      <button
        key={spot.title}
        type="button"
        onClick={() => goToMobileSpot(i)}
        className={`rounded-full border px-4 py-2 text-xs backdrop-blur-md transition-colors ${
          i === mobileActiveSpot
            ? "border-white/70 bg-white/85 text-[#1b3022]"
            : "border-white/40 bg-[#1b3022]/35 text-white"
        }`}
      >
        {spot.title}
      </button>
    ))}
  </div>
</div>

<div className="shrink-0 bg-[#1b3022] px-5 py-6 text-[#fffdf0]">
  <h3 className="f-serif-m text-3xl leading-none tracking-[-0.025em]">
    {HOTSPOTS[mobileActiveSpot].title}
  </h3>

  <p className="n-sr mt-4 text-sm leading-[1.6] text-[#ddd]">
    {HOTSPOTS[mobileActiveSpot].text}
  </p>
</div>

{/* Mobile Landscape Section - slides over Masterplan */}
<div
  className="absolute inset-0 z-30 bg-white"
  style={{
    transform: `translateY(${(1 - mobileLandscape) * 100}%)`,
  }}
>
  <img
    src={`${C}/landscape.webp`}
    alt="A quiet outdoor space surrounded by greenery"
    className="absolute inset-0 size-full object-cover"
  />

  <Shade />

  <p className="absolute bottom-10 left-0 px-5 text-[28px] leading-none tracking-[-0.025em] text-[#fffdf0]">
    <span className="f-serif">
      Landscapes, open spaces, and natural surroundings form an integral part
      of the community -{" "}
    </span>
    <span className="f-serif-sbi">
      creating room to slow down, connect,
    </span>
    <span className="f-serif"> and experience the outdoors.</span>
  </p>
</div>

{/* Mobile Future Home - reveals from left to right */}
<div
  className="absolute inset-0 z-40 bg-white"
  style={{
    clipPath: `inset(0 0 0 ${cut(mobileFuture)})`,
  }}
>
  <img
    src={png("8cd69")}
    alt="Aerial view of Shankar Enclave"
    className="absolute inset-0 size-full object-cover"
  />

  <Shade />

  <p className="n-sr absolute bottom-10 left-0 max-w-[564px] px-5 text-[16px] leading-[1.2] tracking-[-0.025em] text-[#fffdf0]">
    The right space gives you room to think beyond the present. Shankar Enclave
    offers the opportunity to imagine what comes next — from planning a future
    home to creating a place that reflects your own aspirations.
  </p>
</div>

  </div>
</section>
</div>

    <section ref={ref} className="relative hidden h-[1050vh] bg-[#fffdf0] md:block">
      <div className="sticky top-0 h-svh overflow-hidden">
        {/* The Idea Behind the Project */}
        <div className="absolute inset-0 bg-[#fffdf0]">
          <img
            src={png("14a21")}
            alt=""
            className="absolute right-[5.5%] top-0 h-full w-[38.5%] object-cover"
          />
          <div className={`absolute left-0 top-1/2 flex w-full max-w-[calc(61%+40px)] -translate-y-1/2 flex-col gap-[20px] ${PAD}`}>
            <p className="n-sm text-[14px] uppercase leading-[1.5] tracking-[-0.025em] text-[#444342]">
              THE IDEA <span className="font-['Satoshi'] font-medium italic">BEHIND THE PROJECT</span>
            </p>
            <p className="text-[clamp(30px,3.9vw,56px)] leading-[1.2] tracking-[-0.025em] text-[#1e1e1e]">
              <span className="f-serif">
                Shankar Enclave is envisioned as a community where thoughtful planning creates the foundation for future possibilities - offering{" "}
              </span>
              <span className="f-serif-sbi">
                a place to plan ahead, put down roots, and shape a space around your aspirations.
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
  src={png("d2634")}
  alt="Shankar Enclave residential home"
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
              COMPLETED{" "}
              <span className="font-['Satoshi'] font-bold italic">
                PROJECT
              </span>
            </p>

            <h1 className="mt-[clamp(24px,3vw,40px)] text-[clamp(72px,11.1vw,160px)] leading-[0.8] tracking-[-0.025em] text-[#fffdf0]">
              <span className="f-serif-m block">Shankar</span>
              <span className="f-serif-bi block">Enclave</span>
            </h1>

            <p className="mt-[clamp(16px,1.8vw,24px)] max-w-[340px] text-[16px] leading-[1.5] tracking-[-0.025em] text-[#fffdf0]">
              A thoughtfully planned community offering the opportunity to find your place, shape your future, and build towards a life that feels truly your own.
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
              Shankar Enclave is thoughtfully planned to bring together well-considered spaces and future possibilities, creating a place where people can put down roots and build towards a future of their own.
            </p>
          </div>
        </div>

        {/* Aerial masterplan and markers */}
        <div
          className="absolute inset-0 bg-white"
          style={{
            clipPath: `inset(${cut(plan)} 0 0 0)`,
            pointerEvents: plan > 0.5 && landscape < 0.5 ? "auto" : "none",
          }}
        >
          <img
            src={png("9dd89")}
            alt="Aerial view of the Shankar Enclave neighbourhood"
            className="absolute inset-0 size-full object-cover"
          />

          {HOTSPOTS.map((spot, i) => (
  <button
    key={spot.title}
    type="button"
    aria-label={spot.title}
    onClick={() => goToSpot(i)}
    className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer"
    style={{
      left: `${spot.x + 1.11}%`,
      top: `${spot.y + 1.92}%`,
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
      className="block"
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
  src={png("8cd69")}
  alt="Aerial view of Shankar Enclave"
  className="absolute inset-0 size-full object-cover"
/>
          <Shade />
          <p className={`n-sr absolute bottom-[clamp(32px,12vh,150px)] left-0 max-w-[524px] text-[clamp(16px,1.39vw,20px)] leading-[1.2] tracking-[-0.025em] text-[#fffdf0] ${PAD}`}>
            The right space gives you room to think beyond the present. Shankar Enclave offers the opportunity to imagine what comes next — from planning a future home to creating a place that reflects your own aspirations.
          </p>
        </div>
      </div>
    </section>
    </>
  );
}

/* The Gallery advances through four image and copy states while pinned. */
function Gallery() {
  const ref = useRef<HTMLElement>(null);
  const p = useProgress(ref);

  const q = range(p, 0, 0.96) * GALLERY.length;
  const reveals = GALLERY.map((_, i) =>
    i === 0 ? 1 : ease(clamp((q - i + 0.3) / 0.35)),
  );
  const active = reveals.reduce((current, value, i) => (value > 0.5 ? i : current), 0);
  const progress = clamp(p) * 100;

  return (
    <section ref={ref} className="relative h-[600vh] bg-[#1b3022]">
      <div className="sticky top-0 flex h-svh overflow-hidden bg-[#1b3022] max-md:flex-col-reverse">
        <div className="relative flex w-[34.65%] shrink-0 flex-col justify-between p-[clamp(20px,2.8vw,40px)] text-[#f7f5f0] max-md:h-[55%] max-md:w-full">
          <p className="n-sm text-[14px] uppercase leading-[1.5] tracking-[-0.025em] text-[#ddd]">
            GALLERY
          </p>

          <div className="flex items-center justify-end gap-[20px]">
            <div className="grid text-right">
              {GALLERY.map((item, i) => (
                <p
                  key={item.img}
                  className="col-start-1 row-start-1 text-[clamp(28px,2.8vw,40px)] leading-none tracking-[-0.025em] text-[#f7f5f0] transition-all duration-500"
                  style={{
                    opacity: i === active ? 1 : 0,
                    transform: `translateY(${i === active ? 0 : i < active ? -16 : 16}px)`,
                  }}
                  aria-hidden={i !== active}
                >
                  <span className="f-serif block">{item.title[0]}</span>
                  <span className="f-serif-sbi block">{item.title[1]}</span>
                </p>
              ))}
            </div>

            <div className="relative h-[100px] w-[2px] shrink-0 overflow-hidden bg-[#eee]">
              <div
                className="absolute left-0 top-0 w-[2px] bg-[#c59d48]"
                style={{ height: `${progress}%` }}
              />
            </div>
          </div>

          <div className="grid md:mb-[6vh]">
            {GALLERY.map((item, i) => (
              <p
                key={item.img}
                className="n-sr col-start-1 row-start-1 max-w-[425px] text-[clamp(15px,1.39vw,20px)] leading-[1.2] tracking-[-0.025em] text-[#f7f5f0] transition-opacity duration-500"
                style={{ opacity: i === active ? 1 : 0 }}
                aria-hidden={i !== active}
              >
                {item.text}
              </p>
            ))}
          </div>
        </div>

        <div className="relative h-full flex-1 overflow-hidden max-md:h-[45%]">
          {GALLERY.map((item, i) => (
            <img
              key={item.img}
              src={png(item.img)}
              alt={`${item.title[0]}${item.title[1]}`}
              className="absolute inset-0 size-full object-cover"
              style={{
                clipPath: i === 0 ? undefined : `inset(${cut(reveals[i])} 0 0 0)`,
                zIndex: i,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function ShankarEnclavePage() {
  return (
    <main className="bg-[#fffdf0]">
            <SiteHeader base={C} logo="ade0b" />
      <Story />
      <Gallery />
      <ContactSection submit={<SubmitButton base={C} />} />
      <Footer />
    </main>
  );
}