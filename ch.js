// CPCS 324 Algorithms & Data Structures 2
// Graph Data Structure Demo - Reorganized Final Version
// 2013, Dr. Muhammad Al-Hashimi
// -----------------------------------------------------------------------
// simple graph object with linked-list edge implementation and minimal fields
// extra vertex and edge property fields to be added later as needed
//
var _v = [],
    _e = []; // globals used by standard graph reader method




// -----------------------------------------------------------------------
// graph caller function - sort of main() for caller page
// called directly, or on load success event of some input file

function main_graph() {
    // create a graph (default undirected)
    var g = new Graph();

    // set properties
    g.label = "Figure 8.14 (Levitin, 3rd edition)";

    // if g is directed (digraph) change property BEFORE input
    // g.digraph = true;

    // use global input arrays _v and _e to initialize its internal data structures
    g.read_graph(_v, _e);

    // use print_graph() method to check graph
    g.print_graph();

    // we send a piece of graph, so init number of connected pieces to 1 
    g.connected = 1;


    // perform depth-first search and output stored result
    g.DFS();
    document.write("<p>", "DFS : ", g.dfs_push, "</p>");
    document.write("<p>", " Pop Order : ", g.dfs_pop, "</p>");



    // Perform floyd algorithm to the graph g to find the shortes path
    var W = read_weight(_e);
    document.write("<p>", "Weight matrix : ", W, "<br>", "</p>"); // print of weight matrix
    document.write("<p>", "Distance Matrix : ", g.floyd(W), "<br>", "</p>"); // print of distance matrix


    // creat the adjacent matrix 
    document.write("<p>", "Adjacency matrix : ", g.adjMatrix(), "<br>", "</p>"); // print of adjacency matrix

    // Perform transitive clouser algorithm
    document.write("<p>", "DFS based transitive closure : ", g.DFS_transitive_closure(), "<br>", "</p>"); // print of DFS based transitive closure

    // Test Connectivity
    document.write("<p>", "Connectivity : ", g.isConnected(), "<br>", "</p>"); // print of graph connectivity 

}

// -----------------------------------------------------------------------
// Vertex object constructor

function Vertex(v) {
    // user input fields

    this.label = v.label; // vertex can have label, example: a, v1, jeddah

    // more fields to initialize internally

    this.visit = false; // vertex can be marked visited (useful for traversals)
    this.adjacent = new List(); // head pointer of adjacency linked list
}
// -----------------------------------------------------------------------
// Edge object constructor

function Edge(e) {
    // user input fields
    this.label = e.v + "-" + e.u;
    this.v = e.v; // vertex can have label, example: a, v1, jeddah
    this.u = e.u;
    this.weight = e.w;
    
    // more fields to initialize internally

    // this.visit = false; // Edge can be marked visited (useful for prim's algorithm)
    // this.e_adjacent = new List(); // head pointer of adjacency linked list ( to find the next unvisited edge to the current edge + the weight)

}

// -----------------------------------------------------------------------
// Graph object constructorv cv cvb  cvx bbbbc

function Graph() {
    this.vert = new Array(); // vertex list: array of Vertex objects
    this.nv; // number of vertices
    this.ne; // number of edges
    this.dfs_push = []; // DFS traversal order output array
    this.digraph = false; // true if digraph, false otherwise (default undirected)
    this.label = ""; // identification string to label graph

    // --------------------
    // student property fields next
    this.edge = new Array(); // edge list : array of edge objects
    this.connected = -1; // number of connected graph pieces 
    this.dfs_pop = []; // DFS pop-order output array
    this.dfs_pop_counter = 0; // increment of dfs_pop variable

    // --------------------
    // member methods use functions defined below

    this.read_graph = better_input; // default input reader method   
    this.add_edge = add_edge;
    this.print_graph = print_graph;
    this.list_vert = list_vert;

    // --------------------
    // student methods next; actual functions in student code section at end

    this.DFS = DFS;
    this.dfs = dfs;
    this.read_weight = read_weight;
    this.floyd_warshall = floyd_warshall;
    this.adjMatrix = adjMatrix;
    this.DFS_transitive_closure = DFS_transitive_closure;
    this.isConnected = isConnected;
    this.prim = prim;



}


// -----------------------------------------------------------------------
// method functions used by Graph object
// similar to other functions but use object member fields and methods depending
// on which object is passed by method call through "this"
//-------------------------


// adding an edges between 2 verteces in the graph 
function add_edge(u_i, v_i) {
    // fetch vertices using their id
    var u = this.vert[u_i],
        v = this.vert[v_i];

    u.adjacent.insert(v_i); // insert (u,v), i.e., insert v (by id) in adjacency list of u

    if (!this.digraph) {
        v.adjacent.insert(u_i); // insert (v,u) for undirected graph
    }
}

// --------------------
// printing the graph information
function print_graph() {
    document.write("<p>GRAPH {", this.label, "} ", this.digraph ? "" : "UN", "DIRECTED - ", this.nv, " VERTICES, ",
        this.ne, " EDGES:</p>");
    this.list_vert();
}

// --------------------
// printing each graph vertex and its adjacents 
function list_vert() {
    var i, v; // local vars
    for (i = 0; i < this.nv; i++) {
        v = this.vert[i];
        document.write("VERTEX: ", i, " {", v.label, "} - VISIT: ", v.visit,
            " - ADJACENCY: ", v.adjacent.traverse(), "<br>");
    }
}

// --------------------
//
function better_input(v, e) // default graph input method
{
    this.nv = v.length; // note v,e here are local (passed parameters, not global input arrays)
    this.ne = e.length;

    var i;

    for (i = 0; i < this.nv; i++)
        this.vert[i] = new Vertex(v[i]); // add new input vertex to internal vertex list

    for (i = 0; i < this.ne; i++) {
        this.edge[i] = new Edge(e[i]);
        this.add_edge(e[i].u, e[i].v);
    }
    if (!this.digraph) this.ne *= 2; // double edge count if graph undirected 
}

// -----------------------------------------------------------------------
// utility functions used by Graph object method functions

function old_input(v) // DON'T USE - to illustrate a point
{
    this.nv = v.length;
    this.ne = 0;

    var i;
    for (i = 0; i < this.nv; i++) {
        // add new input vertex to object vertex list
        this.vert[i] = new Vertex(v[i]);

        if (v[i].adj) // is true only if variable is assigned value
        {
            // if vertex has adjacent vertices then collect their id in array a, 
            // and insert the id in its adjacency list

            var a = v[i].adj.split("|"),
                m = a.length;
            for (var j = 0; j < m; j++)
                this.vert[i].adjacent.insert(a[j]);

            // update number of edges
            this.ne += m;
        }
    }
}


// -----------------------------------------------------------------------
// -----------------------------------------------------------------------
// --- begin student code section ----------------------------------------


function DFS() {
    /** input : a graph
     *  output : list vertices in DFS order
     */

    this.connected++; // increment the number of pieces  
    alert(this.connected);
    for (var i = 0; i < this.nv; i++) // mark unvisited
        this.vert[i].visit = false;

    for (var i = 0; i < this.nv; i++) // iteration implied
        if (this.vert[i].visit === false) this.dfs(i);

}

// --------------------
function dfs(v_i) {
    /** input : a vertex
     * output : recursively unvisted verteces connected to v
     */

    var v = this.vert[v_i]; // init vertex v
    v.visit = true; // mark visited
    this.dfs_push[this.dfs_push.length] = v_i; // push the index into stack 

    var w = v.adjacent.traverse(),
        m = w.length; // init the adjacent list to w, and its length to m

    // visit every node connected to v recursively 	
    for (var i = 0; i < m; i++) {
        if (this.vert[w[i]].visit === false) // checking unvisited adjacents 
            this.dfs(w[i]);
    }

    //-----------pop order--------------
    this.dfs_pop[this.dfs_pop_counter] = v_i; //insert the node index into pop array 
    this.dfs_pop_counter++; // increment pop array counter
}
//---------------------

function isConnected() // Testing connectivity of the graph
{
    if (this.connected == 1) return "The graph is connected !";
    else return "The graph is not connected and it has " + this.connected + " pieces !";
}
//---------------------

function read_weight(e) // Put the weight input as a matrix
{
    /** input : graph edges
     * output : a matrix of weights between edges
     */

    var W = [
        [],
        [],
        [],
        []
    ]; // matrix of weight

    // init the matrix by zero and infinity
    for (var i = 0; i < W.length; i++)
        for (var j = 0; j < W.length; j++) {
            if (i == j) // if the edge from a vertex to itself
                W[i][j] = 0;
            else
                W[i][j] = Infinity;
        }

    // pushing the weights in the weight matrix
    for (var i = 0; i < e.length; i++)
        W[e[i].u][e[i].v] = e[i].w;



    return W;
}
// --------------------

function floyd_warshall(w) {

    // Implement Floyd's algorithm for finding the shortes path problem
    /** input : the weight matrix w of a graph with no negative length cycle
     * output : the distance matrix of the shortes path's lengths
     */

    // & Implement Warshall's algorithm for computing transitive closure
    /** input : the link list of graph verteces
     * output : the transitive matrix of the graph based on DFS
     */

    var out = [],
        r = w;

    for (var k = 0; k < w.length; k++)
        for (var i = 0; i < w.length; i++)
            for (var j = 0; j < w.length; j++) {
                w[i][j] = Math.min(w[i][j], (w[i][k] + w[k][j]));
                r[i][j] = r[i][j] + r[i][k] * r[k][j];

            }

    out[0] = w;
    out[1] = r;

    return out;
}
//------------------------

function adjMatrix() // the function of Adjency_Matrix
{
    /** input : the link list of graph verteces
     * output : the adjacency matrix of the graph (link list verteces)
     */

    var adjMatrix = new Array(this.nv),
        m, n; // defining local variables used for iteratevs 
    for (var i = 0; i < this.nv; i++) {
        adjMatrix[i] = new Array(this.nv); // creating the matrix .

        for (var j = 0; j < this.nv; j++) // init AdjencyMatrix array  with 0s
            adjMatrix[i][j] = 0;
    }
    for (var k = 0; k < this.nv; k++) {
        m = this.vert[k].adjacent.traverse(); // adjacency vetreces.
        n = m.length; // length of adjacent verteces.

        for (i = 0; i < this.nv; i++)
            for (j = 0; j < n; j++)
                if (i == m[j]) // check the visistng adjacency 
                    adjMatrix[k][i] = 1; // if it is visit put 1 in the visiting position.

    }

    return adjMatrix;

}
//------------------------------

function DFS_transitive_closure() // find transitive closure matrix based on DFS
{

    /** input : the link list of graph verteces
     * output : the transitive matrix of the graph based on DFS
     */

    var T = [],
        w; // defining local variables 

    for (var i = 0; i < this.nv; i++) // init matrix with 0s 
    {
        T[i] = new Array(this.nv);
        for (var j = 0; j < this.nv; j++)
            T[i][j] = 0;
    }

    for (var i = 0; i < this.nv; i++) // begin transitive closure
    {
        this.dfs(i); // push into dfs
        w = this.vert[i].adjacent.traverse(); // traverse the adjacent

        for (var j = 0; j < w.length; j++) {
            if (this.vert[w[j]].visit) // check visiting
                for (var k = 0; k < T.length; k++)
                    T[i][k] = 1; // assign it as an adjacent

        }
    }

    return T;
}
//---------------

function prim() //Primâ€™s algorithm for constructing a minimum spanning tree
{
    /** Input: A weighted connected graph 
     * Output: the set of edges composing a minimum spanning tree of G
     */

    var v_i, e = [],
        min = 100; //the set of tree vertices can be initialized with any vertex 

    for (var i = 0; i < this.nv; i++) {
        v_i = i;
        //find a minimum-weight edge eâˆ— = (vâˆ—, uâˆ—) among all the edges (v, u) such that v is in VT and u is in Vâˆ’VT
        for (var j = 0; j < v.adjacent.length; j++) {
            if (this.edge[j].weight < min && this.vert[v_i].visit != true)
                e[j] = v_i;
        }

    }
    return e;
}
