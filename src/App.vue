<template>
  <div class="gallery" id="container">
    <video id="video" muted autoplay loop controls>
      <source
        src="/video/sintel.ogv"
        type='video/ogg; codecs="theora, vorbis"'
      />
    </video>
  </div>
</template>
<script>
import { WEBGL } from "three/examples/jsm/WebGL";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import { Raycaster } from 'three';
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
      imgUrlArr: [
        {
          img:"img/0.jpg",
          text:"2020年1月30日，广西自治区领导莅临广西客服中心视察指导，客服中心林主任与雷主任陪同下观看广西客服大屏，张科长介绍了大屏特色功能和客服中心专项指标，得到区领导高度赞赏与表扬！"
        },
        {
          img:"img/1.jpg",
          text:"2020年2月30日，南方电网广西电网分公司领导莅临广西客服中心视察指导，客服中心林主任与雷主任陪同下观看广西客服大屏，张科长介绍了大屏特色功能和客服中心专项指标，得到区领导高度赞赏与表扬！"
        },
        {
          img:"img/2.jpg",
          text:"2020年3月30日，南方电网总公司领导莅临广西客服中心视察指导，客服中心林主任与雷主任陪同下观看广西客服大屏，张科长介绍了大屏特色功能和客服中心专项指标，得到区领导高度赞赏与表扬！"
        },
        {
          img:"img/3.jpg",
          text:"2020年4月30日，南方电网广西电网分公司领导莅临广西客服中心视察指导，客服中心林主任与雷主任陪同下观看广西客服大屏，张科长介绍了大屏特色功能和客服中心专项指标，得到区领导高度赞赏与表扬！"
        },
        {
          img:"img/4.jpg",
          text:"2020年5月30日，广西新电力领导莅临广西客服中心视察指导，客服中心林主任与雷主任陪同下观看广西客服大屏，张科长介绍了大屏特色功能和客服中心专项指标，得到区领导高度赞赏与表扬！"
        },
        {
          img:"img/5.jpg",
          text:"2020年6月30日，广西自治区领导莅临广西客服中心视察指导，客服中心林主任与雷主任陪同下观看广西客服大屏，张科长介绍了大屏特色功能和客服中心专项指标，得到区领导高度赞赏与表扬！"
        },
        {
          img:"img/6.jpg",
          text:"2020年7月30日，南方电网总公司领导莅临广西客服中心视察指导，客服中心林主任与雷主任陪同下观看广西客服大屏，张科长介绍了大屏特色功能和客服中心专项指标，得到区领导高度赞赏与表扬！"
        },
        {
          img:"img/7.jpg",
          text:"2020年8月30日，广西自治区领导莅临广西客服中心视察指导，客服中心林主任与雷主任陪同下观看广西客服大屏，张科长介绍了大屏特色功能和客服中心专项指标，得到区领导高度赞赏与表扬！"
        },
        {
          img:"img/8.jpg",
          text:"2020年9月30日，广西新电力领导莅临广西客服中心视察指导，客服中心林主任与雷主任陪同下观看广西客服大屏，张科长介绍了大屏特色功能和客服中心专项指标，得到区领导高度赞赏与表扬！"
        },
        {
          img:"img/9.jpg",
          text:"2020年10月30日，广西自治区领导莅临广西客服中心视察指导，客服中心林主任与雷主任陪同下观看广西客服大屏，张科长介绍了大屏特色功能和客服中心专项指标，得到区领导高度赞赏与表扬！"
        },
        {
          img:"img/10.jpg",
          text:"2020年12月30日，广西自治区领导莅临广西客服中心视察指导，客服中心林主任与雷主任陪同下观看广西客服大屏，张科长介绍了大屏特色功能和客服中心专项指标，得到区领导高度赞赏与表扬！"
        }
      ],
      clock: new THREE.Clock(),
      pausedTime: 5000, //停留时长
      detailGroup: null
    };
  },
  methods: {
    init() {
      // let _this = this;
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
      var texture = new THREE.TextureLoader().load("img/background3.jpg");
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(1, 1);
      this.scene.background = texture;
      this.group = new THREE.Group();
      this.group.position.y = 50;
      this.scene.add(this.group);
      this.loadImgs();
      this.initCamera();
      this.initControls();
      this.addCircleDRN();
      this.setLight();
      this.initClickEvent();
      this.animate();
    },
    setLight() {
      let ambientLight = new THREE.AmbientLight(0xffffff); // 环境光
      this.scene.add(ambientLight);
      this.controls.update();
    },
    addShapeDRN(shape, extrudeSettings, color, x, y, z, rx, ry, rz, s) {
      let _this = this;
      const meshCount = 11;

      for (let i = 0; i < meshCount; i++) {
        let mesh;
        let extrudeGeometry = new THREE.ExtrudeBufferGeometry(
          shape,
          extrudeSettings
        );
        let material = new THREE.MeshPhongMaterial({
          // color: color,
          opacity: 0.8,
          // transparent: true,
          map: _this["texture" + i],
        });
        // extrudeGeometry.id = '';
        // if (i === 0) {
        mesh = new THREE.Mesh(extrudeGeometry, material);
        mesh.position.set(x, y, z - 75);
        mesh.rotation.set(rx, ry, rz);
        mesh.scale.set(s, s, s);
        // } else {
        // mesh = lastMesh.clone();
        mesh.rotateZ(((Math.PI * 2) / meshCount) * i);
        // }
        this.group.add(mesh);
        // lastMesh = mesh;
      }
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
      // this.camera.position.set(0, 450, 0);
      // this.camera.lookAt(new THREE.Vector3(500, 450, 0));
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
      // this.controls.enabled=false
    },
    render() {
      if (this.groupAnimation) {
        this.group.rotateZ(Math.PI / 3000); //360
      }
      this.renderer.render(this.scene, this.camera);
    },
    animate() {
      // this.showName();
      requestAnimationFrame(this.animate);
      this.render();
      this.controls.update();
      if (this.mixer) {
        this.mixer.update(this.clock.getDelta()); //更新每一帧的混合器  拉近
      }
    },
    //加载图片及vedio资源
    loadImgs() {
      let _this = this;
      const loader = new THREE.TextureLoader();
      this.imgUrlArr.forEach((item, i) => {
        if ([1, 3, 5, 7, 9].includes(i)) {
          //获取到video对象
          let video = document.querySelector("#video");
          //通过video对象实例化纹理
          _this["texture" + i] = new THREE.VideoTexture(video);
        } else {
          _this["texture" + i] = loader.load(item.img);
        }
        _this["texture" + i].wrapS = _this["texture" + i].wrapT =
          THREE.RepeatWrapping; // RepeatWrapping
        _this["texture" + i].repeat.set(0.0038, 0.0033); //0.008
        _this["texture" + i].needsUpdate = true;
        _this["texture" + i].name = item.text;
      });
    },
    //keyframeTrack帧动画
    keyframeTrack(mesh, values) {
      let _this = this;
      // let obj = this.group.children[7].clone();
      let times = [0, 10]; //离散的时间序列
      // let values = [0,0,-75,160, 600, -120]; //过渡的值
      //创建帧动画对象，使几何体在规定时间内移动到[100,0,0]的位置
      let posKeyframeTrack = new THREE.KeyframeTrack(
        "box.position",
        times,
        values
      );
      //剪辑keyframeTrack对象
      let duration = 10;
      let clip = new THREE.AnimationClip("boxAnimation", duration, [
        posKeyframeTrack,
      ]);
      this.mixer = new THREE.AnimationMixer(mesh);
      //设置回调函数
      this.mixer.addEventListener("loop", function() {
        //finished
        action.paused = true;
        _this.groupAnimation = false;
        // mesh.rotateOnAxis(center,mesh.rotation.z)
        setTimeout(() => {
          action.paused = false;
          _this.groupAnimation = true;
        }, _this.pausedTime);
      });
      let action = this.mixer.clipAction(clip);
      //调节播放速度 默认为1
      action.timeScale = 3;
      /** 开始播放 setLoop()设置循环模式和次数，play()播放动画 */
      action.setLoop(THREE.LoopPingPong, 2).play();
      /** 不循环播放 */
      // action.clampWhenFinished = true
      // action.play()
      // action.clampWhenFinished = true
    },
    /** 设置定时器循环调用 keyframeTrack 方法 */
    loopAnimation() {
      let _this = this,
        timerId,
        keysArr = Object.keys(_this.group.children),
        // rotation = _this.group.children[7].rotation.z,
        // alpha = Math.abs(rotation)>Math.PI/2?(Math.PI-Math.abs(rotation)):Math.abs(rotation),
        //通过正弦求出外接圆半径
        // r = 160/Math.sin(alpha) * Math.tan(alpha);
        r = 600;
      animation();
      function animation() {
        let mesh = _this.group.children[keysArr[7]],
          angle = mesh.rotation.z + Math.PI / 11,
          alpha =
            Math.abs(angle) > Math.PI / 2
              ? Math.PI - Math.abs(angle)
              : Math.abs(angle);
        //根据余弦定理和勾股定理求出x,y的值
        let y = r * Math.sin(alpha),
          x = r * Math.cos(alpha);
        //通过角度判断正负
        y = angle > 0 ? -y : y;
        x = Math.abs(angle) > Math.PI / 2 ? x : -x;
        let values = [0, 0, -75, x, y, -100];
        _this.keyframeTrack(mesh, values);
        let key = keysArr.pop();
        keysArr.unshift(key);
        clearTimeout(timerId);
        timerId = setTimeout(animation, 15000);
        // requestAnimationFrame(animation)
      }
    },
    /** 初始化鼠标点击事件 */
    initClickEvent() {
      let _this = this,
        // objects = [],
        // raycaster = new THREE.Raycaster(),
        mouse = new THREE.Vector2();
      //监听点击事件，通过ray检测选中哪一个object
      document.addEventListener(
        "click",
        (e) => {
          e.preventDefault();
          if(_this.detailGroup){
            _this.action.paused = false
            return 
          }
          //将鼠标点击位置的屏幕坐标转成threejs中的标准坐标,具体解释见代码释义
          mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
          mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
          //新建一个三维单位向量 假设z方向就是0.5
          //根据照相机，把这个向量转换到视点坐标系
          let vector = new THREE.Vector3(mouse.x, mouse.y, 0.5).unproject(
            _this.camera
          );
          //在视点坐标系中形成射线,射线的起点向量是照相机， 射线的方向向量是照相机到点击的点，这个向量应该归一标准化。
          let raycaster = new THREE.Raycaster(
            _this.camera.position,
            vector.sub(_this.camera.position).normalize()
          );
          //射线和模型求交，选中一系列直线
          let intersects = raycaster.intersectObjects(_this.group.children);
          if (intersects.length > 0) {
            //选中第一个射线相交的物体
            _this.createCenterShape(intersects[0].object)
          }
        },
        false
      );
    },
    //添加方形面板用于展示拉近的详情信息
    createCenterShape(mesh){
      console.log(mesh)
      var shapeLeft = new THREE.Shape();
      shapeLeft.moveTo( -250,-100 );
      shapeLeft.lineTo( 0, -100 );
      shapeLeft.lineTo( 0, -90);
      shapeLeft.lineTo( -250, -90);

      var shapeRight = new THREE.Shape();
      shapeRight.moveTo( 250,-100 );
      shapeRight.lineTo( 0, -100 );
      shapeRight.lineTo( 0, -90);
      shapeRight.lineTo( 250, -90);

      var extrudeSettings = {
        color:0xffffff,
        depth: 250,
        bevelEnabled: false,
        bevelSegments: 9,
        steps: 1,
        bevelSize: 0,
        bevelThickness: 0,
      };
      var geometry = new THREE.ExtrudeBufferGeometry( shapeLeft, extrudeSettings );
      var geometryRight = new THREE.ExtrudeBufferGeometry( shapeRight, extrudeSettings );
      const loader = new THREE.TextureLoader();
      let texture = loader.load("img/0.jpg");
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(0.004, 0.004); //0.008
      texture.needsUpdate = true;

      let texture2 = loader.load(this.util.textToImg(mesh.material.map.name));
      texture2.wrapS = texture2.wrapT = THREE.RepeatWrapping;
      texture2.repeat.set(0.004, 0.004); //0.008
      texture2.needsUpdate = true;
      
      var material = new THREE.MeshPhongMaterial({ 
        // color: 0xA9E6DB,
        transparent: true,
        // opacity: 0.8,
        map: mesh.material.map
      });

      var material2 = new THREE.MeshPhongMaterial({ 
        color: 0xA9E6DB,
        transparent: true,
        opacity: 0.9,
        map: texture2,
      });

      let detailMesh = new THREE.Mesh( geometry, material );
      let detailMesh2 = new THREE.Mesh( geometryRight, material2 );
      this.detailGroup = new THREE.Group;
      this.detailGroup.add(detailMesh);
      this.detailGroup.add(detailMesh2);
      this.detailGroup.rotateX(Math.PI/12)
      this.scene.add( this.detailGroup );
      this.zoomClose(this.detailGroup)
    },
    //拉近效果
    zoomClose(mesh){
      console.log(mesh);
      let _this = this;
      let times = [0, 10]; //离散的时间序列
      let values = [0,0,0,0, 600, -50]; //过渡的值
      let posKeyframeTrack = new THREE.KeyframeTrack(
        "box.position",
        times,
        values
      );
      //剪辑keyframeTrack对象
      let duration = 5;
      let clip = new THREE.AnimationClip("boxAnimation", duration, [
        posKeyframeTrack,
      ]);
      this.mixer = new THREE.AnimationMixer(mesh);
      //设置回调函数
      this.mixer.addEventListener("loop", ()=> {
        //finished
        _this.action.paused = true;
      });
      this.mixer.addEventListener("finished", ()=> {
        this.scene.remove(this.detailGroup);
        this.detailGroup = null
      });
      _this.action = this.mixer.clipAction(clip);
      //调节播放速度 默认为1
      _this.action.timeScale = 5;
      /** 开始播放 setLoop()设置循环模式和次数，play()播放动画 */
      _this.action.setLoop(THREE.LoopPingPong, 2).play();
    },
    loadText(){
      const loader = new THREE.FontLoader();
      loader.load( 'fonts/helvetiker_regular.typeface.json', function ( font ) {

        const color = 0x006699;

        const matDark = new THREE.LineBasicMaterial( {
          color: color,
          side: THREE.DoubleSide
        } );

        const matLite = new THREE.MeshBasicMaterial( {
          color: color,
          transparent: true,
          opacity: 0.4,
          side: THREE.DoubleSide
        } );

        const message = "   Three.js\nSimple text.";

        const shapes = font.generateShapes( message, 100 );

        const geometry = new THREE.ShapeBufferGeometry( shapes );

        geometry.computeBoundingBox();

        const xMid = - 0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x );

        geometry.translate( xMid, 0, 0 );

        // make shape ( N.B. edge view not visible )

        const text = new THREE.Mesh( geometry, matLite );
        text.position.z = - 150;
        this.scene.add( text );

        // make line shape ( N.B. edge view remains visible )

        const holeShapes = [];

        for ( let i = 0; i < shapes.length; i ++ ) {

          const shape = shapes[ i ];

          if ( shape.holes && shape.holes.length > 0 ) {

            for ( let j = 0; j < shape.holes.length; j ++ ) {

              const hole = shape.holes[ j ];
              holeShapes.push( hole );

            }

          }

        }

        shapes.push.apply( shapes, holeShapes );

        const lineText = new THREE.Object3D();

        for ( let i = 0; i < shapes.length; i ++ ) {

          const shape = shapes[ i ];

          const points = shape.getPoints();
          const geometry = new THREE.BufferGeometry().setFromPoints( points );

          geometry.translate( xMid, 0, 0 );

          const lineMesh = new THREE.Line( geometry, matDark );
          lineText.add( lineMesh );

        }

        this.scene.add( lineText );

      } ); //end load function
    }
  },
  mounted() {
    this.init();
  },
  computed: {
    container() {
      return document.getElementById("container");
    },
    groupAngle() {
      return this.group?.rotation.z ?? 0;
    },
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
#video {
  visibility: hidden;
  position: fixed;
  left: 0;
  bottom: 0;
}
</style>
