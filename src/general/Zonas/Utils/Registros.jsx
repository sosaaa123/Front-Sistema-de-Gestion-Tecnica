import "./Registros.css"
import { useState, useEffect } from "react"

function Registros({ area }) {
  const [datos, setDatos] = useState([])
  const [cargando, setCargando] = useState(false)
  const [mensaje, setMensaje] = useState("")
  const [error, setError] = useState(false)
  useEffect(() => {
    registros()
  }, [area])

  const registros = () => {
    setCargando(true)
    fetch(`http://127.0.0.1:8081/${area}/registros`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setDatos(data)
        data.reverse()
        setError(false)
      })
      .catch((err) => {
        console.log(err)
        setMensaje(err)
        setError(true)
      })
      .finally(() => {
        setCargando(false)
      })
  }

  const devolver = async (id_registro) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/${area}/devolver/${id_registro}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      if (response.succes) {
        console.log(response)
        registros()
      } else {
        console.log(response)
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      {cargando ? (
        <div className="cargando">
          {error ? <p>{error}</p> : <p>Cargando...</p>}
        </div>
      ) : (
        <div className="registros-cont">
          <h2>Prestamos Recientes</h2>
          <div className="columnas">
            <div className="columna-nombre">
              <p>Nombre</p>
            </div>
            <div className="columna-curso">
              <p>Curso</p>
            </div>
            <div className="columna-elemento">
              <p>Elemento</p>
            </div>
            <div className="columna-cantidad">
              <p>Cantidad</p>
            </div>
            <div className="columna-fecha">
              <p>Fecha</p>
            </div>
            <div className="columna-hora">
              <p>Hora</p>
            </div>
            <div className="columna-estado">
              <p>Estado</p>
            </div>
            <div className="baja">
              <p></p>
            </div>
          </div>
          {datos ? (
            datos.map((r) => {
              return (
                <div className="registro" key={r.registro_id}>
                  <div className="columna-nombre">
                    <p>
                      {r.nombre} {r.apellido}
                    </p>
                  </div>
                  <div className="columna-curso">
                    <p>{r.destino}</p>
                  </div>
                  <div className="columna-elemento">
                    <p>{r.elemento_nombre}</p>
                  </div>
                  <div className="columna-cantidad">
                    <p>{r.cantidad}</p>
                  </div>
                  <div className="columna-fecha">
                    <p>{r.fecha}</p>
                  </div>
                  <div className="columna-hora">
                    <p>{r.hora}</p>
                  </div>
                  <div className="columna-estado">
                    <p
                      className={
                        r.estado == "En curso" ? "oncurse" : "notcurse"
                      }
                    >
                      {r.estado}
                    </p>
                  </div>
                  <div className="columna-baja">
                    {r.estado === "En curso" ? (
                      <button
                        OnClick={devolver(r.registro_id)}
                        className="cssv"
                      >
                        <p>Terminar</p>
                      </button>
                    ) : (
                      <p className="terminado">Terminado</p>
                    )}
                  </div>
                </div>
              )
            })
          ) : (
            <h2>Error al cargar registros</h2>
          )}
        </div>
      )}
    </>
  )
}

export default Registros
