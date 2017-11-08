// CPCS 324 Algorithms & Data Structures 2
// Graph data structure demo - First Edge Object
// 2016, Dr. Muhammad Al-Hashimi
// -----------------------------------------------------------------------
// simple graph object with linked-list edge implementation and minimal fields
// extra vertex and edge property fields to be added later as needed
//
var _v = [],
    _e = []; // globals used by standard graph reader method

// -----------------------------------------------------------------------
// graph caller function - sort of main() for caller page
// called directly, or on load success event of some input file

function main_graph()
{
    // create a graph (default undirected)
    var g = new Graph();

    // set graph properties
    g.label = "Figure 3.10 (Levitin, 3rd edition)";

    // use global input arrays _v and _e to initialize its internal data structures
    g.read_graph(_v, _e);

    // use print_graph() method to check graph
    g.print_graph();

    // perform depth-first search and output stored result
    g.connectedComp = g.topoSearch(g.connectedComp);
    document.write("<p>", "dfs_push: ", g.dfs_push, "</p>");

    // report connectivity status if available
    document.write(g.connectInfo());

    // perform breadth-first search and output stored result
    g.topoCounter++;
    g.topoSearch(0);
    document.write("<p>", "bfs_order: ", g.bfs_out, "</p>");

    // output the graph adjacency matrix
    g.makeAdjMatrix();
    document.write("<p>", "first row matrix: ", g.adjMatrix[0], "</p>");
    document.write("<p>", "last row matrix: ", g.adjMatrix[g.nv - 1], "</p>");

}


// -----------------------------------------------------------------------
// Vertex object constructor

function Vertex(v)
{
    // user input fields
    this.label = v.label; // vertex can have label, example: a, v1, jeddah

    // more fields to initialize internally
    this.visit = false; // vertex can be marked visited (useful for traversals)
    this.adjacent = new List(); // head pointer of adjacency linked list

    // --------------------
    // member methods use functions defined below
    this.adjacentByID = adjacentByIdImpl;
    this.vertexInfo = vertexInfoImpl;
    this.insertAdjacent = insertAdjacentImpl;

}

// -----------------------------------------------------------------------
// Edge object constructor
function Edge(vert_i, weight)
{
    this.target_v = vert_i;
    this.weight = weight === undefined ? null : weight;
}


// -----------------------------------------------------------------------
// Graph object constructor

function Graph()
{
    this.vert = new Array(); // vertex list: array of Vertex objects
    this.nv = 0; // number of vertices
    this.ne = 0; // number of edges
    this.digraph = false; // true if digraph, false otherwise (default undirected)
    this.weighted = false; // true if weighted, false otherwise (default unweighted)
    this.dfs_push = []; // DFS traversal order output array
    this.bfs_out = []; // BFS traversal order output array
    this.label = ""; // identification string to label graph
    this.connectedComp = 0; // number of connected comps set by DFS; 0 for no info
    this.adjMatrix = []; // graph adjacency matrix to be created on demand

    // --------------------
    // student property fields next

    // --------------------
    // member methods use functions defined below

    this.read_graph = better_input; // default input reader method   
    this.add_edge = add_edgeImpl2;
    this.print_graph = print_graphImpl;
    this.list_vert = "";
    this.dfs = dfsImpl; // DFS a connected component
    this.bfs = bfsImpl; // BFS a connected component
    this.makeAdjMatrix = makeAdjMatrixImpl1;
    this.isConnected = isConnectedImpl;
    this.connectInfo = reportConnectivity;
    this.topoSearch = topoSearchImpl; // perform a topological search  

    // --------------------
    // student methods next; actual functions in student code section at end
    this.topoCounter = 1;
}


// -----------------------------------------------------------------------
// functions used by methods of Graph object
// similar to other functions but use object member fields and methods depending
// on which object is passed by method call through "this"
//
function add_edgeImpl(u_i, v_i)
{}

function add_edgeImpl2(u_i, v_i, weight)
{
    // fetch vertices using their id, where u: edge source vertex, v: target vertex
    var u = this.vert[u_i];
    var v = this.vert[v_i];

    // insert (u,v), i.e., insert v in adjacency list of u
    // (first create edge object using v_i as target, then pass edge object)
    var edge = new Edge(v_i, weight);
    u.adjacent.insert(edge);

    // insert (v,u) if undirected graph (repeat above but reverse vertex order)
    if (!this.digraph)
    {
        edge = new Edge(u_i, weight);
        v.adjacent.insert(edge);
    }

}

// --------------------
function print_graphImpl()
{
    document.write("<p>GRAPH {", this.label, "} ", this.weighted ? "WEIGHTED, " : "", this.digraph ? "" : "UN", "DIRECTED - ",
        this.nv, " VERTICES, ", this.ne, " EDGES:</p><p>", this.connectInfo(), "</p>");

    // list vertices	
    for (var i = 0; i < this.nv; i++)
    {
        var v = this.vert[i];
        document.write("VERTEX: ", i, v.vertexInfo(), "<br>");
    }
}

// --------------------
function list_vert()
{
    var i, v; // local vars
    for (i = 0; i < this.nv; i++)
    {
        v = this.vert[i];
        document.write("VERTEX: ", i, " {", v.label, "} - VISIT: ", v.visit,
            " - ADJACENCY: ", v.adjacentByID(), "<br>");
    }
}

// --------------------
function better_input(v, e) // default graph input method
{
    // set number of vertices and edges fields
    this.nv = v.length;
    this.ne = e.length;

    // read vertices into internal vertex list (array)
    for (i = 0; i < this.nv; i++)
    {
        this.vert[i] = new Vertex(v[i]);
    }

    // add edges using vertex pairs from edge list input array
    // remember to pass vertex ids to add_edge() 
    for (i = 0; i < this.ne; i++)
    {
        this.add_edge(e[i].u, e[i].v, e[i].w);
    }
    // double edge count if graph undirected 
    if (!this.digraph)
    {
        this.ne = e.length * 2;
    }

    // Check if the graph weighted or not
    if (!(e[0].w === undefined))
    {
        this.weighted = true;
    }
}

// -----------------------------------------------------------------------
// utility functions used by Graph object method functions


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
    // traverse a connected component 	
    for (i = 0; i < this.nv; i++)
    {
        if (!this.vert[i].visit)
        {
            this.topoCounter == 1 ? (this.dfs(i), fun++) : this.bfs(i);
        }
    }
    return fun;
}

function DFSImpl()
{}

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

function BFSImpl()
{}

// --------------------
function bfsImpl(v_i)
{
    // process v (using its id)
    var v = this.vert[v_i];
    v.visit = true;
    this.bfs_out[this.bfs_out.length] = v_i;

    // initialize queue with v
    var queue = new Queue();
    queue.enqueue(v);

    // while queue not empty
    while (!queue.isEmpty())
    {
        // dequeue and process a vertex, u
        var u = queue.dequeue();

        // queue unvisited vertices adjacent to u
        var w = u.adjacentByID();
        for (var i = 0; i < w.length; i++)
        {
            if (!this.vert[w[i]].visit)
            {
                this.vert[w[i]].visit = true;
                queue.enqueue(this.vert[w[i]]);
                this.bfs_out[this.bfs_out.length] = w[i];
            }
        }
    }
}

// --------------------
function makeAdjMatrixImpl1()
{
    // initially create row elements and zero the adjacncy matrix
    for (var i = 0; i < this.nv; i++)
    {
        this.adjMatrix[i] = [];

        for (var j = 0; j < this.nv; j++)
        {
            this.adjMatrix[i][j] = 0;
        }

        var v = this.vert[i];
        var w = v.adjacentByID();
        //weight of adjacency vertices 
        var weight_obj = v.adjacent.traverse();

        // for each vertex, set 1 for each adjacency      
        for (var k = 0; k < w.length; k++)
        {
            weight_obj[k].weight == null ? this.adjMatrix[i][w[k]] = 1 : this.adjMatrix[i][w[k]] = weight_obj[k].weight;
        }

    }
}

function isConnectedImpl()
{
    return this.connectedComp == 1 ? true : false;
}

function reportConnectivity()
{
    //Report CONNECTED, if graph is connected
    if (this.isConnected())
        return "CONNECTED";
    //Report No connencted inf if connected component = 0
    else if (this.connectedComp == 0)
        return "no connectivity info";
    //Report DISCONNECTED if connected comp > 1
    else
        return "DISCONNECTED " + this.connectedComp;
}

function adjacentByIdImpl()
{
    var adjList = this.adjacent.traverse();
    var adjacent_id = [];
    for (var i = 0; i < adjList.length; i++)
    {
        adjacent_id[i] = adjList[i].target_v;
    }
    return adjacent_id;
}

function vertexInfoImpl()
{
    return " {" + this.label + "} - VISIT: " + this.visit + " - ADJACENCY: " + this.adjacentByID();
}

//---------------------
function insertAdjacentImpl(edge)
{
    this.adjacent.insert(edge);
}