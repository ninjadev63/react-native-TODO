export interface Todo {
  id: string;
  name: string;
  isComplete: boolean;
}

export interface RootState {
  wasSeeded: boolean;
  todos: Todo[];
}
