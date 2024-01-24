import { Plugin } from '../plugins/vue-fragment.esm.js'
import * as form from './form.js'
import * as plumb from './plumb.js'
Vue.use(Plugin)
export function g(key, obj) {
	const arr = key.split('.')
	return arr.reduce((a, b) => {
		return a[b]
	}, obj)
}
export function splice(origin, key, arr) {
	g(key, origin).splice(0, g(key, origin).length, ...arr)
}
window.__ = {
	g,
	splice,
	...form,
	...plumb
}
