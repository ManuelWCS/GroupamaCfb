import React, {useState} from 'react';
import '../../components/Searchbar/Searchbar.css';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';

function Searchbar({placeholder, data, merguez}) {
    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setwordEntered] = useState("");
   


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

        }
    }
    const clearInput = () => {
        setFilteredData([]);
        setwordEntered('')
    }
    return (
        <div className="search">
         <div className="searchInputs">
             <input type="text" placeholder={placeholder} onChange={handleFilter} value={wordEntered}></input>
             <div className="searchIcon"> { filteredData.length === 0 ? <SearchIcon/> : <CloseIcon id="clearBtn" onClick={clearInput}/>}</div>
         </div>
       { filteredData.length !==0 && (
         <div className="dataResult"  >
             { filteredData.slice(0 , 3).map((value, key ) => {
                 return <p  onClick={()=>{
                    merguez(value.name)
                 } 
                 } className="dataItem" target="_blank"> {value.name}</p>
             })}
         </div>
 
       )}
        </div>
    )
}

export default Searchbar
