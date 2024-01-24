// #region form item
/**
 * @desc: 表单项生成
 * @param {*} label 表单项名称
 * @param {*} type 表单项类型
 * @param {*} prop 表单项属性键
 * @param {*} disabled 表单项是否禁用
 * @param {*} props 表单项映射规则（Select）
 * @param {*} options 表单项下拉框数据（Select）
 * @return {*}
 */
export function fi(_label, type, prop, disabled, options, props = ['label', 'value'], subType = 'ElOption') {
	let prefix = 'El'
	let ttype = type
	Array.isArray(type) && ([prefix, ttype] = type)
	const formItem = { label: _label, type: prefix + ttype, prop, disabled }
	switch (type) {
		case 'Select':
			if (Array.isArray(props)) {
				const [label, value] = props
				formItem.props = { label, value }
			} else {
				throw new Error(_label + '下拉框需要传入数组映射键值')
			}
			formItem.subType = subType
			formItem.options = options || []
			break
		case 'Input':
			formItem.placeholder = '请输入内容'
			break
		default:
	}
	return formItem
}
/**
 * @desc: 表单项下拉框数据填充（简单类型）
 * @param {*} arr
 * @param {*} start
 * @return {*}
 */
export function simpleOptions(arr, start = 0) {
	if (Array.isArray(arr)) {
		const result = []
		arr.forEach((item, index) => {
			result.push({ label: item, value: index + start + '' })
		})
		return result
	} else {
		throw new Error('simpleOptions 仅接收数组')
	}
}
/**
 * @desc: 表单状态项
 * @param {*} prop 表单状态项属性键
 * @param {*} lable 表单状态项名称（'状态'略
 * @return {*}
 */
export function stateFormItem(prop, lable = '') {
	return {
		...formItem(lable + '状态', 'Switch', prop, false),
		class: 'inline',
		notFull: true,
		right: true,
		inactive: '0',
		active: '1'
	}
}
/**
 * @desc: 必输（选）规则
 * @param {*} text 表单项名称
 * @param {*} type 类型
 * @return {*}
 */
export function setRequired(text, type = 1) {
	return {
		required: true,
		message: '请' + (type === 1 ? '输入' : '选择') + text,
		trigger: 'blur'
	}
}
/**
 * @desc: 表单项下拉框数据填充
 * @param {*} fform form表单定义键
 * @param {*} type 表单项类型
 * @param {*} prop 表单项属性键
 * @param {*} optionsRes optins数据
 * @return {*}
 */
export function formItemOptionsSet(fform, type, prop, optionsRes) {
	this[fform].forEach((item) => {
		item.type === type && item.prop === prop && (item.options = optionsRes)
	})
}
