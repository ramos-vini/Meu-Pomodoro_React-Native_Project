import {
  Stack,
  TextInput,
  IconButton,
  Button,
  Snackbar,
} from "@react-native-material/core";
import { View, TouchableOpacity, Text } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useState } from "react";
import { Image } from "react-native";
import { authRegister } from "../util/auth";

const Register = ({ route }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  return (
    <View
      style={{
        alignSelf: "stretch",
        justifyContent: "center",
        height: "100%",
        padding: 20,
      }}
    >
      <TextInput
        label="E-mail"
        variant="outlined"
        value={email}
        leading={(props) => <Icon name="account" {...props} />}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextInput
        label="Senha"
        secureTextEntry={!showPassword}
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        leading={(props) => <Icon name="lock" {...props} />}
        trailing={() => (
          <IconButton
            icon={() => <Icon name={showPassword ? "eye-off" : "eye"} />}
            onPress={() => setShowPassword(!showPassword)}
          />
        )}
      />
      <Button
        title="Registrar"
        loading={loading}
        onPress={async () => {
          let msg = "";
          setLoading(true);
          if (email !== "" && password !== "") {
            const result = await authRegister(
              route.params.firebaseApp,
              email,
              password
            );
            if (result.status === 201) {
              route.params.setIsLoggedIn(true);
            }

            msg = result.message;
          } else {
            msg = "Todos os campos são obrigatórios!";
          }
          setMessage(msg);
          setLoading(false);
        }}
        leading={(props) => <Icon name="send" {...props} />}
        style={{
          paddingTop: 10,
          paddingBottom: 10,
        }}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate("Login")}
        style={{
          elevation: 8,
          borderRadius: 10,
          paddingVertical: 14,
          paddingHorizontal: 5,
        }}
      >
        <Text
          style={{
            fontSize: 12,
            color: "rgb(98, 0, 238)",
            fontWeight: "bold",
            alignSelf: "center",
            textTransform: "uppercase",
          }}
        >
          Entrar
        </Text>
      </TouchableOpacity>
      <>
        {message !== "" ? (
          <Snackbar
            message={message}
            style={{ position: "absolute", start: 16, end: 16, bottom: 16 }}
          />
        ) : (
          ""
        )}
      </>
    </View>
  );
};

export default Register;
