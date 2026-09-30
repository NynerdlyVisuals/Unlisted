const characters = [
  {
    id: 1,
    name: "Hiro",
    image: "../src/assets/characters/Hiro.png",

    profile:
      "Hiro doesn’t stay in one place for long. Restless and fiercely independent, he tends to act before anyone has the chance to stop him.\n\n Since appearing in the archive, he has repeatedly crossed restricted sectors without triggering standard security protocols. How he moves through them remains unknown.",

    sector: "007",
    activity: "HIGH",
    affiliation: "UNKNOWN",
    level: "MODERATE",

    traits: {
      calm: 40,
      instinct: 90,
      rebellious: 80,
      trust: 50,
    },

    title: "The wayfarer",


  },

  {
    id: 2,
    name: "Yoko",
    image: "../src/assets/characters/Yoko.png",

    profile:
      "Yoko rarely speaks unless she has something worth saying. She watches first, acts second, and trusts almost no one.\n\nSince appearing in the archive, she has shown an unusual interest in restricted areas of the system. Whether she’s searching for something — or hiding something — remains unknown.",

    sector: "004",
    activity: "IRREGULAR",
    affiliation: "UNKNOWN",
    level: "UNDETERMINED",

    traits: {
      calm: 80,
      curious: 70,
      rebellious: 90,
      trust: 30,
    },
    title: "The observer",
  },

  {
    id: 3,
    name: "Akira",
    image: "../src/assets/characters/Akira.png",

    profile:
      "Akira reveals little and leaves even less behind. He avoids predictable patterns, changes direction without warning, and rarely appears twice in the same sector. Since entering the archive, several records have disappeared shortly after his presence was detected. Whether he removed them — or someone else did — remains unknown.",

    sector: "009",
    activity: "ERRATIC",
    affiliation: "UNKNOWN",
    level: "ELEVATED",

    traits: {
      stealth: 90,
      instinct: 80,
      rebellious: 70,
      trust: 20,
    },
    title: "The unseen",
  },
];

export default characters;
