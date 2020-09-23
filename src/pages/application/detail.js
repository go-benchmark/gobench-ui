import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { Tabs, Button } from 'antd'
import { connect } from 'react-redux'
import { withRouter, useParams, useHistory } from 'react-router-dom'
import Dashboard from './dashboard'
import Scenario from './scenario'

const { TabPane } = Tabs

const mapStateToProps = ({ application, dispatch }) => ({ detail: application.detail, dispatch })

const DefaultPage = ({ detail, dispatch }) => {
  const [fetching, setFetching] = useState(false)
  const history = useHistory()
  const { id } = useParams()
  const { name, created, status, beginAt, endAt } = detail
  const duration = 10
  useEffect(() => {
    if (!fetching) {
      dispatch({
        type: 'application/DETAIL',
        payload: { id }
      })
      setFetching(true)
    }
  }, [detail])

  return (
    <>
      <div className='cabinet'>
        <Helmet title='Detail' />
        <h2>{name} - {status}</h2>
        <div>Created:{created}</div>
        <div>Begin at:{beginAt}</div>
        <div>End at:{endAt}</div>
        <div>Duration:{duration}</div>
        <Button onClick={() => history.push('/')}>Back</Button>
        <Tabs defaultActiveKey='1'>
          <TabPane tab='Dashboard' key='1'>
            <Dashboard />
          </TabPane>
          <TabPane tab='Scenario' key='2'>
            <Scenario />
          </TabPane>
          <TabPane tab='Log' key='3'>
            Come in soon
          </TabPane>
        </Tabs>
      </div>
    </>
  )
}

export default withRouter(connect(mapStateToProps)(DefaultPage))
