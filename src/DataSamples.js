export const DATA_SAMPLES = {
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
        ]
    }],
    "LearnToSpell": [{
        "component": "LearnToSpell",
        "name": "dog",
        "image": "https://freesvg.org/img/Gerald-G-Dog-Simple-Drawing-1.png",
    }],
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
        }
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
        }
    }],
    "SudokuVideo": [
        {
            "component": "SudokuVideoComponent",
            "puzzle": "427.6..35893547612516.2374.932....7467439.25.15827439626143958774.....2338.7.246.",
            "solution": "427861935893547612516923748932156874674398251158274396261439587749685123385712469",
            "scale": 1.5,
            "background": {
                "classNames": "bg-gradient-to-b from-green-600 to-yellow-400"
            }
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
    // ----------------
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
        "correctOptionIndex": 2,
        "footer": "SUBSCRIBE FOR MORE QUIZZES",
        "theme": "midnight"
    }],
    TrueOrFalse: [{
        component: "TrueOrFalse",
        statement: "Bananas are technically berries.",
        isTrue: true,
        explanation: "In botanical terms, a berry is a fleshy fruit produced from a single ovary. This makes bananas berries, while strawberries are actually aggregate fruits!",
        delay: 1,
        theme: "nebula",
        footer: "SUBSCRIBE FOR MORE QUIZZES",
    }],
    Anagram: [{
        component: "Anagram",
        type: "word",
        scrambled: "ENIGMA",
        answer: "ENIGMA",
        scrambled: "GEMANI",
        answer: "ENIGMA",
        hint: "A person or thing that is mysterious",
        theme: "midnight",
        footer: "VOCABULARY CHALLENGE",
    }],
    MatchingPairs: [{
        component: "MatchingPairs",
        title: "Match Capitals",
        leftItems: ["France", "Japan", "India", "Egypt", "USA", "UK", "Germany", "Italy"],
        rightItems: ["Tokyo", "Cairo", "Paris", "New Delhi", "Washington D.C.", "London", "Berlin", "Rome"],
        pairs: [[0, 2], [1, 0], [2, 3], [3, 1], [4, 4], [5, 5], [6, 6], [7, 7]],
        theme: "midnight",
        footer: "GEOGRAPHY CHALLENGE",
        delay: 2
    }],
}