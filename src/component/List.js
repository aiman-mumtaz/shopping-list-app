import React, { useState, useEffect } from "react";

function List() {
  const [Items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");

  const saveData = (newItems) => {
    localStorage.setItem("Items", JSON.stringify(newItems));
  };

  useEffect(() => {
    if (localStorage.getItem("Items")) {
      setItems(JSON.parse(localStorage.getItem("Items")));
    }
  }, []);

  const onAddItem = () => {
    if (newItem.trim()) {
      let newItems = [...Items, { Item: newItem.trim(), id: Date.now() }];
      setItems(newItems);
      setNewItem("");
      saveData(newItems);
    }
  };

  const deleteItem = (id) => {
    let newItems = Items.filter((Item) => Item.id !== id);
    setItems(newItems);

    saveData(newItems);
  };

  return (
    <div className="container mt-5">
      <h3 className="text-center"> Shopping Item</h3>

      <table className="table table-striped mt-5">
        <thead>
          <tr>
            <th>
              <input
                type="text"
                id="ItemInput"
                className="form-control"
                placeholder="Add Items to the Item"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
              />
            </th>
            <th>
              <button className="btn btn-secondary btn-block" onClick={onAddItem}>
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
          {Items.map((Item) => (
            <tr key={Item.id}>
              <td>{Item.Item}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteItem(Item.id)}
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