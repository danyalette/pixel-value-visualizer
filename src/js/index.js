import * as THREE from 'three';
import BasicThree from './basicthree';
import ImageReader from './imagereader';
import '../css/main.css';

window.addEventListener('load', initialize, false);

function initialize() {
  const images = ['/images/cat-bw.jpeg', '/images/mnist-o-light.png', '/images/moon.jpg', '/images/gauss-2d.png', '/images/gauss-3d.jpeg', '/images/tree.jpg'];
  let loadedCount = 0;

  images.forEach((image, index) => {
    const container = document.querySelector('#container-' + index);
    const basicThree = new BasicThree(container);
    const imageReader = new ImageReader();
    imageReader.loadImage(image)
      .then(() => {
        imageReader.mapOverPixels(addObjectToScene(basicThree.scene)(createBar));
        basicThree.render();
      })
      .catch(() => {
        console.warn('ImageReader: Error loading image ' + filename);
      })
      .then(() => {
        loadedCount++;
        if (loadedCount == images.length) {
          document.body.className = 'loaded';
        }
      });
  })
}

function addObjectToScene(scene) {
  return (fn) => {
    return (...args) => {
      let object = fn(...args);
      if (object) scene.add(object);
    }
  }
}

function createBar(x, y, color, [width, height]) {
  const barHeight = (255 - color[0])/20;
  const multiplier = 0.8;
  if (barHeight < 0.5) return;
  const bar = new THREE.Mesh(
    new THREE.CubeGeometry( multiplier, multiplier, barHeight),
    new THREE.MeshBasicMaterial(
      { color: new THREE.Color(...[].slice.call(color.subarray(0, 3)).map(
        (x) => x/255
      )) }
    )
  );
  bar.position.set((x - (width/2)) * multiplier, ((height/2) - y) * multiplier, -barHeight/2);
  return bar;
}