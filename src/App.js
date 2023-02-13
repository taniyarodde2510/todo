
import './App.css';
import React, { useEffect, useState } from "react";

function App() {

  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getData());
  const [itemEdit, setitemEdit] = useState();
  const [toggIcon, settoggIcon] = useState(false);


  useEffect(() => {
    localStorage.setItem('mytask', JSON.stringify(items));
  }, [items])


  function getData() {
    const list = localStorage.getItem('mytask');
    if (list) {
      return JSON.parse(list);

    } else {
      return [];
    }


  }



  function addItems() {
    if (!inputData) {
      alert("list can't be empty");
    }
    else if (inputData && toggIcon) {

      setItems(
        items.map((currentElement) => {
          if (currentElement.id === itemEdit) {
            return { ...currentElement, name: inputData }

          }
          return currentElement;

        })
      )
      setInputData("");
      settoggIcon(false);
    }
    else {
      const newData =
      {
        id: new Date().getTime().toString(),
        name: inputData
      }
      setItems([...items, newData])
      setInputData("");


    }
  }



  function clearAll() {
    setItems([]);

  }



  function deleteItem(index) {
    const updatedList = items.filter((currentElement) => {
      return currentElement.id !== index

    })
    setItems(updatedList)
  }


  function editItem(index) {
    settoggIcon(true)
    const editedItem = items.find((currentElement) => {
      return currentElement.id === index
    })
    setInputData(editedItem.name)
    setitemEdit(index)


  }



  return (
    <div className="App">
      <div className="container">
        <br></br>
        <div className="row">
          <div className="col-md-4 offset-md-4">

            <h2>To Do List</h2><br></br>
            <input type="text" value={inputData} placeholder='addlist' onChange=
              {(event) => setInputData(event.target.value)} className="form-control">
            </input>
            <br></br>

            {
              toggIcon ? <i style={{ position: "relative", left: "-20" }} className="fa fa-edit" onClick={addItems}></i>
                :
                <i className="fa fa-plus" onClick={addItems}></i>
            }


            <div className="list-items ">
              <ul>
                {
                  items.map((currentElement, index) => {
                    return (
                      <>
                        <li className="alert alert-info" key={index}>{currentElement.name}</li>
                        <button className="btn btn-warning btn-sm" onClick={() => editItem(currentElement.id)}>Edit</button>
                        <button className="btn btn-danger btn-sm" onClick={() => deleteItem(currentElement.id)}>Remove</button>
                        <hr></hr>
                      </>

                    )
                  })

                }

              </ul>

              <button className="btn btn-danger btn-sm" onClick={clearAll}>clearAll</button>




            </div>

          </div>
        </div>
      </div>


    </div>
  );
}

export default App;
