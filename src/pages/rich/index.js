import React, { Component } from 'react';
import { RichWrapper } from './style';
import { Card, Button, Modal } from 'antd';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class Rich extends Component {

  constructor(props){
    super(props)

    this.state = {
      editorState: '',
      contentState: '',
      showRichText: false
    }
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState
    });
  }

  onEditorChange = (contentState) => {
    this.setState({
      contentState
    })
  }

  handleClearContent = () => {
    this.setState({
      editorState: ''
    })
  }

  handleGetText = () => {
    this.setState({
      showRichText: true
    })
  }

  render() {
    const { editorState } = this.state;
    return(
      <RichWrapper>
        <Card style={{marginBottom: 10}}>
          <Button type='primary' onClick={this.handleClearContent}>清空内容</Button>
          <Button type='primary' onClick={this.handleGetText}>获取HTML文本</Button>
        </Card>
        <Card title='富文本编译器'>
        <Editor
          editorState={editorState}
          onContentStateChange={this.onEditorChange}
          onEditorStateChange={this.onEditorStateChange}
        />
        </Card>
        <Modal
          title='富文本'
          visible={this.state.showRichText}
          onCancel={() => {
            this.setState({
              showRichText: false
            })
          }}
          footer={null}
        >
          { draftToHtml(this.state.contentState) }
        </Modal>
      </RichWrapper>
    )
  }
}

export default Rich;
