import { create } from 'sustend'
 
export const useStore = create((set, get) => (
    {//cositas pal usuario
    user: null,
    setUser: (userNew) => set({user: userNew}),
        logout: () => set({user: null}),
        cart: [],
        addToCart: (product) => {
            const cart = get().cart
            const existProduct = cart.find((p) => p.id ===product.id)
            if(existProduct){
                const productUpdate = cart.map((p) => p.id === product.id ? {
                    ...p,
                    units: p.units + 1
                } : p)
                
                
                set({cart: cartUpdate})}
        else{
            set({cart: [...cart, {...product, units: 1}]})
        }
    },
    removeProductCart: (product) => {
        const cart = get().cart.filter((p) => p.id != product.id)
        set({cart: cart})
    },
    cartDeleteAll: () => set({cart: []})
    }   
    )
    //hasta aqui llegue
    
)