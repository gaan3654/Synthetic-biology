//Runge-Kutta metodas
function f(t, y, func, W) {
  return eval(func, W);
}

function k1(t, y, h, func, W) {
  return h * f(t, y, func, W);
}

function k2(t, y, h, k1, func, W) {
  //Nuklonuojamas y masyvas ؤ¯ y_copy
  var y_copy = [];
  for (var i = 0; i < y.length; i++) {
    var y_temp = [];
    for (var j = 0; j < y[i].length; j++) {
      y_temp[j] = y[i][j];
    }
    y_copy.push(y_temp);
  }
  //Prie konsentracijos reikإ،iإ³ pridedama k1/2
  for (var i = 0; i < y_copy.length; i++) {
    y_copy[i][y_copy[i].length - 1] = eval(
      y_copy[i][y_copy[i].length - 1] + k1[i] / 2
    );
  }
  return h * f(t + h / 2, y_copy, func, W);
}

function k3(t, y, h, k2, func, W) {
  //Nuklonuojamas y masyvas ؤ¯ y_copy
  var y_copy = [];
  for (var i = 0; i < y.length; i++) {
    var y_temp = [];
    for (var j = 0; j < y[i].length; j++) {
      y_temp[j] = y[i][j];
    }
    y_copy.push(y_temp);
  }
  //Prie konsentracijos reikإ،iإ³ pridedama k2/2
  for (var i = 0; i < y_copy.length; i++) {
    y_copy[i][y_copy[i].length - 1] = eval(
      y_copy[i][y_copy[i].length - 1] + k2[i] / 2
    );
  }
  return h * f(t + h / 2, y_copy, func, W);
}

function k4(t, y, h, k3, func, W) {
  //Nuklonuojamas y masyvas ؤ¯ y_copy
  var y_copy = [];
  for (var i = 0; i < y.length; i++) {
    var y_temp = [];
    for (var j = 0; j < y[i].length; j++) {
      y_temp[j] = y[i][j];
    }
    y_copy.push(y_temp);
  }
  //Prie konsentracijos reikإ،iإ³ pridedama k3
  for (var i = 0; i < y_copy.length; i++) {
    y_copy[i][y_copy[i].length - 1] = eval(
      y_copy[i][y_copy[i].length - 1] + k3[i]
    );
  }
  return h * f(t + h, y_copy, func, W);
}
//Sumaإ¾inti kodؤ… tiek k apskaiؤچiavimu
function renew_function(j, y, left_subs_count, func_array, func) {
  for (var m = 0; m < y.length; m++) {
    if (j < left_subs_count.length - 1) {
      func_array[0] = func_array[0].replace(
        `y[${m}][${y[m].length - 2}]`,
        `y[${m}][${y[m].length - 1}]`
      );
      func = func_array[0];
    }
    if (j > left_subs_count.length - 1) {
      func_array[1] = func_array[1].replace(
        `y[${m}][${y[m].length - 2}]`,
        `y[${m}][${y[m].length - 1}]`
      );
      func = func_array[1];
    }
  }
  return func;
}

function randomGaussian(mean, sigma) {
  var u = Math.random();
  return (
    (u % 1e-8 > 5e-9 ? 1 : -1) *
      Math.sqrt(-Math.log(Math.max(1e-9, u))) *
      sigma +
    mean
  );
}

function solution(y0, a, b, N, func_array, get_reaction, g2, y_mean) {
  var left_subs_count = get_reaction[0].split("");
  var func;
  var t = [];

  //daugiamatis masyvas inicializuojamas su pradinؤ—m medإ¾iagإ³ konsentracijom
  var y = [];
  for (var i = 0; i < y0.length; i++) {
    y.push([y0[i]]);
  }
  // console.log(y);
  t[0] = a;
  var h = (b - a) / N;
  for (var i = 0; i < N; i++) {
    var W = randomGaussian(0, 1); // (mean=0; standart_deviation=delta_t)
    t[i + 1] = t[i] + h;
    var kk1 = [];
    var kk2 = [];
    var kk3 = [];
    var kk4 = [];

    var hash = {};
    var regex = /A|B|C|D|F|G|H|I|J|K|N|L|O|P|Q|R|S|T|U|V|X|Y|Z/;

    for (var j = 0; j < y.length; j++) {
      // For the initial run, replace all letters with corresponding array locations
      for (var m = 0; m < func_array.length; m++) {
        while (func_array[m].match(regex)) {
          // Create a hash of substances and assign corresponding indices.
          // Afterwards replace letters with corresponding array location.
          if (func_array[m].match(regex)) {
            var found = func_array[m].match(regex);
            if (hash[found[0]] !== undefined) {
              func_array[m] = func_array[m].replace(
                found[0],
                `y[${hash[found[0]]}][${y[hash[found[0]]].length - 1}]`
              );
            } else {
              hash[found[0]] = Object.keys(hash).length;
              func_array[m] = func_array[m].replace(
                found[0],
                `y[${hash[found[0]]}][${y[hash[found[0]]].length - 1}]`
              );
            }
          }
          func = func_array[m];
        }
      }
      func = renew_function(j, y, left_subs_count, func_array, func);
      kk1.push(k1(t[i], y, h, func, W));
    }
    for (var j = 0; j < y.length; j++) {
      func = renew_function(j, y, left_subs_count, func_array, func);
      kk2.push(k2(t[i], y, h, kk1, func, W));
    }
    for (var j = 0; j < y.length; j++) {
      func = renew_function(j, y, left_subs_count, func_array, func);
      kk3.push(k3(t[i], y, h, kk2, func, W));
    }
    for (var j = 0; j < y.length; j++) {
      func = renew_function(j, y, left_subs_count, func_array, func);
      kk4.push(k4(t[i], y, h, kk3, func, W));
    }

    for (var j = 0; j < y.length; j++) {
      // y[j][i+1] = eval(y[j][i]+1/6*(kk1[j]+2*kk2[j]+2*kk3[j]+kk4[j]));
      y[j][i + 1] = eval(y[j][i] + kk1[j]); //+g2*kk1[j]*W);
      y_mean[j][i + 1] += y[j][i + 1];
    }
  }

  return [y, t];
}
