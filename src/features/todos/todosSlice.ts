import {createSlice} from '@reduxjs/toolkit';
import {Todo} from '../../interfaces/interface';
import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import {
  collection,
  getDocs,
  getFirestore,
} from '@react-native-firebase/firestore';
import {data as todos} from '../../utils/data';

const fireStore = getFirestore();

export const fireStoreApi = createApi({
  reducerPath: 'fireStoreApi',
  baseQuery: fetchBaseQuery({baseUrl: '/'}),
  tagTypes: ['Tasks'],
  endpoints: builder => ({
    fetchDataFromDb: builder.query<Todo[], void>({
      async queryFn() {
        try {
          const docRef = collection(fireStore, 'todos');
          const querySnapshot = await getDocs(docRef);

          const data: Todo[] = querySnapshot.docs.map(doc => ({
            id: doc.id, // Include the document ID
            ...doc.data(), // Spread the document data
          })) as Todo[];

          return {data: data ?? todos};
        } catch (error) {
          // Ensure the error is of the correct type
          const errorResponse: FetchBaseQueryError = {
            status: 'FETCH_ERROR', // You can customize this status
            error: (error as Error).message, // Provide a meaningful error message
          };
          return {error: errorResponse}; // Return the error in the expected format
        }
      },
      providesTags: ['Tasks'],
    }),
  }),
});

export const {useFetchDataFromDbQuery} = fireStoreApi;

//* Todos Slice
export const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    wasSeeded: false,
    todos,
  },
  reducers: {
    //* Set seeding status
    setWasSeeded: (state, action) => {
      state.wasSeeded = action.payload;
    },
    //* Add Todo
    addTodo: (state, action) => {
      const newTodo: Todo = {
        id: action.payload.id,
        name: action.payload.name,
        isComplete: false,
      };
      state.todos = [...state.todos, newTodo];
    },
    //* Delete Todo
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
    //* Toggle Todo
    toggleTodo: (state, action) => {
      const todo = state.todos.find(_todo => _todo.id === action.payload);
      if (todo) {
        todo.isComplete = !todo.isComplete;
      }
    },
  },
});

//* Export Actions
export const {addTodo, deleteTodo, toggleTodo, setWasSeeded} =
  todosSlice.actions;

//* Export Reducer
export default todosSlice.reducer;
