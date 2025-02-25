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
      <Breadcrumb
        separator=">"
        items={[
          {
            title: (
              <a
                href={`https://github.com/${repoInfo.owner}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {repoInfo.owner}
              </a>
            ),
          },
          {
            title: (
              <a
                href={`https://github.com/${repoInfo.owner}/${repoInfo.repo}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {repoInfo.repo}
              </a>
            ),
          },
        ]}
      />

      <Typography.Text>
        <StarFilled style={{ color: 'gold', marginRight: 8 }} />
        {repoInfo.stars.toLocaleString()} Stars
      </Typography.Text>
    </Flex>
  )
}

export default RepoInfo
