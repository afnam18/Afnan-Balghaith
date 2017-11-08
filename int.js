// CPCS 324 Algorithms & Data Structures 2
// Graph data structure starter - First Edge Object
// 2017, Dr. Muhammad Al-Hashimi

// -----------------------------------------------------------------------
// simple graph object with linked-list edge implementation and minimal fields
// extra vertex and edge property fields to be added later as needed
//

var v = [],
e = []; // globals used by standard graph reader method

var v2 = [],
e2 = []; // for second graph

var v3 = [],
e3 = []; // for third graph

// -----------------------------------------------------------------------
// graph caller function - sort of main() for caller page
// called directly, or on load success event of some input file
// global scope, only function allowed to access global vars

function main_graph()   
{
    // create a graph (default undirected)
       var g=new Graph();
	   var g2=new Graph();
       var g3=new Graph();
	   
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
	document.write("<p>", g.componentInfo(), "</p>");
	
	g.printGraph();
	g.makeAdjMatrix();
	g2.makeAdjMatrix();
	g3.makeAdjMatrix();	
	
    
    // report connectivity status if available
	 //document.write("<p>", g.componentInfo(), "</p>");
    
	// perform depth-first search and output stored result
	    g.deterDFS;
	    g.connectedComp=g.topoSearch(g.connectedComp);
	    document.write("<p>", g.dfs_push, "</p>");
		//g2.connectedComp=g.topoSearch(g2.connectedComp);
	    //g3.connectedComp=g.topoSearch(g3.connectedComp);
		
    // report connectivity status if available
	   document.write("<p>", g.componentInfo(), "</p>");
	
    
    // perform breadth-first search and output stored result
	//  g.deterDFS='b';//return to this point
	 // g.topoSearch(g.connectedComp); 
    //  document.write("<p>", g.bfs_order, "</p>");
	  
    // output the graph adjacency matrix
   	  // document.write("<p>", "first row matrix: ", g.adjMatrix[0], "</p>");
	 //  document.write("<p>", "last row matrix: ", g.adjMatrix[g.nv - 1], "</p>");
	 document.write("<p>","tc matrix", "</p>");
	 g.TC();
	 for(var i=0;i<g.tcMat.length;i++)
	 document.write("<p>", g.tcMat[i], "</p>");
	/* var path=g.hasPathImpl(0,0);
	 document.write("<p>", "there is path ", path , "</p>");*/
	  g.warshallFloyd();
	 document.write("<p>", "Warshal matrix: ", "</p>");	 
	 for( var i=0;i<g.RW.length;i++)
	 document.write("<p>", g.RW[i], "</p>");	
	/* document.write("<p>", "floyd matrix: ", "</p>");	 
	for( var i=0;i<g.RF.length;i++)
	document.write("<p>", g.RF[i], "</p>");*/
	var dag=g.isDAGImpl();
	document.write("<p>", "DAG:  ", dag, "</p>");
	//--------------------------------------------------------
	document.write("<p>","tc matrix", "</p>");
	g2.TC();
	for(var i=0;i<g2.tcMat.length;i++)
	document.write("<p>", g2.tcMat[i], "</p>");
  
/* var path=g.hasPathImpl(0,0);
 document.write("<p>", "there is path ", path , "</p>");*/
 var dag=g2.isDAGImpl();
 document.write("<p>", "there is dag ", dag, "</p>");
g2.warshallFloyd();
 document.write("<p>", "Warshal matrix: ", "</p>");	 
 for( var i=0;i<g2.RW.length;i++)
 document.write("<p>", g2.RW[i], "</p>");	
 document.write("<p>", "floyd matrix: ", "</p>");	 
for( var i=0;i<g2.RF.length;i++)
document.write("<p>", g2.RF[i], "</p>");
//-------------------------------------------------
document.write("MST for ", g3.label, "</p>");
var matPrim=g3.prim();
for (var i = 0; i < matPrim.length; i++)
{
	document.write("#", (i + 1), "Distenation (",matPrim[i].u.label,") "," -- (", matPrim[i].v.label, ", ",
	matPrim[i].u.label,
		") -- Distance: ", matPrim[i].e, "<br>");
}
document.write("COST "+g3.cost);


	/*document.write("<p>", "Shortest Path ", "</p>");	
	var sh=g.shortestPath (0,2);
	document.write("<p>",sh, "</p>");*/	
	
	 
	 
	  
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
	
	// --------------------
	// member methods use functions defined below
	this.adjacentByID = adjacentByIdImpl;
	this.vertexInfo = vertexInfoImpl;
	this.insertAdjacent=insertAdjacentImpl;
	this.incidentEdge = incidentEdge;	
}

// -----------------------------------------------------------------------
// Edge object constructor
   function Edge(vert_i, weight)
   {
   this.target_v=vert_i;
   this.weight= (weight != undefined) ? weight : null;
   }

// -----------------------------------------------------------------------
// Graph object constructor

function Graph()
{
	this.vert = [];                // vertex list: array of Vertex objects
	this.nv=0;                       // number of vertices
	this.ne=0;                       // number of edges
	this.digraph = false;          // true if digraph, false otherwise (default undirected)
	this.weighted=false;    	
	this.dfs_push = [];          // DFS traversal order output array
	this.bfs_order = [];             // BFS traversal order output array
    this.label = "";               // identification string to label grap
    
	
	// --------------------
	// student property fields next
	
    this.connectedComp=0;    // number of connected comps set by DFS; 0 (default) for no info
	this.adjMatrix=[];      // graph adjacency matrix to be created on demand
	this.tcMat=[];
	this.RF=[];
	this.RW=[];
	this.cost=0;
	// --------------------
	// member methods use functions defined below
	
	this.readGraph=better_input;	// default input reader method   
	this.addEdge = addEdgeImpl2;  // better printer function
	this.printGraph = printGraphImpl;
	this.list_vert="";
	this.dfs = dfsImpl;               // DFS a connected component
	this.bfs = bfsImpl;               // BFS a connected component
	this.makeAdjMatrix = makeAdjMatrixImpl2;
    this.componentInfo = componentInfoImpl;
    this.isConnected = isConnectedImpl; 
	this.topoSearch = topoSearchImpl;
	this.deterDFS='d';
	this. hasPathImpl= hasPathImpl;
	this.TC=TC;
	this.isDAGImpl=isDAGImpl;
	this.warshallFloyd=warshallFloyd;
	//this.floydMat=floydMat;
	this.shortestPath =shortestPath ;
	this.prim=primIml1;
	// --------------------
	// student methods next; actual functions in student code section at end

	                                 // perform a topological search
}


// -----------------------------------------------------------------------
// functions used by methods of Graph object
// similar to other functions but use object member fields and methods depending
// on which object is passed by method call through "this"
//

// --------------------
function list_vert()
{
	//Output graph vertex list - obsolete, see details 
}

// --------------------
function better_input(v,e)
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
	 if(this.weighted)
	 this.addEdge(e[j].u, e[j].v,e[j].w);
	 else
	 this.addEdge(e[j].u, e[j].v);
	 

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

  // recursively traverse its unvisited adjacent vertices 
  var w = v.adjacentByID();
  for (var i = 0; i < w.length; i++) {
	  
	  if (!this.vert[w[i]].visit) {
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
	for (var i = 0; i < this.nv; i++)
	 {
		
				var v = this.vert[i];
		
				this.adjMatrix[i] = [];
		
				for (var j = 0; j < this.nv; j++) {
					this.adjMatrix[i][j] = 0;
				}
		
				var w = v.incidentEdge();
		
				for (var j = 0; j < w.length; j++) {
		
					var adjID = w[j].adjVert;
					this.weighted? this.adjMatrix[i][adjID] = w[j].edgeWeight: this.adjMatrix[i][adjID] = 1;
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
	if (this.isConnected())
	return "CONNECTED ";
	else if(this.connectedComp>1)
	return "DISCONNECTED "+ this.connectedComp;
	else 
	return "no connectivity info";
}
// --------------------

function adjacentByIdImpl()
{
	var adj=this.adjacent.traverse();
	for(var i=0;i<adj.length;i++)
	{
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

  return ( " {"+ this.label, "} - VISIT: "+ this.visit + 
  " - ADJACENCY: "+ this.adjacentByID());
	
}

//---------------------------
function incidentEdge()
{
	var edge = [];
    var adj = this.adjacent.traverse();
    for (var i = 0; i < adj.length; i++) {
        edge[i] = {
			adjVert: adj[i].target_v,
			edgeLabel:"",
            edgeWeight: adj[i].weight
        };
    }

    return edge;

	
}
//---------------------------


function TC()
{

	for(var i=0;i<this.nv;i++)
	{
		this.vert[i].visit=false;		
		this.tcMat[i]=[];
		for(var j=0;j<this.nv;j++)
		{
			this.tcMat[i][j]=0;
		}
		//----------------------------
		var v=this.vert[i];
		var w=v.adjacentByID();
		var m=w.length;
		for(var k=0;k<m;k++)
		{
			this.dfs(w[k]);
		}
		//---------------------------
		for(var a=0;a<this.nv;a++)
		{
			if(this.vert[a].visit)
			this.tcMat[i][this.dfs_push[a]]=1;
		}		
	}

	
}

//------------------------------
function hasPathImpl(v_i,v_j)
{
	if(this.tcMat[v_i][v_j]==1)
	return true;
	else return false;	
}
//-----------------------------
function isDAGImpl()
 {
	
    for (var i = 0; i < this.nv; i++) {
          for(var j=0;j<this.nv;j++){
        if (this.tcMat[i][j] == 0 && i==j) {
            return true;
		}
	}
    }
    return false;
}
//---------------------------------
function shortestPath (v_i, v_j)
{
return this.RF[v_i][v_j];
}
//--------------------------------
function warshallFloyd()
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
				if(this.weighted && this.isConnected)
				{
					this.RF[i][j]=Math.min(this.RF[i][j],(this.RF[i][k]+ this.RF[k][j]));
				}
				//--------------------------------
				
			}
		}
	}
}
//-----------------------------------------------------------
function primIml1()
{
	var VT=[], ET=[];
	
		for(var i=0;i<this.nv;i++)
		{
		this.vert[i].visit=false
		}
		//-----------------------------------
		var v=this.vert[0];
		var u;
		VT[0]=v;
		v.visit=true;
		//-------------------------------------
		var minEdge=Infinity;
		//ﬁnd a minimum-weight edge e∗=(v∗,u ∗) among all the edges (v, u) 
		  /*such that v is in VT and u is in V −VT 
		  VT ←VT ∪{u∗}
		  ET ←ET ∪{ e∗}
		   return ET*/
		 do
		 {
		  for(var i=0;i<VT.length;i++)
		  {
			  var adjE=VT[i].incidentEdge();
			  for(var j=0;j<adjE.length;j++)
			  {
				  if(!this.vert[adjE[j].adjVert].visit && adjE[j].edgeWeight<= minEdge)
				  {
					 
						minEdge=adjE[j].edgeWeight;
						v=VT[i];
						u=this.vert[adjE[j].adjVert];
				  }
			  }
		  }
		  this.cost+=minEdge;
		  VT[VT.length]=u;
		  u.visit=true;
		  ET[ET.length]=
		  {
			  v:v,
			  u:u,
			  e:minEdge
		  };
		  minEdge=Infinity;
		 }while(VT.length<this.nv)
		return ET;
}