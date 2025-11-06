import { useState } from "react"
import Sidebar from "./Sidebar"
import Registros from "./Registros"
import Inventario from "./Inventario"
import Prestamo from "./Prestamo/Prestamo"
import "./Area.css"

function Area({ nombre_area }) {
  const [ab, setAb] = useState(false)
  const [ver, setVer] = useState("registros")
  return (
    <div className="fcont">
      <Sidebar change={setAb} />
      <section className={`programacion ${ab ? "abn" : ""}`}>
        <nav>
          <h1 className="nv-prg">Panel de Gestion</h1>
          <div className="nvv-prg">
            <div>
              <button onClick={() => setVer("registros")}>Registros</button>
              <i class="fa-solid fa-folder-open"></i>
            </div>
            <div>
              <button onClick={() => setVer("inventario")}>Inventario</button>
              <i class="fa-solid fa-screwdriver-wrench"></i>
            </div>
            <div>
              <button
                onClick={() => {
                  setVer("nuevo")
                }}
              >
                Nuevo Prestamo
              </button>
              <i class="fa-solid fa-plus"></i>
            </div>
          </div>
        </nav>
        <div className="mmmpp">
          {ver === "registros" ? (
            <Registros area={nombre_area}></Registros>
          ) : (
            ""
          )}
          {ver === "inventario" ? (
            <Inventario area={nombre_area}></Inventario>
          ) : (
            ""
          )}
          {ver === "nuevo" ? <Prestamo area={nombre_area}></Prestamo> : ""}
        </div>
      </section>
    </div>
  )
}

export default Area
