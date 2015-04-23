import THREE from 'three.js';


function createLine(start, paths) {
	var geo = new THREE.Geometry();
	
	var start = new THREE.Vector3(start.x, start.y,start.z);

	geo.vertices.push( start );

	for( let [i , pos] of paths.entries()) {

		if(i === 0) {
			
			let one = new THREE.Vector3( start.x, pos.y, pos.z);
			let two = new THREE.Vector3( pos.x, pos.y, pos.z);
			let three = new THREE.Vector3( start.x, pos.y, pos.z);

			geo.vertices.push( one );
			geo.vertices.push( two );
			geo.vertices.push( three );
		} else {

			let prev = geo.vertices[ geo.vertices.length - 1 ];

			let one = new THREE.Vector3( prev.x, pos.y, pos.z);
			let two = new THREE.Vector3( pos.x, pos.y, pos.z);
			let three = new THREE.Vector3( prev.x, pos.y, pos.z);
			
			geo.vertices.push( one );
			geo.vertices.push( two );
			geo.vertices.push( three );
		}
		
	}

	var mat = new THREE.LineBasicMaterial( { color: 0x000000, lineWidth: 50 } );

	var line = new THREE.Line(geo, mat);

	return line;
}



/*
	var canvas = document.createElement('canvas');
    var size = 256; // CHANGED
    canvas.width = size;
    canvas.height = size;
    var context = canvas.getContext('2d');
    context.fillStyle = '#ff0000'; // CHANGED
    context.textAlign = 'center';
    context.font = '20pt Arial';
    context.fillText("some text", size / 2, size / 2);

    var amap = new THREE.Texture(canvas);
    amap.needsUpdate = true;

    var mat = new THREE.SpriteMaterial({
        map: amap,
        transparent: false,
        useScreenCoordinates: true,
        color: 0xffffff // CHANGED
    });

    var sp = new THREE.Sprite(mat);
    sp.position.set(0,0,-20)
    sp.scale.set( 10, 10, 1 ); // CHANGED
    scene.add(sp);

*/

/*
view-source:http://stemkoski.github.io/Three.js/Texture-From-Canvas.html

	/////// draw text on canvas /////////
	
	1)
	// create a canvas element
	var canvas1 = document.createElement('canvas');
	var context1 = canvas1.getContext('2d');
	context1.font = "Bold 40px Arial";
	context1.fillStyle = "rgba(255,0,0,0.95)";
    context1.fillText('Hello, world!', 0, 50);
    
    2)
	// canvas contents will be used for a texture
	var texture1 = new THREE.Texture(canvas1) 
	texture1.needsUpdate = true;
     
     3)
    var material1 = new THREE.MeshBasicMaterial( {map: texture1, side:THREE.DoubleSide } );
    material1.transparent = true;
	
	4)
    var mesh1 = new THREE.Mesh(
        new THREE.PlaneGeometry(canvas1.width, canvas1.height),
        material1
      );
	mesh1.position.set(0,50,0);

	5)
	scene.add( mesh1 );
*/

function createLable() {
	var canvas = document.createElement('canvas');

    //canvas.width = 128;
    //canvas.height = 128;

    var fontsize = 20;

    var context = canvas.getContext('2d');
    context.fillStyle = '#ff0000'; // CHANGED
    context.textAlign = 'center';
    context.font = fontsize + 'px Arial';
    //context.fillText("some text", canvas.width / 2, canvas.height / 2);
    context.fillText("some text", fontsize/2, fontsize/2);
    //context.fillStyle = "#9ea7b8";
    //context.fillRect(0,0,canvas.width,canvas.height);


    var texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;

    var mat = new THREE.SpriteMaterial({
    	map: texture,
    	transparent: false,
    	useScreenCoordinates: false,
    	color: 0x000000
    });

    var label = new THREE.Sprite(mat);
    //label.scale.set(20,20,20);
    label.scale.set( 20, 20 , 20 );
    return label;

}

class ThreeBoxWithBordersIndented extends THREE.Object3D {

	constructor( x, y, z, color, paths ) {
		super();
		
		var geo = new THREE.BoxGeometry( x, y, z );
		var mat = new THREE.MeshBasicMaterial( { color: color } );
				
		this._color = color;
		this._mesh = new THREE.Mesh( geo, mat );
		this._border = new THREE.EdgesHelper( this._mesh, '0xffffff' );
		this._edges = createLine( {x: -(x/4), y: -(y/2), z:0 } ,paths);
		this._text = createLable();
		this._text.position.set(x,0,0);
	  	
	  	//not advised to do this but it seems to fix my problem
	  	//https://github.com/mrdoob/three.js/issues/6023
	  	this._border.matrix = this._mesh.matrixWorld;
		this._border.matrixAutoUpdate = true;

		//this.add(this._border);
		this.add(this._mesh);
		this.add(this._edges);
		this.add(this._text);
	}

	onSelect() {
		this._mesh.material.color.setHex(0xff0000);
		this._edges.material.color.setHex(0xff0000);
		//this._border.material.color.setHex(0xffffff);
	}

	onUnselect() {
		this._mesh.material.color.setHex(this._color);
		this._edges.material.color.setHex(0x000000);
		//this._border.material.color.setHex(0xffffff);
	}
}

export default ThreeBoxWithBordersIndented;