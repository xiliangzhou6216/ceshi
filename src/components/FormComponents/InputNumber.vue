<template>
  <div >
    <a-form-item>
      <a-input-number
        :min="1"
        :disabled="options.disabled"
        class="input-number-width"
        v-decorator="[
          `${name}[0]`,
          {
            initialValue: fieldValue[0],
            rules: [{ required: true,validator:options.validator.bind(this) }]
          }
        ]"
        :placeholder="$t('common.pleaseEnter')"
      />
    </a-form-item>
  </div>
</template>

<script>
export default {
  name: 'InputNumber',
  data () {
    return {}
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
      type: [String, Array],
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
  watch: {},
  mounted () {
    // console.log(this.options)
  },
  methods: {

  }
}
</script>

<style scoped lang="less">
.input-number-width{
  width: 100%
}
</style>
