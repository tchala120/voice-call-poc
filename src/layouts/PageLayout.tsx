import styled from '@emotion/styled'
import { Layout } from 'antd'

import AuthenticatedHeader from 'components/AuthenticatedHeader'
import MainMenu from 'components/MainMenu'

import type { FCWithChildren } from 'types'

const { Sider, Content } = Layout

const PageLayout: FCWithChildren = ({ children }) => {
  return (
    <PageLayoutContainer>
      <Sider>
        <MainMenu />
      </Sider>
      <Layout>
        <AuthenticatedHeader />

        <Content>{children}</Content>
      </Layout>
    </PageLayoutContainer>
  )
}

export default PageLayout

const PageLayoutContainer = styled(Layout)`
  .ant-layout-content {
    position: relative;
    padding: 50px;
    min-height: calc(100vh - 64px);
  }

  .ant-layout-sider {
    flex: 0 0 220px !important;
    max-width: 220px !important;
    min-width: 220px !important;
    width: 220px !important;
    position: relative;
  }
`
