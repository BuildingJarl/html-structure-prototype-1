

function multiCalcu(depth) {

	var res = [];

	for( let i = 0; i <= depth; i++) {

		if(i===0) {
			res.push(0);
		}

		else if(i === 1) {
			res.push(1);
		}

		else {
			res.push(res[i-1]+0.5);
		}
	}

	return res;
} 

function calculateLayout(ast, dim) {

	//var nodeWidth = 30;
	//var nodeHeight = 4;
	//var dividerSpace = 1

	var stats = calcStats(ast);
	var multi = multiCalcu(stats.depth);

	var nodeWidth = dim.width / multi[stats.depth];
	var nodeHeight = dim.height / stats.totalNodes;



	console.log(dim.width)
	console.log(nodeWidth)

	var nodesList = [];
	var nodeHash = {};
	var path = [];

	//Since this is a none space filling technique - w and h stay the same

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
					let siblings = nodes.slice(0,i);
					let offsetMulti = totalDesendantsCount(siblings);
					
					node.layout.position.x = startX;
					node.layout.position.y = startY - (nodeHeight * offsetMulti);
				}
			} else {
				if(i === 0) {
					//added to parent object to starting at parent pos
					node.layout.position.x = nodeWidth/2;
					node.layout.position.y = -nodeHeight;
				} else {
			
					let sibling = nodes[i-1];
					let siblings = nodes.slice(0,i);
					let offsetMulti = totalDesendantsCount(sibling.children)+1;
					
					let x = nodeWidth/2;
					let y = sibling.layout.position.y - (nodeHeight*offsetMulti);

					node.layout.position.x = x
					node.layout.position.y = y;
				}
			}

			trav( node.children, node );
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

function calcStats (tree) {

	var depth = 0;
	var dIndex = 0;
	var totalNodes = 0;

	traverse(tree);

	return {depth:depth, totalNodes:totalNodes};

	function traverse(nodes) {
		
		for( let [ i, node ] of nodes.entries() ) {
			dIndex++;
			totalNodes++;
			if(dIndex > depth) {
				depth = dIndex;
			}
			traverse(node.children);
			dIndex--;
		}
	}
}


export default calculateLayout;