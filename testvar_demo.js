// CPCS-324 Algorithms and Data Structures 2
// Test for missing value demo
// 2017, Dr. Muhammad Al-Hashimi

// -----------------------------------------------------------------------
// implement required-optional item logic

// testing for equality with 'undefined' works for: missing var values, 
// missing function arguments, and missing object properties
// use equality operator === instead of the usual == (google difference)

// we would like to develop an idiom for acting when a property field or 
// function argument is available (not missing)


// example 1: both x,y are declared but only x has value
var x=0, y;

// x will produce false since its value is *not* undefined, but y will result in true (missing value)
document.write( "<p>example 1 - variable has no value: ", x===undefined, " ", y===undefined, " " , "</p>");


// -----------------------------------------------------------------------
// example 2: object property fields
var ab = {a:3, b:4};

// there is no property "c" for the object (or perhaps missing)
document.write( "<p>example 2 - missing object fields: ", ab.a===undefined, " ", ab.b===undefined, " ", ab.c===undefined, "</p>" );


// -----------------------------------------------------------------------
// example 3: function arguments ('f' defined below)

// only first argument is passed
f(x);

// both arguments passed but second has no value
f(x,y);

// pass both parameters with values
y = null;      // null is a value!
f(x,y);

y = "";        // the empty string is also a value!
f(x,y);



// -----------------------------------------------------------------------
// a function with 2 declared arguments (used in example 3)
// note the idiom (actionable condition expression)

function f(a,b)
{
	document.write("<p>example 3 - first argument of f () is: ",a);
	
	if ( ! (b === undefined) )   // if b not missing (notice idiom used to act when optional item is available)
		document.write("<br>second argument is: ",b);
	else
		document.write("<br>second argument not passed or is undefined");
}