import { View } from "react-native";
import {
  TextInput,
  Avatar,
  Button,
  Snackbar,
  FAB,
} from "@react-native-material/core";
import { update } from "../util/user";
import { getData, getFile } from "../util/storage";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useState, useEffect } from "react";
import { pickImage } from "../util/image";

const Profile = ({ route }) =>{
    const [email, setEmail] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [photoURL, setPhotoURL] = useState("");
    const [snackBarShow, setSnackBarShow] = useState(false);
    const [loading, setLoading] = useState(false);

    const loadProfile = async () => {
      let user = await getData("user");
      setEmail(user.email);
      setDisplayName(user.displayName);
      setPhoneNumber(user.phoneNumber);
      try{
        setPhotoURL(await getFile(route.params.firebaseApp, user.photoURL));
      }catch(err){
        alert("Erro ao carregar imagem");
      }
    }
    
    const uploadPhoto = async () => {
      const image = await pickImage();
      setPhotoURL(image);
    };

    useEffect(() => {
        loadProfile();
    }, [])
    return (
      <View
        style={{
          alignSelf: "stretch",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          padding: 20,
        }}
      >
        <View>
          <Avatar
              size={150}
              image={{ uri: photoURL ? photoURL : "https://mui.com/static/images/avatar/1.jpg" }}
            />
          <FAB
            color="primary"
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
            }}
            onPress={uploadPhoto}
            icon={(props) => <Icon name="plus" {...props} />}
          />
        </View>
        <TextInput
          style={{
            width: "100%",
            marginTop: 32,
          }}
          label="E-mail"
          variant="outlined"
          value={email}
          leading={(props) => <Icon name="email" {...props} />}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextInput
          style={{
            width: "100%",
          }}
          label="Nome"
          variant="outlined"
          value={displayName}
          leading={(props) => <Icon name="account" {...props} />}
          onChange={(e) => setDisplayName(e.target.value)}
        />
        <TextInput
          style={{
            width: "100%",
          }}
          label="Telefone"
          variant="outlined"
          value={phoneNumber}
          leading={(props) => <Icon name="phone" {...props} />}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <Button
          title="Editar Perfil"
          loading={loading}
          onPress={async () => {
            setLoading(true);
            await update(route.params.firebaseApp, {
              email,
              displayName,
              phoneNumber,
              photoURL,
            });
            setLoading(false);
            setSnackBarShow(true);
          }}
          leading={(props) => <Icon name="pencil" {...props} />}
          style={{
            width: "100%",
          }}
        />
        <>
          {snackBarShow ? (
            <Snackbar
              message="Usuário alterado com sucesso!!!"
              action={
                <Button title="Fechar" onPress={() => setSnackBarShow(false)} />
              }
              style={{ position: "absolute", start: 16, end: 16, bottom: 16 }}
            />
          ) : (
            ""
          )}
        </>
      </View>
    );
}

export default Profile;