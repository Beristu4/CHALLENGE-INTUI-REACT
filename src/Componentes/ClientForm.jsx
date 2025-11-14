import { useState,useEffect } from "react";
import { useParams, useNavigate} from "react-router-dom";
import dayjs from "dayjs";
import { GetClientById , InsertClient, UpdateClient} from "../Services/ClientService";

const ClientForm = () =>{

    const { id } = useParams();
    const navigate = useNavigate();
    const [client, setClient] = useState({
        name: "",
        lastName: "",
        dateOfBirth: "",
        adress: "",
        telephone: "",
        cuit: "",
        email: ""
    });

    const handleChange = (e) => {
        setClient({ ...client, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) =>{
        e.preventDefault();

        const payload = { ...client };
    
        // Convertir fecha a ISO si no está vacía
        if (client.dateOfBirth) {
            payload.dateOfBirth = dayjs(client.dateOfBirth).format("YYYY-MM-DD");
        } else {
            payload.dateOfBirth = null; // enviar null si no hay fecha
        }
        if(id){
            //llamo al actualizar
            await UpdateClient(payload);
        }else{
            //llamo al crear
            await InsertClient(payload);
        }
        navigate("/")
    };

    useEffect(() =>{
        if(id){
            const fetchClients = async () =>{
                const data = await GetClientById(id)
                if(data) {
                    console.log("antes",data);
                    const formattedData = { 
                    ...data, 
                    dateOfBirth: data.dateOfBirth
                        ? dayjs(data.dateOfBirth, "DD/MM/YYYY").format("YYYY-MM-DD")
                        : ""
                    };
                    console.log(formattedData);
                    setClient(formattedData);
                }
            };

            fetchClients();
        }
    }, [id])

    return (
    <div>
      <h2>{id ? "Editar Cliente" : "Nuevo Cliente"}</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" value={client.name} onChange={handleChange} placeholder="Nombre" required />
        <input name="lastName" value={client.lastName} onChange={handleChange} placeholder="Apellido" required />
        <input name="dateOfBirth" value={client.dateOfBirth} onChange={handleChange} placeholder="Fecha de Nac." type="date" />
        <input name="adress" value={client.adress} onChange={handleChange} placeholder="Domicilio" />
        <input name="telephone" value={client.telephone} onChange={handleChange} placeholder="Teléfono" required />
        <input name="cuit" value={client.cuit} onChange={handleChange} placeholder="CUIT" required />
        <input name="email" value={client.email} onChange={handleChange} placeholder="Email" required />
        <button type="submit">{id ? "Actualizar" : "Crear"}</button>
      </form>
    </div>
  );
}

export default ClientForm;