function generatePointsOnSphere(numPoints) {
    // Вычисляем количество пикселей на сфере, основываясь на количестве точек
    const numPixels = Math.ceil(numPoints / 6);
  
    // Вычисляем размер шестиугольного пикселя
    const pixelSize = 4 * Math.PI / (Math.sqrt(3) * numPixels * numPixels);
  
    // Создаем массив для хранения точек на сфере
    const points = [];
  
    for (let face = 0; face < 6; face++) {
      for (let i = 0; i < numPixels; i++) {
        for (let j = 0; j < numPixels; j++) {
          // Вычисляем координаты шестиугольника пикселя
          const pixelCoords = calculatePixelCoordinates(face, i, j, pixelSize);
  
          // Преобразуем координаты шестиугольника пикселя в сферические координаты
          const sphericalCoords = convertToSphericalCoordinates(pixelCoords);
          
          // Добавляем точку на сферу в массив точек
          points.push(sphericalCoords);
        }
      }
    }
  
    return points;
  
    function calculatePixelCoordinates(face, i, j, pixelSize) {
      // Вычисляем координаты пикселя в диапазоне от -1 до 1
      const x = (2 * i - numPixels + 1) * pixelSize;
      const y = (2 * j - numPixels + 1) * pixelSize;
    
      let pixelCoords;
    
      // Переходим от плоской проекции к сферическим координатам
      switch (face) {
        case 0: // front
          pixelCoords = [x, y, 1];
          break;
        case 1: // back
          pixelCoords = [-x, y, -1];
          break;
        case 2: // left
          pixelCoords = [-1, x, -y];
          break;
        case 3: // right
          pixelCoords = [1, x, y];
          break;
        case 4: // top
          pixelCoords = [x, 1, -y];
          break;
        case 5: // bottom
          pixelCoords = [x, -1, y];
          break;
      }
    
      return pixelCoords;
    }
}
  
  function convertToSphericalCoordinates(pixelCoords) {
    const [x, y, z] = pixelCoords;
  
    // Преобразуем прямоугольные координаты в сферические координаты
    const azimuthal = Math.atan2(y, x);
    const polar = Math.acos(z / Math.sqrt( x*x + y*y + z*z ));
    const rad = 1;

    const cx = rad * Math.sin(polar) * Math.cos(azimuthal);
    const cy = rad * Math.sin(polar) * Math.sin(azimuthal);
    const cz = rad * Math.cos(polar);
  
    // return [azimuthal, polar];
    return [cx,cy,cz];
  }
  
  // Пример использования
  // const numPoints = 1000;
  // const points = generatePointsOnSphere(numPoints);

  // console.log(points);