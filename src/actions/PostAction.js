import Types from '../actions/types'
import firebase from 'firebase';
import { uploadImage } from './Helpers';

export const addPost = (title, author, imgUri, imageName) => {
    return (dispatch) => {

        dispatch({ type: Types.ADDING_POST });

        uploadImage(imgUri, 'posts', imageName)
            .then((url) => {

                const postToSave = {
                    title,
                    author,
                    url
                };

                firebase.database().ref('posts').push(postToSave)
                    .then(() => {
                        dispatch({ type: Types.ADDING_SUCCESS });
                    })
                    .catch(error => handleError(dispatch, error.message));
            })
            .catch(error => handleError(dispatch, error.message));
    };
};

export const fetchPosts = () => {
    return (dispatch) => {
        
        dispatch({ type: Types.Fetshing });

        firebase.database().ref('posts')
            .limitToLast(30)
            .on('value', (snapshot) => {
                const data = snapshot.val() || [];
                handleData(dispatch, data);
            });
    };
};

const handleData = (dispatch, data) => {
    const posts = [];
    Object.values(data).forEach(item => {
        posts.unshift(item);
    });

    dispatch({ type: Types.Fetshing_Done, payload: posts });
};


const handleError = (dispatch, error) => {
    dispatch({ type: Types.ADDING_FAILED, payload: error });
};