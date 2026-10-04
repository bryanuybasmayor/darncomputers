/**
 * Tailwind CDN configuration for Darn Computers.
 * Centralizes brand colors + font families so the palette is defined once
 * and can be swapped out cleanly when this is ported into WordPress.
 *
 * "brand-red" and "ink-black" are sampled directly from the client's
 * existing hand-drawn logo (img/darncomputers-loogo.jpg) so the site reads
 * as the same business, not a generic template re-skin.
 */
tailwind.config = {
  theme: {
    extend: {
      colors: {
        "brand-red": "#C62500",    // Sampled from the logo - primary brand / navbar / CTAs
        "ink-black": "#171412",    // Sampled from the logo's line art - headings / footer / text
        "slate-dark": "#1C1917",   // Primary body text color
        "clean-white": "#F8FAFC",  // Primary page background
        "warm-amber": "#F59E0B",   // Secondary accent - retail / yarn warmth
        "soft-gray": "#E7E2DB",    // Secondary section backgrounds / card borders (warm, not cold slate)
      },
      fontFamily: {
        // Rounded display sans for headings - friendly/modern, still sans-serif.
        heading: ["'Nunito'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
      },
    },
  },
};
