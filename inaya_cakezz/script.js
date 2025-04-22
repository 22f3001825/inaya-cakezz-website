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

  // Initialize testimonials slider
  initTestimonialSlider();
  
  // Initialize pricing functionality
  initPricingSystem();
  
  // Initialize WhatsApp ordering
  initWhatsAppOrdering();
});

// Testimonial slider functionality
function initTestimonialSlider() {
  // Select all testimonials
  const testimonials = document.querySelectorAll('.testimonial');
  
  if (testimonials.length === 0) return;
  
  // Set first testimonial as active
  testimonials[0].classList.add('active');
  
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
  if (slider) {
    slider.appendChild(controls);
    slider.appendChild(arrowsContainer);
  }
  
  // Set current slide index
  let currentSlide = 0;
  let slideInterval;
  
  // Function to go to specific slide
  function goToSlide(index) {
    if (index < 0) index = testimonials.length - 1;
    if (index >= testimonials.length) index = 0;
    
    // Remove active class from current testimonial and dot
    testimonials[currentSlide].classList.remove('active');
    const dots = document.querySelectorAll('.testimonial-dot');
    if (dots[currentSlide]) dots[currentSlide].classList.remove('active');
    
    // Add active class to new testimonial and dot
    currentSlide = index;
    testimonials[currentSlide].classList.add('active');
    if (dots[currentSlide]) dots[currentSlide].classList.add('active');
    
    // Trigger animation
    testimonials[currentSlide].style.animation = 'none';
    testimonials[currentSlide].offsetHeight; // Force reflow
    testimonials[currentSlide].style.animation = 'slideInFromRight 0.8s forwards';
    
    // Reset the auto-slide timer
    resetAutoSlideTimer();
  }
  
  // Function for previous slide
  function prevSlide() {
    goToSlide(currentSlide - 1);
  }
  
  // Function for next slide
  function nextSlide() {
    goToSlide(currentSlide + 1);
  }
  
  // Reset auto-slide timer
  function resetAutoSlideTimer() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 5000);
  }
  
  // Start auto-slide
  resetAutoSlideTimer();
  
  // Pause auto-slide when hovering over slider
  slider.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
  });
  
  // Resume auto-slide when mouse leaves slider
  slider.addEventListener('mouseleave', resetAutoSlideTimer);
}

// Pricing data for all flavors and sizes
const pricingData = {
  "Chocolate": {
    "0.5": 250,
    "1": 480,
    "1.5": 680,
    "2": 950,
    "2.5": 1150,
    "3": 1350,
    "3.5": 1600,
    "4": 1900
  },
  "Blackforest": {
    "0.5": 250,
    "1": 480,
    "1.5": 680,
    "2": 950,
    "2.5": 1150,
    "3": 1350,
    "3.5": 1600,
    "4": 1900
  },
  "Butterscotch": {
    "0.5": 250,
    "1": 480,
    "1.5": 680,
    "2": 950,
    "2.5": 1150,
    "3": 1350,
    "3.5": 1600,
    "4": 1900
  },
  "Chocolate Truffle": {
    "0.5": 350,
    "1": 700,
    "1.5": 1050,
    "2": 1400,
    "2.5": 1750,
    "3": 2100,
    "3.5": 2450,
    "4": 2800
  },
  "Dark Chocolate": {
    "0.5": 250,
    "1": 480,
    "1.5": 680,
    "2": 950,
    "2.5": 1150,
    "3": 1350,
    "3.5": 1600,
    "4": 1900
  },
  "Mango": {
    "0.5": 250,
    "1": 480,
    "1.5": 680,
    "2": 950,
    "2.5": 1150,
    "3": 1350,
    "3.5": 1600,
    "4": 1900
  },
  "Pineapple": {
    "0.5": 250,
    "1": 480,
    "1.5": 680,
    "2": 950,
    "2.5": 1150,
    "3": 1350,
    "3.5": 1600,
    "4": 1900
  },
  "Rasmalai": {
    "0.5": 250,
    "1": 480,
    "1.5": 680,
    "2": 950,
    "2.5": 1150,
    "3": 1350,
    "3.5": 1600,
    "4": 1900
  },
  "Red Velvet": {
    "0.5": 350,
    "1": 700,
    "1.5": 1050,
    "2": 1400,
    "2.5": 1750,
    "3": 2100,
    "3.5": 2450,
    "4": 2800
  },
  "Strawberry": {
    "0.5": 250,
    "1": 480,
    "1.5": 680,
    "2": 950,
    "2.5": 1150,
    "3": 1350,
    "3.5": 1600,
    "4": 1900
  },
  "Vanilla": {
    "0.5": 250,
    "1": 480,
    "1.5": 680,
    "2": 950,
    "2.5": 1150,
    "3": 1350,
    "3.5": 1600,
    "4": 1900
  },
  "White Forest": {
    "0.5": 250,
    "1": 480,
    "1.5": 680,
    "2": 950,
    "2.5": 1150,
    "3": 1350,
    "3.5": 1600,
    "4": 1900
  }
};

// Initialize pricing system
function initPricingSystem() {
  const flavorSelect = document.getElementById('cake-flavor');
  const sizeSelect = document.getElementById('cake-size');
  
  if (flavorSelect && sizeSelect) {
    flavorSelect.addEventListener('change', updatePrice);
    sizeSelect.addEventListener('change', updatePrice);
    
    // Initialize date picker with HTML5 date input
    const dateInput = document.getElementById('delivery-date');
    if (dateInput) {
      // Set min date to tomorrow
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      dateInput.min = formatDate(tomorrow);
      
      // Set max date to 30 days from now
      const maxDate = new Date();
      maxDate.setDate(maxDate.getDate() + 30);
      dateInput.max = formatDate(maxDate);
    }
  }
}

// Format date to YYYY-MM-DD for date input
function formatDate(date) {
  const year = date.getFullYear();
  let month = (date.getMonth() + 1).toString().padStart(2, '0');
  let day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Function to update price when selections change
function updatePrice() {
  const flavorSelect = document.getElementById('cake-flavor');
  const sizeSelect = document.getElementById('cake-size');
  const totalPriceDisplay = document.getElementById('total-price');
  const orderSummary = document.getElementById('order-summary');
  
  // Check if both flavor and size are selected
  if (flavorSelect && sizeSelect && flavorSelect.selectedIndex > 0 && sizeSelect.selectedIndex > 0) {
    const flavor = flavorSelect.value;
    const size = sizeSelect.value;
    
    // Check if pricing data exists for this combination
    if (pricingData[flavor] && pricingData[flavor][size]) {
      // Get price from pricing data
      const price = pricingData[flavor][size];
      
      // Update price display
      if (totalPriceDisplay) {
        totalPriceDisplay.textContent = `₹${price}`;
      }
      
      // Update order summary
      if (orderSummary) {
        let servingSuggestion = '';
        switch(size) {
          case '0.5': servingSuggestion = 'Serves 2-3 people'; break;
          case '1': servingSuggestion = 'Serves 4-6 people'; break;
          case '1.5': servingSuggestion = 'Serves 8-10 people'; break;
          case '2': servingSuggestion = 'Serves 12-15 people'; break;
          case '2.5': servingSuggestion = 'Serves 15-18 people'; break;
          case '3': servingSuggestion = 'Serves 18-20 people'; break;
          case '3.5': servingSuggestion = 'Serves 20-25 people'; break;
          case '4': servingSuggestion = 'Serves 25-30 people'; break;
        }
        
        const isPremium = (flavor === 'Chocolate Truffle' || flavor === 'Red Velvet');
        const flavorNote = isPremium ? `<span class="premium-flavor">${flavor} (Premium)</span>` : flavor;
        
        orderSummary.innerHTML = `
          <p class="summary-item"><strong>Flavor:</strong> ${flavorNote}</p>
          <p class="summary-item"><strong>Size:</strong> ${size} kg</p>
          <p class="summary-item"><strong>Serving:</strong> ${servingSuggestion}</p>
          <p class="summary-item price"><strong>Price:</strong> ₹${price}</p>
        `;
      }
    }
  } else if (totalPriceDisplay && orderSummary) {
    totalPriceDisplay.textContent = '₹0';
    orderSummary.innerHTML = '<p class="summary-item">Please select cake flavor and size</p>';
  }
}

// Initialize WhatsApp ordering
function initWhatsAppOrdering() {
  const whatsappBtn = document.getElementById('whatsapp-order-btn');
  
  if (whatsappBtn) {
    whatsappBtn.addEventListener('click', sendWhatsAppOrder);
  }
}

// Function to send WhatsApp order
function sendWhatsAppOrder() {
  // Get form values and validate
  const formData = getAndValidateFormData();
  
  if (!formData.valid) {
    alert('Please fill in all required fields (Name, Phone, Cake Type, Flavor, and Size)');
    return;
  }
  
  // Get price if flavor and size are selected
  let price = '(not selected)';
  if (formData.cakeFlavor && formData.cakeSize && 
      pricingData[formData.cakeFlavor] && 
      pricingData[formData.cakeFlavor][formData.cakeSize]) {
    price = pricingData[formData.cakeFlavor][formData.cakeSize];
  }
  
  // Get delivery preferences
  const deliveryTime = document.getElementById('delivery-time');
  const paymentPreference = document.getElementById('payment-preference');
  
  // Construct WhatsApp message
  let whatsappMessage = 
    `Hello Inaya Cakezz! I would like to place a cake order:\n\n` +
    `Name: ${formData.name}\n` +
    `Phone: ${formData.phone}\n` +
    `Cake Type: ${formData.cakeType}\n` +
    `Flavor: ${formData.cakeFlavor}\n` +
    `Size: ${formData.cakeSize} kg\n` +
    `Price: ₹${price}\n`;

  
  if (formData.deliveryDate) {
    whatsappMessage += `Delivery Date: ${formData.deliveryDate}\n`;
  }
  
  if (deliveryTime && deliveryTime.selectedIndex > 0) {
    whatsappMessage += `Preferred Time: ${deliveryTime.value}\n`;
  }
  
  if (paymentPreference && paymentPreference.selectedIndex > 0) {
    whatsappMessage += `Payment Preference: ${paymentPreference.value}\n`;
  }
  
  // Add custom message if provided
  if (formData.message) {
    whatsappMessage += `\nSpecial Instructions: ${formData.message}\n`;
  }
  
  whatsappMessage += `\nThank you!`;
  
  // Encode the message for URL
  const encodedMessage = encodeURIComponent(whatsappMessage);
  
  // WhatsApp number
  const whatsappNumber = '919588428478'; // Format: country code + number without +
  
  // Create WhatsApp link and open
  const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
  window.open(whatsappURL, '_blank');
}

// Helper function to get and validate form data
function getAndValidateFormData() {
  const name = document.getElementById('customer-name')?.value.trim() || '';
  const phone = document.getElementById('customer-phone')?.value.trim() || '';
  const cakeTypeElement = document.getElementById('cake-type');
  const cakeFlavorElement = document.getElementById('cake-flavor');
  const cakeSizeElement = document.getElementById('cake-size');
  const deliveryDateElement = document.getElementById('delivery-date');
  const messageElement = document.getElementById('custom-message');
  
  const cakeType = cakeTypeElement?.value || '';
  const cakeFlavor = cakeFlavorElement?.value || '';
  const cakeSize = cakeSizeElement?.value || '';
  const deliveryDate = deliveryDateElement?.value || '';
  const message = messageElement?.value.trim() || '';
  
  // Check required fields
  const valid = name && phone && cakeType && cakeFlavor && cakeSize;
  
  return {
    name,
    phone,
    cakeType,
    cakeFlavor,
    cakeSize,
    deliveryDate,
    message,
    valid
  };
}

// Function to validate phone number
function validatePhone(phone) {
  // Basic validation for Indian phone numbers
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone);
}

// Add form field validation
document.addEventListener('DOMContentLoaded', function() {
  const phoneInput = document.getElementById('customer-phone');
  
  if (phoneInput) {
    phoneInput.addEventListener('blur', function() {
      if (this.value.trim() && !validatePhone(this.value.trim())) {
        this.style.borderColor = 'red';
        // Show error message
        let errorMsg = document.getElementById('phone-error');
        if (!errorMsg) {
          errorMsg = document.createElement('div');
          errorMsg.id = 'phone-error';
          errorMsg.className = 'error-message';
          errorMsg.textContent = 'Please enter a valid 10-digit Indian phone number';
          this.parentNode.appendChild(errorMsg);
        }
      } else {
        this.style.borderColor = '';
        // Remove error message if exists
        const errorMsg = document.getElementById('phone-error');
        if (errorMsg) errorMsg.remove();
      }
    });
  }
});
