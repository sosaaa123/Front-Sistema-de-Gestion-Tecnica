import "./Usuarios.css"
import { useState, useEffect } from "react"
export default function Usuarios({ onSelectUser, onDestinoCambio }) {
  const [usuarios, setUsuarios] = useState([])
  const [sugerencias, setSugerencias] = useState([])
  const [sugerir, setSugerir] = useState(false)
  const [cargando, setCargando] = useState(false)
  const [nombre, setNombre] = useState("")
  const [apellido, setApellido] = useState("")
  const [destino, setDestino] = useState("")

  useEffect(() => {
    setCargando(true)
    fetch("http://127.0.0.1:8081/usuarios/users")
      .then((res) => res.json())
      .then((data) => {
        setUsuarios(Array.isArray(data.data) ? data.data : [])
        setCargando(false)
      })
      .catch((err) => {
        console.error(err)
        setCargando(false)
      })
  }, [])

  useEffect(() => {
    if (nombre.length < 2 && apellido.length < 2) {
      setSugerencias([])
      setSugerir(false)
      return
    }

    const coincidencias = usuarios.filter((usuario) => {
      const name =
        nombre.length > 0 &&
        usuario.nombre.toLowerCase().includes(nombre.toLowerCase())

      const surname =
        apellido.length > 0 &&
        usuario.apellido.toLowerCase().includes(apellido.toLowerCase())
      if (nombre && apellido) {
        return name && surname
      }
      return name || surname
    })
    setSugerencias(coincidencias)
    setSugerir(coincidencias.length > 0)
  }, [nombre, apellido, usuarios])

  const seleccionarUsuario = (usuario) => {
    setNombre(usuario.nombre)
    setApellido(usuario.apellido)
    setSugerir(false)

    if (onSelectUser) {
      onSelectUser({ nombre: usuario.nombre, apellido: usuario.apellido })
    }
  }

  const cambdestino = (e) => {
    setDestino(e.target.value)
    if (onDestinoCambio) {
      onDestinoCambio(e.target.value)
    }
  }

  return (
    <>
      <div className="solicitante">
        <h2>Solicitante</h2>
        <div className="inp-sol">
          <div>
            <h3>Nombre</h3>
          </div>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre"
          />
        </div>
        <div className="inp-sol">
          <div>
            <h3>Apellido</h3>
          </div>
          <input
            type="text"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            placeholder="Apellido"
          />
        </div>

        <div className="sugerencias">
          {sugerir && <h5>Sugerencias</h5>}
          {sugerir &&
            sugerencias.map((usuario) => (
              <button
                key={usuario.id_usuario}
                className="btn-solicitante"
                onClick={() => seleccionarUsuario(usuario)}
              >
                <div>
                  <div className="jrsx">
                    <p>
                      {usuario.nombre} {usuario.apellido}
                    </p>
                    <p className="curseddddd">
                      {usuario.curso ? `${usuario.curso}    ` : ""}
                      {usuario.especialidad ? `  ${usuario.especialidad}` : ""}
                    </p>
                  </div>
                </div>
              </button>
            ))}
        </div>
        <div className="inp-sol">
          <div>
            <h3>Destino</h3>
          </div>
          <input
            type="text"
            value={destino}
            onChange={cambdestino}
            placeholder="Destino"
          />
        </div>
      </div>
    </>
  )
}
