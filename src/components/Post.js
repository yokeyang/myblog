import React from 'react';
import ReactDOM from "react-dom";
import {Router, browserHistory, Link} from "react-router";
import {Col,Form,FormGroup,InputGroup,FormControl,Button,Modal} from 'react-bootstrap';
import $ from "jquery";
class Post extends React.Component{
  constructor(props) {
      super(props);
      this.state = {
        show:false
      }
  }
  componentDidMount(){
    console.log(this.name.value);
  }
  onclick(){
    var _this = this;
    var d = new Date();
    $.ajax({
      url: '/psd',
      type: 'POST',
      dataType: 'text',
      data: {psd:this.password.value}
    })
    .done(function(e) {
      console.log(e);
      if(_this.name.value != '' && _this.title.value != '' && _this.tag.value != '' && _this.refs.context.innerHTML !='' && e == "true"){
        $.ajax({
          url: '/list_post',
          type: 'POST',
          dataType: 'json',
          data: {
            name:_this.name.value,
            password:_this.password.value,
            title:_this.title.value,
            tag:_this.tag.value,
            contents:_this.refs.context.innerHTML,
            time:d.toDateString()
          }
        })
        .always(()=>{
          console.log("always");
          _this.setState({ show: true});
        })
      }else{
        alert('dont be empty or something wrong');
      }
    })
    .fail(function() {
      console.log("error");
    })

  }
  render(){
    let close = () => {
      this.setState({ show: false});
      this.context.router.history.push('/blog');
    }
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
            <div className="_textarea" contentEditable="true" ref="context"></div>
          </FormGroup>
          <Button onClick={()=>this.onclick()}>
            OK
          </Button>
        </Form>
        <Modal
           show={this.state.show}
           onHide={close}
           container={this}
           aria-labelledby="contained-modal-title"
         >
         <Modal.Header>
           <Modal.Title id="contained-modal-title">OK</Modal.Title>
         </Modal.Header>
         <Modal.Body>
           data post success
         </Modal.Body>
         <Modal.Footer>
           <Button onClick={close}>Link to Blog</Button>
         </Modal.Footer>
       </Modal>
      </Col>
    );
  }
}
Post.contextTypes = {
    router:React.PropTypes.object
}
export default Post;
