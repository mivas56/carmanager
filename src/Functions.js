// Generowanie losowej tablicy rejestracyjnej
export const createPlate = () => {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  for (let i = 0; i < 3; i++) {
    result += characters.charAt(Math.floor(Math.random() * 26));
  }
  for (let i = 0; i < 3; i++) {
    result += numbers.charAt(Math.floor(Math.random() * 10));
  }

  return result;
};

// Generowanie losowego numeru telefonu
export const createPhone = () => {
  let result = "";
  const numbers = "0123456789";
  for (let i = 0; i < 9; i++) {
    result += numbers.charAt(Math.floor(Math.random() * 10));
  }
  return result.match(/.{1,3}/g).join(" ");
};

// Generowanie losowego numeru w wybranym przedziale, użyte do ustalenia prędkości, współrzędnych
export const randomNumRange = (from, to, fixed) => {
  return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
  // .toFixed() returns string, so ' * 1' is a trick to convert to number
};

//Wybranie kierunku poruszania się pojazdu
export const randomDirection = () => {
  let result = "";
  const dir = "NESW";
  for (let i = 0; i < 1; i++) {
    result += dir.charAt(Math.floor(Math.random() * 4));
  }
  return result;
};

//Generowanie obiektu Car
export const Car = (
  id,
  plate,
  driver,
  phone,
  coordinatesNorth,
  coordinatesEast,
  direction,
  speed,
  favourite
) => {
  return {
    id,
    plate,
    driver,
    phone,
    coordinatesNorth,
    coordinatesEast,
    direction,
    speed,
    favourite,
  };
};
