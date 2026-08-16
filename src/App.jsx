import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "./App.css";

import heroBg from "./assets/firstimage.png";
import aboutBG from "./assets/secondimage.png";

function App() {
  const [selectedDemo, setSelectedDemo] = useState("hover");
  const contactForm = useRef(null);
  const [isSending, setIsSending] = useState(false);
  const [emailStatus, setEmailStatus] = useState({
    type: "",
    message: "",
  });

  const sendContactEmail = (event) => {
    event.preventDefault();

    if (isSending) return;

    // ================= EMAILJS CONFIG =================

    const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    // Check if EmailJS environment variables are configured
    if (!serviceID || !templateID || !publicKey) {
      setEmailStatus({
        type: "error",
        message: "Email service is not configured yet.",
      });

      return;
    }

    setIsSending(true);

    setEmailStatus({
      type: "",
      message: "",
    });

    emailjs
      .sendForm(serviceID, templateID, contactForm.current, {
        publicKey: publicKey,
      })
      .then(() => {
        setEmailStatus({
          type: "success",
          message: "Thanks! Your message has been sent successfully.",
        });

        contactForm.current.reset();
      })
      .catch((error) => {
        console.error("Email error:", error);

        setEmailStatus({
          type: "error",
          message:
            "Sorry, your message could not be sent. Please try again.",
        });
      })
      .finally(() => {
        setIsSending(false);
      });
  };

  useEffect(() => {
    // ================= SCROLL REVEAL =================

    const elements = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    elements.forEach((element) => observer.observe(element));

    // ================= ABOUT PARALLAX =================

    const aboutSection = document.querySelector(".about-image");
    const aboutBg = document.querySelector(".about-bg");

    let ticking = false;

    const updateAboutParallax = () => {
      if (!aboutSection || !aboutBg) return;

      const rect = aboutSection.getBoundingClientRect();

      const progress =
        (window.innerHeight - rect.top) /
        (window.innerHeight + rect.height);

      const movement = (progress - 0.5) * 35;

      aboutBg.style.transform = `
        translate3d(0, ${movement}px, 0)
      `;

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateAboutParallax);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    updateAboutParallax();

    return () => {
      observer.disconnect();

      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // ================= CSS DEMOS =================

  const demos = {
    hover: {
      title: "Hover Effect",
      description:
        "Move your mouse over the box and watch it lift and glow.",
      code: `.box:hover {
  transform: translateY(-12px);
  border-color: #38bdf8;
  box-shadow:
    0 15px 40px
    rgba(56,189,248,.25);
}`,
    },

    click: {
      title: "Click Effect",
      description:
        "Click the box to toggle an active state.",
      code: `.box.active {
  transform: scale(0.94);
  background: #38bdf8;
  color: #03111e;
  box-shadow:
    0 0 35px
    rgba(56,189,248,.5);
}`,
    },

    glow: {
      title: "Glow Effect",
      description:
        "Hover over the glowing orb and watch the light expand.",
      code: `.glow:hover {
  transform: scale(1.35);
  box-shadow:
    0 0 70px
    rgba(56,189,248,.8);
}`,
    },

    rotate: {
      title: "Rotate Effect",
      description:
        "Hover over the shape and CSS smoothly rotates it.",
      code: `.rotate:hover {
  transform:
    rotate(12deg)
    scale(1.08);
}`,
    },
  };

  return (
    <main>

      {/* ================= HERO ================= */}

      <section
        className="hero"
        style={{ backgroundImage: `url(${heroBg})` }}
        id="home"
      >
        <div className="hero-overlay"></div>

        <div className="particles">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <nav className="navbar">
          <div className="logo">MK.</div>

          <div className="nav-links">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </div>
        </nav>

        <div className="hero-content">

          <div className="status reveal">
            <span className="status-dot"></span>
            Available for opportunities
          </div>

          <p className="hello reveal">
            Hello, I'm
          </p>

          <h1 className="reveal">
            Mantesh
            <span> Kubihal</span>
          </h1>

          <h2 className="reveal">
            Full Stack Developer
          </h2>

          <p className="hero-description reveal">
            I build modern, responsive and user-friendly web
            applications that turn ideas into real digital
            experiences.
          </p>

          <div className="hero-buttons reveal">
            <a
              href="#projects"
              className="primary-btn"
            >
              View My Work
              <span>→</span>
            </a>

            <a
              href="#contact"
              className="secondary-btn"
            >
              Let's Talk
            </a>
          </div>

          <div className="hero-stats reveal">

            <div>
              <strong>5+</strong>
              <span>Projects</span>
            </div>

            <div>
              <strong>10+</strong>
              <span>Technologies</span>
            </div>

            <div>
              <strong>∞</strong>
              <span>Ideas</span>
            </div>

          </div>
        </div>

        <div className="scroll-indicator">
          <span></span>
          Scroll to explore
        </div>
      </section>


      {/* ================= ABOUT ================= */}

      <section
        className="section about about-image"
        id="about"
      >

        <div
          className="about-bg"
          style={{
            backgroundImage: `url(${aboutBG})`,
          }}
        ></div>

        <div className="about-overlay"></div>


        <div className="section-heading reveal">
          <span>01 — ABOUT ME</span>

          <h2>
            Turning ideas into{" "}
            <em>experiences.</em>
          </h2>
        </div>

        <div className="about-grid">

          <div className="about-text reveal">

            <p className="large-text">
              I'm a passionate developer who enjoys
              creating applications that are not only
              functional, but also beautiful and
              enjoyable to use.
            </p>

            <p>
              My journey in software development
              started with curiosity about how websites
              and applications work. Today, I enjoy
              working across the frontend and backend
              to build complete digital experiences.
            </p>

            <p>
              I constantly experiment with new
              technologies, improve my problem-solving
              skills and look for better ways to turn
              ideas into working products.
            </p>

          </div>


          <div className="about-cards">

            <div className="glass-card reveal">
              <div className="card-icon">⚡</div>

              <h3>Fast</h3>

              <p>
                Optimized applications with smooth
                interactions and great performance.
              </p>
            </div>

            <div className="glass-card reveal">
              <div className="card-icon">🎨</div>

              <h3>Creative</h3>

              <p>
                Clean interfaces with modern visual
                design and meaningful animations.
              </p>
            </div>

            <div className="glass-card reveal">
              <div className="card-icon">🧩</div>

              <h3>Problem Solver</h3>

              <p>
                Breaking complex problems into simple,
                maintainable solutions.
              </p>
            </div>

            <div className="glass-card reveal">
              <div className="card-icon">🚀</div>

              <h3>Always Learning</h3>

              <p>
                Exploring new tools and technologies
                to keep improving.
              </p>
            </div>

          </div>
        </div>

        <div className="particles">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </section>


      {/* ================= SKILLS ================= */}

      <section
        className="section skills-section"
        id="skills"
      >

        <div className="section-heading reveal">
          <span>02 — MY TOOLKIT</span>

          <h2>
            Technologies I{" "}
            <em>work with.</em>
          </h2>
        </div>

        <div className="skills-grid">

          <div className="skill-card reveal">
            <div className="skill-number">01</div>

            <h3>Frontend</h3>

            <div className="skill-list">
              <span>HTML</span>
              <span>CSS</span>
              <span>JavaScript</span>
              <span>React.js</span>
            </div>
          </div>

          <div className="skill-card reveal">
            <div className="skill-number">02</div>

            <h3>Backend</h3>

            <div className="skill-list">
              <span>Java</span>
              <span>Spring Boot</span>
              <span>Node.js</span>
              <span>Express.js</span>
              <span>REST APIs</span>
            </div>
          </div>

          <div className="skill-card reveal">
            <div className="skill-number">03</div>

            <h3>Database</h3>

            <div className="skill-list">
              <span>MySQL</span>
              <span>PostgreSQL</span>
              <span>SQL</span>
              <span>JPA</span>
            </div>
          </div>

          <div className="skill-card reveal">
            <div className="skill-number">04</div>

            <h3>Tools</h3>

            <div className="skill-list">
              <span>Git</span>
              <span>GitHub</span>
              <span>Render</span>
              <span>Railway</span>
              <span>VS Code</span>
            </div>
          </div>

        </div>
      </section>


      {/* ================= MARQUEE ================= */}

      <div className="marquee">

        <div className="marquee-track">

          <span>JAVA</span>
          <span>REACT</span>
          <span>SPRING BOOT</span>
          <span>JAVASCRIPT</span>
          <span>MYSQL</span>
          <span>NODE.JS</span>

          <span>JAVA</span>
          <span>REACT</span>
          <span>SPRING BOOT</span>
          <span>JAVASCRIPT</span>
          <span>MYSQL</span>
          <span>NODE.JS</span>

        </div>
      </div>


      {/* ================= PROJECTS ================= */}

      <section
        className="section projects-section"
        id="projects"
      >

        <div className="section-heading reveal">
          <span>03 — SELECTED WORK</span>

          <h2>
            Things I've{" "}
            <em>built.</em>
          </h2>
        </div>

        <div className="projects-grid">

          <article className="project-card reveal">

            <div className="project-top">
              <span className="project-index">
                01
              </span>

              <span className="project-arrow">
                ↗
              </span>
            </div>

            <div className="project-icon">
              🛍️
            </div>

            <h3>Vibha The Shop</h3>

            <p>
              A full-stack e-commerce platform with
              product management, authentication,
              cart and order functionality.
            </p>

            <div className="project-tech">
              <span>React</span>
              <span>Spring Boot</span>
              <span>PostgreSQL</span>
            </div>

          </article>


          <article className="project-card reveal">

            <div className="project-top">
              <span className="project-index">
                02
              </span>

              <span className="project-arrow">
                ↗
              </span>
            </div>

            <div className="project-icon">
              ✈️
            </div>

            <h3>Travel Management</h3>

            <p>
              A travel management application designed
              to organize trips, destinations and
              travel-related information.
            </p>

            <div className="project-tech">
              <span>Java</span>
              <span>React</span>
              <span>MySQL</span>
            </div>

          </article>


          <article className="project-card reveal">

            <div className="project-top">
              <span className="project-index">
                03
              </span>

              <span className="project-arrow">
                ↗
              </span>
            </div>

            <div className="project-icon">
              📝
            </div>

            <h3>Complaint Management</h3>

            <p>
              A web application for submitting,
              tracking and managing complaints
              through an organized workflow.
            </p>

            <div className="project-tech">
              <span>Java</span>
              <span>Spring Boot</span>
              <span>MySQL</span>
            </div>

          </article>

        </div>
      </section>


      {/* ================= JOURNEY ================= */}

      <section
        className="section journey"
        id="journey"
      >

        <div className="section-heading reveal">
          <span>04 — MY JOURNEY</span>

          <h2>
            Learning. Building.{" "}
            <em>Growing.</em>
          </h2>
        </div>

        <div className="timeline">

          <div className="timeline-item reveal">

            <div className="timeline-dot"></div>

            <div className="timeline-content">
              <span>2021 — 2025</span>

              <h3>
                Electronics & Communication
                Engineering
              </h3>

              <p>
                Built a strong foundation in electronics,
                programming and problem solving.
              </p>
            </div>
          </div>


          <div className="timeline-item reveal">

            <div className="timeline-dot"></div>

            <div className="timeline-content">
              <span>2024 — Present</span>

              <h3>Software Development</h3>

              <p>
                Focused on Java, React, Spring Boot,
                databases and full-stack development.
              </p>
            </div>
          </div>


          <div className="timeline-item reveal">

            <div className="timeline-dot"></div>

            <div className="timeline-content">
              <span>Today</span>

              <h3>Building My Future</h3>

              <p>
                Continuously building projects,
                learning new technologies and looking
                for opportunities to create real-world
                software.
              </p>
            </div>
          </div>

        </div>
      </section>


      {/* ================= CONTACT ================= */}

      <section
        className="contact-section"
        id="contact"
      >

        <div className="contact-glow"></div>

        <div className="contact-content reveal">

          <span>05 — LET'S CONNECT</span>

          <h2>
            Have an idea?
            <br />
            <em>Let's build it.</em>
          </h2>

          <p>
            I'm always interested in hearing about
            new projects, opportunities and
            interesting ideas.
          </p>

          <form
            ref={contactForm}
            className="contact-form"
            onSubmit={sendContactEmail}
          >

            <div className="contact-field">
              <label htmlFor="contact-name">Name</label>

              <input
                id="contact-name"
                type="text"
                name="name"
                placeholder="Your name"
                autoComplete="name"
                required
              />
            </div>

            <div className="contact-field">
              <label htmlFor="contact-phone">
                Phone Number
              </label>

              <input
                id="contact-phone"
                type="tel"
                name="phone"
                placeholder="Your phone number"
                autoComplete="tel"
                inputMode="tel"
                required
              />
            </div>

            <div className="contact-field contact-field-full">
              <label htmlFor="contact-reason">
                Reason for Contact
              </label>

              <textarea
                id="contact-reason"
                name="reason"
                placeholder="Tell me why you'd like to get in touch..."
                rows="5"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="contact-btn"
              disabled={isSending}
            >
              {isSending ? "Sending..." : "Send Message"}
              <span>{isSending ? "..." : "↗"}</span>
            </button>

            {emailStatus.message && (
              <p
                className={`contact-status ${emailStatus.type}`}
                role="status"
                aria-live="polite"
              >
                {emailStatus.message}
              </p>
            )}

          </form>

        </div>
      </section>


      {/* =====================================================
          CSS THINGS FUN
      ===================================================== */}

      <section
        className="css-things-section"
        id="CSSThings"
      >

        <div className="CSS-glow"></div>

        <div className="css-things-container">

          {/* LEFT SIDE */}

          <div className="CSS-content reveal">

            <span>06 — LET'S SEE CSS</span>

            <h2>
              Basic CSS Fun
              <br />
              <em>Let's See Them.</em>
            </h2>

            <p>
              CSS isn't just about making things look
              pretty. With a few properties we can create
              interactions, animations, effects and
              completely change how a website feels.
            </p>

            <div className="css-demo-buttons">

              <button
                className={
                  selectedDemo === "hover"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setSelectedDemo("hover")
                }
              >
                Hover
              </button>

              <button
                className={
                  selectedDemo === "click"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setSelectedDemo("click")
                }
              >
                Click
              </button>

              <button
                className={
                  selectedDemo === "glow"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setSelectedDemo("glow")
                }
              >
                Glow
              </button>

              <button
                className={
                  selectedDemo === "rotate"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setSelectedDemo("rotate")
                }
              >
                Rotate
              </button>

            </div>

          </div>


          {/* RIGHT SIDE */}

          <div className="css-playground reveal">

            <div className="playground-header">

              <div className="window-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>

              <span>
                css-playground.css
              </span>

            </div>


            {/* DEMO */}

            <div className="demo-area">

              <div
                className={`
                  css-demo-box
                  demo-${selectedDemo}
                  ${selectedDemo === "click"
                    ? "clickable"
                    : ""
                  }
                `}
                onClick={() => {
                  if (selectedDemo === "click") {
                    const box =
                      document.querySelector(
                        ".css-demo-box"
                      );

                    box.classList.toggle("clicked");
                  }
                }}
              >

                {selectedDemo === "hover" &&
                  "HOVER ME"}

                {selectedDemo === "click" &&
                  "CLICK ME"}

                {selectedDemo === "glow" &&
                  "GLOW"}

                {selectedDemo === "rotate" &&
                  "ROTATE"}

              </div>

            </div>


            {/* CODE */}

            <div className="code-panel">

              <div className="code-title">
                <span>
                  {demos[selectedDemo].title}
                </span>

                <span className="code-dot">
                  ●
                </span>
              </div>

              <pre>
                <code>
                  {demos[selectedDemo].code}
                </code>
              </pre>

            </div>


            <div className="playground-description">
              <strong>
                {demos[selectedDemo].title}
              </strong>

              <p>
                {demos[selectedDemo].description}
              </p>
            </div>

          </div>

        </div>

      </section>


      {/* ================= FOOTER ================= */}

      <footer>

        <div>
          <strong>MK.</strong>

          <span>
            © 2026 Mantesh Kubihal
          </span>
        </div>

        <div className="footer-links">

          <a href="#home">Home</a>

          <a href="#projects">
            Projects
          </a>

          <a href="#contact">
            Contact
          </a>

        </div>

      </footer>

    </main>
  );
}

export default App;