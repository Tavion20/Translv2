import React from "react";
import { View, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const Navbar = () => {
  return (
    <View
      style={{
        marginTop: 20,
        height: 70,
        backgroundColor: "#231F1F",
        borderRadius: 20,
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        flexDirection: "row",
      }}
    >
      <TouchableOpacity onPress={() => router.push("/")}>
        <View>
          <AntDesign name="home" size={28} color="#ecbbea" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/text/")}>
        <View>
          <Ionicons name="text-sharp" size={28} color="#ecbbea" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/image/")}>
        <View>
          <Entypo name="images" size={28} color="#ecbbea" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/audio/")}>
        <View>
          <MaterialIcons name="multitrack-audio" size={28} color="#ecbbea" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/file/")}>
        <View>
          <Feather name="file-text" size={28} color="#ecbbea" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Navbar;
