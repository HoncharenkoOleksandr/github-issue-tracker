import { Card, Col, Flex, Row, Typography } from 'antd'

const IssueBoardSceleton = () => {
  return (
    <Row gutter={16}>
      <Col span={8}>
        <Flex gap="middle" vertical>
          <Typography.Title style={{ textAlign: 'center' }}>ToDo</Typography.Title>
          <Flex gap="middle" vertical>
            {[null, null, null].map(() => (
              <Card loading={true}>
                <Card.Meta
                  title="Card title"
                  description={
                    <>
                      <p>Unassigned</p>
                      <p>Unassigned</p>
                      <p>Unassigned</p>
                    </>
                  }
                />
              </Card>
            ))}
          </Flex>
        </Flex>
      </Col>
      <Col span={8}>
        <Flex gap="middle" vertical>
          <Typography.Title style={{ textAlign: 'center' }}>InProgress</Typography.Title>
          <Flex gap="middle" vertical>
            {[null, null].map(() => (
              <Card loading={true}>
                <Card.Meta
                  title="Card title"
                  description={
                    <>
                      <p>Unassigned</p>
                      <p>Unassigned</p>
                      <p>Unassigned</p>
                    </>
                  }
                />
              </Card>
            ))}
          </Flex>
        </Flex>
      </Col>
      <Col span={8}>
        <Flex gap="middle" vertical>
          <Typography.Title style={{ textAlign: 'center' }}>Done</Typography.Title>
          <Flex gap="middle" vertical>
            {[null, null, null, null].map(() => (
              <Card loading={true}>
                <Card.Meta
                  title="Card title"
                  description={
                    <>
                      <p>Unassigned</p>
                      <p>Unassigned</p>
                      <p>Unassigned</p>
                    </>
                  }
                />
              </Card>
            ))}
          </Flex>
        </Flex>
      </Col>
    </Row>
  )
}

export default IssueBoardSceleton
