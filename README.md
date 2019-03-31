# interactive-tree

> React tree component with movable rows and extendable columns

[![NPM](https://img.shields.io/npm/v/interactive-tree.svg)](https://www.npmjs.com/package/interactive-tree) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save interactive-tree
```

## Usage

```tsx
import * as React from 'react'

import Tree from 'interactive-tree'

class Example extends React.Component {
  render () {
    return (
      <Tree
        /**
         * String
         * Title for the tree
         * */
        title

        /**
         * Tree
         * Data for the tree to display
         * */
        tree

        /**
         * Callback
         * Exposes an icon to move rows. Callback fired on drop
         * */
        handleMove

        /**
         * Array of objects
         * Columns to display additional data
         * */
        columns

        /**
         * Array of objects
         * Icons that'll execute provided callbacks when clicked
         * Icons have been tested with Font Awesome however can work with 
         * other class based libraries
         * */
        icons

        /**
         * Object
         * Name of fields that contains required information
         * Defaults
         * - id: id
         * - name: name
         * - parentId: parentId
         * */
        fieldNames
        />
    )
  }
}
```

```tsx
class Example extends React.Component {
  render () {
    return (
      <Tree
        title="Category"
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
        fieldNames={{
          parentId: 'parentBucketId'
        }
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
    )
  }
}
```

## License

MIT © [luke575](https://github.com/luke575)
