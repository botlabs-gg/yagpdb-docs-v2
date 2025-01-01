// Put your custom JS code here

// self-hosting view.
const getSelfhost = () => {
  return localStorage.getItem('selfhost') || 'no';
};

const setSelfhost = (selfhost) => {
  localStorage.setItem('selfhost', selfhost);
  document.documentElement.setAttribute('data-selfhost', selfhost);
};

setSelfhost(getSelfhost());

window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-selfhost-value]').forEach((element) => {
    element.addEventListener('click', (event) => {
      const selfhost = element.getAttribute('data-selfhost-value');
      setSelfhost(selfhost);
    });
  }
)});
