import THREE from 'three.js';

class OrthCameraExtended extends THREE.OrthographicCamera{

	constructor( w, h ) {

		let aspectRatio = w / h;
		let viewSize = h; //set to h, means world units is pixels

		let left = (-aspectRatio * viewSize) / 2;
		let right = (aspectRatio * viewSize) / 2;
		let top = viewSize / 2;
		let bottom = -viewSize / 2;
		let near = 1;
		let far = 100;

		super( left, right, top, bottom, near, far );
	}

	resizeHandler( w, h ) {
		//look at this again
		let aspectRatio = w / h;

		this.aspect = aspectRatio;
		this.left = (-aspectRatio * viewSize) / 2;
		this.right = (aspectRatio * viewSize) / 2;
		this.top = viewSize / 2;
		this.bottom = -viewSize / 2;
	    this.updateProjectionMatrix();

	    console.log('window resize: ' + w + ' x ' + h );
	}

	getWorldPosOfTopLeftCorner( args ){

		let pos = this.position.clone();

		pos.x += this.left;
		pos.y += this.top;

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
	    vector.unproject( this );

	    return vector;
	}

	camDirection() {

		var dir = new THREE.Vector3();
		dir.set( 0, 0, -1 ).transformDirection( this.matrixWorld );

		return dir;
	}
}

export default OrthCameraExtended;