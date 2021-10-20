import React from "react";
import { useRef } from "react";
import SingleCar from "./SingleCar";
const CarList = (props) => {
  const inputEl = useRef("");
  const updateCarHandler = props.updateCarHandler;
  const carList = props.carList;

  const getCloseCar = (targetCoords) => {
    let coordList = carList.map((i) => {
      const phones = {
        driver: i.driver,
        plate: i.plate,
        coordsum: i.coordinatesNorth + i.coordinatesEast,
        phone: i.phone,
      };
      return phones;
    });
    coordList.sort(
      (a, b) =>
        Math.abs(targetCoords - a.coordsum) -
        Math.abs(targetCoords - b.coordsum)
    );
    const result = [coordList[1], coordList[2], coordList[3]];
    return result;
  };

  //sort function .sort((a, b) => b.favourite - a.favourite)
  /*   console.log(
    "carlistprops",
    props.carList
      .sort((a, b) => b.favourite - a.favourite)
      .map((props) => props.favourite)
  ); */

  const renderCarList = carList
    .sort((a, b) => b.favourite - a.favourite)
    .map((props) => (
      <SingleCar
        key={props.id}
        {...props}
        updateCarHandler={updateCarHandler}
        carList={carList}
        getCloseCar={getCloseCar}
      />
    ));

  const getSearchTerm = () => {
    props.searchKeyword(inputEl.current.value);
  };

  return (
    <div>
      <div className="searchbar__container">
        <input
          ref={inputEl}
          type="text"
          placeholder="Szukaj tablicy rejestracyjnej, lub kierowcy"
          value={props.term}
          onChange={getSearchTerm}
        />
      </div>
      <div className="carlist__container">
        {renderCarList.length > 0
          ? renderCarList
          : "Nie znaleziono kierowcy, lub numeru rejestracyjnego."}
      </div>
    </div>
  );
};

export default CarList;
