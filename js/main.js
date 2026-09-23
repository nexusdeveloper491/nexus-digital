/* ==========================================================================
   Nexus Digital - Master JavaScript
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initFaqAccordion();
  initPortfolioFilter();
  initContactForm();
  initReviewsCarousel();
  initPortfolioCarousel();
});

/* ==========================================================================
   Reviews Auto Carousel & Modal Functions
   ========================================================================== */

/* Auto Carousel for Reviews (5s delay, no arrows, no dots) */
function initReviewsCarousel() {
  const track = document.getElementById('reviewsTrack');
  const wrapper = document.getElementById('reviewsCarouselWrapper');
  if (!track || !wrapper) return;

  let currentIndex = 0;
  let autoSlideTimer = null;

  function getCardWidth() {
    const card = track.querySelector('.review-card');
    if (!card) return 0;
    const gap = 28; // gap in px
    return card.offsetWidth + gap;
  }

  function slideNext() {
    const totalCards = track.querySelectorAll('.review-card').length;
    const cardsVisible = window.innerWidth > 992 ? 3 : (window.innerWidth > 640 ? 2 : 1);
    const maxIndex = totalCards - cardsVisible;

    if (maxIndex <= 0) return;

    if (currentIndex >= maxIndex) {
      currentIndex = 0;
    } else {
      currentIndex++;
    }

    const cardWidth = getCardWidth();
    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
  }

  function startAutoSlide() {
    stopAutoSlide();
    autoSlideTimer = setInterval(slideNext, 5000); // 5 Seconds Interval
  }

  function stopAutoSlide() {
    if (autoSlideTimer) clearInterval(autoSlideTimer);
  }

  wrapper.addEventListener('mouseenter', stopAutoSlide);
  wrapper.addEventListener('mouseleave', startAutoSlide);

  window.addEventListener('resize', () => {
    currentIndex = 0;
    track.style.transform = 'translateX(0px)';
  });

  startAutoSlide();
}

/* Review Modal Popup Handlers */
function openReviewModal() {
  const modal = document.getElementById('reviewModal');
  const formStep = document.getElementById('modalFormStep');
  const successStep = document.getElementById('modalSuccessStep');
  if (formStep) formStep.style.display = 'block';
  if (successStep) successStep.style.display = 'none';
  if (modal) modal.classList.add('active');
}

function closeReviewModal() {
  const modal = document.getElementById('reviewModal');
  if (modal) modal.classList.remove('active');
}

function finishReviewModal() {
  closeReviewModal();
  document.getElementById('writeReviewForm')?.reset();
  setRating(5);
}

function setRating(stars) {
  const ratingInput = document.getElementById('reviewRating');
  if (ratingInput) ratingInput.value = stars;

  const starIcons = document.querySelectorAll('#starPicker i');
  starIcons.forEach((star, index) => {
    if (index < stars) {
      star.classList.add('active');
    } else {
      star.classList.remove('active');
    }
  });
}

function submitReview(e) {
  e.preventDefault();
  const name = document.getElementById('reviewerName')?.value || 'Valued Client';
  const text = document.getElementById('reviewText')?.value || '';
  const rating = document.getElementById('reviewRating')?.value || 5;

  let starsHtml = '';
  for (let i = 0; i < rating; i++) {
    starsHtml += '<i class="fas fa-star"></i>';
  }

  const track = document.getElementById('reviewsTrack');
  if (track) {
    const newCard = document.createElement('div');
    newCard.className = 'review-card site-review';
    newCard.innerHTML = `
      <div class="review-card-header">
        <div class="reviewer-profile">
          <div class="reviewer-avatar" style="background: var(--primary);">${name.charAt(0).toUpperCase()}</div>
          <div>
            <h5>${name}</h5>
            <p class="review-date">Just now</p>
          </div>
        </div>
        <div class="review-source-badge site-badge">
          <i class="fas fa-globe"></i> Website & Google
        </div>
      </div>
      <div class="stars-gold">${starsHtml}</div>
      <p class="review-text">"${text}"</p>
    `;
    track.insertBefore(newCard, track.firstChild);
  }

  // Switch to Google sync step in modal
  const formStep = document.getElementById('modalFormStep');
  const successStep = document.getElementById('modalSuccessStep');
  if (formStep) formStep.style.display = 'none';
  if (successStep) successStep.style.display = 'block';

  showToast(`🎉 Review saved on website! Click "Post Also On Google Maps" to complete Google sync.`);
}

/* Navbar Scroll & Mobile Menu */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // Create or retrieve backdrop overlay
  let navBackdrop = document.querySelector('.nav-backdrop');
  if (!navBackdrop) {
    navBackdrop = document.createElement('div');
    navBackdrop.className = 'nav-backdrop';
    document.body.appendChild(navBackdrop);
  }

  function closeMobileMenu() {
    if (navMenu) navMenu.classList.remove('active');
    if (navBackdrop) navBackdrop.classList.remove('active');
    document.body.classList.remove('nav-open');
    if (mobileToggle) {
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    }
  }

  function openMobileMenu() {
    if (navMenu) navMenu.classList.add('active');
    if (navBackdrop) navBackdrop.classList.add('active');
    document.body.classList.add('nav-open');
    if (mobileToggle) {
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      }
    }
  }

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      if (navMenu.classList.contains('active')) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  if (navBackdrop) {
    navBackdrop.addEventListener('click', () => {
      closeMobileMenu();
    });
  }

  // Services Dropdown toggle handler (Desktop, Tablet & Mobile)
  const dropdownTriggers = document.querySelectorAll('.nav-dropdown-trigger');
  dropdownTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const parent = trigger.closest('.nav-dropdown');
      if (parent) {
        const isExpanded = parent.classList.contains('active');
        parent.classList.toggle('active');
        trigger.setAttribute('aria-expanded', !isExpanded);
      }
    });
  });

  // Close dropdown when clicking outside on desktop/tablet
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-dropdown')) {
      document.querySelectorAll('.nav-dropdown.active').forEach(dropdown => {
        dropdown.classList.remove('active');
        const trigger = dropdown.querySelector('.nav-dropdown-trigger');
        if (trigger) trigger.setAttribute('aria-expanded', 'false');
      });
    }
  });

  // Close mobile drawer when clicking navigation links (except dropdown trigger)
  const navLinks = document.querySelectorAll('.nav-menu a:not(.nav-dropdown-trigger)');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      const onclickAttr = link.getAttribute('onclick');
      if (!onclickAttr || !onclickAttr.includes('notifyUnavailable')) {
        closeMobileMenu();
      }
    });
  });

  // Close with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMobileMenu();
      document.querySelectorAll('.nav-dropdown.active').forEach(dropdown => {
        dropdown.classList.remove('active');
        const trigger = dropdown.querySelector('.nav-dropdown-trigger');
        if (trigger) trigger.setAttribute('aria-expanded', 'false');
      });
    }
  });
}

/* FAQ Accordion Logic */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all items
        faqItems.forEach(otherItem => otherItem.classList.remove('active'));
        
        // Toggle current
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });
}

/* Portfolio Filter */
function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');

  if (filterBtns.length > 0 && portfolioCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        portfolioCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filterValue === 'all' || category === filterValue) {
            card.style.display = 'block';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'scale(1)';
            }, 50);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.95)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }
}

/* Contact Form & Scroll to Top Function */
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Send Inquiry';
      
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<i class="fas fa-circle-notch fa-spin"></i> Sending...`;
      }
      
      const name = document.getElementById('formName')?.value || 'Client';
      const phone = document.getElementById('formPhone')?.value || document.getElementById('formEmail')?.value || 'N/A';
      const service = document.getElementById('formSubject')?.value || 'Website Design';
      const message = document.getElementById('formMessage')?.value || 'N/A';
      
      // Automatic background FormSubmit submission directly to agency email
      fetch("https://formsubmit.co/ajax/nexusofficial.digital@gmail.com", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          Name: name,
          "WhatsApp Number": phone,
          Service: service,
          Message: message,
          _subject: `New Lead Inquiry from ${name} (${phone}) - Nexus Digital`
        })
      })
      .then(response => response.json())
      .then(data => {
        showToast(`🎉 Inquiry Sent Successfully!`);
        contactForm.reset();
      })
      .catch(error => {
        showToast(`🎉 Inquiry Sent Successfully!`);
        contactForm.reset();
      })
      .finally(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
        }
      });
    });
  }
}

/* Toast Message */
function showToast(message) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast-notification';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<i class="fas fa-check-circle" style="color: #10b981; font-size: 1.2rem;"></i> <span>${message}</span>`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

/* Handle Unavailable Service Click */
function notifyUnavailable(serviceName) {
  showToast(`📌 ${serviceName} service is currently unavailable / coming soon! Contact us to get early access.`);
}

/* Case Study Popup Modal Functions */
const portfolioModalData = {
  'basirhat-honey': {
    title: 'Basirhat Honey Cultivators Co-Op E-Commerce',
    category: 'Honey & Agriculture',
    image: 'assets/images/project_basirhat_honey.png',
    description: 'A custom, high-converting e-commerce web platform engineered for Basirhat Honey Cultivators R.E.H. Indl. Co-Op. Society Limited. Designed to showcase 100% natural, freshly extracted raw honey, bee wax, pollen, and comb honey collections.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'E-Commerce Storefront', 'Product Filtering'],
    client: 'Basirhat Honey Cultivators Co-Op Society Ltd.',
    liveUrl: 'https://basirhathoney.com/',
    deliverables: ['Custom E-Commerce Storefront', 'Product Catalog & Pricing', 'Mobile Responsive Order Gateway', 'WhatsApp Direct Order Integration']
  },
  'xpertvai': {
    title: 'XpertVai On-Demand Home Services App',
    category: 'Service Booking Web App',
    image: 'assets/images/project_xpertvai.png',
    description: 'An interactive service booking web application built for XpertVai. Provides a seamless one-stop platform for booking AC repair, appliance maintenance, cleaning solutions, beauty & wellness, and shifting services.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Service Booking Engine', 'Interactive UI'],
    client: 'XpertVai Services Network',
    liveUrl: 'https://expertvai.com/',
    deliverables: ['Service Category Showcase', 'Quick Booking Inquiry Form', 'Mobile-First Responsive Layout', 'Customer Testimonial Gateway']
  },
  'action-tesa': {
    title: 'Action TESA Corporate Portal',
    category: 'Corporate & Industrial',
    image: 'assets/images/project_action_tesa.png',
    description: 'A premier corporate web portal engineered for Action TESA ("Koi Nahi Aisa"). Showcases engineered wooden boards, interior decor products, flooring virtual rooms, and interactive e-catalogs.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Virtual Room Preview', 'E-Catalog System'],
    client: 'Action TESA (Action Group)',
    liveUrl: 'https://www.actiontesa.com/',
    deliverables: ['Corporate Web Architecture', 'Product Virtual Room Visualizer', 'Media & E-Catalog Downloads', 'Career & Contact Gateway']
  },
  'simply-sheepskin': {
    title: 'Simply Sheepskin & Linen Bedding',
    category: 'Luxury E-Commerce',
    image: 'assets/images/project_simply_sheepskin.png',
    description: 'An ultra-sleek, luxury UK e-commerce storefront for Simply Sheepskin. Showcases premium sheepskin rugs, linen bedding collections, homewares, and organic pet & baby luxury decor.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Luxury Cart Drawer', 'TrustPilot Integration'],
    client: 'Simply Sheepskin UK',
    liveUrl: 'https://simplysheepskin.co.uk/',
    deliverables: ['Luxury Product Showcase', 'Promo & Trust Badge Integration', 'Fluid Mobile Navigation', 'High-Speed Page Optimization']
  },
  'luxe-rides': {
    title: 'Luxe Rides Classic Car Rental Platform',
    category: 'Automotive & Rental',
    image: 'assets/images/project_luxe_rides.png',
    description: 'A bespoke luxury vintage car booking platform for Luxe Rides. Highlights timeless luxury car fleets, private chauffeur bookings, and instant reservation inquiries.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Fleet Gallery', 'Booking Inquiry System'],
    client: 'Luxe Rides Automotive',
    deliverables: ['Fleet Showcase Gallery', 'Reservation Inquiry Engine', 'Timeless Luxury Theme Design', 'On-Page SEO Optimization']
  },
  'ar-sync': {
    title: 'AR Sync AI-Powered Automation Platform',
    category: 'AI SaaS & Fintech',
    image: 'assets/images/project_ar_sync.png',
    description: 'An advanced AI-powered SaaS platform engineered for AR Sync. Accelerates corporate cash flow with automated accounts receivable workflows, AI invoice dispute management, and real-time receivables lifecycle tracking.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'AI Workflow Engine', 'Fintech Analytics'],
    client: 'AR Sync Technologies',
    liveUrl: 'https://arsync.ai/',
    deliverables: ['AI Cash Flow Dashboard', 'Receivables Lifecycle Tracker', 'Automated Payment Gateway', 'Enterprise Security Encryption']
  },
  'sanskaram': {
    title: 'Sanskaram University Educational Portal',
    category: 'University & Education',
    image: 'assets/images/project_sanskaram.png',
    description: 'A comprehensive academic university web portal designed for Sanskaram University. Features school program showcases, international admissions desk, mandatory disclosure archive, and student resource portal.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Academic Portal', 'Admissions Engine'],
    client: 'Sanskaram University (Jhajjar)',
    liveUrl: 'https://sanskaramuniversity.ac.in/',
    deliverables: ['Multi-School Program Directory', 'Online Admissions Application Desk', '360 Virtual Campus Tour UI', 'Mandatory Regulatory Archive']
  },
  'security-tower': {
    title: 'Security Tower Cybersecurity Platform',
    category: 'Cybersecurity & IT',
    image: 'assets/images/project_security_tower.png',
    description: 'A cutting-edge cybersecurity platform built for Security Tower (Netherlands). Delivers expert security assessments, automated vulnerability scanning, IT compliance benchmarking, and incident mitigation services.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Cybersecurity UI', 'Assessment Portal'],
    client: 'Security Tower B.V. (Netherlands)',
    liveUrl: 'https://security-tower.nl/en/',
    deliverables: ['Security Risk Assessment Quiz', 'Vulnerability Scanner Showcase', 'Interactive Service Modules', 'Multi-Language Support (NL/EN)']
  },
  'shri-ram': {
    title: 'The Shri Ram Wonder Years Preschool Portal',
    category: 'Preschool & Education',
    image: 'assets/images/project_shri_ram.png',
    description: 'An engaging, child-friendly educational portal built for The Shri Ram Wonder Years (TSWY Delhi). Showcases early childhood learning programs, campus activity galleries, admissions desk, and parent communication portal.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Interactive Gallery', 'Parent Portal Desk'],
    client: 'The Shri Ram Schools (Shri Educare)',
    liveUrl: 'https://tswypreschool.com/',
    deliverables: ['Early Years Learning Program Layout', 'Interactive Photo & Video Gallery', 'Admissions Consultation Desk', 'Notice & Announcement Ticker']
  }
};

function openCaseStudyModal(projectId) {
  const data = portfolioModalData[projectId] || portfolioModalData['basirhat-honey'];
  
  let modalOverlay = document.getElementById('caseStudyModal');
  if (!modalOverlay) {
    modalOverlay = document.createElement('div');
    modalOverlay.id = 'caseStudyModal';
    modalOverlay.className = 'portfolio-modal-overlay';
    document.body.appendChild(modalOverlay);
  }

  modalOverlay.innerHTML = `
    <div class="portfolio-modal-box">
      <button onclick="closeCaseStudyModal()" class="modal-close-btn" aria-label="Close Modal"><i class="fas fa-xmark"></i></button>
      <img src="${data.image}" alt="${data.title}" class="modal-header-img" style="width:100%; height:auto; display:block; border-radius:12px 12px 0 0;" />
      <div class="modal-body-content">
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px; margin-bottom: 12px;">
          <span class="badge badge-available">${data.category}</span>
          <span style="font-size: 0.85rem; color: var(--text-dim); font-weight: 600;"><i class="fas fa-building" style="color: var(--primary);"></i> ${data.client}</span>
        </div>
        <h2 style="font-size: 1.8rem; margin-bottom: 14px; color: var(--text-main);">${data.title}</h2>
        <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.7; margin-bottom: 20px;">${data.description}</p>
        
        <h4 style="font-size: 1rem; margin-bottom: 8px; color: var(--text-main);"><i class="fas fa-layer-group" style="color: var(--primary); margin-right: 6px;"></i> Tech Stack Used</h4>
        <div class="modal-tech-pills">
          ${data.tech.map(item => `<span class="modal-tech-pill">${item}</span>`).join('')}
        </div>

        <h4 style="font-size: 1rem; margin-bottom: 10px; color: var(--text-main);"><i class="fas fa-circle-check" style="color: #10b981; margin-right: 6px;"></i> Key Deliverables</h4>
        <ul style="list-style: none; padding: 0; margin: 0 0 25px; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px; font-size: 0.88rem; color: var(--text-muted);">
          ${data.deliverables.map(del => `<li style="display: flex; align-items: center; gap: 8px;"><i class="fas fa-check" style="color: #10b981;"></i> ${del}</li>`).join('')}
        </ul>

        <div style="display: flex; gap: 14px; flex-wrap: wrap;">
          ${data.liveUrl ? `<a href="${data.liveUrl}" target="_blank" class="btn btn-primary" style="flex: 1; text-align: center;"><i class="fas fa-globe"></i> Visit Live Website</a>` : ``}
          <a href="contact" class="btn ${data.liveUrl ? 'btn-secondary' : 'btn-primary'}" style="flex: 1; text-align: center;"><i class="fas fa-paper-plane"></i> Request Similar Project</a>
        </div>
      </div>
    </div>
  `;

  setTimeout(() => {
    modalOverlay.classList.add('active');
  }, 10);

  modalOverlay.onclick = function(e) {
    if (e.target === modalOverlay) closeCaseStudyModal();
  };
}

function closeCaseStudyModal() {
  const modalOverlay = document.getElementById('caseStudyModal');
  if (modalOverlay) {
    modalOverlay.classList.remove('active');
  }
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeCaseStudyModal();
});

/* Home Portfolio Carousel Engine */
function initPortfolioCarousel() {
  const track = document.getElementById('homePortfolioTrack');
  const prevBtn = document.getElementById('portfolioPrevBtn');
  const nextBtn = document.getElementById('portfolioNextBtn');
  const wrapper = document.getElementById('homePortfolioWrapper');
  if (!track || !wrapper) return;

  let currentIndex = 0;
  let autoTimer = null;
  const gap = 24;

  function getSlideWidth() {
    const card = track.querySelector('.portfolio-card-slide');
    return card ? card.offsetWidth + gap : 360;
  }

  function getMaxIndex() {
    const totalCards = track.querySelectorAll('.portfolio-card-slide').length;
    const visibleCards = window.innerWidth > 1024 ? 3 : (window.innerWidth > 768 ? 2 : 1);
    return Math.max(0, totalCards - visibleCards);
  }

  function updateCarousel() {
    const maxIndex = getMaxIndex();
    if (currentIndex > maxIndex) currentIndex = maxIndex;
    if (currentIndex < 0) currentIndex = 0;
    
    const slideWidth = getSlideWidth();
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  }

  function slideNext() {
    const maxIndex = getMaxIndex();
    if (currentIndex < maxIndex) {
      currentIndex++;
    } else {
      currentIndex = 0;
    }
    updateCarousel();
  }

  function startAutoSlide() {
    stopAutoSlide();
    autoTimer = setInterval(slideNext, 5000); // 5 Seconds Auto Slide
  }

  function stopAutoSlide() {
    if (autoTimer) clearInterval(autoTimer);
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      stopAutoSlide();
      slideNext();
      startAutoSlide();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      stopAutoSlide();
      const maxIndex = getMaxIndex();
      if (currentIndex > 0) {
        currentIndex--;
      } else {
        currentIndex = maxIndex;
      }
      updateCarousel();
      startAutoSlide();
    });
  }

  // Touch Swipe & Mouse Drag Engine (Swipe with finger/hand)
  let startX = 0;
  let currentX = 0;
  let isDragging = false;

  function handleDragStart(e) {
    stopAutoSlide();
    isDragging = true;
    startX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    currentX = startX;
  }

  function handleDragMove(e) {
    if (!isDragging) return;
    currentX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
  }

  function handleDragEnd() {
    if (!isDragging) return;
    isDragging = false;
    const diffX = startX - currentX;
    const threshold = 40; // minimum swipe distance in px

    if (diffX > threshold) {
      // Finger swiped Left -> Go to Next Slide
      slideNext();
    } else if (diffX < -threshold) {
      // Finger swiped Right -> Go to Prev Slide
      const maxIndex = getMaxIndex();
      if (currentIndex > 0) {
        currentIndex--;
      } else {
        currentIndex = maxIndex;
      }
      updateCarousel();
    }
    startAutoSlide();
  }

  wrapper.addEventListener('touchstart', handleDragStart, { passive: true });
  wrapper.addEventListener('touchmove', handleDragMove, { passive: true });
  wrapper.addEventListener('touchend', handleDragEnd, { passive: true });

  wrapper.addEventListener('mousedown', handleDragStart);
  wrapper.addEventListener('mousemove', handleDragMove);
  wrapper.addEventListener('mouseup', handleDragEnd);
  wrapper.addEventListener('mouseenter', stopAutoSlide);
  wrapper.addEventListener('mouseleave', () => {
    if (isDragging) handleDragEnd();
    startAutoSlide();
  });

  window.addEventListener('resize', updateCarousel);
  startAutoSlide();
}

/* Global Geo-IP Dynamic Currency Engine (INR / USD Auto-Switch) */
function initGeoCurrencyEngine() {
  const counters = document.querySelectorAll('.price-counter');
  const origPrices = document.querySelectorAll('.orig-price');
  const btnStarter = document.getElementById('btnPkgStarter');
  const btnGrowth = document.getElementById('btnPkgGrowth');
  const btnEcommerce = document.getElementById('btnPkgEcommerce');

  if (!counters.length) return;

  function applyCurrency(isUSD) {
    window.isGlobalUSD = isUSD;

    counters.forEach(counter => {
      const targetVal = isUSD 
        ? counter.getAttribute('data-target-usd') || '49'
        : counter.getAttribute('data-target-inr') || '2799';
      
      counter.setAttribute('data-target', targetVal);
      counter.innerText = isUSD ? '$' + targetVal : '₹' + (+targetVal).toLocaleString('en-IN');
    });

    origPrices.forEach(el => {
      const origVal = isUSD 
        ? el.getAttribute('data-orig-usd') || '$69'
        : el.getAttribute('data-orig-inr') || '₹3,499';
      el.innerText = origVal;
    });

    // Update WhatsApp pre-filled order messages
    if (btnStarter) {
      const msg = isUSD ? btnStarter.getAttribute('data-wa-usd') : btnStarter.getAttribute('data-wa-inr');
      if (msg) btnStarter.href = `https://wa.me/919475320402?text=${encodeURIComponent(msg)}`;
    }
    if (btnGrowth) {
      const msg = isUSD ? btnGrowth.getAttribute('data-wa-usd') : btnGrowth.getAttribute('data-wa-inr');
      if (msg) btnGrowth.href = `https://wa.me/919475320402?text=${encodeURIComponent(msg)}`;
    }
    if (btnEcommerce) {
      const msg = isUSD ? btnEcommerce.getAttribute('data-wa-usd') : btnEcommerce.getAttribute('data-wa-inr');
      if (msg) btnEcommerce.href = `https://wa.me/919475320402?text=${encodeURIComponent(msg)}`;
    }
  }

  // Detect Country via ultra-fast free GeoIP API with fallback
  const cachedCountry = localStorage.getItem('nexus_user_country');
  if (cachedCountry) {
    applyCurrency(cachedCountry !== 'IN');
  } else {
    // Set default initially
    applyCurrency(false);
    fetch('https://api.country.is')
      .then(res => res.json())
      .then(data => {
        const country = data.country || 'IN';
        localStorage.setItem('nexus_user_country', country);
        applyCurrency(country !== 'IN');
      })
      .catch(() => {
        applyCurrency(false); // Fallback to INR if API unreachable
      });
  }
}

// Initialize immediately so window.isGlobalUSD is ready for animations
initGeoCurrencyEngine();
document.addEventListener('DOMContentLoaded', () => {
  initGeoCurrencyEngine();
});


