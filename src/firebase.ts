// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import faker from 'faker'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
import 'firebase/compat/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDxnWA-Mmrr6_YL1-zCPO_-lexZ3loVU2Y",
    authDomain: "raysel-shop.firebaseapp.com",
    projectId: "raysel-shop",
    storageBucket: "raysel-shop.appspot.com",
    messagingSenderId: "427264157696",
    appId: "1:427264157696:web:7bde271188be9b55cc10e5",
    measurementId: "G-KWJF8FXJ8X"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore()

// const data = ["https://shopping-express.raysel-revolution.com/wp-content/uploads/sites/9/2021/08/3.jpg", 'https://shopping-express.raysel-revolution.com/wp-content/uploads/sites/9/2021/08/3.jpg', 'https://shopping-express.raysel-revolution.com/wp-content/uploads/sites/9/2021/08/3.jpg']
// for (let i = 0; i < 30; i++) {
//     const id = db.collection('products').doc().id
//     const batch = db.batch()
//     batch.set(db.collection('products').doc(id), {
//         id: id,
//         commission: 200,
//         images: data,
//         description: faker.random.words(100),
//         store: faker.random.alphaNumeric(10),
//         title: faker.name.firstName(),
//         price: faker.datatype.number(500),
//         createdAt: firebase.firestore.FieldValue.serverTimestamp(),
//         category: faker.random.alpha({ count: 10 }),
//         image: faker.image.image(),
//     })
//     batch.set(db.collection('stats').doc('--products--'), { count: firebase.firestore.FieldValue.increment(1) }, { merge: true })
//     batch.commit()
// }
export const auth = firebase.auth()
export default app

