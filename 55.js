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
    	g.label = 'Figure 3.10 (Levitin, 3rd edition)';

     // if _g is directed (digraph) change property BEFORE input
// _g.digraph = true;

// use global input arrays _v and _e to initialize internal data structures

    g.read_graph(_v, _e);
	g.print_graph();
    document.write("<p>", g.connect(), "</p>");
    g.list_vert()

// perform depth-first search and store result
   // g.DFS();

   g.deterDFS;
   g.topoSearch();
   document.write("<p>", g.dfs_push, "</p>");

// call BFS similarly
        //g.BFS();
 g.deterDFS='b';
 g.topoSearch();
 document.write("<p>", g.connect(), "</p>");
 document.write("<p>", g.bfs_out, "</p>");
 //----------------------------
  g.makeAdjMatrix();
  document.write("<p>", "first row matrix: ", g.adjMatrix[0], "</p>");
  document.write("<p>", "last row matrix: ", g.adjMatrix[g.nv - 1], "</p>");

    
   
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
	
	this.label  ="";              // (fill) identification string to label graph
    this.connectedComp;
	this.adjMatrix=[];
    this.deterDFS='d';
    this.wieghted=false;
	
	// --------------------
	// member methods use functions defined below
	
	this.read_graph = better_input;  // default input reader method   
	this.add_edge = add_edge2;
	this.print_graph = print_graph;    // (replace) better printer function
	this.list_vert = list_vert;
    this.topoSearch=topoSearch;	    // perform adepth&breadth-first search  
	this.dfs = dfs;                  // DFS a connected component
	this.bfs = bfs;                  // BFS a connected component
    this.makeAdjMatrix=makeAdjMatrix;

	
	// --------------------
	// student methods next; actual functions in student code section at end
	this.connect=connect;
	
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
			" - ADJACENCY: ", v.adjacentByID(), "<br>" );
	}
}

// --------------------
function add_edge2(u_i,v_i,w_i)
{
	// fetch vertices using their id, where u: edge source vertex, v: target vertex 
    var u = this.vert[u_i];
    var v = this.vert[v_i];

    // insert (u,v), i.e., insert v (by id) in adjacency list of u
    var ed=new edge();
    ed.target_v=v_i;
    ed.weight=w_i;
    u.adjacent.insert(ed);

    // insert (v,u) if undirected graph (repeat above but reverse vertex order)
    if (!this.digraph)
    {
        ed=new edge();
         ed.target_v=u_i;
         ed.weight=w_i;
        v.adjacent.insert(ed);
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
    var j;
    for (j = 0; j < this.ne; j++)
    {
        this.add_edge(e[j].u, e[j].v,e[j].weight);
    }
    //check weighted or not
    if(e[0].weight===undefined)
    {
     this.weighted=true;
    }

    // double edge count if graph undirected 
    if (!this.digraph)
    {
        this.ne = 2 * this.ne;
    } 
    
}

// --------------------
//-----------------------------
function topoSearch() 
{
    this.connectedComp=0;
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
         this.deterDFS==='d' ? (this.dfs(i),this.connectedComp++):(this.bfs(i));
        }
    }
}

// --------------------
function dfs(v_i)
{
  // process vertex
    var v = this.vert[v_i];
    v.visit = true;

    this.dfs_push[this.dfs_push.length] = v_i;

    // recursively traverse unvisited adjacent vertices 
    var w = v.adjacentByID();//adjacent.traverse(),
        m = w.length;
    for (i = 0; i < m; i++)
    {
        if (!this.vert[w[i]].visit)
        {
            this.dfs(w[i]);
        }
    }
    //pop order
}

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
        var w = u.adjacentByID();//.adjacent.traverse();
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

	document.write("GRAPH ", "{", this.label, "} ",!this.weighted?" Weighted":" Unweighted",", ", !!this.digraph?"":"UN", "DIRCTED", " - ", this.nv,
		" VERTICES, ", this.ne, " EDGES:<br><br>");

	//this.list_vert();

}

//----------------------------
function edge()
{
    this.target_v;
    this.weight= this.weight === undefined ? null : weight;
;
}
//-----------------------------
function adjacentByID ()
{
var adj_id=[]
var adj=this.adjacent.traverse();
for(var i=0;i<adj.length;i++){
    adj_id[i]=adj[i].target_v;
}
return adj_id;
}

//----------------------
function makeAdjMatrix()
{
// initially create row elements and zero the adjacncy matrix
        for(var i=0; i<this.nv;i++){
            this.adjMatrix[i]=[];
            for(var j=0;j<this.nv;j++){
                this.adjMatrix[i][j]=0;
            }

        // for each vertex, set 1 for each adjacency
          var v=this.vert[i] ;
          var w=v.adjacentByID();
          var m=w.length;
          var weight_ed= v.adjacentByID();
        for(var k=0;k<m;k++){
    	!this.weighted? this.adjMatrix[i][w[k]] = weight_ed[k].weight: this.adjMatrix[i][w[k]] = 1;
          }
        }
}

function connect()
{
if (this.connectedComp===undefined)
return "no connectivity info";
else if (this.connectedComp===0)
return "Connected";
else
return "DISCONNECTED  "+this.connectedComp;
}