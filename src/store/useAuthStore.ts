import AsyncStorage from "@react-native-async-storage/async-storage";
import {create} from "zustand";

interface AuthState {
    isAuthenticated: boolean;
    user: any | null;
    token: string | null;
    setAuth: (user: any, token: string) => void;
    removeAuth: () => void;
    loadAuth: () => void;
}

const STOREKEY = 'Auth'
export const useAuthStore = create<AuthState>((set)=>({
    isAuthenticated: false,
    user: null,
    token: null,
    setAuth: async(user: any, token: string) =>{
        try{
            const data = JSON.stringify({user, token});

            await AsyncStorage.setItem(STOREKEY, data);

            set({
                isAuthenticated: true,
                user: user,
                token: token
            })
        }catch(error){
            console.error('Error while storing auth : ', error);
        }
    },
    removeAuth: async() =>{
        try{
            await AsyncStorage.removeItem(STOREKEY);

            set({
                isAuthenticated: false,
                user: null,
                token: null
            })
        }catch(error){
            console.error('Error while removing auth : ', error);
        }

    }, 
    loadAuth: async() =>{
        try{
            const data = await AsyncStorage.getItem(STOREKEY);

            if(data){
                const auth = JSON.parse(data);

                set({
                    isAuthenticated: true,
                    user: auth?.user,
                    token: auth?.token
                })
            }else{
                console.warn('No auth data found');
            }
        }catch(error){
            console.error('Error while loading auth : ', error);
        }

    }
}))