"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import React, { useRef } from "react";
import Button from "@/components/ui/Button";
import { useNavigate, useLocation } from 'react-router-dom';













const VARIANT_STYLE =




{
  about: { faceText: "BlackCube", sizePx: 220, duration: 20, kicker: "ABOUT US" },
  services: { faceText: "Services", sizePx: 220, duration: 22, kicker: "OUR SERVICES" },
  portfolio: { faceText: "Portfolio", sizePx: 230, duration: 24, kicker: "PORTFOLIO" },
  career: { faceText: "Careers", sizePx: 220, duration: 21, kicker: "CAREERS" },
  contact: { faceText: "Contact", sizePx: 210, duration: 20, kicker: "CONTACT" }
};

export default function CubeHero({ title, highlightText, subtitle, primaryCta, secondaryCta, variant = "about", kicker }) {
  const prefersReducedMotion = useReducedMotion();
  const tiltRef = useRef(null);
  const style = VARIANT_STYLE[variant];
  const effectiveKicker = kicker ?? style.kicker;
  const router = useNavigate();

  const handleCubeMouseMove = (e) => {
    const target = tiltRef.current;
    if (!target) return;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateY = (x / rect.width - 0.5) * 18;
    const rotateX = -(y / rect.height - 0.5) * 18;
    target.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };
  const handleCubeMouseLeave = () => {
    const target = tiltRef.current;
    if (target) target.style.transform = "rotateX(0deg) rotateY(0deg)";
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Grid background intentionally disabled to match user's change */}
      {/* <div className="absolute inset-0 opacity-10">
         <div
           className="absolute inset-0"
           style={{
             backgroundImage:
               "repeating-linear-gradient(0deg, transparent, transparent 1px, transparent 1px, transparent 7.6923%), repeating-linear-gradient(-90deg, #fff, #fff 1px, transparent 1px, transparent 7.6923%)",
             backgroundSize: "100% 100%"
           }}
         />
        </div> */}

      <div className="relative z-10 max-w-screen-2xl mx-auto grid md:grid-cols-2 gap-16 items-center w-full px-[7.6923%]">
        <div>
          {effectiveKicker &&
          <div className="inline-flex items-center mb-6">
              <div className="w-8 h-0.5 bg-primary-blue mr-3" />
              <span className="text-primary-blue text-sm font-medium tracking-wider">{effectiveKicker}</span>
            </div>
          }
          <h1 className="text-6xl md:text-7xl font-semibold leading-tight mb-6 font-montserrat" style={{ letterSpacing: "-0.62px" }}>
            {title}
            {highlightText &&
            <span className="block bg-gradient-to-r from-primary-blue to-primary-purple bg-clip-text text-transparent">
                {highlightText}
              </span>
            }
          </h1>
          {subtitle &&
          <p className="text-xl text-white/85 leading-relaxed mb-8 max-w-2xl">
              {subtitle}
            </p>
          }
          {(primaryCta || secondaryCta) &&
          <div className="flex flex-wrap gap-4">
              {primaryCta &&
            <Button
              size="lg"
              className="group bg-gradient-to-r from-primary-blue to-primary-purple hover:from-primary-purple hover:to-primary-blue"
              href={primaryCta.href}>
              
                  {primaryCta.label}
                  <ArrowRight className="w-5 h-5" />
                </Button>
            }
              {secondaryCta &&
            <Button
              variant="outline"
              size="lg"
              className="border-primary-blue/30 text-primary-blue hover:bg-primary-blue/10"
              href={secondaryCta.href}>
              
                  {secondaryCta.label}
                </Button>
            }
            </div>
          }
        </div>

        <div className="flex items-center justify-center">
          <div className="relative [perspective:1000px]">
            <div
              ref={tiltRef}
              onMouseMove={handleCubeMouseMove}
              onMouseLeave={handleCubeMouseLeave}
              className="relative [transform-style:preserve-3d] transition-transform duration-75"
              style={{ width: style.sizePx, height: style.sizePx }}>
              
              <motion.div
                className="absolute inset-0 [transform-style:preserve-3d]"
                animate={prefersReducedMotion ? {} : { rotateX: 360, rotateY: 360, rotateZ: 360 }}
                transition={{ duration: style.duration, repeat: Infinity, ease: "linear" }}>
                
                {["front", "back", "right", "left", "top", "bottom"].map((face) => {
                  const transforms = {
                    front: `rotateY(0deg) translateZ(${style.sizePx / 2}px)`,
                    back: `rotateY(180deg) translateZ(${style.sizePx / 2}px)`,
                    right: `rotateY(90deg) translateZ(${style.sizePx / 2}px)`,
                    left: `rotateY(-90deg) translateZ(${style.sizePx / 2}px)`,
                    top: `rotateX(90deg) translateZ(${style.sizePx / 2}px)`,
                    bottom: `rotateX(-90deg) translateZ(${style.sizePx / 2}px)`
                  };
                  return (
                    <div
                      key={face}
                      className="absolute flex items-center justify-center text-sm sm:text-base lg:text-2xl font-semibold text-white"
                      style={{
                        width: style.sizePx,
                        height: style.sizePx,
                        transform: transforms[face],
                        backfaceVisibility: "visible",
                        border: "2px solid rgba(255,255,255,0.8)",
                        background: "transparent"
                      }}>
                      
                      {style.faceText}
                    </div>);

                })}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>);

}
