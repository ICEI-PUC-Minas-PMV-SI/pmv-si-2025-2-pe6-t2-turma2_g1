import React from 'react';
import {StyleSheet, View} from 'react-native';
import { useTheme } from 'react-native-paper';

const Container = ({children}) =>{
  const theme = useTheme();
  return <View style={[styles.container, { backgroundColor: theme.colors.primaryContainer }]}>{children}</View>;
};

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
});

export default Container;


// import React from 'react';
// import {StyleSheet, View} from 'react-native';
// import { useTheme } from 'react-native-paper';

// const Container = ({children}) =>{
//   const theme = useTheme();
//   return <View style={styles.container}>{children}</View>
// };

// const styles = StyleSheet.create({
//  container:{
//     flex:1,
//     backgroundColor: theme.colors.primaryContainer,
//   },
// });

// export default Container;