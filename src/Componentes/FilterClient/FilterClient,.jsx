import { useState, useEffect } from "react"; 
import './FilterClient.Module.css'

const FilterClient = ({onSearch}) =>{

    const [id, setId] = useState("");
    const [searchName, setSearchName] = useState("");

    useEffect(() =>{
        onSearch({searchName , id})
    },[id, searchName])
    return(
        <div className="filters">
            <input 
            type="number" 
            placeholder="Buscar por ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
            disabled={searchName !== ""}
            />
            <input 
            type="text" 
            placeholder="Buscar por Nombre"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            disabled={id !== ""}
            />
        </div>
    );
}

export default FilterClient;