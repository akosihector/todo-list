const listData = [
  { id: 1, desc: "Coke", price: 20 },
  { id: 2, desc: "Pepsi", price: 21 },
  { id: 3, desc: "Mushroom", price: 100 },
  { id: 4, desc: "Spinnach", price: 200 },
];

import "./App.css";
import { useState } from "react";

function App() {
  const [items, setItems] = useState([]);

  const handleSubmit = (item) => {
    if (!item) return;
    setItems([...items, item]);
  };

  const handleUpdate = (id, newItem) => {
    const itemsArray = items.map((items) => {
      if (items.name === id) {
        return { ...items, name: newItem };
      }

      return items;
    });

    setItems(itemsArray);
  };

  const handleDelete = (id) => {
    const itemsArray = items.filter((items) => {
      return items.name !== id;
    });

    setItems(itemsArray);
  };
  return (
    <>
      <FormContainer handleSubmit={handleSubmit} />
      <ListBody
        items={items}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
      />
    </>
  );
}
function FormContainer({ handleSubmit }) {
  const [uname, setUname] = useState("");

  const handleInputData = (e) => {
    e.preventDefault();
    if (!uname) return;
    const newItems = { name: uname };

    handleSubmit(newItems);
    setUname("");
  };

  return (
    <>
      <form onSubmit={handleInputData} className="form">
        <input
          type="text"
          onChange={(e) => setUname(e.target.value)}
          value={uname}
        />
        <button className="btn btn-success">Save</button>
      </form>
    </>
  );
}

function ListBody({ items, handleUpdate, handleDelete }) {
  return (
    <div className="container list-container">
      <ul className="flex-item">
        {items.map((item, i) => (
          <ListBodyData
            item={item}
            key={i}
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
          />
        ))}
      </ul>
    </div>
  );
}

function ListBodyData({ item, handleUpdate, handleDelete }) {
  const [newItem, setnewItem] = useState(item.name);
  const [isEditing, setIsEditing] = useState(false);

  const handleOnDelete = () => {
    handleDelete(item.name);
  };

  const handleOnEdit = () => {
    handleUpdate(item.name, newItem);
    setIsEditing(false);
  };

  return (
    <>
      <span className="flex-item">
        <span>
          <li>
            {isEditing ? (
              <span>
                <input
                  className="input-box"
                  type="text"
                  value={newItem}
                  onChange={(e) => setnewItem(e.target.value)}
                />
              </span>
            ) : (
              item.name
            )}
          </li>
        </span>
        <span>
          <button
            className="btn btn-success"
            onClick={() => {
              isEditing ? handleOnEdit() : setIsEditing(true);
            }}
          >
            {isEditing ? "Save" : "Update"}
          </button>
          <button
            className="btn btn-success"
            onClick={() => {
              isEditing ? setIsEditing(false) : handleOnDelete();
            }}
          >
            {isEditing ? "Cancel" : "Delete"}
          </button>
        </span>
      </span>
    </>
  );
}
export default App;
