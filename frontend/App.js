import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { ImageProvider } from "./components/context/imageContext";
import { Navigation } from "./components/Navigation";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  return (
    <ImageProvider>
      <Navigation />
      <SafeAreaView />
    </ImageProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
