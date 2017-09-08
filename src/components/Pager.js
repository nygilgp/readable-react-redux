import React, { Component } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Listing from './Listing';
import Post from './Post';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';


class Pager extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="container">
          <div className="row">
            <div className="col-sm-8 blog-main">
              <Switch>
                <Route exact path="/:category" render={() => (
                  <Listing posts={this.props.posts} />
                )} />
                <Route path="/:category/:post" render={(props) => (
                  <Post {...props} />
                )} />
              </Switch>
            </div>
            <Sidebar categories={ this.props.categories } />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    categories: state.categories,
    posts: state.posts.filter((post) => post.category === ownProps.match.params.category)
  };
} 

export default connect(mapStateToProps)(Pager);  
