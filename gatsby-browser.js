import { createElement } from "react"

exports.onClientEntry = () => {
  window.slice = document.getElementById('slice');
  window.slice.style.height = `${document.documentElement.scrollHeight}px`;
}

function randomBetween (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

exports.onRouteUpdate = ({ location }) => {

  //-- Adjust height of slice by random number each route change.
  let height = window.innerHeight;
  let random = randomBetween(height, height + 200);
  window.slice.style.height = `${random}px`;

  if (typeof window.closeNav !== 'undefined') {
    window.closeNav();
  }
}
