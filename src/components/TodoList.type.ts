export enum Status {
  TODO = "TODO",
  DOING = "DOING",
  DONE = "DONE",
}

export interface ITodo {
  id: number;
  selected: boolean;
  label: string;
  status: Status;
}

export interface ITodoList {
  selectedList: ITodo[];
  setselectedList: React.Dispatch<React.SetStateAction<ITodo[]>>;
  alerting: boolean;
}
