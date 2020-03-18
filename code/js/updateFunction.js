let alphabet_pattern = /A|B|C|D|E|F|G|H|I|J|K|N|L|O|P|Q|R|S|T|U|V|W|X|Y|Z/;

function replaceLetters(function_to_change, substance_obj) {
  if (function_to_change.match(alphabet_pattern)) {
    let current_subs = function_to_change.match(alphabet_pattern)[0];
    let new_subs;
    for (let i = 0; i < substance_obj.length; i++) {
      if (substance_obj[i][current_subs]) {
        new_subs = substance_obj[i][current_subs];
      }
    }
    function_to_change = function_to_change.replace(
      new RegExp(current_subs, "g"),
      new_subs
    );
  }

  return function_to_change;
}

function renewFunction(y, j, substance_obj, initialize) {
  let updated_function;
  for (let m = 0; m < y.length; m++) {
    if (initialize) {
      console.log(substance_obj[j]);
      console.log(substance_obj[j].function);
      substance_obj[j].function = replaceLetters(
        substance_obj[j].function,
        substance_obj
      );
    } else {
      substance_obj[j].function = updateArrayIndices(
        y,
        substance_obj[j].function
      );
    }
    updated_function = substance_obj[j].function;
  }
  return updated_function;
}

function updateArrayIndices(y, func_array) {
  for (let m = 0; m < y.length; m++) {
    func_array = func_array.replace(
      `y[${m}][${y[m].length - 2}]`,
      `y[${m}][${y[m].length - 1}]`
    );
  }
  return func_array;
}
