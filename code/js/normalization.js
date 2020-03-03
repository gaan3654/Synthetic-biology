let y_min = 0;
let y_max;
//Gautų rezultatų normalizavimas
function normalization(y, t, a, b, height, width) {
  let yp = [];
  let tp = [];
  
  let y_maxRow = y.map(function(row){ return Math.max.apply(Math, row); });
  y_max = Math.max.apply(null, y_maxRow);

  //yy normalizacija
  let k_y = 1;
  let l_y = 1;
  if (y_min != y_max) {
    k_y = 1 / (y_max - y_min);
    l_y = -y_min / (y_max - y_min);
  }
  //tt normalizacija
  let k_t = 1 / (b - a);
  let l_t = -a / (b - a);

  for (let i = 0; i < y.length; i++) {
    let yp_temp = [];
    for (let j = 0; j < y[i].length; j++) {
      yp_temp[j] = height - 20 - (k_y * y[i][j] + l_y) * (height - 20);
      y[i][j] = yp_temp[j];
      if (i == 0) {
        tp[j] = (k_t * t[j] + l_t) * (width - 20) + 20;
      }
    }
    yp.push(yp_temp);
  }
  return [yp, tp];
}
