import { onAuthStateChanged } from 'firebase/auth';
import React, {useEffect, useState} from 'react'
import { auth } from '../../firebase-config';


const AuthDetails = () => {
    const [authUser,setAuthUser] = useState(null);


    useEffect(() =>{
        const listen = onAuthStateChanged(auth, (user) => {
            if (user){
                setAuthUser(user)
            }
            else{
                setAuthUser(null);
            }
        })
    })

  return (
    <div>
      {authUser ? <p>Sign in </p> : <>Sign out</>}
    </div>
  )
}

export default AuthDetails
