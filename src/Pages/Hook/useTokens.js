import { useEffect, useState } from 'react';
import axios from 'axios';
const useTokens = (user , loading) => {
    const [token, setToken] = useState('');
console.log(user)
    useEffect(()=>{
        const email = user?.user?.email
        const currentUser = {email : email}
        if(email){
            fetch(`https://registrar-app.onrender.com/user/${email}`, {
                method:'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(currentUser)
            })
            .then(res=>res.json())
            .then(data => {
                console.log('data inside useToken', data);
                const accessToken = data.accessToken;
                localStorage.setItem('accessToken', accessToken);
                setToken(accessToken);
            })

        }

         
            
        


    },[user])

    return [token]
};

export default useTokens