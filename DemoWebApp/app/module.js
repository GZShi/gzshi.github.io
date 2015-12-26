var app = angular.module('demoApp', []);


app.controller('NavController', ['$scope', function ($scope) {
  $scope.title = '公式校验';
  $scope.isBeta = true;
  $scope.showMenu = false;
}]);


app.controller('CalcController', ['$scope', 'local', function ($scope, local) {
  $scope.values = {
    L1: local.get('var-L1') || 40,
    f: local.get('var-f') || 16,
    h: local.get('var-h') || 26,
    L: local.get('var-L') || 400,
    a: local.get('var-a') || 12,
    err: local.get('var-err') || 0.00001
  };
  $scope.infos = {
    runtime: '',
    result: ''
  };
  $scope.results = [0, 0];
  $scope.submited = false;

  // 第一个公式的函数表达
  function fn1(l1, f, h, l, a) {
    var temp1 = 1 / (l * l);
    var temp2 = 1 / l;

    var temp3 = 16 * l1 * f * temp1;
    var temp4 = 2 * h * temp1;
    var temp5 = 8 * f * temp2;

    var temp6 = temp3 - temp4 + temp5;

    var temp7 = Math.pow(4 * f - h, 2) - 16 * a * f;
    var temp8 = 4 * temp1 * temp7;

    var temp9 = Math.sqrt(0.5 * Math.pow(temp6, 2) - temp8);

    var result = Math.atan(-0.5 * temp6 + temp9);

    return result;
  }

  // 第二个公式的函数表达
  function fn2(l1, f, h, l, a) {
    // throw new TypeError('公式未定义');
    return 1;
  }

  $scope.calc = function () {
    $scope.submited = true;

    var v = $scope.values;
    var i = $scope.infos;

    var runtimeErr = '';
    var calcResult = '';
    var results = [0, 0];

    try {
      results[0] = fn1(v.L1, v.f, v.h, v.L, v.a);
    } catch(exp) {
      runtimeErr = runtimeErr || '公式一计算出错：' + exp;
    }

    try {
      results[1] = fn2(v.L1, v.f, v.h, v.L, v.a);
    } catch (exp) {
      runtimeErr = runtimeErr || '公式二计算出错：' + exp;
    }

    if (!runtimeErr) {
      if (Math.abs(results[1] - results[0]) > v.err) {
        calcResult = '结果相差过大';
      } else {
        calcResult = '在误差允许范围内';
      }
    }

    i.runtime = runtimeErr;
    i.result = calcResult;
    $scope.results = results;

    local.set('var-L1', v.L1);
    local.set('var-f', v.f);
    local.set('var-h', v.h);
    local.set('var-L', v.L);
    local.set('var-a', v.a);
    local.set('var-err', v.err);
  };

}]);