export interface Artwork {
  id: string;
  title: string;
  category: string;
  medium: string;
  year: string;
  dimensions: string;
  imageUrl: string;
  audioUrl: string;
  audioTitle: string;
  audioDuration: string;
  price: number;
  isFeatured: boolean;
  description: string;
}

export interface ArtistProfile {
  name: string;
  role: string;
  brand: string;
  organization: string;
  portraitUrl: string;
  portraitCutoutUrl: string;
  bio: string;
  vision: string;
  email: string;
  telegramUser: string;
  telegramGroup: string;
  facebookUrl: string;
  githubUrl: string;
  discordUrl: string;
  quote: {
    text: string;
    author: string;
  };
  stats: Array<{
    value: string;
    label: string;
  }>;
  socialLinks: {
    telegramGroup: string;
    telegramChannel: string;
    telegramUsername: string;
    facebook: string;
    github: string;
    discord: string;
  };
  telegramBots: Array<{
    name: string;
    url: string;
    description: string;
    desc: string;
    type: 'online' | 'offline';
  }>;
  bots: Array<{
    name: string;
    url: string;
    description: string;
    desc: string;
    type: 'online' | 'offline';
  }>;
  webProjects: Array<{
    name: string;
    url: string;
    description: string;
    desc: string;
  }>;
  mobileApps: Array<{
    name: string;
    url: string;
    description: string;
    desc: string;
  }>;
  apps: Array<{
    name: string;
    url: string;
    description: string;
    desc: string;
  }>;
}

const botList: Array<{ name: string; url: string; description: string; desc: string; type: 'online' | 'offline' }> = [
  { name: "Ariferex Bot", url: "https://t.me/Ariferex_bot", description: "Group & Channel management, welcome messages & photo generator", desc: "Group & Channel management, welcome messages & photo generator", type: "online" },
  { name: "Group Chowkidar Bot", url: "https://t.me/GroupChowkidarBot", description: "Channel guard & part-time automated sender", desc: "Channel guard & part-time automated sender", type: "online" },
  { name: "Link Destroyer Bot", url: "https://t.me/LinkDestroyerBot", description: "Security manager and malicious link protection", desc: "Security manager and malicious link protection", type: "online" },
  { name: "TeraVideo Downloader", url: "https://t.me/TeraVideoDWBot", description: "Ultra-fast Terabox video downloader", desc: "Ultra-fast Terabox video downloader", type: "online" },
  { name: "My Data Store Bot", url: "https://t.me/my_data_store_bot", description: "Unlimited secure cloud data storage bot", desc: "Unlimited secure cloud data storage bot", type: "online" },
  { name: "Arifur Hackworld Bot", url: "https://t.me/ArifurHackworld_bot", description: "Official ecosystem gateway bot", desc: "Official ecosystem gateway bot", type: "offline" },
  { name: "Codex Arif Bot", url: "https://t.me/codex_arif_Bot", description: "Automated agent checker & verification", desc: "Automated agent checker & verification", type: "offline" },
  { name: "Hashtag Master Pro", url: "https://t.me/HashtagMasterPro_Bot", description: "Ultimate tag generator & daily workflow automation", desc: "Ultimate tag generator & daily workflow automation", type: "offline" },
  { name: "MicroEarn BD Bot", url: "https://t.me/MicroEarnBDBot", description: "Micro-task and digital rewards platform", desc: "Micro-task and digital rewards platform", type: "offline" },
  { name: "Arifur AI Bot", url: "https://t.me/ArifurAI_Bot", description: "Personal AI conversational assistant", desc: "Personal AI conversational assistant", type: "offline" },
  { name: "Mail Task Cash Bot", url: "https://t.me/MailTaskCashBot", description: "Direct email code receiver without login", desc: "Direct email code receiver without login", type: "offline" },
  { name: "AutoPost Arifur Bot", url: "https://t.me/AutoPost_ArifurBot", description: "Automated message & photo scheduler for channels", desc: "Automated message & photo scheduler for channels", type: "offline" },
];

const appList: Array<{ name: string; url: string; description: string; desc: string }> = [
  { name: "AmarTube", url: "https://t.me/HackworldVaultBot?start=97008bea", description: "Ultimate Media Player & High-Speed Downloader", desc: "Ultimate Media Player & High-Speed Downloader" },
  { name: "SnapStream", url: "https://t.me/HackworldVaultBot?start=01ae1feb", description: "Next-gen Video Downloader & Media Suite", desc: "Next-gen Video Downloader & Media Suite" },
  { name: "Code Editor Pro", url: "https://t.me/ArifurHackworld/2001", description: "Mobile IDE with syntax highlighting and compiler", desc: "Mobile IDE with syntax highlighting and compiler" },
  { name: "Mayaboti AI", url: "https://t.me/HackworldVaultBot?start=9b316375", description: "All-in-one AI image, voice, video & code generator", desc: "All-in-one AI image, voice, video & code generator" },
  { name: "Prank Hub", url: "https://t.me/HackworldVaultBot?start=9612c140", description: "Creative screen generator & entertainment utility", desc: "Creative screen generator & entertainment utility" },
  { name: "TV Free APK", url: "https://t.me/HackworldVaultBot?start=127f0554", description: "100+ Live TV Channels without dish connection", desc: "100+ Live TV Channels without dish connection" },
  { name: "Toolbox Pro", url: "https://t.me/ArifurHackworld/587", description: "All-in-One Generator and digital Swiss Army knife", desc: "All-in-One Generator and digital Swiss Army knife" },
];

export const artistProfile: ArtistProfile = {
  name: "Arifur Jaman",
  role: "Founder & Creative Technologist",
  brand: "ARIFUR",
  organization: "Arifur Hackworld",
  portraitUrl: "/images/owner.jpg",
  portraitCutoutUrl: "/images/owner_nobg.png",
  bio: "Founder of Arifur Hackworld. Visionary software architect, autonomous bot developer, and contemporary visual artist based in Bangladesh. Pioneering seamless digital experiences across web, telegram automation, and cutting-edge multimedia platforms.",
  vision: "Transforming the boundary between technology and art into a living, responsive ecosystem. Every code commit and canvas stroke is built to empower users with speed, intelligence, and refined luxury aesthetics.",
  email: "contact@arifurhackworld.com",
  telegramUser: "arifur905",
  telegramGroup: "https://t.me/ArifurHackworld",
  facebookUrl: "https://www.facebook.com/fary.pol",
  githubUrl: "https://github.com/biplobc384-dotcom/biplobc384-dotcom",
  discordUrl: "https://discord.gg/jqFHknCmN",
  quote: {
    text: "Art without engineering lacks structure; engineering without art lacks soul.",
    author: "Arifur Jaman"
  },
  stats: [
    { value: "68+", label: "Artworks" },
    { value: "12+", label: "Telegram Bots" },
    { value: "8+", label: "Web Platforms" },
    { value: "7+", label: "Mobile Apps" }
  ],
  socialLinks: {
    telegramGroup: "https://t.me/ArifurHackworld",
    telegramChannel: "https://t.me/ArifurHack",
    telegramUsername: "https://t.me/arifur905",
    facebook: "https://www.facebook.com/fary.pol",
    github: "https://github.com/biplobc384-dotcom/biplobc384-dotcom",
    discord: "https://discord.gg/jqFHknCmN",
  },
  telegramBots: botList,
  bots: botList,
  webProjects: [
    { name: "DevStore", url: "https://devonlinestore.ct.ws", description: "Online developer store for code templates, scripts & tool rental", desc: "Online developer store for code templates, scripts & tool rental" },
    { name: "Fast Video Downloader", url: "https://8yews9.bot-keep.xyz/", description: "High-speed video downloader engine", desc: "High-speed video downloader engine" },
    { name: "Arifur Live TV", url: "https://arifurtv.vercel.app", description: "Cloud live TV streaming directly in browser", desc: "Cloud live TV streaming directly in browser" },
    { name: "Crypto & Dollar Exchange", url: "https://arifur.alwaysdata.net/", description: "Risk-free peer-to-peer dollar and crypto gateway", desc: "Risk-free peer-to-peer dollar and crypto gateway" },
    { name: "Voice Generator", url: "https://voicgenaretor.netlify.app", description: "Browser-based neural voice and speech synthesizer", desc: "Browser-based neural voice and speech synthesizer" },
    { name: "Base64 Pro Converter", url: "https://base64pro.netlify.app/", description: "Professional binary and image to base64 tool", desc: "Professional binary and image to base64 tool" },
    { name: "Portfolio & Finance Tool", url: "https://arifurfakescrinshot.netlify.app/", description: "Binance & Mobile wallet balance portfolio utility", desc: "Binance & Mobile wallet balance portfolio utility" },
    { name: "Global Free Call", url: "https://any-user-for-free.web.app/", description: "No-login global calling utility platform", desc: "No-login global calling utility platform" },
  ],
  mobileApps: appList,
  apps: appList,
};

export const initialArtworks: Artwork[] = [
  {
    "id": "1",
    "title": "Master Portrait \u2014 Arifur",
    "category": "Portrait",
    "medium": "Digital Fine Art & Photography",
    "year": "2025",
    "dimensions": "3000 x 4000 px",
    "imageUrl": "/images/gallery/art_01.webp",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    "audioTitle": "Vision Statement: The Journey of Arifur",
    "audioDuration": "3:45",
    "price": 2800,
    "isFeatured": true,
    "description": "The signature master portrait of Arifur Jaman. A fusion of visionary digital aesthetics, executive poise, and contemporary presence."
  },
  {
    "id": "2",
    "title": "Cybernetic Horizon",
    "category": "Creative",
    "medium": "Computational Aesthetics & Canvas",
    "year": "2025",
    "dimensions": "3000 x 4000 px",
    "imageUrl": "/images/gallery/art_02.webp",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    "audioTitle": "Commentary: Technology as Modern Canvas",
    "audioDuration": "2:50",
    "price": 2970,
    "isFeatured": true,
    "description": "Visual composition by Arifur Jaman. Exploring modern digital texture, expressive form, and technical balance in 2025."
  },
  {
    "id": "3",
    "title": "Urban Silhouette & Reflections",
    "category": "Tech & Art",
    "medium": "Cinematic Visual Composition",
    "year": "2025",
    "dimensions": "3000 x 4000 px",
    "imageUrl": "/images/gallery/art_03.webp",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    "audioTitle": "Sonic Journey: Metropolitan Reflections",
    "audioDuration": "4:12",
    "price": 3140,
    "isFeatured": true,
    "description": "Visual composition by Arifur Jaman. Exploring modern digital texture, expressive form, and technical balance in 2025."
  },
  {
    "id": "4",
    "title": "Digital Genesis",
    "category": "Visual",
    "medium": "Mixed Photographic Media",
    "year": "2025",
    "dimensions": "3000 x 4000 px",
    "imageUrl": "/images/gallery/art_04.webp",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    "audioTitle": "Artist Note: The Birth of a Platform",
    "audioDuration": "3:15",
    "price": 3310,
    "isFeatured": true,
    "description": "Visual composition by Arifur Jaman. Exploring modern digital texture, expressive form, and technical balance in 2025."
  },
  {
    "id": "5",
    "title": "Nocturne Vision",
    "category": "Aesthetic",
    "medium": "Fine Art Portraiture",
    "year": "2025",
    "dimensions": "3000 x 4000 px",
    "imageUrl": "/images/gallery/art_05.webp",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    "audioTitle": "Audio Commentary: Nocturne Vision",
    "audioDuration": "3:30",
    "price": 3480,
    "isFeatured": true,
    "description": "Visual composition by Arifur Jaman. Exploring modern digital texture, expressive form, and technical balance in 2025."
  },
  {
    "id": "6",
    "title": "Aura of Creation",
    "category": "Urban",
    "medium": "Contemporary Studio Edition",
    "year": "2025",
    "dimensions": "3000 x 4000 px",
    "imageUrl": "/images/gallery/art_06.webp",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    "audioTitle": "Audio Walk: Symphony of Innovation",
    "audioDuration": "2:40",
    "price": 3650,
    "isFeatured": true,
    "description": "Visual composition by Arifur Jaman. Exploring modern digital texture, expressive form, and technical balance in 2025."
  },
  {
    "id": "7",
    "title": "Chromatic Harmony",
    "category": "Portrait",
    "medium": "Archival Pigment Print",
    "year": "2025",
    "dimensions": "3000 x 4000 px",
    "imageUrl": "/images/gallery/art_07.webp",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    "audioTitle": "Vision Statement: The Journey of Arifur",
    "audioDuration": "3:45",
    "price": 3820,
    "isFeatured": true,
    "description": "Visual composition by Arifur Jaman. Exploring modern digital texture, expressive form, and technical balance in 2025."
  },
  {
    "id": "8",
    "title": "Prismatic Solitude",
    "category": "Creative",
    "medium": "Digital Fine Art & Photography",
    "year": "2025",
    "dimensions": "3000 x 4000 px",
    "imageUrl": "/images/gallery/art_08.webp",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    "audioTitle": "Commentary: Technology as Modern Canvas",
    "audioDuration": "2:50",
    "price": 3990,
    "isFeatured": true,
    "description": "Visual composition by Arifur Jaman. Exploring modern digital texture, expressive form, and technical balance in 2025."
  },
  {
    "id": "9",
    "title": "Ethereal Resonance",
    "category": "Tech & Art",
    "medium": "Computational Aesthetics & Canvas",
    "year": "2025",
    "dimensions": "3000 x 4000 px",
    "imageUrl": "/images/gallery/art_09.webp",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    "audioTitle": "Sonic Journey: Metropolitan Reflections",
    "audioDuration": "4:12",
    "price": 4160,
    "isFeatured": false,
    "description": "Visual composition by Arifur Jaman. Exploring modern digital texture, expressive form, and technical balance in 2025."
  },
  {
    "id": "10",
    "title": "Metropolitan Echoes",
    "category": "Visual",
    "medium": "Cinematic Visual Composition",
    "year": "2025",
    "dimensions": "1986 x 4000 px",
    "imageUrl": "/images/gallery/art_10.webp",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    "audioTitle": "Artist Note: The Birth of a Platform",
    "audioDuration": "3:15",
    "price": 4330,
    "isFeatured": false,
    "description": "Visual composition by Arifur Jaman. Exploring modern digital texture, expressive form, and technical balance in 2025."
  },
  {
    "id": "11",
    "title": "The Modern Architect",
    "category": "Aesthetic",
    "medium": "Mixed Photographic Media",
    "year": "2025",
    "dimensions": "3000 x 4000 px",
    "imageUrl": "/images/gallery/art_11.webp",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    "audioTitle": "Audio Commentary: Nocturne Vision",
    "audioDuration": "3:30",
    "price": 4500,
    "isFeatured": false,
    "description": "Visual composition by Arifur Jaman. Exploring modern digital texture, expressive form, and technical balance in 2025."
  },
  {
    "id": "12",
    "title": "Synthesized Presence",
    "category": "Urban",
    "medium": "Fine Art Portraiture",
    "year": "2025",
    "dimensions": "3000 x 4000 px",
    "imageUrl": "/images/gallery/art_12.webp",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    "audioTitle": "Audio Walk: Symphony of Innovation",
    "audioDuration": "2:40",
    "price": 4670,
    "isFeatured": false,
    "description": "Visual composition by Arifur Jaman. Exploring modern digital texture, expressive form, and technical balance in 2025."
  },
  {
    "id": "13",
    "title": "Luminous Contemplation",
    "category": "Portrait",
    "medium": "Contemporary Studio Edition",
    "year": "2025",
    "dimensions": "3000 x 4000 px",
    "imageUrl": "/images/gallery/art_13.webp",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    "audioTitle": "Vision Statement: The Journey of Arifur",
    "audioDuration": "3:45",
    "price": 4840,
    "isFeatured": false,
    "description": "Visual composition by Arifur Jaman. Exploring modern digital texture, expressive form, and technical balance in 2025."
  },
  {
    "id": "14",
    "title": "Geometry of Shadows",
    "category": "Creative",
    "medium": "Archival Pigment Print",
    "year": "2025",
    "dimensions": "3000 x 4000 px",
    "imageUrl": "/images/gallery/art_14.webp",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    "audioTitle": "Commentary: Technology as Modern Canvas",
    "audioDuration": "2:50",
    "price": 5010,
    "isFeatured": false,
    "description": "Visual composition by Arifur Jaman. Exploring modern digital texture, expressive form, and technical balance in 2025."
  },
  {
    "id": "15",
    "title": "Abstract Poise",
    "category": "Tech & Art",
    "medium": "Digital Fine Art & Photography",
    "year": "2025",
    "dimensions": "3000 x 4000 px",
    "imageUrl": "/images/gallery/art_15.webp",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    "audioTitle": "Sonic Journey: Metropolitan Reflections",
    "audioDuration": "4:12",
    "price": 5180,
    "isFeatured": false,
    "description": "Visual composition by Arifur Jaman. Exploring modern digital texture, expressive form, and technical balance in 2025."
  },
  {
    "id": "16",
    "title": "Neon Twilight",
    "category": "Visual",
    "medium": "Computational Aesthetics & Canvas",
    "year": "2025",
    "dimensions": "3000 x 4000 px",
    "imageUrl": "/images/gallery/art_16.webp",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    "audioTitle": "Artist Note: The Birth of a Platform",
    "audioDuration": "3:15",
    "price": 5350,
    "isFeatured": false,
    "description": "Visual composition by Arifur Jaman. Exploring modern digital texture, expressive form, and technical balance in 2025."
  },
  {
    "id": "17",
    "title": "Quiet Determination",
    "category": "Aesthetic",
    "medium": "Cinematic Visual Composition",
    "year": "2025",
    "dimensions": "433 x 577 px",
    "imageUrl": "/images/gallery/art_17.webp",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    "audioTitle": "Audio Commentary: Nocturne Vision",
    "audioDuration": "3:30",
    "price": 5520,
    "isFeatured": false,
    "description": "Visual composition by Arifur Jaman. Exploring modern digital texture, expressive form, and technical balance in 2025."
  },
  {
    "id": "18",
    "title": "Digital Tapestry",
    "category": "Urban",
    "medium": "Mixed Photographic Media",
    "year": "2025",
    "dimensions": "4000 x 3000 px",
    "imageUrl": "/images/gallery/art_18.webp",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    "audioTitle": "Audio Walk: Symphony of Innovation",
    "audioDuration": "2:40",
    "price": 5690,
    "isFeatured": false,
    "description": "Visual composition by Arifur Jaman. Exploring modern digital texture, expressive form, and technical balance in 2025."
  },
  {
    "id": "19",
    "title": "Canvas of the Future",
    "category": "Portrait",
    "medium": "Fine Art Portraiture",
    "year": "2025",
    "dimensions": "3000 x 4000 px",
    "imageUrl": "/images/gallery/art_19.webp",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    "audioTitle": "Vision Statement: The Journey of Arifur",
    "audioDuration": "3:45",
    "price": 5860,
    "isFeatured": false,
    "description": "Visual composition by Arifur Jaman. Exploring modern digital texture, expressive form, and technical balance in 2025."
  },
  {
    "id": "20",
    "title": "Atmospheric Balance",
    "category": "Creative",
    "medium": "Contemporary Studio Edition",
    "year": "2025",
    "dimensions": "4000 x 3000 px",
    "imageUrl": "/images/gallery/art_20.webp",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    "audioTitle": "Commentary: Technology as Modern Canvas",
    "audioDuration": "2:50",
    "price": 6030,
    "isFeatured": false,
    "description": "Visual composition by Arifur Jaman. Exploring modern digital texture, expressive form, and technical balance in 2025."
  },
  {
    "id": "21",
    "title": "Monochrome Symphony",
    "category": "Tech & Art",
    "medium": "Archival Pigment Print",
    "year": "2025",
    "dimensions": "3000 x 4000 px",
    "imageUrl": "/images/gallery/art_21.webp",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    "audioTitle": "Sonic Journey: Metropolitan Reflections",
    "audioDuration": "4:12",
    "price": 6200,
    "isFeatured": false,
    "description": "Visual composition by Arifur Jaman. Exploring modern digital texture, expressive form, and technical balance in 2025."
  },
  {
    "id": "22",
    "title": "Vivid Introspection",
    "category": "Visual",
    "medium": "Digital Fine Art & Photography",
    "year": "2025",
    "dimensions": "4000 x 3000 px",
    "imageUrl": "/images/gallery/art_22.webp",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    "audioTitle": "Artist Note: The Birth of a Platform",
    "audioDuration": "3:15",
    "price": 6370,
    "isFeatured": false,
    "description": "Visual composition by Arifur Jaman. Exploring modern digital texture, expressive form, and technical balance in 2025."
  },
  {
    "id": "23",
    "title": "Aesthetic Equilibrium",
    "category": "Aesthetic",
    "medium": "Computational Aesthetics & Canvas",
    "year": "2025",
    "dimensions": "4000 x 3000 px",
    "imageUrl": "/images/gallery/art_23.webp",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    "audioTitle": "Audio Commentary: Nocturne Vision",
    "audioDuration": "3:30",
    "price": 6540,
    "isFeatured": false,
    "description": "Visual composition by Arifur Jaman. Exploring modern digital texture, expressive form, and technical balance in 2025."
  },
  {
    "id": "24",
    "title": "Infinite Spectrum",
    "category": "Urban",
    "medium": "Cinematic Visual Composition",
    "year": "2025",
    "dimensions": "4000 x 3000 px",
    "imageUrl": "/images/gallery/art_24.webp",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    "audioTitle": "Audio Walk: Symphony of Innovation",
    "audioDuration": "2:40",
    "price": 6710,
    "isFeatured": false,
    "description": "Visual composition by Arifur Jaman. Exploring modern digital texture, expressive form, and technical balance in 2025."
  },
  {
    "id": "25",
    "title": "Contemporary Focus",
    "category": "Portrait",
    "medium": "Mixed Photographic Media",
    "year": "2025",
    "dimensions": "3392 x 2544 px",
    "imageUrl": "/images/gallery/art_25.webp",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    "audioTitle": "Vision Statement: The Journey of Arifur",
    "audioDuration": "3:45",
    "price": 6880,
    "isFeatured": false,
    "description": "Visual composition by Arifur Jaman. Exploring modern digital texture, expressive form, and technical balance in 2025."
  },
  {
    "id": "26",
    "title": "Subtle Vibrance",
    "category": "Creative",
    "medium": "Fine Art Portraiture",
    "year": "2025",
    "dimensions": "3000 x 4000 px",
    "imageUrl": "/images/gallery/art_26.webp",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    "audioTitle": "Commentary: Technology as Modern Canvas",
    "audioDuration": "2:50",
    "price": 7050,
    "isFeatured": false,
    "description": "Visual composition by Arifur Jaman. Exploring modern digital texture, expressive form, and technical balance in 2025."
  },
  {
    "id": "27",
    "title": "The Executive Vision",
    "category": "Tech & Art",
    "medium": "Contemporary Studio Edition",
    "year": "2025",
    "dimensions": "3008 x 4000 px",
    "imageUrl": "/images/gallery/art_27.webp",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    "audioTitle": "Sonic Journey: Metropolitan Reflections",
    "audioDuration": "4:12",
    "price": 7220,
    "isFeatured": false,
    "description": "Visual composition by Arifur Jaman. Exploring modern digital texture, expressive form, and technical balance in 2025."
  },
  {
    "id": "28",
    "title": "Harmonic Cadence",
    "category": "Visual",
    "medium": "Archival Pigment Print",
    "year": "2025",
    "dimensions": "3000 x 4000 px",
    "imageUrl": "/images/gallery/art_28.webp",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    "audioTitle": "Artist Note: The Birth of a Platform",
    "audioDuration": "3:15",
    "price": 7390,
    "isFeatured": false,
    "description": "Visual composition by Arifur Jaman. Exploring modern digital texture, expressive form, and technical balance in 2025."
  },
  {
    "id": "29",
    "title": "Structure & Soul",
    "category": "Aesthetic",
    "medium": "Digital Fine Art & Photography",
    "year": "2025",
    "dimensions": "3000 x 4000 px",
    "imageUrl": "/images/gallery/art_29.webp",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    "audioTitle": "Audio Commentary: Nocturne Vision",
    "audioDuration": "3:30",
    "price": 7560,
    "isFeatured": false,
    "description": "Visual composition by Arifur Jaman. Exploring modern digital texture, expressive form, and technical balance in 2025."
  },
  {
    "id": "30",
    "title": "Reflective Depth",
    "category": "Urban",
    "medium": "Computational Aesthetics & Canvas",
    "year": "2025",
    "dimensions": "3000 x 4000 px",
    "imageUrl": "/images/gallery/art_30.webp",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    "audioTitle": "Audio Walk: Symphony of Innovation",
    "audioDuration": "2:40",
    "price": 7730,
    "isFeatured": false,
    "description": "Visual composition by Arifur Jaman. Exploring modern digital texture, expressive form, and technical balance in 2025."
  },
  {
    "id": "31",
    "title": "Minimalist Elegance",
    "category": "Portrait",
    "medium": "Cinematic Visual Composition",
    "year": "2025",
    "dimensions": "3000 x 4000 px",
    "imageUrl": "/images/gallery/art_31.webp",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    "audioTitle": "Vision Statement: The Journey of Arifur",
    "audioDuration": "3:45",
    "price": 7900,
    "isFeatured": false,
    "description": "Visual composition by Arifur Jaman. Exploring modern digital texture, expressive form, and technical balance in 2025."
  },
  {
    "id": "32",
    "title": "Pulse of Innovation",
    "category": "Creative",
    "medium": "Mixed Photographic Media",
    "year": "2025",
    "dimensions": "4000 x 3000 px",
    "imageUrl": "/images/gallery/art_32.webp",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    "audioTitle": "Commentary: Technology as Modern Canvas",
    "audioDuration": "2:50",
    "price": 2870,
    "isFeatured": false,
    "description": "Visual composition by Arifur Jaman. Exploring modern digital texture, expressive form, and technical balance in 2025."
  },
  {
    "id": "33",
    "title": "Artisan of Code",
    "category": "Tech & Art",
    "medium": "Fine Art Portraiture",
    "year": "2025",
    "dimensions": "2688 x 3840 px",
    "imageUrl": "/images/gallery/art_33.webp",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    "audioTitle": "Sonic Journey: Metropolitan Reflections",
    "audioDuration": "4:12",
    "price": 3040,
    "isFeatured": false,
    "description": "Visual composition by Arifur Jaman. Exploring modern digital texture, expressive form, and technical balance in 2025."
  },
  {
    "id": "34",
    "title": "Transcendence in Gold",
    "category": "Visual",
    "medium": "Contemporary Studio Edition",
    "year": "2025",
    "dimensions": "2544 x 3392 px",
    "imageUrl": "/images/gallery/art_34.webp",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    "audioTitle": "Artist Note: The Birth of a Platform",
    "audioDuration": "3:15",
    "price": 3210,
    "isFeatured": false,
    "description": "Visual composition by Arifur Jaman. Exploring modern digital texture, expressive form, and technical balance in 2025."
  },
  {
    "id": "35",
    "title": "Emerald Perspectives",
    "category": "Aesthetic",
    "medium": "Archival Pigment Print",
    "year": "2025",
    "dimensions": "2544 x 3392 px",
    "imageUrl": "/images/gallery/art_35.webp",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    "audioTitle": "Audio Commentary: Nocturne Vision",
    "audioDuration": "3:30",
    "price": 3380,
    "isFeatured": false,
    "description": "Visual composition by Arifur Jaman. Exploring modern digital texture, expressive form, and technical balance in 2025."
  },
  {
    "id": "36",
    "title": "Urban Twilight",
    "category": "Urban",
    "medium": "Digital Fine Art & Photography",
    "year": "2025",
    "dimensions": "3000 x 4000 px",
    "imageUrl": "/images/gallery/art_36.webp",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    "audioTitle": "Audio Walk: Symphony of Innovation",
    "audioDuration": "2:40",
    "price": 3550,
    "isFeatured": false,
    "description": "Visual composition by Arifur Jaman. Exploring modern digital texture, expressive form, and technical balance in 2025."
  },
  {
    "id": "37",
    "title": "Shadows of Ambition",
    "category": "Portrait",
    "medium": "Computational Aesthetics & Canvas",
    "year": "2025",
    "dimensions": "3000 x 4000 px",
    "imageUrl": "/images/gallery/art_37.webp",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    "audioTitle": "Vision Statement: The Journey of Arifur",
    "audioDuration": "3:45",
    "price": 3720,
    "isFeatured": false,
    "description": "Visual composition by Arifur Jaman. Exploring modern digital texture, expressive form, and technical balance in 2025."
  },
  {
    "id": "38",
    "title": "Aura & Algorithm",
    "category": "Creative",
    "medium": "Cinematic Visual Composition",
    "year": "2025",
    "dimensions": "3000 x 4000 px",
    "imageUrl": "/images/gallery/art_38.webp",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    "audioTitle": "Commentary: Technology as Modern Canvas",
    "audioDuration": "2:50",
    "price": 3890,
    "isFeatured": false,
    "description": "Visual composition by Arifur Jaman. Exploring modern digital texture, expressive form, and technical balance in 2025."
  },
  {
    "id": "39",
    "title": "Dynamic Contours",
    "category": "Tech & Art",
    "medium": "Mixed Photographic Media",
    "year": "2025",
    "dimensions": "3000 x 4000 px",
    "imageUrl": "/images/gallery/art_39.webp",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    "audioTitle": "Sonic Journey: Metropolitan Reflections",
    "audioDuration": "4:12",
    "price": 4060,
    "isFeatured": false,
    "description": "Visual composition by Arifur Jaman. Exploring modern digital texture, expressive form, and technical balance in 2025."
  },
  {
    "id": "40",
    "title": "The Modern Studio",
    "category": "Visual",
    "medium": "Fine Art Portraiture",
    "year": "2025",
    "dimensions": "12240 x 16320 px",
    "imageUrl": "/images/gallery/art_40.webp",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    "audioTitle": "Artist Note: The Birth of a Platform",
    "audioDuration": "3:15",
    "price": 4230,
    "isFeatured": false,
    "description": "Visual composition by Arifur Jaman. Exploring modern digital texture, expressive form, and technical balance in 2025."
  },
  {
    "id": "41",
    "title": "Chromatic Echo",
    "category": "Aesthetic",
    "medium": "Contemporary Studio Edition",
    "year": "2025",
    "dimensions": "3392 x 2544 px",
    "imageUrl": "/images/gallery/art_41.webp",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    "audioTitle": "Audio Commentary: Nocturne Vision",
    "audioDuration": "3:30",
    "price": 4400,
    "isFeatured": false,
    "description": "Visual composition by Arifur Jaman. Exploring modern digital texture, expressive form, and technical balance in 2025."
  },
  {
    "id": "42",
    "title": "Silent Radiance",
    "category": "Urban",
    "medium": "Archival Pigment Print",
    "year": "2025",
    "dimensions": "3000 x 4000 px",
    "imageUrl": "/images/gallery/art_42.webp",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    "audioTitle": "Audio Walk: Symphony of Innovation",
    "audioDuration": "2:40",
    "price": 4570,
    "isFeatured": false,
    "description": "Visual composition by Arifur Jaman. Exploring modern digital texture, expressive form, and technical balance in 2025."
  },
  {
    "id": "43",
    "title": "Frontier of Creativity",
    "category": "Portrait",
    "medium": "Digital Fine Art & Photography",
    "year": "2025",
    "dimensions": "3000 x 4000 px",
    "imageUrl": "/images/gallery/art_43.webp",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    "audioTitle": "Vision Statement: The Journey of Arifur",
    "audioDuration": "3:45",
    "price": 4740,
    "isFeatured": false,
    "description": "Visual composition by Arifur Jaman. Exploring modern digital texture, expressive form, and technical balance in 2025."
  },
  {
    "id": "44",
    "title": "Elemental Harmony",
    "category": "Creative",
    "medium": "Computational Aesthetics & Canvas",
    "year": "2025",
    "dimensions": "3000 x 4000 px",
    "imageUrl": "/images/gallery/art_44.webp",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    "audioTitle": "Commentary: Technology as Modern Canvas",
    "audioDuration": "2:50",
    "price": 4910,
    "isFeatured": false,
    "description": "Visual composition by Arifur Jaman. Exploring modern digital texture, expressive form, and technical balance in 2025."
  },
  {
    "id": "45",
    "title": "Modern Renaissance",
    "category": "Tech & Art",
    "medium": "Cinematic Visual Composition",
    "year": "2025",
    "dimensions": "3000 x 4000 px",
    "imageUrl": "/images/gallery/art_45.webp",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    "audioTitle": "Sonic Journey: Metropolitan Reflections",
    "audioDuration": "4:12",
    "price": 5080,
    "isFeatured": false,
    "description": "Visual composition by Arifur Jaman. Exploring modern digital texture, expressive form, and technical balance in 2025."
  },
  {
    "id": "46",
    "title": "The Digital Curator",
    "category": "Visual",
    "medium": "Mixed Photographic Media",
    "year": "2025",
    "dimensions": "3000 x 4000 px",
    "imageUrl": "/images/gallery/art_46.webp",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    "audioTitle": "Artist Note: The Birth of a Platform",
    "audioDuration": "3:15",
    "price": 5250,
    "isFeatured": false,
    "description": "Visual composition by Arifur Jaman. Exploring modern digital texture, expressive form, and technical balance in 2025."
  },
  {
    "id": "47",
    "title": "Poetry in Pixels",
    "category": "Aesthetic",
    "medium": "Fine Art Portraiture",
    "year": "2025",
    "dimensions": "2544 x 3392 px",
    "imageUrl": "/images/gallery/art_47.webp",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    "audioTitle": "Audio Commentary: Nocturne Vision",
    "audioDuration": "3:30",
    "price": 5420,
    "isFeatured": false,
    "description": "Visual composition by Arifur Jaman. Exploring modern digital texture, expressive form, and technical balance in 2025."
  },
  {
    "id": "48",
    "title": "Visionary Monologue",
    "category": "Urban",
    "medium": "Contemporary Studio Edition",
    "year": "2025",
    "dimensions": "2252 x 4000 px",
    "imageUrl": "/images/gallery/art_48.webp",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    "audioTitle": "Audio Walk: Symphony of Innovation",
    "audioDuration": "2:40",
    "price": 5590,
    "isFeatured": false,
    "description": "Visual composition by Arifur Jaman. Exploring modern digital texture, expressive form, and technical balance in 2025."
  },
  {
    "id": "49",
    "title": "Obsidian & Amber",
    "category": "Portrait",
    "medium": "Archival Pigment Print",
    "year": "2025",
    "dimensions": "2252 x 4000 px",
    "imageUrl": "/images/gallery/art_49.webp",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    "audioTitle": "Vision Statement: The Journey of Arifur",
    "audioDuration": "3:45",
    "price": 5760,
    "isFeatured": false,
    "description": "Visual composition by Arifur Jaman. Exploring modern digital texture, expressive form, and technical balance in 2025."
  },
  {
    "id": "50",
    "title": "Contrasts in Motion",
    "category": "Creative",
    "medium": "Digital Fine Art & Photography",
    "year": "2025",
    "dimensions": "2240 x 4000 px",
    "imageUrl": "/images/gallery/art_50.webp",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    "audioTitle": "Commentary: Technology as Modern Canvas",
    "audioDuration": "2:50",
    "price": 5930,
    "isFeatured": false,
    "description": "Visual composition by Arifur Jaman. Exploring modern digital texture, expressive form, and technical balance in 2025."
  },
  {
    "id": "51",
    "title": "Geometric Solitude",
    "category": "Tech & Art",
    "medium": "Computational Aesthetics & Canvas",
    "year": "2025",
    "dimensions": "3060 x 4080 px",
    "imageUrl": "/images/gallery/art_51.webp",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    "audioTitle": "Sonic Journey: Metropolitan Reflections",
    "audioDuration": "4:12",
    "price": 6100,
    "isFeatured": false,
    "description": "Visual composition by Arifur Jaman. Exploring modern digital texture, expressive form, and technical balance in 2025."
  },
  {
    "id": "52",
    "title": "The Creator\u2019s Gaze",
    "category": "Visual",
    "medium": "Cinematic Visual Composition",
    "year": "2025",
    "dimensions": "4080 x 3072 px",
    "imageUrl": "/images/gallery/art_52.webp",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    "audioTitle": "Artist Note: The Birth of a Platform",
    "audioDuration": "3:15",
    "price": 6270,
    "isFeatured": false,
    "description": "Visual composition by Arifur Jaman. Exploring modern digital texture, expressive form, and technical balance in 2025."
  },
  {
    "id": "53",
    "title": "Infinite Horizons",
    "category": "Aesthetic",
    "medium": "Mixed Photographic Media",
    "year": "2025",
    "dimensions": "4080 x 3072 px",
    "imageUrl": "/images/gallery/art_53.webp",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    "audioTitle": "Audio Commentary: Nocturne Vision",
    "audioDuration": "3:30",
    "price": 6440,
    "isFeatured": false,
    "description": "Visual composition by Arifur Jaman. Exploring modern digital texture, expressive form, and technical balance in 2025."
  },
  {
    "id": "54",
    "title": "The Sculpted Light",
    "category": "Urban",
    "medium": "Fine Art Portraiture",
    "year": "2025",
    "dimensions": "2160 x 3240 px",
    "imageUrl": "/images/gallery/art_54.webp",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    "audioTitle": "Audio Walk: Symphony of Innovation",
    "audioDuration": "2:40",
    "price": 6610,
    "isFeatured": false,
    "description": "Visual composition by Arifur Jaman. Exploring modern digital texture, expressive form, and technical balance in 2025."
  },
  {
    "id": "55",
    "title": "Whispers of Form",
    "category": "Portrait",
    "medium": "Contemporary Studio Edition",
    "year": "2025",
    "dimensions": "3072 x 4080 px",
    "imageUrl": "/images/gallery/art_55.webp",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    "audioTitle": "Vision Statement: The Journey of Arifur",
    "audioDuration": "3:45",
    "price": 6780,
    "isFeatured": false,
    "description": "Visual composition by Arifur Jaman. Exploring modern digital texture, expressive form, and technical balance in 2025."
  },
  {
    "id": "56",
    "title": "Architect of Tomorrow",
    "category": "Creative",
    "medium": "Archival Pigment Print",
    "year": "2025",
    "dimensions": "3072 x 4080 px",
    "imageUrl": "/images/gallery/art_56.webp",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    "audioTitle": "Commentary: Technology as Modern Canvas",
    "audioDuration": "2:50",
    "price": 6950,
    "isFeatured": false,
    "description": "Visual composition by Arifur Jaman. Exploring modern digital texture, expressive form, and technical balance in 2025."
  },
  {
    "id": "57",
    "title": "Chromatic Genesis",
    "category": "Tech & Art",
    "medium": "Digital Fine Art & Photography",
    "year": "2026",
    "dimensions": "3072 x 4080 px",
    "imageUrl": "/images/gallery/art_57.webp",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    "audioTitle": "Sonic Journey: Metropolitan Reflections",
    "audioDuration": "4:12",
    "price": 7120,
    "isFeatured": false,
    "description": "Visual composition by Arifur Jaman. Exploring modern digital texture, expressive form, and technical balance in 2026."
  },
  {
    "id": "58",
    "title": "Urban Odyssey",
    "category": "Visual",
    "medium": "Computational Aesthetics & Canvas",
    "year": "2026",
    "dimensions": "3072 x 4080 px",
    "imageUrl": "/images/gallery/art_58.webp",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    "audioTitle": "Artist Note: The Birth of a Platform",
    "audioDuration": "3:15",
    "price": 7290,
    "isFeatured": false,
    "description": "Visual composition by Arifur Jaman. Exploring modern digital texture, expressive form, and technical balance in 2026."
  },
  {
    "id": "59",
    "title": "Sublime Composition",
    "category": "Aesthetic",
    "medium": "Cinematic Visual Composition",
    "year": "2026",
    "dimensions": "3072 x 4080 px",
    "imageUrl": "/images/gallery/art_59.webp",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    "audioTitle": "Audio Commentary: Nocturne Vision",
    "audioDuration": "3:30",
    "price": 7460,
    "isFeatured": false,
    "description": "Visual composition by Arifur Jaman. Exploring modern digital texture, expressive form, and technical balance in 2026."
  },
  {
    "id": "60",
    "title": "Resonance of Thought",
    "category": "Urban",
    "medium": "Mixed Photographic Media",
    "year": "2023",
    "dimensions": "1836 x 4080 px",
    "imageUrl": "/images/gallery/art_60.webp",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    "audioTitle": "Audio Walk: Symphony of Innovation",
    "audioDuration": "2:40",
    "price": 7630,
    "isFeatured": false,
    "description": "Visual composition by Arifur Jaman. Exploring modern digital texture, expressive form, and technical balance in 2023."
  },
  {
    "id": "61",
    "title": "Timeless Silhouette",
    "category": "Portrait",
    "medium": "Fine Art Portraiture",
    "year": "2025",
    "dimensions": "3120 x 4160 px",
    "imageUrl": "/images/gallery/art_61.webp",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    "audioTitle": "Vision Statement: The Journey of Arifur",
    "audioDuration": "3:45",
    "price": 7800,
    "isFeatured": false,
    "description": "Visual composition by Arifur Jaman. Exploring modern digital texture, expressive form, and technical balance in 2025."
  },
  {
    "id": "62",
    "title": "The Digital Nomad",
    "category": "Creative",
    "medium": "Contemporary Studio Edition",
    "year": "2025",
    "dimensions": "3120 x 4160 px",
    "imageUrl": "/images/gallery/art_62.webp",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    "audioTitle": "Commentary: Technology as Modern Canvas",
    "audioDuration": "2:50",
    "price": 7970,
    "isFeatured": false,
    "description": "Visual composition by Arifur Jaman. Exploring modern digital texture, expressive form, and technical balance in 2025."
  },
  {
    "id": "63",
    "title": "Symphony of Light",
    "category": "Tech & Art",
    "medium": "Archival Pigment Print",
    "year": "2025",
    "dimensions": "3120 x 4160 px",
    "imageUrl": "/images/gallery/art_63.webp",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    "audioTitle": "Sonic Journey: Metropolitan Reflections",
    "audioDuration": "4:12",
    "price": 2940,
    "isFeatured": false,
    "description": "Visual composition by Arifur Jaman. Exploring modern digital texture, expressive form, and technical balance in 2025."
  },
  {
    "id": "64",
    "title": "Atmospheric Stillness",
    "category": "Visual",
    "medium": "Digital Fine Art & Photography",
    "year": "2025",
    "dimensions": "8320 x 6240 px",
    "imageUrl": "/images/gallery/art_64.webp",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    "audioTitle": "Artist Note: The Birth of a Platform",
    "audioDuration": "3:15",
    "price": 3110,
    "isFeatured": false,
    "description": "Visual composition by Arifur Jaman. Exploring modern digital texture, expressive form, and technical balance in 2025."
  },
  {
    "id": "65",
    "title": "Vanguard of Design",
    "category": "Aesthetic",
    "medium": "Computational Aesthetics & Canvas",
    "year": "2025",
    "dimensions": "6240 x 8320 px",
    "imageUrl": "/images/gallery/art_65.webp",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    "audioTitle": "Audio Commentary: Nocturne Vision",
    "audioDuration": "3:30",
    "price": 3280,
    "isFeatured": false,
    "description": "Visual composition by Arifur Jaman. Exploring modern digital texture, expressive form, and technical balance in 2025."
  },
  {
    "id": "66",
    "title": "Elysian Contemplation",
    "category": "Urban",
    "medium": "Cinematic Visual Composition",
    "year": "2025",
    "dimensions": "4160 x 3120 px",
    "imageUrl": "/images/gallery/art_66.webp",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    "audioTitle": "Audio Walk: Symphony of Innovation",
    "audioDuration": "2:40",
    "price": 3450,
    "isFeatured": false,
    "description": "Visual composition by Arifur Jaman. Exploring modern digital texture, expressive form, and technical balance in 2025."
  },
  {
    "id": "67",
    "title": "Nexus of Tech & Art",
    "category": "Portrait",
    "medium": "Mixed Photographic Media",
    "year": "2025",
    "dimensions": "3120 x 4160 px",
    "imageUrl": "/images/gallery/art_67.webp",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    "audioTitle": "Vision Statement: The Journey of Arifur",
    "audioDuration": "3:45",
    "price": 3620,
    "isFeatured": false,
    "description": "Visual composition by Arifur Jaman. Exploring modern digital texture, expressive form, and technical balance in 2025."
  },
  {
    "id": "68",
    "title": "The Signature Aura",
    "category": "Creative",
    "medium": "Fine Art Portraiture",
    "year": "2025",
    "dimensions": "480 x 480 px",
    "imageUrl": "/images/gallery/art_68.webp",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    "audioTitle": "Commentary: Technology as Modern Canvas",
    "audioDuration": "2:50",
    "price": 3790,
    "isFeatured": false,
    "description": "Visual composition by Arifur Jaman. Exploring modern digital texture, expressive form, and technical balance in 2025."
  }
];

export const artworks = initialArtworks;

export interface AudioTrackConfig {
  id: string;
  title: string;
  artist: string;
  audioUrl: string;
  slug: string;
  duration?: string;
  description?: string;
}

export const defaultAudioTracks: AudioTrackConfig[] = [
  {
    id: 'kexart-original',
    title: 'KEXART Signature Audio Loop',
    artist: 'KEXART & Arifur Sound',
    audioUrl: '/prankaudio.mp3',
    slug: 'kexart-original',
    duration: '0:35',
    description: 'The exact signature audio from kexart.com',
  },
  {
    id: 'ambient-1',
    title: 'Soundscape I: Contemporary Horizon',
    artist: 'Arifur Sound Studio',
    audioUrl: 'https://raw.githubusercontent.com/rafaelreis-hotmart/Audio-Sample-files/master/sample.mp3',
    slug: 'contemporary-horizon',
    duration: '3:45',
  },
  {
    id: 'ambient-2',
    title: 'Soundscape II: Cybernetic Meditation',
    artist: 'Arifur Sound Studio',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    slug: 'cybernetic-meditation',
    duration: '2:50',
  },
  {
    id: 'ambient-3',
    title: 'Soundscape III: Metropolitan Pulse',
    artist: 'Arifur Sound Studio',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    slug: 'metropolitan-pulse',
    duration: '4:12',
  },
];

export const categories = [
  'All',
  'Portrait',
  'Creative',
  'Tech & Art',
  'Visual',
  'Aesthetic',
  'Urban',
];
