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
    )
  }
}
```

## License

MIT © [luke575](https://github.com/luke575)