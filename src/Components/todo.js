import { React, useEffect, useState } from 'react';
import './style.css'

const Todo = () => {

    // Get data from the Local Storage 
    const LocalData = () => {
        const data = localStorage.getItem("myTodo");
        if (data) {
            return JSON.parse(data);
        }
        else {
            return [];
        }
    }



    const [inputData, setInputData] = useState('');
    const [items, setItems] = useState(LocalData);

    const [button, setButton] = useState(false);
    const [number, setNumber] = useState('');


    // Add New Items 
    const AddItems = () => {
        if (inputData === '') {
            alert("Please Enter something the input feild !")
        }
        else {
            const data = {
                id: new Date().getTime().toString(),
                name: inputData
            }
            setItems([...items, data])
            setInputData('')
        }
    }


    // Delete the items 
    const DeleteItem = (index) => {
        const delItem = items.filter((curElem) => {
            return curElem.id !== index
        })
        setItems(delItem)
    }



    // Calling a Function on pressing Enter key
    const useOnKey = (callback, targetKey) => {
        useEffect(() => {
            const Keypresser = (e) => {
                if (e.key === targetKey) {
                    callback();
                }
            }
            window.addEventListener("keydown", Keypresser);
            return () => {
                window.removeEventListener("keydown", Keypresser)
            }
        }, [callback, targetKey])
    }






    // Edit items
    const EditItem = (index) => {
        setButton(true);
        const data = items.find((curElem) => {
            return curElem.id === index;
        })

        setNumber(data.id);
        setInputData(data.name);
        // document.getElementById("input").click();
    }


    // Update editAble items 
    const UpdateItems = () => {
        const data = items.find((curElem) => {
            return curElem.id === number
        })
        if (inputData === '') {
            alert("Please enter Something in the input field !");
        }
        else {
            data.name = inputData;
            setInputData('')
        }
        setButton(false)
    }


    // Set data to Local Storage
    useEffect(() => {
        localStorage.setItem("myTodo", JSON.stringify(items));
        document.title = `Note Pad (${items.length})`
    }, [items, setItems, UpdateItems])



    // Pressing the  Enter key to perform the functions 
    useOnKey((button ? UpdateItems : AddItems), 'Enter')



    return (
        <>
            <div className="main-div" id='main'>
                <div className="child-div">

                    {/* figure Section */}

                    <figure>
                        <img src="https://msalmanorg.github.io/reactTODO/notePad.png" alt='d' />
                        <figcaption>And Your List Here 🤟</figcaption>
                    </figure>

                    <div className="addItems">
                        <input type="text" autoFocus={true} id='input' placeholder='✍ Add Item' className='form-control'
                            onChange={(e) => setInputData(e.target.value)}
                            value={inputData}
                        />
                        {
                            button ?
                                (<i onClick={() => UpdateItems()} className="fa fa-edit add-btn" ></i>)
                                :
                                (<i onClick={() => AddItems()} className="fa fa-plus add-btn" ></i>)
                        }
                    </div>


                    {/* Show our items  */}

                    <div className="showItems">

                        {
                            items.map((curElem, index) => {
                                return (
                                    <div className="eachItem" key={index} >
                                        <h3>{curElem.name}</h3>
                                        <div className="todo-btn " id='todo-btn'>
                                            <label htmlFor="input">
                                                <i className="far fa-edit add-btn" onClick={() => EditItem(curElem.id)} ></i>
                                            </label>
                                            <i className="far fa-trash-alt add-btn" onClick={() => DeleteItem(curElem.id)} ></i>
                                        </div>
                                    </div>
                                )
                            })
                        }


                        <p className="intro">
                            <span>Made with 💖 by Muhammad Salman | </span>
                            <a href='mailto:salmanasgharorg@gmail.com'>SalmanAsgharOrg@Gmail.com</a>
                        </p>

                    </div>

                    <div className="showItems" onClick={() => setItems([])}>
                        <button className="btn effect04" data-sm-link-text='Remove All'  >
                            <span> CHECK LIST </span>
                        </button>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Todo
