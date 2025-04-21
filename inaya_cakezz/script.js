document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
      this.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
  }
  
  // Scroll Header Effect
  const header = document.querySelector('header');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
  
  // Smooth Scroll for Navigation Links
  const navItems = document.querySelectorAll('.nav-link');
  
  navItems.forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 80,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
          mobileMenuBtn.classList.remove('active');
        }
      }
    });
  });
  
  // Form Validation
  const contactForm = document.querySelector('.contact-form form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Basic validation
      let valid = true;
      const required = this.querySelectorAll('[required]');
      
      required.forEach(field => {
        if (!field.value.trim()) {
          valid = false;
          field.style.borderColor = 'red';
        } else {
          field.style.borderColor = '#ddd';
        }
      });
      
      if (valid) {
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
      } else {
        alert('Please fill in all required fields.');
      }
    });
  }
});

document.addEventListener('DOMContentLoaded', function() {
  // Select all testimonials
  const testimonials = document.querySelectorAll('.testimonial');
  
  // Set first testimonial as active
  if (testimonials.length > 0) {
    testimonials[0].classList.add('active');
  }
  
  // Create navigation dots
  const controls = document.createElement('div');
  controls.className = 'testimonial-controls';
  
  testimonials.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.className = 'testimonial-dot' + (index === 0 ? ' active' : '');
    dot.addEventListener('click', () => goToSlide(index));
    controls.appendChild(dot);
  });
  
  // Create arrows
  const arrowsContainer = document.createElement('div');
  arrowsContainer.className = 'testimonial-arrows';
  
  const prevArrow = document.createElement('div');
  prevArrow.className = 'testimonial-arrow prev';
  prevArrow.innerHTML = '&#10094;';
  prevArrow.addEventListener('click', prevSlide);
  
  const nextArrow = document.createElement('div');
  nextArrow.className = 'testimonial-arrow next';
  nextArrow.innerHTML = '&#10095;';
  nextArrow.addEventListener('click', nextSlide);
  
  arrowsContainer.appendChild(prevArrow);
  arrowsContainer.appendChild(nextArrow);
  
  // Append controls and arrows to slider
  const slider = document.querySelector('.testimonials-slider');
  slider.appendChild(controls);
  slider.appendChild(arrowsContainer);
  
  // Set current slide index
  let currentSlide = 0;
  
  // Function to go to specific slide
  function goToSlide(index) {
    if (index < 0) index = testimonials.length - 1;
    if (index >= testimonials.length) index = 0;
    
    // Remove active class from current testimonial and dot
    testimonials[currentSlide].classList.remove('active');
    document.querySelectorAll('.testimonial-dot')[currentSlide].classList.remove('active');
    
    // Add active class to new testimonial and dot
    currentSlide = index;
    testimonials[currentSlide].classList.add('active');
    document.querySelectorAll('.testimonial-dot')[currentSlide].classList.add('active');
    
    // Trigger animation
    testimonials[currentSlide].style.animation = 'none';
    testimonials[currentSlide].offsetHeight; // Force reflow
    testimonials[currentSlide].style.animation = 'slideInFromRight 0.8s forwards';
  }
  
  // Function for previous slide
  function prevSlide() {
    goToSlide(currentSlide - 1);
  }
  
  // Function for next slide
  function nextSlide() {
    goToSlide(currentSlide + 1);
  }
  
  // Auto-advance slides every 5 seconds
  setInterval(nextSlide, 5000);
});

document.addEventListener('DOMContentLoaded', function() {
  // Get the WhatsApp order button
  const whatsappBtn = document.getElementById('whatsapp-order-btn');
  
  if (whatsappBtn) {
    whatsappBtn.addEventListener('click', function() {
      // Get form values
      const name = document.getElementById('customer-name').value.trim();
      const phone = document.getElementById('customer-phone').value.trim();
      const cakeType = document.getElementById('cake-type').value;
      const cakeFlavor = document.getElementById('cake-flavor').value;
      const cakeSize = document.getElementById('cake-size').value;
      const message = document.getElementById('custom-message').value.trim();
      
      // Validate form
      if (!name || !phone || !cakeType || !cakeFlavor || !cakeSize) {
        alert('Please fill in all required fields');
        return;
      }
      
      // Construct WhatsApp message
      let whatsappMessage = 
        `Hello Inaya Cakezz! I would like to place a cake order:\n\n` +
        `Name: ${name}\n` +
        `Phone: ${phone}\n` +
        `Cake Type: ${cakeType}\n` +
        `Flavor: ${cakeFlavor}\n` +
        `Size: ${cakeSize}\n`;
      
      // Add custom message if provided
      if (message) {
        whatsappMessage += `\nAdditional Details: ${message}\n`;
      }
      
      // Encode the message for URL
      const encodedMessage = encodeURIComponent(whatsappMessage);
      
      // Replace with your actual WhatsApp number
      const whatsappNumber = '91958842847'; // Format: country code + number without +
      
      // Create WhatsApp link
      const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
      
      // Open WhatsApp
      window.open(whatsappURL, '_blank');
    });
  }
});
