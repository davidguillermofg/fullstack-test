import { Navigate, Route, Routes } from 'react-router-dom';
import { WelcomePage } from './pages/WelcomePage';
import { SuppliersPage } from './pages/SuppliersPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/proveedores" element={<SuppliersPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
