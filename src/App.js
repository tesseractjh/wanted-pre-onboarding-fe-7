import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthRoute from './components/common/AuthRoute';
import Login from './components/Login';
import Todo from './components/Todo';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<AuthRoute redirect="/todo" element={<Login />} reversed />}
        />
        <Route
          path="/todo"
          element={<AuthRoute redirect="/" element={<Todo />} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
