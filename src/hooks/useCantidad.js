import React, { Fragment, useState } from "react";
import styled from "@emotion/styled";

const Label = styled.label`
  font-family: "Bebas Neue", cursive;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 2.4rem;
  margin-top: 2rem;
  display: block;
`;
const Input = styled.input`
  width: 95%;
  display: block;
  padding: 1rem;
  --webkit-appearance: none;
  border-radius: 10px;
  border: none;
  font-size: 1.2rem;
`;

const useCantidad = (valorInicial) => {
  //state
  const [state, setState] = useState(1);

  //fn que devuelve interfaz
  const SetCantidad = () => (
    <Fragment>
      <Label>Cantidad a cotizar</Label>
      <Input
        type="number"
        value={state}
        onChange={((e) => setState(e.target.value))}></Input>
    </Fragment>
  );

  //return del hook
  return [state, SetCantidad, setState];
};

export default useCantidad;
