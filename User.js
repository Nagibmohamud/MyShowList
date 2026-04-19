import {getAuth, createUserWithEmailAndPassword,  signInWithEmailAndPassword,signOut} from "firebase/auth";
import {app} from "./fireconfig";
import { getDatabase } from "firebase/database";
import { View,Text,TextInput,Button } from "react-native";
import { useState } from "react";
import { StyleSheet } from "react-native";

const auth = getAuth(app);
const database = getDatabase(app);

export default function User() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);

    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setUser(userCredential.user);
                console.log("User signed up:", userCredential.user);
            })
            .catch((error) => {
                console.error("Error signing up:", error);
            });

        }  
    const handleSignIn = () => { 
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setUser(userCredential.user);
                console.log("User signed in:", userCredential.user);
            })
            .catch((error) => {
                console.error("Error signing in:", error);
            });
        }

        const handleSignOut = () => {
            signOut(auth)
                .then(() => {
                    setUser(null);
                    console.log("User signed out");
                })
                .catch((error) => {
                    console.error("Error signing out:", error);
                });
            }



return (
    <View>
        <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.input} />
        <TextInput keyboardType="email-address" placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
        <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />

        <Button title="Sign Up" onPress={handleSignUp} />
        <Button title="Sign In" onPress={handleSignIn} />
        <Button title="Sign Out" onPress={handleSignOut} />

        {user && <Text>Welcome, {user.email}!</Text>}
    </View>

    )
}


const styles = StyleSheet.create({

  input: {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    marginBottom: 10,
},
});
