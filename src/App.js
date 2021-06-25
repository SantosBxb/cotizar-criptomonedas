import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import imagen from "./cryptomonedas.png";
import Formulario from "./components/Formulario";
import axios from "axios";
import Cotizacion from "./components/Cotizacion";
import Spinner from "./components/Spinner";

const Contenedor = styled.div`
  max-width: 100vw;
  margin: 0 auto;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;
const Imagen = styled.img`
  max-width: 100%;
  max-height: 80vh;
  margin-top: 4rem;
`;
const Heading = styled.h1`
  font-family: "Bebas Neue", cursive;
  color: #fff;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;

  &::after {
    content: "";
    width: 100;
    height: 6px;
    background-color: #66a2fe;
    display: block;
  }
`;

function App() {
  //state
  const [moneda, setMoneda] = useState("");
  const [criptomoneda, setCriptomoneda] = useState("");
  const [resultado, setResultado] = useState({});
  const [cantidad, setCantidad] = useState(1);
  //mostar spinner cargando
  const [cargando, setCargando] = useState(false);

  //useEffect
  useEffect(() => {
    //debe ser una fn async ya que se usara await para pedir los datos
    const cotizarCripto = async () => {
      //evitar que se ejecute la primera vez que se carga
      if (moneda === "") return;

      //consultar api para cotizacion
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
      const resultado = await axios.get(url); //recibe los datos en un array

      //mostar spinner
      setCargando(true);

      //ocultarel spinner y mostar resultado
      setTimeout(() => {
        //cambiar state de cargando para que deje de mostrar spinner
        setCargando(false);

        setResultado(resultado.data.DISPLAY[criptomoneda][moneda]);
      }, 3000);
    };
    cotizarCripto();
  }, [moneda, criptomoneda]);

  return (
    <Contenedor>
      <div>
        <Imagen src={imagen} alt="imagen crypto" />
      </div>
      <div>
        <Heading>Cotiza criptomonedas al instante</Heading>
        <Formulario
          setCriptomoneda={setCriptomoneda}
          setMoneda={setMoneda}
          setCantidad={setCantidad}
        />
        {cargando ? (
          <Spinner />
        ) : (
          <Cotizacion
            resultado={resultado}
            cantidad={cantidad}
            criptomoneda={criptomoneda}
          />
        )}
      </div>
    </Contenedor>
  );
}

export default App;
