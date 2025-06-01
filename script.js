window.addEventListener('load', function() {
      const preloader = document.getElementById('preloader');
      setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
          preloader.style.display = 'none';
        }, 500);
      }, 1500);
    });

    // Initialize AOS
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
      const navbar = document.querySelector('.navbar');
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
      
      // Back to top button
      const backToTop = document.getElementById('back-to-top');
      if (window.scrollY > 300) {
        backToTop.classList.add('active');
      } else {
        backToTop.classList.remove('active');
      }
      
      // Update active nav link
      updateActiveNavLink();
    });

    // Mobile menu toggle
    const navbarToggler = document.getElementById('navbar-toggler');
    const navbarMenu = document.getElementById('navbar-menu');
    const navbarClose = document.getElementById('navbar-close');
    
    navbarToggler.addEventListener('click', function() {
      navbarMenu.classList.add('active');
    });
    
    navbarClose.addEventListener('click', function() {
      navbarMenu.classList.remove('active');
    });
    
    // Close mobile menu when clicking a nav link
    const navLinks = document.querySelectorAll('.navbar-menu a');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        navbarMenu.classList.remove('active');
      });
    });

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 70,
            behavior: 'smooth'
          });
        }
      });
    });

    // Update active nav link based on scroll position
    function updateActiveNavLink() {
      const sections = document.querySelectorAll('section');
      const navLinks = document.querySelectorAll('.navbar-menu a');
      
      let currentSection = '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          currentSection = section.getAttribute('id');
        }
      });
      
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
          link.classList.add('active');
        }
      });
    }

    // Typewriter effect
    const typewriterText = document.getElementById('typewriter-text');
    const phrases = [
      'SOftware Engineer',
      'Competitive Programmer',
      'Full Stack Developer',
      'Problem Solver',
      'Tech Enthusiast'
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function typeWriter() {
      const currentPhrase = phrases[phraseIndex];
      
      if (isDeleting) {
        // Deleting text
        typewriterText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
      } else {
        // Typing text
        typewriterText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
      }
      
      // If word is complete
      if (!isDeleting && charIndex === currentPhrase.length) {
        // Pause at end of phrase
        isDeleting = true;
        typingSpeed = 1500;
      } else if (isDeleting && charIndex === 0) {
        // Move to next phrase
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 500;
      }
      
      setTimeout(typeWriter, typingSpeed);
    }
    
    // Start the typewriter effect
    setTimeout(typeWriter, 1000);

    // Animate skill progress bars
    function animateSkillBars() {
      const skillBars = document.querySelectorAll('.skill-progress-fill');
      skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width;
      });
    }
    
    // Initialize skill bars animation
    setTimeout(animateSkillBars, 1000);

    // Projects filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        // Remove active class from all buttons
        filterBtns.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        this.classList.add('active');
        
        const filter = this.getAttribute('data-filter');
        
        projectCards.forEach(card => {
          if (filter === 'all') {
            card.style.display = 'block';
          } else {
            const categories = card.getAttribute('data-category').split(' ');
            if (categories.includes(filter)) {
              card.style.display = 'block';
            } else {
              card.style.display = 'none';
            }
          }
        });
      });
    });

    // Form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const formElements = contactForm.elements;
        const name = formElements[0].value;
        const email = formElements[1].value;
        const subject = formElements[2].value;
        const message = formElements[3].value;
        
        // Here you would typically send the form data to a server
        // For now, we'll just show an alert
        alert(`Thank you, ${name}! Your message has been received. I'll get back to you soon.`);
        
        // Reset form
        contactForm.reset();
      });
    }