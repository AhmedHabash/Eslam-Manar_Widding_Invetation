"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";

type ScrollHintProps = {
  // true once the envelope has been opened and the invitation is on screen
  visible: boolean;
};

// How far (in px) the guest must scroll before the hint disappears for good.
const HIDE_AFTER_PX = 60;

// A small floating pill that tells the guest there is more to see below.
// It appears shortly after the envelope opens, and disappears as soon as
// the guest starts scrolling.
export function ScrollHint({ visible }: ScrollHintProps) {
  const [hasScrolled, setHasScrolled] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!visible || hasScrolled) return;

    const handleScroll = () => {
      if (window.scrollY > HIDE_AFTER_PX) setHasScrolled(true);
    };

    // "passive" tells the browser this listener never blocks scrolling.
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [visible, hasScrolled]);

  const show = visible && !hasScrolled;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="scroll-hint"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8, transition: { duration: 0.3 } }}
          // The delay lets the hero finish its entrance before the hint shows.
          transition={{ duration: 0.8, delay: 2, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none fixed inset-x-0 bottom-[max(1.25rem,env(safe-area-inset-bottom))] z-30 flex justify-center"
        >
          <a
            href="#countdown"
            aria-label="انتقل إلى بقية الدعوة"
            className="pointer-events-auto flex items-center gap-2.5 rounded-full border border-gold/40 bg-ivory/95 px-5 py-2.5 font-text text-base text-burgundy shadow-md transition-colors hover:bg-rose-soft"
          >
            <span>اسحب لأسفل</span>

            {/* Two chevrons that light up one after the other, softly */}
            <span aria-hidden="true" className="flex flex-col -space-y-2.5">
              {[0, 1].map((index) => (
                <motion.span
                  key={index}
                  className="block"
                  animate={
                    prefersReducedMotion
                      ? { opacity: 1 }
                      : { opacity: [0.25, 1, 0.25] }
                  }
                  transition={
                    prefersReducedMotion
                      ? undefined
                      : {
                          duration: 1.8,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: index * 0.3,
                        }
                  }
                >
                  <ChevronDown size={18} strokeWidth={1.8} />
                </motion.span>
              ))}
            </span>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
