"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MailOpen } from "lucide-react";
import { weddingConfig } from "@/config/wedding";
import { Button } from "@/components/ui/button";
import { FloralCorner } from "@/components/ui/floral-corner";
import { OrnamentDivider } from "@/components/ui/ornament-divider";
import { FloatingParticles } from "@/components/features/floating-particles";
import { Monogram } from "@/components/opening/monogram";

type Phase = "closed" | "opening" | "done";

type EnvelopeIntroProps = {
  // Called the instant the guest taps the envelope or the button.
  // It must run inside the tap itself, because browsers only allow
  // audio to start as a direct result of a user action.
  onOpen?: () => void;
  // Called when the intro starts to fade away, so the page behind it
  // can begin its own entrance animations at the right moment.
  onOpened?: () => void;
};

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// How long the opening animation plays before the intro fades away.
const OPENING_DURATION_MS = 2800;

export function EnvelopeIntro({ onOpen, onOpened }: EnvelopeIntroProps) {
  const [phase, setPhase] = useState<Phase>("closed");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const { groom, bride, date, credit } = weddingConfig;
  const isOpening = phase === "opening";

  // Lock page scrolling while the intro is on screen.
  useEffect(() => {
    if (phase === "done") return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.scrollTo({ top: 0 });

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [phase]);

  // Clear the timer if the component disappears early.
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleOpen = () => {
    if (phase !== "closed") return;

    // Runs inside the tap itself, so the browser allows music to start.
    onOpen?.();

    // Guests who prefer less motion skip the animation entirely.
    if (prefersReducedMotion) {
      setPhase("done");
      onOpened?.();
      return;
    }

    setPhase("opening");
    timeoutRef.current = setTimeout(() => {
      setPhase("done");
      onOpened?.();
    }, OPENING_DURATION_MS);
  };

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          key="envelope-intro"
          role="dialog"
          aria-modal="true"
          aria-label="دعوة زفاف"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-burgundy-deep px-6"
          exit={{
            opacity: 0,
            transition: { duration: 0.9, ease: "easeInOut" },
          }}
        >
          {/* Atmosphere */}
          <FloatingParticles />
          <FloralCorner position="top-left" className="text-rose/50" />
          <FloralCorner position="top-right" className="text-rose/50" />
          <FloralCorner position="bottom-left" className="text-rose/50" />
          <FloralCorner position="bottom-right" className="text-rose/50" />

          {/* Line above the envelope */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: isOpening ? 0 : 1 }}
            transition={{ duration: 0.8, delay: isOpening ? 0 : 0.3 }}
            className="relative mb-12 font-text text-xl text-rose-soft"
          >
            دعوة زفاف
          </motion.p>

          {/* The envelope (clicking it also opens the invitation) */}
          <motion.div
            aria-hidden="true"
            onClick={handleOpen}
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: isOpening ? 1.05 : 1 }}
            transition={{
              duration: 1,
              ease: EASE,
              scale: { duration: 2.4, ease: "easeInOut" },
            }}
            style={{ perspective: 1200 }}
            className="relative aspect-[4/3] w-[min(86vw,22rem)] cursor-pointer"
          >
            {/* 1. Back of the envelope */}
            <div className="absolute inset-0 rounded-md bg-cream shadow-2xl shadow-black/40" />

            {/* 2. Flap: swings open, then moves behind the letter */}
            <motion.div
              initial={false}
              animate={{
                rotateX: isOpening ? 180 : 0,
                zIndex: isOpening ? 5 : 30,
              }}
              transition={{
                rotateX: { duration: 0.8, ease: "easeInOut" },
                zIndex: { delay: 0.4, duration: 0 },
              }}
              style={{
                transformOrigin: "top",
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              }}
              className="absolute inset-x-0 top-0 h-[58%] bg-rose-soft"
            />

            {/* 3. The letter: rises out of the envelope */}
            <motion.div
              initial={false}
              animate={{ y: isOpening ? "-55%" : "0%" }}
              transition={{ duration: 1, delay: 0.6, ease: EASE }}
              className="absolute inset-x-[5%] top-[6%] z-20 h-[88%]"
            >
              <div className="flex h-full flex-col items-center justify-center rounded-sm bg-ivory px-3 text-center shadow-md ring-1 ring-gold/30">
                <p className="font-text text-sm text-sage-deep">
                  بكل الحب ندعوكم
                </p>
                <p className="mt-2 font-script text-3xl leading-snug text-burgundy">
                  {groom.nameAr}{" "}
                  <span className="font-roman text-2xl text-gold">&amp;</span>{" "}
                  {bride.nameAr}
                </p>
                <p className="mt-2 font-text text-base text-ink-soft">
                  {date.dayLabel} {date.monthAr} {date.year}
                </p>
              </div>
            </motion.div>

            {/* 4. Front pocket of the envelope (covers the bottom of the letter) */}
            <div
              style={{
                clipPath: "polygon(0 0, 50% 58%, 100% 0, 100% 100%, 0 100%)",
              }}
              className="absolute inset-0 z-[25] rounded-md bg-ivory"
            />

            {/* 5. Seal with the monogram: disappears when the flap opens */}
            <div className="absolute left-1/2 top-[58%] z-[35] aspect-square w-[24%] -translate-x-1/2 -translate-y-1/2">
              <motion.div
                initial={false}
                animate={{
                  opacity: isOpening ? 0 : 1,
                  scale: isOpening ? 0.6 : 1,
                }}
                transition={{ duration: 0.35 }}
                className="flex size-full items-center justify-center rounded-full bg-burgundy p-1.5 shadow-lg ring-1 ring-gold/60"
              >
                <Monogram animated={false} tone="dark" className="w-full" />
              </motion.div>
            </div>
          </motion.div>

          {/* The accessible, real button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isOpening ? 0 : 1 }}
            transition={{ duration: 0.6, delay: isOpening ? 0 : 1 }}
            className="relative mt-12 flex flex-col items-center gap-4"
          >
            <Button
              variant="light"
              onClick={handleOpen}
              disabled={phase !== "closed"}
              icon={<MailOpen size={20} strokeWidth={1.6} />}
            >
              افتح الدعوة
            </Button>
            <p className="font-text text-base text-rose-soft/80">
              أو اضغط على المظروف
            </p>
          </motion.div>

          {/* Design credit, quietly placed at the bottom of the screen.
              It is hidden on very short screens so it never collides with
              the button, and it fades out when the envelope opens. */}
          {credit.name && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isOpening ? 0 : 1 }}
              transition={{ duration: 0.8, delay: isOpening ? 0 : 1.6 }}
              className="pointer-events-none absolute inset-x-0 bottom-[max(1.25rem,env(safe-area-inset-bottom))] z-10 px-6 text-center [@media(max-height:620px)]:hidden"
            >
              <OrnamentDivider className="mb-2 w-24 text-rose/60" />
              <p className="font-text text-sm text-rose-soft/70">
                {credit.label}
              </p>
              <p className="mt-0.5 font-text text-base text-ivory">
                <span className="font-bold">{credit.name}</span>
                {credit.relation && (
                  <span className="text-rose-soft/80">، {credit.relation}</span>
                )}
              </p>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
