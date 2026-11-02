import { ContactSection, Footer, Reveal, SiteHeader, SubmitButton } from "./shared";

const N = "/assets/nri";
const PAD = "px-[clamp(20px,2.8vw,40px)]";

type Item = { title: string; body: string[] };
type Block = { title: [string, string]; items: Item[]; tight?: boolean };

const BLOCKS: Block[] = [
  {
    title: ["Why Invest with ", "The Great Builds?"],
    items: [
      { title: "1. Trust and Reliability", body: ["The Great Builds is a name synonymous with trust, class, and sophistication. With over three decades of experience in real estate, we have established ourselves as a trusted brand known for our commitment to quality, excellence, and customer satisfaction."] },
      { title: "2. Premium Properties", body: ["We offer a wide range of premium residential and commercial properties that are meticulously designed to meet the highest standards of quality and luxury. Our projects are strategically located in prime areas, ensuring excellent connectivity and robust infrastructure."] },
      { title: "3. Hassle-Free Transactions", body: ["Our dedicated NRI services team ensures that your property purchase process is smooth and hassle-free. From property selection and documentation to finance and after-sales support, we assist you at every step, making your investment journey seamless and straightforward."] },
      { title: "4. Transparent Practices", body: ["Transparency is at the core of our business ethos. We ensure that all transactions are conducted with complete honesty and integrity, providing you with all the necessary information to make informed decisions."] },
      { title: "5. Legal Integrity", body: ["Every investment begins with confidence.", "Independent title verification, clear ownership records, regulatory compliance, verified approvals and documented due diligence."] },
      { title: "6. Absolute Transparency", body: ["No hidden terms. No unexpected surprises.", "Transparent pricing, clear payment schedules, detailed cost breakdowns, accessible documentation and regular project updates."] },
      { title: "7. Seamless Global Ownership", body: ["Distance should never become a disadvantage.", "Dedicated NRI relationship management, virtual property walkthroughs, remote documentation assistance and coordinated registration support."] },
      { title: "8. Lifelong Asset Stewardship", body: ["Our relationship extends beyond the transaction.", "Post-purchase documentation support, property maintenance coordination, regular inspections and long-term property management assistance."] },
    ],
  },
  {
    title: ["Investment ", "Opportunities"],
    tight: true,
    items: [
      { title: "1. Residential Projects", body: ["Discover a range of residential projects that offer luxurious living spaces designed to provide comfort, convenience, and a sense of community. Each of our residential properties is a blend of modern architecture and thoughtful amenities, ensuring a superior lifestyle for you and your family."] },
    ],
  },
  {
    title: ["NRI Investment ", "Guidelines"],
    items: [
      { title: "1. Eligibility", body: ["NRIs, OCIs, and PIOs (Persons of Indian Origin) are eligible to purchase residential and commercial properties in India."] },
      { title: "2. Repatriation of Funds", body: ["NRIs can repatriate the proceeds from the sale of property in India, subject to certain conditions."] },
      { title: "3. Documentation", body: ["NRIs can repatriate the proceeds from the sale of property in India, subject to certain conditions."] },
      { title: "4. Financing", body: ["NRIs can avail of home loans from Indian financial institutions, subject to eligibility criteria and documentation requirements."] },
    ],
  },
  {
    title: ["How We ", "Help"],
    items: [
      { title: "Property Selection", body: ["We help you identify properties that align with your investment goals and preferences. Our team provides detailed information, virtual tours, and personalized assistance to help you make the right choice."] },
      { title: "Legal and Financial Assistance", body: ["Our experts guide you through the legal and financial aspects of property investment, ensuring compliance with all regulations and facilitating smooth transactions."] },
      { title: "Post-Purchase Support", body: ["Our relationship with you extends beyond the purchase. We offer comprehensive post-purchase support, including property management, rental assistance, and resale services, ensuring that your investment remains rewarding and well-maintained."] },
    ],
  },
];

export default function NriPage() {
  return (
    <main className="bg-[#1b3022]">
      <SiteHeader base={N} logo="15ac5" />

      <section className={`${PAD} pt-[31px]`}>
        <div className="relative flex h-[clamp(280px,36vw,520px)] items-center justify-center overflow-hidden">
          <img src={`${N}/ce4df.png`} alt="Mumbai skyline at dusk seen from a terrace" className="absolute inset-0 size-full object-cover" />
          <h1 className="relative whitespace-nowrap text-[clamp(56px,8.33vw,120px)] leading-[1.5] tracking-[-0.025em] text-[#1b3022]">
            <span className="n-cb">NRI </span>
            <span className="f-serif-bi">Corner</span>
          </h1>
        </div>
        <Reveal>
          <p className="n-sr pb-[47px] pt-[40px] text-[clamp(18px,1.67vw,24px)] leading-[1.5] tracking-[-0.025em] text-[#f7f5f0]">
            We understand the unique needs of Non-Resident Indians (NRIs) and Overseas Citizens of India (OCIs) when it comes to investing in property back home. Our goal is to provide you with seamless, transparent, and rewarding experiences in acquiring your dream property in India.
          </p>
        </Reveal>
      </section>

      <section className={`flex flex-col gap-[clamp(56px,5.6vw,80px)] bg-[#f7f5f0] pb-[120px] pt-[80px] ${PAD}`}>
        {BLOCKS.map((block) => (
          <div key={block.title[1]} className="flex flex-col gap-[40px]">
            <Reveal>
              <h2 className="f-serif-m text-[clamp(36px,3.33vw,48px)] leading-[1.5] tracking-[-0.025em] text-black">
                {block.title[0]}
                <span className="f-serif-bi">{block.title[1]}</span>
              </h2>
            </Reveal>
            <div className={`flex flex-col ${block.tight ? "" : "gap-[24px]"}`}>
              {block.items.map((item) => (
                <Reveal key={item.title}>
                  <article className="flex flex-col gap-[10px] text-[#1b3022]">
                    <h3 className="n-sb text-[clamp(20px,1.67vw,24px)] leading-[1.5] tracking-[-0.025em]">{item.title}</h3>
                    <span className="h-[2px] w-[100px] bg-[#c59d48]" />
                    <div className="n-sr text-[clamp(17px,1.39vw,20px)] leading-[1.5] tracking-[-0.025em]">
                      {item.body.map((line) => (
                        <p key={line}>{line}</p>
                      ))}
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        ))}
      </section>

      <ContactSection submit={<SubmitButton base={N} />} />
      <Footer />
    </main>
  );
}
