import { Link } from "react-router-dom";

const Navigation = () => (
    <nav className="bg-white px-6 py-3 shadow flex items-center">
        <Link to="/createcatatan" className="text-white bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-500">+ Buat Catatan</Link>
    </nav>
)

export default Navigation;