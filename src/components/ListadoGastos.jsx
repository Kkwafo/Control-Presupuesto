import React from 'react'
import Gasto from './Gasto'

const ListadoGastos = ({gasto, setGastoeditar, eliminarGasto, gastosFiltrados, filtro}) => {
  return (
    <div className="listado-gastos contenedor">
    
    {
      filtro ? (
        <>
        <h2>{gastosFiltrados.length ? "Gastos" : "No hay gastos en esta categoria"}</h2>
        { gastosFiltrados.map(gasto => (
          <Gasto
          key={gasto.id}
          gasto={gasto}
          setGastoeditar={setGastoeditar}
          eliminarGasto={eliminarGasto}
            />
           ))
          }
          </>
) 
           :
            (
      <>
      <h2>{gasto ? "Gastos" : "No hay gastos aun"}</h2>
     { gasto.map(gasto => (
        <Gasto
          key={gasto.id}
          gasto={gasto}
          setGastoeditar={setGastoeditar}
          eliminarGasto={eliminarGasto}
/>
))}
</>
    )
    }
  
    </div>
  )
}

export default ListadoGastos