// CPCS 324 Algorithms & Data Structures 2
// Graph data structure starter - Reorganized Code
// 2017, Dr. Muhammad Al-Hashimi

// -----------------------------------------------------------------------
// simple graph object with linked-list edge implementation and minimal fields
// extra vertex and edge property fields to be added later as needed
//

// note carefully close-to-final source file organization

var _v = [], _e = [];   // globals used by standard graph reader method


// -----------------------------------------------------------------------
// graph caller function - sort of main() for caller page
// called directly, or on load success event of some input file
// global scope, only function allowed to access global vars

function main_graph()   
{
    // create a graph (default undirected)
    // note g no longer a global var
    var g = new Graph();
    
    // set graph properties - set a suitable label
     g.label= 'Figure 3.10 (Levitin, 3rd edition)';
     // use global input arrays _v and _e to initialize internal data structures
      g.read_graph(_v, _e);
      g.print_graph();
          // report connectivity status if available

      // perform depth-first search and store result  
      g.DFS();
     document.write("<p>", g.dfs_push, "</p>");
         // report connectivity status if available

         // call BFS similarly
           g.BFS();    
        document.write("<p>", g.bfs_out, "</p>");
             // output the graph adjacency matrix

   
}

    
// -----------------------------------------------------------------------
// Vertex object constructor

function Vertex(v)
{
	// user input fields
	
	this.label = v.label;          // vertex can have label, example: a, v1, jeddah
	
	// more fields to initialize internally
	
	this.visit = false;            // vertex can be marked visited (useful for traversals)
	this.adjacent = new List();    // head pointer of adjacency linked list
    this.adjacentByID=adjacentByID;
}

// -----------------------------------------------------------------------
// Graph object constructor

function Graph()
{
	this.vert = [];                // vertex list: array of Vertex objects
	this.nv;                       // number of vertices
	this.ne;                       // number of edges
	this.digraph = false;          // true if digraph, false otherwise (default undirected)
	this.dfs_push = [];            // DFS traversal order output array
	this.bfs_out = [];             // BFS traversal order output array
	
	// --------------------
	// student property fields next
	
	this.label="" ;        // (fill) identification string to label graph
    this.connectedComp=0;  // number of connected comps set by DFS; 0 (default) for no info
	this.adjMatrix=[];       // graph adjacency matrix to be created on demand
	
	// --------------------
	// member methods use functions defined below
	
	this.read_graph = better_input;     // default input reader method   
	this.add_edge = add_edge;
	this.print_graph = print_graph;    // (replace) better printer function
    this.list_vert=list_vert;
	
    this.topoSearch=topoSearch;
	//this.DFS = DFS;                  // perform depth-first search  
	//this.dfs = dfs;                  // DFS a connected component
	this.BFS = BFS;                  // perform a breadth-first search  
	this.bfs = bfs;                  // BFS a connected component

	
	// --------------------
	// student methods next; actual functions in student code section at end
	
	
}


// -----------------------------------------------------------------------
// functions used by methods of Graph object
// similar to other functions but use object member fields and methods depending
// on which object is passed by method call through "this"
//

// --------------------
function list_vert()
{
	var i, v;                     // local vars
	for (i=0; i < this.nv; i++)
	{
		v = this.vert[i];
		document.write( "VERTEX: ", i, " {", v.label, "} - VISIT: ", v.visit, 
			" - ADJACENCY: ", v.adjacent.traverse(), "<br>" );
            document.write(  v.adjacentByID(), "<br>" );
            
// --------------------
function add_edge(u_i,v_i)
{
	 // fetch vertices using their id, where u: edge source vertex, v: target vertex 
    var u = this.vert[u_i];
    var v = this.vert[v_i];

    // insert (u,v), i.e., insert v (by id) in adjacency list of u
    var e= new edge();
    e.target_v=v_i;
    u.adjacent.insert(e);


    // insert (v,u) if undirected graph (repeat above but reverse vertex order)
    if (!this.digraph)
    {
        var e= new edge();
         e.target_v=u_i;
        u.adjacent.insert(e);
       // v.adjacent.insert(u_i);
    }
}

// --------------------
function better_input(v,e)     // default graph input method
{
	// set number of vertices and edges fields
    this.nv = v.length;
    this.ne = e.length;

    // input vertices into internal vertex array
    var i;
    for (i = 0; i < this.nv; i++)
    {
        this.vert[i] = new Vertex(v[i]);
    }

    // input vertex pairs from edge list input array
    // remember to pass vertex ids to add_edge() 
    //var j;
    for (i = 0; i < this.ne; i++)
    {
        this.add_edge(e[i].u, e[i].v);
    }

    // double edge count if graph undirected 
    if (!this.digraph)
    {
        this.ne *=2 ;//this.ne;
    }

}

// --------------------

function topoSearch() {
    for (var i = 0; i < this.nv; i++)
    {
        this.vert[i].visit = false;
    }

    // traverse unvisited connected component 	
    for (var i = 0; i < this.nv; i++)
    {
        if (!this.vert[i].visit)
        {
            this.dfs(i);
            this.bfs(i);
        }
    }
}
/*function DFS()
{
// mark all vertices unvisited
    for (var i = 0; i < this.nv; i++)
    {
        this.vert[i].visit = false;
    }

    // traverse unvisited connected component 	
    for (var i = 0; i < this.nv; i++)
    {
        if (!this.vert[i].visit)
        {
            this.dfs(i);
        }
    }
}*/

// --------------------
function dfs(v_i)
{

    // process vertex
    var v = this.vert[v_i];
    v.visit = true;

    this.dfs_push[this.dfs_push.length] = v_i;

    // recursively traverse unvisited adjacent vertices 
    var w = v.adjacent.traverse(),m = w.length;
    for (i = 0; i < m; i++)
    {
        if (!this.vert[w[i]].visit)
        {
            this.dfs(w[i]);
        }
    }
}

// --------------------
/*function BFS()
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
            this.bfs(i);
        }
    }
}*/

// --------------------
function bfs(v_i)
{
// get vertex v by its id
    var v = this.vert[v_i];

    // process v 
    v.visit = true;
    this.bfs_out[this.bfs_out.length] = v_i;
    // initialize queue with v
    var q = new Queue();
    q.enqueue(v);

    // while queue not empty
    while (!q.isEmpty())
    {

        // dequeue and process a vertex, u
        var u = q.dequeue();
        var w = u.adjacent.traverse();
        var m = w.length;
        // queue all unvisited vertices adjacent to u
        for (var i = 0; i < m; i++)
        {
            if (!this.vert[w[i]].visit)
            {
                this.vert[w[i]].visit = true;
                q.enqueue(this.vert[w[i]]);
                this.bfs_out[this.bfs_out.length] = w[i];

            }
        }
    }
}


// -----------------------------------------------------------------------
// -----------------------------------------------------------------------
// --- begin student code section ----------------------------------------

function print_graph() 
{
    document.write("GRAPH {",this.label,"}",!this.digraph?"":" UN", "DIRECTED - ", this.nv, "  VERTICES, ", this.ne," EDGES:","<br>" );

	this.list_vert();
}
//Edge Function 
function edge(){
this.target_v;
}

function adjacentByID () {
var adj_id=[]
var adj=this.adjacent.traverse();
for(var i=0;i<adj.length;i++){
    adj_id[i]=adj[i].target_v;
}
return adj_id;
}
//-----------------------------------------------------

    }}