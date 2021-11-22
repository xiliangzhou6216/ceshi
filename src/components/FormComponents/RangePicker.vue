<template>
  <div>
    <a-form-item label="">
      <a-range-picker
        class="date"
        show-time
        style="width: 100%"
        :showToday="false"
        :disabled="options.disabled"
        :ranges="{
          今日: [moment(), moment()],
          本周: [moment().startOf('week'), moment()],
          本月: [moment().startOf('month'), moment()],
          近7日: [moment().subtract(6, 'd'), moment()],
          近30日: [moment().subtract(29, 'd'), moment()],
          近90日: [moment().subtract(89, 'd'), moment()],
          全部: [moment('2017-01-01'), moment()],
        }"
        v-decorator="[
          `${name}`,
          {
            initialValue: selfDefault,
            rules: [{ required: true,message: '不可为空' }]
          }
        ]"
        valueFormat="YYYY-MM-DD HH:mm:ss"
      >
        <a-icon slot="suffixIcon" type="calendar" :style="{ color: '#ccc' }" />
      </a-range-picker>
    </a-form-item>
  </div>
</template>
<script>
import moment from 'moment'
export default {
  name: 'RangePicker',
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
      type: Array,
      default: () => [
        moment().subtract(1, 'months').format('YYYY-MM-DD HH:mm:ss'),
        moment().format('YYYY-MM-DD HH:mm:ss')
      ]
    },
    options: {
      type: Object,
      default: () => {}
    },
    keyIndex: {
      type: String,
      default: () => ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {

    }
  },
  computed: {
    selfDefault () {
      const [time1, time2] = this.fieldValue
      return time1
        ? [moment(time1).format('YYYY-MM-DD HH:mm:ss'), moment(time2).format('YYYY-MM-DD HH:mm:ss')]
        : [moment().subtract(1, 'months').format('YYYY-MM-DD HH:mm:ss'), moment().format('YYYY-MM-DD HH:mm:ss')]
    }
  },
  methods: {
    moment
  }
}
</script>
