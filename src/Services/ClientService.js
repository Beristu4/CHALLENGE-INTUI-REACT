
const URL = "https://localhost:7174/api/Client";

export const GetAllClients = async () =>{
    try {
        const response = await fetch(URL);
        if (!response.ok) return [];
        return await response.json();
    } catch (err) {
        console.error("Error fetch GetAllClients:", err);
        return [];
    }
}

export const GetClientById = async (id) =>{
    try{
        const response = await fetch(`${URL}/${id}`);
        if(!response.ok) return [];
        return await response.json();
    }catch(err){
        console.error("Error fetch GetClientById:", err);
        return [];
    }
}

export const SearchByName = async (name) =>{
    try{
        const response = await fetch(`${URL}/search?name=${name}`);
        if(!response.ok) return [];
        return await response.json();
    }catch(err){
        console.error("Error fetch SearchByName:", err);
        return [];
    }
}

export const InsertClient = async (client) =>{
    try{
        const response = await fetch(URL, {
            method:"Post",
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify(client)
        });
        if(!response.ok) throw new Error("Error al crear el Cliente");
        return await response.json()
    }catch (err) {
        console.error(err);
        return null;
    }
}

export const UpdateClient = async (client) =>{
    try{
        const response = await fetch(URL, {
            method:"Put",
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify(client)
        });
        if(!response.ok) throw new Error("Error al actualizar el Cliente");
        return await response.json()
    }catch (err) {
        console.error(err);
        return null;
    }
}