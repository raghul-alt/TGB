import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";


const A = "/assets";

export const clamp = (v: number, a = 0, b = 1) =>
  Math.min(b, Math.max(a, v));

export const range = (p: number, s: number, e: number) =>
  clamp((p - s) / (e - s));

export const ease = (t: number) =>
  1 - Math.pow(1 - t, 3);

export function useProgress(ref: RefObject<HTMLElement | null>) {
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

export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setIn] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setIn(true), { threshold: 0.15 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${inView ? "in" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export function ContactSection({ submit }: { submit?: ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-[#1b3022] px-[clamp(20px,2.8vw,40px)] py-[80px]">
      <img src={`${A}/ae1f5.webp`} alt="" className="absolute inset-0 size-full object-cover mix-blend-overlay" />
      <div className="relative flex flex-col gap-[80px] lg:flex-row">
        <Reveal className="flex-1">
          <h2 className="text-[clamp(40px,3.9vw,56px)] leading-none tracking-[-1.4px] text-[#f7f5f0]">
            <span className="f-serif-m block">Want to build</span>
            <span className="f-serif-m block">something great?</span>
            <span className="f-serif-bi block tracking-[-0.4px]">Get in touch.</span>
          </h2>
          <p className="f-sans mt-[24px] text-[16px] leading-[1.5] text-[#d8d1c5]">
            Whether you're looking for land or ready to build, we'd love to help.
          </p>
        </Reveal>
        <Reveal className="w-full lg:w-[640px]" delay={150}>
          <form className="flex flex-col gap-[40px]" onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col gap-[16px] backdrop-blur-[10px]">
              <p className="flex items-baseline gap-[6px]">
                <span className="f-sans text-[18px] text-[#f7f5f0]">Enter your contact information</span>
                <span className="f-sans-r text-[15px] italic text-[#888]">(required)</span>
              </p>
              <div className="flex gap-[12px]">
                <input className="field f-sans-r h-[48px]" placeholder="First name" required />
                <input className="field f-sans-r h-[48px]" placeholder="Last name" required />
              </div>
              <input className="field f-sans-r h-[48px]" type="email" placeholder="Email address" required />
              <input className="field f-sans-r h-[48px]" type="tel" placeholder="Phone number" required />
            </div>
            <div className="flex flex-col gap-[16px]">
              <p className="f-sans text-[18px] text-[#f7f5f0]">Type your message</p>
              <textarea className="field f-sans-r h-[200px] resize-none backdrop-blur-[10px]" placeholder="Enter message.." />
            </div>
            {submit ?? (
              <button className="f-sans self-end bg-[#f7f5f0] px-[40px] py-[14px] text-[14px] tracking-[0.5px] text-[#1b3022] transition-colors hover:bg-[#c9a24b] hover:text-white">
                SUBMIT
              </button>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
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
            <p className="f-serif-bi tracking-[-0.4px] text-[#f7f5f0]/50">AMENITIES</p>
            {["About us", "Amenities", "Location", "Investment", "FAQ's", "Our Projects", "Gallery", "Why Gauribidanur", "Contact Us"].map((l) => (
              <a key={l} href="#" className="f-sans-r hover:text-[#c9a24b]">{l}</a>
            ))}
          </div>
          <div className="flex w-[200px] flex-col gap-[32px]">
            {[
              ["CONTACT", ["+91 82178 55041"]],
              ["EMAIL", ["info@royalgreens.in"]],
              ["ADDRESS", ["The Great Builds,", "No 762, 7th Cross, Sector A,", "Yelahanka New Town,", "Bengaluru, Karnataka", "560064"]],
            ].map(([h, lines]) => (
              <div key={h as string} className="flex flex-col gap-[12px]">
                <p className="f-serif-bi leading-[1.5] tracking-[-0.4px] text-[#f7f5f0]/50">{h as string}</p>
                <div className="f-sans-r leading-[26px]">{(lines as string[]).map((l) => <p key={l}>{l}</p>)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="f-sans-r mt-[80px] flex flex-wrap justify-between gap-[20px] text-[14px] leading-[1.5] text-[#f7f5f0]/30">
        <div className="flex flex-wrap gap-[40px]">
          <span>©2026, The Great Builds</span>
          {["Instagram", "LinkedIn", "Facebook", "X"].map((s) => <a key={s} href="#" className="hover:text-[#f7f5f0]">{s}</a>)}
        </div>
        <div className="flex gap-[40px]">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms &amp; Conditions</a>
        </div>
      </div>
    </footer>
  );
}

const PAD = "px-[clamp(20px,2.8vw,40px)]";

// Inner-page header: gold logo left, centered nav with a blurred text-roll hover.
export function SiteHeader({ base, logo, className = "" }: { base: string; logo: string; className?: string }) {
    const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <header className={`fixed inset-x-0 top-0 z-[200] flex items-start justify-between pt-[20px] pb-[12px] ${PAD} ${className} ${isScrolled ? "bg-[#ffffff]/10 backdrop-blur-xl" : ""} transition-colors duration-300`}>
      <a href="#/" className="flex flex-col items-center gap-[10px]" aria-label="The Great Builds home">
        <img
  src={`${base}/${logo}.svg`}
  width={98.6058}
  height={48}
  alt="The Great Builds"
  className="w-[85px] h-auto md:w-[98.6058px]"
/>
        <span className="relative block h-[8.2px] w-[138.6px]">
          <img className="absolute left-0 top-[0.1px]" src={`${base}/a4ef2.svg`} width={27.8114} height={8.0057} alt="" />
          <img className="absolute left-[35.41px] top-0" src={`${base}/2dfaa.svg`} width={46.111} height={8.2112} alt="" />
          <img className="absolute left-[89.11px] top-[0.01px]" src={`${base}/b9fc6.svg`} width={49.6171} height={8.1867} alt="" />
        </span>
      </a>
      <nav className="n-sm absolute left-1/2 top-[30px] hidden -translate-x-1/2 items-center gap-[32px] text-[clamp(14px,1.1vw,16px)] tracking-[-0.4px] md:flex">
  <div className="group relative">
  <div className="flex cursor-pointer items-center gap-[7px] px-[16px] py-[12px]">
    <span className="text-[#ddd] transition-colors duration-300 group-hover:text-[#ffffff]">
  PROJECTS
</span>

    <svg
      className="mt-[1px] size-[10px] text-[#ddd] transition-transform duration-300 group-hover:rotate-180"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
    >
      <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  </div>

  <div className="invisible absolute left-0 top-full z-50 w-[260px] translate-y-[10px] pt-[14px] opacity-0 transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
    <div className="border border-[#c6a45c]/30 bg-[#17271f]/95 px-[20px] pt-[18px] pb-0 shadow-[0_16px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl">
      <p className="mb-[12px] text-[10px] tracking-[2px] text-[#c6a45c]">
  EXPLORE PROJECTS
</p>

<div className="-mx-[20px] h-px bg-white/15" />

{[
  { label: "Shankar Enclave", href: "#/shankar-enclave" },
  { label: "Royal Greens", href: "#/royal-greens" },
  { label: "Country Side", href: "#/country-side" },
].map((project) => (
  <a
    key={project.href}
    href={project.href}
    className="group/item -mx-[20px] flex items-center justify-between px-[20px] py-[14px] text-[15px] tracking-[0.1px] text-white/75 transition-all duration-300 hover:bg-white/[0.06] hover:pl-[27px] hover:text-[#e5d2a5]"
  >
    <span>{project.label}</span>
    <span className="translate-x-[-5px] text-[#ddd] opacity-0 transition-all duration-200 group-hover/item:translate-x-0 group-hover/item:opacity-100">
      →
    </span>
  </a>
))}

<div className="mt-[12px]">
  <p className="relative mb-0 pb-[12px] text-[10px] tracking-[2px] text-[#c6a45c] after:absolute after:bottom-0 after:left-[-20px] after:right-[-20px] after:h-px after:bg-white/15">
    UPCOMING PROJECT
  </p>

  <a
    href="#/upcoming"
    className="group/item -mx-[20px] flex items-center justify-between px-[20px] py-[14px] text-[15px] tracking-[0.1px] text-white/75 transition-all duration-300 hover:bg-white/[0.06] hover:px-[27px] hover:text-[#e5d2a5]"
  >
    <span>Codename: Nature</span>
    <span className="translate-x-[-5px] text-[#ddd] opacity-0 transition-all duration-200 group-hover/item:translate-x-0 group-hover/item:opacity-100">
      →
    </span>
  </a>
</div>
    </div>
  </div>
</div>

  <NavLink label="ABOUT" href="#/about" />
  <NavLink label="NRI" href="#/nri" />
</nav>

            
      {/* Mobile Hamburger Menu */}
      <details className="group absolute inset-x-0 top-0 z-[60] md:hidden">
        <summary
          aria-label="Toggle navigation menu"
          className="absolute right-[clamp(20px,2.8vw,40px)] top-[28px] z-[70] flex size-[42px] cursor-pointer list-none items-center justify-center border-0 bg-transparent [&::-webkit-details-marker]:hidden"
        >
          {/* Hamburger */}
          <svg
            className="size-[22px] text-white group-open:hidden"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M4 7H20M4 12H20M4 17H20"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>

          {/* Close icon */}
          <svg
            className="hidden size-[22px] text-white group-open:block"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M6 6L18 18M18 6L6 18"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </summary>

<div className="absolute left-0 right-0 top-0 z-[60] h-fit w-full -translate-y-4 overflow-y-auto border border-[#c6a45c]/30 bg-[#17271f] px-[20px] pb-[40px] pt-[90px] text-white opacity-0 shadow-[0_16px_40px_rgba(0,0,0,0.35)] transition-all duration-300 ease-out group-open:translate-y-0 group-open:opacity-100">
          <div className="n-sm">
            <div className="py-[14px]">
              <details className="group/projects">
                <summary className="flex cursor-pointer list-none items-center justify-between text-[15px] text-white/85 [&::-webkit-details-marker]:hidden">
                  PROJECTS
                  <svg
                    className="size-[12px] transition-transform duration-300 group-open/projects:rotate-180"
                    viewBox="0 0 12 12"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.2" />
                  </svg>
                </summary>

                <div className="pt-[10px]">
                  <p className="mb-[8px] pt-[12px] text-[10px] tracking-[2px] text-[#c6a45c]">
                    EXPLORE PROJECTS
                  </p>

                  {[
                    { label: "Shankar Enclave", href: "#/shankar-enclave" },
                    { label: "Royal Greens", href: "#/royal-greens" },
                    { label: "Country Side", href: "#/country-side" },
                  ].map((project) => (
                    <a
                      key={project.href}
                      href={project.href}
                      className="block py-[13px] text-[15px] text-white/75"
                    >
                      {project.label}
                    </a>
                  ))}

                  <p className="mb-0 mt-[12px] pt-[12px] text-[10px] tracking-[2px] text-[#c6a45c]">
                    UPCOMING PROJECT
                  </p>

                  <a
                    href="#/upcoming"
                    className="block py-[13px] text-[15px] text-white/75"
                  >
                    Codename: Nature
                  </a>
                </div>
              </details>
            </div>

            <div className="[&_a]:!px-0">
  <NavLink label="ABOUT" href="#/about" />
  <NavLink label="NRI" href="#/nri" />
</div>
          </div>
        </div>
        <div className="fixed inset-0 z-[50] bg-black/40" />
      </details>

    </header>
  );
}

function NavLink({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      className="group block px-0 py-[12px] text-[#ddd] transition-colors duration-300 hover:text-[#ffffff]"
    >
      {label}
    </a>
  );
}

export function SubmitButton({ base }: { base: string }) {
  return (
    <button type="submit" className="group relative h-[44px] w-[220px] self-end overflow-hidden bg-[#f7f5f0] backdrop-blur-[10px]">
      <span className="n-sb absolute left-[12px] top-[11px] text-[16px] leading-[normal] text-[#1b3022] transition-transform duration-300 group-hover:-translate-y-[30px]">Submit</span>
      <span className="n-sb absolute left-[12px] top-[41px] text-[16px] leading-[normal] text-[#1b3022] transition-transform duration-300 group-hover:-translate-y-[30px]">Submit</span>
      <span className="absolute left-[180px] top-[4px] size-[36px] bg-[#1b3022]">
        <img src={`${base}/f0870.svg`} width={20} height={20} alt="" className="absolute left-[8px] top-[8px]" />
      </span>
    </button>
  );
}
