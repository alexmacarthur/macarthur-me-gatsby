//-- Include global styles.
require('./assets/scss/style.scss');

exports.onInitialClientRender = () => {
  window.slice = document.getElementById('slice');
}

function randomBetween (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

exports.onRouteUpdate = ({ location }) => {
  let winHeight = window.innerHeight;
  window.slice.style.height = `${randomBetween(winHeight + 300, winHeight + 600)}px`;
}
