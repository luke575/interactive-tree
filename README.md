# interactive-tree

React tree component. <br/>
Can be used to display a simple tree or <br/>
Can be used to display a more complex tree that can

* Have its rows dragged and dropped
* Extra columns to be placed in to display custom info for each row
* Extra columns to be placed in to display icons that can be clicked for each row (to fire callbacks)

```bash
npm install --save interactive-tree
```

## Usage

### Simple example

Simple tree with only a heading and a simple tree

```tsx
class Example extends React.Component {
  render () {
    return (
      <Tree
        title="Categories"
        tree={
          {
            children: [
            {
              id: 1,
              name: 'Credit',
              parentId: 0,
              children: [
                {
                  id: 2,
                  name: 'Investing',
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

<p><i>Example output</i></p>
<img src="https://finance-tracker-public-assets.s3-ap-southeast-2.amazonaws.com/react-tree-simple.png" alt="simple tree" width="250" />

<hr/>

### Detailed example

Detailed example showing how to 

* Allow rows to be moved with 'handleMove'
* Extra columns added in to display more information in with 'columns'
* Icons added on each row to extend the functionality via 'icons'
* fieldNames to allow different names on the tree to be used via 'fieldNames'
* Extra information stored in each leaf node which can be used by the 'columns' and 'icons' prop

```tsx
class Example extends React.Component {
  render () {
    return (
      <Tree
        title="Categories"
        columns={[
          {
            header: "Total",
            func: (leaf) => leaf.netExpenses
          }
        ]}
        icons={[
          {
            class: "fas fa-eye",
            callback: (leaf) =>
              console.log(`Open bucket at leaf id: ${leaf.id}`)
          }
        ]}
        fieldNames={{
          parentId: 'parentBucketId'
        }
        handleMove={(item, newparent) => console.log(item, newparent)}
        tree={
          {
            children: [
            {
              id: 1,
              name: 'Credit',
              parentBucketId: 0,
              netExpenses: '2925.13'
              children: [
                {
                  id: 2,
                  name: 'Investing',
                  parentBucketId: 1,
                  netExpenses: '1342.29'
                  children: []
                }
              ]
          }]}}
      />
    )
  }
}
```

<p><i>Example output</i></p>
<img src="https://finance-tracker-public-assets.s3-ap-southeast-2.amazonaws.com/react-tree-detailed.png" alt="detailed tree" width="450" box-shadow="0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" />

## API

### title 
> **Type**: *string* <br/>
**Mandatory**: Yes <br/>
**Description**:  Title for the given tree

### tree
> **Type**: *tree* <br/>
**Mandatory**: Yes <br/>
**Description**:  Data for the tree to display and use

### handleMove
> **Type**: *callback* (item, newparent) => {}<br/>
**Mandatory**: No <br/>
**Description**:  If provided, exposes an icon that allows rows to be moved, Callback fired on drop. It is expected that some code be written for this callback to actually perform the move/modification of the tree. Reason being, the move may need to update anything such as redux/state/DB etc, therefore simply exposing the intention allows the developer to make the changes where necessary.

### columns
> **Type**: *Array of objects* <br/>
**Mandatory**: No <br/>
**Description**: Columns to display additional data

### icons
> **Type**: *Array of objects* <br/>
**Mandatory**: No <br/>
**Description**:  Icons that'll be execute provided callbacks when clicked (Icons tested with Font Awesome)

### fieldnames
> **Type**: *object* <br/>
**Mandatory**: No <br/>
**Description**: Name of fields that contains required information
Defaults
> * id: id
> * name: name
> * name: name
> * parentId: parentId

## Todo

* Expose prop that allows the clicking of the row to fire a provided callback as opposed to expanding/closing the row (current behaviour)
* Improve ability for custom styling
* Provide method in project to convert array of objects to tree

## Deploying a new version

* Bump version in package.json
* npm run-script deploy
* npm publish

## License

MIT © [luke575](https://github.com/luke575)
