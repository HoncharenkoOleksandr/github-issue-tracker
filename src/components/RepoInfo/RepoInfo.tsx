import { Breadcrumb, Flex, Typography } from 'antd'
import { StarFilled } from '@ant-design/icons'
import { useIssueStore } from '../../store/useIssueStore'

const RepoInfo = () => {
  const { repoInfo } = useIssueStore()

  if (!repoInfo) return null

  return (
    <Flex
      align="center"
      style={{ padding: '16px 24px', background: '#fff', borderBottom: '1px solid #ddd' }}
      gap="large"
    >
      <Breadcrumb items={[{ title: repoInfo.owner }, { title: repoInfo.repo }]} separator=">" />

      <Typography.Text>
        <StarFilled style={{ color: 'gold', marginRight: 8 }} />
        {repoInfo.stars.toLocaleString()} Stars
      </Typography.Text>
    </Flex>
  )
}

export default RepoInfo
