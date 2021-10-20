import React, { useState, useEffect } from "react";
import "./App.css";
import CarList from "./components/CarList";
import {
  createPlate,
  createPhone,
  randomNumRange,
  randomDirection,
  Car,
} from "./Functions";
import axios from "axios";
import api from "./api/cars";

function App() {
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [carList, setCarList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // Generowanie losowego kierowcy
  const getRandomName = () => {
    const randomName = userList[Math.floor(Math.random() * userList.length)];
    if (loading === false) {
      return randomName?.name.first + " " + randomName?.name.last;
    }
  };

  // Generowanie listy pojazdów
  const createCars = (n) => {
    let cars = Array(n);
    for (let i = 0; i < n; ++i) {
      cars[i] = Car(
        Math.floor(Math.random() * 100000) * 1000 + createPlate(),
        createPlate(),
        getRandomName(),
        createPhone(),
        randomNumRange(49, 54.5, 4),
        randomNumRange(14.07, 24.09, 4),
        randomDirection(),
        randomNumRange(60, 200, 0),
        false
      );
    }
    return cars;
  };

  //Pobieranie imion losowych kierowców
  useEffect(() => {
    axios
      .get("https://randomuser.me/api/?results=100&inc=name")
      .then((response) => {
        setUserList(response.data.results);
        setLoading(false);
      })
      .catch((err) => {
        console.error("error:", err);
      });
  }, []);

  // Funkcje serwerowe

  //Pobieranie pojazdów
  const retrieveCars = async () => {
    const response = await api.get("/cars");
    return response.data;
  };

  //Dodawanie pojazdów (musiałem pominąć automatyzacje dodawania samochodów do bazy danych, json-server radzi sobie z wstawianiem pojedyńczego obiektu, przy wstawianiu listy powstają problemy.)
  const addCarsToDB = async () => {
    await api.post("/cars", createCars(20000));
  };

  //Aktualizacja pojazdów
  const updateCarHandler = async (car) => {
    await api.put(`/cars/${car.id}`, car);
  };

  //Pobranie pojazdów z bazy danych i dodanie ich do state.
  useEffect(() => {
    const getAllCars = async () => {
      const allCars = await retrieveCars();
      if (allCars) setCarList(allCars);
    };
    getAllCars();
  }, []);

  //SEARCH
  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newCarList = carList.filter(({ plate, driver }) => {
        return Object.values({ plate, driver })
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResults(newCarList);
    } else {
      setSearchResults(carList);
    }
  };

  return (
    <div className="App">
      <CarList
        carList={searchTerm.length < 1 ? carList : searchResults}
        term={searchTerm}
        searchKeyword={searchHandler}
        updateCarHandler={updateCarHandler}
      />
    </div>
  );
}

export default App;
