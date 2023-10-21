import styles from "./item-detail-container.module.css";
import catalogo from "../../catalog";
import ItemCounter from "../ItemCounter/ItemCounter";
import { Link, useParams } from "react-router-dom";

const ItemDetailContainer = () => {
  const { id } = useParams();

  // Lo hice de esta forma para asegurarme de que si el usuario ingresa por url
  // un id de un item que no existe, renderize "objeto no encontrado"
  // es importante que lo chequee de esta forma, ya que si el caso es que no existe el id
  // el filtro que hago para recuperar las propiedades de el item se rompe y la página no funciona

  const createDetail = () => {
    if (catalogo.some((item) => item.id == id)) {
      const { title, image, price, size } = catalogo.filter(
        (i) => i.id == id
      )[0];
      return (
        <div className={styles.container}>
          <h2 className={styles.title}>{title}</h2>
          <div className={styles.info}>
            <div className={styles["image-container"]}>
              <img src={image} alt={title} className={styles.image} />
            </div>
            <div className={styles.cta}>
              <div className={styles.description}>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Mollitia earum delectus corporis neque consectetur enim nisi.
                  Molestiae voluptate voluptatum totam modi sint libero,
                  incidunt laudantium alias reiciendis voluptatem aperiam sed.
                  Ab commodi nam voluptate ullam, sapiente reprehenderit quae
                  nihil dolor quidem neque omnis aliquam culpa magnam? Delectus
                  quae necessitatibus magni aperiam voluptate totam praesentium
                  rem. Voluptas est illo atque maiores.
                </p>
              </div>
              <ul className={styles.list}>
                <li>Tamaño: {size}</li>
                <li>Precio unitario: ${price}</li>
              </ul>
              <div>
                <ItemCounter price={price} />
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className={styles.container}>
          <h2 className={styles.title}>Objeto no encontrado</h2>
          <Link to={"/store"} className={styles.back}>
            Ir a la tienda
          </Link>
        </div>
      );
    }
  };

  return createDetail();
};

export default ItemDetailContainer;