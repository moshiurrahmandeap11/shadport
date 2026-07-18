import { Metadata } from "next";
import { createMetadata, createFaqSchema } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "FAQ | Moshiur Rahman DEAP - Full Stack Developer",
  description:
    "Frequently asked questions about hiring Moshiur Rahman DEAP, services, pricing, process, and technologies. Best full stack developer in Bangladesh.",
  keywords: [
    "faq",
    "moshiur rahman faq",
    "hire developer faq",
    "full stack developer services",
    "web development pricing",
    "freelance developer bangladesh",
  ],
  url: "/faq",
});

const faqs = [
  {
    question: "What services do you offer?",
    answer:
      "I offer full-stack web development services including frontend development with React.js and Next.js, backend development with Node.js and Express, database design with MongoDB and PostgreSQL, API development, and deployment. I also provide consulting and code review services.",
  },
  {
    question: "What is your typical project process?",
    answer:
      "My process includes four phases: (1) Requirement Gathering - understanding your needs and goals, (2) Planning & Research - creating detailed roadmaps and architecture, (3) Development - writing clean, efficient code with regular updates, and (4) Maintenance & Support - ongoing support and optimizations.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Project timelines vary based on complexity. A simple landing page takes 1-2 weeks, a full-stack web application takes 4-8 weeks, and complex platforms may take 2-3 months. I provide detailed timelines during the planning phase.",
  },
  {
    question: "What technologies do you specialize in?",
    answer:
      "I specialize in the MERN Stack (MongoDB, Express.js, React.js, Node.js), Next.js, TypeScript, Tailwind CSS, PostgreSQL, Prisma, and modern cloud deployment. I stay updated with the latest web technologies.",
  },
  {
    question: "Do you offer ongoing maintenance?",
    answer:
      "Yes, I offer monthly maintenance packages that include bug fixes, security updates, performance optimizations, and feature enhancements. This ensures your application stays secure and up-to-date.",
  },
  {
    question: "How do we get started?",
    answer:
      "Simply reach out through the contact form or book a free consultation call. We will discuss your project requirements, timeline, and budget. I will then provide a detailed proposal and we can begin.",
  },
];

export default function FAQPage() {
  const jsonLd = createFaqSchema(faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 pb-8 sm:pb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-[2px] bg-[#f97316]" />
            <span className="text-xs sm:text-sm font-medium text-[#f97316] uppercase tracking-widest">
              Support
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground tracking-tight">
            Frequently Asked
            <br />
            Questions
          </h1>
          <p className="text-foreground/50 mt-4 max-w-lg text-lg">
            Everything you need to know about working with me.
          </p>
        </div>

        {/* FAQ List */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group rounded-2xl border border-foreground/10 bg-foreground/[0.02] overflow-hidden open:bg-foreground/[0.04] transition-colors"
              >
                <summary className="flex items-center justify-between p-5 sm:p-6 cursor-pointer list-none">
                  <h3 className="text-base sm:text-lg font-semibold text-foreground pr-4">
                    {faq.question}
                  </h3>
                  <span className="flex-shrink-0 w-8 h-8 rounded-full border border-foreground/20 flex items-center justify-center text-foreground/60 group-open:rotate-45 group-open:bg-[#f97316] group-open:border-[#f97316] group-open:text-white transition-all duration-300">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </span>
                </summary>
                <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                  <p className="text-sm sm:text-base text-foreground/70 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </details>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <p className="text-foreground/60 mb-4">
              Still have questions? Feel free to reach out.
            </p>
            <a
              href="/#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background font-medium text-sm hover:bg-foreground/90 transition-colors"
            >
              Contact Me
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 17L17 7M17 7H7M17 7v10"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
