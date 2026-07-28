import { Stranger, Question } from '../types';

export const INITIAL_STRANGERS: Stranger[] = [
  {
    "id": "s1",
    "name": "Elena Rostova",
    "gender": "female",
    "photoUrl": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    "occupation": "UX Designer",
    "origin": "Prague, Czech Republic",
    "funFact": "Loves collecting vintage ceramic espresso cups.",
    "category": "Creatives"
  },
  {
    "id": "s2",
    "name": "Mateo Silva",
    "gender": "male",
    "photoUrl": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    "occupation": "Architect",
    "origin": "Barcelona, Spain",
    "funFact": "Has climbed 14 major peaks in the Pyrenees.",
    "category": "Professionals"
  },
  {
    "id": "s3",
    "name": "Aisha Omar",
    "gender": "female",
    "photoUrl": "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
    "occupation": "Data Scientist",
    "origin": "Cairo, Egypt",
    "funFact": "Plays classical violin in a community orchestra.",
    "category": "Tech"
  },
  {
    "id": "s4",
    "name": "Julian Vance",
    "gender": "male",
    "photoUrl": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
    "occupation": "Art Director",
    "origin": "Montreal, Canada",
    "funFact": "Bakes artisanal sourdough every Sunday morning.",
    "category": "Creatives"
  },
  {
    "id": "s5",
    "name": "Yuki Tanaka",
    "gender": "female",
    "photoUrl": "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80",
    "occupation": "Botanist",
    "origin": "Kyoto, Japan",
    "funFact": "Speaks four languages fluently.",
    "category": "Academics"
  },
  {
    "id": "s6",
    "name": "Liam O'Connor",
    "gender": "male",
    "photoUrl": "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=600&q=80",
    "occupation": "Sound Engineer",
    "origin": "Dublin, Ireland",
    "funFact": "Restores vintage analog synthesizers in his garage.",
    "category": "Creatives"
  },
  {
    "id": "s7",
    "name": "Amara Diop",
    "gender": "female",
    "photoUrl": "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=600&q=80",
    "occupation": "Fashion Photographer",
    "origin": "Dakar, Senegal",
    "funFact": "Published a photobook on West African textile arts.",
    "category": "Arts"
  },
  {
    "id": "s8",
    "name": "Lucas Weber",
    "gender": "male",
    "photoUrl": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80",
    "occupation": "Robotics Engineer",
    "origin": "Munich, Germany",
    "funFact": "Competes in amateur speed-chess tournaments.",
    "category": "Tech"
  },
  {
    "id": "s9",
    "name": "Priya Sharma",
    "gender": "female",
    "photoUrl": "https://images.unsplash.com/photo-1523824921871-d6f1a15151f1?auto=format&fit=crop&w=600&q=80",
    "occupation": "Environmental Lawyer",
    "origin": "Mumbai, India",
    "funFact": "Has paddled kayaking routes through 12 countries.",
    "category": "Professionals"
  },
  {
    "id": "s10",
    "name": "Dimitri Kostas",
    "gender": "male",
    "photoUrl": "https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&w=600&q=80",
    "occupation": "Marine Biologist",
    "origin": "Athens, Greece",
    "funFact": "Has completed over 500 deep-sea scuba dives.",
    "category": "Science"
  },
  {
    "id": "s11",
    "name": "Chloe Dubois",
    "gender": "female",
    "photoUrl": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80",
    "occupation": "Pastry Chef",
    "origin": "Lyon, France",
    "funFact": "Won a national macaron baking championship.",
    "category": "Creatives"
  },
  {
    "id": "s12",
    "name": "Gabriel Santos",
    "gender": "male",
    "photoUrl": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80",
    "occupation": "Flight Instructor",
    "origin": "Rio de Janeiro, Brazil",
    "funFact": "Has logged over 3,000 flight hours.",
    "category": "Professionals"
  },
  {
    "id": "s13",
    "name": "Soren Lindqvist",
    "gender": "male",
    "photoUrl": "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=600&q=80",
    "occupation": "Game Developer",
    "origin": "Stockholm, Sweden",
    "funFact": "Created an indie puzzle game played by millions.",
    "category": "Tech"
  },
  {
    "id": "s14",
    "name": "Mei-Ling Chen",
    "gender": "female",
    "photoUrl": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80",
    "occupation": "Calligrapher",
    "origin": "Taipei, Taiwan",
    "funFact": "Exhibits traditional ink brushwork worldwide.",
    "category": "Arts"
  },
  {
    "id": "s15",
    "name": "Marcus Sterling",
    "gender": "male",
    "photoUrl": "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80",
    "occupation": "Fintech Analyst",
    "origin": "London, UK",
    "funFact": "Runs ultra-marathons in his spare time.",
    "category": "Professionals"
  },
  {
    "id": "s16",
    "name": "Zara Al-Mansoor",
    "gender": "female",
    "photoUrl": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    "occupation": "Astrophysicist",
    "origin": "Dubai, UAE",
    "funFact": "Researches exoplanets using space telescopes.",
    "category": "Science"
  },
  {
    "id": "s17",
    "name": "Oliver Thorne",
    "gender": "male",
    "photoUrl": "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=600&q=80",
    "occupation": "Landscape Architect",
    "origin": "Melbourne, Australia",
    "funFact": "Designs urban rooftop community gardens.",
    "category": "Creatives"
  },
  {
    "id": "s18",
    "name": "Kavita Patel",
    "gender": "female",
    "photoUrl": "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=600&q=80",
    "occupation": "Pediatrician",
    "origin": "Toronto, Canada",
    "funFact": "Volunteers on medical aid trips across the Pacific.",
    "category": "Professionals"
  },
  {
    "id": "s19",
    "name": "Fatima Benali",
    "gender": "female",
    "photoUrl": "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=600&q=80",
    "occupation": "Documentary Filmmaker",
    "origin": "Casablanca, Morocco",
    "funFact": "Won a film festival award for her debut short.",
    "category": "Arts"
  },
  {
    "id": "s20",
    "name": "Sophia Rossi",
    "gender": "female",
    "photoUrl": "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=600&q=80",
    "occupation": "Sommelier",
    "origin": "Florence, Italy",
    "funFact": "Can identify wine grape varieties blindfolded.",
    "category": "Creatives"
  },
  {
    "id": "s21",
    "name": "Kenji Sato",
    "gender": "male",
    "photoUrl": "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80",
    "occupation": "Cybersecurity Specialist",
    "origin": "Tokyo, Japan",
    "funFact": "Builds mechanical keyboards as a hobby.",
    "category": "Tech"
  },
  {
    "id": "s22",
    "name": "Nadia Petrov",
    "gender": "female",
    "photoUrl": "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80",
    "occupation": "Linguist",
    "origin": "Krakow, Poland",
    "funFact": "Is documenting an endangered Baltic dialect.",
    "category": "Academics"
  },
  {
    "id": "s23",
    "name": "Carlos Mendoza",
    "gender": "male",
    "photoUrl": "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=600&q=80",
    "occupation": "Industrial Designer",
    "origin": "Mexico City, Mexico",
    "funFact": "Designs sustainable bamboo bicycles.",
    "category": "Creatives"
  },
  {
    "id": "s24",
    "name": "Sun-Hee Park",
    "gender": "female",
    "photoUrl": "https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=600&q=80",
    "occupation": "Biomedical Researcher",
    "origin": "Seoul, South Korea",
    "funFact": "Holds 3 patents for medical diagnostic tools.",
    "category": "Science"
  },
  {
    "id": "s25",
    "name": "Lior Avraham",
    "gender": "male",
    "photoUrl": "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?auto=format&fit=crop&w=600&q=80",
    "occupation": "Podcast Host",
    "origin": "Tel Aviv, Israel",
    "funFact": "Collects rare vinyl records from the 1970s.",
    "category": "Creatives"
  },
  {
    "id": "s26",
    "name": "Farhan Malik",
    "gender": "male",
    "photoUrl": "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=600&q=80",
    "occupation": "Civil Engineer",
    "origin": "Lahore, Pakistan",
    "funFact": "Designed an award-winning eco-friendly bridge.",
    "category": "Professionals"
  },
  {
    "id": "s27",
    "name": "Greta Lind",
    "gender": "female",
    "photoUrl": "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80",
    "occupation": "Neuroscientist",
    "origin": "Helsinki, Finland",
    "funFact": "Studies how sleep affects human memory formation.",
    "category": "Science"
  },
  {
    "id": "s28",
    "name": "Hector Morales",
    "gender": "male",
    "photoUrl": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=600&q=80",
    "occupation": "3D Animator",
    "origin": "Bogotá, Colombia",
    "funFact": "Created animations for blockbuster superhero films.",
    "category": "Creatives"
  },
  {
    "id": "s29",
    "name": "Ian Takahashi",
    "gender": "male",
    "photoUrl": "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=600&q=80",
    "occupation": "Industrial Designer",
    "origin": "Osaka, Japan",
    "funFact": "Won a Red Dot award for ergonomic chair design.",
    "category": "Creatives"
  },
  {
    "id": "s30",
    "name": "Jasmine Reed",
    "gender": "female",
    "photoUrl": "https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?auto=format&fit=crop&w=600&q=80",
    "occupation": "App Specialist",
    "origin": "Austin, Texas",
    "funFact": "Volunteers at a local wildlife rescue center.",
    "category": "Tech"
  },
  {
    "id": "s32",
    "name": "Hannah Abbott",
    "gender": "female",
    "photoUrl": "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
    "occupation": "Illustrator",
    "origin": "Edinburgh, Scotland",
    "funFact": "Draws children's fantasy storybooks.",
    "category": "Arts"
  },
  {
    "id": "s33",
    "name": "Noah Sterling",
    "gender": "male",
    "photoUrl": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80",
    "occupation": "Venture Capitalist",
    "origin": "San Francisco, CA",
    "funFact": "Has completed 5 Ironman triathlons.",
    "category": "Professionals"
  },
  {
    "id": "s34",
    "name": "Amina Kassam",
    "gender": "female",
    "photoUrl": "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=600&q=80",
    "occupation": "Urban Planner",
    "origin": "Nairobi, Kenya",
    "funFact": "Designed eco-friendly solar parkways.",
    "category": "Professionals"
  },
  {
    "id": "s35",
    "name": "Diego Valenzuela",
    "gender": "male",
    "photoUrl": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80",
    "occupation": "Coffee Roaster",
    "origin": "Medellín, Colombia",
    "funFact": "Judges world barista championships.",
    "category": "Creatives"
  },
  {
    "id": "s36",
    "name": "Freja Nielsen",
    "gender": "female",
    "photoUrl": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    "occupation": "Furniture Designer",
    "origin": "Copenhagen, Denmark",
    "funFact": "Uses reclaimed Nordic timber for furniture.",
    "category": "Creatives"
  },
  {
    "id": "s37",
    "name": "Tariq Al-Hassan",
    "gender": "male",
    "photoUrl": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80",
    "occupation": "Renewable Energy Tech",
    "origin": "Amman, Jordan",
    "funFact": "Built a solar-powered desert campervan.",
    "category": "Tech"
  },
  {
    "id": "s38",
    "name": "Zoe Kravitz-Vance",
    "gender": "female",
    "photoUrl": "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80",
    "occupation": "Choreographer",
    "origin": "Los Angeles, USA",
    "funFact": "Choreographed a Broadway musical tour.",
    "category": "Arts"
  },
  {
    "id": "s39",
    "name": "Viktor Markov",
    "gender": "male",
    "photoUrl": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
    "occupation": "Chess Master & Coach",
    "origin": "Sofia, Bulgaria",
    "funFact": "Can play 20 games simultaneously blindfolded.",
    "category": "Sports"
  },
  {
    "id": "s40",
    "name": "Nia Washington",
    "gender": "female",
    "photoUrl": "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=600&q=80",
    "occupation": "Journalist",
    "origin": "Atlanta, Georgia",
    "funFact": "Reported live from three Olympic Games.",
    "category": "Professionals"
  },
  {
    "id": "s41",
    "name": "Leandro Rossi",
    "gender": "male",
    "photoUrl": "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=600&q=80",
    "occupation": "Gelato Artisan",
    "origin": "Bologna, Italy",
    "funFact": "Invented a basil-honey gelato flavor.",
    "category": "Creatives"
  },
  {
    "id": "s42",
    "name": "Astrid Lindgren",
    "gender": "female",
    "photoUrl": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80",
    "occupation": "Glaciologist",
    "origin": "Oslo, Norway",
    "funFact": "Spent 6 months living in a Greenland research tent.",
    "category": "Science"
  },
  {
    "id": "s43",
    "name": "Arjun Mehta",
    "gender": "male",
    "photoUrl": "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80",
    "occupation": "AI Researcher",
    "origin": "Bengaluru, India",
    "funFact": "Trains neural networks to generate classical ragas.",
    "category": "Tech"
  },
  {
    "id": "s44",
    "name": "Camila Santos",
    "gender": "female",
    "photoUrl": "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=600&q=80",
    "occupation": "Samba Dancer",
    "origin": "Salvador, Brazil",
    "funFact": "Performs annually in Rio Carnival parades.",
    "category": "Arts"
  },
  {
    "id": "s45",
    "name": "Elias Thorne",
    "gender": "male",
    "photoUrl": "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=600&q=80",
    "occupation": "Watchmaker",
    "origin": "Geneva, Switzerland",
    "funFact": "Hand-crafts mechanical skeleton watches.",
    "category": "Creatives"
  },
  {
    "id": "s46",
    "name": "Laila Al-Mansour",
    "gender": "female",
    "photoUrl": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    "occupation": "Museum Curator",
    "origin": "Abu Dhabi, UAE",
    "funFact": "Curated a world tour of Islamic calligraphic art.",
    "category": "Arts"
  },
  {
    "id": "s47",
    "name": "Gael Moreau",
    "gender": "male",
    "photoUrl": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    "occupation": "Perfumer",
    "origin": "Grasse, France",
    "funFact": "Can identify over 1,000 scented raw ingredients.",
    "category": "Creatives"
  },
  {
    "id": "s48",
    "name": "Keiko Takahashi",
    "gender": "female",
    "photoUrl": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80",
    "occupation": "Tea Master",
    "origin": "Uji, Japan",
    "funFact": "Maintains an organic matcha tea farm.",
    "category": "Global"
  },
  {
    "id": "s49",
    "name": "Oliver Wright",
    "gender": "male",
    "photoUrl": "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80",
    "occupation": "Biotech Executive",
    "origin": "Boston, USA",
    "funFact": "Develops targeted gene therapy treatments.",
    "category": "Science"
  },
  {
    "id": "s50",
    "name": "Maya Lin",
    "gender": "female",
    "photoUrl": "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=600&q=80",
    "occupation": "Sculptor",
    "origin": "Singapore",
    "funFact": "Creates large-scale kinetic wind sculptures.",
    "category": "Arts"
  },
  {
    "id": "s51",
    "name": "Sebastian Cruz",
    "gender": "male",
    "photoUrl": "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=600&q=80",
    "occupation": "VR Developer",
    "origin": "Santiago, Chile",
    "funFact": "Built a virtual reality flight simulator.",
    "category": "Tech"
  },
  {
    "id": "s52",
    "name": "Penelope Gomez",
    "gender": "female",
    "photoUrl": "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=600&q=80",
    "occupation": "Flamenco Guitarist",
    "origin": "Seville, Spain",
    "funFact": "Composes original flamenco solos for orchestra.",
    "category": "Arts"
  },
  {
    "id": "s53",
    "name": "Dante Alighieri",
    "gender": "male",
    "photoUrl": "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=600&q=80",
    "occupation": "Philosophy Professor",
    "origin": "Florence, Italy",
    "funFact": "Has written three books on classical ethics.",
    "category": "Academics"
  },
  {
    "id": "s54",
    "name": "Aaliyah Jackson",
    "gender": "female",
    "photoUrl": "https://images.unsplash.com/photo-1523824921871-d6f1a15151f1?auto=format&fit=crop&w=600&q=80",
    "occupation": "Track Athlete",
    "origin": "Kingston, Jamaica",
    "funFact": "Gold medalist in the 4x100m relay.",
    "category": "Sports"
  },
  {
    "id": "s55",
    "name": "Klaus Webber",
    "gender": "male",
    "photoUrl": "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=600&q=80",
    "occupation": "Brewmaster",
    "origin": "Vienna, Austria",
    "funFact": "Brews unfiltered craft lagers in copper kettles.",
    "category": "Creatives"
  },
  {
    "id": "s56",
    "name": "Chloe Kovacs",
    "gender": "female",
    "photoUrl": "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80",
    "occupation": "Cellist",
    "origin": "Budapest, Hungary",
    "funFact": "Recorded cello solos for fantasy game soundtracks.",
    "category": "Arts"
  },
  {
    "id": "s57",
    "name": "Javier Fernandez",
    "gender": "male",
    "photoUrl": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=600&q=80",
    "occupation": "Wildfire Fighter",
    "origin": "Valparaíso, Chile",
    "funFact": "Leads aerial firefighting smokejumper teams.",
    "category": "Professionals"
  },
  {
    "id": "s58",
    "name": "Ingrid Hansen",
    "gender": "female",
    "photoUrl": "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80",
    "occupation": "Architect",
    "origin": "Reykjavik, Iceland",
    "funFact": "Designs geothermal passive heat houses.",
    "category": "Professionals"
  },
  {
    "id": "s59",
    "name": "Marcus Brody",
    "gender": "male",
    "photoUrl": "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=600&q=80",
    "occupation": "Archeologist",
    "origin": "Oxford, England",
    "funFact": "Discovered ancient Roman mosaic tiles in 2021.",
    "category": "Academics"
  },
  {
    "id": "s60",
    "name": "Tara Sharma",
    "gender": "female",
    "photoUrl": "https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?auto=format&fit=crop&w=600&q=80",
    "occupation": "Yoga Instructor",
    "origin": "Rishikesh, India",
    "funFact": "Leads wellness retreats worldwide.",
    "category": "Global"
  },
  {
    "id": "s61",
    "name": "Tariq Ndebele",
    "gender": "male",
    "photoUrl": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80",
    "occupation": "Solar Panel Innovator",
    "origin": "Johannesburg, South Africa",
    "funFact": "Invented flexible solar roofing tiles.",
    "category": "Tech"
  },
  {
    "id": "s62",
    "name": "Lucia Alvarez",
    "gender": "female",
    "photoUrl": "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
    "occupation": "Tango Singer",
    "origin": "Buenos Aires, Argentina",
    "funFact": "Sings live at historic San Telmo milongas.",
    "category": "Arts"
  },
  {
    "id": "s63",
    "name": "Finnian MacLeod",
    "gender": "male",
    "photoUrl": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80",
    "occupation": "Highland Games Competitor",
    "origin": "Inverness, Scotland",
    "funFact": "Can toss a 175lb wooden caber over 12 feet.",
    "category": "Sports"
  },
  {
    "id": "s64",
    "name": "Mei-Ying Jiang",
    "gender": "female",
    "photoUrl": "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=600&q=80",
    "occupation": "Silk Weaver",
    "origin": "Hangzhou, China",
    "funFact": "Preserves 800-year-old traditional silk loom techniques.",
    "category": "Arts"
  },
  {
    "id": "s65",
    "name": "Giacomo Romano",
    "gender": "male",
    "photoUrl": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80",
    "occupation": "Opera Tenor",
    "origin": "Naples, Italy",
    "funFact": "Has performed at La Scala and La Fenice.",
    "category": "Arts"
  },
  {
    "id": "s66",
    "name": "Seraphina Vance",
    "gender": "female",
    "photoUrl": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    "occupation": "Jewelry Designer",
    "origin": "Antwerp, Belgium",
    "funFact": "Crafts bespoke titanium engagement rings.",
    "category": "Creatives"
  },
  {
    "id": "s67",
    "name": "Kofi Mensah",
    "gender": "male",
    "photoUrl": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80",
    "occupation": "Cocoa Agronomist",
    "origin": "Kumasi, Ghana",
    "funFact": "Helps smallholder farmers double crop yield.",
    "category": "Science"
  },
  {
    "id": "s68",
    "name": "Elena Vasquez",
    "gender": "female",
    "photoUrl": "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80",
    "occupation": "Botanical Illustrator",
    "origin": "San José, Costa Rica",
    "funFact": "Illustrates rare orchids in cloud forests.",
    "category": "Arts"
  },
  {
    "id": "s69",
    "name": "Darius Thorne",
    "gender": "male",
    "photoUrl": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
    "occupation": "Soundtrack Composer",
    "origin": "Los Angeles, USA",
    "funFact": "Nominated for an Emmy award in 2024.",
    "category": "Creatives"
  },
  {
    "id": "s70",
    "name": "Zuri Kimani",
    "gender": "female",
    "photoUrl": "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=600&q=80",
    "occupation": "Wildlife Veterinarian",
    "origin": "Nanyuki, Kenya",
    "funFact": "Rehabilitates orphaned elephant calves.",
    "category": "Science"
  },
  {
    "id": "s71",
    "name": "Nico Bellini",
    "gender": "male",
    "photoUrl": "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=600&q=80",
    "occupation": "Barista Champion",
    "origin": "Trieste, Italy",
    "funFact": "Pours intricate dragon latte art.",
    "category": "Creatives"
  },
  {
    "id": "s72",
    "name": "Svetlana Ivanova",
    "gender": "female",
    "photoUrl": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80",
    "occupation": "Figure Skater",
    "origin": "Saint Petersburg, Russia",
    "funFact": "Can perform quad toe loop jumps cleanly.",
    "category": "Sports"
  },
  {
    "id": "s73",
    "name": "Devin Patel",
    "gender": "male",
    "photoUrl": "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80",
    "occupation": "Ethical Hacker",
    "origin": "San Jose, CA",
    "funFact": "Found security flaws in satellite systems.",
    "category": "Tech"
  },
  {
    "id": "s74",
    "name": "Fatoumata Traore",
    "gender": "female",
    "photoUrl": "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=600&q=80",
    "occupation": "Solar Entrepreneur",
    "origin": "Bamako, Mali",
    "funFact": "Brought power to 50 rural off-grid villages.",
    "category": "Tech"
  },
  {
    "id": "s75",
    "name": "Hugo Mercier",
    "gender": "male",
    "photoUrl": "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=600&q=80",
    "occupation": "Chocolatier",
    "origin": "Brussels, Belgium",
    "funFact": "Creates ruby chocolate truffles with sea salt.",
    "category": "Creatives"
  },
  {
    "id": "s76",
    "name": "Ananya Roy",
    "gender": "female",
    "photoUrl": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    "occupation": "Quantum Physicist",
    "origin": "Kolkata, India",
    "funFact": "Researches quantum computing entanglement.",
    "category": "Science"
  },
  {
    "id": "s77",
    "name": "Oren Ben-David",
    "gender": "male",
    "photoUrl": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    "occupation": "Agritech Specialist",
    "origin": "Haifa, Israel",
    "funFact": "Pioneered automated hydroponic lettuce farms.",
    "category": "Tech"
  },
  {
    "id": "s78",
    "name": "Yukiho Hayashi",
    "gender": "female",
    "photoUrl": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80",
    "occupation": "Origami Artist",
    "origin": "Hiroshima, Japan",
    "funFact": "Folded a 2-inch crane out of silver foil.",
    "category": "Arts"
  },
  {
    "id": "s79",
    "name": "Eamon O'Shea",
    "gender": "male",
    "photoUrl": "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80",
    "occupation": "Glassblower",
    "origin": "Cork, Ireland",
    "funFact": "Blows custom stained-glass chandeliers.",
    "category": "Creatives"
  },
  {
    "id": "s80",
    "name": "Kendra Sterling",
    "gender": "female",
    "photoUrl": "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=600&q=80",
    "occupation": "Podcast Producer",
    "origin": "Chicago, USA",
    "funFact": "Produced a true-crime audio series with 10M downloads.",
    "category": "Creatives"
  },
  {
    "id": "s81",
    "name": "Andres Gomez",
    "gender": "male",
    "photoUrl": "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=600&q=80",
    "occupation": "Surfer & Wave Modeler",
    "origin": "Lima, Peru",
    "funFact": "Rode a 30ft giant wave at Punta Hermosa.",
    "category": "Sports"
  },
  {
    "id": "s82",
    "name": "Valentina Santos",
    "gender": "female",
    "photoUrl": "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=600&q=80",
    "occupation": "Architectural Historian",
    "origin": "Lisbon, Portugal",
    "funFact": "Cataloged 500 historic azulejo tile murals.",
    "category": "Academics"
  },
  {
    "id": "s83",
    "name": "Kenjiro Watanabe",
    "gender": "male",
    "photoUrl": "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=600&q=80",
    "occupation": "Woodworking Craftsman",
    "origin": "Takayama, Japan",
    "funFact": "Uses zero nails or glue in traditional joint furniture.",
    "category": "Creatives"
  },
  {
    "id": "s84",
    "name": "Fatima Al-Zahra",
    "gender": "female",
    "photoUrl": "https://images.unsplash.com/photo-1523824921871-d6f1a15151f1?auto=format&fit=crop&w=600&q=80",
    "occupation": "Calligraphy Artist",
    "origin": "Muscat, Oman",
    "funFact": "Paints large metallic murals in grand mosques.",
    "category": "Arts"
  },
  {
    "id": "s85",
    "name": "Lukas Schneider",
    "gender": "male",
    "photoUrl": "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=600&q=80",
    "occupation": "Automotive Designer",
    "origin": "Stuttgart, Germany",
    "funFact": "Designed concept electric sports cars.",
    "category": "Tech"
  },
  {
    "id": "s86",
    "name": "Camilla Lind",
    "gender": "female",
    "photoUrl": "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80",
    "occupation": "Marine Biologist",
    "origin": "Bergen, Norway",
    "funFact": "Tracks humpback whale migrations in fjords.",
    "category": "Science"
  },
  {
    "id": "s87",
    "name": "Mateo Ortiz",
    "gender": "male",
    "photoUrl": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=600&q=80",
    "occupation": "Botanical Researcher",
    "origin": "Quito, Ecuador",
    "funFact": "Discovered a new species of climbing fern in 2023.",
    "category": "Science"
  },
  {
    "id": "s88",
    "name": "Asta Jansson",
    "gender": "female",
    "photoUrl": "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80",
    "occupation": "Game Narrative Lead",
    "origin": "Malmö, Sweden",
    "funFact": "Wrote over 100,000 words of dialogue for an RPG.",
    "category": "Creatives"
  },
  {
    "id": "s89",
    "name": "Damon Sterling",
    "gender": "male",
    "photoUrl": "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=600&q=80",
    "occupation": "Pilot",
    "origin": "Seattle, USA",
    "funFact": "Flew bush planes across Alaskan wilderness.",
    "category": "Professionals"
  },
  {
    "id": "s90",
    "name": "Nora Al-Fassi",
    "gender": "female",
    "photoUrl": "https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?auto=format&fit=crop&w=600&q=80",
    "occupation": "Fashion Designer",
    "origin": "Fez, Morocco",
    "funFact": "Showcased handcrafted caftans at Paris Fashion Week.",
    "category": "Arts"
  },
  {
    "id": "s91",
    "name": "Kian O'Connor",
    "gender": "male",
    "photoUrl": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
    "occupation": "Luthier (Violin Maker)",
    "origin": "Galway, Ireland",
    "funFact": "Crafts violins using 100-year-old aged spruce wood.",
    "category": "Arts"
  },
  {
    "id": "s92",
    "name": "Mirei Suzuki",
    "gender": "female",
    "photoUrl": "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
    "occupation": "Anime Animator",
    "origin": "Tokyo, Japan",
    "funFact": "Draws keyframes for top anime series.",
    "category": "Creatives"
  },
  {
    "id": "s93",
    "name": "Xavier Moreau",
    "gender": "male",
    "photoUrl": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80",
    "occupation": "Culinary Critic",
    "origin": "Bordeaux, France",
    "funFact": "Has visited over 300 Michelin-starred restaurants.",
    "category": "Professionals"
  },
  {
    "id": "s94",
    "name": "Farida Mansoor",
    "gender": "female",
    "photoUrl": "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=600&q=80",
    "occupation": "Microbiologist",
    "origin": "Tunis, Tunisia",
    "funFact": "Researches probiotic fermentation in olive oil.",
    "category": "Science"
  },
  {
    "id": "s95",
    "name": "Jonas Weber",
    "gender": "male",
    "photoUrl": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80",
    "occupation": "Ski Instructor",
    "origin": "Innsbruck, Austria",
    "funFact": "Has completed backcountry ski tours in the Alps.",
    "category": "Sports"
  },
  {
    "id": "s96",
    "name": "Elise Dupont",
    "gender": "female",
    "photoUrl": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    "occupation": "Florist",
    "origin": "Ghent, Belgium",
    "funFact": "Arranged flowers for royal wedding ceremonies.",
    "category": "Creatives"
  },
  {
    "id": "s97",
    "name": "Bartholomew Shaw",
    "gender": "male",
    "photoUrl": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80",
    "occupation": "Bookbinder",
    "origin": "Bath, England",
    "funFact": "Restores 18th-century leatherbound encyclopedias.",
    "category": "Arts"
  },
  {
    "id": "s98",
    "name": "Chiara Bellini",
    "gender": "female",
    "photoUrl": "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80",
    "occupation": "Fashion Stylist",
    "origin": "Milan, Italy",
    "funFact": "Styled red carpet looks for film stars.",
    "category": "Creatives"
  },
  {
    "id": "s99",
    "name": "Gabriel Thorne",
    "gender": "male",
    "photoUrl": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
    "occupation": "Acoustic Engineer",
    "origin": "Sydney, Australia",
    "funFact": "Designed sound damping for concert halls.",
    "category": "Tech"
  },
  {
    "id": "s100",
    "name": "Nia Patel",
    "gender": "female",
    "photoUrl": "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=600&q=80",
    "occupation": "Robotics Programmer",
    "origin": "Pittsburgh, USA",
    "funFact": "Built autonomous delivery rovers for hospitals.",
    "category": "Tech"
  },
  {
    "id": "s101",
    "name": "Massimo De Luca",
    "gender": "male",
    "photoUrl": "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=600&q=80",
    "occupation": "Olive Farmer",
    "origin": "Puglia, Italy",
    "funFact": "Manages an estate with 400-year-old olive trees.",
    "category": "Global"
  },
  {
    "id": "s102",
    "name": "Min-Ji Song",
    "gender": "female",
    "photoUrl": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80",
    "occupation": "K-Pop Choreographer",
    "origin": "Incheon, South Korea",
    "funFact": "Danced in music videos viewed over 500M times.",
    "category": "Arts"
  },
  {
    "id": "s103",
    "name": "Arthur Pendelton",
    "gender": "male",
    "photoUrl": "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80",
    "occupation": "Calligrapher",
    "origin": "Edinburgh, Scotland",
    "funFact": "Penman for official royal scrolls.",
    "category": "Arts"
  },
  {
    "id": "s104",
    "name": "Aditi Sharma",
    "gender": "female",
    "photoUrl": "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=600&q=80",
    "occupation": "Astrophysicist",
    "origin": "Pune, India",
    "funFact": "Discovered 2 new distant pulsars.",
    "category": "Science"
  },
  {
    "id": "s105",
    "name": "Liam Vance",
    "gender": "male",
    "photoUrl": "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=600&q=80",
    "occupation": "Deep Sea Photographer",
    "origin": "Vancouver, Canada",
    "funFact": "Photographed bioluminescent jellyfish at 2000m depth.",
    "category": "Arts"
  },
  {
    "id": "s106",
    "name": "Evelyn Wright",
    "gender": "female",
    "photoUrl": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    "occupation": "Bioethicist",
    "origin": "Cambridge, UK",
    "funFact": "Advises WHO committees on gene editing ethics.",
    "category": "Academics"
  },
  {
    "id": "s107",
    "name": "Tomasz Kowalski",
    "gender": "male",
    "photoUrl": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    "occupation": "Kayaker & Adventurer",
    "origin": "Gdansk, Poland",
    "funFact": "Kayaked non-stop across the Baltic Sea.",
    "category": "Sports"
  },
  {
    "id": "s108",
    "name": "Hana Tanaka",
    "gender": "female",
    "photoUrl": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80",
    "occupation": "Bonsai Master",
    "origin": "Saitama, Japan",
    "funFact": "Nurtures a 120-year-old juniper bonsai tree.",
    "category": "Arts"
  },
  {
    "id": "s109",
    "name": "Dominic Sterling",
    "gender": "male",
    "photoUrl": "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80",
    "occupation": "Cryptographer",
    "origin": "Zürich, Switzerland",
    "funFact": "Co-authored a zero-knowledge proof paper.",
    "category": "Tech"
  },
  {
    "id": "s110",
    "name": "Amina Osei",
    "gender": "female",
    "photoUrl": "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=600&q=80",
    "occupation": "Architect",
    "origin": "Accra, Ghana",
    "funFact": "Pioneered rammed-earth sustainable university buildings.",
    "category": "Professionals"
  },
  {
    "id": "s111",
    "name": "Gavin Ross",
    "gender": "male",
    "photoUrl": "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=600&q=80",
    "occupation": "Sound Designer",
    "origin": "Manchester, UK",
    "funFact": "Created alien creature noises for sci-fi movies.",
    "category": "Creatives"
  },
  {
    "id": "s112",
    "name": "Isabella Cruz",
    "gender": "female",
    "photoUrl": "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=600&q=80",
    "occupation": "Pastry Chef",
    "origin": "Valencia, Spain",
    "funFact": "Specializes in citrus-infused almond marzipan.",
    "category": "Creatives"
  },
  {
    "id": "s113",
    "name": "Hiroshi Sato",
    "gender": "male",
    "photoUrl": "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=600&q=80",
    "occupation": "Calligrapher & Ink Artist",
    "origin": "Nara, Japan",
    "funFact": "Paints gigantic kanji on canvas using giant brushes.",
    "category": "Arts"
  },
  {
    "id": "s114",
    "name": "Safiya Al-Husseini",
    "gender": "female",
    "photoUrl": "https://images.unsplash.com/photo-1523824921871-d6f1a15151f1?auto=format&fit=crop&w=600&q=80",
    "occupation": "Geophysicist",
    "origin": "Doha, Qatar",
    "funFact": "Maps seismic activity across desert fault lines.",
    "category": "Science"
  },
  {
    "id": "s115",
    "name": "Mateo Castillo",
    "gender": "male",
    "photoUrl": "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=600&q=80",
    "occupation": "Street Artist",
    "origin": "Guadalajara, Mexico",
    "funFact": "Painted 3D optical illusion murals worldwide.",
    "category": "Arts"
  },
  {
    "id": "s116",
    "name": "Astrid Vestergaard",
    "gender": "female",
    "photoUrl": "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80",
    "occupation": "Wind Turbine Engineer",
    "origin": "Aarhus, Denmark",
    "funFact": "Services offshore wind turbines at 150 meters high.",
    "category": "Tech"
  },
  {
    "id": "s117",
    "name": "Xavier Sterling",
    "gender": "male",
    "photoUrl": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=600&q=80",
    "occupation": "Jazz Saxophonist",
    "origin": "New Orleans, USA",
    "funFact": "Plays soprano sax at historic French Quarter clubs.",
    "category": "Arts"
  },
  {
    "id": "s118",
    "name": "Evelyn Brooks",
    "gender": "female",
    "photoUrl": "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80",
    "occupation": "Botanist",
    "origin": "Auckland, New Zealand",
    "funFact": "Studies native silver fern growth cycles.",
    "category": "Science"
  },
  {
    "id": "s119",
    "name": "Lukas Meyer",
    "gender": "male",
    "photoUrl": "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=600&q=80",
    "occupation": "Alpine Rescue Lead",
    "origin": "Zermatt, Switzerland",
    "funFact": "Has rescued over 80 stranded climbers on Matterhorn.",
    "category": "Sports"
  },
  {
    "id": "s120",
    "name": "Zara Patel",
    "gender": "female",
    "photoUrl": "https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?auto=format&fit=crop&w=600&q=80",
    "occupation": "App Developer",
    "origin": "London, UK",
    "funFact": "Created an award-winning plant identification app.",
    "category": "Tech"
  },
  {
    "id": "s121",
    "name": "Sean O'Malley",
    "gender": "male",
    "photoUrl": "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80",
    "occupation": "Bodhrán Player",
    "origin": "Belfast, Northern Ireland",
    "funFact": "Tours with traditional Irish folk ensembles.",
    "category": "Arts"
  },
  {
    "id": "s122",
    "name": "Yuki Takahashi",
    "gender": "female",
    "photoUrl": "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
    "occupation": "Robotics Designer",
    "origin": "Nagoya, Japan",
    "funFact": "Designs friendly assistant robots for elderly care.",
    "category": "Tech"
  },
  {
    "id": "s123",
    "name": "Julian Ross",
    "gender": "male",
    "photoUrl": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80",
    "occupation": "Horticulturist",
    "origin": "Portland, Oregon",
    "funFact": "Cultivates 200 varieties of heirloom berries.",
    "category": "Science"
  },
  {
    "id": "s124",
    "name": "Amara Diallo",
    "gender": "female",
    "photoUrl": "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=600&q=80",
    "occupation": "Diplomat",
    "origin": "Conakry, Guinea",
    "funFact": "Speaks French, Fulani, English, and Arabic.",
    "category": "Global"
  },
  {
    "id": "s125",
    "name": "Oliver Vance",
    "gender": "male",
    "photoUrl": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80",
    "occupation": "Cinematographer",
    "origin": "Denver, Colorado",
    "funFact": "Shot nature documentaries in the Rocky Mountains.",
    "category": "Creatives"
  },
  {
    "id": "s126",
    "name": "Chloe Laurent",
    "gender": "female",
    "photoUrl": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    "occupation": "Fashion Editor",
    "origin": "Paris, France",
    "funFact": "Attends high-fashion shows in 6 world capitals.",
    "category": "Creatives"
  },
  {
    "id": "s127",
    "name": "Tariq Al-Mansoor",
    "gender": "male",
    "photoUrl": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80",
    "occupation": "Cybersecurity Analyst",
    "origin": "Riyadh, Saudi Arabia",
    "funFact": "Competes in international capture-the-flag hackathons.",
    "category": "Tech"
  },
  {
    "id": "s128",
    "name": "Sofia Fernandez",
    "gender": "female",
    "photoUrl": "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80",
    "occupation": "Marine Archeologist",
    "origin": "Cartagena, Colombia",
    "funFact": "Excavated 17th-century Spanish shipwreck cannons.",
    "category": "Academics"
  },
  {
    "id": "s129",
    "name": "Liam Sterling",
    "gender": "male",
    "photoUrl": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
    "occupation": "Urban Beekeeper",
    "origin": "Brooklyn, New York",
    "funFact": "Maintains 25 rooftop beehives across NYC.",
    "category": "Global"
  },
  {
    "id": "s130",
    "name": "Kavita Roy",
    "gender": "female",
    "photoUrl": "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=600&q=80",
    "occupation": "Ethnomusicologist",
    "origin": "Delhi, India",
    "funFact": "Recorded traditional folk songs across 15 states.",
    "category": "Academics"
  }
];

export const MALE_DISTRACTOR_NAMES = [
  "Benjamin Hayes",
  "Alexander Vance",
  "Gabriel Nowak",
  "Sebastian Cruz",
  "Ethan Wallace",
  "Jackson Avery",
  "Oliver Sinclair",
  "Henry Sterling",
  "Daniel Moreno",
  "Lucas Gallagher",
  "Jameson Reed",
  "Benjamin Brooks",
  "William Hayes",
  "Michael Chang",
  "Alexander Ross",
  "Samuel Quinn",
  "Joseph Mercer",
  "David Nakamura",
  "Johnathan Drake",
  "Matthew Carpenter",
  "Christopher Cole",
  "Andrew Bishop",
  "Joshua Frank",
  "Ryan O'Neill",
  "Nathaniel Shaw",
  "Christian Beck",
  "Nicholas Miller",
  "Thomas Vance",
  "Mason Wright",
  "Ethan Bennett",
  "Lucas Scott",
  "Arthur Pendelton",
  "Noah Sterling",
  "Diego Valenzuela",
  "Tariq Al-Hassan",
  "Viktor Markov",
  "Leandro Rossi",
  "Arjun Mehta",
  "Elias Thorne",
  "Gael Moreau",
  "Oliver Wright",
  "Klaus Webber",
  "Finnian MacLeod",
  "Giacomo Romano",
  "Darius Thorne",
  "Nico Bellini",
  "Devin Patel",
  "Hugo Mercier",
  "Oren Ben-David",
  "Eamon O'Shea",
  "Andres Gomez",
  "Kenjiro Watanabe",
  "Lukas Schneider",
  "Damon Sterling",
  "Xavier Moreau",
  "Jonas Weber",
  "Bartholomew Shaw",
  "Gabriel Thorne",
  "Massimo De Luca",
  "Tomasz Kowalski",
  "Dominic Sterling",
  "Gavin Ross",
  "Hiroshi Sato"
];

export const FEMALE_DISTRACTOR_NAMES = [
  "Sophia Martinez",
  "Isabella Santos",
  "Mia Takahashi",
  "Olivia Kovacs",
  "Ava Jenkins",
  "Charlotte Thorne",
  "Amelia Foster",
  "Harper Bennett",
  "Evelyn Wright",
  "Abigail Larson",
  "Emily Zhao",
  "Elizabeth Park",
  "Camila Gutierrez",
  "Sofia Petrov",
  "Aria Montgomery",
  "Victoria Morales",
  "Grace Sullivan",
  "Chloe Fischer",
  "Penelope Gomez",
  "Layla Al-Fassi",
  "Nora Lindqvist",
  "Hazel Tanaka",
  "Zoey Castillo",
  "Stella Wagner",
  "Aurora Davies",
  "Savannah Patel",
  "Hannah Abbott",
  "Clara Hughes",
  "Audrey Cooper",
  "Violet Hayes",
  "Nora Ellis",
  "Maya Lin",
  "Amina Kassam",
  "Freja Nielsen",
  "Zoe Kravitz-Vance",
  "Nia Washington",
  "Astrid Lindgren",
  "Camila Santos",
  "Laila Al-Mansour",
  "Keiko Takahashi",
  "Aaliyah Jackson",
  "Chloe Kovacs",
  "Ingrid Hansen",
  "Tara Sharma",
  "Lucia Alvarez",
  "Mei-Ying Jiang",
  "Seraphina Vance",
  "Elena Vasquez",
  "Zuri Kimani",
  "Svetlana Ivanova",
  "Fatoumata Traore",
  "Ananya Roy",
  "Yukiho Hayashi",
  "Kendra Sterling",
  "Valentina Santos",
  "Fatima Al-Zahra",
  "Camilla Lind",
  "Asta Jansson",
  "Nora Al-Fassi",
  "Mirei Suzuki",
  "Farida Mansoor",
  "Elise Dupont",
  "Chiara Bellini",
  "Min-Ji Song",
  "Aditi Sharma",
  "Hana Tanaka",
  "Amina Osei",
  "Safiya Al-Husseini"
];

export const DISTRACTOR_NAMES = [...MALE_DISTRACTOR_NAMES, ...FEMALE_DISTRACTOR_NAMES];

/**
 * Generates a set of questions ensuring:
 * 1. NO repeating faces / strangers in the round.
 * 2. NO repeating names in the 4 multiple choice options per question.
 * 3. Options match the gender of the stranger (male names for males, female names for females).
 */
export function generateQuestions(
  strangerPool: Stranger[],
  count: number = 10
): Question[] {
  // Deduplicate stranger pool by ID and photoUrl to prevent any duplicate faces
  const uniqueStrangersMap = new Map<string, Stranger>();
  for (const s of strangerPool) {
    if (!uniqueStrangersMap.has(s.id) && !Array.from(uniqueStrangersMap.values()).some(existing => existing.photoUrl === s.photoUrl)) {
      uniqueStrangersMap.set(s.id, s);
    }
  }
  const cleanPool = Array.from(uniqueStrangersMap.values());

  // Shuffle array of clean strangers
  const shuffled = [...cleanPool].sort(() => Math.random() - 0.5);
  // Pick up to count unique strangers - NO repeats in faces!
  const selectedStrangers = shuffled.slice(0, Math.min(count, shuffled.length));

  // Collect male names and female names across stranger pool and distractors
  const malePoolNames = cleanPool
    .filter((s) => s.gender === 'male')
    .map((s) => s.name);
  const femalePoolNames = cleanPool
    .filter((s) => s.gender === 'female')
    .map((s) => s.name);

  const allMaleNames = Array.from(new Set([...malePoolNames, ...MALE_DISTRACTOR_NAMES]));
  const allFemaleNames = Array.from(new Set([...femalePoolNames, ...FEMALE_DISTRACTOR_NAMES]));

  return selectedStrangers.map((stranger) => {
    const correctAnswer = stranger.name;
    const isFemale =
      stranger.gender === 'female' ||
      FEMALE_DISTRACTOR_NAMES.includes(stranger.name) ||
      femalePoolNames.includes(stranger.name);

    const candidatePool = isFemale ? allFemaleNames : allMaleNames;

    // Filter available distractor names so none equal the correct answer
    const distractorCandidates = candidatePool.filter(
      (name) => name !== correctAnswer
    );

    // Shuffle distractor candidates
    const shuffledDistractors = [...distractorCandidates].sort(
      () => Math.random() - 0.5
    );

    // Pick 3 unique distractor names
    const selectedDistractors: string[] = [];
    for (const name of shuffledDistractors) {
      if (selectedDistractors.length >= 3) break;
      if (!selectedDistractors.includes(name)) {
        selectedDistractors.push(name);
      }
    }

    // Combine correct answer + 3 distractors (4 completely distinct names matching gender)
    const options = [correctAnswer, ...selectedDistractors].sort(
      () => Math.random() - 0.5
    );

    return {
      stranger,
      options,
      correctAnswer,
    };
  });
}
