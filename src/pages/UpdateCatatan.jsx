import {useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import HeaderEdit from '../components/HeaderEdit';
import EditCatatan from '../components/EditCatatan';

const UpdateCatatan = ({notes, setNotes}) => {
    const navigate = useNavigate();
    const {id} = useParams();

    const [tittle, setTittle]=useState("");
    const [content, setContent]=useState("");
    
    useEffect(() => {
        const note = notes.find((n) => n.id === Number(id));
        if(note){
            setTittle(note.tittle);
            setContent(note.content);
        }
    }, [id, notes]);

    const handleUpdate = (e) => {
        e.preventDefault();
        const updatedNotes = notes.map((n) => n.id === Number(id)? {...n, tittle, content}:n
    );
    setNotes(updatedNotes);
    navigate("/")
    };
    
    return(
        <div className='bg-gray-100 min-h-screen'>
            <HeaderEdit/>
            <EditCatatan
                tittle={tittle}
                ontent={content}
                setTittle={setTittle}
                setContent={setContent}
                onSave={handleUpdate}
            />
        </div>
    );
};

export default UpdateCatatan;