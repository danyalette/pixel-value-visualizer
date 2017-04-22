export default class ImageReader {

  loadImage(filename) {
    return new Promise(
      ( resolve, reject ) => {
        const img = document.createElement('img');

        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const context = canvas.getContext('2d')
          context.drawImage(img, 0, 0, img.width, img.height);
          this.canvas = canvas;
          this.context = context;
          resolve();
        }

        img.onerror = () => reject();

        img.src = filename;
      }
    );
  }

  mapOverPixels(fn) {
    const [width, height] = this.getDimensions();
    for (let x = 0; x < width; x++ ) {
      for (let y = 0; y < height; y++ ) {
        fn( x, y, this.getPixelData(x, y), [width, height]);
      }
    }
  }

  getPixelData(x, y) {
    return this.context.getImageData(x, y, 1, 1).data;
  }

  getDimensions() {
    return [
      this.canvas.width,
      this.canvas.height
    ]
  }

}