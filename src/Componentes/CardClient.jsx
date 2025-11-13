import { useState, useEffect } from "react";
import { GetAllClients, GetClientById, SearchByName} from "../Services/ClientService";
import FilterClient from "./FilterClient,";

const CardClient = () =>{


    const [clients, setClients] = useState([]);

    const handleSearch = async ({ searchName, id }) => {
        let data = [];
        if (id != "") {
            const client = await GetClientById(id);
            if (client) data = [client];
        } else if (searchName) {
            data = await SearchByName(searchName);
        } else {
            data = await GetAllClients();
        }

        setClients(data);
    };
    
    useEffect(() => {
        const fetchClients = async () => {
          const data = await GetAllClients();
          setClients(data);
        };
        fetchClients();
    }, []);

 return (
    <div className="contet-card">
        <h2>Listado de Clientes</h2>
        <FilterClient onSearch={handleSearch} />
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Fecha de Nacimiento</th>
            <th>Domicilio</th>
            <th>Teléfono</th>
            <th>CUIT</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((c) => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{c.lastName}</td>
              <td>{c.dateOfBirth}</td>
              <td>{c.adress}</td>
              <td>{c.telephone}</td>
              <td>{c.cuit}</td>
              <td>{c.email}</td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CardClient;

