import type { FormProps } from 'antd'
import type { Rule } from 'antd/lib/form'

export const baseFormProps: FormProps = {
  layout: 'vertical',
  colon: false,
}

export const ruleRequired: Rule = {
  required: true,
  message: 'Required',
}
