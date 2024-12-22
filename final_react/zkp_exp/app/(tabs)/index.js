

import { WebView } from 'react-native-webview';
import { readAsStringAsync } from "expo-file-system";
import { useAssets } from "expo-asset";
import { useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import React, {useRef} from 'react';
import { HelloWave } from '@/components/HelloWave';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from 'react-native';
import { Alert } from 'react-native';
import { TextInput } from 'react-native';



export default function HomeScreen() {
  const [index, indexLoadingError] = useAssets(
    require("./index.html")
  );

  const [html, setHtml] = useState("");

  if (index) {
    readAsStringAsync(index[0].localUri).then((data) => {
        setHtml(data);
    });
  }
  const webviewRef = useRef(null);

  const sendMessageToWebView = () => {
    
    const input = {
        account: text,  // 銀行帳號
        passcode: pass, // 安全碼
        smsCode: SMS,   // SMS 驗證碼
    };
    webviewRef.current?.postMessage(JSON.stringify(input));
    // console.log(webviewRef)
  };

  const handleMessage = async (event) => {
    try {
      console.log((JSON.parse(event.nativeEvent.data)["success"]))
      if(JSON.parse(event.nativeEvent.data)["success"] == false) {
        Alert.alert((JSON.parse(event.nativeEvent.data))["error"]);
      } else {
        const {proof, pubsig} = JSON.parse(event.nativeEvent.data);
        console.log('Received proof from WebView:', proof);
        // 發送 Proof 和 publicSignals 到後端進行驗證
        const response = await fetch('http://10.0.2.2:3000/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ proof, pubsig, SMS }),
        });
  
        const result = await response.json();
        if (result.success) {
          Alert.alert('Success', 'Verification successful!', [{ text: 'OK' }]);
        } else {
          Alert.alert('Error', result.error || 'Verification failed.', [{ text: 'OK' }]);
        }
  
      }

    } catch (error) {
      // console.error('Error parsing proof:', error);
    }
  };


  const sendSMSRequest = () => {
    const smsData = {
      number: '12345', // 發送到後端的虛擬號碼
      message: '', // 發送的測試消息
    };
    fetch('http://10.0.2.2:3000/send-sms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(smsData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to send SMS');
        }
        return response.json();
      })
      .then((data) => {
        console.log('SMS sent successfully:', data);
        Alert.alert('Success', 'SMS has been sent!', [{ text: 'OK' }]);
      })
      .catch((error) => {
        console.error('Error sending SMS:', error);
        Alert.alert('Error', 'Failed to send SMS. Please try again.', [{ text: 'OK' }]);
      });
  };

  const startVerification = async () => {
    try {
      // 收集用戶輸入
      const input = {
        account: text,  // 銀行帳號
        passcode: pass, // 安全碼
        smsCode: SMS,   // SMS 驗證碼
      };

    } catch (error) {
      console.error('Error during verification:', error);
      Alert.alert('Error', 'An error occurred during verification.', [{ text: 'OK' }]);
    }
  };

  const [text, onChangeText] = React.useState('');
  const [pass, onChangePass] = React.useState('');
  const [SMS, onChangeSMS] = React.useState('');

  return (
    <ScrollView style={styles.container}>
        <ThemedView style={styles.stepContainer}>
        <ThemedText type="title">Welcome to SMS ZKP bank verification app!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Click the button to get verification SMS</ThemedText>
        <Button onPress={sendSMSRequest}
  title="Send SMS code"
  color="#841584" />

      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Input information</ThemedText>
        <ThemedText>
          銀行帳號：
        </ThemedText>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
          keyboardType='numeric'
          placeholder='銀行帳號'
        />
        <ThemedText>
          安全碼：
        </ThemedText>
        <TextInput
          style={styles.input}
          onChangeText={onChangePass}
          value={pass}
          caretHidden={true}
          keyboardType='numeric'
          placeholder='安全碼'
        />
        <ThemedText>
          SMS Code：
        </ThemedText>
        <TextInput
          style={styles.input}
          onChangeText={onChangeSMS}
          value={SMS}
          caretHidden={true}
          keyboardType='numeric'
          placeholder='SMS code'
        />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Start ZK verify!</ThemedText>
        <Button onPress={
            // startVerification
            sendMessageToWebView
        }
          title="Verify"
          color="#841584" />
      </ThemedView>

    <WebView
      onLoad={()=>{}}
      source={{html}}
      ref={webviewRef}
      onMessage={handleMessage}
      domStorageEnabled
      javaScriptEnabled
      baseUrl={'./'}
      originWhitelist={['*']}
      // style={styles.stepContainer}
    />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    height: 300,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
    padding: 14,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
