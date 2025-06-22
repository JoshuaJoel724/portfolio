// DOM Elements
const navbar = document.getElementById("navbar");
const navMenu = document.getElementById("nav-menu");
const hamburger = document.getElementById("hamburger");
const navLinks = document.querySelectorAll(".nav-link");
const contactForm = document.getElementById("contact-form");
const projectCards = document.querySelectorAll(".project-card");
const designCards = document.querySelectorAll(".design-card");
const certCards = document.querySelectorAll(".cert-card");
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
  initializeCertifications();
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
                        <span>ANSYS</span>
                        <span>Thermal Engineering</span>
                    </div>

                    <h3>What I Learned</h3>
                    <p>This project taught me about sustainable design principles, high-temperature material handling challenges, and the integration of mechanical and thermal systems. I gained valuable experience in recycling technology and environmental engineering.</p>

                    <div class="project-images">
                        <img src="assets/filament-maker/view_a.jpeg" alt="Filament Maker 1">
                        <img src="assets/filament-maker/view_b.jpeg" alt="Filament Maker 2">
                        <img src="assets/filament-maker/view_c.jpeg" alt="Filament Maker 3">
                        <img src="assets/filament-maker/view_d.jpeg" alt="Filament Maker 4">
                    </div>
                </div>
            `,
    },
    "radial-engine": {
      title: "Six-Cylinder Radial Engine – 3D Model & Assembly",
      description: `
                <div class="project-detail">
                    <h3>Project Overview</h3>
                    <p>This project involved designing a detailed 3D model of a six-cylinder radial internal combustion engine. The model reflects the actual working principles of radial engines commonly used in aircraft, with accurate component placement and realistic mechanical motion in assembly.</p>

                    <h3>Key Features</h3>
                    <ul>
                        <li>Fully assembled radial engine with six cylinders symmetrically placed around the crankcase.</li>
                        <li>Includes crankshaft, crankcase, pistons, connecting rods, valve housing, and support structures.</li>
                        <li>Realistic mechanical alignment for simulating radial piston movement.</li>
                        <li>Color-coded components for better clarity and presentation.</li>
                    </ul>

                    <h3>Tools & Technologies</h3>
                    <div class="tech-tags">
                        <span>CAD Software: Autodesk Fusion 360</span>
                        <span>Modules Used: Solid Modeling, Assembly, Joint Simulation</span>
                        <span>Materials Applied: Custom appearances for visual distinction</span>
                        <span>File Types: .f3d (Fusion Archive), .step (export)</span>
                    </div>

                    <h3>Learning Outcomes</h3>
                    <p>Developed deep understanding of radial engine mechanics and internal component coordination. Practiced advanced assembly constraints and learned to manage complex hierarchies in large assemblies. Improved parametric modeling skills and component organization in Fusion 360. Gained experience in mechanical visualization and exploded views for presentation purposes.</p>
                </div>
            `,
    },
    "robotic-arm": {
      title: "6-Axis Robotic Arm – Design & Simulation",
      description: `
                <div class="project-detail">
                    <h3>Project Overview</h3>
                    <p>This project involved the complete 3D modeling and kinematic simulation of a 6-axis industrial robotic arm. The aim was to understand the mechanical structure and degrees of freedom typical in robotic manipulators, while simultaneously improving proficiency in CATIA V5's part and assembly environments.</p>

                    <h3>Key Features</h3>
                    <ul>
                        <li>Full 6-degree-of-freedom robotic arm structure with rotating base, shoulder, elbow, wrist, and end-effector.</li>
                        <li>Designed for ease of movement simulation and modular part replacement.</li>
                        <li>Proper joint placement and part separation to allow realistic motion.</li>
                        <li>Assembled using fully constrained parts for simulation compatibility.</li>
                    </ul>

                    <h3>Tools & Technologies</h3>
                    <div class="tech-tags">
                        <span>CAD Software: CATIA V5</span>
                        <span>Modules Used: Part Design, Assembly Design, DMU Kinematics</span>
                        <span>File Formats: .CATPart, .CATProduct</span>
                    </div>

                    <h3>Learning Outcomes</h3>
                    <p>Developed hands-on experience in modeling articulated systems in CATIA. Gained a solid understanding of mechanical joints, links, and actuator design in robotic arms. Learned to simulate complex motion using DMU Kinematics and define constraints for real-world behavior. Improved design intent through parametric modeling and better assembly structuring.</p>
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
  };

  // Design data for 3D printed designs
  const designData = {
    hydroshell: {
      title: "Hydroshell – Organic-Style Decorative Structure",
      description: `
        <div class="project-detail">
            <h3>Project Overview</h3>
            <p>Hydroshell is a 3D model inspired by organic, branching geometries, designed primarily as a decorative piece for aquarium environments. The aim was to explore natural-looking lattice forms using parametric tools in Fusion 360, while maintaining symmetry, balance, and 3D printability.</p>

            <h3>Key Features</h3>
            <ul>
                <li>Organic, interconnected lattice-style design with freeform structure.</li>
                <li>Hollow inner volume optimized for water circulation and aquatic use.</li>
                <li>Aesthetic appeal suitable for aquarium decoration or artistic prototypes.</li>
                <li>Designed as a single body for support-free 3D printing.</li>
            </ul>

            <h3>Tools & Technologies</h3>
            <div class="tech-tags">
                <span>CAD Software: Autodesk Fusion 360</span>
                <span>Techniques Used: Sculpting, Form Tools, Mesh Conversion</span>
                <span>Output Formats: .f3d (Fusion file), .stl (3D printing)</span>
            </div>

            <h3>Learning Outcomes</h3>
            <p>Gained experience working with sculpted and non-traditional geometries. Learned to create complex organic shapes using form and surface tools. Practiced mesh conversion and clean export preparation for additive manufacturing. Enhanced design thinking for aesthetic + functional integration in 3D environments.</p>
        </div>
      `,
    },
    "aquadome-skeleton": {
      title: "Skeleton Sphere – Aquarium Decor Model",
      description: `
        <div class="project-detail">
            <h3>Project Overview</h3>
            <p>Designed as a decorative element for aquariums, this hollow lattice sphere offers a natural hiding spot for small fish while enhancing visual appeal.</p>

            <h3>Key Features</h3>
            <ul>
                <li>Open lattice structure for water flow</li>
                <li>Fish-safe, smooth geometry</li>
                <li>Lightweight and support-free design</li>
                <li>Aesthetic blend of form and function</li>
            </ul>

            <h3>Tools & Technologies</h3>
            <div class="tech-tags">
                <span>Software: Autodesk Fusion 360</span>
                <span>Techniques: Form modeling, pattern generation</span>
            </div>

            <h3>Learning Outcomes</h3>
            <p>Explored organic design techniques. Improved print-friendly modeling. Applied CAD for creative functional design.</p>

            <div class="project-images">
                <img src="assets/designs/aquadome_skeleton/aquadome_skeleton_a.jpg" alt="Aquadome Skeleton View A">
                <img src="assets/designs/aquadome_skeleton/aquadome_skeleton_b.jpg" alt="Aquadome Skeleton View B">
            </div>
        </div>
      `,
    },
    "aquadome-skeleton-b": {
      title: "Fishtank Skeleton Dome – Aquatic Shelter Design",
      description: `
        <div class="project-detail">
            <h3>Project Overview</h3>
            <p>A dome-shaped structure designed for aquarium use, offering both aesthetic value and functional shelter for fish. The open geometry allows natural water flow and light penetration.</p>

            <h3>Key Features</h3>
            <ul>
                <li>Smooth, fish-safe rounded edges</li>
                <li>Openings for swimming and hiding</li>
                <li>Lightweight and easy to 3D print</li>
                <li>Organic pattern inspired by turtle shells</li>
            </ul>

            <h3>Tools & Technologies</h3>
            <div class="tech-tags">
                <span>Software: Autodesk Fusion 360</span>
                <span>Techniques: Surface cutting, dome modeling, edge refinement</span>
            </div>

            <h3>Learning Outcomes</h3>
            <p>Practiced curved surface design. Improved mesh-ready modeling. Applied design for aquatic environments.</p>
        </div>
      `,
    },
    lithophane: {
      title: "Lithophane",
      description: `
        <div class="project-detail">
            <h3>Design Overview</h3>
            <p>3D printed light art using image to lithophane maker website, revealing images when backlit with precision thickness variations. This technique creates stunning visual effects by controlling light transmission through varying material thickness.</p>

            <h3>Key Features</h3>
            <ul>
                <li>Precision thickness control</li>
                <li>Light transmission optimization</li>
                <li>Image conversion algorithm</li>
                <li>Backlit display capability</li>
            </ul>

            <h3>Technical Details</h3>
            <div class="tech-tags">
                <span>Light Art</span>
                <span>Precision Printing</span>
                <span>Photography</span>
                <span>Light Transmission</span>
            </div>

            <h3>Process</h3>
            <p>Created using image to lithophane maker website by converting images to height maps where darker areas become thicker material, controlling light transmission. When backlit, the varying thickness creates the original image through light and shadow.</p>

            <div class="project-images">
                <video controls>
                    <source src="assets/designs/lithophane/litho.mp4" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
                <img src="assets/designs/lithophane/litho_a.jpg" alt="Lithophane View A">
                <img src="assets/designs/lithophane/litho_b.jpg" alt="Lithophane View B">
                <img src="assets/designs/lithophane/litho_c.jpg" alt="Lithophane View C">
            </div>
        </div>
      `,
    },
    bench: {
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
    benchwise: {
      title: "Benchwice – 2D to 3D Modeling & Assembly",
      description: `
        <div class="project-detail">
            <h3>Project Overview</h3>
            <p>Benchwice is a fully modeled and assembled bench vice created in CATIA V5, based entirely on a 2D engineering drawing. The project involved modeling all individual components and assembling them with proper constraints.</p>

            <h3>Key Features</h3>
            <ul>
                <li>Complete 3D model from 2D technical sketch</li>
                <li>Fully constrained assembly using CATIA's Assembly module</li>
                <li>Functional elements: screw rod, movable jaw, locknut, and grip surfaces</li>
            </ul>

            <h3>Tools & Technologies</h3>
            <div class="tech-tags">
                <span>Software: CATIA V5</span>
                <span>Modules Used: Part Design, Assembly Design</span>
                <span>Components: 15+ modeled parts, including screws, jaws, washers, and fasteners</span>
            </div>

            <h3>Learning Outcomes</h3>
            <p>Practiced interpreting 2D views into 3D components. Gained hands-on experience in constraint-based mechanical assembly. Improved attention to part interaction and fit in mechanical designs.</p>
        </div>
      `,
    },
    "bush-bearing": {
      title: "Bushed Bearing – 3D Modeling & Assembly",
      description: `
        <div class="project-detail">
            <h3>Project Overview</h3>
            <p>This is a simple bush-bearing assembly designed in CATIA V5 from scratch. The model includes the shaft, bush, and mounting block, assembled using proper constraints to simulate functional placement.</p>

            <h3>Key Features</h3>
            <ul>
                <li>Three-part assembly: shaft, bush, and base block</li>
                <li>Concentric and surface contact constraints</li>
                <li>Realistic representation of bearing support design</li>
            </ul>

            <h3>Tools & Technologies</h3>
            <div class="tech-tags">
                <span>Software: CATIA V5</span>
                <span>Modules Used: Part Design, Assembly Design</span>
            </div>

            <h3>Learning Outcomes</h3>
            <p>Practiced basic mechanical part modeling. Applied precise constraint definitions for fitting assemblies. Strengthened understanding of part alignment and tolerancing.</p>
        </div>
      `,
    },
    "universal-coupling": {
      title: "Universal Coupling – Mechanical Joint Design",
      description: `
        <div class="project-detail">
            <h3>Project Overview</h3>
            <p>This universal coupling was modeled and assembled in CATIA V5 to understand the working of rotary motion transmission between non-collinear shafts. It was created from a 2D drawing and includes all core components like forks, pins, and shaft connectors.</p>

            <h3>Key Features</h3>
            <ul>
                <li>Fully functional mechanical joint</li>
                <li>Modeled from standard 2D views</li>
                <li>Rotation-capable design with realistic constraints</li>
            </ul>

            <h3>Tools & Technologies</h3>
            <div class="tech-tags">
                <span>Software: CATIA V5</span>
                <span>Modules Used: Part Design, Assembly Design</span>
            </div>

            <h3>Learning Outcomes</h3>
            <p>Learned mechanical joint assembly and movement constraints. Practiced designing parts with rotational symmetry. Enhanced understanding of mechanical motion transfer systems.</p>
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

            <div class="project-images">
                <img src="assets/designs/polygon_design_cup/polygon_design_cup_a.jpg" alt="Polygon Cup View A">
                <img src="assets/designs/polygon_design_cup/polygon_design_cup_b.jpg" alt="Polygon Cup View B">
            </div>
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

            <div class="project-images">
                <img src="assets/designs/wave_cup/wave_cup_3d_printed.jpg" alt="Wave Cup 3D Printed">
                <img src="assets/designs/wave_cup/wave_cup_3d_printed_a.jpg" alt="Wave Cup 3D Printed View A">
                <img src="assets/designs/wave_cup/wave_cup_3d_printed_b.jpg" alt="Wave Cup 3D Printed View B">
            </div>
        </div>
      `,
    },
    "cube-post-processed": {
      title: "Cube Post Processed",
      description: `
        <div class="project-detail">
            <h3>Design Overview</h3>
            <p>A 3D printed cube with advanced post-processing techniques and surface finishing. This project demonstrates the importance of post-processing in achieving professional-quality 3D prints.</p>

            <h3>Key Features</h3>
            <ul>
                <li>Advanced post-processing techniques</li>
                <li>Surface finishing methods</li>
                <li>Quality enhancement</li>
                <li>Professional finish</li>
            </ul>

            <h3>Technical Details</h3>
            <div class="tech-tags">
                <span>Post-Processing</span>
                <span>Surface Finish</span>
                <span>Quality Enhancement</span>
                <span>Professional Finish</span>
            </div>

            <h3>Process</h3>
            <p>Demonstrates various post-processing techniques including sanding, priming, painting, and surface treatment to achieve a professional-quality finish on 3D printed parts.</p>

            <div class="project-images">
                <img src="assets/designs/cube_post_processed/cube_post_processed_a.jpg" alt="Cube Post Processed View A">
                <img src="assets/designs/cube_post_processed/cube_post_processed_b.jpg" alt="Cube Post Processed View B">
            </div>
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

            <div class="project-images">
                <img src="assets/designs/juice mixer/assembled_view.png" alt="Juice Mixer Assembled">
                <img src="assets/designs/juice mixer/cover.png" alt="Juice Mixer Cover">
                <img src="assets/designs/juice mixer/motor_holder_cover.png" alt="Motor Holder Cover">
                <video autoplay muted loop>
                            <source src="assets/designs/juice mixer/juice_mixer_3d_printed.mp4" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
            </div>
        </div>
      `,
    },
    "radial-engine-3d-printed": {
      title: "Radial Engine 3D Printed",
      description: `
        <div class="project-detail">
            <h3>Project Overview</h3>
            <p>3D printed six-cylinder radial engine with working mechanical motion and assembly. This project demonstrates the capabilities of 3D printing for complex mechanical assemblies.</p>

            <h3>Key Features</h3>
            <ul>
                <li>Fully functional 3D printed radial engine</li>
                <li>Working mechanical motion and assembly</li>
                <li>Precision 3D printing techniques</li>
                <li>Complex multi-part assembly</li>
            </ul>

            <h3>Tools & Technologies</h3>
            <div class="tech-tags">
                <span>3D Printing</span>
                <span>Mechanical Assembly</span>
                <span>Precision Design</span>
            </div>

            <h3>Learning Outcomes</h3>
            <p>Demonstrated advanced 3D printing capabilities for complex mechanical assemblies. Learned precision design for 3D printed moving parts. Gained experience in multi-part assembly design.</p>

            <div class="project-images">
                <video controls>
                    <source src="assets/designs/radial_engine_3d_printed.mp4" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            </div>
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

function initializeCertifications() {
  // Add animation delay for certification cards
  certCards.forEach((card, index) => {
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
  closeProjectModal,
}; 