import * as THREE from 'three';
import OrbitControls from 'orbit-controls-es6';

export default class BasicThree {

  constructor(container) {
    this.container = container;
    [ this.width, this.height ] = this.getSize();
    this.createScene();
    this.createCamera();
    this.createLight();
    this.createRenderer();
    this.createControls();

    // resize
    window.addEventListener( 'resize', this.updateSize.bind(this), false );
    window.addEventListener('load', this.updateSize.bind(this), false);
  }

  createScene(fogColor = 0xffffff, fogPosition = [90, 125]) {
    this.scene = new THREE.Scene;
    this.scene.fog=new THREE.Fog( fogColor, ...fogPosition );
  }

  createCamera(fov = 45, nearPlane = 0.1, farPlane = 10000, position = [0, 0, 70]) {
    this.camera = new THREE.PerspectiveCamera(fov, this.width / this.height, nearPlane, farPlane);
    this.camera.position.set(...position);
    this.camera.lookAt({x:0, y:0, z:0});
    this.scene.add(this.camera);
  }

  createLight(color = 0xFFFFFF, position = [10, 50, 130]) {
    const light = new THREE.PointLight(color);
    light.position.set(...position);
    this.scene.add(light);
  }

  createRenderer(opts = { alpha: true, antialias: true }) {
    this.renderer = new THREE.WebGLRenderer(opts);
    this.container.appendChild(this.renderer.domElement);
    this.updateSize();
  }

  createControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enabled = true;
    this.controls.addEventListener( 'change', this.render.bind(this) );
  }

  getSize() {
    return [
      this.container.clientWidth * 2,
      this.container.clientHeight * 2
    ]
  }

  updateSize(){
      let [ width, height ] = this.getSize();
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize( width, height );
      // retina fix
      this.renderer.domElement.style["max-width"] = width/2 + 'px';
      this.renderer.domElement.style["max-height"] = height/2 + 'px';

      [this.width, this.height] = [width, height];
      this.renderer.render( this.scene, this.camera );
  }

  render() {
    this.renderer.render(this.scene, this.camera)
  }
}
