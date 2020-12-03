<template>
  <div class="gallery" id="container">
      <video id="video" muted autoplay loop controls >
        <source src="/video/sintel.ogv" type='video/ogg; codecs="theora, vorbis"'>
        <source src="/video/sintel.mp4" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'>
      </video>
  </div>
</template>
<script>
import { WEBGL } from "three/examples/jsm/WebGL";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
export default {
  data() {
    return {
      scene: new THREE.Scene(),
      camera: undefined,
      renderer: undefined,
      controls: undefined,
      group: undefined,
      groupAnimation: true,
      texture: undefined,
      imgUrlArr: ['img/0.jpg','img/1.jpg','img/2.jpg','img/3.jpg','img/4.jpg','img/5.jpg',
                  'img/6.jpg','img/7.jpg','img/8.jpg','img/9.jpg','img/10.jpg'],
      clock: new THREE.Clock(),
      pausedTime: 5000, //停留时长
    };
  },
  methods: {
    init() {
      // let renderer, camera, scene, group;
      if (WEBGL.isWebGL2Available()) {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("webgl2", { alpha: false });
        this.renderer = new THREE.WebGLRenderer({
          canvas,
          context,
          antialias: true,
        });
      } else {
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
      }
      // this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(
        this.container.clientWidth,
        this.container.clientHeight
      );
      this.container.appendChild(this.renderer.domElement);
      this.scene = new THREE.Scene();
      var texture = new THREE.TextureLoader().load( "img/background3.jpg" );
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set( 1, 1 );
      // this.scene.background = new THREE.Color(0x071f6f); // 0x071f6f
      this.scene.background = texture;
      this.group = new THREE.Group();
      this.group.position.y = 50;
      this.scene.add(this.group);
      this.loadImgs();
      this.initCamera();
      this.initControls();
      this.addCircleDRN();
      this.setLight();
      // // this.group.rotateX((Math.PI / 180) * -90);
      // this.loopAnimation(); //拉近
      this.animate();
    },
    setLight() {
      let ambientLight = new THREE.AmbientLight(0xffffff); // 环境光
      this.scene.add(ambientLight);
      this.controls.update();
    },
    addShapeDRN(shape, extrudeSettings, color, x, y, z, rx, ry, rz, s) {
      // const shapeGeometry = new THREE.ShapeBufferGeometry(shape);
      // const shapeMesh = new THREE.Mesh(
      //   shapeGeometry,
      //   new THREE.MeshPhongMaterial({
      //     side: THREE.BackSide, //FrontSide  BackSide  DoubleSide
      //     map: this.texture,
      //   })
      // );
      // shapeMesh.position.set(x, y, z - 175);
      // shapeMesh.rotation.set(rx, ry, rz);
      // shapeMesh.scale.set(s, s, s);
      // this.group.add(shapeMesh);
      // let lastMesh;
      let _this = this;
      const meshCount = 11;

      const extrudeGeometry = new THREE.ExtrudeBufferGeometry(
        shape,
        extrudeSettings
      );
      for (let i = 0; i < meshCount; i++) {
        let mesh;
        let material = new THREE.MeshPhongMaterial({
          // color: color,
          opacity: 0.8,
          // transparent: true,
          map: _this['texture'+i]
        });
        // extrudeGeometry.id = '';
        // if (i === 0) {
          mesh = new THREE.Mesh(extrudeGeometry, material);
          mesh.position.set(x, y, z - 75);
          mesh.rotation.set(rx, ry, rz);
          mesh.scale.set(s, s, s);
        // } else {
          // mesh = lastMesh.clone();
          mesh.rotateZ((Math.PI * 2) / meshCount * i);
        // }
        this.group.add(mesh);
        // lastMesh = mesh;
      }
      console.log(this.group)
    },
    addCircleDRN() {
      const arcShapeDrn1 = new THREE.Shape();
      arcShapeDrn1.moveTo(510, 0);
      arcShapeDrn1.lineTo(520, 0);
      arcShapeDrn1.absarc(0, 0, 520, 0, ((Math.PI * 2) / 6 / 6) * 3, false);
      arcShapeDrn1.absarc(0, 0, 510, ((Math.PI * 2) / 6 / 6) * 3, 0, true);
      const arcShapeDrn2 = arcShapeDrn1;

      const extrudeSettings = {
        depth: 300,
        bevelEnabled: false,
        bevelSegments: 9,
        steps: 2,
        bevelSize: 0,
        bevelThickness: 0,
      };
      this.addShapeDRN(
        arcShapeDrn2,
        extrudeSettings,
        0xffffff, // 0x6188d2
        0,
        0,
        0,
        0,
        0,
        0,
        1
      );
    },
    initCamera() {
      this.camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        1,
        2000
      );
      // this.camera.up.y = 1
      this.camera.position.set(0, 450, 130);
      this.camera.lookAt(new THREE.Vector3(0, 450, 150));
      // this.camera = new THREE.OrthographicCamera(
      //   window.innerWidth / -2,
      //   window.innerWidth / 2,
      //   window.innerHeight / 2,
      //   window.innerHeight / -2,
      //   1,
      //   2000
      // );
      const light = new THREE.PointLight(0xffffff, 0.8);
      // light.position.set(50,600,50);
      this.camera.add(light);
      this.scene.add(this.camera);
      window["camera"] = this.camera;
    },
    initControls() {
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    },
    render() {
      if(this.groupAnimation){
        this.group.rotateZ(Math.PI / 3600); //360
      }
      this.renderer.render(this.scene, this.camera);
    },
    animate() {
      // this.showName();
      requestAnimationFrame(this.animate);
      this.render();
      this.controls.update();
      // this.mixer.update(this.clock.getDelta()); //更新每一帧的混合器  拉近
    },
    //加载图片及vedio资源
    loadImgs(){
      let _this = this;
      const loader = new THREE.TextureLoader();
      this.imgUrlArr.forEach((url,i)=>{
        if([1,3,5,7,9].includes(i)){
          //获取到video对象
          let video = document.querySelector("#video");
          //通过video对象实例化纹理
          _this['texture'+i] = new THREE.VideoTexture(video);
          _this['texture'+i].wrapS = _this['texture'+i].wrapT = THREE.RepeatWrapping; // RepeatWrapping
          _this['texture'+i].repeat.set(0.0038, 0.0033); //0.0038, 0.0033
          _this['texture'+i].needsUpdate = true
          // _this['texture'+i].wrapS = _this['texture'+i].wrapT = THREE.ClampToEdgeWrapping;
          // _this['texture'+i].minFilter = THREE.LinearFilter;
        }else{
          _this['texture'+i] = loader.load(url);
          _this['texture'+i].wrapS = _this['texture'+i].wrapT = THREE.RepeatWrapping; // RepeatWrapping
          _this['texture'+i].repeat.set(0.0038, 0.0033); //0.008
          _this['texture'+i].needsUpdate = true
        }
      })
    },
    //keyframeTrack帧动画
    keyframeTrack(mesh,values){
      let _this = this;
      // let obj = this.group.children[7].clone();
      let times = [0,10]; //离散的时间序列
      // let values = [0,0,-75,160, 600, -120]; //过渡的值
      //创建帧动画对象，使几何体在规定时间内移动到[100,0,0]的位置
      let posKeyframeTrack = new THREE.KeyframeTrack('box.position',times,values);
      //剪辑keyframeTrack对象
      let duration = 10;
      let clip = new THREE.AnimationClip('boxAnimation',duration,[posKeyframeTrack]);
      // clip.duration = clip.time = 10
      //通过混合器获取AnimationAction对象，进一步对动画进行控制
      // console.log(obj)
      this.mixer = new THREE.AnimationMixer(mesh);
      //设置回调函数
      this.mixer.addEventListener( 'loop', function() {  //finished
        action.paused = true
        _this.groupAnimation = false
        setTimeout(()=>{
          action.paused = false
          _this.groupAnimation = true
        },_this.pausedTime)
      } )
      let action = this.mixer.clipAction(clip);
      //调节播放速度 默认为1
      action.timeScale = 3;
      /** 开始播放 setLoop()设置循环模式和次数，play()播放动画 */
      action.setLoop(THREE.LoopPingPong,2).play();
      /** 不循环播放 */
      // action.clampWhenFinished = true
      // action.play()
      // action.clampWhenFinished = true
    },
    /** 设置定时器循环调用 keyframeTrack 方法 */
    loopAnimation(){
      let _this = this,timerId,
          // values = [0,0,-75,160, 600, -120],
          // values = [0,0,-75,160, 700, -120],
          keysArr = Object.keys(_this.group.children),
          // rotation = _this.group.children[7].rotation.z,
          // alpha = Math.abs(rotation)>Math.PI/2?(Math.PI-Math.abs(rotation)):Math.abs(rotation),
          //通过正弦求出外接圆半径
          // r = 160/Math.sin(alpha) * Math.tan(alpha); 
          r = 600;
      animation();
      function animation(){
        let mesh = _this.group.children[keysArr[7]],
            angle = mesh.rotation.z,
            alpha = Math.abs(angle)>Math.PI/2?(Math.PI-Math.abs(angle)):Math.abs(angle);
        //根据余弦定理和勾股定理求出x,y的值
        let y = r * Math.sin(alpha),
            x = r * Math.cos(alpha);
        //通过角度判断正负
        y = angle>0?-y:y;
        x = Math.abs(angle)>Math.PI/2?x:-x 
        let values = [0,0,-75,x, y, -100];
        _this.keyframeTrack(mesh,values);
        // mesh.rotateZ(Math.PI/3)
        let key = keysArr.pop();
        keysArr.unshift(key);
        clearTimeout(timerId)
        timerId = setTimeout(animation, 15000);
      }
    }
  },
  mounted() {
    this.init();
  },
  computed: {
    container() {
      return document.getElementById("container");
    },
    groupAngle(){
      return this.group?.rotation.z??0
    },
  },
  watch:{
    // groupAngle(val){
    //   if((11 * val)%(this.group.children[1].rotation.z) === 0){
    //     console.log(val)
    //   }
    // }
  }
};
</script>
<style scoped>
.gallery {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 99;
}
#video{
  visibility: hidden;
  position: fixed;
  left:0;
  bottom:0;
}
</style>