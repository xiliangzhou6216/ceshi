<template>
  <div>
    <a-form-item label="">
      <a-select
        :mode="options.selectMultiple"
        :disabled="options.disabled"
        placeholder="请选择"
        @change="changeSelect"
        v-decorator="[
          `${name}`,
          {
            initialValue: fieldValue,
            rules: [{ required: true,message: '不可为空' }]
          }
        ]"
      >
        <a-select-option
          v-for="option in options.selectData"
          :disabled="option.disabled"
          :key="option.key">
          {{ option.value }}
        </a-select-option>
      </a-select>
    </a-form-item>
  </div>
</template>

<script>
export default {
 name: 'SelectList',
  data () {
    return {
      value: ''
    }
  },
  props: {
    name: {
      type: String,
      default: () => ''
    },
    field: {
      type: String,
      default: () => ''
    },
    fieldValue: {
      type: [String, Array, Number],
      default: () => '' || []
    },
    options: {
      type: Object,
      default: () => {}
    },
    keyIndex: {
      type: String,
      default: () => ''
    }
  },
  components: {},
  watch: {

  },
  inject: ['contextForm'],
  created () {
    this.contextForm.setFieldsValue({ [`${this.name}`]: this.fieldValue })
  },
  methods: {
    changeSelect (val) {
      this.$emit('changeComponent', val)
    }
  }
}
</script>

<style scoped lang="less">

</style>
