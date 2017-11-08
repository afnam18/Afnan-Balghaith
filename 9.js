// CPCS 324 Algorithms & Data Structures 2
// Graph data structure starter - Transitive Closure Package
// 2017, Dr. Muhammad Al-Hashimi
// -----------------------------------------------------------------------
// simple graph object with linked-list edge implementation and minimal fields
// extra vertex and edge property fields to be added later as needed
//
var v = [],
e = []; // global variable for general graph

var v2 = [],
e2 = []; //global variable for second graph

var v3 = [],
e3 = []; //global variable for third graph



// -----------------------------------------------------------------------
function main_graph()
{
// create a graph (default undirected)
var g = new Graph();
var g2 = new Graph();
var g3 = new Graph();

// set graph properties
g.label = "Exercise 8.4: 1 (Levitin, 3rd edition)";
g.digraph = true;
g2.label = "Exercise 8.4: 7 (Levitin, 3rd edition)";
g2.digraph = true;
g3.label = "KSA 12 cities";

// use global input arrays _v and _e to initialize its internal data structures
g.readGraph(v, e);
g2.readGraph(v2, e2);
g3.readGraph(v3, e3);
// use print_graph() method to check graph
g.printGraph();

// report connectivity status if available
//document.write("<p>", g.componentInfo(), "</p>");

// perform depth-first search and output stored result
g.deterDFS;
g.connectedComp = g.topoSearch(g.connectedComp);
document.write("<p>","dfs_push: ", g.dfs_push, "</p>");

// report connectivity status if available
document.write("<p>", g.componentInfo(), "</p>");

/*perform breadth-first search and output stored result
 g.deterDFS='b';
  g.topoSearch(g.connectedComp); 
 document.write("<p>","Bfs_order:", g.bfs_order, "</p>");*/

//use makeAdjMatrix() method to fill the matrix of graph
g.makeAdjMatrix();
g2.makeAdjMatrix();
g3.makeAdjMatrix();

/*   output the graph adjacency matrix
	document.write("<p>", "first row matrix: ", g.adjMatrix[0], "</p>");
	document.write("<p>", "last row matrix: ", g.adjMatrix[g.nv - 1], "</p>");
*/
// Perform dfsTC Method for First general graph 
document.write("<p>", "TC matrix by DFS: ", "</p>");
g.dfsTC();
for (var i = 0; i < g.tcMat.length; i++)
{
	document.write("<p>", g.tcMat[i], "</p>");
}

// Perform warshallFloyd Method for general graph
g.warshallFloyd();
document.write("<p>", "TC matrix by Warshall-Floyd:  ", "</p>");
for (var i = 0; i < g.RW.length; i++)
{
	document.write("<p>", g.RW[i], "</p>");
}

// return value of .isDAG()
var dag = g.isDAG();
document.write("<p>", "DAG:  ", dag, "</p>");

// Perform dfsTC method for Exercise 8.4: 7 graph
g2.dfsTC();//to get the value of dag
/*document.write("<p>", "TC matrix by Warshall-Floyd Exercise 8.4: 7 ", "</p>");

for (var i = 0; i < g2.tcMat.length; i++)
{
	document.write("<p>", g2.tcMat[i], "</p>");
}*/

// Perform warshallFloyd Method for Exercise 8.4: 7 graph
g2.warshallFloyd();
document.write("<p>", "TC matrix by Warshall-Floyd Exercise 8.4: 7 ", "</p>");
for (var i = 0; i < g2.RW.length; i++)
{
	document.write("<p>", g2.RW[i], "</p>");
}

// Perform warshallFloyd (Distance)Method for Exercise 8.4: 7 graph
document.write("<p>", "Distance matrix Exercise 8.4: 7  ", "</p>");
for (var i = 0; i < g2.RF.length; i++)
{
	document.write("<p>", g2.RF[i], "</p>");
}

// return value of .isDAG()
var dag = g2.isDAG();
document.write("<p>", "DAG Exercise 8.4: 7   ", "</p>");
document.write("<p>", dag, "</p>");


// Get MST by Prim() method
document.write("MST for ", g3.label, "</p>");
var matPrim = g3.prim();
for (var i = 0; i < matPrim.length; i++)
{
	document.write((i + 1),"- Distenation", " ", " ( ", matPrim[i].u.label, ") ", " -- ( From ", matPrim[i].v.label, " To ",
		matPrim[i].u.label,
		") -- Distance: ", matPrim[i].e, "<br>");
}
document.write("Total Cost =",g3.cost); //just to make sure that the prim method work well
}


// -----------------------------------------------------------------------

function Vertex(v)
{
// published docs section (ref. assignment page)
// for this section, strip line comments (leave outline)
// no JSDOC comments in this section

// property fields

this.label = v.label;
this.visit = false;
this.adjacent = new List();

// member methods
this.adjacentByID = adjacentByIdImpl;
this.vertexInfo = vertexInfoImpl;
this.insertAdjacent = insertAdjacentImpl;
this.incidentEdge = incidentEdgeImpl;

// --------------------
// student property fields next


// --------------------
// student methods next; actual functions in student code sections

}

// -----------------------------------------------------------------------

function Edge(vert_i, weight)
{
// published docs section (ref. assignment page)
// for this section, strip line comments (leave outline)
// no JSDOC comments in this section


// property fields

this.target_v = vert_i;
this.weight = (weight != undefined) ? weight : null; // ... (complete next)

// member methods


// --------------------
// student property fields next


// --------------------
// student methods next; actual functions in student code sections

}


// -----------------------------------------------------------------------

function Graph()
{
// published docs section (ref. assignment page)
// for this section, strip line comments (leave outline)
// no JSDOC comments in this section


// property fields

this.vert = [];
this.nv = 0; // ... (complete next)
this.ne = 0; // number of edges
this.digraph = false; // true if digraph, false otherwise (default undirected)
this.weighted = false;
this.dfs_push = []; // DFS traversal order output array
this.bfs_order = []; // BFS traversal order output array
this.label = ""; // identification string to label grap
this.connectedComp = 0; // number of connected comps set by DFS; 0 (default) for no info
this.adjMatrix = []; // graph adjacency matrix to be created on demand

// member methods

this.readGraph = better_input; // ... (complete next) 
this.addEdge = addEdgeImpl2; // better printer function
this.printGraph = printGraphImpl;
this.list_vert = "";
this.dfs = dfsImpl; // DFS a connected component
this.bfs = bfsImpl; // BFS a connected component
this.makeAdjMatrix = makeAdjMatrixImpl2;
this.componentInfo = componentInfoImpl;
this.isConnected = isConnectedImpl;
this.topoSearch = topoSearchImpl;


// --------------------
// student property fields next
this.deterDFS = 'd'; // using this as a helper in method toposearch to distinguish either perform dfs or bfs
this.tcMat = []; //graph TC bsed-dfs Matrix 
this.RF = []; // graph Floyd Matrix 
this.RW = []; // graph Warshal Matrix 
this.cost=0; //initialize variable to count the cost of distances to make sure prim work well

// --------------------
// student methods next (actual functions in student code sections)

// transitive closure package (requirements in line comments) 
/**#@+  @description Member method - Check if the path is existing between two vertices */
this.hasPath = hasPathImpl; // boolean, true if path exists between vertices v_i, v_j in digraph
/**#@+ @description MEMBER METHOD - Return the shortest path between two vertices */
this.shortestPath = shortestPathImpl; // return distance of shortest path between v_i, v_j in weighted graph 
/**#@+ @description MEMBER METHOD - Check if the graph is DAG or no */
this.isDAG = isDAGImpl; // boolean, true if acyclic digraph
/**#@+ @description MEMBER METHOD - Generate the TC for the digraph & distances for weight graph  */
this.warshallFloyd = warshallFloydImpl; // inserts .tc field in adjacency matrix if digraph, and .dist if weighted
/**#@+ @description MEMBER METHOD - Generate the TC based-dfs for the digraph  */
this.dfsTC = dfsTCImpl; // return TC matrix for digraph based on a dfs
/**#@+ @description MEMBER METHOD - Generate the MST for graph  */
this.prim = primIml; // return MST for graph
}


// -----------------------------------------------------------------------
// functions used by methods of Graph and subsidiary objects

// -----------------------------------------------------------------------
// begin student code section
// -----------------------------------------------------------------------

// transitive closure package 
/**
Implement a method that take two vertices and make a test if there 
is a path between them or no by using {@link tcMat} matrix. 
tcMat is the matrix of method dfsTC which return
 zeros and ones matrix depending if there is a path.


@methodOf Graph#
@author Afnan Balghaith
@param {integer} v_i input- first vertex's id
@param {integer} v_j input- second vertex's id
@return {boolean} True if there is a Path between v_i and v_j, false isn't
*/
function hasPathImpl(v_i, v_j)
{
//tcMat contians the information of paths between vertices
if (this.tcMat[v_i][v_j] == 1)
	return true; //true if return 1 which means there is path
else return false; //false if return 0 which means there is no path
}

//-----------------------------------
/**
Implement a method that take two vertices and return the shortest path 
between them by using {@link RF} matrix. RF is the matrix of method warshalFloyd which return
 the value of the distences.

@methodOf Graph#
@author Afnan Balghaith
@param {integer} v_i input- first vertex's id
@param {integer} v_j input- second vertex's id
@return {integer} number of shortest path between v_i & v_j.
*/
function shortestPathImpl(v_i, v_j)
{
// RF Matrix  contains the shortest path information beteen the vertices.
return this.RF[v_i][v_j];
}
//-----------------------------------
/**
Implement a method that that make a test the graph if it has cycles or no,
by using {@link tcMat} matrix. 
tcMat is a matric of method dfsTC which consider it as a proper 
matrix to check for DAG since its contain zeros and ones elements, 
as well as warshal TC matrix.
@methodOf Graph#
@author Afnan Balghaith
@return {boolean} True if the graph is DAG or no
*/
function isDAGImpl()
{

for (var i = 0; i < this.nv; i++) //first for loop for the rows
{
	for (var j = 0; j < this.nv; j++) //second for loop for the columns
	{
		// check if the digonal of the grapg equal zero then it is DAG,return true
		if (this.tcMat[i][j] == 0 && i == j)
		{
			return true;
		}
	}
}
return false; //otherwise, return false
}
//-------------------------------------------
/**
Generate TC Matrix by apply warshal algorithm on the input graph,
and generate the distences between vertices by apply floyd algorith
@methodOf Graph#
@author Afnan Balghaith
@return {integer [][]} zeros and ones for TC, nonnegative number for distances.
*/

function warshallFloydImpl()
{
// copy the content of adjMatrix row by row to RW & RF arrays
for (var i = 0; i < this.nv; i++)
{
	this.RW[i] = this.adjMatrix[i].slice();
	this.RF[i] = this.adjMatrix[i].slice();
}
//--------------------------------------
// set Infinity in RW matrix if there is no a direct path between two vertcies 
for (var j = 0; j < this.nv; j++)
{
	for (var k = 0; k < this.nv; k++)
	{
		/*since the digonal of distance matrix is always zere,
		 so we have to test the elements of the matrix
		that isn't in digonal line and its zero, so we change it value by Infinity
		 in order to apply a floyd algorithm on the graph */
		if (this.RF[j][k] == 0 && j != k)
			this.RF[j][k] = Infinity;
	}
}
//---------------------------
//start applying warshal-floyd algorithm on the graph
for (var k = 0; k < this.nv; k++)
{
	for (var i = 0; i < this.nv; i++)
	{
		for (var j = 0; j < this.nv; j++)
		{
			//warshal algoritn]m apply on the digraph, so should first check if digraph or no
			if (this.digraph)
			{
				/* applying warshal's rule by update the values of RW[i][j] elements with 1
				if and only if the value of RW[i][j] in the pervios stage is one or the value 
				RW[i][k] & RW[k][j]) equal one, otherwise the value will be zero
				where is k is the number of the pervios stage, meaning if we are in the second stage, k=1 and so on */
				this.RW[i][j] = (this.RW[i][j] || (this.RW[i][k] && this.RW[k][j])) ? 1 : 0;

			}
			//floyd algorithm apply only wieghted and connected graph, no matter if is directed or no
			if (this.weighted && this.isConnected)
			{
				/* applying floyd's rule by update the values of  RF[i][j]elements with shortest path
				if RF[i][j] has smallest value, the element won't change otherwisw if the calculation of
				RF[i][k]+RF[k][j] generate smallest value then RF[i][j] value will update
				note: k is the value of the pervios stage, meaning if we are in the second stage, k=1 and so on.*/
				this.RF[i][j] = Math.min(this.RF[i][j], (this.RF[i][k] + this.RF[k][j]));
			}
		}
	}
}
}
/**
Generate transitive closure matrix based on dfs traversal
@methodOf Graph#
@author Afnan Balghaith
@return {integer [][]} fill the index [i][j] by 1 if there is a direct or undirect path between two vertices,
otherwise fill it by 0.
*/
function dfsTCImpl()
{

for (var i = 0; i < this.nv; i++)
{
	//make all the vertices unvisited, before perform dfs to them.
	this.vert[i].visit = false;
	// initially create row elements and zero the tcMat Matrix		
	this.tcMat[i] = [];
	for (var j = 0; j < this.nv; j++)
	{
		this.tcMat[i][j] = 0;
	}
	//----------------------------
	//get vertx v
	var v = this.vert[i];
	//process vertices adjacent to v
	var w = v.adjacentByID();
	var m = w.length;

	for (var k = 0; k < m; k++)
	{
		//send each adjacent of vertex v to the dfs method
		this.dfs(w[k]);
	}
	//---------------------------
	for (var a = 0; a < this.nv; a++)
	{
		//check each vertx if it became visited, which dfs perform on it
		//and its in the dfs_push array, set it by one.
		if (this.vert[a].visit)
			this.tcMat[i][this.dfs_push[a]] = 1;
	}
}


}
/**
finding a minimum spanning tree by apply the prim algorithm,
@methodOf Graph#
@author Afnan Balghaith
@return {object[], object, object, integer} 
*/
function primIml()
{

var VT = [], // Tree vertices contian set of visited vertices
	ET = []; // composing MSTs of the graph, with all information of edges and weights
var u; //u*
/*reset all the vertices as unvisited to apply the prim on it.
to distinguish Tree vertices.*/
for (var i = 0; i < this.nv; i++)
{
	this.vert[i].visit = false
}
//initialize the tree vertices with any vertex
var v = this.vert[0];
VT[0] = v;
//make it visited
v.visit = true;
/*initialize this variable with infinity so that can be used to compare it with weight,
since it will be always larger, it can detect the min.*/
var minEdge = Infinity;
//ﬁnd a minimum-weight edge e∗=(v∗,u ∗) among all the edges (v, u)
for (var k = 1; k < this.nv; k++)
{
	for (var i = 0; i < VT.length; i++)
	{
		var adjE = VT[i].incidentEdge();
		for (var j = 0; j < adjE.length; j++)
		{
			//check if the remain vertix is not visited yet, and its weight less than the minEdge 
			if (!this.vert[adjE[j].adjVert_i].visit && adjE[j].edgeWeight <= minEdge)
			{
				minEdge = adjE[j].edgeWeight; //set new value for minEdge by value less than it
				v = VT[i]; // keep value of v value of VT[i].
				u = this.vert[adjE[j].adjVert_i]; //update the value of u by the vertex which has the min weight.
			}
		}
	} //end for searching a minimum-weight edge 
	//this.cost+=minEdge; //count the cost of distances to make sure prim work well
	VT[VT.length] = u; //insert u to the tree vertices
	u.visit = true; //make it visited
	//insert the edge and the new vertex to edges array
	ET[ET.length] = {
		v: v,
		u: u,
		e: minEdge
	};
	minEdge = Infinity; //reset to Infinity for the next searching
}
return ET;
}
// -----------------------------------------------------------------------
// published docs section (ref. assignment page)
// for this section, strip line comments (leave outline)
// no JSDOC comments in this section
// -----------------------------------------------------------------------

function better_input(v, e)
{
// set number of vertices and edges fields
this.nv = v.length;
this.ne = e.length;
//check weighted or not
if (!(e[0].w === undefined))
{
	this.weighted = true;
}

// input vertices into internal vertex array
var i;
for (i = 0; i < this.nv; i++)
{
	this.vert[i] = new Vertex(v[i]);
}

// input vertex pairs from edge list input array
// remember to pass vertex ids to add_edge() 
var j;
for (j = 0; j < this.ne; j++)
{
	if (this.weighted)
	{
		this.addEdge(e[j].u, e[j].v, e[j].w);
	}
	else
	{
		this.addEdge(e[j].u, e[j].v);
	}


}



// double edge count if graph undirected 
if (!this.digraph)
{
	this.ne = 2 * this.ne;
}
}
// -----------------------------------------------------------------------
// -----------------------------------------------------------------------
// --- begin student code section ----------------------------------------
function topoSearchImpl(fun)
{
// mark all vertices unvisited
for (var i = 0; i < this.nv; i++)
{
	this.vert[i].visit = false;
}

// traverse unvisited connected components
for (var i = 0; i < this.nv; i++)
{

	if (!this.vert[i].visit)
	{
		this.deterDFS === 'd' ? (this.dfs(i), fun++) : (this.bfs(i));
	}
}
return fun;
}

// --------------------
/*@deprecated First implementation - obsolete. 
Use {@link #addEdgeImpl2} instead.*/
function addEdgeImpl(u_i, v_i)
{
// fetch vertices using their id, where u: edge source vertex, v: target vertex 
var u = this.vert[u_i];
var v = this.vert[v_i];

// insert (u,v), i.e., insert v (by id) in adjacency list of u
var e = new edge();
e.target_v = v_i;
u.adjacent.insert(e);


// insert (v,u) if undirected graph (repeat above but reverse vertex order)
if (!this.digraph)
{
	var e = new edge();
	e.target_v = u_i;
	u.adjacent.insert(e);
}

}
// --------------------
function addEdgeImpl2(u_i, v_i, weight)
{
// fetch vertices using their id, where u: edge source vertex, v: target vertex
var u = this.vert[u_i];
var v = this.vert[v_i];

// insert (u,v), i.e., insert v in adjacency list of u
// (first create edge object using v_i as target, then pass edge object)
if (weight != undefined)
{

	u.insertAdjacent(v_i, weight);
}
else
{

	u.insertAdjacent(v_i);
}

// insert (v,u) if undirected graph (repeat above but reverse vertex order)
if (!this.digraph)
{

	if (weight != undefined)
	{

		v.insertAdjacent(u_i, weight);
	}
	else
	{

		v.insertAdjacent(u_i);
	}
}




}

// --------------------
function bfsImpl(v_i)
{
// get vertex v by its id
var v = this.vert[v_i];

// process v 
v.visit = true;
this.bfs_order[this.bfs_order.length] = v_i;
// initialize queue with v
var q = new Queue();
q.enqueue(v);

// while queue not empty
while (!q.isEmpty())
{

	// dequeue and process a vertex, u
	var u = q.dequeue();
	var w = u.adjacentByID(); //.adjacent.traverse();
	var m = w.length;
	// queue all unvisited vertices adjacent to u
	for (var i = 0; i < m; i++)
	{
		if (!this.vert[w[i]].visit)
		{
			this.vert[w[i]].visit = true;
			q.enqueue(this.vert[w[i]]);
			this.bfs_order[this.bfs_order.length] = w[i];

		}
	}
}

}


// --------------------
function dfsImpl(v_i)
{
// process vertex
var v = this.vert[v_i];
v.visit = true;
this.dfs_push[this.dfs_push.length] = v_i;

// recursively traverse its unvisited adjacent vertices 
var w = v.adjacentByID();
for (var i = 0; i < w.length; i++)
{

	if (!this.vert[w[i]].visit)
	{
		this.dfs(w[i]);
	}
}

}

// --------------------
//@deprecated Use {@link #makeAdjMatrixImpl2} instead.
function makeAdjMatrixImpl()
{

// initially create row elements and zero the adjacncy matrix
for (var i = 0; i < this.nv; i++)
{
	this.adjMatrix[i] = [];
	for (var j = 0; j < this.nv; j++)
	{
		this.adjMatrix[i][j] = 0;
	}

	// for each vertex, set 1 for each adjacency
	var v = this.vert[i];
	var w = v.v.adjacent.traverse();;
	var m = w.length;
	var weight_ed = v.adjacent.traverse();
	for (var k = 0; k < m; k++)
	{
		this.weighted ? this.adjMatrix[i][w[k]] = weight_ed[k].weight : this.adjMatrix[i][w[k]] = 1;
	}
}
}
// --------------------
function makeAdjMatrixImpl2()
{
for (var i = 0; i < this.nv; i++)
{
	// initially create row elements and zero the adjacncy matrix
	var v = this.vert[i];
	this.adjMatrix[i] = [];

	for (var j = 0; j < this.nv; j++)
	{
		this.adjMatrix[i][j] = 0;
	}
	// for each vertex, set 1 or weight (if weighted graph) for each adjacency
	var w = v.incidentEdge();

	for (var j = 0; j < w.length; j++)
	{

		var adjID = w[j].adjVert_i;
		this.weighted ? this.adjMatrix[i][adjID] = w[j].edgeWeight : this.adjMatrix[i][adjID] = 1;
	}
}



}
// --------------------
function printGraphImpl()
{
document.write("GRAPH ", "{", this.label, "} ", this.digraph ? "" : "UN", "DIRCTED", " - ", this.nv,
	" VERTICES, ", this.ne, " EDGES:<br><br>");
document.write("<p>", this.componentInfo(), "</p>");
var v;
for (var i = 0; i < this.nv; i++)
{
	v = this.vert[i];
	document.write("VERTEX: ", i, v.vertexInfo(), "<br>");
}

}
// --------------------
function isConnectedImpl()
{
return this.connectedComp == 1;
}
// --------------------
function componentInfoImpl()
{
if (this.isConnected())
	return "CONNECTED ";
else if (this.connectedComp > 1)
	return "DISCONNECTED " + this.connectedComp;
else
	return "no connectivity info";
}
// --------------------

function adjacentByIdImpl()
{
var adj = this.adjacent.traverse();
for (var i = 0; i < adj.length; i++)
{
	adj[i] = adj[i].target_v;
}
return adj;

}
// --------------------
function insertAdjacentImpl(v_i, weight)
{
if (weight != undefined)
{

	var edge = new Edge(v_i, weight);
	this.adjacent.insert(edge);

}
else
{

	edge = new Edge(v_i);
	this.adjacent.insert(edge);
}
}
// --------------------
function vertexInfoImpl()
{

return (" {" + this.label + "} - VISIT: " + this.visit +
	" - ADJACENCY: " + this.adjacentByID());

}

//---------------------------
function incidentEdgeImpl()
{
var edge = [];
var adj = this.adjacent.traverse();
for (var i = 0; i < adj.length; i++)
{
	edge[i] = {
		adjVert_i: adj[i].target_v,
		edgeLabel: "",
		edgeWeight: adj[i].weight
	};
}

return edge;
}