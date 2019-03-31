export interface ILeaf {
  id: number;
  name: string;
  parentId: number;
}

export interface ITree extends ILeaf {
  children: ITree[];
}

export interface IIcon {
  class: string;
  callback: any;
}

export interface IColumn {
  header: string;
  func: any;
}
