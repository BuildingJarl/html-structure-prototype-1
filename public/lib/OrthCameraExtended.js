import THREE from 'three.js';

class OrthCameraExtended extends THREE.OrthographicCamera{

	constructor( w, h ) {

		let aspectRatio = w / h;
		let viewSize = h;

		let left = (-aspectRatio * viewSize) / 2;
		let right = (aspectRatio * viewSize) / 2;
		let top = viewSize / 2;
		let bottom = -viewSize / 2;
		let near = 1;
		let far = 100;

		super( left, right, top, bottom, near, far );
	}

	resizeHandler( w, h ) {

		let aspectRatio = w/ h;
		let viewSize = h;

		this._mainCam.aspect = aspectRatio;
		this._mainCam.left = (-aspectRatio * viewSize) / 2;
		this._mainCam.right = (aspectRatio * viewSize) / 2;
		this._mainCam.top = viewSize / 2;
		this._mainCam.bottom = -viewSize / 2;
	    this._mainCam.updateProjectionMatrix();

	    console.log('window resize: ' + w + ' x ' + h );
	}

	getWorldPosOfTopLeftCorner( args ){

		let pos = this._mainCam.position.clone();

		pos.x += this._mainCam.left;
		pos.y += this._mainCam.top;

		pos.x += (args.nodeSizeX / 2);
		pos.y -= (args.nodeSizeY / 2);

		pos.x += args.paddingLeft;
		pos.y -= args.paddingTop;

		return pos;
	}

	screenToWorld( domEl, screenX, screenY ) {
		
		var vector = new THREE.Vector3();

		//container is probaly not at 0,0
		let rect = domEl.getBoundingClientRect();
		
		let newScreenX = screenX - rect.left;
		let newScreenY = screenY - rect.top;

	    //Convert to world positions
	    var x = ( newScreenX / domEl.clientWidth ) * 2 - 1;
	    var y = - ( newScreenY / domEl.clientHeight ) * 2 + 1;

	    vector.set( x, y, - 1 ); // z = - 1 important!
	    vector.unproject( this._mainCam );

	    return vector;
	}

	camDirection() {

		var dir = new THREE.Vector3();
		dir.set( 0, 0, -1 ).transformDirection( this._mainCam.matrixWorld );

		return dir;
	}
}

export default OrthCameraExtended;