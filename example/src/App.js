import React, { Component } from 'react'

import Tree from 'interactive-tree'

export default class App extends Component {
  render () {
    return (
      <div style={{width: '500px'}}>
       <Tree
        title="Location"
        handleMove={(item, newparent) => console.log(item, newparent)}
        columns={[
          {
            header: "Total",
            func: (leaf) => leaf.netExpenses
          }
        ]}
        icons={[
          {
            class: "fas fa-leaf",
            callback: (leaf) =>
              console.log(`Add new leaf under: ${leaf.id}`)
          }
        ]}
        tree={
          {
            children: [
            {
              id: 1,
              name: 'Australia',
              parentId: 0,
              netExpenses: '100',
              children: [
                {
                  id: 2,
                  name: 'Victoria',
                  parentId: 1,
                  netExpenses: '150',
                  children: [
                    {
                      id: 1,
                      name: 'Caroline Springs',
                      parentId: 2,
                      netExpenses: '400',
                      children: []
                  }
                  ]
                }
              ]
          }]}}
      />
      </div>
    )
  }
}
