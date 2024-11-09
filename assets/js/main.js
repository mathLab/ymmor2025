(function($) {
  
  "use strict";  

  $(window).on('load', function() {

  /*Page Loader active
    ========================================================*/
    $('#preloader').fadeOut();

  // Sticky Nav
    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 200) {
            $('.scrolling-navbar').addClass('top-nav-collapse');
        } else {
            $('.scrolling-navbar').removeClass('top-nav-collapse')
        }
    });

    /* ==========================================================================
       countdown timer
       ========================================================================== */
     jQuery('#clock').countdown('2025/05/04',function(event){
      var $this=jQuery(this).html(event.strftime(''
      +'<div class="time-entry days"><span>%-D</span> Days</div> '
      +'<div class="time-entry hours"><span>%H</span> Hours</div> '
      +'<div class="time-entry minutes"><span>%M</span> Minutes</div> '
      +'<div class="time-entry seconds"><span>%S</span> Seconds</div> '));
    });

    /* slicknav mobile menu active  */
    $('.mobile-menu').slicknav({
        prependTo: '.navbar-header',
        parentTag: 'liner',
        allowParentLinks: true,
        duplicate: true,
        label: '',
      });

      /* WOW Scroll Spy
    ========================================================*/
     var wow = new WOW({
      //disabled for mobile
        mobile: false
    });
    wow.init();

    /* Nivo Lightbox 
    ========================================================*/
    $('.lightbox').nivoLightbox({
        effect: 'fadeScale',
        keyboardNav: true,
      });

    // one page navigation 
    $('.navbar-nav').onePageNav({
            currentClass: 'active'
    }); 

    /* Back Top Link active
    ========================================================*/
      var offset = 200;
      var duration = 500;
      $(window).scroll(function() {
        if ($(this).scrollTop() > offset) {
          $('.back-to-top').fadeIn(400);
        } else {
          $('.back-to-top').fadeOut(400);
        }
      });

      $('.back-to-top').on('click',function(event) {
        event.preventDefault();
        $('html, body').animate({
          scrollTop: 0
        }, 600);
        return false;
      });

  });      

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
  });

  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-up');
        }
    });
  }, observerOptions);

  document.querySelectorAll('.section-title, .card, .about-item').forEach((el) => {
    observer.observe(el);
  });

  // Form validation
  const form = document.getElementById('registration-form');
  if(form) {
    form.addEventListener('submit', function(e) {
        if (!form.checkValidity()) {
            e.preventDefault();
            e.stopPropagation();
        }
        form.classList.add('was-validated');
    });
  }

  // Navbar transparency handling
  document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    
    function updateNavbar() {
        if (window.scrollY > 50) {
            navbar.classList.remove('navbar-transparent');
        } else {
            navbar.classList.add('navbar-transparent');
        }
    }
    
    // Initial check
    updateNavbar();
    
    // Update on scroll
    window.addEventListener('scroll', updateNavbar);
  });

  document.addEventListener('DOMContentLoaded', function() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    // Handle menu item clicks
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth < 992) { // Only on mobile
          // Close the menu
          navbarCollapse.classList.remove('show');
          // Update toggler state
          navbarToggler.classList.add('collapsed');
          navbarToggler.setAttribute('aria-expanded', 'false');
          
          // Smooth scroll to section after menu closes
          const targetId = link.getAttribute('href');
          if (targetId && targetId.startsWith('#')) {
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
              setTimeout(() => {
                targetSection.scrollIntoView({ behavior: 'smooth' });
              }, 300); // Wait for menu animation to complete
            }
          }
        }
      });
    });

    // Remove any automatic collapse behaviors
    if (navbarToggler) {
      navbarToggler.addEventListener('click', function(e) {
        e.preventDefault();
        navbarCollapse.classList.toggle('show');
        this.classList.toggle('collapsed');
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !isExpanded);
      });
    }
  });

  // Add active class to nav items based on scroll position
  window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
  });

}(jQuery));
