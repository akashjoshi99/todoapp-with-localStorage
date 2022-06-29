import React, { useState,useEffect } from "react";
import DeleteIcon from "@material-ui/icons/Delete";

//fetch data from local storage
const getData = () => {
  let list = localStorage.getItem("lists");
  console.log(JSON.parse(list));
  if (list) {
    return JSON.parse(localStorage.getItem("lists"));
  } else return [];
};

export default function TodoList() {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getData);

  //handling change
  const handleChange = (e) => {
    setInputData(e.target.value);
    console.log("changed");
  };

  //add items to an array
  const addItem = (e) => {
    e.preventDefault();
    if (inputData) {
      setItems([inputData, ...items]);
      console.log(items);
      setInputData("");
    }
  };
  //delete items once task complete
  const deleteItem = (index) => {
    const itemList = items.filter((item,id) => {
      return id != index;
    });
    setItems(itemList);
  };

  //add data to local storage
  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(items));
  }, [items]);


  return (
    <>

      <div>
        <form className="todoForm">
          <input
            type="text"
            placeholder="What to do?"
            value={inputData}
            name="text"
            className="todoInput"
            onChange={handleChange}
          />
          <button className="todoButton" onClick={addItem}>
            Add
          </button>
        </form>
      </div>

      {items.map((task, index) => {
        return (
          <div className="todoList">
            <div key={index}>{task}</div>
            <div className="icons">
              <DeleteIcon
                className="deleteIcon"
                onClick={() => deleteItem(index)}
              />
            </div>
          </div>
        );
      })}

    </>
  );
}
