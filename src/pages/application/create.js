import React, { useState, useEffect } from 'react'
import { Form, Button, Input } from 'antd'
import { connect } from 'react-redux'
import Editor from 'react-simple-code-editor'
import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-go'
import { withRouter, useHistory } from 'react-router-dom'
import 'css/editor.css'

const { Item } = Form

const mapStateToProps = ({ application, dispatch }) => {
  const { loading, clone } = application
  return {
    loading,
    clone,
    dispatch
  }
}
const DefaultPage = ({ loading, clone, dispatch }) => {
  const [form] = Form.useForm()
  const history = useHistory()
  const [scenario, setSceraio] = useState('')
  const [gomod, setGomod] = useState('')
  const [gosum, setGosum] = useState('')

  useEffect(() => {
    // init data if clone
    if (!form.getFieldValue('name') && clone) {
      form.setFieldsValue({
        ...clone
      })
      setSceraio(clone.scenario)
      setGomod(clone.gomod)
      setGosum(clone.gosum)
    }
  })
  const onFinish = values => {
    if (!values.gomod) {
      values.gomod = ''
    }
    if (!values.gosum) {
      values.gosum = ''
    }
    dispatch({
      type: 'application/CREATE',
      payload: values
    })
  }
  const onReset = () => {
    form.resetFields()
  }
  const onChange = (field, value) => {
    form.setFieldsValue({ [field]: value })
    switch (field) {
      case 'scenario':
        setSceraio(value)
        break
      case 'gomod':
        setGomod(value)
        break
      case 'gosum':
        setGosum(value)
        break
      default:
        break
    }
  }
  const onCancel = () => {
    console.log('..................')
    history.push('/applications')
  }

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }
  return (
    <>
      <div className='card container'>
        <div className='text-dark font-size-24 mb-3'>
          <strong>Create an application</strong>
        </div>
        <Form
          layout='vertical'
          hideRequiredMark
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          className='mb-4'
          form={form}
        >
          <Button
            type='primary'
            size='large'
            className='text-center w-100'
            htmlType='submit'
            loading={loading}
          >
            <strong>Create</strong>
          </Button>
          <Button htmlType='button' onClick={onReset}>
          Reset
          </Button>
          <Button
            onClick={onCancel}
          >
            <strong>Cancel</strong>
          </Button>
          <Item
            name='name'
            rules={[{ required: true, message: 'Application name is required' }]}
          >
            <Input />
          </Item>
          <Item
            name='scenario'
            rules={[{ required: true, message: 'Scenario is required' }]}
          >
            <div className='editor-container'>
              <Editor
                value={scenario}
                onValueChange={c => onChange('scenario', c)}
                highlight={code => highlight((code || ''), languages.go, 'go')}
                padding={16}
                tabSize={4}
                insertSpaces
                className='editor'
                autoFocus
                style={{
                  fontFamily: '"Arial", "Open Sans", monospace',
                  fontSize: 14
                }}
              />
            </div>
          </Item>
          <Item
            name='gomod'
            rules={[{ required: false }]}
          >
            <div className='editor-container'>
              <Editor
                value={gomod}
                onValueChange={c => onChange('gomod', c)}
                highlight={code => highlight((code || ''), languages.go, 'go')}
                padding={16}
                tabSize={4}
                insertSpaces
                className='editor'
                style={{
                  fontFamily: '"Arial", "Open Sans", monospace',
                  fontSize: 14
                }}
              />
            </div>
          </Item>
          <Item
            name='gosum'
            rules={[{ required: false }]}
          >
            <div className='editor-container'>
              <Editor
                value={gosum}
                onValueChange={c => onChange('gosum', c)}
                highlight={code => highlight((code || ''), languages.go, 'go')}
                padding={16}
                tabSize={4}
                insertSpaces
                className='editor'
                style={{
                  fontFamily: '"Arial", "Open Sans", monospace',
                  fontSize: 14
                }}
              />
            </div>
          </Item>
        </Form>
      </div>
    </>
  )
}

export default withRouter(connect(mapStateToProps)(DefaultPage))
