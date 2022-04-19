import type { NextPage } from 'next'

import { Layout, Anchor } from '../../components'
import { useIntl, defineMessages } from 'react-intl'

const messages = defineMessages({
  pageTitle: { id: 'inhai.pages.contact' },
})

const Contact: NextPage = () => {
  const { formatMessage } = useIntl()

  return (
    <Layout title={formatMessage(messages.pageTitle)}>
      <Anchor href="/">Go to home</Anchor>
    </Layout>
  )
}

export default Contact
