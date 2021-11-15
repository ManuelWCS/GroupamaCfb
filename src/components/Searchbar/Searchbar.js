import React, {useState} from 'react';
import '../../components/Searchbar/Searchbar.css';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';

function Searchbar({placeholder, data, selection}) {
    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setwordEntered] = useState("");
    const [wordSelected, setWordSelected] = useState(false);
    
    

    const handleFilter = (event) => {
        const searchWord = event.target.value;
        setwordEntered(searchWord)
        const newFilter = data.filter((value)=> {
            return value.name.toLowerCase().includes(searchWord.toLowerCase());
        });

        if (searchWord === "") {
            setFilteredData([])
        } else {
            setFilteredData(newFilter)
            console.log(data)
            console.log(searchWord)
            console.log(newFilter)
            console.log(filteredData)
            console.log(wordSelected)
        }
    }

    
    const clearInput = () => {
        setFilteredData([]);
        setwordEntered('')
    }
    return (
        <div className="search">
         <div className="searchInputs">
             <input className="cityInput" type="text" placeholder={placeholder} onChange={handleFilter} value={wordEntered} onClick={() => {
                 setWordSelected(false)
             }}></input>
             <div className="searchIcon"> { filteredData.length === 0 ? <SearchIcon/> : <CloseIcon id="clearBtn" onClick={clearInput}/>}</div>
         </div>
       { filteredData.length !==0 && (
         <div className={wordSelected ? "dropdownClicked" : "dataResult"} > 
             { filteredData.slice(0 , 3).map((value, key ) => {

                
                 
                 return <p  id="dataResult" onClick={()=>{
                    selection(value.name)
                    setWordSelected(true)
                    setwordEntered(value.name)
                 } 
                 } className="dataItem" id="one"target="_blank"> {value.name}</p>
             })}
         </div>
 
       )  }
        </div>
    )
}

export default Searchbar
