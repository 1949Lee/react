// 比较两个对象是否相等。若相等，则返回true
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
		if (Object.getOwnPropertyNames(x).length === Object.getOwnPropertyNames(y).length) {

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
export function HyphenToCamelCase(value: string): string {
	return value.replace(/-([a-z])/g, (substring: string, v: string) => {
		return v.toUpperCase()
	});
}


// 传入字节大小，转换为两位小数的大小显示文案：KB、MB、GB等。
export function FileSizeText(size: number = -1): string { // 保留两位小数
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

// // 比较两个数组是否相等。
// export function ArrayDiff(array: any[], keys?: string[]) {
// 	if (this.length != array.length) {
// 		return false
// 	} else {
// 		if (keys) {
// 			for (let i = 0; i < this.length; i++) {
// 				for (let j = 0; j < keys.length; j++) {
// 					if (!diff(this[i][keys[j]], array[i][keys[j]])) {
// 						return false
// 					}
// 				}
// 			}
// 		} else {
// 			for (let i = 0; i < this.length; i++) {
// 				if (!diff(this[i], array[i])) {
// 					return false
// 				}
// 			}
// 		}
// 		return true
// 	}
// }

// Array.prototype['diff'] = ArrayDiff;

// 将html原生的style转换为react的style-object。
export function ToStyleObj(str: string) {
	let obj = {};
	let map = str.split(";");
	for (let i = 0; i < map.length; i++) {
		let kv = map[i].split(":");
		kv[0] = HyphenToCamelCase(kv[0]);
		obj[kv[0]] = kv[1];
	}
	return obj;
}

// formatDate用到的内部方法
function formatNumber(n) {
	const str = n.toString()
	return str[1] ? str : `0${str}`
}

/**将date对象转换为格式化时间
 * @date Date对象类型
 * @format 形如yyyy-MM-dd hh:mm:ss*/
export function FormatDate(date:Date = new Date(), format:string = 'yyyy-MM-dd hh:mm:ss'):string {
	const yyyy = date.getFullYear(); // 年份
	const M = date.getMonth() + 1; // 月份
	const d = date.getDate(); // 日

	const h = date.getHours(); // 小时
	const m = date.getMinutes(); // 分
	const s = date.getSeconds(); // 秒
	const MM = formatNumber(M); // 月份加0， 如5 变为05
	const dd = formatNumber(d); // 日加0， 如1 变为01
	const hh = formatNumber(h); // 小时加0， 如4 变为04
	const mm = formatNumber(m); // 分加0， 如3 变为03
	const ss = formatNumber(s); // 秒加0， 如9 变为09
	let templates = [{ reg: 'yyyy', value: yyyy }, { reg: 'MM', value: MM }, { reg: 'M', value: M }, {
		reg: 'dd',
		value: dd
	}, { reg: 'd', value: d }, { reg: 'hh', value: hh }, { reg: 'h', value: h }, { reg: 'mm', value: mm }, {
		reg: 'm',
		value: m
	}, { reg: 'ss', value: ss }, { reg: 's', value: s }];
	let result:string = format;
	for (let template of templates) {
		result = result.replace(template.reg, template.value);
	}
	return result;
}
