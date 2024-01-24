Vue.component('form-item', {
	props: {
		tagIs: { type: String, default: 'fragment' },
		form: { type: Array, default: () => [] },
		model: { type: Object, default: () => ({}) },
		dialog: { type: Boolean, default: false },
		tagClass: { type: String, default: '' }
	},
	mounted() {},
	template: /* HTML */ `
		<component :is="tagIs" :class="tagClass">
			<template v-for="f in form">
				<slot :name="'form-item_'+f.prop">
					<form-item
						v-if="f.union && f.form.length"
						:dialog="dialog"
						:model="model"
						:form="f.form.filter((f) => !f.hideByUnion)"
						:tag-class="f.tagClass || 'union-'+f.union"
						:tag-is="f.is || 'div'"
					>
						<template v-for="(v,s) in $slots" #[s]="scope"
							>{{s}} {{scope}}<slot :name="s" v-bind="scope"
						/></template>
					</form-item>
					<el-form-item
						v-else
						:class="dialog && (f.full ? 'full': 'half')"
						:style="f.fstyle"
						v-bind="{..._.pick(f,'label','prop','rules','class'), ...f.$fattrs}"
					>
						<slot :name="f.prop" :f="f">
							<component :is="f.type" v-model="model[f.prop]" v-bind="f.$attrs">
								<template v-if="f.options">
									<component
										v-for="op in f.options"
										:is="f.subType"
										:class="op.class"
										:value="op.value"
										:label="op.label"
										:key="op.value"
									>
									</component>
								</template>
							</component>
						</slot>
					</el-form-item>
				</slot>
			</template>
		</component>
	`
})
