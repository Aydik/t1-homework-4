import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from 'app/router/AppRouter.tsx';

function App() {
  return (
    <BrowserRouter basename="/t1-homework-1/">
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
