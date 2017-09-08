import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CategoryList extends Component {
	render() {
		const { categories } = this.props;
		return (
			<div className="sidebar-module">
              <h4>Categories</h4>
              <ol className="list-unstyled">
              {
              	categories.map( category => 
              		<li key={ category.path }><Link to={{ pathname: `/`+category.path }}>{ category.name }</Link></li>
              	)	
              } 
              </ol>
            </div>
		);
	}
}

export default CategoryList;