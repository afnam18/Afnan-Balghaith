// CPCS 324 Algorithms & Data Structures 2
// Graph data structure starter - First Edge Implementation
// 2016, Dr. Muhammad Al-Hashimi
// -----------------------------------------------------------------------
// simple graph object with linked-list edge implementation and minimal fields
// extra vertex and edge property fields to be added later as needed
//
// graph from Figure 3.10 (3rd edition)
// input user property fields for each vertex as defined in the Vertex object below
// property fields can be listed in any order; simply omit fields with no value to assign
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

// if g is directed (digraph) change property BEFORE input
// _g.digraph = true;

// use global input arrays _v and _e to initialize its internal data structures
_g.read_graph(_v, _e);


// -----------------------------------------------------------------------
// Vertex object constructor

function Vertex(v)
{
    // user input fields

    this.label = v.label; // vertex can have label, example: a, v1, jeddah

    // more fields to initialize internally

    this.visit = false; // vertex can be marked visited (useful for traversals)
    this.adjacent = new List(); // (fill code) head pointer of adjacency linked list
}

// -----------------------------------------------------------------------
// Graph object constructor

function Graph()
{
    this.vert = new Array(); // vertex list: array of Vertex objects
    this.nv; // number of vertices
    this.ne; // (fill code) number of edges
    this.digraph = false; // (fill code) true if digraph, false otherwise (default undirected)

    // --------------------
    // student property fields next


    // --------------------
    // member methods use functions defined below

    this.read_graph = better_input; // new default input reader method   

    this.add_edge = add_edge; // (fill code) specify function to implement this interface method
    this.print_graph = list_vert;

    // --------------------
    // student methods next; actual functions in student code section at end

}


// -----------------------------------------------------------------------
// functions used by methods of Graph object
// similar to other functions but use object member fields and methods depending
// on which object is passed by method call through "this"
//

function add_edge(u_i, v_i)
{
    // fetch vertices using their id, where u: edge source vertex, v: target vertex 
    var u = this.vert[u_i];
    var v = this.vert[v_i];
    //document.writeln(u+ "  "+ v+" here problem");

    // insert (u,v), i.e., insert v (by id) in adjacency list of u
    u.adjacent.insert(v_i);

    // insert (v,u) if undirected graph (repeat above but reverse vertex order)
    if (this.digraph == false)
    {
        v.adjacent.insert(u_i);
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
            " - ADJACENCY: ", v.adjacent.traverse(), "<br>"); // note change (linked list call)
    }
}

// --------------------
// default graph input method (v,e here are local to be passed as parameters)
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
    if (this.digraph == false)
    {
        this.ne = 2 * ne;
    }

}

// -----------------------------------------------------------------------
// utility functions used by Graph object method functions




// -----------------------------------------------------------------------
// -----------------------------------------------------------------------
// --- begin student code section ----------------------------------------