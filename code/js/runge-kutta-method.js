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

function generateKArray(t, y, h, substance_obj, previous_kk) {
  let kk = [];
  for (let j = 0; j < y.length; j++) {
    substance_obj[j].function = renewFunction(y, j, substance_obj, false);
    kk.push(calculateK(t, y, h, previous_kk, substance_obj[j].function));
  }
  return kk;
}

let y = [];
let t = [];
let h;
let N;

function initializeValues(big_n, a, b, substance_obj) {
  t[0] = a;
  let y_to_set = [];
  for (let i = 0; i < substance_obj.length; i++) {
    y_to_set.push([substance_obj[i].initial_conc]);
  }
  y = y_to_set;
  h = (b - a) / big_n;
  N = big_n;
}

function solution(substance_obj) {
  for (let i = 0; i < N; i++) {
    t[i + 1] = t[i] + h;
    let kk1 = [];
    //a+b+b->c kol kas neveikia
    for (let j = 0; j < y.length; j++) {
      let func = renewFunction(y, j, substance_obj, true);
      kk1.push(calculateK1(t[i], y, h, func, substance_obj[j]));
    }
    let kk2 = generateKArray(t[i], y, h, substance_obj, kk1);
    let kk3 = generateKArray(t[i], y, h, substance_obj, kk2);
    let kk4 = generateKArray(t[i], y, h, substance_obj, kk3);

    for (let j = 0; j < y.length; j++) {
      y[j][i + 1] = eval(
        y[j][i] + (1 / 6) * (kk1[j] + 2 * kk2[j] + 2 * kk3[j] + kk4[j])
      );
    }
  }
  return [y, t];
}
