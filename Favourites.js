import { useEffect, useState } from "react";
import { View, Text, FlatList, Image, StyleSheet, Pressable } from "react-native";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "./fireconfig";
import { onAuthStateChanged } from "firebase/auth";

export default function Favourites() {


    return (
        <View>
            <Text>Your Favourite Movies</Text>
           
        </View>
    );

}