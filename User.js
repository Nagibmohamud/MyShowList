import {getAuth, createUserWithEmailAndPassword,  signInWithEmailAndPassword,signOut} from "firebase/auth";
import {app} from "./fireconfig";
import { getDatabase } from "firebase/database";
import { View,Text,TextInput,Button } from "react-native";
import { useState } from "react";
import { StyleSheet } from "react-native";

//Firebase auth and database setup
const auth = getAuth(app);
const database = getDatabase(app);

export default function User() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);

    //Sign up
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
    //Sign in
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
    //Sign out
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


//User page when logged in
if (user) {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Profile</Text>

        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{user.email[0].toUpperCase()}</Text>
          </View>
          <Text style={styles.emailText}>{user.email}</Text>
        </View>

        <Button title="Sign Out" onPress={handleSignOut} color="#e50914" />
      </View>
    );
  }

  //User page when not logged in
return (
    <View style={styles.container}>
        <Text style={styles.title}>User Account</Text>
        <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.input} placeholderTextColor="#888" />
        <TextInput keyboardType="email-address" placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} placeholderTextColor="#888" />
        <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} placeholderTextColor="#888" />

    <View style={styles.buttonRow}>
        <Button title="Sign In" onPress={handleSignIn} />
        <Button title="Sign Up" onPress={handleSignUp} color="#ff0814" />
        </View>
    </View>

    )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    color: "#fff",
    fontWeight: "700",
  },
  input: {
    flex: 1,
    backgroundColor: "#222",
    color: "#fff",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#333",
  },heading: {
    fontSize: 28,
    fontWeight: "800",
    color: "#fff",
    letterSpacing: 1,
    paddingBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#333",
    backgroundColor: "#222",
    color: "#fff",
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    fontSize: 15,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginTop: 4,
  },
  profileCard: {
    backgroundColor: "#1e1e1e",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    marginBottom: 24,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#e50914",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  avatarText: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "800",
  },
  emailText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  
}); 