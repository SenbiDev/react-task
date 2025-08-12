import { useState} from 'react';
import { Link } from 'react-router-dom';

const Home = ({judul, content, onDelete}) => {
    const [menuOpen, setMenuOpen] = useState(false);

    return(
        <div className='bg-white p-4 rounded shadow relative'>
            <h2 className='text-lg font-semibold'>{judul}</h2>
            <p className='text-sm text-gray-600'>{content}</p>
            <button onClick={() => setMenuOpen(!menuOpen)} className='absolute top-4 right-4 px-2 py-1 text-xl hover:bg-gray-100 rounded'>:</button>
            {menuOpen && (
                <div className='note-menu absolute top-12 right-4 w-28 bg-white border border-gray-300 rounded shadow z-10'>
                    <Link to="/updatecatatan" className='block w-full text-left px-4 py-2 text-sm hover: bg-gray-600'>Edit</Link>
                    <button onClick={onDelete} className='block w-full text-left px-4 py-2 text-sm text-red-600 hover: bg-gray-600'>Hapus</button>
                </div>
            )}
        </div>
    );
};

export default Home;