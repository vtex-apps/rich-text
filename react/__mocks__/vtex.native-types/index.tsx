import { InjectedIntl } from 'react-intl'

export const formatIOMessage = ({
  id,
  intl,
}: {
  id: string
  intl: InjectedIntl
}) => intl.formatMessage({ id })
