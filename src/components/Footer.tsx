import { FaLinkedin, FaGithub } from "react-icons/fa6";
import { SiFiverr } from "react-icons/si";
import NewsletterSignup from "./NewsletterSignup";

const socialLinks = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/moshiurrahmandeap",
    icon: FaLinkedin,
  },
  {
    name: "GitHub",
    href: "https://github.com/moshiurrahmandeap11",
    icon: FaGithub,
  },
  {
    name: "Fiverr",
    href: "https://www.fiverr.com/moshiurrahman67",
    icon: SiFiverr,
  },
];

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Blogs", href: "/blogs" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/#contact" },
];

export default function Footer() {
  return (
    <div
      className="hidden md:block relative h-100 bg-[#0a0a0a]"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="relative h-[calc(70vh+280px)] sm:h-[calc(75vh+320px)] md:h-[calc(95vh+500px)] top-[-100vh] sm:top-[-105vh] md:top-[-110vh]">
        <div className="h-70 sm:h-80 md:h-100 sticky top-[calc(70vh-250px)] sm:top-[calc(75vh-280px)] md:top-[calc(100vh-350px)]">
          <footer className="text-white/80 max-w-337.5 mx-auto flex flex-col h-70 sm:h-80 md:h-100 justify-between gap-2 overflow-hidden">
            {/* Actual Footer Content */}
            <div className="px-4 md:px-8 pt-10 sm:pt-12 md:pt-16 w-full relative z-10">
              {/* Top Section - Links & Newsletter */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 pb-8 border-b border-white/10">
                {/* Brand */}
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Moshiur Rahman</h3>
                  <p className="text-sm text-white/50 leading-relaxed mb-4">
                    Full Stack Developer specializing in MERN Stack, Next.js, and modern web technologies.
                  </p>
                  <div className="flex items-center gap-3">
                    {socialLinks.map((social) => (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="text-white/50 hover:text-white/80 transition-all duration-300 hover:scale-110"
                        aria-label={social.name}
                      >
                        <social.icon className="h-5 w-5" />
                      </a>
                    ))}
                  </div>
                </div>

                {/* Quick Links */}
                <div>
                  <h4 className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-4">
                    Quick Links
                  </h4>
                  <div className="flex flex-col gap-2">
                    {quickLinks.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        className="text-sm text-white/50 hover:text-white/80 transition-colors"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Newsletter */}
                <div>
                  <h4 className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-4">
                    Newsletter
                  </h4>
                  <p className="text-sm text-white/50 mb-3">
                    Get the latest articles and updates.
                  </p>
                  <NewsletterSignup variant="footer" />
                </div>
              </div>

              {/* Bottom Section */}
              <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-4 sm:gap-6">
                <p className="text-white/80 text-xs sm:text-sm">
                  &copy; {new Date().getFullYear()} Moshiur Rahman | All rights reserved
                </p>

                {/* Built With */}
                <div className="flex items-center gap-2 text-xs text-white/40">
                  <span>Built with</span>
                  <span className="text-white/60">Next.js</span>
                  <span>&middot;</span>
                  <span className="text-white/60">Tailwind</span>
                  <span>&middot;</span>
                  <span className="text-white/60">TypeScript</span>
                </div>
              </div>
            </div>

            {/* Giant Text Section */}
            <section className="relative overflow-hidden">
              <h1
                className="
                    text-center
                    whitespace-nowrap
                    text-[40px]
                    sm:text-[80px]
                    md:text-[130px]
                    lg:text-[180px]
                    xl:text-[220px]
                    font-black
                    tracking-tight
                    leading-none
                    select-none
                    font-display
                    text-white/80
                    mask-[linear-gradient(to_bottom,black_0%,black_20%,transparent_80%)]
                "
              >
                Moshiur
              </h1>
            </section>
          </footer>
        </div>
      </div>
    </div>
  );
}
