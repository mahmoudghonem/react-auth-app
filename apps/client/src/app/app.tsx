import { Routes, Route } from 'react-router-dom';
import MainLayout from '../components/shared/layouts/MainLayout/MainLayout';
import Welcome from '../pages/Welcome/Welcome';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
