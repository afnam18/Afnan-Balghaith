// CPCS 324 Algorithms & Data Structures 2
// Graph data structure starter - Transitive Closure Package (NEW)
// 2016, Dr. Muhammad Al-Hashimi
// -----------------------------------------------------------------------
// NAME : Shefaa Saad Mubarak Omar
// ID: 1340996
// SECTION: ZAR
// ATTENTION PLEASE -Kindly if you wish- :
// *** Why did I decide to re-submit my code? ***
// The code was and still almostly OK alhamdullah, the problem was that I miss one line in the output (no connectivity info)!
// -----------------------------------------------------------------------
// Simple graph data type implementation with a basic set of
// property fields and operations. More graph, vertex, and edge properties and
// operations will be added later as needed.

var v = [],
e = []; // globals used by standard graph reader method

var v2 = [],
e2 = []; // for second graph

var v3 = [],
e3 = []; // for third graph

// -----------------------------------------------------------------------

function main_graph() {
// create a graph (default undirected)
var g = new Graph(); // for figure 8.4 - 1
var g2 = new Graph(); // for figure 8.4 - 7
var g3 = new Graph(); // for ksa12city

// set graph properties
g.label = "Exercise 8.4: 1 (Levitin, 3rd edition)";
g.digraph = true;
g2.label = "Exercise 8.4: 7 (Levitin, 3rd edition)";
g2.digraph = true;
g3.label = "KSA 12 cities";
//g3.digraph = true;  // use it if graph is digraph

// use global input arrays _v and _e to initialize its internal data Structures
g.read_graph(v, e);
g2.read_graph(v2, e2);
g3.read_graph(v3, e3);

// use print_graph() method to check graph
g.print_graph();
g.makeAdjMatrix();
g2.makeAdjMatrix();
g3.makeAdjMatrix();

// perform depth-first search and output stored result
g.topoSearch("DFS");
document.write("<p>", "dfs_push: ", g.dfs_push, "</p>");

// same in g2 and g3
g2.topoSearch("DFS");
g3.topoSearch("DFS");

// check graph connectivity (dis/connecnted)
document.write("<p>", g.connectInfo(), "</p>");

// perform breadth-first search and output stored result


// Transitive Closure matrix using DFS-based algorithm
document.write("<p>", "TC matrix by DFS: ", "</p>");
g.dfsTC();

// Transitive closure and distance matrix in one step by warshallFloyd
document.write("<p>", "TC matrix by  Warshall-Floyd: ", "</p>");
var warshallFloyedMatrix = g.warshallFloyd();
var TC = warshallFloyedMatrix[0];
// Printing TC matrix by Warshall algorithm
if (g.digraph)
    for (var i = 0; i < g.nv; i++)
        document.write("<p>", TC[i], "</p>");

// check DAG graph property
document.write("<p>DAG: ", g.isDAG(), "</p>");

// Transitive closure and distance matrix in one step by warshallFloyd
document.write("<p>", "TC matrix by Warshall-Floyd Exercise 8.4: 7 ", "</p>");
var warshallFloyedMatrix = g2.warshallFloyd();
var TC = warshallFloyedMatrix[0];
var distance = warshallFloyedMatrix[1];

// Printing TC matrix by Warshall algorithm
if (g2.digraph)
    for (var i = 0; i < g2.nv; i++)
        document.write("<p>", TC[i], "</p>");

// Printing shortest distance matrix by Floyd algorithm
document.write("<p>Distance matrix Exercise 8.4: 7 </p>");

if (g2.weighted)
    for (var i = 0; i < g2.nv; i++)
        document.write("<p>", distance[i], "</p>");

// check DAG graph property
document.write("<p>DAG Exercise 8.4: 7 </p>", g2.isDAG(), "</p>");

var mst = g3.prim();
document.write("MST for ", g3.label, "</p>");
for (var i = 0; i < mst.length; i++) {
    (mst[i].label2 == undefined) ?
        document.write("VERTEX: {", mst[i].label1, "}   -   EDGE: (-,-)   -    COST: -", "</p>") :
        document.write("VERTEX: {", mst[i].label2, "}   -   EDGE: (", mst[i].label1, ",", mst[i].label2, ")    -   COST: ", mst[i].edge, "</p>");
}
}

// -----------------------------------------------------------------------

function Vertex(v) {

// user input fields
this.label = v.label;

// more fields to initialize internally
this.visit = false;
this.adjacent = new List();

// --------------------
// member methods use functions defined below

this.adjacentByID = adjacentByIdImpl;
this.incidentEdge = incidentEdgeImpl;
this.vertexInfo = vertexInfoImpl;


// --------------------
// student property fields next


// --------------------
// student methods next; actual functions in student code sections

}

// -----------------------------------------------------------------------

function Edge(vert_i, weight) {

// user input fields
this.target_v = vert_i;
this.weight = null;
if (weight != undefined)
    this.weight = weight;

// --------------------
// student property fields next


// --------------------
// student methods next; actual functions in student code sections

}


// -----------------------------------------------------------------------
/**
@constructor
*/
function Graph() {

this.vert = new Array();
this.nv = 0;
this.ne = 0;
this.digraph = false;
this.weighted = false;
this.dfs_push = [];
this.bfs_order = [];
this.label = "";
this.connectedComp = 0;
this.adjMatrix = [];

// --------------------
// member methods use functions defined below (HERE reference API methods of basic ADT implementation)

this.read_graph = better_input;
this.add_edge = add_edgeImpl2;
this.print_graph = print_graphImpl;
this.make_graph = make_graphImpl;
this.makeAdjMatrix = makeAdjMatrixImpl2;
this.connectInfo = reportConnectivity;
this.isConnected = isConnectedImpl;
this.topoSearch = topoSearchImpl;
this.dfs = dfsImpl;
this.bfs = bfsImpl;

// --------------------
// student property fields next


// --------------------
// student methods next; actual functions in student code sections

// transitive closure package (starter comments to be changed to JSDOC format)

/** @description Member method - check path existance between two vertices */
this.hasPath = hasPathImpl; // boolean, true if path exists between vertices v_i, v_j in digraph

/** @description Member method - return shortest path between two vertices */
this.shortestPath = shortestPathImpl; // return length of shortest path between v_i, v_j in weighted graph 

/** @description Member method - check wether graph is DAG */
this.isDAG = isDAGImpl; // boolean, true if acyclic digraph

/** @description Member method - Warshall and Floyd algorithm - generate TC and distance matricies */
this.warshallFloyd = warshallFloydImpl; // inserts .tc field in adjacency matrix if digraph, and .dist if weighted

/** @description Member method - generate TC matrix */
this.dfsTC = dfsTCImpl; // return TC matrix for digraph 

// ... rest of your non reference API methods

/** @description Member method - generate MST of graph */
this.prim = primImpl;


}


// -----------------------------------------------------------------------
// functions used by methods of Graph and subsidiary objects
// similar to other functions but use object member fields and methods depending
// on which object is passed by method call through "this"
// -----------------------------------------------------------------------

function better_input(v, e) {
// set number of vertices and edges fields
this.nv = v.length;
this.ne = e.length;

if (e[0].w != undefined) { //testing the first edge if it has weight to make graph weighted
    this.weighted = true;
}

// input vertices into internal vertex array
for (var i = 0; i < this.nv; i++) {
    //First; send the object to Vertex constructor to set all its fields
    //then add it to the new array to be ready for printing!
    this.vert[i] = new Vertex(v[i]);
}

// input vertex pairs from edge list input array
// remember to pass vertex ids to add_edge()

for (var j = 0; j < this.ne; j++) {
    if (this.weighted)
        this.add_edge(e[j].u, e[j].v, e[j].w);
    else
        this.add_edge(e[j].u, e[j].v);
}


// double edge count if graph undirected 
if (!this.digraph)
    this.ne = this.ne * 2;

}

// --------------------

function add_edgeImpl2(u_i, v_i, weight) {
// fetch vertices using their id, where u: edge source vertex, v: target vertex
var u = this.vert[u_i];
var v = this.vert[v_i];


// insert (u,v), i.e., insert v in adjacency list of u
// (first create edge object using v_i as target, then pass edge object)
var edge = new Edge(v_i, weight);
u.adjacent.insert(edge);


// insert (v,u) if undirected graph (repeat above but reverse vertex order)
if (!this.digraph) {
    var edge = new Edge(u_i, weight);
    v.adjacent.insert(edge);
}

}

// --------------------
function print_graphImpl() {
document.write("<p>GRAPH {", this.label, "} ", this.weighted ? "WEIGHTED, " : "", this.digraph ? "" : "UN", "DIRECTED - ",
    this.nv, " VERTICES, ", this.ne, " EDGES:</p><p>", this.connectInfo(), "</p>");

// list vertices	
for (var i = 0; i < this.nv; i++) {
    var v = this.vert[i];
    document.write("VERTEX: ", i, v.vertexInfo(), "<br>");
}
}

// --------------------
function vertexInfoImpl() {
return " {" + this.label + "} - VISIT: " + this.visit + " - ADJACENCY: " + this.adjacentByID();
}
//----------------------------

function makeAdjMatrixImpl2() {
// (note pattern) for each vertex id
for (var i = 0; i < this.nv; i++) {

    // get vertex v
    var v = this.vert[i];

    // create and init the corresponding row
    this.adjMatrix[i] = [];

    for (var j = 0; j < this.nv; j++) {
        this.adjMatrix[i][j] = 0;
    }

    // process vertices adjacent to v: get incident edge nodes
    var adj = v.incidentEdge();

    for (var j = 0; j < adj.length; j++) {

        // for each node, use target id field to set matrix value
        var adjID = adj[j].adjVert_i;
        if (!this.weighted) {
            this.adjMatrix[i][adjID] = 1;
        }
        else {
            this.adjMatrix[i][adjID] = adj[j].edgeWeight;
        }
    }
}
}

// ... fill (HERE reference API IMPL-functions of basic ADT implementation)
// -----------------------------------

/**
@deprecated
*/
function makeAdjMatrixImpl() {

// for each vertex, set 1 for each adjacency
for (var i = 0; i < this.nv; i++) {
    this.adjMatrix[i] = [];
    for (var j = 0; j < this.nv; j++) {
        this.adjMatrix[i][j] = 0;
    }
    var adj = this.vert[i].adjacent.traverse(); //array of Edge objects
    for (var j = 0; j < adj.length; j++) {
        var adjID = adj[j].target_v;
        if (!this.weighted) {
            this.adjMatrix[i][adjID] = 1;
        }
        else {
            this.adjMatrix[i][adjID] = adj[j].weight;
        }
    }
}

}
// --------------------

function topoSearchImpl(fun) {

// mark all vertices unvisited
for (var i = 0; i < this.nv; i++) {
    this.vert[i].visit = false;
}
this.connectedComp = 0; //reset the counter of component before start search
this.dfs_push = [];
this.bfs_order = [];
// traverse a connected component
for (var i = 0; i < this.nv; i++) {
    var v = this.vert[i];
    if (!v.visit) {
        this.connectedComp++;
        if (fun == "DFS") {
            this.dfs(i);
        }
        else
            this.bfs(i);
    }
}


return this.connectedComp;

}
// ------------------------------

function DFSImpl() {
// mark all vertices unvisited
for (var i = 0; i < this.nv; i++) {
    this.vert[i].visit = false;
}

// traverse a connected component
for (var i = 0; i < this.nv; i++) {
    var v = this.vert[i];
    if (!v.visit) {

        this.dfs(i);
    }
}
}

// ------------------------------

function dfsImpl(v_i) {
// process vertex
var v = this.vert[v_i];
v.visit = true;
this.dfs_push[this.dfs_push.length] = v_i;

// recursively traverse its unvisited adjacent vertices 
var w = v.adjacentByID(); //create an array from the adjecent list
for (var i = 0; i < w.length; i++) {
    if (this.vert[w[i]].visit) {
        //this.isDAG = false;
    }
    if (!this.vert[w[i]].visit) {
        this.dfs(w[i]);
    }
}

}

// -----------------------------

function BFSImpl() {
// mark all vertices unvisited
for (var i = 0; i < this.nv; i++) {
    this.vert[i].visit = false;
}

// traverse a connected component
for (var i = 0; i < this.nv; i++) {
    var v = this.vert[i];
    if (!v.visit) {
        this.bfs(i);
    }

}
}

// -----------------------------

function bfsImpl(v_i) {
// process v (using its id)
var v = this.vert[v_i];
v.visit = true;

// initialize queue with v
var queue = new Queue();
queue.enqueue(v_i);

// while queue not empty
while (!queue.isEmpty()) {
    // dequeue and process a vertex, u
    var u = queue.dequeue();
    this.bfs_order.push(u); //output the vertex's id after dequeue it.

    // queue all unvisited vertices adjacent to u
    var w = this.vert[u].adjacentByID();
    for (var i = 0; i < w.length; i++) {
        var x = this.vert[w[i]];
        if (!x.visit) {
            x.visit = true;
            queue.enqueue(w[i]);
        }
    }
}
}

// -----------------------------------

function reportConnectivity() {
var str = "";
if (this.isConnected()) {
    str = "CONNECTED";
}
else {
    if (this.connectedComp == 0)
        str = "no connectivity info";
    else
        str = "DISCONNECTED " + this.connectedComp;
}
return str;
}

//--------------------------------

function isConnectedImpl() {
return (this.connectedComp == 1);
}

// ------------------------------

function adjacentByIdImpl() {

var out = this.adjacent.traverse(); //return array of Edges

for (var i = 0; i < out.length; i++)
    out[i] = out[i].target_v;

return out;

}

// -----------------------------

function incidentEdgeImpl() {
var edges = [];
var adj = this.adjacent.traverse();
for (var i = 0; i < adj.length; i++) {
    edges[i] = {
        adjVert_i: adj[i].target_v,
        edgeLabel: "",
        edgeWeight: adj[i].weight
    };
}

return edges;

}

function make_graphImpl() {

}

// -----------------------------------------------------------------------
// begin student code section 
// (anything after the stuff described by API docs of basic ADT implementation)
// -----------------------------------------------------------------------

/**
check whether graph has cycles {@link Graph}
@methodOf Graph#
@author Shefaa Saad
@returns {Boolean} true if graph is DAG (directed acyclic graph), otherwise false.
*/
//-----------------------
function isDAGImpl() {
// use the TC matrix and check its digonal (all digonal cells are zeros -> DAG, otherwise no)
var mat = this.warshallFloyd(); // call warshallFloyd to get TC matrix
mat = mat[0]; // extract the TC matrix (warshallFloyd returns two matricies by default "TC and distance")
for (var i = 0; i < this.nv; i++) {
    // counter example needs to know if its not DAG
    if (mat[i][i] != 0) {
        return false;
    }
}
// otherwise would be DAG
return true;
}

// --------------------
/**
takes two vetices and test if these is a path between them
@methodOf Graph#
@param {integer} Input v_i : first vetrex id
@param {integer} Input v_j : second vertex id
@returns {Boolean} true if the path is exists, false if it is not exists.
*/
function hasPathImpl(v_i, v_j) {
this.dfs_push = [];
var v = this.vert[v_i];
var adj = v.adjacentByID();
for (var i = 0; i < adj.length; i++) {
    this.dfs(adj[i]);
    for (j = 0; j < this.dfs_push.length; j++) {
        if (this.dfs_push[j] == v_j) {
            return true;
        }
    }
}
return false;
}

/**
create transitive closure matrix based on DFS traversal {@link Graph}
@methodOf Graph#
@author: Shefaa Saad
@returns {integer[][]} cell contain 1 if the two vertices have path between them (transitive),
                       cell contain 0 if there is no path.
*/

//-------------------------
function dfsTCImpl() {

var tc = [];
for (var i = 0; i < this.nv; i++) {

    // create row fro each vertex
    tc[i] = []; // now we have array of arrays
    for (var j = 0; j < this.nv; j++)
        // intiate TC matrix with zeros
        tc[i][j] = 0; // fill all cells with zero

    // take the starter vertex
    var v = this.vert[i];

    // get the vertex adjacents
    var w = v.adjacentByID();

    for (var j = 0; j < w.length; j++) {
        // reset the property: visit before perform DFS on
        for (var k = 0; k < this.nv; k++) {
            this.vert[k].visit = false;
        }
        // reset the dfs output list
        this.dfs_push = [];

        // call dfs on each adjacent of vertex v
        this.dfs(w[j]);

        for (var k = 0; k < this.dfs_push.length; k++)
            // for every vertex appeas on dfs output, set 1 in cell represent vertex v and the adjacent vertex
            tc[i][this.dfs_push[k]] = 1;
    }
}

// printing the transitive closure matrix
for (var k = 0; k < this.nv; k++)
    document.write("<p>", tc[k], "</p>");
}

//-----------------------------
/**
take two vetices and accessing the distance matrix to get their shortest path {@link Graph}
@methodOf Graph#
@author: Shefaa Saad
@param {integer} Input v_i : first vetrex id
@param {integer} Input v_j : second vertex id
@returns {integer} the shortest path.

*/
function shortestPathImpl(v_i, v_j) {
// retrive the distance matrix using Floyd algorithm
var d = this.warshallFloyd();
d = d[1]; // function returns two arrays, the second one is the distance matrix

// access the desired cell
return d[v_i][v_j];

}

//-----------------------------
/**
generate the TC and distance matrix using warshall and Floyd algorithms {@link Graph}
@methodOf Graph#
@author: Shefaa Saad
@returns {integer[][]} TC: 1 / 0, Distance: non negative integer

*/
//----------------------------

function warshallFloydImpl() {
var TC = [];
var distance = [];

// copy adjacentMatrix contents to a new arrays
for (var i = 0; i < this.nv; i++) {
    TC[i] = this.adjMatrix[i].slice(0);
    distance[i] = this.adjMatrix[i].slice(0);
}


// for distance matrix, algorithm need to find Infinity in places where no direct edge there
// (instead of zero in adjacent matrix)!
if (this.weighted)
    distance = fillInfinity(distance); // set the Infinity cells in an outer helper function

for (var k = 0; k < this.nv; k++) {
    for (var i = 0; i < this.nv; i++) {
        for (var j = 0; j < this.nv; j++) {

            // Floyd should applied only for weighted connected graphs.
            // nothing about directions (digraph or not)!
            if (this.weighted && this.connectedComp == 1) {
                // Calculate the shortest path between each cell located in row i, and cell in column j, in current stage.
                distance[i][j] = Math.min(distance[i][j], (distance[i][k] + distance[k][j]));
            }

            // Warshall algorithm applied on digraphs.
            // nothing to do with weights (handle the two cases).
            if (this.digraph) {
                // For applying rule1 of Floyd;
                // TC[i][j] ==> the previuos state has 1 (in unweighted) or positive number (in weighted) NOT zero.

                //For applying rule2 of Floyd;
                // TC[i][k] and TC[k][j] (row i, column j) has to be valid distance (or 1 in Warshall (unweighted graph))


                TC[i][j] = (TC[i][j] || (TC[i][k] && TC[k][j])) ? 1 : 0; // set 1 for true results from rule1 or rule2, otherwise 0
            }
        }
    }
}

return [TC, distance];
}

//---------------------------------
/**
find the minimum spanning tree using Prim algorithm {@link Graph}
@methodOf Graph#
@author: Shefaa Saad
@returns {object[], string, string, integer}
contains label1: the source vertex id, label2: the target vertex id, edge: the weight or cost
*/

function primImpl() {
var u, v;

// the set of edges composing a MST of Graph
var ET = [];
// set of visited vertices (Tree vertices)
var VT = [];

// resert visit property of vertices to be
// used as flag of VT vertices (vetices included to the tree).
for (var i = 0; i < this.nv; i++)
    this.vert[i].visit = false;

// start the prim algorithm

// any vertex should be chosen first
v = this.vert[0];

// make it visited
v.visit = true;

// insert it to the tree vertices
VT[VT.length] = v;
ET[ET.length] = {
    label1: v.label
};

var minimumEdge;

// since graph is connected, we want to take all its vertices in the tree vertices group
while (VT.length < this.nv) { // indication that all vertices are visited

    minimumEdge = Infinity; // has to be the largest, so it can detect any value less than it. Reset it for each new vertex.
    for (var i = 0; i < VT.length; i++) {

        var adj = VT[i].incidentEdge();
        for (var j = 0; j < adj.length; j++) {

            // If vertex is from the remaining vertices (haven't visit yet)
            if (!this.vert[adj[j].adjVert_i].visit) {

                // check the edge weight between the two chosen vertices
                if (adj[j].edgeWeight < minimumEdge) { // if the new edge is the new minimum
                    minimumEdge = adj[j].edgeWeight;
                    u = this.vert[adj[j].adjVert_i]; //  set the new vertices in v,u so after the loop finished,
                    v = VT[i]; //  we can find them there for the rest of work.
                }
            }
        }

    } // end of searching loops, has a new minimum edge of new vertex to be tree vertex at the end.


    // make the new vertex a tree vertex.
    VT[VT.length] = u; // insert u at the end of the list
    u.visit = true;

    // insert the edge and new vertex info. to the edges list
    ET[ET.length] = { // I prefer to make it as object to access the properties well later.
        label1: v.label,
        label2: u.label,
        edge: minimumEdge
    };
} // end of algorithm

return ET;
}

// -------------------------------------------------
// * helper function *
/**
fill the adjacent matrix with Infinity in places where have zero on.
@author Shefaa Saad
@param {integer[][]} v[][] 2D Array of graph adjacent matrix
@returns {integer[][]} the same input array with infinities
*/
function fillInfinity(distance) {
for (var i = 0; i < distance.length; i++) {
    for (var j = 0; j < distance.length; j++) {
        // all cells that has no edge should become having Infinity
        if (distance[i][j] == 0 && i != j) { // if the cell has zero and this zero is not located in the digonal
            distance[i][j] = Infinity;
        }
    }
}
return distance;

}

// end of file