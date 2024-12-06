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
  addDoc,
  getFirestore,
  query,
  where,
} from '@react-native-firebase/firestore';
import {data as todos} from '../../utils/data';

const collectionName = 'todos';
const fireStore = getFirestore();
const docRef = collection(fireStore, collectionName);

const errorHandling = (
  error: unknown | null = null,
  errorMsg: string | null = null,
) => {
  // Ensure the error is of the correct type
  const errorResponse: FetchBaseQueryError = {
    status: 'FETCH_ERROR', // You can customize this status
    error: errorMsg ?? (error as Error).message, // Provide a meaningful error message
  };
  return {error: errorResponse}; // Return the error in the expected format
};

export const fireStoreApi = createApi({
  reducerPath: 'fireStoreApi',
  baseQuery: fetchBaseQuery({baseUrl: '/'}),
  tagTypes: ['Tasks'],
  endpoints: builder => ({
    fetchDataFromDb: builder.query<Todo[], void>({
      async queryFn() {
        try {
          const querySnapshot = await getDocs(docRef);

          const data: Todo[] = querySnapshot.docs.map(_doc => ({
            id: _doc.id, // Include the document ID
            ..._doc.data(), // Spread the document data
          })) as Todo[];

          return {data: data ?? todos};
        } catch (error) {
          return errorHandling(error);
        }
      },
      providesTags: ['Tasks'],
    }),

    createNewTaskOnDb: builder.mutation({
      async queryFn(task: Todo) {
        try {
          await addDoc(docRef, task);

          return {data: task};
        } catch (error) {
          return errorHandling(error);
        }
      },
      invalidatesTags: ['Tasks'],
    }),

    deleteTaskOnDb: builder.mutation({
      async queryFn(fieldId: string) {
        try {
          // Create a query to find the document with the specified field value
          const q = query(
            collection(fireStore, collectionName),
            where('id', '==', fieldId),
          );
          const querySnapshot = await getDocs(q);

          // Check if the document exists
          if (!querySnapshot.empty) {
            // Assuming you want to delete the first matching document
            const docToDelete = querySnapshot.docs[0];
            await docToDelete.ref.delete();
            return {data: null};
          } else {
            return errorHandling(null, 'Document not found');
          }
        } catch (error) {
          console.error('Error deleting document:', error); // Log the error for debugging
          return errorHandling(error);
        }
      },
    }),

    completeTaskOnDb: builder.mutation({
      async queryFn(fieldId: string) {
        try {
          // Create a query to find the document with the specified field value
          const q = query(
            collection(fireStore, collectionName),
            where('id', '==', fieldId),
          );
          const querySnapshot = await getDocs(q);

          // Check if the document exists
          if (!querySnapshot.empty) {
            const docToUpdate = querySnapshot.docs[0];
            const currentData = docToUpdate.data();

            // Update the document to mark it as completed
            await docToUpdate.ref.update({
              isComplete: !currentData.isComplete,
            });
            return {data: null};
          } else {
            return errorHandling(null, 'Document not found');
          }
        } catch (error) {
          console.error('Error deleting document:', error); // Log the error for debugging
          return errorHandling(error);
        }
      },
    }),
  }),
});

export const {
  useFetchDataFromDbQuery,
  useCreateNewTaskOnDbMutation,
  useDeleteTaskOnDbMutation,
  useCompleteTaskOnDbMutation,
} = fireStoreApi;

//* App Slice
export const appSlice = createSlice({
  name: 'app',
  initialState: {
    loading: false,
    todos,
  },
  reducers: {
    //* Set loading status
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

//* Export Actions
export const {setLoading} = appSlice.actions;

//* Export Reducer
export default appSlice.reducer;
