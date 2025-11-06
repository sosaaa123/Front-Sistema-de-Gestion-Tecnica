import { Routes, Route } from "react-router-dom"
import Login from "./general/Login/Login"
import Biblioteca from "./general/Zonas/Biblioteca/Biblioteca"
import Programacion from "./general/Zonas/Programacion/Programacion"
import Laboratorio from "./general/Zonas/Laboratorio/Laboratorio"
import Electromecanica from "./general/Zonas/Electromecanica/Electromecanica"
import Administracion from "./general/Zonas/Administracion/Administracion"
import ProtectedRoute from "./general/Login/utils/ProtectedRoute"

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/administracion"
        element={
          <ProtectedRoute element={<Administracion />} area="administracion" />
        }
      />
      <Route path="/programacion" element={<Programacion />} />
      <Route path="/laboratorio" element={<Laboratorio />} />
      <Route path="/electromecanica" element={<Electromecanica />} />
      <Route
        path="/biblioteca"
        element={<ProtectedRoute element={<Biblioteca />} area="biblioteca" />}
      />
    </Routes>
  )
}

export default App
