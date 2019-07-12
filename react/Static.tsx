import { memo } from 'react'
import { injectIntl } from 'react-intl'

import { RichText } from './index'

export default injectIntl(
  memo(RichText)
)