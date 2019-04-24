var yt0 = 1;
var y0 = yt0;
var t=[];
var y=[];

function f(t,y){
  return y;
}

function k1(t, y, h){
  return h * f(t,y);
}

function k2(t, y, h, k1){
  return h * f(t+h/2,y+k1/2);
}

function k3(t, y, h, k2){
  return h * f(t+h/2,y+k2/2);
}

function k4(t, y, h, k3){
  return h * f(t+h,y+k3);
}

function solution(y0, a, b, N){
  y[0] = y0;
  t[0] = a;
  var h= (b-a)/N;
  for (var i=0; i < N; i++) {
    t[i+1] = t[i]+h;
    var kk1 = k1(t[i], y[i], h);
    var kk2 = k2(t[i], y[i], h, kk1);
    var kk3 = k3(t[i], y[i], h, kk2);
    var kk4 = k4(t[i], y[i], h, kk3);
    y[i+1] = y[i]+1/6*(kk1+2*kk2+2*kk3+kk4);
  } 
  return y;
}
console.log(solution(y0, 0, 1, 100));