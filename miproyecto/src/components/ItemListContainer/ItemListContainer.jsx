import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import style from "./item-list-container.module.css";
import Card from "../Card/Card";
import catalogo from "../../catalog";

const nameCategory = (category) => {
  switch (category) {
    case "toys":
      return "Juguetes";
    case "figures":
      return "Figuras";
    case "lithophanes":
      return "Litofanias";
    case "cutters":
      return "Cortantes";
    case "keychains":
      return "Llaveros";
    default:
      return null;
  }
};

const itemPromise = new Promise((response, reject) => {
  setTimeout(() => {
    catalogo.length > 0
      ? response(catalogo)
      : reject(new Error("No se encontraron items"));
  }, 1500);
});

const ItemListContainer = () => {
  const [items, setItems] = useState([]);
  const [filteredCatalog, setFilteredCatalog] = useState([]);

  const { categoryId } = useParams();
  useEffect(() => {
    itemPromise
      .then((items) => setItems(items))
      .catch((error) => {
        console.error("Error:", error.message);
      });
  }, []);

  const filterCatalog = (catalog) => {
    categoryId
      ? setFilteredCatalog(
          catalog.filter((item) => item.category.includes(categoryId))
        )
      : setFilteredCatalog(items);
  };

  useEffect(() => {
    filterCatalog(items);
  }, [categoryId, items]);

  return (
    <div className={style.store}>
      <h1 className={style.greeting}>
        {nameCategory(categoryId) || "¡Stiqi 3D Store!"}
      </h1>
      {filteredCatalog.length > 0 ? (
        <div className={style["item-list"]}>
          {filteredCatalog.map((item) => (
            <Card
              title={item.title}
              image={item.image}
              price={item.price}
              id={item.id}
              key={item.id}
            />
          ))}
        </div>
      ) : (
        <div className={style["spinner-screen"]}>
          <div className={style.spinner}></div>
          <p>Cargando...</p>
        </div>
      )}
    </div>
  );
};

export default ItemListContainer;