import { useState } from "react";

export const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [date, setDate] = useState(null);
    
    const login = async (email, password) => {
        try{
            setLoading(true);
            setError(null);

            const Response = await fetch('/api/auth/login', {
               method: 'POST',
               headers: {
                'Content-Type': 'application/json'
               },
               body: JSON.stringify({email, password})
            });

            if(!Response.ok) throw new Error ('Nooo mi compa, puro modo guerra pa')

            const dataJson = await Response.json();
            setDate(dataJson)
            return dataJson;
        }catch(error){

        }finally{

        }
    }
    return {login, loading, error, date}
}