function evaluateFunction(t, y, func, W) {
  return eval(func);
}

function calculateK1(t, y, h, func, W) {
  return h * evaluateFunction(t, y, func, W);
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
  return array.map(function (arr) {
    return arr.slice();
  });
}

function updateFunctionIndices(y, substance_obj) {
  for (let j = 0; j < y.length; j++) {
    substance_obj[j].function = renewFunction(y, j, substance_obj, false);
  }
}

// Atsitiktinio kintamojo generavimas remiamas nuorodoje išsakyta logika
// https://www.r-bloggers.com/clt-standard-normal-generator/
function randomGaussian(mean, sigma) {
  let u = 0.0;
  for (var i = 0; i < 12; i++) u += Math.random();
  u -= 6;

  return u * parseFloat(sigma) + parseFloat(mean);
}

let y = [];
let t = [];
let h;
let N;
let catalyzation;

function initializeValues(big_n, a, b, substance_obj) {
  t[0] = a;
  let y_to_set = [];
  for (let i = 0; i < substance_obj.length; i++) {
    y_to_set.push([substance_obj[i].initial_conc]);
  }
  y = y_to_set;
  h = (b - a) / big_n;
  N = big_n;
  catalyzation = substance_obj[0].catalyzation;
}

function solution(substance_obj) {
  for (let i = 0; i < N - 1; i++) {
    let W = randomGaussian(0, Math.sqrt(h));
    t[i + 1] = t[i] + h;
    let kk1 = [];
    for (let j = 0; j < y.length; j++) {
      let func = renewFunction(y, j, substance_obj, true);
      kk1.push(calculateK1(t[i], y, h, func, W));
      updateFunctionIndices(y, substance_obj);
    }
    for (let j = 0; j < y.length; j++) {
      let result = eval(y[j][i] + kk1[j]);
      y[j][i + 1] = result <= 0 ? 0 : result;
    }
  }
  return [y, t];
}
