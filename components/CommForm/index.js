Vue.component('comm-form', {
	props: {
		form: { type: Array, default: () => [] },
		model: { type: Object, default: () => ({}) },
		nonOperation: { type: Boolean, default: false },
		dialog: { type: Boolean, default: false },
		okText: { type: String, default: '查询' },
		labelWidth: { type: String, default: '100px' }
	},
	data() {
		return { hasRule: false }
	},
	methods: {
		submit(e, type) {
			e.preventDefault()
			if (type === '_RESET_') {
				this.$refs.commFormRef.resetFields()
				this.$emit('reset')
				return this.$emit('submit')
			}
			const obj = { ...this.$refs.commFormRef.model }
			if (!this.hasRule) return this.$emit('submit', obj)
			this.$refs.commFormRef.validate((valid) => {
				this.$emit('validate-val', valid)
				if (valid) {
					return this.$emit('submit', obj)
				} else {
					return false
				}
			})
		}
	},
	watch: {
		form: {
			handler(n, o) {
				const union = []
				n.forEach((f, index) => {
					!this.hasRule && 'rules' in f && f.rules.length > 0 && (this.hasRule = true)
					if ('union' in f && f.union) {
						const t = union.find((u) => u.union === f.union)
						if (t) {
							n[t.index].form.push(_.omit(f, 'form', 'union'))
							f.hideByUnion = true
						} else {
							union.push({ union: f.union, index })
							f.form = [_.omit(f, 'form', 'union')]
						}
					}
				})
			},
			deep: true,
			immediate: true
		}
	},
	mounted() {
		console.log(this)
	},
	template: /* HTML */ `
		<el-form
			ref="commFormRef"
			class="comm-form"
			:class="dialog ? 'dialog-form' : 'inline-form'"
			v-bind="$attrs"
			:model="model"
			:label-width="labelWidth"
		>
			<form-item :dialog="dialog" :model="model" :form="form.filter((f) => !f.hideByUnion)">
				<template v-for="(v,s) in $slots" #[s]="scope">
					{{s}}{{ typeof (scope)}}<slot :name="s" v-bind="scope" :_="{}"> </slot>
				</template>
			</form-item>
			<el-form-item class="form-operation" v-if="!nonOperation">
				<el-button type="primary" @click="submit($event)"> {{okText}} </el-button>
				<el-button @click="submit($event, '_RESET_')">重置</el-button>
			</el-form-item>
		</el-form>
	`
})
