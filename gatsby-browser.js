import { createElement } from "react"

exports.onClientEntry = () => {
  window.slice = document.getElementById('slice');
  window.slice.style.height = `${document.body.clientHeight}px`;
}

exports.onRouteUpdate = ({ location }) => {
  window.slice.style.height = `${document.body.clientHeight}px`;

  if (typeof window.closeNav !== 'undefined') {
    window.closeNav();
  }
}
