import React, { useState, useEffect } from "react";
import axios from "axios";
import {motion} from "framer-motion";
import Modal from "./Modal";

const Product = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://raddythebrand.github.io/apex-legends/data.json"
      );
      setData(response.data);
    } catch (error) {
      console.log("Error fetching data from API:", error);
    }
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

  const groupedData = groupByHome(data);
  const [isOpenModal , setisOpenModal] = useState(false);
  function openModal(title) {
    // setselectedTitle(title);
    setisOpenModal(true);
  }
  function closeModal() {
    setisOpenModal(false);
  }
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      {Object.keys(groupedData).map((home, index) => (
        <div key={index}>
          <h2 style={{ marginTop: "30px" }}>{home}</h2>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "10px",
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    backgroundColor: "#f2f2f2",
                    padding: "10px",
                    textAlign: "left",
                    borderBottom: "1px solid #ccc",
                  }}
                >
                  Category
                </th>

              </tr>
            </thead>
            <tbody>
              {groupedData[home].map((item) => (
              <div>
                  <div
                    className="card"
                    key={item._id.$oid}
                  >
                    <motion.button
                      transition={{ type: "spring", bounce: 0.7 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => openModal(item.title)}
                      className="btn"
                    >
                      <motion.img
                        whileHover={{ scale: 1.09 }}
                        src={item.thumbnail.small}
                        alt="Avatar"
                        width={200}
                      />
                      <h4>
                        <b>{item.title}</b>
                      </h4>
                    </motion.button>
                  </div>
                  <Modal
                    isOpen={isOpenModal}
                    onClose={closeModal}
                    // title={selectedTitle}
                  />
                  {/* <td
                    style={{
                      padding: "10px",
                      textAlign: "left",
                      borderBottom: "1px solid #ccc",
                    }}
                  >
                    {item.category}
                  </td> */}
                  {/* <td
                    style={{
                      padding: "10px",
                      textAlign: "left",
                      borderBottom: "1px solid #ccc",
                    }}
                  >
                    {item.name}
                  </td> */}
            </div>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default Product;
