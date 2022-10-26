import { useState, useEffect } from 'react';
import Header from './components/Header'
import Modal from './components/Modal';
import Filtros from './components/Filtros';
import ListadoGastos from './components/ListadoGastos';
import { generarID, fechaNew } from './helpers';
import IconoNuevoGasto from "./img/nuevo-gasto.svg"




function App() {

const [presupuesto, setPresupuesto] = useState(
  Number(localStorage.getItem("presupuesto")) ?? 0
)
const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)

const [modal, setModal] = useState(false)
const [animarModal, setAnimarModal] = useState(false)

const [gastos, setGastos] = useState(
  localStorage.getItem("gastos") ? JSON.parse(localStorage.getItem("gastos")): []
);

const [gastoEditar, setGastoeditar] = useState([])

const [filtro, setFiltro] = useState("")
const [gastosFiltrados, setGastosFiltrados] = useState([])

useEffect(() => {
if(Object.keys(gastoEditar).length > 0 ){
  setModal(true)
  

  setTimeout(() => {
    setAnimarModal(true)
  }, 500);
}
}, [gastoEditar])

useEffect(() => {localStorage.setItem("presupuesto", presupuesto ?? 0)}, [presupuesto])
useEffect(() => {
  const presupuestoLS = Number(localStorage.getItem ("presupuesto")) ?? 0;
  if(presupuestoLS > 0) {
    setIsValidPresupuesto(true)
  }
}, [] )

useEffect(()=> {localStorage.setItem("gastos", JSON.stringify(gastos) ?? []);
}, [gastos])

useEffect(() => {
  if(filtro){
  // Filtrar gastos por categoria
  const gastoFiltrados = gastos.filter(gasto => gasto.categoria === filtro) 
  setGastosFiltrados(gastoFiltrados)
  }
}, [filtro])

const handleNuevoGasto = () => {
  setModal(true)
  setGastoeditar({})

  setTimeout(() => {
    setAnimarModal(true)
  }, 500);
}

const guardarGasto = gasto => {
  if(gasto.id){
const gastoActualizados = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState)
  setGastos(gastoActualizados)
  setGastoeditar({});
  }
  else {
    gasto.id = generarID();
    gasto.fecha = Date.now();
    setGastos([...gastos, gasto])
  }


  setAnimarModal(false)
  setTimeout(() => {
      setModal(false)
      
  }, 500);
}

const eliminarGasto = id => {
  const gastoActualizados = gastos.filter(gasto => gasto.id !== id)
  setGastos(gastoActualizados)
}

  return (
    <div className={modal ? "fijar" : ""} >
      <Header
        gastos={gastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
        setGastos={setGastos}
      />
      {isValidPresupuesto && (
        <>
<main>
<Filtros
filtro={filtro}
setFiltro={setFiltro}
          
        />
<ListadoGastos
  eliminarGasto = {eliminarGasto}
  gasto={gastos}
  gastoEditar={gastoEditar}
  setGastoeditar={setGastoeditar}
  gastosFiltrados={gastosFiltrados}
  filtro={filtro}

/>
</main>
        
        <div className="nuevo-gasto">
        <img src={IconoNuevoGasto}
         alt="IconoNuevoGasto" 
          onClick={handleNuevoGasto}
         />
      </div>
      </>
      )}
        {modal && <Modal 
          setModal={setModal}
          animarModal ={animarModal}
          setAnimarModal={setAnimarModal}
          guardarGasto={guardarGasto}
          gastoEditar={gastoEditar}
          setGastoeditar={setGastoeditar}
        />}
      </div>
  )
}

export default App
