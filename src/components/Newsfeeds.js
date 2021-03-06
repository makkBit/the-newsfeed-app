import React, { Component } from 'react'
import { Loader } from 'semantic-ui-react';
import Feed from './Feed';
import './Newsfeeds.css';

export default class Newsfeeds extends Component {
  constructor(props) {
    super(props);
    this.scrollRef = React.createRef();
    this.state = {
      feeddata : [],
      loadingState : false,
      currentPage: 1
    }
    this.onScroll = this.onScroll.bind(this);
  }
  componentDidMount(){
    this.loadFeed('full stack web development', 10, this.state.currentPage);
    document.addEventListener("wheel", this.onScroll);
    document.addEventListener("scroll", this.onScroll);
  }
  componentWillUnmount() {
    document.removeEventListener("wheel", this.onScroll, false)
    document.removeEventListener("scroll", this.onScroll, false)
  }
  loadFeed(query, pageSize, page){
    // escapes query, fullstackwebdevelopment => full+stack+web+development
    if(query.indexOf(' ') >= 0){
      query = query.split(' ').reduce((accu, curr) => accu + '+' + curr);
    }
    const apiurl = `https://newsapi.org/v2/everything?q=${query}&apiKey=a9f8382a7cbd47eaa6a4b2889a242019&pageSize=${pageSize}&page=${page}`;
    fetch(apiurl)
      .then(response => {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
            response.status);
          return;
        }
        response.json().then(data => {
          this.setState((state, props) => ({
            feeddata: [...state.feeddata, ...data.articles],
            loadingState: false
          }));
        });
      })
      .catch(function (err) {
        console.log('Fetch Error : ', err);
      });
  }
  loadMoreFeed(){
    if (this.state.loadingState){
      return;
    }
    this.setState((state, props) => ({
      loadingState: true,
      currentPage: state.currentPage+1
    }));
    this.loadFeed('full stack full stack web development', 10, this.state.currentPage); }
  onScroll(evt) {
    const node = this.scrollRef.current;
    if(node){
      let scrollTop = node.scrollTop;
      let clientHeight = node.clientHeight;
      let scrollHeight = node.scrollHeight;
      let scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;
      if (scrolledToBottom) {
        this.loadMoreFeed();
      }
    }
  }
  render() {
    if(this.state.feeddata.length === 0){
      return (
        <Loader active size='massive'/>
      );
    }
    else{
      console.log(this.state.feeddata);
      let feedArray = this.state.feeddata.map( (element, index) => 
          (<Feed 
            key={index}
            title={element.title} 
            author={element.author} 
            description={element.description} 
            url={element.url}
            urlToImage={element.urlToImage}
            publishedAt={element.publishedAt}
          />)
      );
      return (
        <div className="container" >
          <div className="cards" ref={this.scrollRef} >
            {feedArray}
            {this.state.loadingState ? <Loader active inline size='massive'/> : ''}
          </div>
        </div>
      )
    }
  }
}

