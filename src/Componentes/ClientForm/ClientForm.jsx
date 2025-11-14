import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { GetClientById, InsertClient, UpdateClient } from "../../Services/ClientService";
import './ClientForm.Module.css';

const requiredFields = ["name", "lastName", "telephone", "cuit", "email"];

const ClientForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [client, setClient] = useState({
    name: "",
    lastName: "",
    dateOfBirth: "",
    address: "",
    telephone: "",
    cuit: "",
    email: ""
  });

  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    switch (name) {
    case "name":
    case "lastName":
        if (!value || !value.trim()) return "Campo obligatorio";
        return "";
    case "telephone":
        if (!value || !value.trim()) return "Campo obligatorio";
        if (!/^\+?\d{10,15}$/.test(value)) return "Teléfono inválido";
        return "";
    case "cuit":
        if (!value || !value.trim()) return "Campo obligatorio";
        if (!/^\d{11}$/.test(value)) return "CUIT debe tener 11 dígitos";
        return "";
    case "email":
        if (!value || !value.trim()) return "Campo obligatorio";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Email inválido";
        return "";
    default:
        return "";
    }
  };
  const validateAll = (sourceClient = client) => {
      const newErrors = {};
      requiredFields.forEach(f => {
      const err = validateField(f, sourceClient[f]);
      if (err) newErrors[f] = err;
      });
      return newErrors;
  };

  useEffect(() => {
    if (id) {
      (async () => {
        const data = await GetClientById(id);
        if (data) {
          const formattedData = {
            ...data,
            dateOfBirth: data.dateOfBirth
              ? dayjs(data.dateOfBirth, "DD/MM/YYYY").format("YYYY-MM-DD")
              : ""
          };
          setClient(formattedData);
          // validar al cargar los datos
          const initialErrors = validateAll(formattedData);
          setErrors(initialErrors);
        }
      })();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newClient = { ...client, [name]: value };
    setClient(newClient);

    // validar solo ese campo y actualizar errors correctamente (borrar la key si no hay error)
    const err = validateField(name, value);
    setErrors(prev => {
      const copy = { ...prev };
      if (err) copy[name] = err;
      else delete copy[name];
      return copy;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateAll();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return; // no submit si hay errores

    const payload = { ...client };
    payload.dateOfBirth = client.dateOfBirth ? dayjs(client.dateOfBirth).format("YYYY-MM-DD") : null;

    if (id) await UpdateClient(payload);
    else await InsertClient(payload);

    navigate("/");
  };

  return (
    <div className="content-form">
      <h2>{id ? "Editar Cliente" : "Nuevo Cliente"}</h2>
      <p>Debe completar los campos en Rojo</p>

      <form onSubmit={handleSubmit} noValidate>
        <div className="field">
          <input
            name="name"
            value={client.name}
            onChange={handleChange}
            placeholder="Nombre"
            className={errors.name ? "red" : client.name ? "green" : ""}
          />
        </div>
          {errors.name && <span className="error">{errors.name}</span>}

        <div className="field">
          <input
            name="lastName"
            value={client.lastName}
            onChange={handleChange}
            placeholder="Apellido"
            className={errors.lastName ? "red" : client.lastName ? "green" : ""}
          />
        </div>
        {errors.lastName && <span className="error">{errors.lastName}</span>}

        <div className="field">
          <input
            name="dateOfBirth"
            value={client.dateOfBirth}
            onChange={handleChange}
            placeholder="Fecha de Nac."
            type="date"
          />
        </div>
        

        <div className="field">
          <input
            name="address"
            value={client.adress}
            onChange={handleChange}
            placeholder="Domicilio"
          />
        </div>

        <div className="field">
          <input
            name="telephone"
            value={client.telephone}
            onChange={handleChange}
            placeholder="Teléfono"
            className={errors.telephone ? "red" : client.telephone ? "green" : ""}
          />
        </div>
        {errors.telephone && <span className="error">{errors.telephone}</span>}

        <div className="field">
          <input
            name="cuit"
            value={client.cuit}
            onChange={handleChange}
            placeholder="CUIT"
            className={errors.cuit ? "red" : client.cuit ? "green" : ""}
          />
        </div>
        {errors.cuit && <span className="error">{errors.cuit}</span>}

        <div className="field">
          <input
            name="email"
            value={client.email}
            onChange={handleChange}
            placeholder="Email"
            className={errors.email ? "red" : client.email ? "green" : ""}
          />
        </div>
        {errors.email && <span className="error">{errors.email}</span>}

        <div className="actions">
          <button
            type="submit"
          >
            {id ? "Actualizar" : "Crear"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ClientForm;
