const API_BASE_URL =
    import.meta.env.VITE_API_URL || "https://portfolio-backend-ub68.onrender.com";

class ApiService {
    async fetchPortfolioData() {
        try {
            const response = await fetch(`${API_BASE_URL}/portfolio`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return {
                ...data,
                projects: this.getProjectData(),
            };
        } catch (error) {
            console.error("Error fetching portfolio data:", error);
            // Fallback to static data if API fails
            return this.getStaticPortfolioData();
        }
    }

    async sendContactEmail(contactData) {
        try {
            const response = await fetch(`${API_BASE_URL}/contact`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(contactData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error("Error sending contact email:", error);
            throw error;
        }
    }

    getProjectData() {
        return [{
                id: "portfolio-001",
                name: "Portfolio Website",
                featured: true,
                category: "Web",
                description: "Personal portfolio website showcasing projects and skills",
                fullDescription: "A responsive portfolio site built with React, featuring project showcases, skills visualization, and contact information.",
                tech: ["React", "Tailwind CSS", "Vite"],
                image: "/images/portfolio.png",
                links: {
                    live: "",
                    github: "https://github.com/optimisticnyangila-png/PORTFOLIO",
                    demo: "",
                },
            },
            {
                id: "kevine-nyangila-001",
                name: "KevineNyangila",
                featured: false,
                category: "Web",
                description: "Personal developer project by Kevine Nyangila",
                fullDescription: "A GitHub project showcasing Kevine Nyangila's development work and technical growth.",
                tech: ["HTML", "CSS", "JavaScript"],
                image: "/images/default.png",
                links: {
                    live: "",
                    github: "https://github.com/optimisticnyangila-png/KevineNyangila",
                    demo: "",
                },
            },
            {
                id: "viral-studio-001",
                name: "Viral-Studio",
                featured: false,
                category: "Web",
                description: "Creative studio project for digital content and web presence",
                fullDescription: "Viral-Studio is a creative web project focused on presenting digital studio services and modern online branding.",
                tech: ["HTML", "CSS", "JavaScript"],
                image: "/images/default.png",
                links: {
                    live: "",
                    github: "https://github.com/optimisticnyangila-png/Viral-Studio",
                    demo: "",
                },
            },
        ];
    }

    // Fallback static data in case API is down
    getStaticPortfolioData() {
        return {
            name: "Kevine Nyangila",
            title: "Full Stack Developer",
            tagline: "Building smart web applications that simplify digital workflows",
            profileImage: "/images/profile.jpg",
            bio: "Full stack developer passionate about building modern, scalable, and user-friendly web applications. Skilled in both frontend and backend development with a strong foundation in programming, problem-solving, and system design.",
            cv: "https://eu.wps.com/l/cbPaspXQ4Vwj6qb9",
            social: {
                email: "optimisticnyangila@gmail.com",
                github: "https://github.com/optimisticnyangila-png",
                linkedinLabel: "Kevine nyangila",
                linkedin: "https://www.linkedin.com/in/kevine-nyangila-8a51b7407/",
                twitter: "https://x.com/ONyangila99940",
                facebook: "https://www.facebook.com/kevin.nyangila",
                youtube: "https://www.youtube.com/channel/UC2VyPm_Qer2Cs7EqMDQ-EuA",
            },
            skills: [
                { name: "React", level: 88, group: "Frontend" },
                { name: "HTML", level: 92, group: "Frontend" },
                { name: "CSS", level: 84, group: "Frontend" },
                { name: "JavaScript", level: 90, group: "Frontend" },
                { name: "Node.js", level: 82, group: "Backend" },
                { name: "Express", level: 80, group: "Backend" },
                { name: "Python", level: 72, group: "Languages" },
                { name: "Java", level: 70, group: "Languages" },
                { name: "C++", level: 66, group: "Languages" },
                { name: "MongoDB", level: 78, group: "Databases and Tools" },
                { name: "Firebase", level: 74, group: "Databases and Tools" },
                { name: "Git", level: 82, group: "Databases and Tools" },
                { name: "REST APIs", level: 88, group: "Databases and Tools" },
            ],
            projects: this.getProjectData(),
            experience: [{
                    title: "Full Stack Developer (Self-Driven Projects)",
                    period: "2025 - Present",
                    details: "Building full-stack applications, improving backend architecture, and sharpening UI/UX quality through practical project delivery.",
                },
                {
                    title: "Secondary Education and University",
                    details: "Attained Grade B Plain and currently at Kisii University taking  Bachelor of  Science in Computer science.",
                },
            ],
            testimonials: [],
            insights: [],
        };
    }
}

export default new ApiService();
