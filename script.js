// DOM Elements
const navbar = document.getElementById("navbar");
const navMenu = document.getElementById("nav-menu");
const hamburger = document.getElementById("hamburger");
const navLinks = document.querySelectorAll(".nav-link");
const contactForm = document.getElementById("contact-form");
const projectCards = document.querySelectorAll(".project-card");
const designCards = document.querySelectorAll(".design-card");
const modal = document.getElementById("project-modal");
const modalBody = document.getElementById("modal-body");
const closeModal = document.querySelector(".close");
const toast = document.getElementById("toast");
const downloadResumeBtn = document.getElementById("download-resume");

// Initialize on load
document.addEventListener("DOMContentLoaded", function () {
  initializeAnimations();
  initializeNavigation();
  initializeProjects();
  initializeDesigns();
  initializeSkills();
  initializeForm();
  initializeScrollEffects();
});

// Navigation functionality
function initializeNavigation() {
  // Mobile menu toggle
  hamburger.addEventListener("click", function () {
    navMenu.classList.toggle("active");
    hamburger.classList.toggle("active");
  });

  // Close mobile menu when clicking on a link
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      navMenu.classList.remove("active");
      hamburger.classList.remove("active");
    });
  });

  // Navbar scroll effect
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Active link highlighting
  window.addEventListener("scroll", updateActiveNavLink);
}

function updateActiveNavLink() {
  const sections = document.querySelectorAll("section");
  const scrollPosition = window.scrollY + 100;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
}

// Smooth scrolling for navigation links
navLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      const offsetTop = targetSection.offsetTop - 70;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

// Scroll animations
function initializeAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  // Add animation classes and observe elements
  const animatedElements = document.querySelectorAll(
    ".section-title, .about-content, .skill-category, .project-card, .design-card, .cert-card, .contact-content"
  );

  animatedElements.forEach((element, index) => {
    element.classList.add("fade-in");
    element.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(element);
  });
}

// Skills animation
function initializeSkills() {
  const skillBars = document.querySelectorAll(".skill-progress");

  const skillsObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const progressBar = entry.target;
          const width = progressBar.getAttribute("data-width");
          setTimeout(() => {
            progressBar.style.width = width + "%";
          }, 200);
        }
      });
    },
    { threshold: 0.5 }
  );

  skillBars.forEach((bar) => {
    skillsObserver.observe(bar);
  });
}

// Project modal functionality
function initializeProjects() {
  const projectData = {
    "filament-maker": {
      title: "Plastic Bottle to 3D Printing Filament Maker",
      description: `
                <div class="project-detail">
                    <h3>Project Overview</h3>
                    <p>Designed and prototyped a low-cost screw extruder system that recycles PET plastic bottles into usable 1.75 mm 3D printer filament. This sustainable solution addresses plastic waste while providing affordable filament for 3D printing.</p>

                    <h3>Key Features</h3>
                    <ul>
                        <li>Shredding system for PET bottle preparation</li>
                        <li>Thermal extrusion with precise temperature control</li>
                        <li>Automatic filament winding mechanism</li>
                        <li>Quality control for consistent 1.75mm diameter</li>
                    </ul>

                    <h3>Tools & Technologies</h3>
                    <div class="tech-tags">
                        <span>Fusion 360</span>
                        <span>Ender 3 Neo</span>
                        <span>Arduino</span>
                        <span>ANSYS</span>
                        <span>Thermal Engineering</span>
                    </div>

                    <h3>What I Learned</h3>
                    <p>This project taught me about sustainable design principles, high-temperature material handling challenges, and the integration of mechanical and thermal systems. I gained valuable experience in recycling technology and environmental engineering.</p>

                    <div class="project-images">
                        <img src="assets/filament-maker/view_a.jpeg" alt="Filament Maker 1">
                        <img src="assets/filament-maker/view_b.jpeg" alt="Filament Maker 2">
                        <img src="assets/filament-maker/view_c.jpeg" alt="Filament Maker 1">
                        <img src="assets/filament-maker/view_d.jpeg" alt="Filament Maker 2">
                    </div>
                </div>
            `,
    },
    "engine-sim": {
      title: "4-Cylinder IC Engine Simulation",
      description: `
                <div class="project-detail">
                    <h3>Project Overview</h3>
                    <p>Created a complete 3D model and motion simulation of a 4-cylinder inline engine using CATIA V5, including detailed modeling of crankshaft, pistons, connecting rods, and valve timing mechanisms.</p>

                    <h3>Key Features</h3>
                    <ul>
                        <li>Complete engine assembly with all moving parts</li>
                        <li>Kinematic simulation of crank-piston motion</li>
                        <li>Valve timing and camshaft integration</li>
                        <li>Constraint-based motion verification</li>
                    </ul>

                    <h3>Tools & Technologies</h3>
                    <div class="tech-tags">
                        <span>CATIA V5</span>
                        <span>Part Design</span>
                        <span>Assembly Design</span>
                        <span>DMU Kinematics</span>
                    </div>

                    <h3>Technical Achievements</h3>
                    <p>Successfully modeled complex engine components with precise tolerances and created realistic motion simulation showing the complete engine cycle. The project demonstrates advanced CAD skills and understanding of internal combustion engine mechanics.</p>
                </div>
            `,
    },
    "robotic-arm": {
      title: "6-DOF Robotic Arm",
      description: `
                <div class="project-detail">
                    <h3>Project Overview</h3>
                    <p>Designed a 6-degree-of-freedom robotic arm in CATIA V5, optimized for maximum reach and workspace efficiency. The design includes full movement simulation using DMU Kinematics for precision analysis.</p>

                    <h3>Key Features</h3>
                    <ul>
                        <li>6 degrees of freedom for maximum flexibility</li>
                        <li>Optimized joint design for smooth operation</li>
                        <li>Workspace envelope analysis</li>
                        <li>Collision detection and avoidance</li>
                    </ul>

                    <h3>Tools & Technologies</h3>
                    <div class="tech-tags">
                        <span>CATIA V5</span>
                        <span>DMU Kinematics</span>
                        <span>Robotics</span>
                        <span>Motion Analysis</span>
                    </div>

                    <h3>Learning Outcomes</h3>
                    <p>Gained deep understanding of robotic kinematics, degrees of freedom in manipulator systems, and the challenges of designing precision robotic mechanisms. Enhanced skills in constraint-based design and motion simulation.</p>
                </div>
            `,
    },
    "2d-plotter": {
      title: "Computer-Controlled 2D Pen Plotter",
      description: `
                <div class="project-detail">
                    <h3>Project Overview</h3>
                    <p>Built a CNC-style 2D plotter that draws graphics using stepper motors and a pen module, controlled via Arduino and G-code. This DIY project brings digital sketches to life with precision mechanical control.</p>

                    <h3>Key Features</h3>
                    <ul>
                        <li>XY axis stepper motor control</li>
                        <li>G-code interpretation and execution</li>
                        <li>SVG to G-code conversion workflow</li>
                        <li>Precision pen positioning system</li>
                    </ul>

                    <h3>Tools & Technologies</h3>
                    <div class="tech-tags">
                        <span>Fusion 360</span>
                        <span>Arduino UNO</span>
                        <span>GRBL Firmware</span>
                        <span>3D Printing</span>
                        <span>Stepper Motors</span>
                    </div>

                    <h3>Skills Developed</h3>
                    <p>Learned CNC basics, motion control systems, firmware programming, and mechatronics integration. Gained experience in converting digital art to machine instructions and precision mechanical assembly.</p>
                </div>
            `,
    },
    "cup-holder": {
      title: "Gyroscopic Anti-Gravity Cup Holder",
      description: `
                <div class="project-detail">
                    <h3>Project Overview</h3>
                    <p>Designed and 3D printed a gyroscopic-style cup holder that stays level even when tilted in different directions. The concept uses a passive gimbal mechanism to simulate anti-gravity behavior, winning 3rd Prize at IIT Dharwad.</p>

                    <h3>Key Features</h3>
                    <ul>
                        <li>Passive gimbal mechanism for stability</li>
                        <li>Single-print design without assembly</li>
                        <li>Support-free printing with clever joint design</li>
                        <li>Gyroscopic stability demonstration</li>
                    </ul>

                    <h3>Tools & Technologies</h3>
                    <div class="tech-tags">
                        <span>Fusion 360</span>
                        <span>Anycubic Kobra Neo</span>
                        <span>PLA</span>
                        <span>Support-free Design</span>
                    </div>

                    <h3>Recognition & Achievement</h3>
                    <p>Won 3rd Prize in Product Design at IIT Dharwad. This project demonstrated innovative thinking in mechanical design and showcased advanced 3D printing techniques with moving parts printed in a single operation.</p>
                </div>
            `,
    },
    "csir-nal": {
      title: "CSIR-NAL Internship - Trouser Duct Design",
      description: `
                <div class="project-detail">
                    <h3>Project Overview</h3>
                    <p>Interned at CSIR-NAL's Advanced Composites Division, contributing to the design of a carbon-fiber trouser duct used in aerospace ventilation systems. This internship provided hands-on experience with aerospace-grade engineering.</p>

                    <h3>Key Responsibilities</h3>
                    <ul>
                        <li>Modeled duct sections with composite layering</li>
                        <li>Studied airflow and geometric constraints</li>
                        <li>Worked under R&D environment mentorship</li>
                        <li>Created aerospace-grade documentation</li>
                    </ul>

                    <h3>Tools & Technologies</h3>
                    <div class="tech-tags">
                        <span>CATIA Composites Workbench</span>
                        <span>CFRP Tools</span>
                        <span>Aerospace Design</span>
                        <span>CFD Analysis</span>
                    </div>

                    <h3>Professional Experience</h3>
                    <p>Gained valuable industry experience in aerospace engineering, learned about composite material design principles, and understood the rigor required for aerospace-grade component development. Enhanced skills in professional documentation and R&D workflows.</p>
                </div>
            `,
    },
  };

  // Design data for 3D printed designs
  const designData = {
    "radial-engine": {
      title: "Six Cylinder Radial Engine",
      description: `
        <div class="project-detail">
            <h3>Design Overview</h3>
            <p>A complex mechanical assembly showcasing precision engineering and detailed component design. This radial engine model demonstrates advanced CAD modeling skills and understanding of mechanical systems.</p>

            <h3>Key Features</h3>
            <ul>
                <li>Six-cylinder radial configuration</li>
                <li>Detailed piston and connecting rod assembly</li>
                <li>Precision crankshaft design</li>
                <li>Complete valve train system</li>
            </ul>

            <h3>Technical Details</h3>
            <div class="tech-tags">
                <span>CATIA V5</span>
                <span>Assembly Design</span>
                <span>Mechanical Engineering</span>
                <span>Precision Modeling</span>
            </div>

            <h3>Print Specifications</h3>
            <p>Designed for FDM printing with optimized support structures and assembly considerations. Each component is carefully designed to fit together seamlessly after printing.</p>
        </div>
      `,
    },
    "robotic-arm": {
      title: "Six Axis Robotic Arm",
      description: `
        <div class="project-detail">
            <h3>Design Overview</h3>
            <p>An articulated robotic arm with full range of motion and precision joint design. This design demonstrates advanced kinematics understanding and practical robotics applications.</p>

            <h3>Key Features</h3>
            <ul>
                <li>Six degrees of freedom</li>
                <li>Precision joint mechanisms</li>
                <li>Optimized workspace design</li>
                <li>Modular component system</li>
            </ul>

            <h3>Technical Details</h3>
            <div class="tech-tags">
                <span>Robotics</span>
                <span>Kinematics</span>
                <span>Precision Design</span>
                <span>Modular Assembly</span>
            </div>

            <h3>Applications</h3>
            <p>Suitable for educational purposes, prototyping, and small-scale automation projects. The design can be adapted for various end-effector applications.</p>
        </div>
      `,
    },
    "hydroshell": {
      title: "Hydroshell",
      description: `
        <div class="project-detail">
            <h3>Design Overview</h3>
            <p>A fluid dynamics optimized shell design with complex geometric patterns. This design combines aesthetic appeal with functional considerations for fluid flow applications.</p>

            <h3>Key Features</h3>
            <ul>
                <li>Fluid dynamics optimization</li>
                <li>Complex geometric patterns</li>
                <li>Structural integrity</li>
                <li>Aesthetic design elements</li>
            </ul>

            <h3>Technical Details</h3>
            <div class="tech-tags">
                <span>Fluid Dynamics</span>
                <span>Geometric Design</span>
                <span>Optimization</span>
                <span>Structural Analysis</span>
            </div>

            <h3>Applications</h3>
            <p>Can be used in fluid handling systems, decorative elements, or as a base for further engineering applications requiring optimized flow characteristics.</p>
        </div>
      `,
    },
    "aquadome-skeleton": {
      title: "Aquadome Skeleton",
      description: `
        <div class="project-detail">
            <h3>Design Overview</h3>
            <p>A structural framework design with organic architectural elements. This design showcases the fusion of structural engineering principles with artistic architectural concepts.</p>

            <h3>Key Features</h3>
            <ul>
                <li>Organic architectural elements</li>
                <li>Structural framework design</li>
                <li>Modular construction approach</li>
                <li>Scalable design system</li>
            </ul>

            <h3>Technical Details</h3>
            <div class="tech-tags">
                <span>Architecture</span>
                <span>Structural Design</span>
                <span>Organic Geometry</span>
                <span>Modular System</span>
            </div>

            <h3>Applications</h3>
            <p>Suitable for architectural models, educational displays, or as a base for larger-scale construction projects. The modular design allows for easy scaling and modification.</p>
        </div>
      `,
    },
    "bench": {
      title: "Bench Design",
      description: `
        <div class="project-detail">
            <h3>Design Overview</h3>
            <p>An ergonomic seating solution with modern aesthetic and functional design. This bench design prioritizes comfort while maintaining contemporary visual appeal.</p>

            <h3>Key Features</h3>
            <ul>
                <li>Ergonomic seating design</li>
                <li>Modern aesthetic appeal</li>
                <li>Functional utility</li>
                <li>Durable construction</li>
            </ul>

            <h3>Technical Details</h3>
            <div class="tech-tags">
                <span>Furniture Design</span>
                <span>Ergonomics</span>
                <span>Modern Aesthetic</span>
                <span>Functional Design</span>
            </div>

            <h3>Applications</h3>
            <p>Perfect for outdoor spaces, public areas, or as a prototype for larger furniture manufacturing. The design can be scaled for different applications and environments.</p>
        </div>
      `,
    },
    "pen-holder": {
      title: "Pen Holder",
      description: `
        <div class="project-detail">
            <h3>Design Overview</h3>
            <p>A functional desk accessory with elegant design and practical utility. This pen holder combines form and function for everyday use.</p>

            <h3>Key Features</h3>
            <ul>
                <li>Elegant design aesthetic</li>
                <li>Practical utility</li>
                <li>Desk organization</li>
                <li>Easy accessibility</li>
            </ul>

            <h3>Technical Details</h3>
            <div class="tech-tags">
                <span>Accessory Design</span>
                <span>Functional</span>
                <span>Desk Organization</span>
                <span>Practical Utility</span>
            </div>

            <h3>Applications</h3>
            <p>Ideal for home offices, workstations, or as a gift item. The design can be customized for different pen sizes and quantities.</p>
        </div>
      `,
    },
    "polygon-cup": {
      title: "Polygon Design Cup",
      description: `
        <div class="project-detail">
            <h3>Design Overview</h3>
            <p>A geometric cup design with faceted surfaces and modern aesthetic. This design explores the intersection of geometric patterns and functional form.</p>

            <h3>Key Features</h3>
            <ul>
                <li>Geometric faceted surfaces</li>
                <li>Modern aesthetic design</li>
                <li>Functional form</li>
                <li>Visual appeal</li>
            </ul>

            <h3>Technical Details</h3>
            <div class="tech-tags">
                <span>Geometric Design</span>
                <span>Modern Aesthetic</span>
                <span>Faceted Surfaces</span>
                <span>Functional Form</span>
            </div>

            <h3>Applications</h3>
            <p>Suitable for decorative purposes, functional use, or as a study in geometric design principles. The faceted design creates interesting light reflections and visual effects.</p>
        </div>
      `,
    },
    "wave-cup": {
      title: "Wave Cup",
      description: `
        <div class="project-detail">
            <h3>Design Overview</h3>
            <p>An organic cup design inspired by natural wave patterns and fluid dynamics. This design captures the beauty of natural forms in a functional object.</p>

            <h3>Key Features</h3>
            <ul>
                <li>Organic wave patterns</li>
                <li>Natural form inspiration</li>
                <li>Fluid dynamics influence</li>
                <li>Artistic expression</li>
            </ul>

            <h3>Technical Details</h3>
            <div class="tech-tags">
                <span>Organic Design</span>
                <span>Natural Patterns</span>
                <span>Wave Pattern</span>
                <span>Artistic Expression</span>
            </div>

            <h3>Applications</h3>
            <p>Perfect for artistic display, functional use, or as a conversation piece. The organic design makes it a unique addition to any collection.</p>
        </div>
      `,
    },
    "juice-mixer": {
      title: "Juice Mixer",
      description: `
        <div class="project-detail">
            <h3>Design Overview</h3>
            <p>A functional kitchen appliance with motor integration and practical design. This design demonstrates the integration of mechanical systems with everyday utility.</p>

            <h3>Key Features</h3>
            <ul>
                <li>Motor integration system</li>
                <li>Practical kitchen utility</li>
                <li>Functional design</li>
                <li>Mechanical assembly</li>
            </ul>

            <h3>Technical Details</h3>
            <div class="tech-tags">
                <span>Kitchen Appliance</span>
                <span>Motor Integration</span>
                <span>Functional Design</span>
                <span>Mechanical Assembly</span>
            </div>

            <h3>Applications</h3>
            <p>Ideal for home use, small-scale food preparation, or as a prototype for larger appliance development. The design can be adapted for various mixing applications.</p>
        </div>
      `,
    },
    "hydraulic-pump": {
      title: "Hydraulic Pump",
      description: `
        <div class="project-detail">
            <h3>Design Overview</h3>
            <p>A mechanical pump system designed for fluid transfer and pressure generation. This design showcases understanding of hydraulic systems and mechanical engineering principles.</p>

            <h3>Key Features</h3>
            <ul>
                <li>Fluid transfer system</li>
                <li>Pressure generation</li>
                <li>Mechanical pump design</li>
                <li>Hydraulic principles</li>
            </ul>

            <h3>Technical Details</h3>
            <div class="tech-tags">
                <span>Hydraulic System</span>
                <span>Pump Design</span>
                <span>Mechanical Engineering</span>
                <span>Fluid Dynamics</span>
            </div>

            <h3>Applications</h3>
            <p>Suitable for educational purposes, small-scale hydraulic systems, or as a demonstration of mechanical engineering principles. The design can be scaled for different applications.</p>
        </div>
      `,
    },
  };

  projectCards.forEach((card) => {
    card.addEventListener("click", function () {
      const projectId = this.getAttribute("data-project");
      const project = projectData[projectId];

      if (project) {
        modalBody.innerHTML = `
                    <h2>${project.title}</h2>
                    ${project.description}
                `;
        modal.style.display = "block";
        document.body.style.overflow = "hidden";
      }
    });
  });

  // Design cards event listeners
  designCards.forEach((card) => {
    card.addEventListener("click", function () {
      const designId = this.getAttribute("data-design");
      const design = designData[designId];

      if (design) {
        modalBody.innerHTML = `
                    <h2>${design.title}</h2>
                    ${design.description}
                `;
        modal.style.display = "block";
        document.body.style.overflow = "hidden";
      }
    });
  });

  // Close modal functionality
  closeModal.addEventListener("click", closeProjectModal);
  window.addEventListener("click", function (e) {
    if (e.target === modal) {
      closeProjectModal();
    }
  });

  // Close modal with Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.style.display === "block") {
      closeProjectModal();
    }
  });
}

function closeProjectModal() {
  modal.style.display = "none";
  document.body.style.overflow = "auto";
}

// Design cards functionality
function initializeDesigns() {
  // Add animation delay for design cards
  designCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
  });
}

// Contact form functionality
function initializeForm() {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    // Show loading state
    submitBtn.innerHTML = '<div class="loading"></div> Sending...';
    submitBtn.disabled = true;

    // Simulate form submission
    setTimeout(() => {
      showToast("Message sent successfully!");
      contactForm.reset();
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }, 2000);
  });
}

function showToast(message) {
  toast.querySelector("span").textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

// Download resume functionality
if (downloadResumeBtn) {
  downloadResumeBtn.addEventListener("click", function (e) {
    e.preventDefault();

    // Create a dummy resume download
    const link = document.createElement("a");
    link.href = "data:application/pdf;base64,";
    link.download = "Joshua_Joel_Resume.pdf";

    // Show toast message since we don't have an actual PDF
    showToast(
      "Resume download would start here. Please add your actual resume file."
    );
  });
}

// Scroll effects
function initializeScrollEffects() {
  // Parallax effect for hero section
  window.addEventListener("scroll", function () {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll(".floating-elements");

    parallaxElements.forEach((element) => {
      const speed = 0.5;
      element.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });

  // Smooth reveal animations
  const revealElements = document.querySelectorAll(
    ".fade-in, .slide-in-left, .slide-in-right"
  );

  const revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
}

// Floating animation for project cards
projectCards.forEach((card, index) => {
  card.style.animationDelay = `${index * 0.1}s`;
});

// Dynamic typing effect for hero subtitle (optional enhancement)
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = "";

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "KeyB",
  "KeyA",
];

document.addEventListener("keydown", function (e) {
  konamiCode.push(e.code);

  if (konamiCode.length > konamiSequence.length) {
    konamiCode.shift();
  }

  if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
    showToast("🎉 Easter egg found! You discovered the secret code!");
    konamiCode = [];
  }
});

// Performance optimization: Lazy loading for images
function initializeLazyLoading() {
  const images = document.querySelectorAll('img[loading="lazy"]');

  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver(function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.src;
          img.classList.remove("lazy");
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach((img) => {
      imageObserver.observe(img);
    });
  }
}

// Initialize lazy loading
initializeLazyLoading();

// Utility function for smooth scrolling
function smoothScrollTo(element, duration = 1000) {
  const targetPosition = element.offsetTop - 70;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = ease(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  function ease(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animation);
}

// Add loading animation to buttons
document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    if (!this.classList.contains("loading")) {
      this.style.transform = "scale(0.95)";
      setTimeout(() => {
        this.style.transform = "";
      }, 150);
    }
  });
});

// Console message for developers
console.log(`
🚀 Welcome to Joshua Joel's Portfolio!
=================================
This site was built with:
- Pure HTML, CSS, and JavaScript
- Modern CSS Grid and Flexbox
- Intersection Observer API
- Smooth animations and transitions

Feel free to explore the code and get in touch!
`);

// Handle device orientation changes
window.addEventListener("orientationchange", function () {
  setTimeout(() => {
    window.scrollTo(0, window.scrollY);
  }, 100);
});

// Add touch gestures for mobile devices
let touchStartX = 0;
let touchStartY = 0;

document.addEventListener("touchstart", function (e) {
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
});

document.addEventListener("touchend", function (e) {
  if (!touchStartX || !touchStartY) return;

  const touchEndX = e.changedTouches[0].clientX;
  const touchEndY = e.changedTouches[0].clientY;

  const diffX = touchStartX - touchEndX;
  const diffY = touchStartY - touchEndY;

  // Reset values
  touchStartX = 0;
  touchStartY = 0;

  // Swipe detection logic could be added here
  // For example, swipe left/right to navigate sections
});

// Export functions for potential module use
window.portfolioUtils = {
  showToast,
  smoothScrollTo,
  closeProjectModal,
};
