import { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Clipboard from "expo-clipboard";
import { router } from "expo-router";

export default function Home() {
  const [token, setToken] = useState<any>();
  useEffect(() => {
    getToken();
  }, []);

  const getToken = async () => {
    const myToken = await AsyncStorage.getItem("my-token");
    setToken(myToken);
    if (!myToken) {
      router.replace("/login");
    }
  };
  const [copiedText, setCopiedText] = useState<string>("");

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(token);
  };

  const fetchCopiedText = async () => {
    const text = await Clipboard.getStringAsync();
    setCopiedText(text);
    router.push("/login");
  };
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View style={styles.container}>
        <Button title="Click here to copy to Clipboard" onPress={copyToClipboard} />
        <Button title="View copied text" onPress={fetchCopiedText} />
        <Text>This is a token : {copiedText}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
});
