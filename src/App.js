import React, {Component} from 'react';
import './App.css';

import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

import Header from './Header';

class App extends Component {

  state = {
    user: null,
    url: null,
    title: null,
    liveCounter: null,
    data: {},
    loaded: false,
    totalComments: 0
  }

  userToCheck = (event) => {
    const updatedState = {...this.state};

    updatedState.user = event.target.value;

    console.log(updatedState.url);

    this.setState(updatedState);
  }

  makeUrl = () => {
    const updatedState = {...this.state};

    let url = 'https://www.instagram.com/' + updatedState.user + '/?__a=1';

    updatedState.url = url;

    console.log(updatedState.url);

    axios.get(updatedState.url)
    .then((res) => {
      console.log(res)

      updatedState.title = res.data.graphql.user.full_name;
      updatedState.liveCounter = res.data.graphql.user.edge_followed_by.count;
      updatedState.data = res.data;

      updatedState.loaded = true;

      this.setState(updatedState);
      console.log(this.state);
    })
    .catch((err) => {
      console.error(err);
    })

    this.setState(updatedState);
  }

  // Get this to work when you click the button
  // componentDidMount() {
  //   const updatedState = {...this.state};

    
  // }
  
  render() {

    let theData = null;
    let totalNumComments = 0;
    let totalLikes = 0;

    if(this.state.loaded) {
      theData = this.state.data.graphql.user.edge_owner_to_timeline_media.edges.map(data => {
        totalNumComments += data.node.edge_media_to_comment.count;
        totalLikes += data.node.edge_liked_by.count;
        return(
          <div className="col-12 col-md-4">
            <div class="card">
              <img class="card-img-top" src={data.node.display_url} alt='No pic' />
              <div class="card-body">
                <h5 class="card-title text-danger">Comments: {data.node.edge_media_to_comment.count}</h5>
                <h5 class="card-title text-danger">Likes: {data.node.edge_liked_by.count}</h5>
                <p class="card-text">{data.node.edge_media_to_caption.edges[0].node.text}</p>
                <p class="card-text"><small class="text-muted">{data.node.accessibility_caption}</small></p>
              </div>
            </div>
          </div>
        ) 
      })
    }

    console.log(this.state.data)
    
    // console.log(this.state.data)
    return (
      <div className="App">
        <header className="App-header">
          <Container>
            <Header userToCheck={this.userToCheck} makeUrl={this.makeUrl} />
          </Container>
          
          <h1>{this.state.title}</h1>
          <h2>The Current Follower Count is: {this.state.liveCounter}</h2>
          <h3>The total number of comments are: <span style={{color: "green"}}>{totalNumComments}</span></h3>
          <h3>The total number of likes are: <span style={{color: "green"}}>{totalLikes}</span></h3>
          <h1>Scroll down for posts...</h1>
        </header>
        <Container className="mt-5"><Row>{theData}</Row></Container>
      </div>
    );
  }
}

export default App;
