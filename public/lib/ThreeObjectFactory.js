import THREE from 'three.js';
import ThreeBoxWithBorders from './ThreeBoxWithBorders';
import ThreeBoxWithBordersIndented from './ThreeBoxWithBordersIndented';
import ThreeTriangle from './ThreeTriangle';

class ThreeObjectFactory {

	// { x:, y:, z: }
	createBasicCube( x, y, z, color) {
		var geo = new THREE.BoxGeometry( x, y, z );
		var mat = new THREE.MeshBasicMaterial({
			wireframe: false,
			color: color
		});
		return new THREE.Mesh(geo,mat);
	}

	createPill( x, y, z, color ) {

		var geometry = new THREE.SphereGeometry( y/2, 32, 32 );
		var material = new THREE.MeshBasicMaterial( {color: color} );
		var left = new THREE.Mesh( geometry, material );
		var right = new THREE.Mesh( geometry, material );

		var body = this.createBasicCube( x/2, y, z, color );

		right.position.set( x/3, 0, 0 );
		left.position.set( -x/3, 0, 0 );

		body.add(left);
		body.add(right);

		return body;
	}

	createCircle( r, color ) {
		var material = new THREE.MeshBasicMaterial({
			color: color
		});

		var radius = r;
		var segments = 64;

		var circleGeometry = new THREE.CircleGeometry( radius, segments );				
		var circle = new THREE.Mesh( circleGeometry, material );
		
		return circle;
	}

	createBoxWithBorder(x, y, z, color) {

		var box = new ThreeBoxWithBorders( x, y, z, color );

		return box;
	}

	createBoxWithBordersIndented(x, y, z, color, paths) {

		var box = new ThreeBoxWithBordersIndented( x, y, z, color, paths );

		return box;
	}

	createTriangle( w, h, color) {
		
		var triangle = new ThreeTriangle( w, h, color );

		return triangle;
	}
}

export default new ThreeObjectFactory();