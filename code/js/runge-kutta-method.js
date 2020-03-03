function evaluateFunction(t, y, func) {
  return eval(func);
}

function calculateK1(t, y, h, func) {
  return h * evaluateFunction(t, y, func);
}

function calculateK(t, y, h, k_old, func) {
  let y_copy = copyArray(y);
  for (let i = 0; i < y_copy.length; i++) {
    y_copy[i][y_copy[i].length - 1] = eval(
      y_copy[i][y_copy[i].length - 1] + k_old[i] / 2
    );
  }
  return h * evaluateFunction(t + h / 2, y_copy, func);
}

function copyArray(array) {
  return array.map(function(arr) {
    return arr.slice();
  });
}

function generateKArray(t, y, h, func_array, previous_kk) {
  let kk = [];
  for (let j = 0; j < y.length; j++) {
    let func = renewFunction(j, y, func_array, false);
    kk.push(calculateK(t, y, h, previous_kk, func));
  }
  return kk;
}

let y = [];
let t = [];
let h;
let determine_side;
let N;

function initializeValues(y0, big_n, a, b, get_reaction) {
  t[0] = a;
  for (let i = 0; i < y0.length; i++) {
    y.push([y0[i]]);
  }
  h = (b - a) / big_n;
  N = big_n;
  determine_side = get_reaction[0].split("");
}

function solution(func_array) {
  for (let i = 0; i < N; i++) {
    t[i + 1] = t[i] + h;
    
    let kk1 = [];
    for (let j = 0; j < y.length; j++) {
      let func = renewFunction(j, y, func_array, true);
      kk1.push(calculateK1(t[i], y, h, func));
    }
    let kk2 = generateKArray(t[i], y, h, func_array, kk1);
    let kk3 = generateKArray(t[i], y, h, func_array, kk2);
    let kk4 = generateKArray(t[i], y, h, func_array, kk3);

    for (let j = 0; j < y.length; j++) {
      y[j][i + 1] = eval(
        y[j][i] + (1 / 6) * (kk1[j] + 2 * kk2[j] + 2 * kk3[j] + kk4[j])
      );
    }
  }
  return [y, t];
}
