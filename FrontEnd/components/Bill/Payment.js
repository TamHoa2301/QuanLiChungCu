import React from 'react';
import { View, Text, Button, Linking, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import CryptoJS from 'crypto-js';

const Payment = () => {
  const accessKey = 'F8BBA842ECF85';
  const secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
  const orderInfo = 'pay with MoMo';
  const partnerCode = 'MOMO';
  const redirectUrl = 'https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b';
  const ipnUrl = 'https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b';
  const requestType = "captureWallet";
  const amount = '50000';
  const orderId = partnerCode + new Date().getTime();
  const requestId = orderId;
  const extraData = '';
  const orderGroupId = '';
  const autoCapture = true;
  const lang = 'vi';

  const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;

  const signature = CryptoJS.HmacSHA256(rawSignature, secretKey).toString(CryptoJS.enc.Hex);

  const requestBody = {
    partnerCode: partnerCode,
    partnerName: "Test",
    storeId: "MomoTestStore",
    requestId: requestId,
    amount: amount,
    orderId: orderId,
    orderInfo: orderInfo,
    redirectUrl: redirectUrl,
    ipnUrl: ipnUrl,
    lang: lang,
    requestType: requestType,
    autoCapture: autoCapture,
    extraData: extraData,
    orderGroupId: orderGroupId,
    signature: signature
  };

  const sendRequest = () => {
    axios.post('https://test-payment.momo.vn/v2/gateway/api/create', requestBody, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => {
      console.log('Status:', response.status);
      console.log('Headers:', response.headers);
      console.log('Body:', response.data);

      if (response.data && response.data.payUrl) {
        // Mở ứng dụng MoMo hoặc trình duyệt với URL được cung cấp
        Linking.openURL(response.data.payUrl).catch(err => console.error("Couldn't load page", err));
      }
    })
    .catch(error => {
      console.error('Problem with request:', error.message);
      if (error.response) {
        console.error('Error data:', error.response.data);
        console.error('Error status:', error.response.status);
        console.error('Error headers:', error.response.headers);

        if (error.response.status === 404) {
          Alert.alert('Error', 'API endpoint not found.');
        }
      } else {
        Alert.alert('Error', 'Network error or server is not reachable.');
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MoMo Payment</Text>
      <Button title="Send Payment Request" onPress={sendRequest} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default Payment;