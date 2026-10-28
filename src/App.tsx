import { useEffect, useRef, useState, type ReactNode, type RefObject } from "react";

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

    const tick = () => {
      const el = ref.current;

      if (el) {
        const r = el.getBoundingClientRect();
        const total = r.height - window.innerHeight;
        setP(clamp(-r.top / (total || 1)));
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
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
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Hero: stays stationary while the intro is revealed over it */}
        <div className="absolute inset-0 overflow-hidden bg-black">
          <div className="absolute inset-0">
            <Layers srcs={["2a2bb", "e2cd8"]} />

            <div
              className="absolute inset-0"
              style={{ backgroundImage: vignette(0.5, 0.40244) }}
            />

            <div className="absolute inset-0 bg-black/20" />
          </div>

          <header className="absolute inset-x-[clamp(20px,2.8vw,40px)] top-[20px] flex items-start justify-between">
            <Logo />

            <nav className="f-sans absolute left-1/2 top-[20px] flex -translate-x-1/2 gap-8 text-[15px] tracking-[0.5px] text-white">
              {["PROJECTS", "ABOUT", "NRI"].map((n) => (
                <a
                  key={n}
                  href="#"
                  className="transition-opacity hover:opacity-70"
                >
                  {n}
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
          <div className="absolute inset-x-0 top-[13vh] flex justify-center">
            <div
              className="relative flex w-[min(47.5vw,82vh,684px)] items-start justify-between"
              style={{
                transform: `scale(${lerp(1.22, 1, settle)})`,
                transformOrigin: "50% 0%",
              }}
            >
              <div className="w-[47.66%]">
                <div className="relative aspect-[326/467] overflow-hidden rounded-[4px] bg-[#d9d9d9]">
                  <Layers srcs={["b7007", "c81ef", "17e86"]} />
                </div>

                <div className="shelf -mx-[2.45%] h-[20px]" />
              </div>

              <div className="relative mt-[15.5%] w-[47.66%]">
                <div className="relative aspect-[326/468] overflow-hidden rounded-[4px] bg-[#d9d9d9]">
                  <Layers srcs={["2263e", "763e4"]} />
                </div>

                <div className="shelf -mx-[2.45%] h-[20px]" />

                <img
                  src={`${A}/5a274.png`}
                  alt=""
                  className="absolute left-[93%] top-[54%] w-[44%]"
                  style={{ transform: "scaleY(-1) rotate(180deg)" }}
                />
              </div>
            </div>
          </div>

          <p className="f-serif absolute bottom-[6vh] left-[clamp(20px,2.8vw,40px)] right-[clamp(20px,2.8vw,40px)] text-[clamp(28px,3.9vw,56px)] leading-[1.2] tracking-[-1.4px] text-[#1e1e1e]">
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
          style={{ pointerEvents: rise > 0.5 ? "auto" : "none" }}
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
      i === 0 ? enter : swaps[i - 1];

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
                  href="#"
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
    img: "pillars/pil_sustain.jpg",
    title: "Nature is part of the foundation.",
    text: "We thoughtfully integrate green spaces, landscapes, and responsible development to create healthier environments that endure.",
  },
  {
    name: "Purpose",
    img: "pillars/pil_purpose.jpg",
    title: "Every community begins with a reason.",
    text: "We design around the way people live, work and grow, so every space has a purpose behind it.",
  },
  {
    name: "Longevity",
    img: "pillars/pil_longevity.jpg",
    title: "Built for today. Considered for tomorrow.",
    text: "Quality materials and enduring planning create homes and communities that age gracefully for generations.",
  },
];

function Pillars() {
  const [open, setOpen] = useState(0);

  return (
    <section className="bg-[#fffdf0] px-[clamp(20px,2.8vw,40px)] pb-[80px] pt-[120px]">
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
                className="group relative min-h-[80px] min-w-0 overflow-hidden text-left transition-[flex-grow] duration-[900ms] ease-[cubic-bezier(.65,0,.35,1)]"
                style={{ flexGrow: on ? 3.6 : 1, flexBasis: 0 }}
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

                <span className="f-serif-bi absolute left-[16px] top-[16px] text-[18px] text-white">
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
                  <p className="f-sans text-[16px] leading-[1.4]">
                    {pl.title}
                  </p>

                  <p className="f-sans-r mt-[4px] text-[14px] leading-[1.5] text-white/75">
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
  const grow = ease(range(p, 0.15, 0.85));

  return (
    <section ref={ref} className="relative h-[220vh] bg-[#1b3022]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div
          className="absolute overflow-hidden"
          style={{
            left: `${lerp(3, 0, grow)}%`,
            right: `${lerp(3, 0, grow)}%`,
            top: `${lerp(38, 0, grow)}%`,
            bottom: `${lerp(6, 0, grow)}%`,
            borderRadius: `${lerp(4, 0, grow)}px`,
          }}
        >
          <img
            src={`${A}/13b3a.png`}
            alt=""
            className="absolute inset-0 size-full object-cover"
            style={{ transform: `scale(${lerp(1.15, 1, grow)})` }}
          />

          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div
          className="relative px-[clamp(20px,2.8vw,40px)] pt-[clamp(48px,12vh,120px)] text-[#f7f5f0]"
          style={{
            opacity: range(p, 0, 0.12),
            transform: `translateY(${lerp(40, 0, ease(range(p, 0, 0.15)))}px)`,
          }}
        >
          <p className="f-sans text-[14px] tracking-[-0.35px]">
            EXPERIENCE &amp; <i>LIFESTYLE</i>
          </p>

          <h2 className="mt-[20px] max-w-[519px] text-[clamp(40px,3.9vw,56px)] leading-none tracking-[-1.4px]">
            <span className="f-serif-m">Designed Around the </span>
            <span className="f-serif-bi">Way You Live.</span>
          </h2>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <main className="bg-[#fffdf0]">
      <Immersive />

      <Pillars />

      <Experience />

      <section className="bg-[#1b3022] px-[clamp(20px,2.8vw,40px)] pb-[40px] pt-[80px] text-[#f9f6e6]">
        <Reveal>
          <p className="f-sans text-[14px] tracking-[-0.35px]">
            THE GREATBUILD <i>WAY</i>
          </p>

          <h2 className="mt-[20px] text-[clamp(40px,3.9vw,56px)] leading-[1.2] tracking-[-1.4px]">
            <span className="f-serif-m">Purpose in </span>
            <span className="f-serif-bi">Every Step</span>
          </h2>
        </Reveal>

        <div className="mt-[80px] grid gap-[40px] border-t border-white/15 pt-[40px] md:grid-cols-3">
          {[
            [
              "01",
              "Land, chosen with care",
              "Every plot begins with the terrain, the light and the way water moves across it.",
            ],
            [
              "02",
              "Built around nature",
              "Green corridors, native planting and open courts shape how each community breathes.",
            ],
            [
              "03",
              "Made to gather",
              "Shared spaces designed for long evenings, slow mornings and the people you love.",
            ],
          ].map(([n, t, d], i) => (
            <Reveal key={n} delay={i * 120}>
              <span className="f-serif-bi text-[20px] text-[#c9a24b]">
                {n}
              </span>

              <h3 className="f-serif-m mt-[12px] text-[32px] leading-[1.1]">
                {t}
              </h3>

              <p className="f-sans-r mt-[12px] max-w-[360px] text-[16px] leading-[1.5] text-[#d8d1c5]">
                {d}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

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