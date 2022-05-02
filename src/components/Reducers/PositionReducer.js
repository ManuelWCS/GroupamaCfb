import {createSlice} from "@reduxjs/toolkit";
// import Geolocalisation from '../../components/Hook/useGeolocation'

// const location = useGeolocation();

export const PositionSlice = createSlice({
    name : "position",
    initialSate: {value : { coordinates : {latitude : 0, longitude : 0}, loaded : false}}, 
    reducers : {
        setPosition : (state, action) => {
            state.value = action.payload
        },
        setLoaded : (state, action) => {
            state.value.loaded = action.payload
        },
        setCoordinates : (state, action) => {
            state.value.coordinates = action.payload
        }
    }
})

export default PositionSlice.reducer;