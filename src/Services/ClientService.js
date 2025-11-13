
const URL = "https://localhost:7174/api/Client";

export const GetAllClients = async () =>{
    try {
        const response = await fetch(URL);
        if (!response.ok) throw new Error("Error en la API");
        return await response.json();
    } catch (err) {
        console.error("Error fetch GetAllClients:", err);
        return [];
    }
}

export const GetClientById = async (id) =>{
    try{
        console.log("id desde el service", id)
        const response = await fetch(`${URL}/${id}`);
        if(!response.ok) throw new Error("Error al encontrar por Id");
        console.log(response);
        return await response.json()
    }catch(err){
        console.error("Error fetch GetClientById:", err);
        return [];
    }
}

export const SearchByName = async (name) =>{
    try{
        const response = await fetch(`${URL}/search?name=${name}`);
        if(!response.ok) throw new Error("Error al encontrar por Nombre");
        console.log(response);
        return await response.json()
    }catch(err){
        console.error("Error fetch SearchByName:", err);
        return [];
    }
}