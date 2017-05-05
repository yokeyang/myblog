import React from 'react';
import { Route, Switch, withRouter} from 'react-router';
import PropTypes from 'prop-types';
import { Home } from './Home';
import { NotFoundPage } from './NotFoundPage';
import { HomeLinks } from './HomeLinks';
import { BlogPreview } from './BlogPreview';
import { BlogPage } from './BlogPage';
import { About } from './About';
import Post from './Post';
import $ from 'jquery';

const renderIndex = () => <HomeLinks />;
const renderPost = () => <Post />;
const renderAbout = () => <About />;
class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      blog:[]
    }
  }
  componentWillMount(){
    console.log(this.state.blog);
    $.ajax({
      url: '/list_get',
      type: 'GET',
      dataType: 'json',
    })
    .done((e) =>{
      var blog = [];
      var b = e.split('|');
      for(var i in b){
        blog[i] = eval('(' + b[i] + ')');
        blog[i]["id"] = i;
      }
      this.setState({blog:blog});
    })
    .fail(function(XmlHttpRequest, textStatus, errorThrown) {
      console.log(XmlHttpRequest);
    })
    .always(function() {
      console.log("complete");
    });
  }
  render(){
    var blog = this.state.blog;
    class RB extends React.Component {
      static propTypes = {
        match: PropTypes.object.isRequired
      }
      render(){
        const { match, location, history } = this.props
        const id = match.params.id;
        const blogdata = blog.find(current => current.id == id);
        return(
          <BlogPage blog={blogdata} />
        )
      }
    }
    class BP extends React.Component{
      render(){
        return(<BlogPreview blogs={blog} />);
      }
    }
    const renderBlog = withRouter(RB);
    const renderBP = () => <BP />;
    return(
      <Home>
        <Switch>
          <Route exact path="/" render={renderIndex} />
          <Route exact path="/blog" render={renderBP} />
          <Route exact path="/post" render={renderPost} />
          <Route exact path="/about" render={renderAbout} />
          <Route exact path="/blog/page:id" render={renderBlog} />
          <Route component={NotFoundPage} />
        </Switch>
      </Home>
    )
  }
};

export default App;
