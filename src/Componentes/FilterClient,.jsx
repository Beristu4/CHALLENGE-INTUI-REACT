import { useState, useEffect } from "react"; 

const FilterClient = ({onSearch}) =>{

    const [id, setId] = useState("");
    const [searchName, setSearchName] = useState("");

    useEffect(() =>{
        console.log(id)
        onSearch({searchName , id})
    },[id, searchName])
    return(
        <div className="filters">
            <input 
            type="number" 
            placeholder="Buscar por ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
            />
            <input 
            type="text" 
            placeholder="Buscar por Nombre"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            />
        </div>
    );
}

export default FilterClient;