/* imports marqueurs illustrations*/
import marker from '../../assets/CompressedPictures/UserMarker/UserMarker.webp'

import clubMarker from '../../assets/CompressedPictures/Markers/clubMarker.png'

import LigueMarker from '../../assets/CompressedPictures/Markers/MarqueurLigue.webp'


export const faqMap = [{
    question: "Que signifie sur la carte le marqueur Ma position ? ",
    answer: " Ce marqueur indique votre position actuelle, il est disponible si vous autorisez la géolocalisation.",
    img: marker,
    styleName:"FAQuserMarker",
    styleNameDesktop: "FAQuserMarkerDesktop"
},
{
    question: " Que signifie sur la carte le marqueur Club de football ?",
    answer: "Ce marqueur indique l’existante d’un club de football, vous pouvez consulter davantage d’information sur celui-ci en cliquant sur « voir plus d’infos ». ",
    img: clubMarker,
    styleName: "FAQclubMarker",
    styleNameDesktop : "FAQclubMarkerDesktop"

},

{
    question: "Que signifie sur la carte les marqueurs qui n’apparaissent pas dans la légende ?",
    answer: "Ces marqueurs représentent les institutions fédérales, plusieurs Districts et une seule Ligue dans la Région.",
    img: LigueMarker,
    styleName:"FAQLigueMarker",
    styleNameDesktop : "FAQLigueMarkerDesktop"
},
{
    question: "Comment se déplacer sur la carte ?",
    answer: "Cliquez sur la carte pour déplacer votre position, vous pouvez aussi utiliser les touches fléchées pour déplacer votre position.",
},
];

console.log(faqMap);
