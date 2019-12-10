// 比较两个对象是否相等。
export function diff(x: any, y: any) {
	let o1 = x instanceof Object;
	let o2 = y instanceof Object;
	// 判断是不是对象
	if (!o1 || !o2) {
		// NaN 和 NaN 比较永远返回false
		if (isNaN(x) && isNaN(y) && typeof x === 'number' && typeof y === 'number') {
			return true;
		}

		// 基本数据类型:null,undefined,number,string,bool(不含symbol)
		return x === y;
	} else {

		// 比较方法
		if ((typeof x === 'function' && typeof y === 'function') ||
			(x instanceof Date && y instanceof Date) ||
			(x instanceof RegExp && y instanceof RegExp) ||
			(x instanceof String && y instanceof String) ||
			(x instanceof Number && y instanceof Number)) {
			return x.toString() === y.toString();
		}

		// At last checking prototypes as good as we can
		if (!(x instanceof Object && y instanceof Object)) {
			return false;
		}

		if (x.isPrototypeOf(y) || y.isPrototypeOf(x)) {
			return false;
		}

		if (x.constructor !== y.constructor) {
			return false;
		}

		if (x.prototype !== y.prototype) {
			return false;
		}
	}

	let propsX = Object.getOwnPropertyNames(x);
	if (propsX.length !== Object.getOwnPropertyNames(y).length) {
		return false;
	}

	for (let o in propsX) {
		let t1 = x[o] instanceof Object;
		let t2 = y[o] instanceof Object;
		if (t1 && t2) {
			return diff(x[o], y[o]);
		} else if (x[o] !== y[o]) {
			return false;
		}
	}
	return true;
}
