import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Catatan from './pages/Catatan';
import CreateCatatan from './pages/CreateCatatan';
import UpdateCatatan from './pages/UpdateCatatan';

export default function App() {
  return (
    <div className="flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
}