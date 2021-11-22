<template>
  <div>
    <el-form
      ref="elFormeee"
      :model="formData"
      :rules="rules"
      size="medium"
      label-width="100px"
      label-position="left">
      <el-row type="flex" justify="start" align="top">
        <el-form-item label="单行文本" prop="field114">
          <el-input v-model="formData.field114" placeholder="请输入单行文本" clearable :style="{width: '100%'}">
          </el-input>
        </el-form-item>
        <el-form-item label="下拉选择" prop="field102">
          <el-select v-model="formData.field102" placeholder="请选择下拉选择" clearable :style="{width: '100%'}">
            <el-option
              v-for="(item, index) in field102Options"
              :key="index"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="下拉选择" prop="field104">
          <el-select v-model="formData.field104" placeholder="请选择下拉选择" clearable :style="{width: '100%'}">
            <el-option
              v-for="(item, index) in field104Options"
              :key="index"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"></el-option>
          </el-select>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="下拉选择" prop="field116">
          <el-select
            v-model="formData.field116"
            placeholder="请选择下拉选择"
            multiple
            filterable
            clearable
            :style="{width: '100%'}">
            <el-option
              v-for="(item, index) in field116Options"
              :key="index"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"></el-option>
          </el-select>
        </el-form-item>
      </el-row>
      <el-form-item size="large">
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  components: {},
  props: [],
  data () {
    return {
      formData: {
        field114: undefined,
        field102: undefined,
        field104: undefined,
        field116: []
      },
      rules: {
        field114: [{
          required: true,
          message: '请输入单行文本',
          trigger: 'blur'
        }],
        field102: [{
          required: true,
          message: '请选择下拉选择',
          trigger: 'change'
        }],
        field104: [{
          required: true,
          message: '请选择下拉选择',
          trigger: 'change'
        }],
        field116: [{
          required: true,
          type: 'array',
          message: '请至少选择一个下拉选择',
          trigger: 'change'
        }, {
          pattern: 4555,
          message: '455645546',
          trigger: 'change'
        }]
      },
      field102Options: [{
        'label': '选项一',
        'value': 1
      }, {
        'label': '选项二',
        'value': 2
      }],
      field104Options: [{
        'label': '选项一',
        'value': 1
      }, {
        'label': '选项二',
        'value': 2
      }],
      field116Options: [{
        'label': '选项一',
        'value': 1
      }, {
        'label': '选项二',
        'value': 2
      }, {
        'label': '555',
        'value': 6666
      }]
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    submitForm () {
      this.$refs['elFormeee'].validate(valid => {
        // if (!valid) return
        // TODO 提交表单
      })
    },
    resetForm () {
      this.$refs['elFormeee'].resetFields()
    }
  }
}

</script>
<style>
</style>
