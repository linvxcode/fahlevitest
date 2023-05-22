import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "./Modal";
import {motion} from "framer-motion";


function Notproduct() {
  const [product, setProduct] = useState([]);
  const getData = async () => {
    try {
      let response = await axios.get(
        "https://raddythebrand.github.io/apex-legends/data.json"
      );
      setProduct(response.data);
    } catch (error) {
      console.log(error.message);
    } 
  };

  useEffect(() => {
    getData();
  }, []);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const handleSearchClick = () => {
    if (!product) return;
    const results = product.filter(
      (item) =>
        (item.home && item.home.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setSearchResults(results);
  };

  const groupByHome = (dataArray) => {
    const groupedData = {};
    dataArray.forEach((item) => {
      const home = item.home;
      if (!groupedData[home]) {
        groupedData[home] = [];
      }
      groupedData[home].push(item);
    });
    return groupedData;
  };

  const groupedData = groupByHome(
    searchResults.length > 0 ? searchResults : product
  );
  return (
    <div>
      <div className="searchinput">
        <input
          className="input"
          type="text"
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search..."
        />
        <button onClick={handleSearchClick}>Search</button>
      </div>
      {Object.entries(groupedData).map(([home, items]) => (
        <div key={home} className="border">
          <h2 className="category-title">{home}</h2>
          {items.map((item) => (
            <Cards
              key={item._id.$oid}
              title={item.home}
              name={item.name}
              thumbnail={item.thumbnail.small}
            />
          ))}
        </div>
      ))}
  {/* searchResults.length > 0 ? searchResults : product).map((item) => */}
  

    </div>
  );
  function Cards(props) {
    const [selectedTitle, setselectedTitle] = useState("");
    const [selectedName, setselectedName] = useState("");
    const [isOpenModal , setisOpenModal] = useState(false);
    function openModal(title, name) {
      setselectedTitle(title);
      setselectedName(name);
      setisOpenModal(true);
    }
    function closeModal() {
      setisOpenModal(false);
    }
    const isSearchResult =
      props.searchResults && props.searchResults.length > 0;

    return (
      <div>
      <div className={`card ${isSearchResult ? "search-result" : ""}`}>
        <motion.button transition={{type: "spring", bounce: 0.7}} whileTap={{scale: 0.97 }} onClick={() => openModal(props.title , props.name)} className="btn">
          <motion.img
          whileHover={{scale: 1.09}}
           src={props.thumbnail} alt="Avatar" width={200} />
          <h4>
            <b>{props.name}</b>
          </h4>
        </motion.button>
      </div>
      <Modal isOpen={isOpenModal} onClose={closeModal} title={selectedTitle} name={selectedName} />
      </div>
    );
  }
}

export default Notproduct;
