"use client";

import { useEffect } from "react";

/**
 * True backdrop refraction (research phase conclusion).
 *
 * Technique: an SVG displacement map fed to feDisplacementMap via
 * backdrop-filter: url(#lg-lens). The map is two channel ramps (R bends X,
 * G bends Y) composited with `screen`, with a blurred neutral-gray
 * rounded rect in the middle — so displacement exists ONLY in the edge
 * ring and the center stays optically clear, like Apple's material.
 *
 * Browser reality (from rdev/liquid-glass-react and PallavAg's research):
 * backdrop displacement renders on Chromium only. Detection uses
 * navigator.userAgentData — present exactly where the effect works.
 * Safari/Firefox/touch keep the frosted blur+saturate material; nothing
 * is broken, they simply get the approximation tier.
 */

// Displacement map: R = horizontal ramp, G = vertical ramp (screen-blended),
// center neutralized with blurred #7f7f00 (R=G=0.5 → zero displacement).
const MAP =
  "data:image/svg+xml," +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' width='300' height='120'>" +
      "<defs>" +
      "<linearGradient id='r' x1='0' x2='1' y1='0' y2='0'>" +
      "<stop offset='0' stop-color='#000000'/><stop offset='1' stop-color='#ff0000'/>" +
      "</linearGradient>" +
      "<linearGradient id='g' x1='0' x2='0' y1='0' y2='1'>" +
      "<stop offset='0' stop-color='#000000'/><stop offset='1' stop-color='#00ff00'/>" +
      "</linearGradient>" +
      "<filter id='b'><feGaussianBlur stdDeviation='7'/></filter>" +
      "</defs>" +
      "<rect width='300' height='120' fill='url(#r)'/>" +
      "<rect width='300' height='120' fill='url(#g)' style='mix-blend-mode:screen'/>" +
      "<rect x='16' y='16' width='268' height='88' rx='44' fill='#7f7f00' filter='url(#b)'/>" +
      "</svg>"
  );

type UADataNavigator = Navigator & {
  userAgentData?: { brands?: { brand: string }[] };
};

export default function LensFilter() {
  useEffect(() => {
    const brands = (navigator as UADataNavigator).userAgentData?.brands;
    const chromium = !!brands?.some((b) => /Chromium/i.test(b.brand));
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (chromium && finePointer) {
      document.documentElement.classList.add("lens");
    }
  }, []);

  return (
    <svg aria-hidden width="0" height="0" style={{ position: "absolute" }}>
      <filter
        id="lg-lens"
        filterUnits="objectBoundingBox"
        x="0"
        y="0"
        width="1"
        height="1"
        colorInterpolationFilters="sRGB"
      >
        <feImage
          href={MAP}
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          preserveAspectRatio="none"
          result="map"
        />
        <feDisplacementMap
          in="SourceGraphic"
          in2="map"
          scale="72"
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
    </svg>
  );
}
