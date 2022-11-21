import { createSlice } from "@reduxjs/toolkit";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { firebaseConfig } from "../utils/firebaseConfig";

const app = initializeApp(firebaseConfig);

export const firebaseSlice = createSlice({
	name: "firebase",
	initialState: {
		app: app,
		auth: getAuth(app),
		cardData: null,
        cards: []
	},
	reducers: {
		cardDataUpdate(state, actions) {
			state.cardData = { ...state.cardData, ...actions.payload };
		},
        setCards(state,actions) {
            state.cards = [...state.cards, actions.payload]
        }
	},
});

export const { cardDataUpdate, setCards } = firebaseSlice.actions;
export default firebaseSlice.reducer;
