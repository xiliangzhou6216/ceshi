<template>
  <div class="fl">
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
    <span class="to">至</span>
    <a-form-item>
      <a-input-number
        :min="2"
        class="input-number-width"
        :disabled="options.disabled"
        v-decorator="[
          `${name}[1]`,
          {
            initialValue: fieldValue[1],
            rules: [{ required: true,validator:options.validator.bind(this)}]
          }
        ]"
        :placeholder="$t('common.pleaseEnter')"
      />
    </a-form-item>
  </div>
</template>

<script>
export default {
  name: 'InputNumberBetween',
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
    // console.log(this.fieldValue)
  },
  methods: {

  }
}
</script>

<style scoped lang="less">
.fl{
  display:flex
}
.to{
  padding:0 5px;
}
.input-number-width{
  width: 100%
}

</style>
