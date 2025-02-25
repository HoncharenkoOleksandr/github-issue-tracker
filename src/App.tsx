import React from 'react'
import { Layout } from 'antd'
import IssueBoard from './components/IssueBoard/IssueBoard'
import IssueSearch from './components/IssueSearch/IssueSearch'
import { useIssueStore } from './store/useIssueStore'
import IssueBoardSceleton from './components/IssueBoardSceleton/IssueBoardSceleton'
import RepoInfo from './components/RepoInfo/RepoInfo'

const { Content, Header } = Layout

const App: React.FC = () => {
  const { loading } = useIssueStore()

  return (
    <Layout style={{ minHeight: '100vh', minWidth: '100vw' }}>
      <Header>
        <IssueSearch />
      </Header>
      <RepoInfo />
      <Content style={{ padding: '20px' }}>
        {loading ? <IssueBoardSceleton /> : <IssueBoard />}
      </Content>
    </Layout>
  )
}

export default App
