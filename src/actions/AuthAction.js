import Types from './types'
import firebase from 'firebase'
import {YellowBox } from 'react-native'
import RNFetchBlob from 'react-native-fetch-blob'
import { uploadImage } from './Helpers';


export const SignUp=({name,email,pass,imgUri})=>{
   return(dispatch)=>{
       dispatch({type:Types.ATTEMPTING});
       firebase.auth().createUserWithEmailAndPassword(email,pass)
       .then(response => handleAccountCreated(dispatch, response.user.uid, name, imgUri) )
       .catch(error => handleError(dispatch, error.message));
   }
}


export const login = ({ email, pass }) => {
  return (dispatch) => {
      dispatch({type:Types.ATTEMPTING });

      firebase.auth().signInWithEmailAndPassword(email, pass)
          .then(resp => handleLoginSuccess(dispatch, resp.user.uid))
          .catch(error => handleError(dispatch, error.message));
  };
};

const handleLoginSuccess = (dispatch, userId) => {
  YellowBox.ignoreWarnings(['Setting a timer']);
  firebase.database().ref(`profiles/${userId}`)
      .on('value', (snapshot) => {
          const data = snapshot.val();
          const profile = {
              id: userId,
              name: data.name,
              imageUrl: data.imageUrl
          };

          dispatch({ type: Types.LOGIN_SUCCESS, payload: profile });
      });
};




getSelectedImages =(imgUri)=>{

  
    const Blob = RNFetchBlob.polyfill.Blob
      const fs = RNFetchBlob.fs
      window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
      window.Blob = Blob
  
      let uploadBlob = null
      const imageRef = firebase.storage().ref('posts').child("90.jpg")
      let mime = 'image/jpg'
      const uri=imgUri
      const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
      fs.readFile(uploadUri, 'base64')
        .then((data) => {
          return Blob.build(data, { type: `${mime};BASE64` })
      })
      .then((blob) => {
          uploadBlob = blob
          return imageRef.put(blob, { contentType: mime })
        })
        .then(() => {
          uploadBlob.close()
          return imageRef.getDownloadURL()
        })
        .then((url) => {
          firebase.database().ref(`profiles/90`)
          .set({name:'Mahmoud',Age:'23',imgUrl:url})
          .then(() => { console.log("Added")})
          .catch(error => {console.log(error.message)});
        })
        .catch((error) => {
          console.log(error);
  
        })
  }

const handleError = (dispatch, message) => {
    dispatch({ type: Types.SIGN_FAILED, payload: message });
};


const handleAccountCreated = (dispatch, userId, name, profileImage) => {
    //Upload the image
    YellowBox.ignoreWarnings(['Setting a timer']);
    const imageName = `${userId}.jpg`;
    uploadImage(profileImage, 'profiles', imageName)
        .then((url) => {
            firebase.database().ref(`profiles/${userId}`)
                .set({ name, imageUrl: url })
                .then(() => { dispatch({ type: Types.SIGN_SUCCESS }); })
                .catch(error => handleError(dispatch, error.message));
        })
        .catch(error => handleError(dispatch, error.message));
};
