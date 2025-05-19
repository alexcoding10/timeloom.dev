type Position = { lat: number, lon: number };

export const getPosition = (): Promise<Position | null> => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        resolve({ lat: latitude, lon: longitude }); // Resolvemos la promesa con las coordenadas
      },
      (error) => {
        console.error("Error al obtener la ubicación:", error.message);
        reject(null); // Rechazamos la promesa en caso de error
      }
    );
  });
};

export const getLocation = async () =>{
    return await getPosition()
}