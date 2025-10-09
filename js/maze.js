function generateSquareMaze(e) {
  var i = new Array(e);
  i.dimension = e;
  for (var n = 0; n < e; n++) {
    i[n] = new Array(e);
    for (var r = 0; r < e; r++) i[n][r] = !0;
  }
  return (i = (function e(i, n, r) {
    for (i[n][r] = !1; ; ) {
      if (
        ((directions = []),
        1 < n && 1 == i[n - 2][r] && directions.push([-1, 0]),
        n < i.dimension - 2 && 1 == i[n + 2][r] && directions.push([1, 0]),
        1 < r && 1 == i[n][r - 2] && directions.push([0, -1]),
        r < i.dimension - 2 && 1 == i[n][r + 2] && directions.push([0, 1]),
        0 == directions.length)
      )
        return i;
      (dir = directions[Math.floor(Math.random() * directions.length)]),
        (i[n + dir[0]][r + dir[1]] = !1),
        (i = e(i, n + 2 * dir[0], r + 2 * dir[1]));
    }
  })(i, 1, 1));
}
var playStartSound = function () {
  var e = document.getElementById("start");
  (e.currentTime = 0), e.play();
};
window.onload = function () {
  setTimeout(playStartSound, 3500);
};
