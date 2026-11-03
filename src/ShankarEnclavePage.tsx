import { useRef } from "react";
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
const png = (name: string) => `${C}/${name}.png`;
const cut = (t: number) => `${(1 - t) * 100}%`;

const GALLERY = [
  {
    img: "398d9",
    title: ["Timeless Forms, ", "Thoughtfully Designed"],
    text: "Every architectural element is considered with purpose, creating spaces that balance form, function, and a timeless sense of character. From the overall planning to the smallest structural details, design works together to create places that feel cohesive, refined, and enduring.",
  },
  {
    img: "4d4d1",
    title: ["Nature Woven ", "Into Living"],
    text: "Green spaces and natural surroundings are thoughtfully integrated into the community, creating a seamless connection between the built environment and nature. Landscapes provide room to pause, explore, connect, and experience a more balanced way of everyday living.",
  },
  {
    img: "969e5",
    title: ["Life Designed ", "Around You"],
    text: "Every space is shaped around the experiences that make everyday life meaningful. From moments of connection and recreation to quiet time and exploration, the community creates opportunities to live, gather, unwind, and enjoy life at your own pace.",
  },
  {
    img: "66ee5",
    title: ["Thoughtful Touches, ", "Meaningful Moments"],
    text: "It is the considered details that bring a place together. From materials and finishes to shared spaces and everyday conveniences, each element is thoughtfully resolved to create an experience that feels intentional, comfortable, and lasting.",
  },
];

const HOTSPOTS = [
  { x: 46.9, y: 55.9, icon: "5aa80" },
  { x: 69.2, y: 78.1, icon: "838ce" },
  { x: 61.2, y: 15.9, icon: "f2640" },
  { x: 16.7, y: 20.8, icon: "cb61c" },
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
  const landscape = ease(range(p, 0.66, 0.76));
  const future = ease(range(p, 0.84, 0.94));
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
              src={png("13893")}
              alt="Shankar Enclave residential home"
              className="absolute inset-0 size-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#142219]/65 via-transparent to-black/20" />
          </div>

          <div style={{ opacity: fade, transform: lift }}>
            <SiteHeader base={C} logo="d4dfd" />
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
            src={png("d2634")}
            alt="Aerial view of the Shankar Enclave neighbourhood"
            className="absolute inset-0 size-full object-cover"
          />

          {HOTSPOTS.map((spot, i) => (
            <div
              key={spot.icon}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
            >
              <img src={`${C}/${spot.icon}.svg`} width={32} height={32} alt="" />
            </div>
          ))}

          <div
            className="absolute bottom-0 left-0 w-[min(519px,100%)] bg-[#1b3022]"
            style={{ clipPath: `inset(${cut(card)} 0 0 0)` }}
          >
            <div className="flex flex-col gap-[16px] px-[clamp(20px,2.8vw,40px)] pb-[clamp(24px,2.8vw,40px)] pt-[clamp(20px,2.5vw,36px)]">
              <p className="n-sr text-[clamp(14px,1.39vw,20px)] leading-[1.5] tracking-[-0.025em] text-[#ddd]">
                Green spaces are essential for urban environments, providing a breath of fresh air amidst the concrete jungle. They offer a refuge for wildlife, a place for community gatherings, and a venue for recreational activities. Parks, gardens, and green rooftops not only enhance the aesthetic appeal of a city but also contribute to the well-being of its residents by promoting outdoor activities and relaxation.
              </p>
              <h2 className="f-serif-m text-[clamp(28px,2.8vw,40px)] leading-none tracking-[-0.025em] text-[#fffdf0]">
                Green spaces
              </h2>
            </div>
          </div>
        </div>

        {/* Landscape image and statement */}
        <div
          className="absolute inset-0 bg-white"
          style={{ transform: `translateY(${(1 - landscape) * 100}%)` }}
        >
          <img
            src={`${C}/8cd69.png`}
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
            src={`${C}/landscape.png`}
            alt=""
            className="absolute inset-0 size-full object-cover"
          />
          <Shade />
          <p className={`n-sr absolute bottom-[clamp(32px,12vh,150px)] left-0 max-w-[524px] text-[clamp(16px,1.39vw,20px)] leading-[1.2] tracking-[-0.025em] text-[#fffdf0] ${PAD}`}>
            The right space gives you room to think beyond the present. Shankar Enclave offers the opportunity to imagine what comes next — from planning a future home to creating a place that reflects your own aspirations.
          </p>
        </div>
      </div>
    </section>
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
      <div className="sticky top-0 flex h-svh overflow-hidden bg-[#1b3022] max-md:flex-col">
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
      <Story />
      <Gallery />
      <ContactSection submit={<SubmitButton base={C} />} />
      <Footer />
    </main>
  );
}