// Static sample data matching your Prisma schema
export const sampleCategories = [
  { id: "cat1", name: "Web Development", slug: "web-development", description: "Learn modern web technologies" },
  { id: "cat2", name: "Data Science", slug: "data-science", description: "Master data analysis and ML" },
  { id: "cat3", name: "Mobile Development", slug: "mobile-development", description: "Build iOS and Android apps" },
  { id: "cat4", name: "DevOps", slug: "devops", description: "Learn deployment and infrastructure" },
]

export const sampleInstructors = [
  {
    id: "inst1",
    userId: "user_inst1",
    slug: "john-doe",
    firstName: "John",
    lastName: "Doe",
    bio: "Senior Full Stack Developer with 10+ years experience",
    expertise: ["React", "Node.js", "TypeScript"],
    qualification: "MSc Computer Science",
    experienceYears: 10,
    rating: 4.8,
    profileImage: "/instructors/john.jpg",
    coursesCount: 5,
  },
  {
    id: "inst2",
    userId: "user_inst2",
    slug: "jane-smith",
    firstName: "Jane",
    lastName: "Smith",
    bio: "Data Scientist specialized in Machine Learning",
    expertise: ["Python", "TensorFlow", "Data Analysis"],
    qualification: "PhD Artificial Intelligence",
    experienceYears: 8,
    rating: 4.9,
    profileImage: "/instructors/jane.jpg",
    coursesCount: 3,
  },
]

export const sampleCourses = [
  {
    id: "course1",
    title: "Complete Web Development Bootcamp",
    slug: "complete-web-development-bootcamp",
    shortDescription: "Learn HTML, CSS, JavaScript, React, Node.js from scratch",
    longDescription: "A comprehensive course covering all aspects of modern web development...",
    price: 99.99,
    level: "ALL_LEVELS" as const,
    categoryId: "cat1",
    category: sampleCategories[0],
    isFeatured: true,
    isPublished: true,
    thumbnail: "/courses/web-dev.jpg",
    whatYouWillLearn: ["Build responsive websites", "Master React hooks", "Create REST APIs"],
    requirements: ["Basic computer knowledge"],
    durationHours: 120,
    instructors: [sampleInstructors[0]],
    modules: [
      {
        id: "mod1",
        weekNumber: 1,
        title: "HTML & CSS Basics",
        contents: [
          { id: "cont1", title: "Introduction to HTML", contentType: "VIDEO" as const, duration: 45 },
          { id: "cont2", title: "CSS Flexbox & Grid", contentType: "TEXT" as const, duration: 60 },
        ],
      },
      {
        id: "mod2",
        weekNumber: 2,
        title: "JavaScript Fundamentals",
        contents: [
          { id: "cont3", title: "ES6+ Features", contentType: "VIDEO" as const, duration: 90 },
        ],
      },
    ],
    enrollmentsCount: 1234,
    rating: 4.7,
  },
  {
    id: "course2",
    title: "Data Science with Python",
    slug: "data-science-with-python",
    shortDescription: "Master Python for data analysis and machine learning",
    longDescription: "Learn data manipulation, visualization, and ML algorithms...",
    price: 129.99,
    level: "INTERMEDIATE" as const,
    categoryId: "cat2",
    category: sampleCategories[1],
    isFeatured: true,
    isPublished: true,
    thumbnail: "/courses/data-science.jpg",
    whatYouWillLearn: ["Data cleaning", "Pandas & NumPy", "Scikit-learn"],
    requirements: ["Basic Python knowledge"],
    durationHours: 150,
    instructors: [sampleInstructors[1]],
    modules: [],
    enrollmentsCount: 856,
    rating: 4.8,
  },
]

export const sampleStudent = {
  id: "student1",
  userId: "user_student1",
  slug: "alamin",
  firstName: "Al Amin",
  lastName: "Hossain",
  profileImage: "/students/alamin.jpg",
  enrollments: [
    { courseId: "course1", course: sampleCourses[0], status: "ACTIVE" as const, enrolledAt: "2026-04-01" },
    { courseId: "course2", course: sampleCourses[1], status: "PENDING" as const, enrolledAt: "2026-04-15" },
  ],
  progress: [
    { courseId: "course1", progress: 65, completedContents: ["cont1", "cont2"] },
  ],
  certificates: [
    { id: "cert1", courseId: "course1", course: sampleCourses[0], issuedAt: "2026-03-15", certificateUrl: "/certs/cert1.pdf" },
  ],
}

export const sampleSessions = [
  {
    id: "sess1",
    title: "Live Q&A: Web Development Career Paths",
    instructor: sampleInstructors[0],
    type: "LIVE_CLASS" as const,
    semester: "ALL_LEVELS" as const,
    startTime: "2026-05-10T18:00:00",
    duration: 60,
    meetingUrl: "#",
  },
  {
    id: "sess2",
    title: "Support Session: Python Basics",
    instructor: sampleInstructors[1],
    type: "SUPPORT_SESSION" as const,
    semester: "FIRST" as const,
    startTime: "2026-05-12T14:00:00",
    duration: 45,
    meetingUrl: "#",
  },
]

export const sampleQuizzes = [
  {
    id: "quiz1",
    title: "HTML Basics Quiz",
    moduleId: "mod1",
    timeLimit: 30,
    passingScore: 70,
    questions: [
      {
        id: "q1",
        question: "What does HTML stand for?",
        options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyper Transfer Markup Language"],
        correctAnswer: 0,
      },
      {
        id: "q2",
        question: "Which tag is used for creating a hyperlink?",
        options: ["<link>", "<a>", "<href>"],
        correctAnswer: 1,
      },
    ],
  },
]

export const sampleBundles = [
  {
    id: "bundle1",
    title: "Full Stack Developer Bundle",
    slug: "full-stack-developer-bundle",
    description: "Master both frontend and backend development with this comprehensive bundle including Web Development and Data Science courses.",
    price: 199.99,
    isPublished: true,
    items: [
      { course: sampleCourses[0], priceAtBundleTime: 99.99 },
      { course: sampleCourses[1], priceAtBundleTime: 129.99 },
    ],
  },
  {
    id: "bundle2",
    title: "Data Science Mastery Bundle",
    slug: "data-science-mastery-bundle",
    description: "Become a data science expert with our curated collection of Python, ML, and analytics courses.",
    price: 249.99,
    isPublished: true,
    items: [
      { course: sampleCourses[1], priceAtBundleTime: 129.99 },
    ],
  },
  {
    id: "bundle3",
    title: "Mobile & Web Combo",
    slug: "mobile-web-combo",
    description: "Learn to build for both web and mobile platforms with this ultimate development bundle.",
    price: 179.99,
    isPublished: true,
    items: [
      { course: sampleCourses[0], priceAtBundleTime: 99.99 },
    ],
  },
]
