import * as React from 'react'
import { ILeaf, IColumn, IIcon } from "./interfaces";

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
  iconClassName: string;
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
      props: { leftIndent, leaf, iconClassName, recordClicked }
    } = this;

    return (
      <td
        style={{ paddingLeft: `${leftIndent}px` }}
        onClick={() => recordClicked()}
      >
        <i className={iconClassName} />
        {leaf.name}
      </td>
    );
  }

  private renderColumns() {
    const {
      props: { allData, columns = [] }
    } = this;
    return columns.map((column: any, index: number) => (
      <td key={index} className="right-align">
        {column.func(allData)}
      </td>
    ));
  }

  private renderIcons() {
    const {
      props: { leaf, handleMove, icons = [] }
    } = this;
    return (
      <td className="right-align icons">
        {!!leaf.parentId && handleMove && (
          <i
            id={leaf.id.toString()}
            className={`fas fa-arrows-alt`}
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
        className={className}
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
