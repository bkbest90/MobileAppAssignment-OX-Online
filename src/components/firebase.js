import { initializeApp } from 'firebase'

const app = initializeApp({
  apiKey: 'AIzaSyC3dDC-AgSqdM3G3pirxtitBjeOfFSdEGY',
  authDomain: 'oxfirebase-f6ec2.firebaseapp.com',
  databaseURL: 'https://oxfirebase-f6ec2.firebaseio.com',
  projectId: 'oxfirebase-f6ec2',
  storageBucket: 'oxfirebase-f6ec2.appspot.com',
  messagingSenderId: '109509907259'
})

export const db = app.database()
export const roomRef = db.ref('room')
