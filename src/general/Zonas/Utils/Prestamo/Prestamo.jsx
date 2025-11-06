import { useState } from "react"
import "./Prestamo.css"
import Usuarios from "./Usuarios"
import InventarioSelect from "./InventarioSelect"

export default function Prestamo({ area }) {
  const [usuario, setUsuario] = useState({ nombre: "", apellido: "" })
  const [destino, setDestino] = useState("")
  const [elementosSeleccionados, setElementosSeleccionados] = useState([])
  const [loading, setLoading] = useState(false)
  const [mensaje, setMensaje] = useState("")

  const agregarElemento = (elemento) => {
    const yaExiste = elementosSeleccionados.find(
      (el) => el.id_element === elemento.id_element
    )

    if (yaExiste) {
      setMensaje("Este elemento ya está seleccionado")
      return
    }

    setElementosSeleccionados([
      ...elementosSeleccionados,
      {
        ...elemento,
        cantidadPrestar: 1,
      },
    ])
    setMensaje("")
  }

  const quitarElemento = (id) => {
    setElementosSeleccionados(
      elementosSeleccionados.filter((el) => el.id_element !== id)
    )
  }

  const cambiarCantidad = (id, nuevaCantidad) => {
    setElementosSeleccionados(
      elementosSeleccionados.map((el) =>
        el.id_element === id ? { ...el, cantidadPrestar: nuevaCantidad } : el
      )
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!usuario.nombre || !usuario.apellido) {
      setMensaje("Debes seleccionar un usuario")
      return
    }

    if (elementosSeleccionados.length === 0) {
      setMensaje("Debes seleccionar al menos un elemento")
      return
    }

    setLoading(true)
    setMensaje("")

    try {
      for (const el of elementosSeleccionados) {
        const payload = {
          usuario: {
            nombre: usuario.nombre,
            apellido: usuario.apellido,
          },
          registro_base: {
            element_id: el.id_element,
            cantidad: el.cantidadPrestar,
            destino: destino,
          },
        }

        const res = await fetch(`http://127.0.0.1:8081/${area}/prestar`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        })

        if (!res.ok) {
          const data = await res.json()
          setMensaje(`Error: ${data.detail || data.message}`)
          setLoading(false)
          return
        }
      }

      setMensaje("Préstamo registrado exitosamente")
      setUsuario({ nombre: "", apellido: "" })
      setDestino("")
      setElementosSeleccionados([])
    } catch (err) {
      console.log(err)
      setMensaje("Error de conexión con el servidor")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="prestamo-container">
      <Usuarios onSelectUser={setUsuario} onDestinoCambio={setDestino} />

      <InventarioSelect area={area} onSelectElement={agregarElemento} />

      <div className="resumen">
        <h2>Resumen del Préstamo</h2>

        {usuario.nombre && (
          <div>
            <p>
              Usuario: {usuario.nombre} {usuario.apellido}
            </p>
            <p>Destino: {destino}</p>
          </div>
        )}

        {elementosSeleccionados.length === 0 ? (
          <p>No hay elementos seleccionados</p>
        ) : (
          <>
            {elementosSeleccionados.map((el) => (
              <div key={el.id_element}>
                <p>{el.nombre}</p>
                <input
                  type="number"
                  min="1"
                  max={el.disponibles || 1}
                  value={el.cantidadPrestar}
                  onChange={(e) =>
                    cambiarCantidad(el.id_element, parseInt(e.target.value))
                  }
                />
                <button onClick={() => quitarElemento(el.id_element)}>
                  Quitar
                </button>
              </div>
            ))}
          </>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading || elementosSeleccionados.length === 0}
        >
          {loading ? "Registrando..." : "Registrar Préstamo"}
        </button>

        {mensaje && <p>{mensaje}</p>}
      </div>
    </div>
  )
}
