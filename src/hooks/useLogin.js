import { apiFetch } from "@/lib/apliClient";
import { useState } from "react";

export const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    
    const login = async (email, password) => {
        try{
            setLoading(true);
            setError(null);
            setData(null);
            const response = await apiFetch('/api/auth/login', {
               method: 'POST',
               body: JSON.stringify({email, password})
            });

            console.log({response});
            if(response.status != 200){
                return false;
            }

            if(!response.ok) throw new Error ('Nooo mi compa, puro modo guerra pa')

            const dataJson = await response.json();
            setData(dataJson)
            return true;
        }catch(err){
            console.log({err})
        }finally{

        }
    }
    return {login, loading, error, data}
}