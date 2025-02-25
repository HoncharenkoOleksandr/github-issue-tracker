import React from 'react'
import { DndContext, DragEndEvent, DragOverEvent } from '@dnd-kit/core'
import { useIssueStore, ColumnType } from '../../store/useIssueStore'
import IssueColumn from '../IssueColumn/IssueColumn'
import { Row } from 'antd'

const IssueBoard: React.FC = () => {
  const { issues, moveIssue, reorderIssue } = useIssueStore()

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event
    if (!over) return

    const sourceColumn = active.data.current?.column as ColumnType
    const destinationColumn = over.data.current?.column as ColumnType

    if (!sourceColumn || !destinationColumn || sourceColumn === destinationColumn) return

    moveIssue(sourceColumn, active.id as number, destinationColumn)
  }

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over) return

    const column = active.data.current?.column as ColumnType
    const fromIndex = active.data.current?.index
    const toIndex = over.data.current?.index

    if (column && typeof fromIndex === 'number' && typeof toIndex === 'number') {
      reorderIssue(column, fromIndex, toIndex)
    }
  }

  return (
    <DndContext onDragOver={onDragOver} onDragEnd={onDragEnd}>
      <Row gutter={16} style={{ width: '100%', overflowX: 'hidden' }}>
        {(Object.keys(issues) as ColumnType[]).map((column) => (
          <IssueColumn key={column} title={column} issues={issues[column]} />
        ))}
      </Row>
    </DndContext>
  )
}

export default IssueBoard
