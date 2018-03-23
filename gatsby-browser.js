exports.onClientEntry = () => {
  window.slice = document.getElementById('slice');
  window.slice.style.height = `${document.documentElement.scrollHeight}px`;
}

exports.onRouteUpdate = ({ location }) => {
  window.slice.style.height = `${document.documentElement.scrollHeight}px`;
  
  if(typeof window.closeNav === 'undefined') return;

  window.closeNav();
}
