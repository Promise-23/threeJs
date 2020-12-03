<template>
  <div id="container"></div>
</template>
<script>
// import { WEBGL } from "three/examples/jsm/WebGL";
import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
export default {
  data() {
    return {
      scene: new THREE.Scene(),
      camera: undefined,
      renderer: undefined,
      cube:null
    };
  },
  methods: {
    createScence(){
      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

      this.renderer = new THREE.WebGLRenderer()
      this.renderer.setSize( window.innerWidth, window.innerHeight );
      document.body.appendChild( this.renderer.domElement );
      this.camera.position.z = 5;
    },
    createBox(){
      let geometry = new THREE.BoxGeometry( 1, 1, 1 );
      //create a blue LineBasicMaterial
      let material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
      this.cube = new THREE.Mesh( geometry, material );
      this.scene.add( this.cube );
    },
    createLine(){
      //create a blue LineBasicMaterial
      let material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
      let geometry = new THREE.Geometry();
      geometry.vertices.push(new THREE.Vector3( -10, 0, 0) );
      geometry.vertices.push(new THREE.Vector3( 0, 10, 0) );
      geometry.vertices.push(new THREE.Vector3( 10, 0, 0) );
      let line = new THREE.Line( geometry, material );
      this.scene.add( line );
    },
    createText(){
      let loader = new THREE.FontLoader();
      loader.load( 'fonts/helvetiker_regular.typeface.json', function ( font ) {
        // eslint-disable-next-line
        let geometry = new THREE.TextGeometry( "Hello three.js!", {
          font: font,
          size: 80,
          height: 5,
          curveSegments: 12,
          bevelEnabled: true,
          bevelThickness: 10,
          bevelSize: 8,
          bevelSegments: 5
        } );
      } );
    },
    textGeometry(){
      var MAX_POINTS = 500;

      // geometry
      var geometry = new THREE.BufferGeometry();

      // attributes
      var positions = new Float32Array( MAX_POINTS * 3 ); // 3 vertices per point
      geometry.setAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );

      // draw range
      var drawCount = 2; // draw the first 2 points, only
      geometry.setDrawRange( 0, drawCount );

      // material
      var material = new THREE.LineBasicMaterial( { color: 0xff0000 } );

      // line
      var line = new THREE.Line( geometry,  material );
      this.addPoints(line,MAX_POINTS);
    },
    addPoints(line,num){
      var positions = line.geometry.attributes.position.array;
      var x, y, z, index;
      x = y = z = index = 0;

      for ( var i = 0, l = num; i < l; i ++ ) {

          positions[ index ++ ] = x;
          positions[ index ++ ] = y;
          positions[ index ++ ] = z;

          x += ( Math.random() - 0.5 ) * 30;
          y += ( Math.random() - 0.5 ) * 30;
          z += ( Math.random() - 0.5 ) * 30;
      }
      line.geometry.attributes.position.needsUpdate = true; // 需要加在第一次渲染之后
      // this.render()
      this.scene.add( line );
    },
    animate(){
      // requestAnimationFrame( this.animate );
      this.render()
    },
    render(){
      // this.cube.rotation.x += 0.01;
      // this.cube.rotation.y += 0.01;
      this.renderer.render( this.scene, this.camera );
    }
  },
  mounted() {
    this.createScence();
    // this.createBox();
    // this.createLine();
    // this.createText();
    this.textGeometry();
    // this.animate()
    this.render()
  },
};
</script>
<style scoped>

</style>