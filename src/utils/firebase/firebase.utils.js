import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBIxxnYRVDNcYO65ZDJWP9ZEAzofsGvOUw",
    authDomain: "crwn-db-517f2.firebaseapp.com",
    projectId: "crwn-db-517f2",
    storageBucket: "crwn-db-517f2.appspot.com",
    messagingSenderId: "628372147547",
    appId: "1:628372147547:web:d24560dda8428b9bd11e7e"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider()
  
  provider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

  export const db = getFirestore()
  
  export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef)

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());
    


    //if user data does not exist
    //create/set the document with the data from userAuth in my collection
    if(!userSnapshot.exists()) {
        const {displayName, email } = userAuth;
        const createdAt = new Date();

        try{
            await setDoc(userDocRef, {
                displayName, 
                email, 
                createdAt
            });
        }
        catch (error) {
            console.log('error creating the user' , error.message );
        }
    }

    return userDocRef;   

}