import React, { Component } from 'react'

import Tree from 'interactive-tree'

export default class App extends Component {
  render () {
    return (
      <div>
       <Tree
        title="Category"
        tree={
          {
            children: [
            {
              id: 1,
              name: 'Darmanin',
              parentId: 0,
              children: [
                {
                  id: 2,
                  name: 'subLuke',
                  parentId: 1,
                  children: []
                }
              ]
          }]}}
      />
      </div>
    )
  }
}
