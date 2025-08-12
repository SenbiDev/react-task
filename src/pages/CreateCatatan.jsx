import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderBuat from "../components/HeaderBuat";
import BuatCatatan from "../components/BuatCatatan";

const CreateCatatan = ({}) => {
    const navigate = useNavigate();
    const [tittle, setTittle]=useState("");
    const [content, setContent]=useState("");

    const handleSave = (e) => {
        e.preventDefault();
        console.log("Catatan Baru", {tittle});
        navigate("/");
    };
    
    return(
        <div className="bg-gray-100 min-h-screen">
            <HeaderBuat/>
            <BuatCatatan
                tittle={tittle}
                content={content}
                setTittle={setTittle}
                setContent={setContent}
                onSave={handleSave}
            />
        </div>
    );
};

export default CreateCatatan;
