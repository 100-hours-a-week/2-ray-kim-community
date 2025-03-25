export const navigate = (e = null, url) => {
  if (e !== null) {
    e.preventDefault();
    e.stopPropagation();
  }
  window.history.pushState(null, null, url);
  window.dispatchEvent(new PopStateEvent('popstate'));
}
