import { useState } from 'react'
import { useIssueStore } from '../../store/useIssueStore'
import { Button, Flex, Input, notification } from 'antd'

const IssueSearch = () => {
  const [api, contextHolder] = notification.useNotification()
  const [repoUrl, setRepoUrl] = useState('')
  const { fetchIssues } = useIssueStore()

  const getIssuesHandler = () => {
    fetchIssues(repoUrl).catch((error) => {
      console.error('Error fetching issues:', error)

      const openNotification = () => {
        api.error({
          message: 'Error loading issues.',
          description: error instanceof Error ? error.message : 'Failed to get issues from GitHub!',
          duration: 4,
        })
      }

      openNotification()
    })
  }

  return (
    <Flex gap="middle" align="center" style={{ height: '100%' }}>
      <Input
        placeholder="Enter repo URL"
        value={repoUrl}
        onChange={(e) => setRepoUrl(e.target.value)}
        style={{ width: '100%' }}
      />
      <Button onClick={getIssuesHandler}>Load Issues</Button>
      {contextHolder}
    </Flex>
  )
}

export default IssueSearch
