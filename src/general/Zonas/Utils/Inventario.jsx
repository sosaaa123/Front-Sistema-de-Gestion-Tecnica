import { useState, useEffect } from "react"
import "./Inventario.css"
function Inventario({ area }) {
  const [datos, setDatos] = useState([])
  const [cargando, setCargando] = useState(false)
  useEffect(() => {
    setCargando(true)
    fetch(`http://127.0.0.1:8081/${area}/inventario`)
      .then((res) => res.json())
      .then((data) => {
        setDatos(data)
        console.log(datos)
        setCargando(false)
      })
  }, [])

  return (
    <>
      {cargando ? (
        <div className="cargando">
          <h2>Cargando...</h2>
        </div>
      ) : (
        <div className="inventario-cont">
          <div className="agg_element">
            <h2>Inventario</h2>
            <div>
              <button>
                <div ssspm>
                  <p>agregar</p>
                  <i class="fa-solid fa-plus"></i>
                </div>
              </button>
            </div>
          </div>

          <div className="colums">
            <div className="c-nombre">Nombre</div>
            <div className="c-estado">Estado</div>
            <div className="c-cantidad">Cantidad</div>
            <div className="c-disponibles">Disponibles</div>
            <div className="iddd">ID</div>
            <div className="c-info">
              <p></p>
            </div>
          </div>
          {datos.map((r) => {
            return (
              <div key={r.id_element} className="element">
                <div className="c-nombre">
                  <p>{r.nombre}</p>
                </div>
                <div className="c-estado">
                  <p>{r.estado}</p>
                </div>
                <div className="c-cantidad">
                  {r.cantidad ? (
                    <p>Cantidad: {r.cantidad}</p>
                  ) : (
                    <p>Cantidad: {1}</p>
                  )}
                </div>
                <div className="c-disponibles">
                  {r.disponibles ? <p>{r.disponibles}</p> : <p>{1}</p>}
                </div>
                <div className="iddd">
                  {r.codigo_interno ? (
                    <p>{r.codigo_interno}</p>
                  ) : (
                    <p>{r.id_element}</p>
                  )}
                </div>
                <div className="c-info">
                  <button>
                    <i class="fa-solid fa-info"></i>
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}

export default Inventario
