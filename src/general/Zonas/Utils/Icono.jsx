export default function icono({ area, clase }) {
  return (
    <>
      <div>
        {area === "laboratorio" ? (
          <div className={clase}>
            <i class="fa-solid fa-gear"></i>
          </div>
        ) : (
          ""
        )}
        {area === "programacion" ? <i class="fa-solid fa-gear"></i> : ""}
        {area === "electromecanica" ? <i class="fa-solid fa-gear"></i> : ""}
        {area === "programacion" ? <i class="fa-solid fa-gear"></i> : ""}
      </div>
    </>
  )
}
