import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Search.css";

const Search = () => {
  const [mydata, setData] = useState([]);
  const [searchInput, SetsearchInput] = useState("");
  const [newFilteredData, setfilteredData] = useState();
  const api = async () => {
    const fetchApi = await fetch("https://fakestoreapi.com/products");
    const response = fetchApi.json();
    return response;
  };
  let navigate = useNavigate();

  useEffect(() => {
    const Data = mydata.filter((item) => {
      return Object.values(item)
        .join("")
        .toLowerCase()
        .includes(searchInput.toLowerCase());
    });
    setfilteredData(Data);
  }, [searchInput]);

  useEffect(() => {
    api().then((r) => {
      console.log(r.data);
      setData(r);
    });
  }, []);

  const handleClick = (i) => {
    console.log(i);
    navigate("/product", { state: i });
  };
  return (
    <div className="search_Main_Con">
      <label>Search Items Here...!</label>
      <input
        type="text"
        value={searchInput}
        onChange={(e) => SetsearchInput(e.target.value)}
        placeholder="search here.."
      />
      {console.log(newFilteredData?.length, "final")}
      {newFilteredData?.length > 0 ? (
        <div className="search_Container">
          {newFilteredData?.map((item) => {
            return (
              <div
                className="Display_Wrapper"
                onClick={() => {
                  handleClick(item);
                }}
              >
                <h3>{item.title}</h3>
                <h3>{item.category}</h3>
                <h3>{item.price}</h3>
                <div className="rating_wrapper">
                  <h3>{item.rating.rate}</h3>
                  <h3>{item.rating.count}</h3>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="search_Container">
          {mydata?.map((item) => {
            return (
              <div
                className="Display_Wrapper"
                onClick={() => {
                  handleClick(item);
                }}
              >
                <h3>{item.title}</h3>
                <h3>{item.category}</h3>
                <h3>{item.price}</h3>
                <div className="rating_wrapper">
                  <h3>{item.rating.rate}</h3>
                  <h3>{item.rating.count}</h3>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Search;
