import { create } from 'sustend'
 
export const useStore = create((set, get) => (
    {//cositas pal usuario
    user: null,
    setUser: (userNew) => set({user: userNew}),
        logout: () => set({user: null}),
        cart: [],
        addToCart: (product) => {
            const cart = get().cart
            const existProduct = cart.find((p) => p.id ===product)
        }
    }
))