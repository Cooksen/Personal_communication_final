// import { Image, StyleSheet, Platform } from 'react-native';
// import React, {useRef} from 'react';
// import { HelloWave } from '@/components/HelloWave';
// import ParallaxScrollView from '@/components/ParallaxScrollView';
// import { ThemedText } from '@/components/ThemedText';
// import { ThemedView } from '@/components/ThemedView';
// import { Button } from 'react-native';
// import { Alert } from 'react-native';
// import { TextInput } from 'react-native';
// import { WebView } from 'react-native-webview';
// import * as zkpUtil from './zkpUtil'
// // import RNFS from "react-native-fs"

//     // const startVerification = () =>
//     //   Alert.alert('ZKP Verification', 'ok!', [
//     //     {
//     //       text: 'Cancel',
//     //       onPress: () => console.log('Cancel Pressed'),
//     //       style: 'cancel',
//     //     },
//     //     {text: 'OK', onPress: () => console.log('OK Pressed')},
//     //   ]);


// export default function HomeScreen() {
//   // const webviewRef = useRef<WebView>(null);
//   // const sendMessageToWebView = () => {
//   //   const input = {
//   //     account: text,  // 銀行帳號
//   //     passcode: pass, // 安全碼
//   //     smsCode: SMS,   // SMS 驗證碼
//   //   };
//   //   if(webviewRef.current){
//   //       webviewRef.current.postMessage(JSON.stringify(input));

//   //   }
//   // };

//   // const handleMessage = (event: WebViewMessageEvent) => {
//   //   const proof = JSON.parse(event.nativeEvent.data);
//   //   console.log('Received proof from WebView:', proof);
//   //   // 在此处理接收到的 proof
//   // };



//   const sendSMSRequest = () => {
//     const smsData = {
//       number: '12345', // 發送到後端的虛擬號碼
//       message: '', // 發送的測試消息
//     };
//     console.log('hi')
//     fetch('http://10.0.2.2:3000/send-sms', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(smsData),
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error('Failed to send SMS');
//         }
//         return response.json();
//       })
//       .then((data) => {
//         console.log('SMS sent successfully:', data);
//         Alert.alert('Success', 'SMS has been sent!', [{ text: 'OK' }]);
//       })
//       .catch((error) => {
//         console.error('Error sending SMS:', error);
//         Alert.alert('Error', 'Failed to send SMS. Please try again.', [{ text: 'OK' }]);
//       });
//   };
  


//     const [text, onChangeText] = React.useState('銀行帳號');
//     const [pass, onChangePass] = React.useState('安全碼');
//     const [SMS, onChangeSMS] = React.useState('SMS');

//     const startVerification = async () => {
//       try {
//         // 收集用戶輸入
//         const input = {
//           account: text,  // 銀行帳號
//           passcode: pass, // 安全碼
//           smsCode: SMS,   // SMS 驗證碼
//         };
//         const wasm = require('./circuits/sum.wasm');
//         const circuit = require('./circuits/circuit_0000.zkey');

//         zkpUtil.loadInput();
        
//         // try {
//         //   const contents = await RNFS.readFile(RNFS.DocumentDirectoryPath + './circuits/test.json');
//         //   console.log(contents);
//         // } catch (error) {
//         //   console.error('Error reading file:', error);
//         // }
    
//         // 加載電路和密鑰文件
//         // const wasmPath = '/public/circuit.wasm';
//         // const zkeyPath = '/public/circuit_final.zkey';

    
//         // 使用 snarkjs 生成 Proof
//         // const { proof, publicSignals } = await groth16.fullProve(input, wasmPath, zkeyPath);
//         // const wasmPath = './circuits/sum.wasm';
//         // const zkeyPath = './circuits/circuit_0000.zkey';
        
//         // const zkey = await RNFS.readFile("../../assets/public/circuit_0000.zkey", "base64");
//         // const wtns = await RNFS.readFile("../../assets/public/sum.wasm", "base64");
        

//         // const {proof, pub_signals} = await groth16Prove(zkey, wtns);
    
//         // console.log('Generated Proof:', proof);
//         // console.log('Public Signals:', pub_signals);
    
//         // // 發送 Proof 和 publicSignals 到後端進行驗證
//         // const response = await fetch('http://10.0.2.2:3000/verify', {
//         //   method: 'POST',
//         //   headers: {
//         //     'Content-Type': 'application/json',
//         //   },
//         //   body: JSON.stringify({ proof, pub_signals }),
//         // });
    
//         // const result = await response.json();
//         // if (result.success) {
//         //   Alert.alert('Success', 'Verification successful!', [{ text: 'OK' }]);
//         // } else {
//         //   Alert.alert('Error', result.error || 'Verification failed.', [{ text: 'OK' }]);
//         // }
      
//       } catch (error) {
//         console.error('Error during verification:', error);
//         Alert.alert('Error', 'An error occurred during verification.', [{ text: 'OK' }]);
//       }
//     };

//   return (
//     <ParallaxScrollView
//       headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
//       >
//       <ThemedView style={styles.titleContainer}>
//         <ThemedText type="title">Welcome to SMS ZKP bank verification app!</ThemedText>
//         <HelloWave />
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <ThemedText type="subtitle">Step 1: Click the button to get verification SMS</ThemedText>
//         <Button onPress={sendSMSRequest}
//   title="Send SMS code"
//   color="#841584" />

//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <ThemedText type="subtitle">Step 2: Input information</ThemedText>
//         <ThemedText>
//           銀行帳號：
//         </ThemedText>
//         <TextInput
//           style={styles.input}
//           onChangeText={onChangeText}
//           value={text}
//           keyboardType='numeric'
//         />
//         <ThemedText>
//           安全碼：
//         </ThemedText>
//         <TextInput
//           style={styles.input}
//           onChangeText={onChangePass}
//           value={pass}
//           caretHidden={true}
//           keyboardType='numeric'
//         />
//         <ThemedText>
//           SMS Code：
//         </ThemedText>
//         <TextInput
//           style={styles.input}
//           onChangeText={onChangeSMS}
//           value={SMS}
//           caretHidden={true}
//           keyboardType='numeric'
//         />
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <ThemedText type="subtitle">Step 3: Start ZK verify!</ThemedText>
//         <Button onPress={startVerification}
//           title="Verify"
//           color="#841584" />
//       </ThemedView>
//       <WebView style={{height: '100%', width: '100%', overflow: 'hidden'}} source = {{uri : 'https://google.com'}}/>


//       {/* <WebView
//         ref={webviewRef}
//         source={require('./index.html')} // 对于 Android
//         // source={require('./web/index.html')} // 对于 iOS
//         onMessage={handleMessage}
//       />
//       <Button title="发送数据到 WebView" onPress={sendMessageToWebView} /> */}
//     </ParallaxScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   titleContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   stepContainer: {
//     gap: 8,
//     marginBottom: 8,
//   },
//   reactLogo: {
//     height: 178,
//     width: 290,
//     bottom: 0,
//     left: 0,
//     position: 'absolute',
//   },
//   input: {
//     height: 40,
//     margin: 12,
//     borderWidth: 1,
//     padding: 10,
//   },
// });

// import { WebView } from 'react-native-webview';
// import Constants from 'expo-constants';
// import { StyleSheet } from 'react-native';
// import { readAsStringAsync } from "expo-file-system";
// import { useAssets } from "expo-asset";
// import { useState } from 'react';
// import { View } from 'react-native';

// export default function HomeScreen() {
//   const [index, indexLoadingError] = useAssets(
//     require("./index.html")
//   );
//   const [html, setHtml] = useState("");

//   if (index) {
//     readAsStringAsync(index[0].localUri).then((data) => {
//         setHtml(data);
//     });
//   }

//   return (
//     <View style={styles.container}>
//     <WebView
//       onLoad={()=>{}}
//       source={{html}}
//       onMessage={(event)=>{}}
//     />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: Constants.statusBarHeight,
//   },
// });
