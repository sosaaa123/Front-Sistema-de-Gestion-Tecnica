import { useState } from "react"
import "./Sidebar.css"

export default function Sidebar({ change }) {
  const [esAb, setEsAb] = useState(false)

  const handleToggle = () => {
    const n = !esAb
    setEsAb(n)
    if (change) {
      change(n)
    }
  }

  return (
    <aside className={`side-cont ${esAb ? "ab" : ""}`}>
      <div className="arriba">
        <div className="usuario-pp">
          <div className={`sideLogo ${esAb ? "" : "sideLogo-agg"}`}></div>
          <p className={esAb ? "none" : ""}>usuario</p>
          <p className={`rol ${esAb ? "none" : ""}`}>{}</p>
        </div>
      </div>
      <div className={esAb ? "side-btnn bb" : "side-btnn bn"}>
        <button className="toggle-btn-interno" onClick={handleToggle}>
          {esAb ? (
            <i className="fa-solid fa-bars"></i>
          ) : (
            <i class="fa-solid fa-arrow-right"></i>
          )}
        </button>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section x">
          {!esAb && <p className="section-title">Consultar</p>}

          <a
            href=""
            className={`nav-link ${esAb ? "nav-link-exx" : ""}`}
            title="Inventario"
          >
            <span className="nav-icon">
              <i className="fa-solid fa-box"></i>
            </span>
            {!esAb && <span className="nav-text">Inventario</span>}
          </a>

          <a href="" className={`nav-link ${esAb ? "nav-link-exx" : ""}`}>
            <span className="nav-icon">
              <i className="fa-solid fa-clock-rotate-left"></i>
            </span>
            {!esAb && <span className="nav-text">Historial</span>}
          </a>
        </div>

        <div className="nav-section">
          {!esAb && <p className="section-title">Areas</p>}

          <a href="" className={`nav-link ${esAb ? "nav-link-exx" : ""}`}>
            <span className="nav-icon">
              <i className="fa-solid fa-code"></i>
            </span>
            {!esAb && <span className="nav-text">Programacion</span>}
          </a>
        </div>
      </nav>

      <div className="side-ft">
        <button className="logout-btn">
          <span className="nav-icon">
            <i className="fa-solid fa-right-from-bracket"></i>
          </span>
          {!esAb && <span>Cerrar Sesion</span>}
        </button>
      </div>
    </aside>
  )
}
