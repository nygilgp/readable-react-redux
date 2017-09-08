import React, { Component } from 'react';
import CategoryList from './CategoryList';

class Sidebar extends Component {
  render() {
    return (
        <div className="col-sm-3 offset-sm-1 blog-sidebar">
          <div className="sidebar-module sidebar-module-inset">
            <h4>About</h4>
            <p>Learn react redux by doing a project.</p>
          </div>
          <CategoryList categories={ this.props.categories } />
        </div>
    );
  }
}

export default Sidebar;  
