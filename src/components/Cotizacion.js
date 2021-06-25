import React from 'react';
import styled from '@emotion/styled';

const ResultadoDiv = styled.div`
  color: #fff;
  font-family:Arial, Helvetica, sans-serif;

`;

const Info = styled.p`
  font-size: 1.2rem;
  span{
    font-weight: bold;
  }
`;

const Precio = styled.p`
  font-size: 2.5rem;
  span{
    font-weight: bold;
  }
`;

const Cotizacion = ({resultado, cantidad, criptomoneda}) => {
  //const totalCantidad = parseFloat(resultado.PRICE.replace(/[$,]/g, "")) * parseFloat(cantidad);
  //<Info>{cantidad} {criptomoneda} equivalen a: <span>$ {}</span></Info>
  if(Object.keys(resultado).length===0)return null;
  return (  
    <ResultadoDiv>
      <Precio>El precio es: <span>{resultado.PRICE}</span></Precio>
      <Info>Precio mas alto del dia: <span>{resultado.HIGHDAY}</span></Info>
      <Info>Precio mas bajo del dia: <span>{resultado.LOWDAY}</span></Info>
      <Info>Variacion ultimas 24 horas: <span>{resultado.CHANGEPCT24HOUR}</span></Info>
      <Info>Ultima actualizacion: <span>{resultado.LASTUPDATE}</span></Info>
    </ResultadoDiv>
  );
}
 
export default Cotizacion;