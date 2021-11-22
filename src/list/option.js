export const MAP_RULE_TYPE = [
  ['targetUserRule', { key: 'ruleNameTargetUserCondition', text: '客户群体' }],
  ['effectiveRule', { key: 'ruleNameEffectiveCondition', text: '生效条件' }],
  ['distributeRule', { key: 'ruleNameDistributeCondition', text: '派发条件' }]
]

export const RITE_SHOW = ['FIRST_DEPOSIT', 'INVITEE_FIRST_DEPOSIT', 'DEPOSIT']

export const isArray = (obj) => {
  return Object.prototype.toString.call(obj) === '[object Array]'
}
export const MoneyValidator = (rule, value, callback) => {
  const last = String(value).split('.')
  if (!value) {
      callback(new Error('不可为空'))
  }
  if (value) {
    if (last.length > 1 && last[1].length > 2) {
      callback(new Error('保留两位小数'))
    }
    if (value.length > 15) {
      callback(new Error('不超过15个字符'))
    }
  }
  callback()
}

export const NumValidator = (rule, value, callback) => {
  if (!value) {
    callback(new Error('不可为空'))
  }
  if (String(value).includes('.')) {
    callback(new Error('仅允许输入正整数'))
  }
  if (String(value).length > 10) {
    callback(new Error('不超过10个字符'))
  }
  callback()
}
export const MAP_DICT_TYPE = [
  [
    'USER_TYPE',
    {
      col: 3,
      value: ['EQ'],
      disabled: true,
      field: {
        name: 'USER_TYPE',
        condition: 'EQ',
        value: [],
        type: 'SELECT'
      }
    }
  ],
  [
    'REFERRAL_CODE',
    {
      col: 3,
      value: ['EQ', 'NE'],
      disabled: false,
      field: {
        name: 'REFERRAL_CODE',
        condition: 'EQ',
        value: [],
        type: 'SEARCH'
      }
    }
  ],
  [
    'PROMO_CODE',
    {
      col: 3,
      value: ['EQ', 'NE'],
      disabled: false,
      field: {
        name: 'PROMO_CODE',
        condition: 'EQ',
        value: [],
        type: 'DICT'
      }
    }
  ],
  [
    'REG_TIME',
    {
      col: 3,
      value: ['BETWEEN'],
      disabled: true,
      field: {
        name: 'REG_TIME',
        condition: 'BETWEEN',
        value: [],
        type: 'DATE'
      }
    }
  ],
  [
    'TRADE_TIME',
    {
      col: 3,
      value: ['BETWEEN'],
      disabled: true,
      field: {
        name: 'TRADE_TIME',
        condition: 'BETWEEN',
        value: [],
        type: 'DATE'
      }
    }
  ],
  [
    'OPEN_ACCOUNT_TIME',
    {
      col: 3,
      value: ['BETWEEN'],
      disabled: true,
      field: {
        name: 'OPEN_ACCOUNT_TIME',
        condition: 'BETWEEN',
        value: [],
        type: 'DATE'
      }
    }
  ],
  [
    'INVITEE_FIRST_DEPOSIT',
    {
      col: 3,
      value: ['BETWEEN'],
      disabled: true,
      validator: MoneyValidator,
      field: {
        name: 'INVITEE_FIRST_DEPOSIT',
        condition: 'BETWEEN',
        value: [],
        type: 'NUMBER'
      }
    }
  ],
  [
    'OPEN_SECURITIES_ACCOUNT_TIME',
    {
      col: 3,
      value: ['BETWEEN'],
      disabled: true,
      field: {
        name: 'OPEN_SECURITIES_ACCOUNT_TIME',
        condition: 'BETWEEN',
        value: [],
        type: 'DATE'
      }
    }
  ],
  [
    'DEPOSIT',
    {
      col: 3,
      value: ['BETWEEN'],
      disabled: true,
      validator: MoneyValidator,
      field: {
        name: 'DEPOSIT',
        condition: 'BETWEEN',
        value: [],
        type: 'NUMBER'
      }
    }
  ],
  [
    'FIRST_DEPOSIT_TIME',
    {
      col: 3,
      value: ['BETWEEN'],
      disabled: true,
      field: {
        name: 'FIRST_DEPOSIT_TIME',
        condition: 'BETWEEN',
        value: [],
        type: 'DATE'
      }
    }
  ],
  [
    'FIRST_DEPOSIT',
    {
      col: 3,
      value: ['BETWEEN'],
      disabled: true,
      validator: MoneyValidator,
      field: {
        name: 'FIRST_DEPOSIT',
        condition: 'BETWEEN',
        value: [],
        type: 'NUMBER'
      }
    }
  ],
  [
    'WITHDRAWAL_INTERVAL',
    {
      col: 4,
      value: ['GTE'],
      disabled: true,
      validator: NumValidator,
      field: {
        name: 'WITHDRAWAL_INTERVAL',
        condition: 'GTE',
        value: [],
        type: 'NUMBER',
        preConstraint: {
          name: 'REFERENCE',
          condition: 'EQ',
          value: ['firstDepositTime']
        }
      }
    }
  ],
  [
    'TRADE_COUNT',
    {
      col: 3,
      value: ['BETWEEN'],
      disabled: true,
      validator: NumValidator,
      field: {
        name: 'TRADE_COUNT',
        condition: 'BETWEEN',
        value: [],
        type: 'NUMBER',
        preConstraint: {
          name: 'MARKET_TYPES',
          condition: 'IN',
          value: []
        }
      }
    }
  ],
  [
    'REFERENCE',
    {
      col: 3,
      value: ['EQ'],
      disabled: true
    }
  ],
  [
    'MARKET_TYPES',
    {
      col: 3,
      value: ['IN'],
      disabled: true
    }
  ],
  [
    'IS_USER_TRIGGER',
    {
      col: 3,
      value: ['EQ'],
      disabled: true,
      field: {
        name: 'IS_USER_TRIGGER',
        condition: 'EQ',
        value: [],
        type: 'BOOLEAN'
      }
    }
  ],
  [
    'COUPON_COUNT',
    {
      col: 3,
      value: ['EQ'],
      disabled: true,
      validator: NumValidator,
      field: {
        name: 'COUPON_COUNT',
        condition: 'EQ',
        value: [],
        type: 'NUMBER'
      }
    }
  ],
  [
    'DAY_COUPON_COUNT',
    {
      col: 3,
      value: ['EQ'],
      disabled: true,
      validator: NumValidator,
      field: {
        name: 'DAY_COUPON_COUNT',
        condition: 'EQ',
        value: [],
        type: 'NUMBER'
      }
    }
  ]
]

export const INIT_DATA_RULE = {
  activityRules: [{
    name: '',
    coupons: [],
    exchangeRates: [

    ],
    targetUserRule: {
      logicalOperator: 'AND',
      rules: [
        {
          name: 'USER_TYPE',
          condition: 'EQ',
          value: [-1],
          type: 'SELECT'
        }
      ],
      hasRule: true
    },
    effectiveRule: {
      logicalOperator: 'AND',
      rules: [
        {
          name: 'REG_TIME',
          condition: 'BETWEEN',
          value: [],
          type: 'DATE'
        }
      ],
      hasRule: true
    },
    distributeRule: {
      logicalOperator: 'AND',
      rules: [
        {
          name: 'IS_USER_TRIGGER',
          condition: 'EQ',
          value: [true],
          type: 'BOOLEAN'
        }
      ],
      hasRule: true
    }
  }]
}

export const INIT_RULE = {
  name: '',
  coupons: [],
  exchangeRates: [

  ],
  targetUserRule: {
    logicalOperator: 'AND',
    rules: [
      {
        name: 'USER_TYPE',
        condition: 'EQ',
        value: [-1],
        type: 'SELECT'
      }
    ],
    hasRule: true
  },
  effectiveRule: {
    logicalOperator: 'AND',
    rules: [
      {
        name: 'REG_TIME',
        condition: 'BETWEEN',
        value: [],
        type: 'DATE'
      }
    ],
    hasRule: true
  },
  distributeRule: {
    logicalOperator: 'AND',
    rules: [
      {
        name: 'IS_USER_TRIGGER',
        condition: 'EQ',
        value: [true],
        type: 'BOOLEAN'
      }
    ],
    hasRule: true
  }
}
