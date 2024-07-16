import { create } from 'zustand'

export default create((set) => {
    return {
        /**
         * Score
         */
        score: 0,
        increment: () => set((state) => ({ score: state.score + 1 })),
    }
})