import Header from "./components/Header.js";

const Layout = () => {
  const container = document.createElement('div');
  const header = Header();
  container.innerHTML = header;

  const init = () => {
    Header.init();
  }

  return container;
}

export default Layout;