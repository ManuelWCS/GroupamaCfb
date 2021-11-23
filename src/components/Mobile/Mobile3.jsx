import React, { useState, useEffect } from "react";
import Header from "../header/Header";
import "./Moible3.css";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import btnPicture from "../../assets/Boutons/buttontransparent.png";
import axios from "axios";
import Geolocalisation from "../Hook/Geolocalisation";
import MarkerClusterGroup from "react-leaflet-markercluster";



function Mobile3() {

    const [allcities, setallcities] = useState([]);
    const [categories, setCategories] = useState([]);
    const [allteams, setallTeams] = useState([]);
    const [clubSearch, setclubSearch] = useState([]);
    const [formData, setformData] = useState({
        age: null,
        city: "",
        type: 'Libre',
        gender2: '',
        category: "",
    })

    const filterSearch = (e) => {
        e.preventDefault();
        let categorieWanted = categories.filter(
            (categorySelected) =>
            (formData.gender2 === categorySelected.gender
                && formData.age >= categorySelected.minAge && categorySelected.age <= categorySelected.maxAge && formData.type === categorySelected.type))

        

        const resultofSearch = allteams.filter((clubWanted) =>
            clubWanted.Category === categorieWanted[0].name && clubWanted.Localite === formData.city);

        setclubSearch(resultofSearch);
        console.log(resultofSearch)

    }

    const handleChange = (e) => {
        setformData({ ...formData, [e.target.name]: e.target.value })
    }





    useEffect(() => {
        axios.get("https://api-clubs-cvl.herokuapp.com/cities")
            .then((res) => {
                let result = [];
                res.data.forEach(element => {
                    result.push({ label: element.name })
                });
                setallcities(result)
            })
    }, []);

    useEffect(() => {
        axios.get("https://api-clubs-cvl.herokuapp.com/categories")
            .then((res) => setCategories(res.data))
    }, [])

    useEffect(() => {
        axios.get("https://api-clubs-cvl.herokuapp.com/allteams").then((res) => setallTeams(res.data))
    }, [])




    return (
        <div className="fullPage">
            <Header />

            <div className="firstTitle">
                <h1 className="titlePart1">Trouvez un club près </h1>
                <h1 className="titlePart2">de chez vous ! </h1>

                <main className="mapContainer">
                    <MapContainer
                        className="mapLeaflet"
                        center={[48.856614, 2.3522219]}
                        zoom={13}
                        scrollWheelZoom={true}
                        doubleClickZoom={true}
                        zoomControl={true}
                    >
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Geolocalisation />

                        <MarkerClusterGroup
                            animate={true}
                            onClusterClick={(cluster) =>
                                console.warn(
                                    "cluster-click",
                                    cluster,
                                    cluster.layer.getAllChildMarkers()
                                )
                            }
                        >
                            {clubSearch.length !== 0 ?
                                clubSearch.slice(0, 100).map((res, index) => {
                                    return (
                                        <Marker key={index} position={[res.Latitude, res.Longitude]} >
                                            <Popup>
                                                test
                                            </Popup>
                                        </Marker>)
                                })
                                : null
                            }

                        </MarkerClusterGroup>
                    </MapContainer>
                </main>
                <section className="legendMap">
                    <p className="legend">
                        Entrez votre <em className="birthday">date de naissance </em>et la{" "}
                        <em className="ranked"> compétition </em> souhaitée pour découvrir
                        les clubs à proximité !{" "}
                    </p>
                </section>

                <div className="filtrations">
                    <form className="filtrationsWrapper" onSubmit={(e) => filterSearch(e)}>
                        <div className="filtre1">
                            <span className="filterTitle1">VOTRE ÂGE </span>
                            <TextField
                                label="Âge"
                                type="number"
                                margin="normal"
                                name="age"
                                onChange={(e) => { handleChange(e) }}
                                helperText="Renseingez votre aĝe ici"
                                focused
                                inputProps={{
                                    inputMode: "numeric",
                                    pattern: "[0-9]*",
                                    placeholder: "10, 15, 30...",
                                }}
                            />
                        </div>

                        <div className="filtre2">
                            <FormControl component="fieldset">
                                <span className="filterTitle2">COMPETITION :</span>
                                <RadioGroup
                                    row
                                    aria-label="gender"
                                    defaultValue="female"
                                    name="gender2"
                                    error="Vous devez renseigner une compétition"
                                    onChange={(e) => handleChange(e)}
                                    required={true}
                                >
                                    <FormControlLabel
                                        value="Male"
                                        className="radio1"
                                        control={<Radio />}
                                        label="Masculine"
                                    />
                                    <FormControlLabel
                                        className="radio1"
                                        value="Female"
                                        control={<Radio />}
                                        label="Feminine"
                                    />
                                </RadioGroup>
                            </FormControl>
                        </div>

                        <div className="filtre3">
                            <span className="filterTitle3"> VOTRE VILLE </span>
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                inputValue={formData.city}
                                options={allcities}
                                onInputChange={(event, newInputValue) => {
                                    setformData({ ...formData, city: newInputValue });
                                }}
                                sx={{ width: 250 }}
                                renderInput={(params) => (
                                    <TextField {...params} label="Rechercher" />
                                )}
                            />
                        </div>

                        <div className="btnContainer">
                            <button className="btnBackground" type="submit">
                                <img
                                    className="findclubBtn"
                                    alt="trouvez votre club"
                                    src={btnPicture}
                                />
                            </button>
                        </div>
                    </form>

                    <div className="searchresultsContainer">
                        <div className="cardResult">
                            <div className="cardWrapper">
                                <span className="clubnameContainer">

                                </span>
                                <div className="infoContainer">
                                    <div className="logosContainer">
                                        <img></img>
                                        <img></img>
                                        <img></img>

                                    </div>

                                    <div className="contentContainer">
                                        <div className="mailContainer"></div>
                                        <div className="adressContainer"></div>
                                        <div className="seeMoreContainer"></div>
                                    </div>

                                </div>

                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
}

export default Mobile3;
