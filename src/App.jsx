import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';

export default function App() {
  return (
    <div className="flex flex-col">
      <Navbar />
      <main className="flex-grow h-screen">
        <Outlet />
      </main>
    </div>
  );
}