export const COMMON_VIDEO_COMPONENTS = {
    "VideoStartScreen": [{
        "component": "VideoStartScreen",
        title: "Let's Begin",
        subtitle: "Get ready for some fun!",
        logoUrl: "",
        backgroundImage: "",
        delay: 0.5,
        theme: 'midnight',
        isVertical: true,
        disableTts: true,
    }],
    "VideoEndScreen": [{
        "component": "VideoEndScreen",
        "thanksMessage": "Thanks for Watching!",
        "subscribeText": "Don't forget to like, subscribe and hit the bell icon for notifications!",
        "channelName": "Blooming Bud Kids",
        "delay": 0.5,
        "theme": "midnight",
        "isVertical": true,
        "disableTts": false
    }],
    "VideoIntermediateScreen": [{
        "component": "VideoIntermediateScreen",
        "title": "Up Next",
        "subtitle": "Math Quiz Challenge",
        "nextContent": "Test your math skills with fun questions!",
        "duration": 5,
        "delay": 0.5,
        "disableTts": false,
        "theme": "midnight",
        "isVertical": true
    }],
}

export const LATEST_TECH_VIDEO_COMPONENTS = {
    "MobileDetails": [{
        "component": "MobileDetails",
        "title": "Apple iPad Air 5th Gen 5G Tablet (256GB)",
        "image":
            "https://cdn1.smartprix.com/rx-iM3VA3pOH-w420-h420/apple-ipad-air-5th-g.webp",
        "points": [
            "A sleek and powerful tablet with a 10.9-inch Liquid Retina IPS LCD display and a 12 MP rear camera that can record 4K videos.",
            "A single SIM device that supports 5G, VoLTE, wifi-hotspot, USB-C and USB on-the-go features for fast and seamless connectivity.",
            "A side-mounted fingerprint sensor and face unlock for enhanced security and convenience.",
            "An octa-core Apple M1 processor and an Apple GPU (8-core graphics) for smooth performance and stunning graphics.",
            "A 256 GB internal storage that can store all your photos, videos, music and documents without a card slot.",
            "A non-removable Li-Po battery that can last up to 10 hours of talk time and supports 20W fast charging with a USB-C power adapter.",
            "An iOS v15 operating system that offers a user-friendly interface and access to a variety of apps and services."
        ],
        "isVertical": false,
        "disableTts": false,
    }],
    "TechQuickSpecs": [
        {
            component: "TechQuickSpecs",
            short_title: "iQOO Z11x 5G Smartphone",
            image: "https://m.media-amazon.com/images/I/61HBOs7MdQL._SX679_.jpg",
            attributes: [
                { type: "processor", value: "Dimensity 7400 Turbo", description: "octa-core Dimensity 7400 Turbo chipset" },
                { type: "battery", value: "7200mAh", description: "7200mAh battery with 6-year longevity" },
                { type: "screen_size", value: "", description: "" },
                { type: "screen_type", value: "", description: "" },
                { type: "rear_camera", value: "50MP", description: "50MP Sony IMX 852 Ultra-HD AI-powered rear camera" },
                { type: "front_camera", value: "32MP", description: "32MP front camera" },
                { type: "charging", value: "44W Fast Charge", description: "44W FlashCharge with 25-Dimension Security Protection" },
                { type: "ram", value: "", description: "" },
                { type: "storage", value: "256GB", description: "256GB UFS 3.1 storage" },
                { type: "warranty", value: "", description: "" },
                { type: "network", value: "5G", description: "5G-ready network support" },
                { type: "wifi", value: "", description: "" },
                { type: "bluetooth", value: "", description: "" },
                { type: "water_resistance", value: "IP68/IP69+", description: "IP68 and IP69+ dust/water resistance" },
                { type: "durability", value: "Military Grade", description: "Military-grade durability" },
                { type: "security", value: "25-Dimensional", description: "25-Dimension Security Protection with PPS support" },
                { type: "operating_system", value: "OriginOS 6", description: "OriginOS 6 with 2-year updates and 4-year security patches" },
                { type: "ai_features", value: "AI Captions, Creation, Transcript Assist", description: "AI-powered features for enhanced usability" },
                { type: "cooling", value: "", description: "" },
                { type: "speakers", value: "", description: "" },
                { type: "microphone", value: "", description: "" },
                { type: "sensors", value: "", description: "" },
                { type: "nfc", value: "", description: "" },
                { type: "color", value: "", description: "" },
                { type: "weight", value: "", description: "" },
                { type: "dimensions", value: "", description: "" },
            ],
            maxSpecs: 6,
        }
    ]
}

export const BLOOMING_BUD_VIDEO_COMPONENTS = {
    Anagram: [{
        component: "Anagram",
        type: "word",
        answer: "ENIGMA",
        scrambled: "GEMANI",
        answer: "ENIGMA",
        hint: "A person or thing that is mysterious",
        theme: "midnight",
        footer: "VOCABULARY CHALLENGE",
        isVertical: true,
        disableTts: false,
    }],
    EmojiOddOneOut: [{
        component: "EmojiOddOneOut",
        title: "Find the Odd Emoji!",
        common_emoji: "🍎",
        odd_emoji: "🍊",
        grid_rows: 8,
        grid_cols: 5,
        odd_position: 17,
        reason: "The orange is different from all the apples!",
        theme: "midnight",
        footer: "SUBSCRIBE FOR MORE PUZZLES",
        delay: 1,
        isVertical: true,
        disableTts: false,
    }],
    FillInTheBlanks: [{
        component: "FillInTheBlanks",
        delay: 1,
        sentence: "The red planet in our solar system is ____.",
        missing_word: "Mars",
        hint: "Think of Elon Musk's goal",
        theme: "nebula",
        footer: "SPACE EXPLORATION",
        isVertical: true,
        disableTts: false,
    }],
    LearnToSpell: [{
        "component": "LearnToSpell",
        "word": "dog",
        "image": "https://freesvg.org/img/Gerald-G-Dog-Simple-Drawing-1.png",
        "isVertical": true,
        "disableTts": false,
    }],
    MatchingPairs: [{
        component: "MatchingPairs",
        title: "Match Capitals",
        left_items: ["India", "USA", "UK"],
        right_items: ["New Delhi", "London", "Washington D.C."],
        pairs: [[0, 0], [1, 2], [2, 1]],
        theme: "midnight",
        footer: "GEOGRAPHY CHALLENGE",
        delay: 2,
        isVertical: true,
        disableTts: false,
    }],
    Mcq: [{
        "component": "Mcq",
        "delay": 1,
        "question": "What is the primary benefit of investing in a diversified mutual fund?",
        "options": [
            "Higher returns with zero risk",
            "Liquidity and ease of withdrawal",
            "Reduced risk through portfolio diversification",
            "Guaranteed returns with no management fees",
        ],
        "correct_option_index": 2,
        "footer": "SUBSCRIBE FOR MORE QUIZZES",
        "theme": "midnight",
        "isVertical": true,
        "disableTts": false,
    }],
    MemoryGame: [
        {
            "component": "MemoryGame",
            "video_title": "Memory Game",
            "title": "Memory Game",
            "images": [
                "http://mac.mini:8800/shared-data/11767.png",
                "http://mac.mini:8800/shared-data/11761.png",
                "http://mac.mini:8800/shared-data/11755.png",
                "http://mac.mini:8800/shared-data/11773.png",
                "http://mac.mini:8800/shared-data/11739.png",
                "http://mac.mini:8800/shared-data/11737.png"
            ],
            "targetIndex": 1,
            "gridColumns": 3,
            "timerDuration": 10,
            "rememberDuration": 10,
            "theme": "midnight",
            "channelName": "BloomingBud Kids",
            "delay": 2,
            "disableTts": false,
            "paths": {
                "backup_data": "/home/node/.n8n-files/backup_data",
                "internal_out_data": "/home/node/.n8n-files/shared_data",
                "host_out_path": "/Users/sanchit.gupta/Software/shared_data"
            },
            "tts": {
                "tts_engine": "kokoro",
                "tts_voice": "af_heart",
                "bb_tts_engine": "kokoro",
                "bb_tts_voice": "af_bella",
                "finance_tts_engine": "kokoro",
                "finance_tts_voice": "af_bella:10,am_eric:90"
            }
        }
    ],
    OddOneOut: [{
        component: "OddOneOut",
        title: "Which One Doesn't Belong?",
        items: [
            { emoji: "🍎", text: "Apple" },
            { emoji: "🍌", text: "Banana" },
            { emoji: "🥕", text: "Carrot" },
            { emoji: "🍇", text: "Grapes" }
        ],
        odd_index: 2,
        category: "Food Groups",
        reason: "Carrot is a vegetable, while the others are fruits!",
        theme: "midnight",
        footer: "SUBSCRIBE FOR MORE PUZZLES",
        delay: 1,
        isVertical: true,
        disableTts: false,
    }],
    TrueOrFalse: [{
        component: "TrueOrFalse",
        statement: "Bananas are technically berries.",
        isTrue: true,
        explanation: "In botanical terms, a berry is a fleshy fruit produced from a single ovary. This makes bananas berries, while strawberries are actually aggregate fruits!",
        delay: 1,
        theme: "nebula",
        footer: "SUBSCRIBE FOR MORE QUIZZES",
        isVertical: true,
        disableTts: false,
    }],
}

export const WEALTH_WYNE_VIDEO_COMPONENTS = {
    GoldAndSilverPrices: [{
        component: "GoldSilverPrices",
        theme: "midnight",
        gold: 14750.3,
        gold_previous: 14720.4,
        silver: 231,
        silver_previous: 238.275,
        gold_change_percent: "0.20",
        silver_change_percent: "-3.05",
        "isVertical": true,
        "disableTts": false,
    }],
    StockGrowth: [{
        component: "StockGrowth",
        theme: "midnight",
        title: "How a Ten-Year Hold Doubled My Money",
        content: "What if your money doubled over a decade?\nI put 50000 rupees into Wipro Limited.\nI held it for 10 years.\nBack then the share price was 99 rupees.\nToday it trades at 201 rupees.\nMy stake is now worth 101077 rupees.\nThat's a return of 102.15 percent.",
        footer: "Subscribe for more investing insights.",
        "isVertical": true,
        "disableTts": false,
    }],
    PredictionMarket: [{
        component: "PredictionMarket",
        question: "Will Bitcoin hit $150K by end of 2026?",
        options: ["Bullish 🐂", "Bearish 🐻"],
        asset: "BTC",
        timeframe: "By Dec 2026",
        theme: "bloomberg",
        "isVertical": true,
        "disableTts": false,
    }]
}

const OTHER_VIDEO_COMPONENTS = {
    "Riddle": [{
        "component": "TextWithBackground",
        "messages": [
            {
                "voice": "Arthur",
                "content": "There once was a man so intelligent, that he was offered some information about the future. The man obviously accepted the generous offer. The devil of course didn't want the man to know it so the devil made it into a code. It said \"Tad level hell when min\" What did the letter really mean?",
                "delay": 5
            },
            {
                "voice": "Ruth",
                "content": "hell and heaven will meet"
            }
        ],
        "background": {
            "image": "",
            "video": "assets/videos/flying_ship.mp4"
        },
        "isVertical": true,
        "disableTts": false,
    }],
    "McqFinance": [{
        "component": "McqFinance",
        "data": {
            "question": "What is the main purpose of a hedge fund?",
            "options": ["To provide guaranteed returns", "To reduce portfolio risk", "To generate returns regardless of market conditions", "To offer high liquidity"]
        },
        "theme": {
            "pageBg": "bg-gradient-to-b from-gray-500 to-gray-800",
            "optionBg": "text-white bg-gradient-to-r from-gray-800 to-gray-700",
            "text": "text-white"
        },
        "isVertical": true,
        "disableTts": false,
    }],
    "SudokuVideo": [
        {
            "component": "SudokuVideoComponent",
            "puzzle": "427.6..35893547612516.2374.932....7467439.25.15827439626143958774.....2338.7.246.",
            "solution": "427861935893547612516923748932156874674398251158274396261439587749685123385712469",
            "scale": 1.5,
            "background": {
                "classNames": "bg-gradient-to-b from-green-600 to-yellow-400"
            },
            "isVertical": true,
            "disableTts": false,
        }
    ],
    "LinkedInCarouselSlide": [
        {
            "component": "LinkedInCarouselSlide",
            "slideNumber": {
                "current": 1,
                "total": 5
            },
            "palette": {
                "background": "#f5f5f5",
                "text": "#333333",
                "primary": "#0077b5",
                "secondary": "#ffffff"
            },
            "author": {
                "name": "John Doe",
                "handle": "@johndoe",
                "avatarUrl": "https://randomuser.me/api/portraits/men/1.jpg"
            },
            "brandLogoUrl": "https://upload.wikimedia.org/wikipedia/commons/4/4c/LinkedIn_logo_initials.png",
            "content": {
                "title": "Exciting News!",
                "body": "We are thrilled to announce our new product launch."
            },
            "footerText": "Learn more at our website."
        }
    ],
}

export const DATA_SAMPLES = {
    COMMON_VIDEO_COMPONENTS,
    LATEST_TECH_VIDEO_COMPONENTS,
    BLOOMING_BUD_VIDEO_COMPONENTS,
    WEALTH_WYNE_VIDEO_COMPONENTS,
    OTHER_VIDEO_COMPONENTS
}