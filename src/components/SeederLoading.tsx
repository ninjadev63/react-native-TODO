import React, {useEffect} from 'react';
import {View, ActivityIndicator, Text, StyleSheet} from 'react-native';
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
} from '@react-native-firebase/firestore';
import {data as initialData} from '../utils/data';
import Toast from 'react-native-toast-message';

interface IProps {
  setIsSeeding: (value: boolean) => void;
}

const SeederLoading = ({setIsSeeding}: IProps) => {
  const fireStore = getFirestore();

  const runSeeder = async () => {
    setIsSeeding(true);
    const docRef = collection(fireStore, 'todos');
    const getDocsResult = await getDocs(docRef);

    if (getDocsResult.docs.length > 0) {
      setIsSeeding(false);
      return;
    } else {
      try {
        for (const task of initialData) {
          await addDoc(docRef, task);
        }
      } catch (e) {
        Toast.show({
          type: 'error',
          text1: 'The seeding process failed.',
          text2: String(e),
        });
      }

      setIsSeeding(false);
    }
  };

  useEffect(() => {
    runSeeder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.loadingContainer}>
      <Text style={styles.text}>Loading...</Text>
      <ActivityIndicator size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  text: {
    textAlign: 'center',
  },
});

export default SeederLoading;
