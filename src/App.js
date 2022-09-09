import React, { useEffect, useState } from "react";

const localStorageData = () => {
  let item = localStorage.getItem("id");

  if (item) {
    return JSON.parse(item);
  } else return [];
};

const App = () => {
  const [inputVal, setInputVal] = useState("");
  const [data, setData] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setData([...data, inputVal]);
    setInputVal("");
  };
  const handleChange = (event) => {
    setInputVal(event.target.value);
  };
  const handleDelete = (id) => {
    let list = data.filter((cur, index) => {
      return index !== id;
    });

    setData(list);
  };
  useEffect(() => {
    // console.log(data)
    localStorage.setItem("id", JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    setData(localStorageData());
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1> Todo List</h1>
        <input
          type="text"
          name="text"
          placeholder="Enter Item"
          onChange={handleChange}
          value={inputVal}
        />
        <button type="submit">ADD</button>
        <ol>
          {data.map((val, index) => {
            return (
              <li key={val + index}>
                <span>
                  <div>{val}</div>
                  <button onClick={() => handleDelete(index)}>Delete</button>
                </span>
              </li>
            );
          })}
        </ol>
      </form>
    </div>
  );
};

export default App;
