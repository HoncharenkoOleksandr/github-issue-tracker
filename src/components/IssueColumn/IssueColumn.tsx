import React, { useMemo } from 'react'
import IssueCard from '../IssueCard/IssueCard'
import { useDroppable } from '@dnd-kit/core'
import { Issue, ColumnType } from '../../store/useIssueStore'
import { SortableContext } from '@dnd-kit/sortable'
import { Col, Flex, Typography } from 'antd'
import css from './IssueColumn.module.scss'

interface ColumnProps {
  title: ColumnType
  issues: Issue[]
}

const IssueColumn: React.FC<ColumnProps> = ({ title, issues }) => {
  const issueIds = useMemo(() => issues.map((issue) => issue.id), [issues])

  // Создаём droppable-зону для пустых колонок
  const { setNodeRef } = useDroppable({
    id: title,
    data: { column: title },
  })

  return (
    <Col span={8}>
      <Flex gap="middle" vertical>
        <Typography.Title style={{ textAlign: 'center' }}>{title}</Typography.Title>

        <div ref={setNodeRef} className={issues.length === 0 ? css['column_emptyZone'] : ''}>
          {issues.length === 0 && <p>Drop issues here</p>}
        </div>

        <Flex gap="middle" vertical className={css['column_container']}>
          <SortableContext items={issueIds}>
            {issues.map((issue, index) => (
              <IssueCard key={issue.id} issue={issue} index={index} column={title} />
            ))}
          </SortableContext>
        </Flex>
      </Flex>
    </Col>
  )
}

export default IssueColumn
