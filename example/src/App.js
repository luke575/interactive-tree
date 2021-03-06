import React, { Component } from 'react'

import Tree from 'interactive-tree'

export default class App extends Component {
  render () {
    return (
      <div style={{width: '500px'}}>
       <Tree
        id="my-tree-id"
        title="Location"
        handleMove={(item, newparent) => console.log(item, newparent)}
        fieldNames={{
          parentId: 'parentBucketId'
        }}
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
              parentBucketId: 0,
              netExpenses: '100',
              children: [
                {
                  id: 2,
                  name: 'Victoria',
                  parentBucketId: 1,
                  netExpenses: '150',
                  children: [
                    {
                      id: 4,
                      name: 'Melton',
                      parentBucketId: 2,
                      netExpenses: '400',
                      children: [
                        {
                          id: 5,
                          name: 'Brookfield',
                          parentBucketId: 4,
                          netExpenses: '400',
                          children: []
                        }
                      ]
                    },
                    {
                      id: 3,
                      name: 'Caroline Springs',
                      parentBucketId: 2,
                      netExpenses: '400',
                      // children: []
                    },
                  ]
                }
              ]
          }]}}
      />
      </div>
    )
  }
}
