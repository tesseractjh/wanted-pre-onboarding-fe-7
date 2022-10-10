import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthRoute from './components/common/AuthRoute';
import Login from './components/Login';
import Todo from './components/Todo';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthRoute redirect="/todo" reversed />}>
          <Route index element={<Login />} />
        </Route>
        <Route path="/todo" redirect="/" element={<AuthRoute redirect="/" />}>
          <Route index element={<Todo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
