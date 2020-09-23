import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { Table, Button, Popconfirm } from 'antd'
import { connect } from 'react-redux'
import { withRouter, Link, useHistory } from 'react-router-dom'

const mapStateToProps = ({ application, dispatch }) => ({ application, dispatch })

const DefaultPage = ({ application, dispatch }) => {
  const history = useHistory()
  const { list, loading, total } = application
  const [fetching, setFetching] = useState(false)
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} scenarios`
  })
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text, item) => <Link key={item.id} to={`/applications/${item.id}`}>{text}</Link>
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, item) => <Link key={item.id} to={`/applications/${item.id}`}>{text}</Link>
    },
    {
      title: 'Tag',
      dataIndex: 'tag',
      key: 'tag',
      render: (text, item) => <Link key={item.id} to={`/applications/${item.id}`}>{text}</Link>
    },
    {
      title: 'Created at',
      dataIndex: 'created',
      key: 'created',
      render: x => {
        return new Date(x).toLocaleString()
      }
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (x, application) => {
        return (
          <div style={{ float: 'right' }} key={application.id}>
            <Button
              style={{ marginLeft: 5 }}
              type='default'
              onClick={() => clone(application)}
            >
              Clone
            </Button>
            {['running', 'pending'].includes(application.status) && (
              <Popconfirm
                title={`Are you sure cancel application ${application.name}?`}
                onConfirm={() => cancel(application.id)}
                okText='Yes'
                cancelText='No'
              >
                <Button
                  type='dashed'
                  style={{ marginLeft: 5 }}
                  danger
                >
                  Cancel
                </Button>
              </Popconfirm>
            )}
            {['finished', 'pending', 'error', 'cancel'].includes(application.status) && (
              <Popconfirm
                title={`Are you sure delete application ${application.name}?`}
                onConfirm={() => destroy(application.id)}
                okText='Yes'
                cancelText='No'
              >
                <Button
                  type='primary'
                  className='delete-button'
                  style={{ marginLeft: 5, color: 'white', backgroundColor: '#f5222d!important' }}
                  danger
                >
                  Delete
                </Button>
              </Popconfirm>
            )}
          </div>
        )
      }
    }
  ]
  useEffect(() => {
    //   fetch data when the first time access
    if (!fetching) {
      dispatch({
        type: 'application/LIST',
        payload: { skip: pagination.current - 1, limit: pagination.pageSize }
      })
      setFetching(true)
    }
  }, [list, total])
  const onTableChange = pagination => {
    setPagination(pagination)
    dispatch({
      type: 'application/LIST',
      payload: { skip: pagination.current - 1, limit: pagination.pageSize }
    })
  }
  const onSearch = (e) => {
    if (e.key === 'Enter') {
      dispatch({
        type: 'application/LIST',
        payload: { skip: 0, limit: pagination.pageSize }
      })
      return
    }
    dispatch({
      type: 'application/LIST',
      payload: { skip: 0, limit: pagination.pageSize }
    })
  }
  const clone = (data) => {
    dispatch({
      type: 'application/CLONE',
      payload: { data }
    })
  }
  const cancel = (id) => {
    dispatch({
      type: 'application/CANCEL',
      payload: { id }
    })
  }
  const destroy = (id) => {
    dispatch({
      type: 'application/DELETE',
      payload: { id }
    })
  }
  return (
    <>
      <div className='application' onKeyUp={onSearch}>
        <Helmet title='Applications' />
        <div className='application-header'>
          <div className='row'>
            <div className='col-md-6 col-xs-12'>
              <h2>Benchmark Application</h2>
            </div>
            <div className='col-md-6 col-xs-12'>
              <Button onClick={() => history.push('/applications/create')}>Create Application</Button>
            </div>
          </div>
          <div className='search-bar'>
            <div className='row'>
              <div className='col-md-3 col-xs-12'>
                {/* <Search placeholder='input application name or tags' onSearch={value => onSearch(value)}>Search</Search> */}
              </div>
            </div>
          </div>
        </div>
        <Table
          dataSource={list}
          pagination={pagination}
          loading={loading}
          columns={columns}
          onChange={onTableChange}
          ellipsis
        />
      </div>
    </>
  )
}

export default withRouter(connect(mapStateToProps)(DefaultPage))
