import { useState } from "react"
import { jwtDecode } from "jwt-decode"
import { useNavigate } from "react-router-dom"
import "./login.css"
function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()

    fetch("http://127.0.0.1:8000/usuarios/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Credenciales incorrectas")
        return res.json()
      })
      .then((data) => {
        const token = data.data.access_token
        const decoded = jwtDecode(token)
        const areas = decoded.areas
        const num = areas.length
        console.log(areas)
        console.log("Payload:", decoded)
        console.log(data)
        localStorage.setItem("token", token)

        if (areas.length > 1) {
          navigate("/administracion")
        } else {
          navigate(`/${areas[0]}`)
        }
      })
      .catch((err) => {
        console.error(err)
        alert(err.message)
      })
  }

  return (
    <>
      <section className="login">
        <div className="pant hijo">
          <h1>Escuela de Educacion Tecnica N1</h1>
          <h2>Jose Ing. Rafael Canton</h2>
        </div>
        <div className="hijo log">
          <form className="form" onSubmit={handleSubmit}>
            <div className="user">
              <div className="icono">
                <i class="fa-solid fa-user"></i>
              </div>
            </div>
            <div className="frm-div">
              <div className="form-div">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                />
              </div>

              <div className="form-div">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Contraseña"
                  required
                />
              </div>
              <div className="button-div">
                <button type="submit" className="enviar">
                  Iniciar sesión
                </button>
              </div>
            </div>
            <p>EESTN1</p>
          </form>
        </div>
      </section>
    </>
  )
}

export default Login
