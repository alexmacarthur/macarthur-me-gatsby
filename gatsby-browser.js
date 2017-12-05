exports.onRouteUpdate = ({ location }) => {
  if(typeof window.closeNav === 'undefined') return;

  window.closeNav();
}
