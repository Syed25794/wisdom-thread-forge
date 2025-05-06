
// Mock data for threads
export const mockThreads = [
  {
    id: "1",
    title: "How to Become a More Effective Learner",
    author: {
      id: "a1",
      name: "Alex Johnson",
      avatar: "https://i.pravatar.cc/150?img=1"
    },
    segments: [
      {
        id: "s1",
        content: "The key to effective learning isn't spending more time, it's spending time more deliberately. Quality over quantity applies to knowledge acquisition too."
      },
      {
        id: "s2",
        content: "Active recall beats passive review every time. Don't just reread material—quiz yourself on it. The effort to retrieve information strengthens neural pathways."
      },
      {
        id: "s3",
        content: "Spaced repetition is your friend. Review material at increasingly longer intervals. This fights against the forgetting curve."
      },
      {
        id: "s4",
        content: "Interleaved practice beats massed practice. Mix up different but related topics instead of focusing on one thing for too long."
      }
    ],
    tags: ["Learning", "Productivity", "Mindset"],
    reactions: {
      "🧠": 42,
      "🔥": 18,
      "👏": 31,
      "👀": 15,
      "⚠️": 2
    },
    bookmarks: 67,
    forks: 12,
    createdAt: "2023-04-15T10:30:00Z"
  },
  {
    id: "2",
    title: "Career Advice I Wish I Had at 25",
    author: {
      id: "a2",
      name: "Maya Rodriguez",
      avatar: "https://i.pravatar.cc/150?img=5"
    },
    segments: [
      {
        id: "s1",
        content: "Your network is your net worth. The people you surround yourself with shape your opportunities more than almost anything else."
      },
      {
        id: "s2",
        content: "Becoming good at communicating complex ideas simply is a career superpower. Practice explaining difficult concepts to people outside your field."
      },
      {
        id: "s3",
        content: "Develop T-shaped skills: deep expertise in one area, with broad knowledge across related domains. Specialists who can speak multiple 'languages' are rare and valuable."
      }
    ],
    tags: ["Career", "Growth", "Advice"],
    reactions: {
      "🧠": 56,
      "🔥": 29,
      "👏": 47,
      "👀": 23,
      "⚠️": 5
    },
    bookmarks: 103,
    forks: 27,
    createdAt: "2023-04-02T14:20:00Z"
  },
  {
    id: "3",
    title: "Digital Minimalism: Finding Balance",
    author: {
      id: "a3",
      name: "Taylor Kim",
      avatar: "https://i.pravatar.cc/150?img=3"
    },
    segments: [
      {
        id: "s1",
        content: "Technology should be a tool, not your master. If you feel anxious when separated from your phone, that's a warning sign."
      },
      {
        id: "s2",
        content: "Schedule dedicated time for deep work—at least 2 hours without digital distractions. Your brain needs time to make meaningful connections."
      },
      {
        id: "s3",
        content: "Digital sabbaths—even just one day a month—can provide perspective on your relationship with technology."
      },
      {
        id: "s4",
        content: "Delete apps that don't serve your values. Each notification is designed to pull your attention away from the present moment."
      }
    ],
    tags: ["Digital Wellness", "Productivity", "Mindfulness"],
    reactions: {
      "🧠": 38,
      "🔥": 12,
      "👏": 25,
      "👀": 19,
      "⚠️": 3
    },
    bookmarks: 72,
    forks: 14,
    createdAt: "2023-03-28T09:45:00Z"
  }
];

// Mock data for collections
export const mockCollections = [
  {
    id: "c1",
    name: "Career Development",
    description: "Insights for professional growth and advancement",
    threads: ["2"],
    isPrivate: false
  },
  {
    id: "c2",
    name: "Personal Growth",
    description: "Ideas for becoming my best self",
    threads: ["1", "3"],
    isPrivate: true
  }
];

// Mock user data
export const mockUser = {
  id: "u1",
  name: "Jordan Smith",
  email: "jordan@example.com",
  avatar: "https://i.pravatar.cc/150?img=8",
  bookmarkedThreads: ["1", "3"],
  collections: ["c1", "c2"],
  createdThreads: []
};
