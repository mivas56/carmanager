import React, { useState, useEffect } from "react";
import FavoriteIcon from "@material-ui/icons/Favorite";

function SingleCar({
  id,
  plate,
  driver,
  phone,
  direction,
  coordinatesNorth,
  coordinatesEast,
  speed,
  favourite,
  updateCarHandler,
  getCloseCar,
}) {
  let [coordsN, setCoordsN] = useState(coordinatesNorth);
  const [fav, setFav] = useState(favourite);
  let [coordsE, setCoordsE] = useState(coordinatesEast);
  const [col, setCol] = useState("gray");
  const [phones, setPhones] = useState([]);
  const [showmore, setShowmore] = useState(false);

  const getPhones = () => {
    setPhones(getCloseCar(coordinatesNorth + coordinatesEast));
    setShowmore(!showmore);
  };
  // Wymiary Polski 649km Północ Południe (5.5000 stopni) 689km Wschód Zachód (10.0200 stopnia)
  // Północ Południe 1km - 0.00847stopnia, Wschód Zachód 1km - 0,01454 stopnia
  // Prędkość 1km/h = 1km/3600s,  1km/3s = 1/1200
  // Wzór (N-S): 1/1200 * prędkość pojazdu * 0,00847 = stopnie/3sekundy
  // Wzór (W-E): 1/1200 * prędkość pojazdu * 0,01454 = stopnie/3sekundy

  const changeCoords = () => {
    if (direction === "N") {
      setCoordsN((coordsN += (1 / 1200) * speed * 0.00847));
    }
    if (direction === "S") {
      setCoordsN((coordsN -= (1 / 1200) * speed * 0.00847));
    }
    if (direction === "E") {
      setCoordsE((coordsE += (1 / 1200) * speed * 0.01454));
    }
    if (direction === "W") {
      setCoordsE((coordsE -= (1 / 1200) * speed * 0.01454));
    }
  };

  const clickHandle = () => {
    setFav(!fav);
    updateCarHandler({
      id,
      plate,
      driver,
      phone,
      coordinatesNorth: coordsN,
      coordinatesEast: coordsE,
      direction,
      speed,
      favourite: !fav,
    });
  };
  // Zmiana współrzędnych co 3 sekundy (musiałem pominąć update danych, nie potrafiłem poradzić sobie z 20000 put requestami..)
  useEffect(() => {
    const intervalId = setInterval(changeCoords, 3000);
    return () => clearInterval(intervalId);
  }, [coordsN, coordsE]);

  useEffect(() => {
    if (fav === true) {
      setCol("red");
    }
    if (fav === false) {
      setCol("gray");
    }
  }, [fav]);

  return (
    <div className="singleCar__container">
      <img
        className="singleCar__image"
        src="https://picsum.photos/id/111/200/200"
        alt="https://picsum.photos/200/"
      />
      <div className="carinfo__container">
        <h3 className="singleCar__title">
          Numer rejestracyjny: <strong>{plate}</strong>
        </h3>

        {showmore ? (
          <div className="more__container">
            <p>Najbliższe pojazdy:</p>
            {phones.map((i) => (
              <div className="more__item" key={i.plate}>
                <p>
                  Numer rejestracyjny: <strong> {i.plate}</strong>,
                </p>
                <p>
                  Kierowca: <strong>{i.driver}</strong>,
                </p>
                <p>
                  Telefon kontaktowy: <strong>{i.phone}</strong>
                </p>
              </div>
            ))}
          </div>
        ) : null}
        <div className="singleCar__info">
          <p>
            Kierowca:<strong> {driver}</strong>
          </p>
          <p>
            Telefon kontaktowy: <strong>{phone}</strong>
          </p>
          <p>
            Współrzędne Geograficzne: {coordsN.toFixed(4)}
            <strong>N</strong> {coordsE.toFixed(4)}
            <strong>E</strong>
          </p>
          <p>
            Srednia prędkość<strong> {speed}</strong> km/h
          </p>
        </div>
      </div>
      <FavoriteIcon
        className="favourite__icon"
        style={{ color: col }}
        onClick={clickHandle}
      />
      <button className="more__btn" onClick={getPhones}>
        Więcej...
      </button>
    </div>
  );
}

export default SingleCar;
