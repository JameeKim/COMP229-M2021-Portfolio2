/**
 * server/routes/index.ts
 *
 * Root-level routes setup
 *
 * Dohyun Kim 301058465
 * Jun. 4, 2021
 */

import express from "express";

const router = express.Router();
export default router;

/**
 * List of static pages that go into the navigation bar
 */
const navBarLinks = [
  {
    url: "/",
    text: "Home",
    id: "home",
  },
  {
    url: "/about",
    text: "About Us",
    id: "about",
  },
  {
    url: "/projects",
    text: "Projects",
    id: "projects",
  },
  {
    url: "/services",
    text: "Services",
    id: "services",
  },
  {
    url: "/contact",
    text: "Contact Us",
    id: "contact",
  },
];

/**
 * Projects to show in the projects page
 */
// TODO move to the database
const projects = {
  games: [
    {
      name: "Pop Bubbles",
      collaborationType: "Being developed by Nodap Life Studios",
      description: [
        "A mobile game where you pop bubbles by selecting ones that add up to 10.",
        "Currently being prototyped.",
      ],
      imgPath: "pop-bubbles.webp",
      imgAlt: "A screenshot of the game Pop Bubbles",
      links: [
        {
          name: "simmer.io",
          url: "https://simmer.io/@jameekim/pop-bubbles-prototype",
        },
      ],
    },
    {
      name: "Time Is Precious",
      collaborationType: "Participated by Dohyun Kim",
      description: [
        "A collaboration work for Centennial College assignment.",
        "2d platformer pixel game with action and puzzles.",
      ],
      imgPath: "time-is-precious.webp",
      imgAlt: "A screenshot of the game Time Is Precious",
      links: [
        {
          name: "simmer.io",
          url: "https://simmer.io/@jameekim/time-is-precious-beta",
        },
        {
          name: "GitHub repository",
          url: "https://github.com/HackDevision2020/Time-Is-Precious",
        },
      ],
    },
    {
      name: "The Outer Space: The Astronaut",
      collaborationType: "Participated by Dohyun Kim",
      description: [
        "A collaboration work for Centennial College assignment.",
        "2d top-down game with monologs, story, and puzzles.",
      ],
      imgPath: "the-outer-space-the-astronaut.png",
      imgAlt: "A screenshot of the game The Outer Space: The Astronaut",
      links: [
        {
          name: "GitHub repository",
          url: "https://github.com/JameeKim/The-Outer-Space-The-Astronaut",
        },
        {
          name: "Download for Windows",
          url: "https://github.com/JameeKim/The-Outer-Space-The-Astronaut/releases/download/v0.1.0/The.Outer.Space_.The.Astronaut.zip",
        },
      ],
    },
    {
      name: "Make the Island Float Again",
      collaborationType: "Developed by Nodap Life Studios",
      description: [
        "A game created for <a href=\"https://itch.io/jam/godot-wild-jam-15\">Godot Wild Jam #15</a>.",
        "2d platformer pixel game with dialogs, story, and puzzles.",
      ],
      imgPath: "make-the-island-float-again.png",
      imgAlt: "Thumbnail of the game Make the Island Float Again",
      links: [
        {
          name: "itch.io",
          url: "https://jameekim.itch.io/make-the-island-float-again",
        },
      ],
    },
  ]
};

/**
 * Route set-ups
 */

// home page
router.get("/", (req, res, next) => {
  res.render("index", { title: "", page: "home", navBarLinks });
});

// about page
router.get("/about", (req, res, next) => {
  res.render("index", { title: "About Us", page: "about", navBarLinks });
});

// projects page
router.get("/projects", (req, res, next) => {
  res.render("index", { title: "Projects", page: "projects", navBarLinks, projects });
});

// services page
router.get("/services", (req, res, next) => {
  res.render("index", { title: "Services", page: "services", navBarLinks });
});

// contact page
router.get("/contact", (req, res, next) => {
  res.render("index", { title: "Contact Us", page: "contact", navBarLinks });
});

// temporary response for contact page form submission
router.post("/contact", (req, res, next) => {
  res.redirect("/", 303);
});
