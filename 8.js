// CPCS 324 Algorithms & Data Structures 2
// Graph data structure starter - Transitive Closure Package
// 2017, Dr. Muhammad Al-Hashimi

// -----------------------------------------------------------------------
// simple graph object with linked-list edge implementation and minimal fields
// extra vertex and edge property fields to be added later as needed
//


var _v = [], _e = [];   // note naming convention in upload guide


// -----------------------------------------------------------------------
function main_graph()   
{
         // create a graph (default undirected)
       var g=new Graph();
       
       // set graph properties
          g.label= 'Exercise 8.4: 7 (Levitin, 3rd edition)';
   
       
       // use global input arrays _v and _e to initialize its internal data structures
          g.read_graph(_v, _e);
       
       // use print_graph() method to check graph
          g.printGraph();
       
       
       // report connectivity status if available
          document.write("<p>", g.componentInfo(), "</p>");//return to this point
       
       // perform depth-first search and output stored result
           g.deterDFS;//return to this point
           g.connectedComp=g.topoSearch( g.connectedComp);//retun to this point
           document.write("<p>", g.dfs_push, "</p>");
       
       // report connectivity status if available
          document.write("<p>", g.componentInfo(), "</p>");//return to this point
       
       
       // perform breadth-first search and output stored result
         g.deterDFS='b';//return to this point
         g.topoSearch(g.connectedComp); //retun to this point
         document.write("<p>", g.bfs_order, "</p>");
         
       // output the graph adjacency matrix
          g.makeAdjMatrix();
         // document.write("<p>", "first row matrix: ", g.adjMatrix[0], "</p>");
         // document.write("<p>", "last row matrix: ", g.adjMatrix[g.nv - 1], "</p>");
         document.write("<p>", "TC matrix by DFS:  ", "</p>");
         g.dfsTC();         
         document.write("<p>", "TC matrix by Warshall-Floyd:  ", "</p>");
         g.hasPath();
         for(var i=0;i<this.RW.length;i++)
         document.write("<p>", RW[i], "</p>");
         document.write("<p>", "DAG:  ",g.isDAG(), "</p>");
         document.write("<p>", "Distance matrix   ", "</p>");
         g.shortestPath();
         for(var i=0;i<this.RF.length;i++)
         document.write("<p>", RF[i], "</p>");

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
	this.insertAdjacent=insertAdjacentImpl;
		
	// --------------------
	// student property fields next
	
	
	// --------------------
	// student methods next; actual functions in student code sections
	
}

// -----------------------------------------------------------------------

function Edge(vert_i,weight)
{
	// published docs section (ref. assignment page)
	// for this section, strip line comments (leave outline)
	// no JSDOC comments in this section

	
	// property fields
	
	this.target_v = vert_i;
	this.weight =  this.weight= (weight != undefined) ? weight : null ;                // ... (complete next)
	
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
	this.nv = 0;                 // ... (complete next)
	this.ne=0;                       // number of edges
	this.digraph = false;          // true if digraph, false otherwise (default undirected)
	this.weighted=false;    	
	this.dfs_push = [];          // DFS traversal order output array
	this.bfs_order = [];             // BFS traversal order output array
    this.label = "";               // identification string to label grap
    

	// member methods
	
	this.read_graph = better_input;  // ... (complete next)
	this.addEdge = addEdgeImpl2;  // better printer function
    this.printGraph = printGraphImpl;
    /** Obsolete, see detailsinsert
			@deprecated To be removed, use {@link Vertex} printer method instead. Now returns empty string.
			@see list_vert */
	this.list_vert="";
	this.dfs = dfsImpl;               // DFS a connected component
	this.bfs = bfsImpl;               // BFS a connected component
	this.makeAdjMatrix = makeAdjMatrixImpl2;
    this.componentInfo = componentInfoImpl;
    this.isConnected = isConnectedImpl; 
	this.topoSearch = topoSearchImpl;
	
	
	// --------------------
	// student property fields next
    this.connectedComp=0;    // number of connected comps set by DFS; 0 (default) for no info
	this.adjMatrix=[];      // graph adjacency matrix to be created on demand
    this.deterDFS='d';
    this.RF=[];
    this.RW=[];
	// --------------------
	// student methods next (actual functions in student code sections)

	// transitive closure package (requirements in line comments) 
	
	this.hasPath =  hasPathImpl;        // boolean, true if path exists between vertices v_i, v_j in digraph
	this.shortestPath =  shortestPath; // return distance of shortest path between v_i, v_j in weighted graph 
	this.isDAG   = isDAG;           // boolean, true if acyclic digraph
	this.warshallFloyd   = warshallFloyd            // inserts .tc field in adjacency matrix if digraph, and .dist if weighted
	this.dfsTC   =dfsTC ;                  // return TC matrix for digraph based on a dfs
		

}


// -----------------------------------------------------------------------
// functions used by methods of Graph and subsidiary objects

// -----------------------------------------------------------------------
// begin student code section
// -----------------------------------------------------------------------

// transitive closure package 
/*@author 2017, Afnan Balghaith
@version Version 0 (Fall 2017), First graph implementation*/

function hasPathImpl(v_i,v_j)
{
	if(this.tcMat[v_i][v_j]==1)
	return true;
	else return false;	
}
//--------------------
function shortestPath (v_i, v_j)
{
return this.RF[v_i][v_j];
}
//--------------------
function isDAGImpl()
 {
	for (var i = 0; i < this.nv; i++)
	 {
		if (this.tcMat[i][i] == 0 )
		 {
            return true;
		}
    }
    return false;
}
//--------------------
function warshallFloyd(deterWF)
{
	for(var i=0;i<this.nv;i++)
	
	{
	this.RW[i]=this.adjMatrix[i].slice();
	this.RF[i]=this.adjMatrix[i].slice();
	}
	//--------------------------------------
	 for(var j=0;j<this.nv;j++)
	 {
		 for(var k=0;k<this.nv;k++)
		 {
			 if(this.RF[j][k]==0 && j!=k)
			 this.RF[j][k]=Infinity;
		 }
	 }
	 //---------------------------
	
	for(var k=0;k<this.nv;k++)
	{
		for(var i=0;i<this.nv;i++)
		{
			for(var j=0;j<this.nv;j++)
			{
				if(this.digraph)
				{
				 this.RW[i][j]=(this.RW[i][j]|| (this.RW[i][k] && this.RW[k][j]))?1:0;
				 
				}
				if(this.weighted && this.connectedComp==1)
				{
					this.RF[i][j]=Math.min(this.RF[i][j],(this.RF[i][k]+ this.RF[k][j]));
				}
				//--------------------------------
				
			}
		}
	}
}
//--------------------
function dfsTC()
{
    for(var i=0;i<this.nv;i++)
	{
		var v=this.vert[i];
		for(var j=0;j<this.nv;j++)
		{
			this.vert[j].visit=false;
		}
	//----------------------------------
	this.tcMat[i]=[];
	for(var k=0;k<this.nv;k++)
	this.tcMat[i]=[k];

	var w=v.adjacentByID();
	for(var e=0;e<w.length;e++)
	   this.dfs(w[e]);
		 //---------------------------
		 var arraTC=this.dfs_push.slice();

	   for(var c=0;c<arraTC.length;c++)
	   {
		   this.tcMat[i][arraTC[c]]=1;
	   }
	}
}
//------------------------------
function primIml1()
{
	
}

// -----------------------------------------------------------------------
// published docs section (ref. assignment page)
// for this section, strip line comments (leave outline)
// no JSDOC comments in this section
// -----------------------------------------------------------------------

function better_input(v,e)
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
    if(e[i].w!=undefined)
    this.addEdge(e[j].u, e[j].v,e[j].w);
    else
    this.addEdge(e[j].u, e[j].v);
    

}
//check weighted or not
  if (!(e[0].w === undefined))
{
    this.weighted = true;
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
function topoSearchImpl(fun)//return to this method
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
		this.deterDFS==='d' ? (this.dfs(i),fun++):(this.bfs(i));
	   }
   }
   return fun;
}
// --------------------
function addEdgeImpl(u_i, v_i)
{
/*@deprecated First implementation - obsolete. 
Use {@link #addEdgeImpl2} instead.*/
}
// --------------------
function addEdgeImpl2(u_i, v_i,weight)
{
    // fetch vertices using their id, where u: edge source vertex, v: target vertex
	var u = this.vert[u_i];
	var v = this.vert[v_i];

 
	 
 // insert (u,v), i.e., insert v in adjacency list of u
 // (first create edge object using v_i as target, then pass edge object)
	if(weight!=undefined)
	{
	  
	  u.insertAdjacent(v_i,weight);
	}
	else
	{
	  
	  u.insertAdjacent(v_i);
	}
   
 
	 
 // insert (v,u) if undirected graph (repeat above but reverse vertex order)
	if (!this.digraph)
	{
	
        if(weight!=undefined)
        {
          
          v.insertAdjacent(u_i,weight);
        }
        else
        {
          
          v.insertAdjacent(u_i);
        }	
    }
 
	 
	  
   	   
}
// --------------------
function BFS()
{
	//@deprecated Use topoSearch instead
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
			var w = u.adjacentByID();//.adjacent.traverse();
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
function DFS()
{
	//@deprecated Use topoSearch instead
}
// --------------------
function dfsImpl(v_i)
{
  // process vertex
  var v = this.vert[v_i];
  v.visit = true;

  this.dfs_push[this.dfs_push.length] = v_i;

  // recursively traverse unvisited adjacent vertices 
  var w = v.adjacentByID();
	  m = w.length;
  for (i = 0; i < m; i++)
  {
	  if (!this.vert[w[i]].visit)
	  {
		  this.dfs(w[i]);
	  }
  }
}

// --------------------
function makeAdjMatrix()
{
//@deprecated Use {@link #makeAdjMatrixImpl} instead.
}

// --------------------
function makeAdjMatrixImpl()
{
//@deprecated Use {@link #makeAdjMatrixImpl2} instead.
}
// --------------------
function makeAdjMatrixImpl2()
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
	  var weight_ed= v.adjacent.traverse();
	for(var j=0;j<m;j++){
	this.weighted? this.adjMatrix[i][w[j]] = weight_ed[j].weight: this.adjMatrix[i][w[j]] = 1;
	  }
	}
}
// --------------------
function printGraphImpl()
{
	document.write("GRAPH ", "{", this.label, "} ",this.weighted?" Weighted":" Unweighted",", ", this.digraph?"":"UN", "DIRCTED", " - ", this.nv,
	" VERTICES, ", this.ne, " EDGES:<br><br>");
	var v;
	for (var i=0;i<this.nv;i++)
	{
	    v=this.vert[i];
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
	if (this.isConnectedImpl==1)
	return "CONNECTED "+ this.connectedComp;
	else if(this.connectedComp>1)
	return "DISCONNECTED "+ this.connectedComp;
	else 
	return "no connectivity info";
}
// --------------------

function adjacentByIdImpl()
{
	var adj=this.adjacent.traverse();
	for(var i=0;i<adj.length;i++){
		adj[i]=adj[i].target_v;

	}
	return adj;

}
// --------------------
function insertAdjacentImpl(v_i, weight)
{
    if(weight!=undefined)
    {
      
      var edge=new Edge(v_i, weight);
      this.adjacent.insert(edge);
      
    }
    else
    {
      
      edge=new Edge(v_i);
      this.adjacent.insert(edge);  
      }
}
// --------------------
function vertexInfoImpl()
{

  return ( " {"+ this.label+ "} - VISIT: "+ this.visit + 
  " - ADJACENCY: "+ this.adjacentByID());
	
}
//---------------------------
function incidentEdge()
{
	var edge=[];
	var incidEd=this.adjacent.traverse();
	for(var i=0;i<incidEd.length;i++)
	{
		edge[i]=
		{ 
		edgeVert:incidEd[i].target_v,
		labelV:"",
		edgeWeight:incidEd[i].weight
	};
	}
	return edge;
}




