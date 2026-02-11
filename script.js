/* ========================================
   HUMANE DESIGN PATTERNS -- Interactive Script
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  // ---- Filter Logic ----
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.pattern-card');
  const resultCount = document.querySelector('.filter-result-count');

  function updateCount() {
    const visible = document.querySelectorAll('.pattern-card:not(.hidden)').length;
    const total = cards.length;
    if (resultCount) {
      resultCount.textContent = visible === total
        ? `${total} patterns`
        : `${visible} of ${total} patterns`;
    }
    // Update header count too
    const headerCount = document.getElementById('pattern-count');
    if (headerCount) {
      headerCount.textContent = `${total} patterns`;
    }
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      let visibleIndex = 0;

      cards.forEach(card => {
        const category = card.dataset.category;
        const show = filter === 'all' || category === filter;

        if (show) {
          card.classList.remove('hidden');
          card.style.animation = 'none';
          card.offsetHeight; // trigger reflow
          card.style.animation = `fadeInUp 0.4s ease both`;
          card.style.animationDelay = `${Math.min(visibleIndex * 0.03, 0.3)}s`;
          visibleIndex++;
        } else {
          card.classList.add('hidden');
        }
      });

      updateCount();
    });
  });

  updateCount();

  // ---- Search (keyboard shortcut) ----
  // Press '/' to focus search (future enhancement placeholder)

  // ---- Scroll-to-top ----
  const scrollBtn = document.querySelector('.scroll-top');
  if (scrollBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 600) {
        scrollBtn.classList.add('visible');
      } else {
        scrollBtn.classList.remove('visible');
      }
    }, { passive: true });

    scrollBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---- Smooth anchor scrolling ----
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ---- Header shadow on scroll ----
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 10) {
        header.style.boxShadow = '0 1px 12px rgba(0,0,0,0.05)';
      } else {
        header.style.boxShadow = 'none';
      }
    }, { passive: true });
  }

  // ---- Principle card highlight on hover ----
  const principleCards = document.querySelectorAll('.principle-card');
  principleCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      const principle = card.dataset.principle;
      if (principle) {
        document.querySelectorAll(`.card-principle-tag[data-principle="${principle}"]`).forEach(tag => {
          tag.style.color = 'var(--accent-dark)';
          tag.style.borderColor = 'var(--accent-light)';
          tag.style.background = 'var(--accent-subtle)';
        });
      }
    });

    card.addEventListener('mouseleave', () => {
      document.querySelectorAll('.card-principle-tag').forEach(tag => {
        tag.style.color = '';
        tag.style.borderColor = '';
        tag.style.background = '';
      });
    });
  });
});
