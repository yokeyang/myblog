import React from 'react';
import ReactDOM from "react-dom";
import Router from "react-router";
import {Col,Form,FormGroup,InputGroup,FormControl,Button} from 'react-bootstrap';
import $ from "jquery";
class Post extends React.Component{
  componentDidMount(){
    console.log(this.name.value);
  }
  onclick(){
    var d = new Date();
    if(this.name.value != ''&&this.password.value !=''&&this.title.value != '' && this.tag.value != '' && this.contents.value !=''){
      $.ajax({
        url: '/list_post',
        type: 'POST',
        dataType: 'json',
        data: {
          name:this.name.value,
          password:this.password.value,
          title:this.title.value,
          tag:this.tag.value,
          contents:this.contents.value,
          time:d.toDateString()
        }
      })
      .done(function() {
        this.transitionTo('/blog');
      })
      .fail(function() {
        alert('error');
      });
    }else{
      alert('dont be empty');
    }
  }
  render(){
    return(
      <Col md={8} mdOffset={2}>
        <Form horizontal>
          <FormGroup>
            <InputGroup>
              <InputGroup.Button>
                <Button>name</Button>
              </InputGroup.Button>
              <FormControl type="text" inputRef={ref => { this.name = ref; }} />
            </InputGroup>
          </FormGroup>
          {' '}
          <FormGroup>
            <InputGroup>
              <InputGroup.Button>
                <Button>password</Button>
              </InputGroup.Button>
              <FormControl type="password" inputRef={ref => { this.password = ref; }} />
            </InputGroup>
          </FormGroup>
          {' '}
          <FormGroup>
            <InputGroup>
              <InputGroup.Button>
                <Button>title</Button>
              </InputGroup.Button>
              <FormControl type="text" inputRef={ref => { this.title = ref; }} />
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <InputGroup>
              <InputGroup.Button>
                <Button>tag</Button>
              </InputGroup.Button>
              <FormControl type="text" inputRef={ref => { this.tag = ref; }} />
            </InputGroup>
          </FormGroup>
          <FormGroup controlId="formControlsTextarea">
            contents
            <FormControl componentClass="textarea" placeholder="contents" inputRef={ref => { this.contents = ref; }} />
          </FormGroup>
          <Button onClick={()=>this.onclick()}>
            OK
          </Button>
        </Form>
      </Col>
    );
  }
}

export default Post;
