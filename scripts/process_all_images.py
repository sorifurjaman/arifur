import os
import json
import re
from PIL import Image, ImageOps

Image.MAX_IMAGE_PIXELS = None

SRC_DIR = '/mnt/4C60490919A46293/antigravity/New Folder'
WEB_GALLERY_DIR = '/mnt/4C60490919A46293/antigravity/autosund/web/public/images/gallery'
MOBILE_GALLERY_DIR = '/mnt/4C60490919A46293/antigravity/autosund/mobile/assets/images/gallery'

os.makedirs(WEB_GALLERY_DIR, exist_ok=True)
os.makedirs(MOBILE_GALLERY_DIR, exist_ok=True)

files = sorted([f for f in os.listdir(SRC_DIR) if f.lower().endswith(('.jpg', '.jpeg', '.png', '.webp'))])

# Ensure 20251203_160322.jpg is placed at index 0 (as master portrait #1)
owner_file = '20251203_160322.jpg'
if owner_file in files:
    files.remove(owner_file)
    files.insert(0, owner_file)

titles = [
    'Master Portrait — Arifur', 'Cybernetic Horizon', 'Urban Silhouette & Reflections', 'Digital Genesis',
    'Nocturne Vision', 'Aura of Creation', 'Chromatic Harmony', 'Prismatic Solitude',
    'Ethereal Resonance', 'Metropolitan Echoes', 'The Modern Architect', 'Synthesized Presence',
    'Luminous Contemplation', 'Geometry of Shadows', 'Abstract Poise', 'Neon Twilight',
    'Quiet Determination', 'Digital Tapestry', 'Canvas of the Future', 'Atmospheric Balance',
    'Monochrome Symphony', 'Vivid Introspection', 'Aesthetic Equilibrium', 'Infinite Spectrum',
    'Contemporary Focus', 'Subtle Vibrance', 'The Executive Vision', 'Harmonic Cadence',
    'Structure & Soul', 'Reflective Depth', 'Minimalist Elegance', 'Pulse of Innovation',
    'Artisan of Code', 'Transcendence in Gold', 'Emerald Perspectives', 'Urban Twilight',
    'Shadows of Ambition', 'Aura & Algorithm', 'Dynamic Contours', 'The Modern Studio',
    'Chromatic Echo', 'Silent Radiance', 'Frontier of Creativity', 'Elemental Harmony',
    'Modern Renaissance', 'The Digital Curator', 'Poetry in Pixels', 'Visionary Monologue',
    'Obsidian & Amber', 'Contrasts in Motion', 'Geometric Solitude', 'The Creator’s Gaze',
    'Infinite Horizons', 'The Sculpted Light', 'Whispers of Form', 'Architect of Tomorrow',
    'Chromatic Genesis', 'Urban Odyssey', 'Sublime Composition', 'Resonance of Thought',
    'Timeless Silhouette', 'The Digital Nomad', 'Symphony of Light', 'Atmospheric Stillness',
    'Vanguard of Design', 'Elysian Contemplation', 'Nexus of Tech & Art', 'The Signature Aura'
]

categories = ['Portrait', 'Creative', 'Tech & Art', 'Visual', 'Aesthetic', 'Urban']

audio_urls = [
    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
]

audio_titles = [
    'Vision Statement: The Journey of Arifur',
    'Commentary: Technology as Modern Canvas',
    'Sonic Journey: Metropolitan Reflections',
    'Artist Note: The Birth of a Platform',
    'Audio Commentary: Nocturne Vision',
    'Audio Walk: Symphony of Innovation',
]

audio_durations = ['3:45', '2:50', '4:12', '3:15', '3:30', '2:40']

mediums = [
    'Digital Fine Art & Photography',
    'Computational Aesthetics & Canvas',
    'Cinematic Visual Composition',
    'Mixed Photographic Media',
    'Fine Art Portraiture',
    'Contemporary Studio Edition',
    'Archival Pigment Print'
]

artworks_data = []

print(f'Starting processing of {len(files)} image files...')

for idx, orig_file in enumerate(files):
    art_id = str(idx + 1)
    file_ext = os.path.splitext(orig_file)[1].lower()
    if file_ext not in ['.jpg', '.jpeg', '.png']:
        file_ext = '.jpg'
    
    clean_filename = f"art_{idx+1:02d}.webp"
    src_path = os.path.join(SRC_DIR, orig_file)
    web_dest = os.path.join(WEB_GALLERY_DIR, clean_filename)
    mobile_dest = os.path.join(MOBILE_GALLERY_DIR, clean_filename)

    title = titles[idx] if idx < len(titles) else f"Contemporary Work #{idx+1} — Arifur"
    category = categories[idx % len(categories)]
    if idx == 0:
        category = 'Portrait'
    
    # Extract year if in filename, else 2025
    year_match = re.search(r'202[3-6]', orig_file)
    year = year_match.group(0) if year_match else '2025'

    medium = mediums[idx % len(mediums)]
    audio_idx = idx % len(audio_urls)
    price = 2800 + ((idx * 170) % 5200)
    is_featured = idx < 8

    # Process and resize image
    try:
        with Image.open(src_path) as img:
            img = ImageOps.exif_transpose(img)
            w, h = img.size
            dims = f"{w} x {h} px"

            # 1. Web version (max 1600px WebP for instant load)
            web_img = img.copy()
            if max(web_img.size) > 1600:
                scale = 1600 / max(web_img.size)
                new_size = (int(web_img.width * scale), int(web_img.height * scale))
                web_img = web_img.resize(new_size, Image.Resampling.LANCZOS)
            
            if web_img.mode in ('RGBA', 'P', 'LA'):
                web_img = web_img.convert('RGB')
            web_img.save(web_dest, 'WEBP', quality=78, method=6)

            # 2. Mobile version (max 1100px WebP for lightning performance)
            mobile_img = img.copy()
            if max(mobile_img.size) > 1100:
                scale = 1100 / max(mobile_img.size)
                new_size = (int(mobile_img.width * scale), int(mobile_img.height * scale))
                mobile_img = mobile_img.resize(new_size, Image.Resampling.LANCZOS)
            
            if mobile_img.mode in ('RGBA', 'P', 'LA'):
                mobile_img = mobile_img.convert('RGB')
            mobile_img.save(mobile_dest, 'WEBP', quality=75, method=6)

        print(f"[{idx+1:02d}/68] Optimized WebP: {orig_file} -> {clean_filename} ({w}x{h})")
    except Exception as e:
        print(f"Error processing {orig_file}: {e}")
        dims = "Studio High-Res"

    desc = f"Visual composition by Arifur Jaman. Exploring modern digital texture, expressive form, and technical balance in {year}."
    if idx == 0:
        desc = "The signature master portrait of Arifur Jaman. A fusion of visionary digital aesthetics, executive poise, and contemporary presence."

    artworks_data.append({
        'id': art_id,
        'title': title,
        'category': category,
        'medium': medium,
        'year': year,
        'dimensions': dims,
        'webImageUrl': f"/images/gallery/{clean_filename}",
        'mobileImageUrl': f"assets/images/gallery/{clean_filename}",
        'audioUrl': audio_urls[audio_idx],
        'audioTitle': audio_titles[audio_idx],
        'audioDuration': audio_durations[audio_idx],
        'price': price,
        'isFeatured': is_featured,
        'description': desc,
    })

print(f"Successfully processed all {len(artworks_data)} artworks!")

# 1. Generate web/src/data/artworks.ts
web_ts_content = f"""export interface Artwork {{
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
}}

export interface ArtistProfile {{
  name: string;
  role: string;
  organization: string;
  portraitUrl: string;
  portraitCutoutUrl: string;
  bio: string;
  vision: string;
  socialLinks: {{
    telegramGroup: string;
    telegramChannel: string;
    telegramUsername: string;
    facebook: string;
    github: string;
    discord: string;
  }};
  telegramBots: Array<{{
    name: string;
    url: string;
    description: string;
    type: 'online' | 'offline';
  }}>;
  webProjects: Array<{{
    name: string;
    url: string;
    description: string;
  }}>;
  mobileApps: Array<{{
    name: string;
    url: string;
    description: string;
  }}>;
}}

export const artistProfile: ArtistProfile = {{
  name: "Arifur Jaman",
  role: "Founder & Creative Technologist",
  organization: "Arifur Hackworld",
  portraitUrl: "/images/owner.jpg",
  portraitCutoutUrl: "/images/owner_nobg.png",
  bio: "Founder of Arifur Hackworld. Visionary software architect, autonomous bot developer, and contemporary visual artist based in Bangladesh. Pioneering seamless digital experiences across web, telegram automation, and cutting-edge multimedia platforms.",
  vision: "Transforming the boundary between technology and art into a living, responsive ecosystem. Every code commit and canvas stroke is built to empower users with speed, intelligence, and refined luxury aesthetics.",
  socialLinks: {{
    telegramGroup: "https://t.me/ArifurHackworld",
    telegramChannel: "https://t.me/ArifurHack",
    telegramUsername: "https://t.me/arifur905",
    facebook: "https://www.facebook.com/fary.pol",
    github: "https://github.com/biplobc384-dotcom/biplobc384-dotcom",
    discord: "https://discord.gg/jqFHknCmN",
  }},
  telegramBots: [
    {{ name: "Ariferex Bot", url: "https://t.me/Ariferex_bot", description: "Group & Channel management, welcome messages & photo generator", type: "online" }},
    {{ name: "Group Chowkidar Bot", url: "https://t.me/GroupChowkidarBot", description: "Channel guard & part-time automated sender", type: "online" }},
    {{ name: "Link Destroyer Bot", url: "https://t.me/LinkDestroyerBot", description: "Security manager and malicious link protection", type: "online" }},
    {{ name: "TeraVideo Downloader", url: "https://t.me/TeraVideoDWBot", description: "Ultra-fast Terabox video downloader", type: "online" }},
    {{ name: "My Data Store Bot", url: "https://t.me/my_data_store_bot", description: "Unlimited secure cloud data storage bot", type: "online" }},
    {{ name: "Arifur Hackworld Bot", url: "https://t.me/ArifurHackworld_bot", description: "Official ecosystem gateway bot", type: "offline" }},
    {{ name: "Codex Arif Bot", url: "https://t.me/codex_arif_Bot", description: "Automated agent checker & verification", type: "offline" }},
    {{ name: "Hashtag Master Pro", url: "https://t.me/HashtagMasterPro_Bot", description: "Ultimate tag generator & daily workflow automation", type: "offline" }},
    {{ name: "MicroEarn BD Bot", url: "https://t.me/MicroEarnBDBot", description: "Micro-task and digital rewards platform", type: "offline" }},
    {{ name: "Arifur AI Bot", url: "https://t.me/ArifurAI_Bot", description: "Personal AI conversational assistant", type: "offline" }},
    {{ name: "Mail Task Cash Bot", url: "https://t.me/MailTaskCashBot", description: "Direct email code receiver without login", type: "offline" }},
    {{ name: "AutoPost Arifur Bot", url: "https://t.me/AutoPost_ArifurBot", description: "Automated message & photo scheduler for channels", type: "offline" }},
  ],
  webProjects: [
    {{ name: "DevStore", url: "https://devonlinestore.ct.ws", description: "Online developer store for code templates, scripts & tool rental" }},
    {{ name: "Fast Video Downloader", url: "https://8yews9.bot-keep.xyz/", description: "High-speed video downloader engine" }},
    {{ name: "Arifur Live TV", url: "https://arifurtv.vercel.app", description: "Cloud live TV streaming directly in browser" }},
    {{ name: "Crypto & Dollar Exchange", url: "https://arifur.alwaysdata.net/", description: "Risk-free peer-to-peer dollar and crypto gateway" }},
    {{ name: "Voice Generator", url: "https://voicgenaretor.netlify.app", description: "Browser-based neural voice and speech synthesizer" }},
    {{ name: "Base64 Pro Converter", url: "https://base64pro.netlify.app/", description: "Professional binary and image to base64 tool" }},
    {{ name: "Portfolio & Finance Tool", url: "https://arifurfakescrinshot.netlify.app/", description: "Binance & Mobile wallet balance portfolio utility" }},
    {{ name: "Global Free Call", url: "https://any-user-for-free.web.app/", description: "No-login global calling utility platform" }},
  ],
  mobileApps: [
    {{ name: "AmarTube", url: "https://t.me/HackworldVaultBot?start=97008bea", description: "Ultimate Media Player & High-Speed Downloader" }},
    {{ name: "SnapStream", url: "https://t.me/HackworldVaultBot?start=01ae1feb", description: "Next-gen Video Downloader & Media Suite" }},
    {{ name: "Code Editor Pro", url: "https://t.me/ArifurHackworld/2001", description: "Mobile IDE with syntax highlighting and compiler" }},
    {{ name: "Mayaboti AI", url: "https://t.me/HackworldVaultBot?start=9b316375", description: "All-in-one AI image, voice, video & code generator" }},
    {{ name: "Prank Hub", url: "https://t.me/HackworldVaultBot?start=9612c140", description: "Creative screen generator & entertainment utility" }},
    {{ name: "TV Free APK", url: "https://t.me/HackworldVaultBot?start=127f0554", description: "100+ Live TV Channels without dish connection" }},
    {{ name: "Toolbox Pro", url: "https://t.me/ArifurHackworld/587", description: "All-in-One Generator and digital Swiss Army knife" }},
  ],
}};

export const initialArtworks: Artwork[] = {json.dumps([{
    'id': a['id'],
    'title': a['title'],
    'category': a['category'],
    'medium': a['medium'],
    'year': a['year'],
    'dimensions': a['dimensions'],
    'imageUrl': a['webImageUrl'],
    'audioUrl': a['audioUrl'],
    'audioTitle': a['audioTitle'],
    'audioDuration': a['audioDuration'],
    'price': a['price'],
    'isFeatured': a['isFeatured'],
    'description': a['description'],
} for a in artworks_data], indent=2)};

export const artworks = initialArtworks;

export interface AudioTrackConfig {{
  id: string;
  title: string;
  artist: string;
  audioUrl: string;
  slug: string;
  duration?: string;
  description?: string;
}}

export const defaultAudioTracks: AudioTrackConfig[] = [
  {{
    id: 'kexart-original',
    title: 'KEXART Signature Audio Loop',
    artist: 'KEXART & Arifur Sound',
    audioUrl: '/prankaudio.mp3',
    slug: 'kexart-original',
    duration: '0:35',
    description: 'The exact signature audio from kexart.com',
  }},
  {{
    id: 'ambient-1',
    title: 'Soundscape I: Contemporary Horizon',
    artist: 'Arifur Sound Studio',
    audioUrl: 'https://raw.githubusercontent.com/rafaelreis-hotmart/Audio-Sample-files/master/sample.mp3',
    slug: 'contemporary-horizon',
    duration: '3:45',
  }},
  {{
    id: 'ambient-2',
    title: 'Soundscape II: Cybernetic Meditation',
    artist: 'Arifur Sound Studio',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    slug: 'cybernetic-meditation',
    duration: '2:50',
  }},
  {{
    id: 'ambient-3',
    title: 'Soundscape III: Metropolitan Pulse',
    artist: 'Arifur Sound Studio',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    slug: 'metropolitan-pulse',
    duration: '4:12',
  }},
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
"""

with open('/mnt/4C60490919A46293/antigravity/autosund/web/src/data/artworks.ts', 'w') as f:
    f.write(web_ts_content)

print("Saved web/src/data/artworks.ts with 68 artworks!")

# 2. Generate mobile/lib/data/artworks_data.dart
dart_items = []
for a in artworks_data:
    dart_items.append(f"""    Artwork(
      id: '{a['id']}',
      title: '{a['title'].replace("'", "\\'")}',
      category: '{a['category']}',
      medium: '{a['medium'].replace("'", "\\'")}',
      year: '{a['year']}',
      dimensions: '{a['dimensions']}',
      imageUrl: '{a['mobileImageUrl']}',
      audioUrl: '{a['audioUrl']}',
      audioTitle: '{a['audioTitle'].replace("'", "\\'")}',
      audioDuration: '{a['audioDuration']}',
      price: {a['price']},
      isFeatured: {'true' if a['isFeatured'] else 'false'},
      description: '{a['description'].replace("'", "\\'")}',
    ),""")

dart_content = f"""import '../models/artwork.dart';

class ArtworksData {{
  static const String ambientAudioUrl = 'assets/audio/prankaudio.mp3';

  static const List<Artwork> artworks = [
{chr(10).join(dart_items)}
  ];

  static const List<String> categories = [
    'All',
    'Portrait',
    'Creative',
    'Tech & Art',
    'Visual',
    'Aesthetic',
    'Urban',
  ];
}}
"""

with open('/mnt/4C60490919A46293/antigravity/autosund/mobile/lib/data/artworks_data.dart', 'w') as f:
    f.write(dart_content)

print("Saved mobile/lib/data/artworks_data.dart with 68 artworks!")
