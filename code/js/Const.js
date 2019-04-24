var name;
//var sym; /** symbol object */
var value = 0; //value (typically some rate constant or K_d)

if(value = "gamma"){
    alert("Don't name your constants 'gamma', its a reserved keyword")
}

function Const(name, value){
    var conststant = {
        name: name,
        //sym: sym(name),
        value: value,
      };
}