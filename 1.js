// CPCS 324 Algorithms & Data Structures 2
// Graph data structure starter - First Graph Object
// 2017, Dr. Muhammad Al-Hashimi

// -----------------------------------------------------------------------
// start the vertex part of a simple graph object (no edges yet)
//

// use this simple array of objects to input vertices,
// read into corresponding user input fields (see the Vertex object below)

// replace label init with strings of your choice
// be creative (don't do "a", "b" ..., or "1", "2" etc.)

var _v = [ {label:"disneyland"}, {label:" Yoruba"}, {label:"Happy Valley"} ];


// create a graph
var _g = new Graph();

// input graph data into internal data structures of graph object
_g.read_graph( _v );


// -----------------------------------------------------------------------
// Vertex object constructor

function Vertex(v)
{
// user input fields

this.label = v.label;          // vertex can have label, example: a, v1, jeddah

// more fields to initialize internally

this.adjacent = null;          // head pointer of adjacency linked list
// (fill code) vertex can be marked visited (useful for traversals)
this.visit=false;
}

// -----------------------------------------------------------------------
// Graph object constructor

function Graph()
{
this.vert = [];                // vertex list: array of Vertex objects
this.nv;                       // number of vertices

// --------------------
// student property fields next


// --------------------
// member methods use functions defined below

this.read_graph = graph_input; // default input reader method
this.print_graph = list_vert;

// --------------------
// student methods next; actual functions in student code section at end

}


// -----------------------------------------------------------------------
// functions used by methods of Graph object
// similar to other functions but use object member fields and methods depending
// on which object is passed by method call through "this"
//

// --------------------
function list_vert()               // simple vertex lister
{
var i, v;                      // local vars
for (i=0; i < this.nv; i++)
{
v = this.vert[i];
document.write( "VERTEX: ", i, " {", v.label, "} - VISIT: ", v.visit,
" - ADJACENCY: ", v.adjacent, "<br>" );
}
}

// --------------------
function graph_input(v)
{
// (fill code below) set number of vertices field
this.nv= v.length;

// (fill code below) input vertices into internal vertex array
var i;
for (i=0; i< this.nv; i++){
    this.vert[i]= new Vertex(v[i]);
}



}