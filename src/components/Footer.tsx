import { 
  FaLinkedin, 
  FaGithub
} from "react-icons/fa6";

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

              {/* Bottom Section */}
              <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-4 sm:gap-6">
                <p className="text-white/80 text-xs sm:text-sm">
                  © {new Date().getFullYear()} Moshiur Rahman | All rights reserved
                </p>

                {/* Social Icons */}
                <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                  <a
                    href="https://www.linkedin.com/in/moshiurrahmandeap"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-white/50 hover:text-white/80 transition-all duration-300 hover:scale-110 flex items-center gap-1.5 text-xs sm:text-sm"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedin className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="md:hidden">LinkedIn</span>
                  </a>
                  <a
                    href="https://github.com/moshiurrahmandeap11"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-white/50 hover:text-white/80 transition-all duration-300 hover:scale-110 flex items-center gap-1.5 text-xs sm:text-sm"
                    aria-label="GitHub"
                  >
                    <FaGithub className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="md:hidden">GitHub</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Giant Text Section — fades to bottom via Tailwind CSS mask */}
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
