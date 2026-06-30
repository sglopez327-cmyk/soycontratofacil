"use client";

import { useEffect, useRef, useState } from "react";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import { motion } from "framer-motion";

export function HeroLottie() {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [animationData, setAnimationData] = useState<object | null>(null);

  useEffect(() => {
    fetch("/lottie/document-signing.json")
      .then((res) => res.json())
      .then(setAnimationData)
      .catch(() => setAnimationData(null));
  }, []);

  useEffect(() => {
    if (animationData && lottieRef.current) {
      lottieRef.current.setSpeed(0.45);
    }
  }, [animationData]);

  return (
    <motion.div
      className="pointer-events-none relative hidden lg:flex lg:items-start lg:justify-end lg:pt-2"
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
      aria-hidden
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.12),transparent_70%)] blur-2xl" />
      {animationData ? (
        <Lottie
          lottieRef={lottieRef}
          animationData={animationData}
          loop
          className="relative h-[min(420px,38vw)] w-[min(420px,38vw)] opacity-[0.38]"
        />
      ) : (
        <div className="h-[min(420px,38vw)] w-[min(420px,38vw)]" />
      )}
    </motion.div>
  );
}
