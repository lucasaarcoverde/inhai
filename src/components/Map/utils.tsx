interface Location {
  lat: number;
  lon: number;
}
export function getLocation(positionCallback: (position: Position) => void) {
  let test;
  if (navigator.geolocation) {
    test = navigator.geolocation.getCurrentPosition(positionCallback);
  } else {
    throw Error("Geolocation is not supported by this browser.");
  }

  console.log(test);
}
