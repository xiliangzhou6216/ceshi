<template>
  <div class="box">
    <a-form :form="form" :label-col="{ span: 3 }" :wrapper-col="{ span: 20 }">
      <div class="box-btn">
        <a-button @click="schemaSaveRule" type="primary" >保存</a-button>
      </div>
      <div>
        <rule-cards
          v-for="(item, rulesIndex) in rulesList.activityRules"
          :rule="item"
          :rulesIndex="rulesIndex"
          :key="rulesIndex"
          :disabled="!disabled"
          :totalList.sync="rulesList.activityRules"
          v-bind="$attrs"
        >
        </rule-cards>
        <a-button
          :disabled="!disabled || rulesList.activityRules.length === 5"
          class="add-rules"
          type="primary"
          @click="addRules()"
        >
          <span>+</span>添加活动规则
        </a-button>
      </div>
    </a-form>
  </div>
</template>
<script>

import RuleCards from './components/OtherComponents/RuleCards.vue'
import { INIT_DATA_RULE, MAP_DICT_TYPE, isArray } from './list/option'
import { cloneDeep } from 'lodash'
const DICT_TYPE = new Map(MAP_DICT_TYPE)
export default {
  components: {
    RuleCards
  },
  data () {
    return {
      rulesList: cloneDeep(INIT_DATA_RULE),
      visible: true,
      disabled: true,
      form: this.$form.createForm(this, { name: 'schema_version_rule' })
    }
  },
  computed: {

  },
  watch: {

  },
  provide () {
    return {
      contextForm: this.form
    }
  },
  created () {

  },
  methods: {
    addRules () {
      if (this.rulesList.activityRules.length === 5) return
      this.rulesList.activityRules.push(cloneDeep(INIT_DATA_RULE.activityRules[0]))
    },
    getRuleId () {
      return this.rulesList.activityRules.map(({ id }) => id)
    },
    schemaSaveRule () {
      this.form.validateFields(async (err, values) => {
        console.log(err, '数据', this.getActivityData(values))
      })
    },
    getActivityData (values) {
      const activityRules = values.activityRulesName ? this.getRuleCardsData(values) : []
      const saveData = Object.assign(
        {},
        {
          activityRules: activityRules
        }
      )
      return saveData
    },
    getRuleCardsData (values) {
      const activityRules = []
      values.activityRulesName.forEach((item, index) => {
        const obj = {}
        obj.name = item
        const distributeRule = {}
        const distributeRuleList = []
        if (values?.distributeRulename && values.distributeRulename[index]) {
          values.distributeRulename[index].forEach((item, i) => {
            const o = Object.assign(
              {},
              {
                name: item,
                condition: values.distributeRulecondition[index][i],
                value:
                  item === 'IS_USER_TRIGGER'
                    ? [Boolean(values.distributeRulevalue[index][i])]
                    : values.distributeRulevalue[index][i],
                type: DICT_TYPE.get(item).field?.type
              }
            )
            distributeRuleList.push(o)
          })
        }
        distributeRule.hasRule = values.distributeRule[index]
        distributeRule.rules = values.distributeRule[index] ? distributeRuleList : []
        obj.distributeRule = distributeRule
        const targetUserRule = {}
        const targetUserRuleList = []
        values.targetUserRulename[index].forEach((item, i) => {
          const val = values.targetUserRulevalue[index][i]
          const o = Object.assign(
            {},
            {
              name: item,
              condition: values.targetUserRulecondition[index][i],
              value: isArray(val) ? val : [val],
              type: DICT_TYPE.get(item).field?.type
            }
          )
          targetUserRuleList.push(o)
        })
        targetUserRule.rules = targetUserRuleList
        obj.targetUserRule = targetUserRule
        const effectiveRule = {}
        const effectiveRuleList = []
        values.effectiveRulename[index].forEach((item, i) => {
          const o = Object.assign(
            {},
            {
              name: item,
              condition: values.effectiveRulecondition[index][i],
              value: values.effectiveRulevalue[index][i],
              type: DICT_TYPE.get(item).field?.type
            }
          )
          if (item === 'WITHDRAWAL_INTERVAL') {
            Object.assign(o, {
              preConstraint: {
                name: 'REFERENCE',
                condition: values.effectiveRulepreConstraintConditionREFERENCE[index].flat().toString(),
                value: values.effectiveRulepreConstraintNameREFERENCE[index].flat()
              }
            })
          }
          if (item === 'TRADE_COUNT') {
            Object.assign(o, {
              preConstraint: {
                name: 'MARKET_TYPES',
                condition: values.effectiveRulepreConstraintConditionMARKET_TYPES[index].flat().toString(),
                value: values.effectiveRulepreConstraintNameMARKET_TYPES[index].flat()
              }
            })
          }
          effectiveRuleList.push(o)
        })
        effectiveRule.rules = effectiveRuleList
        obj.effectiveRule = effectiveRule
        activityRules.push(obj)
      })
      return activityRules
    }
  }
}
</script>
<style scoped lang="less">
.box{
  background-color: #fff;
}
.box-btn{
  padding: 20px;
  display: flex;
  justify-content: right;
}

</style>
