<template>
  <div class="form-gen">
    <a-form-item :label="labelValue" v-if="label==='distributeRule'">
      <a-radio-group
        @change="changeDistributeRadio"
        :disabled="$attrs.disabled"
        v-decorator="[
          `${label}[${$attrs.rulesIndex}]`,
          {
            initialValue:isRule,
            rules: [{ required: true}]
          }
        ]">
        <a-radio :value="true">
          有
        </a-radio>
        <a-radio :value="false">
          无
        </a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item required :wrapperCol="wrapperCol">
      <span slot="label" v-if="!(label==='distributeRule')">{{ labelValue }}</span>
      <a-row :gutter="8" v-for="(item, componentInfoIndex) in ruleObj.componentInfo" :key="item.id">
        <a-col :span="child.options.col" v-for="(child, listIndex) in item.list" :key="listIndex">
          <component
            :is="child.componentsType"
            :keyIndex="`[${componentInfoIndex}]`"
            :field="child.field"
            :fieldValue="child.fieldValue"
            :options="child.options"
            :name="`${label}${child.field}[${$attrs.rulesIndex}][${componentInfoIndex}]`"
            @changeComponent="(val)=>changeComponentHandle(val,child.field)"
          >
          </component>
        </a-col>
        <span
          @click="deleteList(item, componentInfoIndex)"
          v-show="!$attrs.disabled&&componentInfoIndex === ruleObj.componentInfo.length - 1 && componentInfoIndex !== 0"
          class="delete-list del-icon"
        >
          删除
        </span>
      </a-row>
    </a-form-item>
    <div class="add-list">
      <a @click="addList" v-show="addListDisabled()">
        <span class="plus">+</span>
        <span>添加{{ labelValue }}</span>
      </a>
    </div>
  </div>
</template>
<script>

import { DICTIONARY } from '../../list/mock'
import { merge, cloneDeep } from 'lodash'
import * as itemComponents from './index'
import { MAP_RULE_TYPE, MAP_DICT_TYPE, INIT_DATA_RULE } from '../../list/option'
const RULE_TYPE = new Map(MAP_RULE_TYPE)
const DICT_TYPE = new Map(MAP_DICT_TYPE)

export default {
  name: 'FormGenerator',
  props: {
    hasRule: {
      type: Boolean,
      default: () => true
    },
    label: {
      type: String,
      default: () => ''
    },
    typeRule: {
      type: Object,
      default: () => {}
    },
    handleRateCallback: {
      type: Function,
      default: () => () => {}
    }
  },
  data () {
    return {
      ruleObj: {},
      typeList: []
    }
  },
  components: {
    ...itemComponents
  },
  computed: {
    isRule () {
      return !!this.hasRule
    },
    groupDict ({ label }) {
      const dict = RULE_TYPE.get(label).key
      const dictSort = DICTIONARY[dict]
      this.disabledDictAllFalse(dictSort)
      return cloneDeep(dictSort)
    },
    labelValue ({ label }) {
      return RULE_TYPE.get(label).text
    },
    wrapperCol ({ label }) {
      const offset = label === 'distributeRule' ? 3 : 0
      return { span: 20, offset: offset }
    }
  },
  watch: {
    typeRule: {
      handler (val) {
        this.ruleObj = val
      },
      immediate: true
    }
  },
  created () {
    const disabled = this.$attrs.disabled
    const obj = {
      options: {
        disabled: disabled
      }
    }
    // const start = performance.now()
    this.typeList = this.getFormDataInfo(this.ruleObj.rules, obj)
    console.log(this.typeList)
    this.renderForm(this.typeList)
    // const end = performance.now()
    // console.log(`${end - start}ms`)
    // console.log(this.ruleObj, this.$attrs)
  },
  methods: {
    addListDisabled () {
      if (this.$attrs.disabled) {
        return false
      }
      return this.isRule && (this.typeList.length < this.groupDict.length)
    },
    changeDistributeRadio (e) {
       const value = e.target.value
       const rules = cloneDeep(INIT_DATA_RULE.activityRules[0].distributeRule.rules)
       this.$emit('update:hasRule', value)
       if (value) {
         this.ruleObj.componentInfo = this.typeList = this.getFormDataInfo(rules)
       } else {
         this.disabledDictAllFalse(this.groupDict)
         this.ruleObj.componentInfo = this.typeList = []
       }
    },
    changeComponentHandle (val, field) {
      if (field !== 'name') {
        return
      }
      const objField = DICT_TYPE.get(val).field
      this.typeList.splice(this.typeList.length - 1, 1, ...this.getFormDataInfo([objField]))
      this.handleRateCallback(this.typeList)
      // debugger
      // console.log(this.typeList)
      this.$set(this.ruleObj, 'componentInfo', this.typeList)
    },
    addList () {
      this.disabledFieldData()
      const lastKey = this.groupDict.find(item => !item.disabled)?.key
      const objField = DICT_TYPE.get(lastKey).field
      this.typeList = this.typeList.concat(this.getFormDataInfo([objField]))
      this.renderForm(this.typeList)
    },
    deleteList (item, index) {
      this.typeList = this.typeList.filter(it => it.id !== item.id)
      const endIndex = this.typeList.length - 1
      const key = this.typeList[endIndex].id
      this.groupDict.forEach(item => {
        if (item.key === key) {
          item.disabled = false
        }
      })
      this.matchDictKey(key)
      this.renderForm(this.typeList)
    },
    renderForm (data) {
      this.disabledListData(data)
      this.handleRateCallback(data)
      this.$set(this.ruleObj, 'componentInfo', this.typeList)
    },
    matchDictKey (key) {
       this.typeList.forEach(({ list }) => {
           list.forEach(({ options }) => {
            options.selectData.forEach(son => {
                if (son.key === key) {
                  son.disabled = false
                }
            })
          })
      })
    },
    disabledDictAllFalse (data) {
       data.forEach(item => {
          item.disabled = false
      })
    },
    disabledDictData (data, params) {
      const { disabled, name } = params
      data.forEach(item => {
        if (item.key === name) {
          item.disabled = disabled
        }
      })
    },
    disabledListData (data) {
       if (this.$attrs.disabled) return
       data.forEach((item, index) => {
          item.list.forEach(child => {
            child.options.disabled = (index !== (data.length - 1))
          })
      })
    },
    disabledFieldData (key) {
      this.groupDict.forEach(item => {
          item.disabled = false
          this.typeList.forEach(child => {
            if (item.key === ((item.key !== key) && child.id)) {
              item.disabled = true
            }
          })
        })
    },
    groupCondition (name) {
      const conArr = DICT_TYPE.get(name)?.value || []
      const ruleCondition = DICTIONARY.ruleCondition
      return ruleCondition.filter(({ key }) => conArr.includes(key))
    },
    groupId (data = [], prop = 'id') {
      return data.reduce((acc, item) => {
        const key = item[prop]
        if (!acc[key]) {
          acc[key] = []
        }
        acc[key].push(...item.list)
        return acc
      }, {})
    },
    getFormDataInfo (data = [], obj) {
      const getConfigForm = this.formDataConfig(obj)
      const handleFormData = (key, data, item) => {
        return getConfigForm[key]?.bind(this)(data, item)
      }
      if (!Array.isArray(data)) {
        return
      }
      const ruleList = data.map((item, index) => {
        let o = {
            name: item.name,
            condition: item.condition,
            value: item.value,
            type: item.type
        }
        if (item.preConstraint) {
          o = { ...o, preConstraint: item.preConstraint }
        }
        item = o
        const list = []
        const isEndIndex = (index !== (data.length - 1))
        for (const key in item) {
          const handleObj = (item, field = key) => {
            return handleFormData(key, { field: field, fieldValue: item[key] }, { ...item, disabled: isEndIndex })
          }
          if (key === 'type') {
            continue
          }
          if (key === 'preConstraint') {
            const { name, condition, value } = item?.preConstraint
            if (condition) {
              list.splice(
                1,
                0,
                handleFormData(
                  'condition',
                  { field: `preConstraintCondition${name}`, fieldValue: condition },
                  item?.preConstraint
                )
              )
            }
            if (name && value) {
              list.splice(
                2,
                0,
                handleFormData(key, { field: `preConstraintName${name}`, fieldValue: value }, item?.preConstraint)
              )
            }
          } else {
            list.push(handleObj(item))
          }
        }

        return { list, id: item.name }
      })
      return ruleList
    },
    formDataConfig (params = {}) {
      // 每个后台数据字段  直接对应组件类型 映射
      const FIELD = { A: 'name', B: 'condition', C: 'value', D: 'preConstraint' }
      const { A, B, C, D } = FIELD
      const baseFormObj = {
        componentsType: {},
        componentsName: '',
        options: {
          col: 5,
          disabled: false,
          type: null,
          validator: () => {},
          selectData: [],
          selectMultiple: 'default'
        }
      }
      let configFormObj = {}
      const configForm = {
        [A]: function (data, item) {
          this.disabledDictData(this.groupDict, item)
          configFormObj = {
            componentsType: itemComponents.SelectList,
            componentsName: itemComponents.SelectList.name,
            options: {
              selectData: this.groupDict
            }
          }
          return merge({}, baseFormObj, configFormObj, data, params)
        },
        [B]: function (data, item) {
          const { name } = item
          const condition = this.groupCondition(name)
          const disabled = DICT_TYPE.get(name).disabled
          const col = DICT_TYPE.get(name).col
          configFormObj = {
            componentsType: itemComponents.SelectList,
            componentsName: itemComponents.SelectList.name,
            options: {
              col: col,
              disabled: disabled,
              selectData: condition
            }
          }
          return merge({}, baseFormObj, configFormObj, data, params)
        },
        [C]: function (data, item) {
          const { condition, type, name } = item
          if (condition === 'EQ' && type === 'SELECT') {
            configFormObj = {
              componentsType: itemComponents.SelectList,
              componentsName: itemComponents.SelectList.name,
              options: {
                selectData: [
                  { key: -1, value: '全部用户' },
                  { key: 0, value: '大陆用户' },
                  { key: 1, value: '香港及海外用户' }
                ]
              }
            }
          }
          if (condition === 'EQ' && type === 'BOOLEAN') {
            data = Object.assign({}, data, { fieldValue: data.fieldValue[0] & 1 })
            configFormObj = {
              componentsType: itemComponents.SelectList,
              componentsName: itemComponents.SelectList.name,
              options: {
                selectData: [
                  { key: 1, value: '是' },
                  { key: 0, value: '否' }
                ]
              }
            }
          }
          if (type === 'SEARCH' || type === 'DICT') {
            configFormObj = {
              componentsType: itemComponents.SelectListMultiple,
              componentsName: itemComponents.SelectListMultiple.name,
              options: {
                selectData: [],
                type
              }
            }
          }

          if (condition === 'BETWEEN' && type === 'DATE') {
            configFormObj = {
              componentsType: itemComponents.RangePicker,
              componentsName: itemComponents.RangePicker.name,
              options: {
                col: 12
              }
            }
          }
          if (condition === 'BETWEEN' && type === 'NUMBER') {
            configFormObj = {
              componentsType: itemComponents.InputNumberBetween,
              componentsName: itemComponents.InputNumberBetween.name,
              options: {
                col: 7,
                validator: DICT_TYPE.get(name).validator
              }
            }
          }
          if ((condition === 'GTE' || condition === 'EQ') && type === 'NUMBER') {
            configFormObj = {
              componentsType: itemComponents.InputNumber,
              componentsName: itemComponents.InputNumber.name,
              options: {
                col: 4,
                validator: DICT_TYPE.get(name).validator
              }
            }
          }
          return merge({}, baseFormObj, configFormObj, data, params)
        },
        [D]: function (data, item) {
          const { name, condition } = item
          let selectArr = []
          if (name === 'REFERENCE') {
            selectArr = [{ key: 'firstDepositTime', value: '首次入金时间' }]
          } else if (name === 'MARKET_TYPES') {
            selectArr = DICTIONARY.tradeMarketType
          }
          configFormObj = {
            componentsType: itemComponents.SelectList,
            componentsName: itemComponents.SelectList.name,
            options: {
              selectData: selectArr,
              condition: condition,
              selectMultiple: name === 'MARKET_TYPES' ? 'multiple' : 'default'
            }
          }
          return merge({}, baseFormObj, configFormObj, data, params)
        }
      }

      return configForm
    }
  }
}
</script>

<style scoped lang="less">

.del-icon {
  color: red;
  cursor: pointer;
}
.delete-list {
  margin-left: 10px;
}
.add-list{
  margin-left: 33px;
  padding-bottom: 7px;
}
.plus {
  margin-right: 5px;
}
.form-gen{
  .ant-form-item{
    margin-bottom: 0px;
  }
}
</style>
