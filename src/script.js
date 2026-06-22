gsap.registerPlugin(ScrollTrigger);

// Lock scroll initially on page load while mask intro plays
document.body.style.overflow = "hidden";
document.body.style.overflowX = "hidden";

// ==========================================================================
// SVG Mask Intro Animation
// ==========================================================================
const tlMask = gsap.timeline();

tlMask.to(".vi-mask-group", {
  rotate: 10,
  duration: 2,
  ease: "power4.inOut",
  transformOrigin: "50% 50%",
}).to(".vi-mask-group", {
  scale: 10,
  duration: 2,
  delay: -1.8,
  ease: "expo.inOut",
  transformOrigin: "50% 50%",
  opacity: 0,
  onUpdate: function () {
    if (this.progress() >= 0.9) {
      const overlay = document.querySelector("#vi-mask-overlay");
      if (overlay) overlay.remove();
      revealLandingPage();
      this.kill();
    }
  },
});

// ==========================================================================
// Parallax Landing Reveal & Interaction
// ==========================================================================
function revealLandingPage() {
  const wrapper = document.querySelector(".main-landing-wrapper");
  if (!wrapper) return;

  gsap.set(wrapper, { visibility: "visible" });

  const revealTl = gsap.timeline({
    onComplete: () => {
      // Unlock scrolling once landing page is fully revealed
      document.body.style.overflow = "visible";
      document.body.style.overflowX = "hidden";
    }
  });

  // Animate the outer tilt wrapper to scale down and straighten
  revealTl.to(wrapper, {
    scale: 1,
    rotate: 0,
    duration: 2,
    ease: "expo.inOut",
  });

  // Parallax layers catch-up animations
  revealTl.to(".sky-layer", {
    scale: 1.1,
    rotate: 0,
    duration: 2,
    ease: "expo.inOut",
  }, "<+=0.2");

  revealTl.to(".bg-layer", {
    scale: 1.1,
    rotate: 0,
    duration: 2,
    ease: "expo.inOut",
  }, "<");

  // CORRECTED: Character animation - bring bike from off-screen to bottom
  revealTl.to(".character-layer", {
    scale: 1,
    x: 0,
    y: 0,
    rotate: 0,
    duration: 2,
    ease: "expo.inOut",
  }, "<");

  revealTl.to(".gta-logo-text", {
    scale: 1,
    rotate: 0,
    duration: 2,
    ease: "expo.inOut",
  }, "<");

  // Fade in navbar and bottom bar branding details
  revealTl.fromTo([".landing-navbar", ".landing-bottom-bar"],
    { opacity: 0 },
    { opacity: 1, duration: 1.5, ease: "power2.out" },
    "<+=0.5"
  );
}

// Cursor parallax listener
const landingSection = document.querySelector(".landing-section");
if (landingSection) {
  landingSection.addEventListener("mousemove", function (e) {
    const xMove = (e.clientX / window.innerWidth - 0.5) * 40;

    gsap.to(".gta-logo-text", {
      x: `${xMove * 0.4}%`,
      duration: 0.6,
      ease: "power1.out"
    });
    gsap.to(".sky-layer", {
      x: xMove,
      duration: 0.6,
      ease: "power1.out"
    });
    gsap.to(".bg-layer", {
      x: xMove * 1.7,
      duration: 0.6,
      ease: "power1.out"
    });
  });
}

// Fade out the hero section overlay and scale the video as the user scrolls into it
gsap.fromTo(".hero-section .overlay",
  { opacity: 1 },
  {
    opacity: 0,
    duration: 1.5,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".hero-section",
      start: "top 70%", // starts fading when top of section is 70% down the viewport
      toggleActions: "play none none reverse"
    }
  }
);

// Scroll Indicator
const scrollIndicator = document.querySelector(".scroll-indicator");
const bounceTimeline = gsap.timeline({
  repeat: -1,
  yoyo: true,
});

bounceTimeline.to(scrollIndicator, {
  y: 20,
  opacity: 0.6,
  duration: 0.8,
  ease: "power1.inOut",
});

// Create a timeline for better control
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".hero-section",
    scrub: 2,
    pin: true,
    start: "top top",
    end: "+=2000",
    ease: "none",
  },
});

// Need to ensure that the scale is like this otherwise some flicks happens
tl.set(".hero-main-container", {
  scale: 1.25,
});

tl.to(".hero-main-container", {
  scale: 1,
  duration: 1,
});

tl.to(
  ".hero-main-logo",
  {
    opacity: 0,
    duration: 0.5,
  },
  "<" // starts at the same time of previous animation
);

tl.to(
  ".hero-main-video",
  {
    opacity: 0,
    duration: 0.9,
  },
  "<+=0.5"
);

tl.to(
  ".hero-main-container",
  {
    backgroundSize: "28vh",
    duration: 1.5,
  },
  "<+=0.2"
);

tl.fromTo(
  ".hero-text",
  {
    backgroundImage: `radial-gradient(
          circle at 50% 200vh,
          rgba(255, 214, 135, 0) 0,
          rgba(157, 47, 106, 0.5) 90vh,
          rgba(157, 47, 106, 0.8) 120vh,
          rgba(32, 31, 66, 0) 150vh
        )`,
  },
  {
    backgroundImage: `radial-gradient(circle at 50% 3.9575vh, rgb(255, 213, 133) 0vh,
     rgb(247, 77, 82) 50.011vh,
      rgb(145, 42, 105) 90.0183vh,
       rgba(32, 31, 66, 0) 140.599vh)`,
    duration: 3,
  },
  "<1.2" // starts 1.2 seconds before the previous animation
);

// logo purple
tl.fromTo(
  ".hero-text-logo",

  {
    opacity: 0,
    maskImage: `radial-gradient(circle at 50% 145.835%, rgb(0, 0, 0) 36.11%, rgba(0, 0, 0, 0) 68.055%)`,
  },
  {
    opacity: 1,
    maskImage: `radial-gradient(
    circle at 50% 105.594%,
    rgb(0, 0, 0) 62.9372%,
    rgba(0, 0, 0, 0) 81.4686%
  )`,
    duration: 3,
  },
  "<0.2"
);

tl.set(".hero-main-container", { opacity: 0 });

tl.to(".hero-1-container", { scale: 0.85, duration: 3 }, "<-=3");

tl.set(
  ".hero-1-container",
  {
    maskImage: `radial-gradient(circle at 50% 16.1137vh, rgb(0, 0, 0) 96.1949vh, rgba(0, 0, 0, 0) 112.065vh)`,
  },
  "<+=2.1"
);

tl.to(
  ".hero-1-container",
  {
    maskImage: `radial-gradient(circle at 50% -40vh, rgb(0, 0, 0) 0vh, rgba(0, 0, 0, 0) 80vh)`,
    duration: 2,
  },
  "<+=0.2" // Start 0.2 seconds after the mask is set
);

tl.to(
  ".hero-text-logo",
  {
    opacity: 0,
    duration: 2,
  },
  "<1.5"
);

tl.set(".hero-1-container", { opacity: 0 });
tl.set(".hero-2-container", { visibility: "visible" });

tl.to(".hero-2-container", { opacity: 1, duration: 3 }, "<+=0.2");

tl.fromTo(
  ".hero-2-container",
  {
    backgroundImage: `radial-gradient(
          circle at 50% 200vh,
          rgba(255, 214, 135, 0) 0,
          rgba(157, 47, 106, 0.5) 90vh,
          rgba(157, 47, 106, 0.8) 120vh,
          rgba(32, 31, 66, 0) 150vh
        )`,
  },
  {
    backgroundImage: `radial-gradient(circle at 50% 3.9575vh, rgb(255, 213, 133) 0vh,
     rgb(247, 77, 82) 50.011vh,
      rgb(145, 42, 105) 90.0183vh,
       rgba(32, 31, 66, 0) 140.599vh)`,
    duration: 3,
  },
  "<1.2" // starts 1.2 seconds before the previous animation
  // he times from the start of the previous animation and since we're using 1.5s for the prev duration it's like 70% of the previous animation
);

// ==========================================================================
// Stacking Gallery Animation (Leonida Chronicles)
// ==========================================================================

const cards = gsap.utils.toArray(".stack-card");

// Initialize all cards after index 0 to be transparent and scaled down slightly
cards.forEach((card, idx) => {
  if (idx > 0) {
    gsap.set(card, { opacity: 0, scale: 0.85 });
  }
});

// Configure the offscreen entry positions and rotations for each card (9 cards total)
const entryParams = [
  {}, // Card 1: already in center (video card)
  { x: "-120vw", y: "15vh", rotation: -25 }, // Card 2: from Left
  { x: "120vw", y: "-10vh", rotation: 20 },   // Card 3: from Right
  { x: "-30vw", y: "-120vh", rotation: -15 },  // Card 4: from Top
  { x: "20vw", y: "120vh", rotation: 30 },    // Card 5: from Bottom
  { x: "-120vw", y: "-120vh", rotation: -35 }, // Card 6: from Top-Left
  { x: "120vw", y: "120vh", rotation: 25 },   // Card 7: from Bottom-Right
  { x: "120vw", y: "-120vh", rotation: -20 },  // Card 8: from Top-Right
  { x: "-120vw", y: "120vh", rotation: 40 }    // Card 9: from Bottom-Left
];

// Target landing positions in the pile to create a messy realistic look
const landingParams = [
  { rotation: -2, x: 0, y: 0 },
  { rotation: 4, x: 5, y: -10 },
  { rotation: -5, x: -8, y: 5 },
  { rotation: 3, x: 10, y: -4 },
  { rotation: -3, x: -5, y: 8 },
  { rotation: 5, x: 12, y: -8 },
  { rotation: -6, x: -10, y: 12 },
  { rotation: 2, x: 6, y: -6 },
  { rotation: -4, x: -6, y: 4 }
];

const galleryTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".gallery-section",
    pin: true,
    scrub: 1,
    start: "top top",
    end: () => `+=${window.innerHeight * 4.5}`,
    ease: "none",
  }
});

// Build the cascade stack timeline
for (let i = 1; i < cards.length; i++) {
  const card = cards[i];
  const start = entryParams[i];
  const end = landingParams[i];

  // 1. Fly-in animation for card i (directional slide animation)
  galleryTl.fromTo(card,
    {
      x: start.x,
      y: start.y,
      rotation: start.rotation,
      opacity: 0,
      scale: 0.9
    },
    {
      x: end.x,
      y: end.y,
      rotation: end.rotation,
      opacity: 1,
      scale: 1,
      duration: 1.5,
      ease: "power2.out"
    }
  );

  // 2. Depth effect: scale down and darken all cards already in the pile
  for (let j = 0; j < i; j++) {
    const prevCard = cards[j];
    const depth = i - j;
    const targetScale = 1 - depth * 0.025;
    // Darken and contrast to simulate shadow/depth
    const brightness = 1 - depth * 0.07;
    const contrast = 1 + depth * 0.025;

    galleryTl.to(prevCard, {
      scale: targetScale,
      filter: `brightness(${brightness}) contrast(${contrast})`,
      duration: 1.5,
      ease: "power2.out"
    }, "<");
  }

  // Add a slight pause between card arrivals
  galleryTl.to({}, { duration: 0.5 });
}

// ==========================================================================
// Highlight Image Section Animation
// ==========================================================================
gsap.fromTo(".highlight-image-container",
  {
    y: 150,
    opacity: 0
  },
  {
    y: 0,
    opacity: 1,
    duration: 1.8,
    ease: "power3.out", // smooth deceleration ease
    scrollTrigger: {
      trigger: ".highlight-section",
      start: "top 75%", // triggers when top of section is 75% down the viewport
      toggleActions: "play none none reverse", // plays on entering, reverses on scrolling back up
    }
  }
);