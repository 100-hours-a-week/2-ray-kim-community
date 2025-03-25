export const navigate = (e = null, url) => {
  e.preventDefault();
  e.stopPropagation();
  window.history.pushState(null, null, url);
  window.dispatchEvent(new PopStateEvent('popstate'));
}
