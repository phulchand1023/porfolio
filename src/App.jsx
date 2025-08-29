import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import pic from "./assets/pk7715.png";

// --- STYLES ---
// In a real React app, this would be in an App.css file.
// For this self-contained example, we include it directly.
const GlobalStyles = () => (
  <style>{`
    .gradient-text {
        background: linear-gradient(90deg, #3b82f6, #8b5cf6);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
    }

    .nav-link {
        position: relative;
    }

    .nav-link:after {
        content: '';
        position: absolute;
        width: 0;
        height: 2px;
        bottom: 0;
        left: 0;
        background-color: #3b82f6;
        transition: width 0.3s ease;
    }

    .nav-link:hover:after {
        width: 100%;
    }

    .skill-badge {
        transition: transform 0.2s ease;
    }

    .skill-badge:hover {
        transform: scale(1.1);
        cursor: pointer;
    }

    .profile-img-container {
        transition: transform 0.4s ease-out, box-shadow 0.4s ease-out;
    }

    .profile-img-container:hover {
        transform: scale(1.05) rotate(3deg);
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    }
    
    /* Simple typing cursor simulation */
    .typed-cursor {
      opacity: 1;
      animation: blink 0.7s infinite;
    }
    @keyframes blink {
      0% { opacity: 1; }
      50% { opacity: 0; }
      100% { opacity: 1; }
    }
  `}</style>
);

// --- COMPONENTS ---

const AnimateOnScroll = ({ children }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current); // Stop observing once in view
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref]);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 50 },
      }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

const Navbar = ({ handleThemeSwitch, theme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (e) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute("href");
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });
    }
    setIsOpen(false);
  };

  return (
    <nav
      className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm fixed w-full z-20 transition-all duration-300 ${
        isScrolled ? "shadow-lg" : "shadow-sm"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <span className="text-xl font-bold gradient-text">
              Phulchand Kumar
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#about"
              onClick={handleLinkClick}
              className="nav-link text-gray-700 dark:text-gray-300 hover:text-blue-500 px-3 py-2"
            >
              About
            </a>
            <a
              href="#skills"
              onClick={handleLinkClick}
              className="nav-link text-gray-700 dark:text-gray-300 hover:text-blue-500 px-3 py-2"
            >
              Skills
            </a>
            <a
              href="#projects"
              onClick={handleLinkClick}
              className="nav-link text-gray-700 dark:text-gray-300 hover:text-blue-500 px-3 py-2"
            >
              Projects
            </a>
            <a
              href="#resume"
              onClick={handleLinkClick}
              className="nav-link text-gray-700 dark:text-gray-300 hover:text-blue-500 px-3 py-2"
            >
              Resume
            </a>
            <a
              href="#contact"
              onClick={handleLinkClick}
              className="nav-link text-gray-700 dark:text-gray-300 hover:text-blue-500 px-3 py-2"
            >
              Contact
            </a>
            <button
              onClick={handleThemeSwitch}
              className="text-gray-700 dark:text-gray-300 focus:outline-none text-xl w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center transition-colors"
            >
              {theme === "dark" ? (
                <i className="fas fa-sun"></i>
              ) : (
                <i className="fas fa-moon"></i>
              )}
            </button>
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={handleThemeSwitch}
              className="text-gray-700 dark:text-gray-300 focus:outline-none mr-4 text-xl w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center transition-colors"
            >
              {theme === "dark" ? (
                <i className="fas fa-sun"></i>
              ) : (
                <i className="fas fa-moon"></i>
              )}
            </button>
            <button
              id="menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 dark:text-gray-300 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div
        id="mobile-menu"
        className={`md:hidden ${
          isOpen ? "block" : "hidden"
        } bg-white dark:bg-gray-800 shadow-lg`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a
            href="#about"
            onClick={handleLinkClick}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-500 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            About
          </a>
          <a
            href="#skills"
            onClick={handleLinkClick}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-500 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            Skills
          </a>
          <a
            href="#projects"
            onClick={handleLinkClick}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-500 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            Projects
          </a>
          <a
            href="#resume"
            onClick={handleLinkClick}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-500 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            Resume
          </a>
          <a
            href="#contact"
            onClick={handleLinkClick}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-500 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
};

const Hero = () => (
  <section className="pt-24 pb-16 md:pt-32 md:pb-24 px-4">
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row items-center">
        <motion.div
          className="md:w-1/2 mb-8 md:mb-0"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Hi, I'm <span className="gradient-text">Phulchand Kumar</span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-600 dark:text-gray-400 mb-6">
            Computer Science Student & Web Developer
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Passionate about creating beautiful, functional web applications
            with clean, efficient code.
          </p>
          <div className="flex space-x-4">
            <a
              href="#projects"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition duration-300 transform hover:scale-105"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-medium transition duration-300 transform hover:scale-105"
            >
              Contact Me
            </a>
          </div>
        </motion.div>
        <motion.div
          className="md:w-1/2 flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="w-64 h-64 md:w-80 md:h-80 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full overflow-hidden shadow-xl profile-img-container">
            <img
              src={pic}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

const About = () => (
  <section id="about" className="py-16 px-4 bg-white dark:bg-gray-800">
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-12 gradient-text">
        About Me
      </h2>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <h3 className="text-2xl font-semibold mb-4">Who I Am</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            I'm a third-year Computer Science student at Chandigarh University
            with a passion for web development and design. I love turning
            complex problems into simple, beautiful, and intuitive solutions.
          </p>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            When I'm not coding, you can find me hiking, reading sci-fi novels,
            or experimenting with new recipes in the kitchen.
          </p>
        </div>
        <div className="md:w-1/2">
          <h3 className="text-2xl font-semibold mb-4">Education</h3>
          <div className="space-y-6">
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-bold text-lg">Chandigarh University</h4>
              <p className="text-gray-600 dark:text-gray-400">
                B.E in Computer Science
              </p>
              <p className="text-gray-500 dark:text-gray-500 text-sm">
                2023 - Present | GPA: 8.28/10.0{" "}
              </p>
            </div>
            <div className="border-l-4 border-purple-500 pl-4">
              <h4 className="font-bold text-lg">Relevant Coursework</h4>
              <p className="text-gray-600 dark:text-gray-400">
                Web Development, Data Structures, Algorithms, Database Systems,
                Human-Computer Interaction
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Skills = () => {
  const skillContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const skillItemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="skills" className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 gradient-text">
          My Skills
        </h2>
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          variants={skillContainerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm"
            variants={skillItemVariants}
          >
            <h3 className="font-bold text-lg mb-4 flex items-center">
              <i className="fas fa-code mr-2 text-blue-500"></i> Languages
            </h3>
            <div className="flex flex-wrap gap-2">
              <span className="skill-badge bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                JavaScript
              </span>
              <span className="skill-badge bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                Python
              </span>
              <span className="skill-badge bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                Java
              </span>
              <span className="skill-badge bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                C++
              </span>
              <span className="skill-badge bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                HTML/CSS
              </span>
              <span className="skill-badge bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                SQL
              </span>
            </div>
          </motion.div>
          <motion.div
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm"
            variants={skillItemVariants}
          >
            <h3 className="font-bold text-lg mb-4 flex items-center">
              <i className="fas fa-paint-brush mr-2 text-purple-500"></i>{" "}
              Frontend
            </h3>
            <div className="flex flex-wrap gap-2">
              <span className="skill-badge bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                React
              </span>
              <span className="skill-badge bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                Next.js
              </span>
              <span className="skill-badge bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                Tailwind CSS
              </span>
              <span className="skill-badge bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                Bootstrap
              </span>
              <span className="skill-badge bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                SASS
              </span>
            </div>
          </motion.div>
          <motion.div
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm"
            variants={skillItemVariants}
          >
            <h3 className="font-bold text-lg mb-4 flex items-center">
              <i className="fas fa-server mr-2 text-green-500"></i> Backend
            </h3>
            <div className="flex flex-wrap gap-2">
              <span className="skill-badge bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                Node.js
              </span>
              <span className="skill-badge bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                Express
              </span>
              <span className="skill-badge bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                Django
              </span>
              <span className="skill-badge bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                MongoDB
              </span>
              <span className="skill-badge bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                PostgreSQL
              </span>
            </div>
          </motion.div>
          <motion.div
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm"
            variants={skillItemVariants}
          >
            <h3 className="font-bold text-lg mb-4 flex items-center">
              <i className="fas fa-tools mr-2 text-yellow-500"></i> Tools
            </h3>
            <div className="flex flex-wrap gap-2">
              <span className="skill-badge bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                Git
              </span>
              <span className="skill-badge bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                VS Code
              </span>
              <span className="skill-badge bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                Figma
              </span>
              <span className="skill-badge bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                Postman
              </span>
              <span className="skill-badge bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                Docker
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const Projects = () => {
  // This would typically come from an API call
  const [projects, setProjects] = useState([
    {
      _id: "1",
      title: "StudyBuddy - Learning Platform",
      description:
        "A full-stack web application for students to create and share study materials, featuring real-time collaboration.",
      tags: ["React", "Node.js", "MongoDB"],
      liveLink: "#",
      sourceLink: "#",
      icon: "fa-laptop-code",
      gradient: "from-blue-400 to-purple-500",
    },
    {
      _id: "2",
      title: "EcoMarket - Sustainable Shopping",
      description:
        "An e-commerce platform for sustainable products with carbon footprint tracking and eco-friendly recommendations.",
      tags: ["Next.js", "Django", "PostgreSQL"],
      liveLink: "#",
      sourceLink: "#",
      icon: "fa-shopping-cart",
      gradient: "from-green-400 to-blue-500",
    },
    {
      _id: "3",
      title: "StockVisualizer",
      description:
        "Interactive stock market visualization tool with real-time data from financial APIs and customizable dashboards.",
      tags: ["TypeScript", "Firebase", "D3.js"],
      liveLink: "#",
      sourceLink: "#",
      icon: "fa-chart-line",
      gradient: "from-purple-400 to-pink-500",
    },
  ]);

  const getTagColor = (tag) => {
    switch (tag.toLowerCase()) {
      case "react":
      case "next.js":
      case "typescript":
        return "bg-blue-100 text-blue-800";
      case "node.js":
      case "postgresql":
        return "bg-green-100 text-green-800";
      case "mongodb":
      case "d3.js":
        return "bg-purple-100 text-purple-800";
      case "django":
        return "bg-yellow-100 text-yellow-800";
      case "firebase":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <section id="projects" className="py-16 px-4 bg-white dark:bg-gray-800">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 gradient-text">
          My Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <motion.div
              key={project._id}
              className="project-card bg-white dark:bg-gray-700 rounded-xl overflow-hidden shadow-md border border-gray-100 dark:border-gray-600"
              whileHover={{
                y: -10,
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              transition={{ duration: 0.3 }}
            >
              <div
                className={`h-48 bg-gradient-to-r ${project.gradient} flex items-center justify-center`}
              >
                <i className={`fas ${project.icon} text-white text-6xl`}></i>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`${getTagColor(
                        tag
                      )} px-2 py-1 rounded-full text-xs`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex space-x-3">
                  <a
                    href={project.liveLink}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Live Demo
                  </a>
                  <a
                    href={project.sourceLink}
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-800 font-medium"
                  >
                    Source Code
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-12">
          <a
            href="#"
            className="inline-block border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-medium transition duration-300 transform hover:scale-105"
          >
            View All Projects
          </a>
        </div>
      </div>
    </section>
  );
};

const Resume = () => (
  <section id="resume" className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-12 gradient-text">
        My Resume
      </h2>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 max-w-3xl mx-auto">
        <div className="flex flex-col md:flex-row items-center mb-8">
          <div className="md:w-1/3 mb-6 md:mb-0 flex justify-center">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full overflow-hidden shadow-lg">
              <img
                src={pic}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="md:w-2/3 md:pl-8 text-center md:text-left">
            <h3 className="text-2xl font-bold mb-2">Phulchand Kumar</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              Computer Science Student
            </p>
            <p className="text-gray-500 dark:text-gray-500 text-sm">
              <i className="fas fa-map-marker-alt mr-1"></i> Chandigarh
              University, IND
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="font-bold text-lg mb-4 border-b dark:border-gray-700 pb-2">
              Education
            </h4>
            <div className="mb-6">
              <h5 className="font-semibold">Chandigarh University</h5>
              <p className="text-gray-600 dark:text-gray-400">
                B.E in Computer Science
              </p>
              <p className="text-gray-500 dark:text-gray-500 text-sm">
                2023 - Present
              </p>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4 border-b dark:border-gray-700 pb-2">
              Experience
            </h4>
            <div className="mb-6">
              <h5 className="font-semibold">Web Development Intern</h5>
              <p className="text-gray-600 dark:text-gray-400">freelance.com</p>
              <p className="text-gray-500 dark:text-gray-500 text-sm">
                Summer 2025
              </p>
            </div>
            <div className="mb-6">
              <h5 className="font-semibold">Teaching Assistant</h5>
              <p className="text-gray-600 dark:text-gray-400">
                Chandigarh University CS Department
              </p>
              <p className="text-gray-500 dark:text-gray-500 text-sm">
                2022 - Present
              </p>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <a
            href="#"
            className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition duration-300"
          >
            <i className="fas fa-download mr-2"></i> Download Full Resume (PDF)
          </a>
        </div>
      </div>
    </div>
  </section>
);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.id]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
    // Mock API call
    setTimeout(() => {
      setStatus("Message sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1000);
  };

  return (
    <section id="contact" className="py-16 px-4 bg-white dark:bg-gray-800">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 gradient-text">
          Get In Touch
        </h2>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2">
            <h3 className="text-2xl font-semibold mb-4">Contact Information</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              I'm currently looking for internship opportunities for Summer
              2025. Feel free to reach out!
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <i className="fas fa-envelope text-blue-600"></i>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Email</p>
                  <a
                    href="mailto:alex.carter@example.com"
                    className="text-gray-800 dark:text-gray-300 hover:text-blue-600"
                  >
                    phulchand1023@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <i className="fab fa-linkedin-in text-blue-600"></i>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">LinkedIn</p>
                  <a
                    href="https://linkedin.com/in/phulchand1023"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-800 dark:text-gray-300 hover:text-blue-600"
                  >
                    linkedin.com/in/phulchand1023
                  </a>
                </div>
              </div>
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <i className="fab fa-github text-blue-600"></i>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">GitHub</p>
                  <a
                    href="https://github.com/phulchand1023"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-800 dark:text-gray-300 hover:text-blue-600"
                  >
                    github.com/phulchand1023
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-1/2">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition duration-300"
              >
                Send Message
              </button>
              {status && <p className="text-center mt-2">{status}</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-gray-900 text-white py-8 px-4">
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <span className="text-xl font-bold gradient-text">
            Phulchand Kumar
          </span>
          <p className="text-gray-400 mt-1">
            Web Developer & Computer Science Student
          </p>
        </div>
        <div className="flex space-x-6">
          <a
            href="#"
            className="text-gray-400 hover:text-white transition duration-300"
          >
            <i className="fab fa-github text-xl"></i>
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-white transition duration-300"
          >
            <i className="fab fa-linkedin-in text-xl"></i>
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-white transition duration-300"
          >
            <i className="fab fa-twitter text-xl"></i>
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-white transition duration-300"
          >
            <i className="fab fa-instagram text-xl"></i>
          </a>
        </div>
      </div>
      <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
        <p>&copy; 2023 Phulchand Kumar. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

// --- MAIN APP COMPONENT ---

function App() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="bg-gray-50 font-sans text-gray-800 dark:bg-gray-900 dark:text-gray-200 transition-colors duration-300">
      <GlobalStyles />
      <Navbar handleThemeSwitch={handleThemeSwitch} theme={theme} />
      <Hero />
      <AnimateOnScroll>
        <About />
      </AnimateOnScroll>
      <AnimateOnScroll>
        <Skills />
      </AnimateOnScroll>
      <AnimateOnScroll>
        <Projects />
      </AnimateOnScroll>
      <AnimateOnScroll>
        <Resume />
      </AnimateOnScroll>
      <AnimateOnScroll>
        <Contact />
      </AnimateOnScroll>
      <Footer />
    </div>
  );
}

export default App;
