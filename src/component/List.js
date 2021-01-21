import React, { useState, useEffect } from "react";

function List() {
  const [Lists, setLists] = useState([]);
  const [newList, setNewList] = useState("");

  const saveData = (newLists) => {
    localStorage.setItem("Lists", JSON.stringify(newLists));
  };

  useEffect(() => {
    if (localStorage.getItem("Lists")) {
      setLists(JSON.parse(localStorage.getItem("Lists")));
    }
  }, []);

  const onAddList = () => {
    if (newList.trim()) {
      let newLists = [...Lists, { List: newList.trim(), id: Date.now() }];
      setLists(newLists);
      setNewList("");
      saveData(newLists);
    }
  };

  const deleteList = (id) => {
    let newLists = Lists.filter((List) => List.id !== id);
    setLists(newLists);

    saveData(newLists);
  };

  return (
    <div className="container mt-5">
      <h3 className="text-center"> Shopping List</h3>

      <table className="table table-striped mt-5">
        <thead>
          <tr>
            <th>
              <input
                type="text"
                id="ListInput"
                className="form-control"
                placeholder="Add Items to the List"
                value={newList}
                onChange={(e) => setNewList(e.target.value)}
              />
            </th>
            <th>
              <button className="btn btn-secondary btn-block" onClick={onAddList}>
                {" "}
                Add
              </button>
            </th>
          </tr>
        </thead>

        <tr>
            <th scope="col"></th>
          </tr>

        <tbody id="table">
          {Lists.map((List) => (
            <tr key={List.id}>
              <td>{List.List}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteList(List.id)}
                >
                  {" "}
                  Delete{" "}
                </button>{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default List;