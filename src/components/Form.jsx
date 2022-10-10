import React, { useEffect, useState } from "react";
import Select from "react-select";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { v4 as uuidv4 } from "uuid";
import { Card } from "./Card";

const MySwal = withReactContent(Swal);

export const Form = () => {
  const options = [
    { value: "terror", label: "Terror" },
    { value: "suspenso", label: "Suspenso" },
    { value: "drama", label: "Drama" },
    { value: "animada", label: "Animada" },
  ];

  const idRandom = uuidv4();

  const [genero, setGenero] = useState("");
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const datosLs = JSON.parse(localStorage.getItem("movies")) || [];

  const [peliculas, setPeliculas] = useState(datosLs);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newMovie = {
      id: idRandom,
      nombre: nombre,
      genero: genero,
      descripcion: descripcion,
    };

    if (genero === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ingrese un genero!",
      });
    } else {
      setPeliculas([...peliculas, newMovie]);
    }

    setDescripcion("");
    setGenero(null);
    setNombre("");
  };

  useEffect(() => {
    localStorage.setItem("movies", JSON.stringify(peliculas));
  }, [peliculas]);


  const deleteCard = (pelicula) =>{

    const nuevoArray = peliculas.filter((x) => x.id !== pelicula.id);

    setPeliculas(nuevoArray);

  }

  return (
    <>
      <div className="my-5 container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label text-light">Nombre de pelicula</label>
            <input
              type="text"
              className="form-control"
              placeholder="Ironman 3"
              required
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div className="my-3">
            <label className="form-label text-light">Descripcion</label>
            <textarea
              name="descripcion"
              className="form-control"
              cols="30"
              rows="2"
              required
              placeholder="Ingrese la descripcion"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            ></textarea>
          </div>
          <div>
            <label className="form-label text-light">Genero</label>
            <Select options={options} onChange={(e) => setGenero(e.value)} />
          </div>
          <div className="d-flex justify-content-center my-3">
            <button className="btn btn-primary" type="submit">
              Crear
            </button>
          </div>
        </form>
      </div>
      <hr />
      <div className="container">
        <Card peliculas={peliculas} deleteCard={deleteCard}/>
      </div>
    </>
  );
};
