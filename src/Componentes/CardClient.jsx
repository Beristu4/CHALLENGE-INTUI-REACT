import { useState, useEffect } from "react";
import { GetAllClients, GetClientById, SearchByName} from "../Services/ClientService";
import { Link } from "react-router-dom";
import FilterClient from "./FilterClient,";

const CardClient = () =>{


    const [clients, setClients] = useState([]);

    const handleSearch = async ({ searchName, id }) => {
        let data = [];
        if (id) {
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
        <Link to="/client/new"><button>Nuevo Cliente</button></Link>
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
              <td>
                <Link to={`/client/edit/${c.id}`}>
                  <button>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-edit"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg>
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CardClient;

