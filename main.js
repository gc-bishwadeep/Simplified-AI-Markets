// Simplified AI Markets — Main JS

// Mobile nav
const hamburger = document.getElementById('hamburger');
const mainNav = document.getElementById('main-nav');
if (hamburger && mainNav) {
  hamburger.addEventListener('click', () => {
    mainNav.classList.toggle('open');
  });
}

// Sticky header shadow
const header = document.getElementById('site-header');
if (header) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.style.boxShadow = '0 4px 32px rgba(0,0,0,0.4)';
    } else {
      header.style.boxShadow = 'none';
    }
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (mainNav) mainNav.classList.remove('open');
    }
  });
});

// Newsletter form
const nlForm = document.getElementById('newsletter-form');
if (nlForm) {
  nlForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = this.querySelector('button[type="submit"]');
    const orig = btn.textContent;
    btn.textContent = 'Subscribed! Check your email ✓';
    btn.style.background = '#059669';
    setTimeout(() => {
      btn.textContent = orig;
      btn.style.background = '';
    }, 4000);
  });
}

// Active TOC link on scroll (blog pages)
const tocLinks = document.querySelectorAll('.toc-list a');
if (tocLinks.length > 0) {
  const sections = document.querySelectorAll('.article-content h2, .article-content h3');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        tocLinks.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === '#' + id) {
            link.style.color = 'var(--accent)';
          }
        });
      }
    });
  }, { rootMargin: '-20% 0px -70% 0px' });
  sections.forEach(s => observer.observe(s));
}

// Animation on scroll
const animEls = document.querySelectorAll('.blog-card, .ai-card, .tool-card');
if ('IntersectionObserver' in window) {
  const anim = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        anim.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  animEls.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    anim.observe(el);
  });
}
