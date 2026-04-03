import { View, StyleSheet } from "react-native";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Facehash,
} from "react-native-facehash";

export default function App() {
  return (
    <View style={styles.container}>
      <Facehash name="John" size={100} />

      <Avatar style={{ width: 100, height: 100 }}>
        <AvatarImage source="https://img.freepik.com/free-photo/beautiful-view-sunset-sea_23-2148019892.jpg?size=626&ext=jpg" />
        <AvatarFallback name="John Doe" />
      </Avatar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
