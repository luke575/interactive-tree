import * as React from 'react'
import { ITree, IIcon, IColumn, ILeaf } from "./interfaces";
import Leaf from "./Leaf";
import caretDownSVG from './assets/svg/caret-down.svg';
import caretRightSVG from './assets/svg/caret-right.svg';
import styles from './styles.css';

interface IState {
  isHideChildren: boolean;
  cleanChildren: ITree[];
}

interface IFieldNames {
  id?: string;
  name?: string;
  parentId?: string;
}

interface IProps {
  title: string;
  tree: ITree;
  levelsDeep: number;
  isParentHidingMe: boolean;
  columns?: IColumn[];
  handleMove?: any;
  icons?: IIcon[];
  fieldNames?: IFieldNames;
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
      isHideChildren: false,
      cleanChildren: this.getCleanChildren(props.tree.children)
    };
  }

  /**
   * Handle possibility that children may be undefined
   * Also sort tree so those with no children are placed at the bottom
   */
  private getCleanChildren(children?:ITree[]) {
    if(!children) return [];
    
    return children.sort((a, b) => {
      if ((a.children || []).length < (b.children || []).length) return 1;
      if ((a.children || []).length > (b.children || []).length) return -1;
      return 0;
    });
  }

  private handleRecordClicked() {
    this.setState({ isHideChildren: !this.state.isHideChildren });
  }

  private renderChildren(): any {
    const {
      props: {
        levelsDeep,
        isParentHidingMe
      },
      state: { isHideChildren, cleanChildren }
    } = this;

    return cleanChildren.map((child: ITree, index: number) => (
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
      state: { isHideChildren, cleanChildren },
      props: { isParentHidingMe, levelsDeep, columns, handleMove, tree, icons, fieldNames = {} }
    } = this;

    const leaf: ILeaf = {
      id: tree[fieldNames.id || 'id'],
      name: tree[fieldNames.name || 'name'],
      parentId: tree[fieldNames.parentId || 'parentId']
    };

    let caretSVG = undefined;
    if(cleanChildren.length) {
      caretSVG = isHideChildren ? caretRightSVG : caretDownSVG;
    }

    return (
      <React.Fragment>
        <Leaf
          leaf={leaf}
          allData={tree}
          isHide={isParentHidingMe}
          caretSVG={caretSVG}
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
      <table className={styles['tree-table']}>
        <thead>
          <tr>
            <td style={{ fontWeight: "bold" }}>{this.props.title}</td>
            {(this.props.columns || []).map((column: any, index) => (
              <td key={index} className={ styles['right-align']}>
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
