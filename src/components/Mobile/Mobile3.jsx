import React, { useState, useEffect } from "react";
import Header from "../header/Header";
import "./Moible3.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
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
import Footer from '../../components/Footer/Footer.jsx';
import L from "leaflet";
import clubMarker from '../../assets/Marqueurs/LogoClub.png';
import indreMarker from '../../assets/Marqueurs/MarqueurIndre.png';
import indreEtLoireMarker from '../../assets/Marqueurs/IndreEtLoire.png';
import loirEtcher from '../../assets/Marqueurs/LoireCher2.png';
import cherMarker from '../../assets/Marqueurs/MarqueurCher.png';
import loiretMarker from '../../assets/Marqueurs/Marqueurloiret.png';
import eureEtLoireMarker from '../../assets/Marqueurs/MarqueurEureEtLoire.png';
import ligueMarker from '../../assets/Marqueurs/MarqueurLigue.png';



function Mobile3() {

    const [allcities, setallcities] = useState([]);
    const [categories, setCategories] = useState([]);
    const [allteams, setallTeams] = useState([]);
    const [clubSearch, setclubSearch] = useState([]);
    const [map, setMap] = useState(null)
    const [formData, setformData] = useState({
        age: null,
        city: "",
        type: '',
        gender2: '',
        category: "",
    })


    const LigueMarqueur = L.icon({
        iconSize: [40, 50],
        iconAnchor: [13.5, 47],
        iconUrl: ligueMarker,
    })
    const eureEtLoirMarqueur = L.icon({
        iconSize: [50, 50],
        iconAnchor: [13.5, 47],
        iconUrl: eureEtLoireMarker,
    })

    const loiretMarqueur = L.icon({
        iconSize: [70, 50],
        iconAnchor: [13.5, 40],
        iconUrl: loiretMarker,
    })

    const cherMarqueur = L.icon({
        iconSize: [60, 50],
        iconAnchor: [13.5, 47],
        iconUrl: cherMarker,
    })

    const loireEtcherMarqueur = L.icon({
        iconSize: [40, 50],
        iconAnchor: [13.5, 47],
        iconUrl: loirEtcher,
    })
    const indreMarqueur = L.icon({
        iconSize: [40, 50],
        iconAnchor: [13.5, 47],
        iconUrl: indreMarker,
    })

    const indreEtLoirMarqueur = L.icon({
        iconSize: [55, 50],
        iconAnchor: [13.5, 47],
        iconUrl: indreEtLoireMarker,
    })

    const clubMarqueur = L.icon({
        iconSize: [50, 50],
        iconAnchor: [13.5, 47],
        iconUrl: clubMarker,
    })
    console.log(formData)





    const filterSearch = (e) => {
        e.preventDefault();


        if (formData.age && formData.gender2 && formData.type && formData.city) {
        let categorieWanted = categories.filter(
            (categorySelected) =>
            (formData.gender2 === categorySelected.gender
                && formData.age >= categorySelected.minAge && formData.age <= categorySelected.maxAge && formData.type === categorySelected.type))



        const resultofSearch = allteams.filter((clubWanted) =>
            clubWanted.Category === categorieWanted[0].name && clubWanted.Localite === formData.city);

        setclubSearch(resultofSearch);
        
         if (resultofSearch.length === 0)
          console.log("There are no available locations");
        console.log(resultofSearch)
  
      const arrayOfLatLngs = resultofSearch.map(({ Latitude, Longitude }) => [
        Latitude,
        Longitude
      ]);
      const bounds = L.latLngBounds(arrayOfLatLngs);
      if (map) map.flyToBounds(bounds)} else {
          console.log('tg')

      }}
    

    

    function scrollTop() {
        window.location.href=('#map')
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

            <div className="mobiletitleContainer">
            <h1 className="titlePart1">Trouvez un club près </h1>
                <h1 className="titlePart2">de chez vous ! </h1>

            </div>

            <div className="titleContainerDesktop">
            <h1 className="titlePart1">Trouvez un <em className="blue"> club </em> près de chez <strong className="strong"> vous !</strong>  </h1>
            <section className="legendMap">
                        <p className="legend">
                            Entrez votre <em className="birthday">date de naissance </em>et la{" "}
                            <em className="ranked"> compétition </em> souhaitée pour découvrir
                            les clubs à proximité !{" "}
                        </p>
                    </section>
                

            </div>

            <div className="subContainer">
            

                <main className="mapContainer">
                    <MapContainer
                        className="mapLeaflet"
                        id="map"
                        center={[48.856614, 2.3522219]}
                        zoom={13}
                        scrollWheelZoom={true}
                        minZoo={6}
                        doubleClickZoom={true}
                        zoomControl={true}
                        whenCreated={setMap}
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
                                clubSearch.slice(0, 100).map((res, index2) => {
                                    return (
                                        <Marker icon={clubMarqueur} key={index2} position={[res.Latitude, res.Longitude]} >
                                            <Popup key={index2} className='markersPopUp'>
                                                <p> {res.Club}</p>
                                            </Popup>
                                        </Marker>)
                                })
                                : null
                            }

                        </MarkerClusterGroup>
                        <Marker position={[47.830261, 1.93609]} icon={LigueMarqueur}>
              <Popup className="InstanceLigue">
            <a href="https://foot-centre.fff.fr//">
              <h3 >Ligue Centre-Val de Loire </h3>
            </a>
          </Popup>
              </Marker>
              <Marker position={[47.11563, 2.35849]} icon={cherMarqueur}>
          <Popup className="InstancePopUp">
            <a href="https://cher.fff.fr/">
              <h3>District de Football du Cher </h3>
            </a>
          </Popup>
        </Marker>
        <Marker position={[48.42918, 1.46021]} icon={eureEtLoirMarqueur}>
          <Popup className="InstancePopUp">
            <a href="https://eure-et-loir.fff.fr/">
              <h3>District de Football d'Eure Et Loire </h3>
            </a>
          </Popup>
        </Marker>
        <Marker position={[46.79267, 1.69726]} icon={indreMarqueur}>
          <Popup className="InstancePopUp">
            <a href="https://indre.fff.fr/">
              <h3>District de Football de l'Indre </h3>
            </a>
          </Popup>
        </Marker>
         <Marker position={[47.9168433, 1.9246721]} icon={loiretMarqueur}>
          <Popup className="InstancePopUp">
            <a href="https://foot-loiret.fff.fr/">
              <h3>District de Football du Loiret </h3>
            </a>
          </Popup>
        </Marker>
        <Marker position={[47.5766331, 1.3026806]} icon={loireEtcherMarqueur}>
          <Popup className="InstancePopUp">
            <a href="https://loir-et-cher.fff.fr/">

            <h3>District de Football du Loir-et-Cher</h3>
            </a>
          </Popup>
        </Marker>

        <Marker position={[47.379130,0.726720]} icon={indreEtLoirMarqueur}>
          <Popup className="InstancePopUp">
            <a href="https://indre-et-loire.fff.fr/">

            <h3>District de Football d'Indre-Et-Loire'</h3>
            </a>
          </Popup>
        </Marker>


                    </MapContainer>
                </main>
                <div className="legendAndForm">



                    <div className="filtrations">
                        <form className="filtrationsWrapper" onSubmit={(e) => filterSearch(e)}>
                            <div className="filtre1">
                                <span className="filterTitle1">VOTRE ÂGE </span>
                                <TextField
                                
                                 variant="outlined"
                                    label="Âge"
                                    type="number"
                                    margin="normal"
                                    name="age"
                                    onChange={(e) => { handleChange(e) }}
                                    helperText="Renseignez votre aĝe ici"
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
                                        helperText='Vous devez renseigner le champ'
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


                            <div className="filtre4">
                                <FormControl component="fieldset" required={true}>
                                    <span className="filterTitle4">PRATIQUE SOUHAITEE :</span>
                                    <RadioGroup
                                        row
                                        aria-label="type"
                                        name="type"
                                        error="Vous devez renseigner une compétition"
                                        onChange={(e) => handleChange(e)}
                                        required={true}
                                    >
                                        <FormControlLabel
                                            value="Libre"
                                            className="radio1"
                                            control={<Radio />}
                                            label="Libre"
                                        />
                                        <FormControlLabel
                                            className="radio1"
                                            value="Loisir"
                                            control={<Radio />}
                                            label="Loisir"
                                        />
                                          <FormControlLabel
                                            className="radio1"
                                            value="Futsal"
                                            control={<Radio />}
                                            label="Futsal"
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
                                    noOptionsText='Pas de résultats correspondants à votre recherche'
                                    onInputChange={(event, newInputValue) => {
                                        setformData({ ...formData, city: newInputValue });
                                    }}
                                    sx={{ width: 250 }}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Rechercher" />
                                    )}
                                />
                                <div className="hiddenSearchResult" id='hidden'>
                                </div>
                            </div>



                            <div className="btnContainer" id='test'>
                                <button className="btnBackground" id='scrollBtn'type="submit" onClick={scrollTop}>
                             

                                    <img
                                        className="findclubBtn"
                                        alt="trouvez votre club"
                                        src={btnPicture}
                                    />
                                </button>
                                

                            </div>


                            <div className="btnContainer" id='test2'>
                                <button className="btnBackground" id='scrollBtn'type="submit">
                             

                                    <img
                                        className="findclubBtn"
                                        alt="trouvez votre club"
                                        src={btnPicture}
                                    />
                                </button>
                                

                            </div>
                        </form>
                    </div>
                        
                    <div className="resul">



                        {clubSearch.length !== 0 ?
                            clubSearch.map((clubSelected, Uniqueindex) => {
                                return (

                                    <div className="cardResult" key={Uniqueindex}>
                                        <div className="titleCardContainer">
                                            <span className="titleCard">
                                                {clubSelected.Club}
                                            </span>
                                        </div>

                                        <div className="columnContainer">
                                            <div className="column1">
                                                <div className="logo1"></div>
                                                <div className="logo2"></div>
                                                <div className="logo3"></div>

                                            </div>
                                            <div className="column2">

                                                <div className="info1"> {clubSelected.Mail}</div>
                                                <div className="info2">{clubSelected.Adresse}</div>
                                                <div className="info3">Voir plus d'infos</div>
                                            </div>

                                        </div>





                                    </div>)
                            })
                            : null}




                    </div>
                </div>
                                <div className="resultatsDesktop">
                                {clubSearch.length !== 0 ?
                            clubSearch.map((clubSelected, Uniqueindex) => {
                                return (

                                    <div className="cardResult" key={Uniqueindex}>
                                        <div className="titleContainer">
                                            <span className="titleCard">
                                                {clubSelected.name}
                                            </span>
                                        </div>

                                        <div className="columnContainer">
                                            <div className="column1">
                                                <div className="logo1"></div>
                                                <div className="logo2"></div>
                                                <div className="logo3"></div>

                                            </div>
                                            <div className="column2">

                                                <div className="info1"> {clubSelected.Mail}</div>
                                                <div className="info2">{clubSelected.Adresse}</div>
                                                <div className="info3">Voir plus d'infos</div>
                                            </div>

                                        </div>





                                    </div>)
                            })
                            : null}
                               
                            </div>


                <Footer />

            </div>
        </div>
    );
}

export default Mobile3;
