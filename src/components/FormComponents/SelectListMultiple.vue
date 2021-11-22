<template>
  <div>
    <a-form-item label="">
      <a-select
        mode="multiple"
        :disabled="options.disabled"
        v-decorator="[
          `${name}`,
          {
            initialValue: fieldValue,
            rules: [{ required: true,message: '不可为空' }]
          }
        ]"
        show-search
        placeholder="请输入"
        :default-active-first-option="false"
        :show-arrow="false"
        :filter-option="false"
        :not-found-content="fetching ? undefined : null"
        @search="val => searchCode(val)"
        @change="handleChange"
      >
        <a-spin v-if="fetching" slot="notFoundContent" size="small" />
        <a-select-option v-for="d in data" :key="d.number || d.key">
          {{ d.number || d.value }}
        </a-select-option>
      </a-select>
    </a-form-item>
  </div>
</template>

<script>

import { debounce } from 'lodash'
export default {
 name: 'SelectListMultiple',
  data () {
    this.searchCode = debounce(this.searchCode)
    return {
      data: [],
      fetching: false
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
    handleChange (value) {
       Object.assign(this, {
        data: [],
        fetching: false
      })
    },
    async searchCode (value) {
      // console.log(value, this.options)
      if (this.fetching) return
      // if (this.options.type === 'SEARCH') {
      //   if (value.length < 4) return
      //   this.fetching = true
      //   const { result } = await pmnAll({ number: value })
      //   this.data = result
      //   this.fetching = false
      // } else if (this.options.type === 'DICT') {
      //   this.data = this.dictionary.promoCode.filter(item =>
      //     item.key.includes(value.toUpperCase())
      //   )
      // }
      this.fetching = false
    }
  }
}
</script>

<style scoped lang="less">

</style>
