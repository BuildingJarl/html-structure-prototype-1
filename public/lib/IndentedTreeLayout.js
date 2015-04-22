
function calculateLayout(ast, dim) {

	var nodeWidth = 60;
	var nodeHeight = 20;

	var nodesList = [];
	var nodeHash = {};
	var path = [];

	var startX = (-dim.width/2) + nodeWidth/2;
	var startY = (dim.height/2) - nodeHeight/2;

	//calc positions
	trav( ast );

	return { arr: nodesList, hash: nodeHash, ast: ast };

	function trav( nodes, parent ) {
		
		for( let [i, node] of nodes.entries() ) {

			node.layout = {};
			node.layout.width = nodeWidth;
			node.layout.height = nodeHeight;

			node.layout.position = {};

			path.push(i);
			nodesList.push(node);
			nodeHash[path.join('-')] = node;

			if(!parent) {
				if(i === 0) {
					node.layout.position.x = startX;
					node.layout.position.y = startY;
				} else {

					var sib = nodes[i-1]
					
					node.layout.position.x = startX;
					node.layout.position.y = sib.layout.position.y - ((totalDesendantsCount(sib.children) * nodeHeight) + nodeHeight);
				}
			} else {
				if(i === 0) {
					//added to parent object to starting at parent pos
					node.layout.position.x = nodeWidth/2;
					node.layout.position.y = -nodeHeight;
				} else {
			
					var sib = nodes[i-1]
					
					node.layout.position.x = nodeWidth/2;
					node.layout.position.y = sib.layout.position.y - ((totalDesendantsCount(sib.children) * nodeHeight) + nodeHeight);
				}
			}


			//edges
			node.layout.edge = {};
			node.layout.edge.paths = [];
			
			//node.layout.edge.start = {};
			//node.layout.edge.start.x = node.layout.position.x - (nodeWidth/4);
			//node.layout.edge.start.y = node.layout.position.y - (nodeHeight/2);



			trav( node.children, node );

			if(parent) {
				var edgePath = { x: 0, y: 0, z: 0};
				edgePath.x = node.layout.position.x - (nodeWidth/2); 
				edgePath.y = node.layout.position.y;
				
				parent.layout.edge.paths.push(edgePath);
			}

			path.pop();
		}
	}
}

//helper function - move into own class eventually?
function totalDesendantsCount(nodes) {
	var count = 0;
	trav(nodes);
	return count;
	function trav(nodes) {
		for( let [ i, node ] of nodes.entries() ){
			count++;
			trav( node.children );
		}
	}
}

export default calculateLayout;