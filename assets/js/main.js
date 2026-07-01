/* ==========================================================================
   MR. DORN - Interactive Scripting
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Sticky Header
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('header--sticky');
    } else {
      header.classList.remove('header--sticky');
    }
  });

  // 2. Mobile Menu Logic
  const burgerBtn = document.querySelector('.burger-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileMenuClose = document.querySelector('.mobile-menu__close');
  const mobileMenuOverlay = document.querySelector('.mobile-menu__overlay');
  const mobileMenuLinks = document.querySelectorAll('.mobile-menu__link');

  const toggleMobileMenu = (open) => {
    if (open) {
      mobileMenu.classList.add('mobile-menu--open');
      document.body.style.overflow = 'hidden';
    } else {
      mobileMenu.classList.remove('mobile-menu--open');
      document.body.style.overflow = '';
    }
  };

  burgerBtn.addEventListener('click', () => toggleMobileMenu(true));
  mobileMenuClose.addEventListener('click', () => toggleMobileMenu(false));
  mobileMenuOverlay.addEventListener('click', () => toggleMobileMenu(false));
  mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => toggleMobileMenu(false));
  });

  // 3. Consultation Modal
  const consultationModal = document.getElementById('consultationModal');
  const openConsultationBtns = document.querySelectorAll('.js-open-consultation');
  const closeConsultationBtn = consultationModal.querySelector('.consultation-modal__close');
  const consultationOverlay = consultationModal.querySelector('.consultation-modal__overlay');

  const toggleConsultationModal = (open) => {
    if (open) {
      consultationModal.classList.add('consultation-modal--open');
      document.body.style.overflow = 'hidden';
    } else {
      consultationModal.classList.remove('consultation-modal--open');
      document.body.style.overflow = '';
    }
  };

  openConsultationBtns.forEach(btn => {
    btn.addEventListener('click', () => toggleConsultationModal(true));
  });
  closeConsultationBtn.addEventListener('click', () => toggleConsultationModal(false));
  consultationOverlay.addEventListener('click', () => toggleConsultationModal(false));

  // 4. Video Modal Logic
  const videoModal = document.getElementById('videoModal');
  const playVideoBtns = document.querySelectorAll('.js-play-video');
  const closeVideoBtn = videoModal.querySelector('.video-modal__close');
  const videoOverlay = videoModal.querySelector('.video-modal__overlay');

  const toggleVideoModal = (open) => {
    if (open) {
      videoModal.classList.add('video-modal--open');
      document.body.style.overflow = 'hidden';
    } else {
      videoModal.classList.remove('video-modal--open');
      document.body.style.overflow = '';
    }
  };

  playVideoBtns.forEach(btn => {
    btn.addEventListener('click', () => toggleVideoModal(true));
  });
  closeVideoBtn.addEventListener('click', () => toggleVideoModal(false));
  videoOverlay.addEventListener('click', () => toggleVideoModal(false));

  // 5. Image Database for Galleries
  const projectGalleries = {
    milenium: {
      title: 'Дом в КП «Миллениум парк»',
      images: [
        'assets/img/projects/milenium/1.jpg',
        'assets/img/projects/milenium/2.jpg',
        'assets/img/projects/milenium/3.png',
        'assets/img/projects/milenium/4.jpg',
        'assets/img/projects/milenium/5.jpg',
        'assets/img/projects/milenium/6.jpg',
        'assets/img/projects/milenium/7.jpg',
        'assets/img/projects/milenium/8.jpg'
      ]
    },
    zakharkovo: {
      title: 'Дом в Захарково',
      images: [
        'assets/img/projects/zakharkovo/1.jpg',
        'assets/img/projects/zakharkovo/2.jpg',
        'assets/img/projects/zakharkovo/3.jpg',
        'assets/img/projects/zakharkovo/4.jpg',
        'assets/img/projects/zakharkovo/5.jpg',
        'assets/img/projects/zakharkovo/6.jpg',
        'assets/img/projects/zakharkovo/7.jpg',
        'assets/img/projects/zakharkovo/8.jpg',
        'assets/img/projects/zakharkovo/9.jpg',
        'assets/img/projects/zakharkovo/10.jpg'
      ]
    },
    sochi: {
      title: 'Дом в КП «Риверсайд»',
      images: [
        'assets/img/projects/milenium/2.jpg',
        'assets/img/projects/milenium/3.png',
        'assets/img/projects/milenium/6.jpg',
        'assets/img/projects/milenium/7.jpg',
        'assets/img/projects/zakharkovo/3.jpg',
        'assets/img/projects/zakharkovo/6.jpg'
      ]
    }
  };

  // 6. Interactive Lightbox Gallery Modal
  const galleryModal = document.getElementById('galleryModal');
  const closeGalleryBtn = galleryModal.querySelector('.gallery-modal__close');
  const galleryOverlay = galleryModal.querySelector('.gallery-modal__overlay');
  const projectCards = document.querySelectorAll('.project-card');
  const openAllProjectsBtn = document.querySelector('.js-open-all-projects');
  
  const slidesTrack = galleryModal.querySelector('.gallery-modal__slides-track');
  const thumbnailsContainer = galleryModal.querySelector('.gallery-modal__thumbnails');
  const galleryTitle = galleryModal.querySelector('.gallery-modal__title');
  const currentSlideSpan = galleryModal.querySelector('.js-current-slide');
  const totalSlidesSpan = galleryModal.querySelector('.js-total-slides');
  const arrowPrev = galleryModal.querySelector('.gallery-modal__arrow--prev');
  const arrowNext = galleryModal.querySelector('.gallery-modal__arrow--next');

  let currentGalleryKey = 'milenium';
  let activeSlideIndex = 0;

  const openGallery = (galleryKey) => {
    currentGalleryKey = galleryKey;
    activeSlideIndex = 0;
    
    const gallery = projectGalleries[galleryKey];
    if (!gallery) return;

    // Set title and counts
    galleryTitle.textContent = gallery.title;
    totalSlidesSpan.textContent = gallery.images.length;
    currentSlideSpan.textContent = '1';

    // Generate slides
    slidesTrack.innerHTML = '';
    gallery.images.forEach(imgSrc => {
      const slide = document.createElement('div');
      slide.classList.add('gallery-modal__slide');
      slide.innerHTML = `<img src="${imgSrc}" alt="${gallery.title}">`;
      slidesTrack.appendChild(slide);
    });

    // Generate thumbnails
    thumbnailsContainer.innerHTML = '';
    gallery.images.forEach((imgSrc, idx) => {
      const thumb = document.createElement('div');
      thumb.classList.add('gallery-modal__thumb');
      if (idx === 0) thumb.classList.add('gallery-modal__thumb--active');
      thumb.innerHTML = `<img src="${imgSrc}" alt="${gallery.title} мини">`;
      thumb.addEventListener('click', () => goToSlide(idx));
      thumbnailsContainer.appendChild(thumb);
    });

    updateSlidePosition();
    galleryModal.classList.add('gallery-modal--open');
    document.body.style.overflow = 'hidden';
  };

  const closeGallery = () => {
    galleryModal.classList.remove('gallery-modal--open');
    document.body.style.overflow = '';
  };

  const goToSlide = (index) => {
    const gallery = projectGalleries[currentGalleryKey];
    if (!gallery) return;

    // Normalize index bounds
    if (index < 0) {
      activeSlideIndex = gallery.images.length - 1;
    } else if (index >= gallery.images.length) {
      activeSlideIndex = 0;
    } else {
      activeSlideIndex = index;
    }

    updateSlidePosition();
  };

  const updateSlidePosition = () => {
    // Shift slides track
    slidesTrack.style.transform = `translateX(-${activeSlideIndex * 100}%)`;
    
    // Update counter
    currentSlideSpan.textContent = activeSlideIndex + 1;

    // Update active thumbnail styling
    const thumbs = thumbnailsContainer.querySelectorAll('.gallery-modal__thumb');
    thumbs.forEach((thumb, idx) => {
      if (idx === activeSlideIndex) {
        thumb.classList.add('gallery-modal__thumb--active');
        thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      } else {
        thumb.classList.remove('gallery-modal__thumb--active');
      }
    });
  };

  // Bind project cards
  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      const galleryKey = card.getAttribute('data-project');
      if (galleryKey) {
        openGallery(galleryKey);
      }
    });
  });

  // Bind gallery controls
  arrowPrev.addEventListener('click', () => goToSlide(activeSlideIndex - 1));
  arrowNext.addEventListener('click', () => goToSlide(activeSlideIndex + 1));
  closeGalleryBtn.addEventListener('click', closeGallery);
  galleryOverlay.addEventListener('click', closeGallery);

  // Bind "Watch all projects" to open Millennium gallery as default
  if (openAllProjectsBtn) {
    openAllProjectsBtn.addEventListener('click', () => openGallery('milenium'));
  }

  // Keyboard navigation for gallery
  document.addEventListener('keydown', (e) => {
    if (!galleryModal.classList.contains('gallery-modal--open')) return;
    if (e.key === 'ArrowRight') {
      goToSlide(activeSlideIndex + 1);
    } else if (e.key === 'ArrowLeft') {
      goToSlide(activeSlideIndex - 1);
    } else if (e.key === 'Escape') {
      closeGallery();
    }
  });

  // 7. Form Submission Simulation & Thank-You UI
  const projectForm = document.getElementById('projectForm');
  const modalForm = document.getElementById('modalForm');

  const handleFormSubmit = (e, formType) => {
    e.preventDefault();
    const nameInput = e.target.querySelector('input[type="text"]');
    const phoneInput = e.target.querySelector('input[type="tel"]');
    
    const name = nameInput ? nameInput.value.trim() : '';
    const phone = phoneInput ? phoneInput.value.trim() : '';

    if (!name || !phone) return;

    // Close consultation modal if open
    toggleConsultationModal(false);

    // Create premium notification container if it doesn't exist
    let notification = document.getElementById('thankYouNotification');
    if (!notification) {
      notification = document.createElement('div');
      notification.id = 'thankYouNotification';
      notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: #151515;
        border: 1px solid #c5a47e;
        color: #fff;
        padding: 1.5rem 2rem;
        border-radius: 4px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        z-index: 999;
        max-width: 360px;
        transform: translateY(100px);
        opacity: 0;
        transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
      `;
      document.body.appendChild(notification);
    }

    notification.innerHTML = `
      <h4 style="font-family: 'Playfair Display', serif; color: #c5a47e; font-size: 1.25rem; margin-bottom: 0.5rem; font-weight: normal;">Заявка принята!</h4>
      <p style="font-size: 0.85rem; color: #a3a3a3; line-height: 1.5;">Спасибо, <strong>${name}</strong>. Мы свяжемся с вами по телефону <strong>${phone}</strong> в течение 10 минут для обсуждения деталей.</p>
    `;

    // Trigger animation
    setTimeout(() => {
      notification.style.transform = 'translateY(0)';
      notification.style.opacity = '1';
    }, 100);

    // Reset form
    e.target.reset();

    // Auto-dismiss after 6 seconds
    setTimeout(() => {
      notification.style.transform = 'translateY(100px)';
      notification.style.opacity = '0';
    }, 6000);
  };

  if (projectForm) {
    projectForm.addEventListener('submit', (e) => handleFormSubmit(e, 'main'));
  }
  if (modalForm) {
    modalForm.addEventListener('submit', (e) => handleFormSubmit(e, 'modal'));
  }

});
