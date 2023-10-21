import { Link } from "react-router-dom";
import styles from "./Carousel.module.scss";
import { useCarousels } from "../contexts/CarouselsContext";

// import Carousel1 from "../images/carousels/carousel-1.svg";

function Carousel() {
  const { content } = useCarousels();
  return (
    <div className={styles["carouselsContainer"]}>
      {content.map((contentSlide, index) => (
        <Slide index={index} content={contentSlide} key={contentSlide.id} />
      ))}
    </div>
  );
}

export default Carousel;

/////////////////////////////////////////

function Slide({ content, index }) {
  const { img, title, description, btnText } = content;
  const { curSlide, handleClickLeft, handleClickRight } = useCarousels();

  return (
    <div
      className={`${styles["carouselSlider"]} ${
        index === curSlide ? styles["slide--active"] : styles["slide--inactive"]
      }`}
      style={{
        transform: `translateX(${
          index <= curSlide
            ? 130 * (index - curSlide) + 50
            : 130 * (index - curSlide) + 70
        }%)`,
      }}
    >
      <div className={styles["slide"]}>
        {/* <Carousel1 /> */}
        <img
          src={img}
          alt="carousel picture"
          className={styles["slide__img"]}
        />
        <div className={styles["content__container"]}>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </div>
      <Link to="/login" className={styles["btn--start"]}>
        {btnText}
      </Link>

      {/* ///////////////////////////////// */}

      {curSlide === index && curSlide > 0 && (
        <button
          onClick={() => handleClickLeft()}
          className={`${styles["btn__control"]} ${styles["btn__control--left"]}`}
        >
          &larr;
        </button>
      )}

      {curSlide === index && curSlide < 4 && (
        <button
          onClick={() => handleClickRight()}
          className={`${styles["btn__control"]} ${styles["btn__control--right"]}`}
        >
          &rarr;
        </button>
      )}
    </div>
  );
}
