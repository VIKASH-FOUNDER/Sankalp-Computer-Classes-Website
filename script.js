// =========================================
// 1. REGISTER BUTTON LOGIC (Fixed with 'if' check)
// =========================================
const registerBtn = document.getElementById('registerBtn');

// Check if button exists before adding event listener / Pehle check karein ki button hai ya nahi
if (registerBtn) {
    registerBtn.addEventListener('click', function() {
        alert("Redirecting to the Registration Page... \nRegistration page par le jaya ja raha hai...");
        // window.location.href = "register.html";
    });
}


// =========================================
// 2. DARK/LIGHT THEME TOGGLE LOGIC
// =========================================

// Selecting the theme toggle button / Theme badalne wale button ko select karna
const themeToggle = document.getElementById("themeToggle");

// Only run theme code if themeToggle button exists in HTML
if (themeToggle) {
    // Checking device default setting / Device ki default setting check karna
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

    // Checking if user previously saved a preference / Local storage check karna
    const currentTheme = localStorage.getItem("theme");

    // Function to apply theme / Theme lagane ka function
    function applyTheme(isDark) {
        if (isDark) {
            document.body.classList.add("dark-mode");
            themeToggle.innerText = "☀️"; // Show Sun icon
        } else {
            document.body.classList.remove("dark-mode");
            themeToggle.innerText = "🌙"; // Show Moon icon
        }
    }

    // Initial Setup / Shuruwati theme set karna
    if (currentTheme === "dark") {
        applyTheme(true);
    } else if (currentTheme === "light") {
        applyTheme(false);
    } else if (prefersDarkScheme.matches) {
        applyTheme(true);
    } else {
        applyTheme(false);
    }

    // Button Click Event / Button dabane par theme badalna
    themeToggle.addEventListener("click", function() {
        document.body.classList.toggle("dark-mode");
        
        let theme = "light";
        if (document.body.classList.contains("dark-mode")) {
            theme = "dark";
            themeToggle.innerText = "☀️";
        } else {
            themeToggle.innerText = "🌙";
        }
        
        // Save user choice / User ki choice save karna
        localStorage.setItem("theme", theme);
    });

    // Listen for changes in device settings / Device setting badalne par update karna
    prefersDarkScheme.addEventListener("change", (e) => {
        if (!localStorage.getItem("theme")) {
            applyTheme(e.matches);
        }
    });
}


// =========================================
// 3. MOBILE HAMBURGER MENU LOGIC
// =========================================

const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const navLinksContainer = document.getElementById("navLinks");

if (mobileMenuBtn && navLinksContainer) {
    // Click hone par menu kholna ya band karna
    mobileMenuBtn.addEventListener("click", function() {
        navLinksContainer.classList.toggle("active");
    });
}

// ==========================================================================
// HERO SLIDER FUNCTIONALITY (Single Clean Instance - 5s Smooth Slide)
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    const sliderTrack = document.getElementById('sliderTrack');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dots = document.querySelectorAll('.dot');
    const heroSlider = document.querySelector('.hero-slider');

    if (!sliderTrack || !slides.length) return;

    let currentIndex = 0;
    let slideInterval = null;
    const intervalTime = 5000; // Har slide 5 second rukegi
    const totalSlides = slides.length;

    function updateSliderPosition() {
        sliderTrack.style.transform = `translateX(-${currentIndex * 100}%)`;

        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSliderPosition();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateSliderPosition();
    }

    function startSlider() {
        stopSlider(); // Pehle purana timer clear karein taaki double speed na ho
        slideInterval = setInterval(nextSlide, intervalTime);
    }

    function stopSlider() {
        if (slideInterval) {
            clearInterval(slideInterval);
            slideInterval = null;
        }
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            startSlider();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            startSlider();
        });
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateSliderPosition();
            startSlider();
        });
    });

    if (heroSlider) {
        heroSlider.addEventListener('mouseenter', stopSlider);
        heroSlider.addEventListener('mouseleave', startSlider);
    }

    // Tab switch karne par timer sync rakhne ke liye
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopSlider();
        } else {
            startSlider();
        }
    });

    updateSliderPosition();
    startSlider();
});
// --- HERO SLIDER ENDS HERE

// --- SEAMLESS TESTIMONIALS INFINITE SLIDER ---
document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('testimonialTrack');
    if (track) {
        // Track ke andar ke cards ko clone karke wapas append kar dein
        const cards = track.innerHTML;
        track.innerHTML += cards;
    }
});

// --- FAQ ACCORDION TOGGLE ---
document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.notes = faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        questionBtn.addEventListener('click', () => {
            // Agar pehle se active nahi hai toh baaki sabhi band kar do
            const isActive = item.classList.contains('active');
            
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });

            // Agar active nahi tha toh ise khol do
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
});




// 
// =========================================
// SMOOTH SCROLL FOR LOGO & INTERNAL LINKS
// =========================================
document.addEventListener('DOMContentLoaded', () => {
    const smoothLinks = document.querySelectorAll('a[href^="#"]');

    smoothLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Agar href sirf "#" hai ya empty hai toh kuch mat karo
            if (!targetId || targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault(); // Default jump ko roko
                
                // Smooth scroll execution
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Mobile menu khula ho toh click hote hi band ho jaye
                const navLinksContainer = document.getElementById('navLinks');
                if (navLinksContainer && navLinksContainer.classList.contains('active')) {
                    navLinksContainer.classList.remove('active');
                }
            }
        });
    });
});






/* ========================================================================== */
/* SMOOTH PAGE TRANSITION ON INTERNAL LINK CLICKS */
/* ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // Website ke sabhi internal HTML links ko select karo (jaise courses.html, about.html, etc.)
    const internalLinks = document.querySelectorAll('a[href$=".html"]');

    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetUrl = this.getAttribute('href');     // Jis page par jana hai uska URL
            const targetBlank = this.getAttribute('target'); // Check karo ki naye tab me khul raha hai kya

            // Agar link naye tab me khul raha hai (_blank) ya page ke andar ka hi anchor link (#) hai, toh transition mat roko
            if (targetBlank === '_blank' || targetUrl.startsWith('#')) {
                return; 
            }

            e.preventDefault(); // Browser ke default instant hard reload ko turant roko

            // Body par exit animation class add karo jo humne CSS me banai hai
            document.body.classList.add('page-is-exiting');

            // 300 milliseconds (0.3 sec) ka wait karne ke baad naye page par smoothly redirect karo
            setTimeout(() => {
                window.location.href = targetUrl;
            }, 300);
        });
    });

});

/* ========================================================================== */
/* SMOOTH PAGE TRANSITION ON INTERNAL LINK CLICKS ENDS HERE */
/* ========================================================================== */

/* ========================================================================== */
/* ALL 16 COURSES DATA, CATALOG GRID, DETAILS PAGE & CONTACT PRE-FILL START   */
/* ========================================================================== */

// 1. Exact 16 Courses Array (Image ke sequence & duration ke mutabik)
const SANKALP_ALL_COURSES = [
    {
        id: "basic-computer-course",
        title: "BASIC COMPUTER COURSE",
        durationMonths: "3 Months",
        category: "office-accounts",
        categoryLabel: "Foundation & Office",
        rating: "4.9",
        reviews: "1.6k+",
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop",
        badge: "FOUNDATION",
        badgeClass: "",
        shortDesc: "Computer fundamentals, Windows OS, MS Office (Word, Excel, PowerPoint), Internet aur typing basics.",
        tags: ["Windows", "MS Office", "Internet"],
        eligibility: "8th / 10th / Any Beginner",
        objective: "Naye students aur beginners ko computer operation, file management, MS Word documentation, basic Excel spreadsheets, PowerPoint presentations aur safe internet usage mein confident banana.",
        careers: ["Computer Operator", "Data Entry Executive", "Back Office Assistant", "Front Desk Coordinator"],
        syllabus: [
            { module: "Module 1: Computer Fundamentals & Windows OS", topics: "Hardware & software concepts, booting, Windows settings, file/folder management & keyboard shortcuts." },
            { module: "Module 2: Microsoft Word", topics: "Document formatting, page setup, tables, headers/footers, mail merge & official letter/resume drafting." },
            { module: "Module 3: Microsoft Excel & PowerPoint", topics: "Basic formulas (SUM, AVERAGE, COUNT, IF), charts, slide design, transitions & presentations." },
            { module: "Module 4: Internet, Email & Digital Services", topics: "Web browsing, Gmail etiquette, Google Drive basics, online forms & cyber safety practices." }
        ]
    },
    {
        id: "advanced-excel",
        title: "ADVANCED EXCEL",
        durationMonths: "2 Months",
        category: "office-accounts",
        categoryLabel: "Corporate & MIS",
        rating: "4.9",
        reviews: "1.2k+",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
        badge: "HIGH DEMAND",
        badgeClass: "trending",
        shortDesc: "XLOOKUP, VLOOKUP, INDEX-MATCH, Pivot Tables, MIS reporting, Macros aur dynamic dashboards.",
        tags: ["XLOOKUP", "Pivot Tables", "MIS Reports"],
        eligibility: "Basic Computer Knowledge",
        objective: "Students aur working professionals ko corporate data analysis, automated MIS reporting, complex lookup formulas aur interactive visual dashboards banane mein expert banana.",
        careers: ["MIS Executive", "Data Analyst (Excel)", "Operations Coordinator", "Accounts & Billing Analyst"],
        syllabus: [
            { module: "Module 1: Advanced Logical & Lookup Formulas", topics: "XLOOKUP, VLOOKUP, HLOOKUP, INDEX-MATCH, IF/IFS, SUMIFS, COUNTIFS, TEXT & DATE functions." },
            { module: "Module 2: Data Cleaning & Validation", topics: "Text-to-Columns, Remove Duplicates, Flash Fill, Data Validation dropdowns & Conditional Formatting." },
            { module: "Module 3: Pivot Tables & MIS Reporting", topics: "Multi-level Pivot Tables, Calculated Fields, Slicers, Timelines & automated weekly/monthly MIS sheets." },
            { module: "Module 4: Dashboards & Macro Basics", topics: "KPI cards, dynamic charts, interactive dashboards & basic Macro recording for repetitive tasks." }
        ]
    },
    {
        id: "tally-with-e-accounting",
        title: "Tally With E-Accounting",
        durationMonths: "6 Months",
        category: "office-accounts",
        categoryLabel: "Accounts & GST",
        rating: "4.9",
        reviews: "1.1k+",
        image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=800&auto=format&fit=crop",
        badge: "JOB READY",
        badgeClass: "",
        shortDesc: "TallyPrime accounting, GST billing, e-Way Bill, TDS/TCS, payroll, inventory aur balance sheet.",
        tags: ["TallyPrime", "GST Returns", "E-Accounting"],
        eligibility: "10th / 12th / Commerce & Non-Commerce",
        objective: "Practical business accounting, GST taxation, inventory control, banking reconciliation aur statutory e-accounting compliance ke saath job-ready accountant taiyar karna.",
        careers: ["Accounts Executive", "GST Billing Operator", "Tally Accountant", "Audit & Tax Assistant"],
        syllabus: [
            { module: "Module 1: Accounting Principles & TallyPrime Setup", topics: "Golden rules of accounting, company creation, ledgers, groups, cost centers & voucher entries." },
            { module: "Module 2: Inventory & Order Processing", topics: "Stock groups, stock items, godowns, batch-wise details, purchase/sales orders & invoice printing." },
            { module: "Module 3: GST & E-Accounting Compliance", topics: "CGST, SGST, IGST, HSN/SAC, Input Tax Credit (ITC), GSTR-1/2B/3B overview & e-Way Bill." },
            { module: "Module 4: Banking, Payroll & Final Accounts", topics: "Bank Reconciliation (BRS), TDS/TCS basics, employee payroll, Trial Balance, P&L & Balance Sheet." }
        ]
    },
    {
        id: "basic-plus-ai",
        title: "BASIC PLUS AI (Smart Office & Cloud Mastery)",
        durationMonths: "3 Months",
        category: "office-accounts",
        categoryLabel: "Smart Office & AI",
        rating: "5.0",
        reviews: "940+",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop",
        badge: "NEW & TRENDING",
        badgeClass: "trending",
        shortDesc: "MS Office + Google Workspace cloud tools ke saath modern AI productivity & prompt skills.",
        tags: ["AI Tools", "Google Workspace", "Cloud Office"],
        eligibility: "Any Student / Working Professional",
        objective: "Traditional computer basics ke saath Google Workspace (Docs, Sheets, Drive, Forms) aur practical AI tools ka smart istemal sikhana taaki office kaam 3x tezi se ho sake.",
        careers: ["Smart Office Executive", "Digital Coordinator", "Executive Assistant", "Freelance Virtual Assistant"],
        syllabus: [
            { module: "Module 1: Modern Computer & MS Office Core", topics: "Windows productivity, MS Word, Excel & PowerPoint essential corporate workflows." },
            { module: "Module 2: Google Workspace & Cloud Mastery", topics: "Google Drive sharing permissions, Docs, Sheets collaboration, Google Forms & Calendar." },
            { module: "Module 3: Practical AI Tools for Office", topics: "Prompt writing, AI email & report drafting, presentation generation & Excel formula assistance." },
            { module: "Module 4: Digital Hygiene & Cloud Backup", topics: "Two-factor authentication, cloud sync, PDF conversion tools & safe online collaboration." }
        ]
    },
    {
        id: "diploma-in-computer-application",
        title: "Diploma in Computer Application",
        durationMonths: "9 Months",
        category: "diploma-nielit",
        categoryLabel: "9-Month Diploma",
        rating: "4.9",
        reviews: "1.3k+",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop",
        badge: "",
        badgeClass: "",
        shortDesc: "Office automation, Advanced Excel, TallyPrime accounting, internet aur web basics ka complete diploma.",
        tags: ["DCA", "MS Office", "Tally & Web"],
        eligibility: "10th / 12th Pass",
        objective: "Students ko office administration, data management, accounting software aur basic web technologies mein multi-skilled diploma graduate banana.",
        careers: ["Office Administrator", "Computer Instructor", "MIS & Accounts Assistant", "Data Entry Specialist"],
        syllabus: [
            { module: "Module 1: IT Fundamentals & Operating Systems", topics: "Computer architecture, Windows administration, file systems & utility software." },
            { module: "Module 2: Complete Office Automation", topics: "Advanced MS Word, Advanced Excel reporting & professional PowerPoint decks." },
            { module: "Module 3: Accounting & Database Basics", topics: "TallyPrime with GST billing fundamentals & relational database (MS Access/SQL) intro." },
            { module: "Module 4: Internet, HTML Basics & Practical Project", topics: "Web page creation using HTML/CSS basics, cloud tools & final diploma project." }
        ]
    },
    {
        id: "advanced-diploma-in-computer-application",
        title: "Advanced Diploma in Computer Application",
        durationMonths: "12 to 15 Months",
        category: "diploma-nielit",
        categoryLabel: "1-Year+ Flagship Diploma",
        rating: "5.0",
        reviews: "1.8k+",
        image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop",
        badge: "MOST POPULAR",
        badgeClass: "",
        shortDesc: "Office Automation, TallyPrime GST, Graphic Designing, Web Designing aur Programming ka all-in-one course.",
        tags: ["ADCA", "Tally & Graphic", "Web & Python"],
        eligibility: "10th / 12th / Undergraduate",
        objective: "Ek comprehensive 12–15 mahine ka career diploma jisme office management, accounting, graphic design aur coding skills ek saath cover hoti hain.",
        careers: ["IT & Office Executive", "Junior Web Designer", "Graphic & DTP Operator", "Accounts & MIS Officer"],
        syllabus: [
            { module: "Module 1: Office Automation & Advanced Excel", topics: "MS Office 2021, Google Workspace, MIS formulas, Pivot Tables & dashboards." },
            { module: "Module 2: TallyPrime & GST E-Accounting", topics: "Complete accounting vouchers, inventory, GST returns & financial statements." },
            { module: "Module 3: Graphic Designing Essentials", topics: "CorelDRAW vector logos/posters & Adobe Photoshop photo editing & social banners." },
            { module: "Module 4: Web Designing & Programming Intro", topics: "HTML5, CSS3, JavaScript basics, Python fundamentals & capstone project." }
        ]
    },
    {
        id: "mern-development",
        title: "MERN Development",
        durationMonths: "12 Months",
        category: "web-coding",
        categoryLabel: "Full Stack Engineering",
        rating: "5.0",
        reviews: "1.5k+",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop",
        badge: "CAREER TRACK",
        badgeClass: "trending",
        shortDesc: "MongoDB, Express.js, React.js aur Node.js ke saath complete full-stack web applications banayein.",
        tags: ["MongoDB", "Express", "React", "Node.js"],
        eligibility: "12th / College Students / Any Stream",
        objective: "Zero se modern JavaScript full-stack engineer banana—scalable React frontends, secure Node/Express REST APIs aur MongoDB databases deploy karne tak.",
        careers: ["MERN Stack Developer", "Full Stack Web Developer", "React Frontend Engineer", "Node.js Backend Developer"],
        syllabus: [
            { module: "Module 1: HTML5, CSS3, Responsive UI & Git", topics: "Semantic HTML, Flexbox, Grid, Tailwind/CSS, Git version control & GitHub workflows." },
            { module: "Module 2: Modern JavaScript (ES6+) & React.js", topics: "Closures, async/await, Fetch API, React components, Hooks, Context/Redux & routing." },
            { module: "Module 3: Node.js, Express.js & REST APIs", topics: "Server architecture, middleware, JWT authentication, role-based access & file uploads." },
            { module: "Module 4: MongoDB & Full-Stack Capstone", topics: "Schema modeling with Mongoose, aggregation, payment/email integration & cloud deployment." }
        ]
    },
    {
        id: "frontend-development",
        title: "Frontend Development",
        durationMonths: "12 Months",
        category: "web-coding",
        categoryLabel: "UI & Web Engineering",
        rating: "4.9",
        reviews: "910+",
        image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop",
        badge: "",
        badgeClass: "",
        shortDesc: "Modern UI/UX, HTML5, CSS3, JavaScript, React.js, API integration aur performance optimization and live your site on Vercel/netlify.",
        tags: ["HTML/CSS", "JavaScript", "React.js"],
        eligibility: "10th / 12th / Any Stream",
        objective: "Pixel-perfect, fast, accessible aur interactive web interfaces design aur develop karne mein mastery hasil karna.",
        careers: ["Frontend Developer", "React.js Developer", "UI Engineer", "Web Application Developer"],
        syllabus: [
            { module: "Module 1: Advanced HTML5 & Modern CSS3", topics: "Accessibility, CSS Grid, Flexbox, animations, custom variables & mobile-first design." },
            { module: "Module 2: Deep-Dive JavaScript & DOM", topics: "ES6+ features, event loop, DOM manipulation, local storage & asynchronous programming." },
            { module: "Module 3: React.js & State Management", topics: "Reusable UI components, custom hooks, forms validation, API state & single-page apps." },
            { module: "Module 4: Testing, SEO & Deployment", topics: "Lighthouse performance tuning, cross-browser compatibility & Vercel/Netlify hosting." }
        ]
    },
    {
        id: "backend-development",
        title: "Backend Development",
        durationMonths: "12 Months",
        category: "web-coding",
        categoryLabel: "Server, APIs & Databases",
        rating: "4.9",
        reviews: "780+",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
        badge: "",
        badgeClass: "",
        shortDesc: "Server-side programming, RESTful APIs, authentication, SQL & NoSQL databases aur security and web ko live kre Vercel/netlify/Render/Railway ki help se.",
        tags: ["Node/Express", "SQL & MongoDB", "REST APIs"],
        eligibility: "Basic Programming / Computer Knowledge",
        objective: "High-performance backend servers, secure user authentication, relational & NoSQL database architecture aur scalable APIs banana sikhana.",
        careers: ["Backend Developer", "API Engineer", "Node.js Developer", "Database & Server Administrator"],
        syllabus: [
            { module: "Module 1: Server Architecture & Node.js Core", topics: "HTTP/HTTPS protocols, request-response lifecycle, Node.js runtime & Express routing." },
            { module: "Module 2: Databases (SQL & MongoDB)", topics: "Relational schema design, joins, indexing, transactions & NoSQL document modeling." },
            { module: "Module 3: Authentication & Security", topics: "Password hashing (bcrypt), JWT tokens, sessions, CORS, rate limiting & input validation." },
            { module: "Module 4: API Documentation & Deployment", topics: "Postman testing, Swagger docs, environment variables & production server hosting." }
        ]
    },
    {
        id: "web-designing-static",
        title: "Web Designing (HTML, CSS & JavaScript) Static Website",
        durationMonths: "3 Months",
        category: "web-coding",
        categoryLabel: "Static Web Design",
        rating: "4.8",
        reviews: "1.1k+",
        image: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=800&auto=format&fit=crop",
        badge: "",
        badgeClass: "",
        shortDesc: "HTML5, CSS3 aur JavaScript ke saath responsive business websites aur landing pages design karein.",
        tags: ["HTML5", "CSS3", "JavaScript"],
        eligibility: "Basic Computer Knowledge",
        objective: "3 mahine mein clean, responsive aur fast static websites banana sikhana jo mobile, tablet aur desktop par seamlessly chalein.",
        careers: ["Web Designer", "HTML/CSS Developer", "Freelance Website Designer", "Landing Page Designer"],
        syllabus: [
            { module: "Module 1: HTML5 Structure & Semantic Tags", topics: "Headings, forms, tables, multimedia embedding, SEO meta tags & clean markup." },
            { module: "Module 2: CSS3 Styling & Responsive Layouts", topics: "Box model, Flexbox, CSS Grid, transitions, hover effects & media queries." },
            { module: "Module 3: Interactive JavaScript Basics", topics: "Mobile navbar toggle, image sliders, modal popups, tabs & form validation." },
            { module: "Module 4: Live Website Hosting", topics: "Domain & hosting basics, GitHub Pages / Netlify deployment & portfolio website." }
        ]
    },
    {
        id: "web-development-dynamic",
        title: "Advanced Full-Stack + AI & Cloud Diploma",
        durationMonths: "9 Months",
        category: "web-coding",
        categoryLabel: "Dynamic Web & ReactJS",
        rating: "4.9",
        reviews: "1.3k+",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800&auto=format&fit=crop",
        badge: "POPULAR",
        badgeClass: "",
        shortDesc: "HTML, CSS, Tailwind CSS, JS, Git & GitHub version control aur ReactJS, Node.js, Express.js, MongoDB ke saath dynamic web apps banayein or Website ko live karein (Vercel/netlify/Render/Railway use krke).",
        tags: ["HTML/CSS/JS", "Git & GitHub", "ReactJS"],
        eligibility: "10th / 12th / Any Stream",
        objective: "Static pages se aage badhkar Git/GitHub collaboration aur ReactJS ke zariye dynamic, API-driven modern web applications banana sikhana.",
        careers: ["ReactJS Developer", "Junior Frontend Developer", "Dynamic Web Developer", "UI Developer"],
        syllabus: [
            { module: "Module 1: Responsive Web Core (HTML5 & CSS3)", topics: "Modern layouts, Flexbox/Grid, CSS animations & responsive design patterns." },
            { module: "Module 2: JavaScript ES6+ & API Integration", topics: "Arrow functions, array methods, promises, async/await & live JSON API fetching." },
            { module: "Module 3: Git & GitHub Version Control", topics: "Repositories, commits, branches, pull requests & team collaboration workflow." },
            { module: "Module 4: ReactJS Dynamic Applications", topics: "Components, props, useState/useEffect hooks, React Router & dynamic web project." }
        ]
    },
    {
        id: "python-with-sql",
        title: "Python with SQL & No-SQL",
        durationMonths: "9 Months",
        category: "web-coding",
        categoryLabel: "Programming & Databases",
        rating: "4.9",
        reviews: "1.0k+",
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop",
        badge: "",
        badgeClass: "",
        shortDesc: "Core & Advanced Python programming ke saath relational SQL queries aur database connectivity.",
        tags: ["Python", "SQL Queries", "Database Apps"],
        eligibility: "10th / 12th / Any Stream",
        objective: "Strong programming logic, OOPs, data handling aur relational SQL databases ko Python applications ke saath connect karke real software banana sikhana.",
        careers: ["Python Developer", "SQL & Database Analyst", "Backend Associate", "Automation Engineer"],
        syllabus: [
            { module: "Module 1: Core Python & Problem Solving", topics: "Data types, control flow, loops, functions, recursion & algorithmic thinking." },
            { module: "Module 2: Data Structures, File Handling & OOPs", topics: "Lists, tuples, sets, dicts, CSV/JSON handling, classes, inheritance & modules." },
            { module: "Module 3: Relational Databases & SQL", topics: "DDL/DML commands, SELECT, WHERE, GROUP BY, HAVING, Joins, Subqueries & Keys." },
            { module: "Module 4: Python-SQL Integration & Projects", topics: "Connecting Python with MySQL/SQLite, CRUD applications & data reporting scripts." }
        ]
    },
    {
        id: "hindi-typing",
        title: "Hindi Typing",
        durationMonths: "3 Months",
        category: "typing",
        categoryLabel: "Govt. Exam & Office Skill",
        rating: "4.8",
        reviews: "890+",
        image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=800&auto=format&fit=crop",
        badge: "",
        badgeClass: "",
        shortDesc: "Kruti Dev 010 aur Mangal (Inscript/Remington Gail) layouts mein 30+ WPM accuracy ke saath Hindi typing.",
        tags: ["Kruti Dev 010", "Mangal Font", "30+ WPM"],
        eligibility: "Any Student / Govt. Exam Aspirant",
        objective: "SSC, High Court, State Clerk aur office documentation ke liye Kruti Dev aur Mangal Unicode fonts mein high speed aur 98%+ accuracy develop karna.",
        careers: ["Hindi Data Entry Operator", "Court / Govt. Clerk Aspirant", "Hindi DTP Operator", "Office Assistant"],
        syllabus: [
            { module: "Module 1: Home Row, Top Row & Bottom Row", topics: "Finger placement, touch typing posture & blind-key familiarity without looking at keyboard." },
            { module: "Module 2: Kruti Dev 010 & Alt Character Codes", topics: "Matras, half-letters (sanyukt akshar), special Hindi symbols & Alt-code combinations." },
            { module: "Module 3: Mangal Unicode (Inscript / Remington)", topics: "Government exam standard Unicode Hindi typing layout & backspace control." },
            { module: "Module 4: Timed Speed & Accuracy Mock Tests", topics: "10-minute & 15-minute exam-pattern passages targeting 30–40 WPM with high accuracy." }
        ]
    },
    {
        id: "english-typing",
        title: "English Typing",
        durationMonths: "3 Months",
        category: "typing",
        categoryLabel: "Speed & Accuracy Skill",
        rating: "4.9",
        reviews: "1.1k+",
        image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=800&auto=format&fit=crop",
        badge: "",
        badgeClass: "",
        shortDesc: "Scientific touch-typing technique ke saath 35–45+ WPM English typing speed aur zero-error accuracy.",
        tags: ["Touch Typing", "35-45+ WPM", "SSC / Clerk"],
        eligibility: "Any Student / Job Aspirant",
        objective: "Bina keyboard dekhe scientific touch-typing ke zariye 35 se 45+ WPM ki speed aur high accuracy hasil karna jo har computer job aur exam mein zaroori hai.",
        careers: ["Data Entry Operator", "SSC / Banking / Court Typist", "Back Office Executive", "Customer Support Executive"],
        syllabus: [
            { module: "Module 1: Touch Typing Fundamentals", topics: "Ergonomic posture, home row anchor keys (ASDF JKL;) & finger-to-key mapping." },
            { module: "Module 2: Alphabets, Numbers & Punctuation", topics: "Top/bottom rows, Shift-key capitalization, number row & office punctuation marks." },
            { module: "Module 3: Rhythm, Error Reduction & Numeric Keypad", topics: "Eliminating backspace habit, rhythm drills & fast 10-key numeric pad entry." },
            { module: "Module 4: Live Exam & Corporate Speed Tests", topics: "Daily timed paragraph tests to consistently achieve 35–45+ WPM." }
        ]
    },
    {
        id: "o-level-by-nielit",
        title: "O Level by NIELIT",
        durationMonths: "12 Months",
        category: "diploma-nielit",
        categoryLabel: "Govt. of India Certified",
        rating: "5.0",
        reviews: "1.7k+",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop",
        badge: "GOVT. RECOGNIZED",
        badgeClass: "",
        shortDesc: "NIELIT R5.1 syllabus ke mutabik IT Tools, Web Designing, Python Programming, IoT aur Project.",
        tags: ["NIELIT R5.1", "Python & Web", "IoT & Project"],
        eligibility: "10+2 (12th Pass) or ITI",
        objective: "Government jobs (UPSSSC, State & Central vacancies) aur IT sector ke liye valid NIELIT 'O' Level (Foundation) qualification complete karwana.",
        careers: ["Govt. Computer Assistant", "Junior Programmer", "Web Designer", "IT Lab Demonstrator"],
        syllabus: [
            { module: "M1-R5.1: Information Technology Tools & Network Basics", topics: "Computer fundamentals, OS, LibreOffice Writer/Calc/Impress, Internet & Digital Financial Tools." },
            { module: "M2-R5.1: Web Designing & Publishing", topics: "HTML5, CSS3, CSS Frameworks, JavaScript basics, photo editor & web publishing." },
            { module: "M3-R5.1: Programming & Problem Solving through Python", topics: "Algorithms, flowcharts, Python data types, control structures, functions, files & NumPy basics." },
            { module: "M4-R5.1: Internet of Things (IoT) & Practical Project", topics: "IoT architecture, sensors, Arduino/microcontrollers, C basics & NIELIT final project." }
        ]
    },
    {
        id: "ccc-by-nielit",
        title: "Course on Computer Concepts (CCC) by NIELIT",
        durationMonths: "3 to 4 Months",
        category: "diploma-nielit",
        categoryLabel: "Govt. Exam Mandatory",
        rating: "4.9",
        reviews: "2.0k+",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop",
        badge: "GOVT. EXAM ESSENTIAL",
        badgeClass: "trending",
        shortDesc: "NIELIT CCC exam preparation: Computer basics, OS, LibreOffice, Internet, Email aur Digital Payments.",
        tags: ["NIELIT CCC", "LibreOffice", "Digital Literacy"],
        eligibility: "Any Student (No Minimum Age)",
        objective: "State aur Central government vacancies mein mandatory NIELIT CCC exam ko first attempt mein clear karne ke liye complete theory + MCQ + practical taiyari.",
        careers: ["State Govt. Clerk / Lekhpal / Patwari", "Computer Operator", "Bank & Office Assistant", "Digital Seva Operator"],
        syllabus: [
            { module: "Module 1: Introduction to Computer & Operating System", topics: "Hardware/software, Ubuntu/Windows OS basics, file management & system settings." },
            { module: "Module 2: Word Processing, Spreadsheet & Presentation", topics: "LibreOffice Writer, Calc formulas/charts & Impress presentation slides." },
            { module: "Module 3: Internet, WWW, Email & Social Networking", topics: "Browsers, search engines, email protocols, e-Governance services & cyber security." },
            { module: "Module 4: Digital Financial Tools & FutureSkills", topics: "UPI, NEFT/RTGS/IMPS, AEPS, QR payments, AI/IoT/Cloud overview & CBT mock tests." }
        ]
    }
];

// Helper: New tab mein Contact Form kholne ka URL (Selected course ke saath)
function getContactEnrollUrl(courseTitle) {
    return `index.html?course=${encodeURIComponent(courseTitle)}#contact`;
}

// Helper: Explore > page ka URL (Selected course ID ke saath)
function getCourseExploreUrl(courseId) {
    return `coursedetails.htm?id=${encodeURIComponent(courseId)}`;
}

// ==========================================================================
// 2. COURSES.HTML PAGE RENDERING (3/4 Cards Per Row + Filters + Action Links)
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
    const catalogGrid = document.getElementById("coursesCatalogGrid");
    if (!catalogGrid) return;

    const filterPillsContainer = document.getElementById("courseFilterPills");
    const layoutToggleGroup = document.querySelector(".layout-toggle-group");

    function renderAllCourses(category = "all") {
        const filteredList = category === "all"
            ? SANKALP_ALL_COURSES
            : SANKALP_ALL_COURSES.filter(course => course.category === category);

        catalogGrid.innerHTML = filteredList.map((course, index) => {
            const badgeHtml = course.badge
                ? `<div class="popular-badge ${course.badgeClass}">${course.badge}</div>`
                : "";

            const tagsHtml = course.tags
                .map(tag => `<span class="tag">${tag}</span>`)
                .join("");

            return `
                <div class="course-card card-reveal" style="animation-delay: ${Math.min(index * 0.04, 0.35)}s;">
                    <div class="card-img-wrapper">
                        <img src="${course.image}" alt="${course.title}" class="card-img" loading="lazy">
                        ${badgeHtml}
                    </div>

                    <div class="course-content">
                        <div class="course-top-info">
                            <span class="course-category">${course.categoryLabel}</span>
                            <div class="course-rating">
                                <span class="stars">★</span> <strong>${course.rating}</strong>
                            </div>
                        </div>

                        <h3 class="course-name">${course.title}</h3>
                        <p class="course-desc">${course.shortDesc}</p>

                        <div class="tech-tags">
                            ${tagsHtml}
                        </div>

                        <div class="course-meta">
                            <div class="meta-item">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <polyline points="12 6 12 12 16 14"></polyline>
                                </svg>
                                <span>Duration: ${course.durationMonths}</span>
                            </div>
                            <div class="meta-item">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                                    <line x1="8" y1="21" x2="16" y2="21"></line>
                                    <line x1="12" y1="17" x2="12" y2="21"></line>
                                </svg>
                                <span>100% Practical Lab Training</span>
                            </div>
                        </div>
                    </div>

                    <!-- Left: Enroll Now (New Tab Contact Page) | Right: Explore > (Dedicated Details Page) -->
                    <div class="course-dual-footer">
                        <a href="${getContactEnrollUrl(course.title)}" target="_blank" rel="noopener noreferrer" class="enroll-btn">
                            <span>ENROLL NOW</span>
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                <polyline points="12 5 19 12 12 19"></polyline>
                            </svg>
                        </a>

                        <a href="${getCourseExploreUrl(course.id)}" class="explore-chevron-btn">
                            <span>Explore &gt;</span>
                        </a>
                    </div>
                </div>
            `;
        }).join("");
    }

    // Initial render: Exact 16 courses sequence
    renderAllCourses("all");

    // Category filter click listener
    if (filterPillsContainer) {
        filterPillsContainer.addEventListener("click", (e) => {
            const btn = e.target.closest(".course-filter-btn");
            if (!btn) return;

            filterPillsContainer.querySelectorAll(".course-filter-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            renderAllCourses(btn.dataset.category);
        });
    }

    // 3 Cards vs 4 Cards per row switch listener
    if (layoutToggleGroup) {
        layoutToggleGroup.addEventListener("click", (e) => {
            const colBtn = e.target.closest(".layout-cols-btn");
            if (!colBtn) return;

            layoutToggleGroup.querySelectorAll(".layout-cols-btn").forEach(b => b.classList.remove("active"));
            colBtn.classList.add("active");

            catalogGrid.classList.remove("cols-3", "cols-4");
            catalogGrid.classList.add(`cols-${colBtn.dataset.cols}`);
        });
    }
});

// ==========================================================================
// 3. COURSE-DETAILS.HTML PAGE LOADER (Objective & Detailed Syllabus)
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
    const detailContainer = document.getElementById("courseDetailContainer");
    if (!detailContainer) return;

    const params = new URLSearchParams(window.location.search);
    const requestedId = params.get("id");

    // URL ke id se course find karein, agar id missing ho toh pehla course dikhayein
    const selectedCourse = SANKALP_ALL_COURSES.find(c => c.id === requestedId) || SANKALP_ALL_COURSES[0];

    document.title = `${selectedCourse.title} - Syllabus & Objective | Sankalp Computer Classes`;
    document.getElementById("detailCategoryBadge").textContent = selectedCourse.categoryLabel;
    document.getElementById("detailCourseTitle").textContent = selectedCourse.title;
    document.getElementById("detailCourseDesc").textContent = selectedCourse.shortDesc;
    document.getElementById("detailDuration").textContent = selectedCourse.durationMonths;
    document.getElementById("detailEligibility").textContent = selectedCourse.eligibility;
    document.getElementById("detailCourseImage").src = selectedCourse.image;
    document.getElementById("detailCourseImage").alt = selectedCourse.title;
    document.getElementById("detailObjectiveText").textContent = selectedCourse.objective;

    // Enroll Now button ko selected course ke saath link karna
    const enrollBtnEl = document.getElementById("detailEnrollBtn");
    if (enrollBtnEl) {
        enrollBtnEl.href = getContactEnrollUrl(selectedCourse.title);
    }

    // Career opportunities render karna
    const careerListEl = document.getElementById("detailCareerList");
    if (careerListEl) {
        careerListEl.innerHTML = selectedCourse.careers
            .map(role => `<li>✓ ${role}</li>`)
            .join("");
    }

    // Module-wise syllabus render karna
    const syllabusEl = document.getElementById("detailSyllabusModules");
    if (syllabusEl) {
        syllabusEl.innerHTML = selectedCourse.syllabus
            .map(mod => `
                <div class="syllabus-module-card">
                    <h3 class="syllabus-module-title">${mod.module}</h3>
                    <p class="syllabus-module-topics">${mod.topics}</p>
                </div>
            `)
            .join("");
    }
});

// ==========================================================================
// 4. CONTACT FORM: POPULATE ALL 16 COURSES & AUTO-FILL FROM URL (?course=)
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
    const selectCourseDropdown = document.getElementById("selectCourse");
    if (!selectCourseDropdown) return;

    const coursesList =
        typeof SANKALP_ALL_COURSES !== "undefined" && Array.isArray(SANKALP_ALL_COURSES)
            ? SANKALP_ALL_COURSES
            : [];

    // 1. Saare 16 courses dropdown mein add karna
    if (coursesList.length > 0) {
        selectCourseDropdown.innerHTML = '<option value="" disabled selected>Select course*</option>';

        coursesList.forEach((course) => {
            const option = document.createElement("option");
            option.value = course.title;
            option.textContent = `${course.title} (${course.durationMonths})`;
            selectCourseDropdown.appendChild(option);
        });
    }

    // 2. URL mein ?course= aaya ho to us option ko auto-select karna
    const urlParams = new URLSearchParams(window.location.search);
    const incomingCourse = (urlParams.get("course") || "").trim();

    if (incomingCourse) {
        const targetLower = incomingCourse.toLowerCase();

        let existingOption = Array.from(selectCourseDropdown.options).find(
            (opt) =>
                !opt.disabled &&
                (opt.value.toLowerCase() === targetLower ||
                    opt.textContent.toLowerCase().includes(targetLower))
        );

        if (!existingOption) {
            existingOption = new Option(incomingCourse, incomingCourse, true, true);
            selectCourseDropdown.add(existingOption);
        }

        selectCourseDropdown.value = existingOption.value;
    }
});



// Hero section of courses page
/* ========================================================================== */
/* INTERACTIVE 3D MOUSE TILT EFFECT FOR COURSES HERO STAGE                    */
/* ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
    const heroSection = document.getElementById("aiLearningStage");
    const tiltStage = document.getElementById("tilt3dStage");

    if (!heroSection || !tiltStage) return;

    // Desktop mouse movement par smooth 3D rotation apply karna
    heroSection.addEventListener("mousemove", (event) => {
        const rect = heroSection.getBoundingClientRect();
        const relX = (event.clientX - rect.left) / rect.width - 0.5;  // -0.5 se +0.5
        const relY = (event.clientY - rect.top) / rect.height - 0.5;  // -0.5 se +0.5

        const rotateY = relX * 16;  // Left-right 3D tilt angle
        const rotateX = -relY * 14; // Up-down 3D tilt angle

        tiltStage.style.animation = "none";
        tiltStage.style.transform = `rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
    });

    // Mouse bahar jaane par smooth gentle 3D floating animation wapas chalu karna
    heroSection.addEventListener("mouseleave", () => {
        tiltStage.style.transform = "";
        tiltStage.style.animation = "gentleFloat3D 6s ease-in-out infinite alternate";
    });
});

// Search live

// ==========================================================================
// 5. SECURE INQUIRY FORM SUBMISSION -> GOOGLE SHEET + DUAL EMAIL NOTIFICATION
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
    const inquiryForm = document.getElementById("inquiryForm");
    if (!inquiryForm) return;

    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxXaIC-eTVmAsJRgTuj1-vZrkX0e4tW0cUvli8hjQ-wsgh2nTB_jpGuyQqnzoo9CaVw1Q/exec";

    inquiryForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const fullName = document.getElementById("fullName").value.trim();
        const email = document.getElementById("emailAddress").value.trim();
        const phone = document.getElementById("phoneNumber").value.trim();
        const course = document.getElementById("selectCourse").value;
        const consent = document.getElementById("consentCheck").checked;
        const submitBtn = inquiryForm.querySelector(".apply-now-btn");

        // 1. Mandatory Fields & Consent Validation
        if (!fullName || !email || !phone || !course) {
            alert("Please fill in all mandatory fields! / कृपया सभी अनिवार्य विवरण भरें।");
            return;
        }

        if (!consent) {
            alert("Please authorize the consent checkbox to proceed! / कृपया आगे बढ़ने के लिए सहमति बॉक्स पर चेक करें।");
            return;
        }

        // 2. 10-Digit Indian Mobile Validation
        const phoneRegex = /^[6-9]\d{9}$/;
        if (!phoneRegex.test(phone)) {
            alert("Please enter a valid 10-digit mobile number! / कृपया मान्य 10-अंकों का मोबाइल नंबर दर्ज करें।");
            document.getElementById("phoneNumber").focus();
            return;
        }

        // 3. Email Format Validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address! / कृपया मान्य ईमेल आईडी दर्ज करें।");
            document.getElementById("emailAddress").focus();
            return;
        }

        // 4. Anti-Spam Check
        const spamCheckRegex = /(http:\/\/|https:\/\/|www\.|viagra|casino|crypto)/i;
        if (spamCheckRegex.test(fullName)) {
            alert("Spam links or promotional text are strictly not allowed!");
            return;
        }

        // Button loading state
        const originalBtnText = submitBtn.innerText;
        submitBtn.disabled = true;
        submitBtn.innerText = "Submitting...";

        try {
            await fetch(GOOGLE_SCRIPT_URL, {
                method: "POST",
                mode: "no-cors",
                headers: {
                    "Content-Type": "text/plain;charset=utf-8"
                },
                body: JSON.stringify({
                    fullName: fullName,
                    email: email,
                    phone: phone,
                    course: course,
                    consent: consent
                })
            });

            alert(
                "Thank you! Your inquiry has been submitted successfully. A confirmation email has been sent to your inbox.\n\nधन्यवाद! आपकी पूछताछ दर्ज हो गई है और आपको ईमेल भेज दिया गया है।"
            );
            inquiryForm.reset();
        } catch (error) {
            console.error("Form submission error:", error);
            alert("Network error! Please try again or call Helpline: +91-8700036420");
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerText = originalBtnText;
        }
    });
});

// ======================================================================================
// SECURE INQUIRY FORM SUBMISSION -> GOOGLE SHEET + DUAL EMAIL NOTIFICATION ENDS HERE
// ======================================================================================


