BasicMath = {}

BasicMath.angleBtw = function (x1,y1, x2,y2){
    return Math.atan2(y2-y1, x2-x1)*180/3.1415
}

BasicMath.distance = function (x1,y1,x2,y2){
    return Math.sqrt(Math.pow(x2-x1,2)+Math.pow(y2-y1,2))
}

function shortAngleDist(a0,a1) {
    var max = 360;
    var da = (a1 - a0) % max;
    return 2*da % max - da;
}

BasicMath.angleLerp = function (a0,a1,t) {
    return a0 + shortAngleDist(a0,a1)*t;
}

module.exports = BasicMath