app.factory('local', function () {

	if (false === ('localStorage' in window)) {
		return {
			get: function () {
				return undefined;
			},
			set: function () {
				return undefined;
			}
		}
	}

	var prefix = 'DEMO_APP';
	var ls = localStorage;
	var resolveKey = function (key) {
		return prefix + '#' + key;
	};

	return {
		get: function (key) {
			key = resolveKey(key);
			var raw = ls.getItem(key);
			return JSON.parse(raw);
		},
		set: function (key, value) {
			key = resolveKey(key);
			var raw = JSON.stringify(value);
			ls.setItem(key, raw);
		}
	};
});