import {
  getAuth,
  updateProfile,
} from "firebase/auth";
import { saveImageBase64ToUrl, storeData } from "./storage";

const update = async (app, object) => {
    const auth = getAuth(app);
    let fileName;

    try{
      fileName = await saveImageBase64ToUrl(
        app, 
        object.email.replace(/[^a-zA-Z0-9]/g, ""),
        object.photoURL
      );
      object.photoURL = fileName;
    }catch(err){
      
    }

    try{
      updateProfile(auth.currentUser, object);
      storeData("user", object);
    }catch(err){
      console.log("Erro ao salvar perfil");
    }
};

export { update };
