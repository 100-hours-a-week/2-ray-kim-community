import Router from './router.js';

const App = () => {
  const mount = () => Router();

  return { mount };
};

export default App;