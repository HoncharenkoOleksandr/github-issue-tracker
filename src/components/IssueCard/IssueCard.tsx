import React from 'react'
import { Card } from 'antd'
import { Issue, ColumnType } from '../../store/useIssueStore'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import css from './IssuesCard.module.scss'

interface IssueCardProps {
  issue: Issue
  index: number
  column: ColumnType
}

const IssueCard: React.FC<IssueCardProps> = ({ issue, index, column }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: issue.id,
    data: {
      type: 'issue',
      issue,
      index,
      column,
    },
  })

  return (
    <Card
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.3 : 1,
      }}
      title={`#${issue.number} ${issue.title}`}
      className={css.card}
    >
      <Card.Meta
        title="Card title"
        description={
          <>
            <p>Created: {new Date(issue.created_at).toLocaleDateString()}</p>
            <p>Comments: {issue.comments}</p>
            {issue?.assignee ? <p>Assignee: {issue.assignee?.login}</p> : <p>Unassigned</p>}
          </>
        }
      />
    </Card>
  )
}

export default IssueCard
