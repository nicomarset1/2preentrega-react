import { useState } from "react";
import style from "./item-counter.module.css";

const ItemCounter = ({ price }) => {
  const [counter, setCounter] = useState(1);

  const handleRestar = () => {
    counter > 1 && setCounter(counter - 1);
  };

  const handleSumar = () => {
    setCounter(counter + 1);
  };

  return (
    <div>
      <span style={{ fontSize: "1.5em", margin: "1em" }}>
        ${price * counter}
      </span>
      <div className={style["container-counter"]}>
        <button className={style.boton} onClick={handleRestar}>
          -
        </button>
        <p className={style.counter}>{counter}</p>
        <button className={style.boton} onClick={handleSumar}>
          +
        </button>
      </div>
      <button className={style.aniadir}>Añadir al Carrito</button>
    </div>
  );
};

export default ItemCounter;