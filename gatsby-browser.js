import { createElement } from "react"

exports.onClientEntry = () => {
  window.slice = document.getElementById('slice');
  window.slice.style.height = `${document.documentElement.scrollHeight}px`;
}

exports.onRouteUpdate = ({ location }) => {
  if (typeof window.closeNav !== 'undefined') {
    window.closeNav();
  }
}
