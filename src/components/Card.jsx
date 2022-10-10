import React from 'react'

export const Card = ({peliculas, deleteCard}) => {



  return (
    <>
        <article className="row">
        {peliculas.map((el, i) => {

          return (
            <div className="card my-4" key={i}>
              <div className="card-body">
                <h5 className="card-title">Nombre: {el.nombre}</h5>
                <p className="card-subtitle">Dueño: {el.descripcion}</p>
                <p className="card-text">Genero: {el.genero}</p>
              </div>
              <button
                className="btn btn-danger p-2"
                type="button"
                onClick={() => deleteCard(el)}
              >
                Eliminar
              </button>
            </div>
          );
        })}
      </article>
    </>
  )
}
