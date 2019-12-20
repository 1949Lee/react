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

		// 是否是一样的对象
		if ((typeof x === 'function' && typeof y === 'function') ||
			(x instanceof Date && y instanceof Date) ||
			(x instanceof RegExp && y instanceof RegExp) ||
			(x instanceof String && y instanceof String) ||
			(x instanceof Number && y instanceof Number)) {
			return x.toString() === y.toString();
		}

		// // At last checking prototypes as good as we can
		// if (!(x instanceof Object && y instanceof Object)) {
		// 	return false;
		// }
		//
		// if (x.isPrototypeOf(y) || y.isPrototypeOf(x)) {
		// 	return false;
		// }
		//
		// if (x.constructor !== y.constructor) {
		// 	return false;
		// }
		//
		// if (x.prototype !== y.prototype) {
		// 	return false;
		// }
		if(Object.getOwnPropertyNames(x).length === Object.getOwnPropertyNames(y).length) {

		}
		return false;
	}
	//
	// let propsX = Object.getOwnPropertyNames(x);
	// if (propsX.length !== Object.getOwnPropertyNames(y).length) {
	// 	return false;
	// }
	//
	// for (let o in propsX) {
	// 	// let t1 = x[propsX[o]] instanceof Object;
	// 	// let t2 = y[propsX[o]] instanceof Object;
	// 	// if (t1 && t2) {
	// 	// 	return diff(x[propsX[o]], y[propsX[o]]);
	// 	// } else if (x[propsX[o]] !== y[propsX[o]]) {
	// 	// 	return false;
	// 	// }
	// 	if(y[propsX[o]] === undefined && y[propsX[o]] !== x[propsX[o]]) {
	// 		return false;
	// 	}
	// 	if(!diff(x[propsX[o]], y[propsX[o]])) {
	// 		return false;
	// 	}
	// }
	return true;
}

// 连字符字符串转换为小驼峰，例如：background-color变为backgroundColor
export function HyphenToCamelCase(value:string):string{
	return value.replace(/-([a-z])/g,(substring:string, v:string) => {
		return v.toUpperCase()
	});
}


// 传入字节大小，转换为两位小数的大小显示文案：KB、MB、GB等。
export function FileSizeText(size: number = -1): string{ // 保留两位小数
	let result = "--";
	if (size > 0) {
		if (size < 1024) { // 大小区间：[0,1KB)
			result = size + "B";
		} else if (size >= 1024 && size < 1024 * 1024) { // 大小区间：[1KB,1MB)
			result = (size / 1024).toFixed(2) + "KB";
		} else if (size >= 1024 * 1024 && size < 1024 * 1024 * 1024) { // 大小区间：[1MB,1GB)
			result = (size / 1024 / 1024).toFixed(2) + "MB";
		} else { // 大小区间：[1GB,+∞)
			result = (size / 1024 / 1024 / 1024).toFixed(2) + "GB";
		}
	}
	return result;
};
