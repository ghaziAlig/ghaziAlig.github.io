const shell = document.querySelector('.page-shell');
const progressValue = document.querySelector('#progress-value');
const toast = document.querySelector('.toast');
const canHover = 'PointerEvent' in window && typeof window.matchMedia === 'function' && window.matchMedia('(hover: hover)').matches;

const updateProgress = () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? Math.round((window.scrollY / scrollable) * 100) : 0;
  progressValue.textContent = `${String(progress).padStart(2, '0')}%`;
};

window.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

if (canHover) {
  window.addEventListener('pointermove', (event) => {
    shell.style.setProperty('--mouse-x', `${event.clientX}px`);
    shell.style.setProperty('--mouse-y', `${event.clientY}px`);
  }, { passive: true });
}

if (canHover) {
  document.querySelectorAll('.magnetic').forEach((element) => {
    element.addEventListener('pointermove', (event) => {
      const bounds = element.getBoundingClientRect();
      const x = (event.clientX - bounds.left - bounds.width / 2) * 0.12;
      const y = (event.clientY - bounds.top - bounds.height / 2) * 0.12;
      element.style.transform = `translate(${x}px, ${y}px)`;
    });
    element.addEventListener('pointerleave', () => {
      element.style.transform = '';
    });
  });
}

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
} else {
  document.querySelectorAll('.reveal').forEach((element) => element.classList.add('is-visible'));
}

const emailLink = document.querySelector('.contact-email');
if (emailLink && toast) {
  emailLink.addEventListener('click', () => {
    toast.textContent = 'opening direct line →';
    toast.classList.add('is-visible');
    window.setTimeout(() => toast.classList.remove('is-visible'), 2400);
  });
}
