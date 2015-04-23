import THREE from 'three.js';
import Stats from 'mrdoob/stats.js';
import OrthCameraExtended from './OrthCameraExtended';
import EventDispatcher from './EventDispatcher';
import ThreeObjectFactory from './ThreeObjectFactory';

class ThreeJsCtrl {

	constructor( settings ) {

		this._settings = settings;

		let w = settings.container.clientWidth;
		let h = settings.container.clientHeight;

		//setup WebGl Renderer
		this._renderer = new THREE.WebGLRenderer( settings.rendererSettings );
		
		//renderer size should be the size of the container
		this._renderer.setSize( w, h );
		this._settings.container.appendChild( this._renderer.domElement );

		//setup main camera
		//we are using pixels are units so pass in w and h of window
		//https://jsfiddle.net/yce4hm5m/  -> good example
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

		if(settings.axis) {
			//just for debgging
			this._axisHelper = new THREE.AxisHelper( 50 );
			this._axisHelper.position.set(0,0,-20);
			this._scene.add( this._axisHelper );

			let left = ThreeObjectFactory.createBasicCube(10,10,1, 0xFF00000);
			let right = ThreeObjectFactory.createBasicCube(10,10,1, 0xFF00000);

			let top = ThreeObjectFactory.createBasicCube(10,10,1, 0xFF00000);
			let bottom = ThreeObjectFactory.createBasicCube(10,10,1, 0xFF00000);

			left.position.set(-w/2,0,0);
			right.position.set(w/2,0,0);
			top.position.set(0,h/2,0);
			bottom.position.set(0,-h/2,0);

			this._scene.add( left );
			this._scene.add( right );
			this._scene.add( top );
			this._scene.add( bottom );

		}

		//for Events
		this.raycaster = new THREE.Raycaster(); // create once
		this.mouse = new THREE.Vector2(); // create once

		//add events
		//this._renderer.domElement.addEventListener('mousemove', (event)=>{ console.log("hello")},false);

		this._renderer.domElement.addEventListener('click', (event)=> { 
			
			let intersected = this.cast(event);

			if(intersected) {
				console.log(intersected);
				EventDispatcher.dispatchEvent({type:'nodeSelectedOnVis', message: intersected});
			}

		}, false);
		
		/*
		window.addEventListener('resize', (event)=>{
			var w = this._settings.container.clientWidth;
			var h = this._settings.container.clientHeight;
			
			this._mainCam.resizeHandler(w,h);
			this._renderer.setSize(w,h);
			

			this.reDraw();
		});
		*/
		/*
		Object.observe(this._scene.children, (change) => {

			var type = change.type ;
			var name = change.name;
			var obj = change['object'];
			var oldValue = change.oldValue;
			console.log(change)
		})
		*/
	}
	/*
	onResize() {
		//not working
		var w = this._settings.container.clientWidth;
		var h = this._settings.container.clientHeight;

		
		this._renderer.setSize( w, h );
		this._mainCam.resizeHandler( w, h )
	}
	*/

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
			//just for debugging
			//intersects[intersects.length-1].object.geometry.computeBoundingBox()
			//console.log(intersects[intersects.length-1].object.geometry.boundingBox)
			console.log(intersects[intersects.length-1].object.position);
			return intersects[intersects.length-1].object.parent.uuid;
		}
	}
}

export default ThreeJsCtrl;