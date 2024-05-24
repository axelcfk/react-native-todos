import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { useRouter } from "expo-router";
export default function LoginPage() {
  const router = useRouter();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1B2021",
      }}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            marginBottom: 20,
            fontSize: 20,
            fontWeight: "600",
            color: "#E0E2DB",
          }}
        >
          Log in{" "}
        </Text>
        <TextInput
          style={{
            height: 50,
            borderRadius: 20,
            width: 140,
            backgroundColor: "#E0E2DB",
            padding: 10,
          }}
          placeholder="Enter username"
        />
        <TextInput
          style={{
            height: 50,
            marginTop: 28,
            borderRadius: 20,
            width: 140,
            backgroundColor: "#E0E2DB",
            padding: 10,
          }}
          placeholder="Enter password"
        />
        <TouchableOpacity
          onPress={() => router.push("/")}
          style={{
            marginTop: 20,
            height: 40,
            width: 100,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 50,
            borderWidth: 1,
            color: "#1B2021",
            backgroundColor: "#D2F898",
          }}
        >
          <Text>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 100,
    position: "relative",
    backgroundColor: "#1B2021",
    padding: 20,
    width: "100%",
    paddingTop: 200,
  },
});
