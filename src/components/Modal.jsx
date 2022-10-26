import {useState, useEffect} from "react"
import Mensaje from "./Mensaje"
import CerrarBtn from "../img/cerrar.svg"

const Modal = ({setModal, animarModal, setAnimarModal, guardarGasto, gastoEditar, setGastoeditar}) => {

    const [mensaje, setMensaje] = useState("");
    const [nombre, setNombre] = useState("");
    const [cantidad, setCantidad] = useState("");
    const [categoria , setCategoria] = useState("");
    const [id, setId] = useState("");
    const [fecha, setFecha] = useState("");

    useEffect(() => {  
        setNombre(gastoEditar.nombre)
        setCantidad(gastoEditar.cantidad)
        setCategoria(gastoEditar.categoria)
        setId(gastoEditar.id)
        setFecha(gastoEditar.fecha)
}, []);


    const ocultarModal= () => {
        setAnimarModal(false)
        setGastoeditar({})
        setTimeout(() => {
            setModal(false)
            
        }, 500);
    };

    const handleSubmit = e => {
        e.preventDefault();
    
    if([nombre, cantidad, categoria].includes("")){
        setMensaje("Todos los campos son obligatorios")
        setTimeout(() => {
            setMensaje("")
        }, 3000);
        return;
    }
    guardarGasto({nombre, cantidad, categoria, id, fecha})

}
const handleNombre = e => {setNombre(e.target.value)}
const handleCantidad = e => {setCantidad(Number(e.target.value))}
const handleCategoria = e => {setCategoria(e.target.value)}
  return (
    <div className="modal"> 
    <div className="cerrar-modal">
    <img 
        src={CerrarBtn}
        alt="Cerrar modal"
        onClick={ocultarModal}
    />
    </div>

    <form 
    onSubmit={handleSubmit}
    className={`formulario ${animarModal ? "animar" : "cerrar" }`}>
    <legend>{gastoEditar.nombre ? "Editar Gasto" : "Nuevo Gasto"}</legend>
    {mensaje && <Mensaje tipo={"error"}>{mensaje} </Mensaje>}
<div className="campo">
    <label htmlFor="nombre">Nombre</label>
        <input
        id="nombre"
        type="text"
        placeholder="Añade el Nombre del Gasto"
        value={nombre}
        onChange={handleNombre}
        >
        </input>
</div>
<div className="campo">
    <label htmlFor="cantidad">Cantidad</label>
        <input
        id="cantidad"
        type="number"
        placeholder="Añade el Nombre del gasto"
        value={cantidad}
        onChange={handleCantidad}>
        </input>
</div>

<div className="campo" >
    <label htmlFor="categoria">Categoria</label>
<select 
id="categoria"
value={categoria}
onChange= {handleCategoria}>
    <option value=""> -- Seleccione --</option>
    <option value="ahorro">Ahorro</option>
    <option value="comida">Comida</option>
    <option value="casa">Casa</option>
    <option value="gastos">Gastos Varios</option>
    <option value="ocio">Ocio</option>
    <option value="salud">Salud</option>
    <option value="subscripciones">Subscripciones</option>
</select>
</div>
<input 
type="submit"
value={gastoEditar.nombre ? "Guardar Cambios" : "Añadir Gasto"}

/>
    </form>
    </div>
  )
}

export default Modal