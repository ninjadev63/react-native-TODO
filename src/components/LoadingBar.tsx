/* eslint-disable react/react-in-jsx-scope */
import {useAppSelector} from '../hooks/storeHook';
import {ProgressBar} from '@react-native-community/progress-bar-android';

const LoadingBar = () => {
  const loading = useAppSelector(state => state.app.loading);

  return (
    <>
      {loading && (
        <ProgressBar
          styleAttr="Horizontal"
          indeterminate={true}
          color="#333"
          animating={true}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            marginTop: -7,
            marginBottom: -7,
            position: 'absolute',
            top: 0,
            width: '100%',
          }}
        />
      )}
    </>
  );
};

export default LoadingBar;
