import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    users: [],
    userById: null,
    loading: false,
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: { //actions são criadas aqui
        createUser: (state, action) => {
            return {
                ...state,
                user: {
                    name: action.payload.name,
                    email: action.payload.email,
                    address: null,
                }
            }
        },
        logoutUser: (state) => {
            return {
                ...state,
                user: null,
            }
        },
        addAddress: (state, action) => {
            if(action.payload.location === '' || action.payload.number === '') {
                alert("Preencha todos os campos.");
                return { ...state };
            }

            if(state.user === null) {
                alert("Bloqueado: faça login primeiro para, em seguida, cadastrar um endereço.");
                return { ...state };
            }

            alert("Endereço cadastrado com sucesso!");

            return {
                ...state,
                user: {
                    ...state.user,
                    address: {
                        location: action.payload.location,
                        number: action.payload.number,
                    },
                },
            }
        },
        deleteAddress: (state) => {
            return {
                ...state,
                user: {
                    ...state.user,
                    address: null,
                },
            };
        },
        fetchUsers: (state) => {
            state.loading = true;
        },
        fetchUsersSuccess: (state, action) => {
            //console.log(action.payload);
            state.users = action.payload;
            state.loading = false;
        },
        fetchUsersFailure: (state, action) => {
            console.log("FAILURE.");
            console.log(action.payload);
            state.loading = false;
        },
        fetchUserById: (state) => {
            console.log("Chamou FetchUserById");
            state.loading = true;
        },
        fetchUserByIdSuccess: (state, action) => {
            console.log(`Usuário com ID --> ${action.payload}`);
            
            state.userById = action.payload;
            state.loading = false;
        },
        fetchUserByIdFailure: (state, action) => {
            console.log("FAILURE do fetchUserById");
            state.loading = false;
        },
    },
});

export const { createUser, logoutUser, addAddress, deleteAddress, fetchUsers, 
    fetchUsersSuccess, fetchUsersFailure, fetchUserById, 
    fetchUserByIdSuccess, fetchUserByIdFailure } = userSlice.actions;
    
export default userSlice.reducer; // exportando o reducer nomeado como "user".