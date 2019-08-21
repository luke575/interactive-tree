import * as React from 'react'
import { ILeaf, IColumn, IIcon } from "./interfaces";
import styles from './styles.css'; 
import arrowsSVG from './assets/svg/arrows-alt.svg';

interface IState {
  dragState: DRAG_STATES;
}

enum DRAG_STATES {
  NORMAL,
  IN_MOTION,
  HOVERED_OVER
}

interface IProps {
  leftIndent: number;
  leaf: ILeaf;
  handleMove: any;
  recordClicked: any;
  caretSVG: any;
  columns?: IColumn[];
  icons?: IIcon[];
  isHide: boolean;
  allData: any;
}

class Leaf extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      dragState: DRAG_STATES.NORMAL
    };
  }

  private handleOnDrop(ev: any) {
    const { leaf, handleMove } = this.props;

    this.setState({ dragState: DRAG_STATES.NORMAL });
    var movedItemItemId = ev.dataTransfer.getData("text");
    const movedItemItemIdParentId =
      document.getElementById(movedItemItemId)!.dataset.parentid || "";

    const item = {
      id: parseInt(movedItemItemId),
      parentId: movedItemItemIdParentId
    };

    const newParent = {
      id: leaf.id,
      parentId: leaf.parentId
    };

    handleMove(item, newParent);
  }

  private renderName() {
    const {
      props: { leftIndent, leaf, caretSVG, recordClicked }
    } = this;

    return (
      <td
        style={{ paddingLeft: `${leftIndent}px` }}
        className={styles['name-column']}
        onClick={() => recordClicked()}
      >
        <span>
          <img src={caretSVG} className={styles.svg} />
        </span>
        {leaf.name}
      </td>
    );
  }

  private renderColumns() {
    const {
      props: { allData, columns = [] }
    } = this;
    return columns.map((column: any, index: number) => (
      <td key={index} className={styles['right-align'] }>
        {column.func(allData)}
      </td>
    ));
  }

  private renderIcons() {
    const {
      props: { leaf, handleMove, icons = [] }
    } = this;
    return (
      <td className={`${styles['right-align']} icons`} >
        {!!leaf.parentId && handleMove && (
          <img 

            src={arrowsSVG} 
            className={styles.svg}
            id={leaf.id.toString()}
            data-parentid={leaf.parentId}
            draggable={true}
            onDragStart={(ev: any) => {
              this.setState({ dragState: DRAG_STATES.IN_MOTION });
              ev.dataTransfer.setData("text", leaf.id);
            }}
            onDragEnd={() => this.setState({ dragState: DRAG_STATES.NORMAL })}
            />
        )}

        {icons.map((icon: IIcon, index: number) => (
          <i
            id={`leaf-${leaf.id.toString()}-icon-${index}`}
            key={index}
            onClick={() => icon.callback(leaf)}
            className={icon.class}
          />
        ))}
      </td>
    );
  }

  render() {
    const {
      props: { isHide, leaf },
      state: { dragState }
    } = this;

    if (!leaf.name) return null;

    const inlineStyle = { display: isHide ? "none" : "" };

    const className =
      [DRAG_STATES.HOVERED_OVER, DRAG_STATES.IN_MOTION].indexOf(dragState) > -1
        ? "highlight"
        : "";

    return (
      <tr
        id={`leaf-${leaf.id}`}
        className={styles[className]}
        style={inlineStyle}
        onDrop={(ev: any) => this.handleOnDrop(ev)}
        onDragOver={(ev: any) => ev.preventDefault()}
        onDragEnter={() => {
          if (dragState === DRAG_STATES.IN_MOTION) return;
          this.setState({ dragState: DRAG_STATES.HOVERED_OVER });
        }}
        onDragLeave={() => {
          if (dragState === DRAG_STATES.IN_MOTION) return;
          this.setState({ dragState: DRAG_STATES.NORMAL });
        }}
      >
        {this.renderName()}
        {this.renderColumns()}
        {this.renderIcons()}
      </tr>
    );
  }
}

export default Leaf;
