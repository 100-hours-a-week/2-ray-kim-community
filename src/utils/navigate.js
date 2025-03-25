export const navigate = (url, e = null) => {
  if (e !== null) {
    e.preventDefault();
    e.stopPropagation();
  }
  window.history.pushState(null, null, url);
  window.dispatchEvent(new PopStateEvent('popstate'));
}
