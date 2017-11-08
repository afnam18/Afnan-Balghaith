// CPCS 324 Algorithms & Data Structures 2
// Graph data structure starter - First DFS Traversal
// 2017, Dr. Muhammad Al-Hashimi
// -----------------------------------------------------------------------
// simple graph object with linked-list edge implementation and minimal fields
// extra vertex and edge property fields to be added later as needed
//
// graph from Figure 3.10 (Levitan, 3rd edition)
// input property fields in corresponding user fields of Vertex() object  
// list property fields in any order; omit those with no value to assign
// note coding convention for global vars
var _v = [
    {
        label: "a"
    },
    {
        label: "b"
    },
    {
        label: "c"
    },
    {
        label: "d"
    },
    {
        label: "e"
    },
    {
        label: "f"
    },
    {
        label: "g"
    },
    {
        label: "h"
    },
    {
        label: "i"
    },
    {
        label: "j"
    }

];

var _e = [
    {
        u: 0,
        v: 3
    },
    {
        u: 0,
        v: 2
    },
    {
        u: 3,
        v: 2
    },
    {
        u: 2,
        v: 5
    },
    {
        u: 5,
        v: 4
    },
    {
        u: 5,
        v: 1
    },
    {
        u: 1,
        v: 4
    },
    {
        u: 0,
        v: 4
    },
    {
        u: 6,
        v: 7
    },
    {
        u: 7,
        v: 8
    },
    {
        u: 8,
        v: 9
    },
    {
        u: 9,
        v: 6
    }

];


// create a graph (default undirected)
var _g = new Graph();

// if _g is directed (digraph) change property BEFORE input
// _g.digraph = true;

// use global input arrays _v and _e to initialize internal data structures
_g.read_graph(_v, _e);

// perform a depth-first search and store result
_g.DFS();

// copy output code to your caller page
//document.write("<p>",_g.dfs_push,"</p>");
// -----------------------------------------------------------------------
// Vertex object constructor

function Vertex(v)
{
    // user input fields

    this.label = v.label; // vertex can have label, example: a, v1, jeddah

    // more fields to initialize internally

    this.visit = false; // vertex can be marked visited (useful for traversals)
    this.adjacent = new List(); // head pointer of adjacency linked list
}

// -----------------------------------------------------------------------
// Graph object constructor

function Graph()
{
    this.vert = []; // vertex list: array of Vertex objects
    this.nv; // number of vertices
    this.ne; // number of edges
    this.digraph = false; // true if digraph, false otherwise (default undirected)
    this.dfs_push = []; // DFS traversal order output array

    // --------------------
    // student property fields next
    this.dfs_pop = [];
    // --------------------
    // member methods use functions defined below

    this.read_graph = better_input; // default input reader method   

    this.add_edge = add_edge;
    this.print_graph = list_vert;

    // --------------------
    // student methods next; actual functions in student code section at end

    this.DFS = DFS; // perform depth-first search
    this.dfs = dfs; // DFS a connected component            

}


// -----------------------------------------------------------------------
// functions used by methods of Graph object
// similar to other functions but use object member fields and methods depending
// on which object is passed by method call through "this"
//

// --------------------
function list_vert()
{
    var i, v;
    for (i = 0; i < this.nv; i++)
    {
        v = this.vert[i];
        v.visit = false;
        document.write("VERTEX: ", i, " {", v.label, "} - VISIT: ", v.visit,
            " - ADJACENCY: ", v.adjacent.traverse(), "<br>");
    }
}

// --------------------
function add_edge(u_i, v_i)
{
    // fetch vertices using their id, where u: edge source vertex, v: target vertex 
    var u = this.vert[u_i];
    var v = this.vert[v_i];
    //document.writeln(u+ "  "+ v+" here problem");

    // insert (u,v), i.e., insert v (by id) in adjacency list of u
    u.adjacent.insert(v_i);

    // insert (v,u) if undirected graph (repeat above but reverse vertex order)
    if (!this.digraph)
    {
        v.adjacent.insert(u_i);
    }
}

// --------------------
// default graph input method
function better_input(v, e)
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
        this.add_edge(e[j].u, e[j].v);
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

function DFS()
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

}

// --------------------
function dfs(v_i)
{

    // process vertex
    var v = this.vert[v_i]; v.visit = true;

    this.dfs_push[this.dfs_push.length] = v_i;

    // recursively traverse unvisited adjacent vertices 
    var w = v.adjacent.traverse(), m = w.length;
    for (i = 0; i < m; i++)
    {
        if (!this.vert[w[i]].visit)
        {
            this.dfs(w[i]);
        }
    }
    
    this.dfs_pop[this.dfs_pop.length] = v_i;     //pop order

}