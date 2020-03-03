function replaceLetters(function_array, y, m) {
  return function_array.replace(
    /A|B|C|D|F|G|H|I|J|K|N|L|O|P|Q|R|S|T|U|V|W|X|Y|Z/,
    `y[${m}][${y[m].length - 1}]`
  );
}

function updateArrayIndices(function_array, y, m) {
  return (function_array = function_array.replace(
    `y[${m}][${y[m].length - 2}]`,
    `y[${m}][${y[m].length - 1}]`
  ));
}

function renewFunction(j, y, func_array, initialize) {
  let updated_function;
  let n = 1;
  for (let m = 0; m < y.length; m++) {
    if (j <= determine_side.length - 1) {
      n = 0;
    }
    if (initialize) {
      func_array[n] = replaceLetters(func_array[n], y, m);
    } else {
      func_array[n] = updateArrayIndices(func_array[n], y, m);
    }
    updated_function = func_array[n];
  }
  return updated_function;
}
