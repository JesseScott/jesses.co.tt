// Navbar toggle (mobile) and the project filter on projects.html.
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.navbar-toggle');
  const menu = toggle && document.querySelector(toggle.dataset.target);
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const open = menu.classList.toggle('in');
      toggle.classList.toggle('collapsed', !open);
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  const filter = document.getElementById('nav');
  if (filter) {
    const groups = document.querySelectorAll('.Menu');
    const show = id => {
      groups.forEach(g => { g.style.display = 'none'; g.classList.remove('fade-in'); });
      document.querySelectorAll('.' + id).forEach(g => {
        g.style.display = '';
        g.classList.add('fade-in');
      });
    };
    show('all');
    filter.querySelectorAll('a').forEach(a => a.addEventListener('click', () => show(a.id)));
  }
});
