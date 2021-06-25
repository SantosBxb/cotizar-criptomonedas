import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import useMoneda from "../hooks/useMoneda";
import useCriptomoneda from '../hooks/useCriptomonedas';
import Error from './Error';
import axios from "axios";
import useCantidad from "../hooks/useCantidad";

const Boton = styled.input`
  margin-top: 20px;
  font-weight: bold;
  font-size: 20px;
  padding: 10px;
  background-color: #66a2fe;
  width: 100%auto;
  border-radius: 10px;
  color: #fff;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #326ac0;
    cursor: pointer;
  }
`;

const Formulario = ({setCriptomoneda, setMoneda, setCantidad}) => {
  //state listado de cripto
  const [listadoCripto, setCriptomonedas] = useState([]);
  //state error
  const [error, setError] = useState(false);

  const MONEDAS =[
    {codigo:'USD', nombre:'Dolar Estados Unidos'},
    {codigo:'MXN', nombre:'Peso Mexicano'},
    {codigo:'EUR', nombre:'Euro'},
    {codigo:'CLP', nombre:'Peso Chileno'}
  ];
  //utilizar useMoneda, moneda, SelectMonedas esd lo que se mostrara en panmtalla(la interfaz) setState, lo que modifica el state de useMoneda, no es necesario poner este ultimo
  //el segundo debe comenzar con mayuscula, ya que se comporta como un componente
  const [moneda, SelectMonedas] = useMoneda('Elige tu Moneda', '', MONEDAS);

  const [criptomoneda, SelectCripto] = useCriptomoneda('Elige tu Criptomoneda', '', listadoCripto);

  const [cantidad, SelectCantidad] = useCantidad(1);

  //ejecutar llamado a la api
  useEffect(()=>{
    const consultarAPI = async () =>{
      const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
      const resultado = await axios.get(url);
      setCriptomonedas(resultado.data.Data);
    }
    consultarAPI();
  }, []);

  //cuando el usuario hace submit
  const cotizarMoneda = e =>{
    e.preventDefault();

    //validar
    if(moneda.trim()==='' || criptomoneda.trim()==='' || cantidad<=0){
      setError(true);
      return;
    }
    setError(false);

    //pasar los datos al componente principal
    setMoneda(moneda);
    setCriptomoneda(criptomoneda);
    setCantidad(cantidad);
    
  }

  return (
    <form 
      onSubmit={cotizarMoneda}
    >
    {error ? <Error mensaje='todos los campos son obligatorios'/>: null}
      <SelectMonedas/>
      <SelectCripto/>
      <SelectCantidad/>
      <Boton type="submit" value="Calcular" />
    </form>
  );
};

export default Formulario;
