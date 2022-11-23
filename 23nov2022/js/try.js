import * as THREE from 'three'
import { OrbitControls } from './OrbitControls.js';
import { TrackballControls } from './TrackballControls.js';

var scene,camera,renderer,cube,controls,cone,cyli,directLight;

init();
animate();

function init(){
    scene = new THREE.Scene();

    let mycanvas = document.getElementById("MyCanvas");
    const width = mycanvas.clientWidth;
    const height = mycanvas.clientHeight;

    camera = new THREE.PerspectiveCamera(45,width/height,1,1000);
    scene.add(camera);
    camera.position.set( 0, 20, 100 );
    
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( width, height );
    renderer.setClearColor(0x9996fff);
    mycanvas.appendChild( renderer.domElement );

    // controls = new OrbitControls( camera, renderer.domElement );
    // controls.autoRotate=true;
    
    directLight= new THREE.DirectionalLight(0xffffff,0.5);//soft white color
    scene.add(directLight); 
    //directLight.position.y=6;
    // directLight.target.position.z=5;
    // scene.add(directLight.target);
    
    // directLight =new THREE.SpotLight(0xffffff,0.5);
    // scene.add(directLight);
    
   controls = new TrackballControls ( camera, renderer.domElement );

    camera.position.z=10;
    
}

function disposeAll(){
    var object = scene.getObjectByName( 'cube');

    if(object){
        object.geometry.dispose();
        object.material.dispose();
        scene.remove( object );
    }

    object = scene.getObjectByName( 'sphere'); 

    if(object){
        object.geometry.dispose();
        object.material.dispose();
        scene.remove( object );
    }

    object = scene.getObjectByName( 'pyramid'); 

    if(object){
        object.geometry.dispose();
        object.material.dispose();
        scene.remove( object );
    }

    object = scene.getObjectByName('cylinder');

    if(object){
        object.geometry.dispose();
        object.material.dispose();
        scene.remove(object);
    }

    
}

document.getElementById("toggle").onclick=function  (){
    var object = scene.getObjectByName( 'cube');
    if (object) {
        if(true==object.material.wireframe)
        {
            object.material.wireframe=false;
        }
        else
        {
            object.material.wireframe=true;
        }
    }



    
}

document.getElementById("cube").onclick=function(){
  var object= scene.getObjectByName( 'cube');
  let check=false;  
  disposeAll();

        if (object){
            check=!object.material.wireframe;//reverse the status of wireframe
        }
    const geometry = new THREE.BoxGeometry(1,1,1);
    const material = new THREE.MeshPhongMaterial ({color : 0xf000f0,wireframe:check});
    cube = new THREE.Mesh(geometry,material);
    cube.name="cube";
    scene.add(cube);
    //directLight.position.x=true;
  
}

document.getElementById("sphere").onclick=function(){
        
    disposeAll();
    const geometry = new THREE.SphereGeometry(3, 50, 50, 0, Math.PI * 2, 0, Math.PI * 2);
    const material = new THREE.MeshPhongMaterial({color:0xff4d4d,wireframe:true});
    const sphere = new THREE.Mesh(geometry,material);
    sphere.name="sphere";
    scene.add(sphere);
}

document.getElementById("pyramid").onclick=function(){
    disposeAll();

    var geometry = new THREE.ConeGeometry(2,4,15)
    var material = new THREE.MeshPhongMaterial({color:0xF2A2B0});
    cone = new THREE.Mesh(geometry, material);
    cone.name="pyramid"
    scene.add(cone);
}

document.getElementById("cylinder").onclick=function(){
    disposeAll();

    const geometry = new THREE.CylinderGeometry(5,5,15,30)
    const material = new THREE.MeshPhongMaterial({color:0xF3A2B0});
    cyli = new THREE.Mesh(geometry,material);
    cyli.name="cylinder";
    scene.add(cyli);
    directLight.position.x=4;
    directLight.target.position.z=3;
    scene.add(directLight.target);

}

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
    controls.update();
}