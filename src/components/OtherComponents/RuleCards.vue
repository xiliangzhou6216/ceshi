<template>
  <div class="card">
    <form-generator
      v-bind="$attrs"
      :typeRule="ruleObj.targetUserRule"
      :hasRule.sync="ruleObj.targetUserRule.hasRule"
      :label="'targetUserRule'">
    </form-generator>
    <div class="parting"></div>
    <form-generator
      v-bind="$attrs"
      :handleRateCallback="watchEffectiveRule"
      :typeRule="ruleObj.effectiveRule"
      :hasRule.sync="ruleObj.effectiveRule.hasRule"
      :label="'effectiveRule'">
    </form-generator>
    <div class="parting"></div>
    <form-generator
      v-bind="$attrs"
      :typeRule="ruleObj.distributeRule"
      :hasRule.sync="ruleObj.distributeRule.hasRule"
      :label="'distributeRule'">
    </form-generator>
    <div class="parting"></div>
    <div class="delete-circle" @click="deleteRules" v-show="!$attrs.disabled&&$attrs.rulesIndex===$attrs.totalList.length-1">
      删除
    </div>
  </div>
</template>

<script>
import FormGenerator from '../FormComponents/FormGenerator.vue'
import { RITE_SHOW } from '../../list/option'
export default {
  name: 'RuleModule',
  props: {
    rule: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      ruleObj: {},
      rateShow: false
    }
  },
  components: {
    FormGenerator
  },
  computed: {

  },
  watch: {
    rule: {
      handler (val) {
        this.ruleObj = val
      },
      immediate: true
    }
  },
  mounted () {

  },
  methods: {
    deleteRules () {
      this.$attrs.totalList.pop()
      this.$emit('update:totalList', this.$attrs.totalList)
    },
    watchEffectiveRule (params) {
      this.rateShow = RITE_SHOW.some((item) => {
          return params.reduce((acc, { id }) => {
            return acc.concat(id)
            }, []).includes(item)
        })
    }
  }
}
</script>

<style scoped lang="less">
.card {
  padding: 20px 0;
  margin-bottom: 20px;
  box-shadow: 0px 0px 25px 0px rgba(0, 0, 0, 0.08);
  position: relative;
  .parting {
    width: 93%;
    border-top: 1px solid #ececec;
    margin: 13px 0;
    margin-left: 33px;
  }
}
.delete-circle{
  color: red;
  padding: 10px;
  cursor: pointer;
  position: absolute;
  top: 7px;
  right: 10px;
}
</style>
