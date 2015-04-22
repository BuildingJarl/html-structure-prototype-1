import THREE from 'three.js';
import Stats from 'mrdoob/stats.js';
import OrthCameraExtended from './OrthCameraExtended';
import EventDispatcher from './EventDispatcher';

class ThreeJsCtrl {

	constructor( settings ) {

		this._settings = settings;

		let w = settings.container.clientWidth;
		let h = settings.container.clientHeight;

		//setup WebGl Renderer
		this._renderer = new THREE.WebGLRenderer( settings.rendererSettings );
		this._renderer.setSize( w, h );
		this._settings.container.appendChild( this._renderer.domElement );

		//setup main camera
		this._mainCam = new OrthCameraExtended( w, h );

		//setup scene
		this._scene = new THREE.Scene();

		//add camera and visualisation to scene
		this._scene.add( this._mainCam );

		//add stats
		if(settings.stats) {
			this._stats = new Stats();
			this._stats.domElement.style.position = 'absolute';
			this._stats.domElement.style.bottom = '0px';
			this._stats.domElement.style.left = '0px';
			this._settings.container.appendChild( this._stats.domElement );
		}

		//for Events
		this.raycaster = new THREE.Raycaster(); // create once
		this.mouse = new THREE.Vector2(); // create once

		//add events
		//this._renderer.domElement.addEventListener('mousemove', (event)=>{ console.log("hello")},false);

		this._renderer.domElement.addEventListener('click', (event)=> { 
			
			let intersected = this.cast(event);

			if(intersected) {
				EventDispatcher.dispatchEvent({type:'nodeSelectedOnVis', message: intersected});
			}

		}, false);
		
		/*
		window.addEventListener('resize', (event) => {
			this.onResize(event)
		})
		*/
	}

	onResize() {
		//not working
		var w = this._settings.container.clientWidth;
		var h = this._settings.container.clientHeight;

		
		this._renderer.setSize( w, h );
		this._mainCam.resizeHandler( w, h )
	}

	addToScene( obj ) {

		this._scene.add( obj );
	}

	removeFromScene( obj ) {
		this._scene.remove( obj );
	}

	reDraw() {
		this._renderer.render( this._scene, this._mainCam );
	}

	cast(event) {

		 //make event positions relative to container position 
		//this will only work because container is  psoitioned absolute with right:0px
		//var x = this._settings.container.clientWidth - (window.innerWidth - event.clientX);
		var x = event.clientX;
		var y = this._settings.container.clientHeight - (window.innerHeight - event.clientY);

		this.mouse.x = ( x / this._renderer.domElement.width ) * 2 - 1;
		this.mouse.y = - ( y / this._renderer.domElement.height ) * 2 + 1;

		this.raycaster.setFromCamera( this.mouse, this._mainCam );
		var intersects = this.raycaster.intersectObjects( this._scene.children, true );
		
		//console.log(this.mouse)
		if( intersects.length > 0 ) {
			return intersects[intersects.length-1].object.parent.uuid;
		}
	}
}

export default ThreeJsCtrl;


/*
var raycaster = new THREE.Raycaster(); // create once
var mouse = new THREE.Vector2(); // create once

...

mouse.x = ( event.clientX / renderer.domElement.width ) * 2 - 1;
mouse.y = - ( event.clientY / renderer.domElement.height ) * 2 + 1;

raycaster.setFromCamera( mouse, camera );

var intersects = raycaster.intersectObjects( objects, recursiveFlag );
*/