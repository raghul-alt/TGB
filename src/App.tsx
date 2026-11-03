import { useEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import NriPage from "./NriPage";
import UpcomingPage from "./UpcomingPage";
import AboutPage from "./AboutPage";
import CountrySidePage from "./CountrySidePage";
import ShankarEnclavePage from "./ShankarEnclavePage";

const A = "/assets";

const vignette = (o: number, s = 0) =>
  `url("data:image/svg+xml;utf8,<svg viewBox='0 0 1440 832' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='${o}'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(4.4087e-15 41.6 -72 2.5473e-15 720 416)'><stop stop-color='rgba(0,0,0,0)' offset='${s}'/><stop stop-color='rgba(0,0,0,1)' offset='1'/></radialGradient></defs></svg>")`;

const clamp = (v: number, a = 0, b = 1) =>
  Math.min(b, Math.max(a, v));

const range = (p: number, s: number, e: number) =>
  clamp((p - s) / (e - s));

const ease = (t: number) => 1 - Math.pow(1 - t, 3);

const lerp = (a: number, b: number, t: number) =>
  a + (b - a) * t;




function useProgress(ref: RefObject<HTMLElement | null>) {
  const [p, setP] = useState(0);

  useEffect(() => {
    let raf = 0;

    const update = () => {
      raf = 0;

      const el = ref.current;
      if (!el) return;

      const r = el.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const total = r.height - viewportHeight;

      // Skip React updates for sections far outside the viewport.
      const nearViewport =
        r.bottom > -viewportHeight &&
        r.top < viewportHeight * 2;

      if (!nearViewport) {
        const settledProgress = r.bottom <= 0 ? 1 : 0;

        setP((current) =>
          Math.abs(current - settledProgress) < 0.0001
            ? current
            : settledProgress
        );

        return;
      }

      const next = clamp(-r.top / (total || 1));

      setP((current) =>
        Math.abs(current - next) < 0.0001
          ? current
          : next
      );
    };

    const scheduleUpdate = () => {
      if (!raf) {
        raf = requestAnimationFrame(update);
      }
    };

    scheduleUpdate();

    window.addEventListener("scroll", scheduleUpdate, {
      passive: true,
    });

    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);

      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref]);

  return p;
}




function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setIn] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setIn(true),
      { threshold: 0.15 }
    );

    if (ref.current) io.observe(ref.current);

    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${inView ? "in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-[10px]">
      <img
        src={`${A}/${dark ? "fe748" : "d4ac7"}.svg`}
        width={98.606}
        height={48}
        alt="The Great Builds"
      />

      <div className="relative h-[8.2px] w-[138.6px]">
        <img
          className="absolute left-0 top-[0.1px]"
          src={`${A}/2cf25.svg`}
          width={27.812}
          height={8.006}
          alt=""
        />

        <img
          className="absolute left-[35.41px] top-0"
          src={`${A}/${dark ? "b45da" : "030e6"}.svg`}
          width={46.111}
          height={8.211}
          alt=""
        />

        <img
          className="absolute left-[89.11px] top-[0.01px]"
          src={`${A}/516de.svg`}
          width={49.471}
          height={8.087}
          alt=""
        />
      </div>
    </div>
  );
}

const Layers = ({
  srcs,
  className = "",
}: {
  srcs: string[];
  className?: string;
}) => (
  <>
    {srcs.map((s) => (
      <img
        key={s}
        src={`${A}/${s}.png`}
        alt=""
        className={`absolute inset-0 size-full object-cover ${className}`}
      />
    ))}
  </>
);

const STATEMENT: [string, boolean][] = [
  ["We create communities that go", false],
  ["beyond building -", true],
  ["places thoughtfully", false],
  ["shaped by their surroundings connected to nature,", true],
  ["and designed around the way people live, gather, and grow.", false],
];

const CHAPTERS = [
  {
    title: ["Royal", "Greens"],
    text: "Royal Greens is the dream project of The Great Builds Properties, We aim to deliver our passionate service through this upcoming project.",
    side: ["b9df2"],
    aerial: ["d2ae3"],
  },
  {
    title: ["Country", "Side"],
    text: "Country Side represents the pinnacle of innovation from us. We are dedicated to providing exceptional service through this remarkable project.",
    side: ["7caa8"],
    aerial: ["79df9"],
  },
  {
    title: ["Shankar", "Enclave"],
    text: "Shankar Enclave is an exciting new venture by The Great Builds Properties, where we are committed to providing exceptional service through this innovative project.",
    side: ["9dd89"],
    aerial: ["8a519"],
  },
];

function Immersive() {
  const ref = useRef<HTMLElement>(null);
  const p = useProgress(ref);

  // Hero-to-intro reveal progress.
const cover = ease(range(p, 0, 0.14));
const settle = ease(range(p, 0.04, 0.2));

  // Existing project transition timings remain unchanged.
  const rise = ease(range(p, 0.3, 0.42));
  const enter = ease(range(p, 0.44, 0.56));

  const swaps = [
    ease(range(p, 0.64, 0.76)),
    ease(range(p, 0.84, 0.96)),
  ];

  const active = swaps[1] > 0.5 ? 2 : swaps[0] > 0.5 ? 1 : 0;
  const projectRoutes: Record<string, string> = {
  "Country Side": "#/country-side",
  "Shankar Enclave": "#/shankar-enclave",
  "Royal Greens": "#/royal-greens",
};

const activeProject = CHAPTERS[active].title.join(" ");
const projectHref = projectRoutes[activeProject] ?? "#/upcoming";

  // Per-chapter text visibility.
  const vis = [
    1 - swaps[0],
    swaps[0] * (1 - swaps[1]),
    swaps[1],
  ];

  const goTo = (i: number) => {
  const el = ref.current;
  if (!el) return;

  const target = [0.6, 0.8, 0.98][i];

  const top =
    el.getBoundingClientRect().top +
    window.scrollY +
    target * (el.offsetHeight - window.innerHeight);

  const start = window.scrollY;
  const distance = top - start;
  const duration = 2000;
  const startTime = performance.now();

  const animateScroll = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Smooth ease-in-out, similar to the Figma custom bezier.
    const eased =
      progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

    window.scrollTo(0, start + distance * eased);

    if (progress < 1) {
      requestAnimationFrame(animateScroll);
    }
  };

  requestAnimationFrame(animateScroll);
};

  return (
    <section ref={ref} className="relative h-[700vh] bg-[#fffdf0]">
<div className="sticky top-0 h-screen overflow-hidden bg-[#1b3022]">
       {/* Hero: stays stationary while the intro is revealed over it */}
        <div className="absolute inset-0 overflow-hidden bg-black">
          <div className="absolute inset-0">
            <video
  src={`${A}/Herovideo.mp4`}
  autoPlay
  muted
  loop
  playsInline
  preload="auto"
  aria-hidden="true"
  className="absolute inset-0 h-full w-full object-cover"
/>

            <div
              className="absolute inset-0"
              style={{ backgroundImage: vignette(0.5, 0.40244) }}
            />

            <div className="absolute inset-0 bg-black/20" />
          </div>

          <header className="absolute inset-x-[clamp(20px,2.8vw,40px)] top-[20px] flex items-start justify-between">
            <Logo />

            <nav className="f-sans absolute left-1/2 top-[20px] flex -translate-x-1/2 gap-8 text-[15px] tracking-[0.5px] text-white">
              {[
  { label: "PROJECTS", href: "#/upcoming" },
  { label: "ABOUT", href: "#/about" },
  { label: "NRI", href: "#/nri" },
].map((item) => (
  <a
    key={item.label}
    href={item.href}
    className="transition-opacity hover:opacity-70"
  >
    {item.label}
  </a>
))}
            </nav>
          </header>
        </div>

        {/* Intro: reveals from bottom to top without sliding the section */}
        <div
          className="absolute inset-0 z-10"
          style={{
            clipPath: `inset(${(1 - cover) * 100}% 0 0 0)`,
            WebkitClipPath: `inset(${(1 - cover) * 100}% 0 0 0)`,
            backgroundColor: `rgba(255,253,240,${lerp(0.82, 1, settle)})`,
            backdropFilter: "blur(6px)",
            willChange: "clip-path",
          }}
        >
          <div className="absolute inset-x-0 top-[7vh] flex justify-center">
            <div
              className="relative flex w-[min(40vw,70vh,560px)] items-start justify-between"
              style={{
                transform: `scale(${lerp(1.08, 1, settle)})`,
                transformOrigin: "50% 0%",
              }}
            >
              <div className="w-[47.66%]">
                <div className="relative aspect-[326/467] overflow-hidden rounded-[4px] bg-[#d9d9d9]">
                  <Layers srcs={["b7007", "c81ef", "17e86"]} />
                </div>

                <div className="shelf -mx-[2.45%] h-[20px]" />
              </div>

              <div className="relative isolate mt-[15.5%] w-[47.66%]">
                <div className="relative z-10 aspect-[326/468] overflow-hidden rounded-[4px] bg-[#d9d9d9]">
                  <Layers srcs={["2263e", "763e4"]} />
                </div>

                <div className="shelf -mx-[2.45%] h-[20px]" />

                <img
                  src={`${A}/5a274.png`}
                  alt=""
                  className="pointer-events-none absolute z-0 left-[93%] top-[31%] w-[44%]"
                  style={{ transform: "scaleY(-1) rotate(180deg)" }}
                />
              </div>
            </div>
          </div>

          <p 
          className="f-serif absolute bottom-[6vh] left-[clamp(20px,2.8vw,40px)] right-[clamp(20px,2.8vw,40px)] z-20 text-[clamp(28px,3.9vw,56px)] leading-[1.2] tracking-[-1.4px] text-[#1e1e1e]">
            {STATEMENT.map(([t, it], i) => (
              <span key={i} className={it ? "f-serif-sbi" : ""}>
                {t}{" "}
              </span>
            ))}
          </p>
        </div>

        
        {/* Projects: directional reveal transitions */}
        <div
          className="absolute inset-0 z-20"
          style={{ pointerEvents: rise > 0.05 ? "auto" : "none" }}
        >
          {/* LEFT: Project images reveal from LEFT to RIGHT */}
          <div className="absolute inset-y-0 left-0 w-1/2 overflow-hidden">
            {CHAPTERS.map((c, i) => {
              const progress =
                i === 0 ? enter : swaps[i - 1];

              const hiddenRight = (1 - progress) * 100;

              return (
                <div
                  key={i}
                  className="absolute inset-0 bg-[#d9d9d9]"
                  style={{
                    clipPath: `inset(0 ${hiddenRight}% 0 0)`,
                    WebkitClipPath: `inset(0 ${hiddenRight}% 0 0)`,
                    willChange: "clip-path",
                  }}
                >
                  <Layers srcs={c.side} />

                  <div className="absolute inset-0 bg-gradient-to-b from-transparent from-[55%] to-black/40 to-[77%]" />
                </div>
              );
            })}

            <p
              className="absolute left-[40px] top-[40px] text-[14px] tracking-[-0.35px] text-[#f7f5f0]"
              style={{ opacity: enter }}
            >
              <span className="f-inter">FEATURED </span>
              <span className="f-inter-i">PROJECTS</span>
            </p>
          </div>

          {/* RIGHT: Green panel reveals from BOTTOM to TOP */}
          <div
            className="absolute inset-y-0 right-0 w-1/2 bg-[#1b3022] text-white"
            style={{
              clipPath: `inset(${(1 - rise) * 100}% 0 0 0)`,
              WebkitClipPath: `inset(${(1 - rise) * 100}% 0 0 0)`,
              willChange: "clip-path",
            }}
          >
            <div className="flex h-full flex-col justify-between gap-[24px] px-[40px] py-[40px]">
              <div>
                <div className="relative h-[34px]">
                  {CHAPTERS.map((c, i) => (
                    <span
                      key={i}
                      className="f-sans absolute left-0 top-0 rounded-full bg-white/10 px-[12px] py-[6px] text-[14px] tracking-[-0.35px] backdrop-blur-[2px]"
                      style={{ opacity: vis[i] }}
                    >
                      CHAPTER - {i + 1}
                    </span>
                  ))}
                </div>

                <div className="relative mt-[20px] h-[clamp(112px,min(16.6vw,24vh),240px)]">
                  {CHAPTERS.map((c, i) => (
                    <h2
                      key={i}
                      className="absolute left-0 top-0 text-[clamp(48px,min(8.3vw,12vh),120px)] leading-none tracking-[-3px]"
                      style={{
                        opacity: vis[i],
                        transform: `translateY(${
                          (1 - vis[i]) * 24 * (i > active ? 1 : -1)
                        }px)`,
                      }}
                    >
                      <span className="f-serif-m">{c.title[0]}</span>
                      <br />
                      <span className="f-serif-bi">{c.title[1]}</span>

                    </h2>
                  ))}
                </div>
              </div>

              <div className="mx-auto w-[300px] max-w-full pb-[8vh]">
                

<div className="relative aspect-[3/2] max-h-[26vh] w-full overflow-hidden bg-[#d9d9d9]">
  {CHAPTERS.map((c, i) => {
    const revealProgress =
  i === 0 ? 1 : swaps[i - 1];

    const hiddenTop = (1 - revealProgress) * 100;

    return (
      <div
        key={i}
        className="absolute inset-0"
        style={{
          clipPath: `inset(${hiddenTop}% 0 0 0)`,
          WebkitClipPath: `inset(${hiddenTop}% 0 0 0)`,
          willChange: "clip-path",
          zIndex: i + 1,
        }}
      >
        <Layers srcs={c.aerial} />
      </div>
    );
  })}
</div>
                <div className="relative mt-[24px] h-[96px]">
                  {CHAPTERS.map((c, i) => (
                    <p
                      key={i}
                      className="f-sans absolute inset-0 text-[16px] leading-[1.5] tracking-[-0.4px] text-[#fffdf0]"
                      style={{ opacity: vis[i] }}
                    >
                      {c.text}
                    </p>
                  ))}
                </div>

                <a
                  href={projectHref}
                  className="f-sans group mt-[20px] flex h-[36px] w-[180px] items-center justify-between bg-[#f7f5f0] pl-[12px] pr-[4px] text-[14px] text-[#1b3022]"
                >
                  View Project
                  <span className="flex size-[28px] items-center justify-center bg-[#1b3022] text-white transition-colors group-hover:bg-[#c9a24b]">
                    →
                  </span>
                </a>
              </div>
            </div>

            <div className="absolute bottom-[40px] right-[40px] flex flex-col gap-[4px]">
              {CHAPTERS.map((_, i) => (
                <span
                  key={i}
                  className={`size-[6px] rounded-full border border-[#c9a24b] ${
                    i === active ? "bg-[#c9a24b]" : ""
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Previous / next project arrows */}
          <div
            className="absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2"
            style={{
              opacity: enter,
              pointerEvents: enter > 0.5 ? "auto" : "none",
            }}
          >
            {[
              {
                src: "9b726",
                label: "Previous project",
                to: active - 1,
              },
              {
                src: "e8ac8",
                label: "Next project",
                to: active + 1,
              },
            ].map((b) => (
              <button
                key={b.src}
                type="button"
                aria-label={b.label}
                disabled={b.to < 0 || b.to > 2}
                onClick={() => goTo(b.to)}
                className="flex size-[36px] items-center justify-center bg-[#c9a24b] transition-colors hover:bg-[#d8b462] disabled:cursor-default disabled:hover:bg-[#c9a24b]"
              >
                <img
                  src={`${A}/${b.src}.svg`}
                  width={20}
                  height={20}
                  alt=""
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const PILLARS = [
  {
    name: "Community",
    img: "pillars/Community.png",
    title: "Places designed to bring people together.",
    text: "We create environments where meaningful connections can grow, turning individual spaces into vibrant, connected communities.",
  },
  {
    name: "Sustainability",
    img: "pillars/Sustainability.png",
    title: "Nature is part of the foundation.",
    text: "We thoughtfully integrate green spaces, landscapes, and responsible development to create healthier environments that endure.",
  },
  {
    name: "Purpose",
    img: "pillars/Purpose.png",
    title: "Every community begins with a reason.",
    text: "We design around the way people live, work and grow, so every space has a purpose behind it.",
  },
  {
    name: "Longevity",
    img: "pillars/Longevity.png",
    title: "Built for today. Considered for tomorrow.",
    text: "Quality materials and enduring planning create homes and communities that age gracefully for generations.",
  },
];

function Pillars() {
  const [open, setOpen] = useState(0);

  return (
    <section className="relative z-0 bg-[#fffdf0] px-[clamp(20px,2.8vw,40px)] pb-[80px] pt-[120px]">
      <Reveal>
        <p className="f-sans text-[14px] tracking-[-0.35px] text-[#1e1e1e]">
          THE FOUR <i>PILLARS</i>
        </p>

        <h2 className="mt-[20px] text-[clamp(40px,3.9vw,56px)] leading-none tracking-[-1.4px] text-[#1e1e1e]">
          <span className="f-serif-m block">The Foundation of</span>
          <span className="f-serif-bi block">Every Great Build.</span>
        </h2>
      </Reveal>

      <Reveal className="mt-[40px]">
        <div className="flex h-[min(78vh,720px)] flex-col gap-[8px] md:flex-row">
          {PILLARS.map((pl, i) => {
            const on = i === open;

            return (
              <button
  key={pl.name}
  type="button"
  onMouseEnter={() => setOpen(i)}
  onFocus={() => setOpen(i)}
  onClick={() => setOpen(i)}
  aria-expanded={on}
  className="group relative min-h-[80px] min-w-0 overflow-hidden text-left"
  style={{
    flex: on ? "3.6 1 0%" : "1 1 0%",
    transition: "flex 900ms cubic-bezier(.65,0,.35,1)",
  }}
>
                <img
                  src={`${A}/${pl.img}`}
                  alt=""
                  className="absolute inset-0 size-full object-cover transition-transform duration-[1200ms] ease-out"
                  style={{ transform: `scale(${on ? 1 : 1.12})` }}
                />

                <div
                  className={`absolute inset-0 transition-colors duration-700 ${
                    on
                      ? "bg-gradient-to-b from-black/10 via-transparent to-black/60"
                      : "bg-black/25"
                  }`}
                />

                <span className="f-serif-bi absolute left-[16px] top-[16px] text-[24px] text-white md:text-[28px]">
                  {pl.name}
                </span>

                <div
                  className="absolute bottom-[24px] left-[24px] right-[24px] max-w-[560px] text-white transition-all duration-700"
                  style={{
                    opacity: on ? 1 : 0,
                    transform: `translateY(${on ? 0 : 20}px)`,
                    transitionDelay: on ? "350ms" : "0ms",
                  }}
                >
                  <p className="f-sans text-[20px] leading-[1.4]">
                    {pl.title}
                  </p>

                  <p className="f-sans-r mt-[4px] text-[16px] leading-[1.5] text-white/75">
                    {pl.text}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}

function Experience() {
  const ref = useRef<HTMLElement>(null);
  const p = useProgress(ref);

const reveal = ease(range(p, 0, 0.80));
const grow = ease(range(p, 0.16, 0.90));
  const [active, setActive] = useState<string | null>(null);

  
const categories = [
  {
    name: "Connect",
    title: "Places Designed to Bring People Together.",
    text: "Shared spaces and thoughtful community planning create opportunities for meaningful connections.",
    grid: "col-start-1 row-span-2",
    decoration: "Connect.png",
    decorationClass: "right-[-2%] top-[-2%] h-[58%] w-[82%]",
  },
  {
    name: "Unwind",
    title: "Spaces Designed for Living.",
    text: "Thoughtfully designed spaces bring comfort, warmth, and a sense of ease to everyday life.",
    grid: "col-start-2 row-start-1",
    decoration: "unwind.png",
    decorationClass: "right-[-5%] top-[-18%] h-[85%] w-[45%]",
  },
  {
    name: "Explore",
    title: "Discover Something New.",
    text: "Green trails, open spaces, and thoughtfully designed surroundings invite new experiences every day.",
    grid: "col-start-2 row-start-2",
    decoration: "explore.png",
    decorationClass: "right-0 top-[-22%] h-[145%] w-[70%]",
  },
  {
    name: "Thrive",
    title: "Room to Grow.",
    text: "Wellness, nature, and shared spaces create opportunities to thrive together as a community.",
    grid: "col-start-3 row-start-1",
    decoration: "Thrive.png",
    decorationClass: "right-[-1%] top-0 h-[58%] w-[42%]",
  },
  {
    name: "Belong",
    title: "A Place to Belong.",
    text: "A community offers opportunities to build lasting connections and feel part of something meaningful.",
    grid: "col-start-3 row-start-2",
    decoration: "Belong.png",
    decorationClass: "right-[-10%] top-[-40%] h-[130%] w-[60%]",
  },
];


  return (
<section
  ref={ref}
className="pointer-events-none relative z-10 -mt-[100vh] h-[150vh] bg-transparent">
        <div
  className="pointer-events-auto sticky top-0 h-screen overflow-hidden bg-[#1b3022]"
  style={{
    clipPath: `inset(${(1 - reveal) * 100}% 0 0 0)`,
    WebkitClipPath: `inset(${(1 - reveal) * 100}% 0 0 0)`,
    willChange: "clip-path",
    pointerEvents: reveal > 0.02 ? "auto" : "none",
  }}
>
        {/* Fixed viewport image with an independently animated reveal frame */}
<div className="absolute inset-0 z-0">
  {/* Static image layer: never scales with the reveal animation */}
  <img
    src={`${A}/Experiencebg.png`}
    alt=""
    className="absolute inset-0 h-full w-full"
    style={{
      objectFit: "cover",
      objectPosition: "center center",
      transform: "none",
      transition: "none",
    }}
  />

  <div className="absolute inset-0 bg-black/25" />

  {/* Animated frame overlay */}
  <div
    className="absolute inset-0 overflow-hidden"
    style={{
      clipPath: `inset(
        ${lerp(38, 0, grow)}%
        ${lerp(3, 0, grow)}%
        ${lerp(6, 0, grow)}%
        ${lerp(3, 0, grow)}%
        round ${lerp(4, 0, grow)}px
      )`,
      WebkitClipPath: `inset(
        ${lerp(38, 0, grow)}%
        ${lerp(3, 0, grow)}%
        ${lerp(6, 0, grow)}%
        ${lerp(3, 0, grow)}%
        round ${lerp(4, 0, grow)}px
      )`,
      pointerEvents: "none",
    }}
  />
</div>
        {/* Heading */}
        <div
          className="relative z-10 px-[clamp(20px,2.8vw,40px)] pt-[clamp(48px,12vh,120px)] text-[#f7f5f0]"
          style={{
            opacity: range(p, 0, 0.24),
            transform: `translateY(${lerp(
              40,
              -40,
              ease(range(p, 0, 0.30))
            )}px)`,
          }}
        >
          <p className="f-sans text-[14px] tracking-[-0.35px]">
            EXPERIENCE &amp; <i>LIFESTYLE</i>
          </p>

          <h2 className="mt-[20px] max-w-[519px] text-[clamp(40px,3.9vw,56px)] leading-none tracking-[-1.4px]">
            <span className="f-serif-m block">Designed Around the</span>
            <span className="f-serif-bi block">Way You Live.</span>
          </h2>
        </div>

        {/* Interactive grid */}
        <div
className="absolute inset-x-[3.7%] top-[28%] bottom-[3%] z-20 grid grid-cols-[0.9fr_1fr_1fr] grid-rows-2 border-l border-t border-white/25"
          style={{
            opacity: range(p, 0.16, 0.50),
            pointerEvents: reveal > 0.15 ? "auto" : "none",
          }}
          onMouseLeave={() => setActive(null)}
        >
          {categories.map((category) => {
            const selected = active === category.name;

            return (
              <div
                key={category.name}
                className={`${category.grid} relative min-h-0 min-w-0 overflow-hidden border-b border-r border-white/25 transition-colors duration-500`}
                style={{
                  backgroundColor: selected ? "#f5f2e9" : "transparent",
                }}
                onMouseEnter={() => setActive(category.name)}
              >
                <button
                  type="button"
                  onFocus={() => setActive(category.name)}
                  onBlur={() => setActive(null)}
                  onClick={() =>
                    setActive(selected ? null : category.name)
                  }
                  aria-expanded={selected}
                  className={`absolute left-0 top-0 z-10 p-4 text-left transition-colors duration-500 md:p-6 ${
                    selected ? "text-[#1b3022]" : "text-white"
                  }`}
                >
                  <span className="f-serif-bi text-[20px] md:text-[26px]">
                    {category.name}
                  </span>
                </button>

                
<img
  src={`${A}/${category.decoration}`}
  alt=""
  aria-hidden="true"
  className={`pointer-events-none absolute object-contain transition-all duration-500 ease-out ${category.decorationClass} ${
  selected
    ? "translate-y-0 opacity-100"
    : "translate-y-3 opacity-0"
}`}
/>

                <div
                  className={`pointer-events-none absolute bottom-0 left-0 right-0 p-4 transition-opacity duration-300 md:p-7 ${
                    selected ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <p className="f-sans-r text-[16px] leading-[1.5] text-[#1b3022] md:text-[18px]">
                    {category.title} {category.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
  
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
        <header className="absolute inset-x-0 top-0 z-20 h-[27vh] border-b border-white/35 px-[clamp(20px,2.8vw,40px)] pt-[3vh]">
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
                <div className="grid h-full grid-cols-[44%_56%]">
                  {/* Large step number on the left, matching the Figma frame. */}
                  <div className="flex items-start pt-[9vh]">
                    <span className="f-serif-bi text-[clamp(100px,12vw,180px)] leading-[0.9] tracking-[-7px]">
                      {step.number}
                    </span>
                  </div>

                  {/* Step title, wide image frame and supporting copy on the right. */}
<div className="flex min-w-0 flex-col items-start pt-[5vh]">
<h3 className="f-serif-bi mb-[3vh] text-[clamp(28px,2.5vw,38px)] leading-none">
                        {step.title}
                    </h3>

                    <div className="relative aspect-[1.78/1] max-h-[46vh] w-full overflow-hidden bg-[#344637]">
  <img
    src={`${A}/${step.image}`}
    alt={`${step.title} — The GreatBuild Way`}
    className="absolute inset-0 size-full object-cover"
    loading="lazy"
  />
</div>

<p className="f-sans-r mt-[2.5vh] max-w-[520px] text-[clamp(14px,1.05vw,16px)] leading-[1.5] text-[#d8d1c5]">                      {step.text}
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



function ImpactSequence() {
  const ref = useRef<HTMLElement>(null);
  const p = useProgress(ref);

  const projects = ["b9df2", "7caa8", "9dd89"];

  /*
   * SHARED SCROLL TIMELINE
   *
   * Total section height: 460vh.
   * Actual scroll distance: 360vh.
   *
   * 0–100vh: Viewport image conceals.
   * 100–200vh: Our Impact Phase 1.
   * 200–360vh: Phase 2.
   */

  const scrollVh = p * 340;

  // Viewport image holds only during its own reveal.
const revealHold = clamp(scrollVh, 0, 100);

// Our Impact remains stationary until the collage and
// headline have completely appeared (132vh).
const collageHold = clamp(scrollVh, 0, 132);

const viewportProgress = clamp(scrollVh / 100);

const phase1Progress = clamp((scrollVh - 100) / 100);

const sideSpread = ease(range(phase1Progress, 0.08, 0.32));

const imageMove = ease(range(phase1Progress, 0.32, 0.98));

// Image compensation starts only after the collage is complete.
const imageFollow = clamp(scrollVh - 132, 0, 100);

  const metrics = [
    { number: "8+", label: "Years of Experience" },
    { number: "3", label: "Projects Delivered" },
    { number: "3+", label: "Communities Created" },
    { number: "310+", label: "Happy Families" },
  ];

  return (
    <section
      ref={ref}
      className="relative isolate z-10 h-[440vh] bg-[#1b3022] text-[#f7f5f0]"
    >
      {/* FULL-HEIGHT BACKGROUND GRID */}
<div
  className="pointer-events-none absolute inset-0 z-0 grid grid-cols-5"
  style={{
    transform: `translate3d(0, ${collageHold}vh, 0)`,
  }}
>
  {[0, 1, 2, 3, 4].map((line) => (
    <div
      key={line}
      className="h-full border-r border-white/[0.045]"
    />
  ))}
</div>

      {/* UNDERLAY — VISIBLE BEHIND THE VIEWPORT IMAGE */}
      <div
        className="pointer-events-none absolute left-0 top-0 z-0 h-screen w-full overflow-visible"
        style={{
          transform: `translate3d(0, ${collageHold}vh, 0)`,
        }}
      >

        {/* BACKGROUND WORDS */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <span className="f-sans absolute left-[7%] top-[20%] whitespace-nowrap text-[clamp(40px,5.5vw,82px)] font-medium leading-none tracking-[-3px] text-white/[0.09]">
            COMMUNITY
          </span>

          <span className="f-sans absolute right-[8%] top-[31%] whitespace-nowrap text-[clamp(40px,5.5vw,82px)] font-medium leading-none tracking-[-3px] text-white/[0.09]">
            LONGEVITY
          </span>

          <span className="f-sans absolute left-[13%] top-[59%] whitespace-nowrap text-[clamp(40px,5.5vw,82px)] font-medium leading-none tracking-[-3px] text-white/[0.09]">
            SUSTAINABILITY
          </span>

          <span className="f-sans absolute right-[16%] top-[75%] whitespace-nowrap text-[clamp(40px,5.5vw,82px)] font-medium leading-none tracking-[-3px] text-white/[0.09]">
            PURPOSE
          </span>
        </div>

        {/* FIVE VERTICAL DIVISIONS */}
        <div className="absolute inset-0 z-[5] grid grid-cols-5">
          {[1, 2, 3, 4].map((line) => (
            <div
              key={line}
              className="h-full border-r border-white/[0.045]"
            />
          ))}
        </div>

        {/* OUR IMPACT LABEL */}
        <div className="absolute left-1/2 top-[7vh] z-30 -translate-x-1/2 text-center">
          <p className="f-sans text-[14px] tracking-[1px] text-[#f7f5f0]">
            OUR <i>IMPACT</i>
          </p>
        </div>

        {/* THREE IMAGES — EACH ELEMENT IS RENDERED ONLY ONCE */}
        <div className="absolute left-1/2 top-[22vh] h-[48vh] w-[min(72vw,850px)] -translate-x-1/2 overflow-visible">

          {/* IMAGE 1 — B9DF2 */}
          <div
            className="absolute top-0 z-10 h-full w-[35%] overflow-hidden"
            style={{
              left: `${32.5 - sideSpread * 27.5}%`,
transform: `translate3d(${imageMove * 50.2}vw, ${imageFollow + imageMove * 23.5}vh, 0) rotate(${-7 * sideSpread * (1 - imageMove)}deg)`,            }}
          >
            <img
              src={`${A}/${projects[0]}.png`}
              alt=""
              className="size-full object-cover"
            />
          </div>

          {/* IMAGE 3 — 9DD89 */}
          <div
            className="absolute top-0 z-10 h-full w-[35%] overflow-hidden"
            style={{
              left: `${32.5 + sideSpread * 27.5}%`,
transform: `translate3d(${imageMove * 11}vw, ${imageFollow + imageMove * 115.8}vh, 0) rotate(${7 * sideSpread * (1 - imageMove)}deg)`,            }}
          >
            <img
              src={`${A}/${projects[2]}.png`}
              alt=""
              className="size-full object-cover"
            />
          </div>

          {/* IMAGE 2 — 7CAA8 */}
          <div
            className="absolute left-[32.5%] top-0 z-30 h-full w-[35%] overflow-hidden"
            style={{
transform: `translate3d(${imageMove * -30.4}vw, ${imageFollow + imageMove * 82}vh, 0)`,
            }}
          >
            <img
              src={`${A}/${projects[1]}.png`}
              alt=""
              className="size-full object-cover"
            />
          </div>

        </div>

        {/* PHASE 1 HEADLINE */}
        <div
          className="absolute inset-x-0 bottom-[8vh] z-20 text-center"
          style={{
            opacity: sideSpread,
            transform: `translateY(${(1 - sideSpread) * 35}px)`,
          }}
        >
          <h2 className="text-[clamp(38px,4vw,58px)] leading-none tracking-[-1.5px]">
            <span className="f-serif-m">Built on Experience.</span>
            <br />
            <span className="f-serif-bi">Proven by Results.</span>
          </h2>
        </div>

      </div>

      {/* VIEWPORT IMAGE — ON TOP OF THE UNDERLAY */}
      <div
        className="pointer-events-none absolute left-0 top-0 z-30 h-screen w-full"
        style={{
          transform: `translate3d(0, ${revealHold}vh, 0)`,
        }}
      >
        <div className="absolute inset-0 flex">
          {[0, 1, 2, 3, 4].map((i) => {
            const stripProgress = ease(
              range(
                viewportProgress,
                0.05 + i * 0.09,
                0.48 + i * 0.09
              )
            );

            return (
              <div
                key={i}
                className="relative h-full w-1/5 shrink-0 overflow-hidden"
                style={{
                  transform: `translate3d(0, ${-stripProgress * 100}%, 0)`,
                  willChange: "transform",
                }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url("${A}/Viewport.png")`,
                    backgroundSize: "500% 100%",
                    backgroundPosition: `${i * 25}% center`,
                    backgroundRepeat: "no-repeat",
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* FIRST 100VH — NORMAL DOCUMENT FLOW */}
      <div aria-hidden="true" className="relative h-screen" />

      
{/* PHASE 2 — FIGMA-MATCHED STAGGERED LAYOUT */}
<div className="relative z-20 h-[280vh]">

  {/* INTRODUCTORY PARAGRAPH */}
<div className="absolute left-[20%] top-[135vh] w-[39%] max-w-[560px]">
      <p className="f-sans-r text-[clamp(13px,1.1vw,16px)] leading-[1.6] text-[#d8d1c5]">
      Our journey is reflected in more than numbers. It is measured by
      the communities we have thoughtfully planned, the quality we
      have consistently delivered, the relationships we have built,
      and the trust we have earned along the way. Each milestone
      represents our commitment to creating places that offer lasting
      value, meaningful experiences, and a better way of living.
    </p>
  </div>

  {/* 8+ — YEARS OF EXPERIENCE */}
<div className="absolute left-[20%] top-[152vh]">
      <p className="f-serif-m text-[clamp(40px,4.5vw,68px)] leading-none">
      {metrics[0].number}
    </p>
    <p className="f-sans-r mt-2 text-[14px] text-[#d8d1c5]">
      {metrics[0].label}
    </p>
  </div>

  {/* 3 — PROJECTS DELIVERED */}
<div className="absolute left-[40%] top-[185vh]">
      <p className="f-serif-m text-[clamp(40px,4.5vw,68px)] leading-none">
      {metrics[1].number}
    </p>
    <p className="f-sans-r mt-2 text-[14px] text-[#d8d1c5]">
      {metrics[1].label}
    </p>
  </div>

  {/* 3+ — COMMUNITIES CREATED */}
<div className="absolute left-[60%] top-[216vh]">
      <p className="f-serif-m text-[clamp(40px,4.5vw,68px)] leading-none">
      {metrics[2].number}
    </p>
    <p className="f-sans-r mt-2 text-[14px] text-[#d8d1c5]">
      {metrics[2].label}
    </p>
  </div>

  {/* 310+ — HAPPY FAMILIES */}
<div className="absolute left-[40%] top-[247vh]">
      <p className="f-serif-m text-[clamp(40px,4.5vw,68px)] leading-none">
      {metrics[3].number}
    </p>
    <p className="f-sans-r mt-2 text-[14px] text-[#d8d1c5]">
      {metrics[3].label}
    </p>
  </div>

</div>

    </section>
  );
}




export default function App() {
  const [route, setRoute] = useState(
    () => window.location.hash || "#/"
  );

  useEffect(() => {
    const handleRouteChange = () => {
      setRoute(window.location.hash || "#/");
      window.scrollTo(0, 0);
    };

    window.addEventListener("hashchange", handleRouteChange);

    return () => {
      window.removeEventListener("hashchange", handleRouteChange);
    };
  }, []);

  if (route === "#/nri") {
    return <NriPage />;
  }

  if (route === "#/upcoming") {
    return <UpcomingPage />;
  }

  if (route === "#/about") {
    return <AboutPage />;
  }

  if (route.startsWith("#/country-side")) {
  return <CountrySidePage />;
}

if (route.startsWith("#/shankar-enclave")) return <ShankarEnclavePage />;

  return (
    <main className="bg-[#fffdf0]">
      <Immersive />

      <Pillars />

      <Experience />

<GreatBuildsWay />

<ImpactSequence />

<section className="flex flex-col items-center gap-[40px] px-[clamp(20px,2.8vw,40px)] py-[80px]">
        <Reveal>
          <h2 className="max-w-[476px] text-center text-[clamp(40px,3.9vw,56px)] leading-none tracking-[-1.4px] text-[#1b3022]">
            <span className="f-serif-m">The Story Behind </span>
            <span className="f-serif-bi">What We Build</span>
          </h2>
        </Reveal>

        <Reveal className="w-full">
          <div className="flex aspect-[1360/765] w-full items-center justify-center bg-black/10">
            <p className="f-sans text-[clamp(20px,2.8vw,40px)] tracking-[4px] text-black/10">
              CINEMATIC VIDEO
            </p>
          </div>
        </Reveal>
      </section>

      <section className="relative overflow-hidden bg-[#1b3022] px-[clamp(20px,2.8vw,40px)] py-[80px]">
        <img
          src={`${A}/ae1f5.png`}
          alt=""
          className="absolute inset-0 size-full object-cover mix-blend-overlay"
        />

        <div className="relative flex flex-col gap-[80px] lg:flex-row">
          <Reveal className="flex-1">
            <h2 className="text-[clamp(40px,3.9vw,56px)] leading-none tracking-[-1.4px] text-[#f7f5f0]">
              <span className="f-serif-m block">Want to build</span>
              <span className="f-serif-m block">something great?</span>
              <span className="f-serif-bi block tracking-[-0.4px]">
                Get in touch.
              </span>
            </h2>

            <p className="f-sans mt-[24px] text-[16px] leading-[1.5] text-[#d8d1c5]">
              Whether you're looking for land or ready to build, we'd love to
              help.
            </p>
          </Reveal>

          <Reveal className="w-full lg:w-[640px]" delay={150}>
            <form
              className="flex flex-col gap-[40px]"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="flex flex-col gap-[16px] backdrop-blur-[10px]">
                <p className="flex items-baseline gap-[6px]">
                  <span className="f-sans text-[18px] text-[#f7f5f0]">
                    Enter your contact information
                  </span>

                  <span className="f-sans-r text-[15px] italic text-[#888]">
                    (required)
                  </span>
                </p>

                <div className="flex gap-[12px]">
                  <input
                    className="field f-sans-r h-[48px]"
                    placeholder="First name"
                    required
                  />

                  <input
                    className="field f-sans-r h-[48px]"
                    placeholder="Last name"
                    required
                  />
                </div>

                <input
                  className="field f-sans-r h-[48px]"
                  type="email"
                  placeholder="Email address"
                  required
                />

                <input
                  className="field f-sans-r h-[48px]"
                  type="tel"
                  placeholder="Phone number"
                  required
                />
              </div>

              <div className="flex flex-col gap-[16px]">
                <p className="f-sans text-[18px] text-[#f7f5f0]">
                  Type your message
                </p>

                <textarea
                  className="field f-sans-r h-[200px] resize-none backdrop-blur-[10px]"
                  placeholder="Enter message.."
                />
              </div>

              <button className="f-sans self-end bg-[#f7f5f0] px-[40px] py-[14px] text-[14px] tracking-[0.5px] text-[#1b3022] transition-colors hover:bg-[#c9a24b] hover:text-white">
                SUBMIT
              </button>
            </form>
          </Reveal>
        </div>
      </section>

      <footer className="bg-[#1b3022] px-[clamp(20px,2.8vw,40px)] pb-[32px] pt-[80px] text-[#f7f5f0]">
        <div className="flex flex-col justify-between gap-[60px] lg:flex-row">
          <Reveal>
            <h2 className="max-w-[593px] text-[clamp(48px,5.6vw,80px)] leading-none tracking-[-2px]">
              <span className="f-serif-m block">Let's build your</span>
              <span className="f-serif-bi block">future together.</span>
            </h2>
          </Reveal>

          <div className="flex gap-[clamp(40px,7vw,100px)] text-[16px]">
            <div className="flex w-[200px] flex-col gap-[12px] leading-[1.5]">
              <p className="f-serif-bi tracking-[-0.4px] text-[#f7f5f0]/50">
                AMENITIES
              </p>

              {[
                "About us",
                "Amenities",
                "Location",
                "Investment",
                "FAQ's",
                "Our Projects",
                "Gallery",
                "Why Gauribidanur",
                "Contact Us",
              ].map((l) => (
                <a
                  key={l}
                  href="#"
                  className="f-sans-r hover:text-[#c9a24b]"
                >
                  {l}
                </a>
              ))}
            </div>

            <div className="flex w-[200px] flex-col gap-[32px]">
              {[
                ["CONTACT", ["+91 82178 55041"]],
                ["EMAIL", ["info@royalgreens.in"]],
                [
                  "ADDRESS",
                  [
                    "The Great Builds,",
                    "No 762, 7th Cross, Sector A,",
                    "Yelahanka New Town,",
                    "Bengaluru, Karnataka",
                    "560064",
                  ],
                ],
              ].map(([h, lines]) => (
                <div key={h as string} className="flex flex-col gap-[12px]">
                  <p className="f-serif-bi leading-[1.5] tracking-[-0.4px] text-[#f7f5f0]/50">
                    {h as string}
                  </p>

                  <div className="f-sans-r leading-[26px]">
                    {(lines as string[]).map((l) => (
                      <p key={l}>{l}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="f-sans-r mt-[80px] flex flex-wrap justify-between gap-[20px] text-[14px] leading-[1.5] text-[#f7f5f0]/30">
          <div className="flex flex-wrap gap-[40px]">
            <span>©2026, The Great Builds</span>

            {["Instagram", "LinkedIn", "Facebook", "X"].map((s) => (
              <a
                key={s}
                href="#"
                className="hover:text-[#f7f5f0]"
              >
                {s}
              </a>
            ))}
          </div>

          <div className="flex gap-[40px]">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms &amp; Conditions</a>
          </div>
        </div>
      </footer>
    </main>
  );
}