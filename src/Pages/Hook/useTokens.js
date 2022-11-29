import { useEffect, useState } from 'react';

const useTokens = (user) => {
    const [token, setToken] = useState('');

    useEffect(()=>{
        const email = user?.user?.email
        const currentUser = {email : email}
        if(email){
            fetch(`https://tradl-technologies-private-limited-server.vercel.app/user/${email}`, {
                method:'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body:JSON.stringify(currentUser)
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