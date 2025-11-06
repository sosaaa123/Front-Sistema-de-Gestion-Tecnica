import { useState, useEffect } from "react"
export default function InventarioSelect({ area, onSelectElement }) {
  const [datos, setDatos] = useState([])
  const [cargando, setCargando] = useState(false)
  const [busqueda, setBusqueda] = useState("")

  useEffect(() => {
    setCargando(true)
    fetch(`http://127.0.0.1:8081/${area}/inventario`)
      .then((res) => res.json())
      .then((data) => {
        setDatos(data)
        setCargando(false)
      })
  }, [area])

  const elementosFiltrados = datos.filter((el) =>
    el.nombre.toLowerCase().includes(busqueda.toLowerCase())
  )

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
            <input
              type="text"
              placeholder="Buscar elemento..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
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
          {elementosFiltrados.map((r) => {
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
                  <button onClick={() => onSelectElement(r)}>
                    Seleccionar
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
