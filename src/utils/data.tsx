import uuid from 'react-native-uuid';
import {Todo} from '../interfaces/interface';

export const data: Todo[] = [
  {
    id: uuid.v4(),
    name: 'Learn React',
    isComplete: false,
  },
  {
    id: uuid.v4(),
    name: 'Learn Redux',
    isComplete: false,
  },
];
