interface Location {
  latitude: number;
  longitude: number;
}

interface Position {
  coords: Location
}

export function getPosition() {
  let currentPosition;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position: Position) => {
      currentPosition = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    });
  } else {
    throw Error("Geolocation is not supported by this browser.");
  }

  return currentPosition;
}

/** Not the ideal, but it's ok for now */
export function getMarkerIcon() {
  return `<svg height="42" viewBox="0 0 44 58" width="42" xmlns="http://www.w3.org/2000/svg"><g id="Page-1" fill="none" fill-rule="evenodd"><g id="035---Gay-Pride-Location" fill-rule="nonzero"><path id="Shape" d="m44 22c0 22-22 36-22 36s-22-14-22-36c0-12.1502645 9.8497355-22 22-22s22 9.8497355 22 22z" fill="#e64c3c"/><path id="Shape" d="m37.36 34.24c-4.9421974 1.7250797-10.126404 2.6566169-15.36 2.76-5.233596-.1033831-10.4178026-1.0349203-15.36-2.76 4 9.29 11.64 16 15.36 18.83 3.72-2.87 11.33-9.54 15.36-18.83z" fill="#c03a2b"/><path id="Shape" d="m40 22v4h-4v-4c0-7.7319865-6.2680135-14-14-14s-14 6.2680135-14 14v4h-4v-4c0-9.9411255 8.0588745-18 18-18s18 8.0588745 18 18z" fill="#f29c1f"/><path id="Shape" d="m36 22v4h-4v-4c0-5.5228475-4.4771525-10-10-10s-10 4.4771525-10 10v4h-4v-4c0-7.7319865 6.2680135-14 14-14s14 6.2680135 14 14z" fill="#f0c419"/><path id="Shape" d="m32 22v4h-4v-4c0-3.3137085-2.6862915-6-6-6s-6 2.6862915-6 6v4h-4v-4c0-5.5228475 4.4771525-10 10-10s10 4.4771525 10 10z" fill="#2fa8cc"/></g></g></svg>`;
}
