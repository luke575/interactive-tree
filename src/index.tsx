import * as React from 'react'
import { ITree, IIcon, IColumn, ILeaf } from "./interfaces";
import Leaf from "./Leaf";

interface IState {
  isHideChildren: boolean;
}

interface IProps {
  title: string;
  tree: ITree;
  levelsDeep: number;
  isParentHidingMe: boolean;
  columns?: IColumn[];
  handleMove?: any;
  icons?: IIcon[];
}

const INDENT_INCREMENT = 15;

class Tree extends React.Component<IProps, IState> {
  public static defaultProps = {
    levelsDeep: 0,
    isParentHidingMe: false
  };

  constructor(props: IProps) {
    super(props);
    this.state = {
      isHideChildren: false
    };
  }

  private handleRecordClicked() {
    this.setState({ isHideChildren: !this.state.isHideChildren });
  }

  private renderChildren(): any {
    const {
      props: {
        tree: { children },
        levelsDeep,
        isParentHidingMe
      },
      state: { isHideChildren }
    } = this;

    return children.map((child: ITree, index: number) => (
      <Tree
        {...Object.assign({}, this.props, {
          // Mutated props
          key: index,
          tree: child,
          levelsDeep: levelsDeep + 1,
          isParentHidingMe: isHideChildren || isParentHidingMe
        })}
      />
    ));
  }

  renderData() {
    const {
      state: { isHideChildren },
      props: { isParentHidingMe, levelsDeep, columns, handleMove, tree, icons }
    } = this;

    const leaf: ILeaf = {
      id: tree.id,
      name: tree.name,
      parentId: tree.parentId
    };

    const iconClassName = `fas fa-caret-${isHideChildren ? "right" : "down"}`;

    return (
      <React.Fragment>
        <Leaf
          leaf={leaf}
          allData={tree}
          isHide={isParentHidingMe}
          iconClassName={iconClassName}
          columns={columns}
          leftIndent={levelsDeep * INDENT_INCREMENT}
          icons={icons}
          recordClicked={() => this.handleRecordClicked()}
          handleMove={(item: any, newParent: any) =>
            handleMove(item, newParent)
          }
        />
        {this.renderChildren()}
      </React.Fragment>
    );
  }

  initTable() {
    return (
      <table className="tree-table">
        <thead>
          <tr>
            <td style={{ fontWeight: "bold" }}>{this.props.title}</td>
            {(this.props.columns || []).map((column: any, index) => (
              <td key={index} className="right-align">
                {column.header}
              </td>
            ))}
          </tr>
        </thead>
        <tbody>{this.renderData()}</tbody>
      </table>
    );
  }

  render() {
    return this.props.levelsDeep === 0 ? this.initTable() : this.renderData();
  }
}

export default Tree;
