

import React, { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap"

function Todolist() {
    // Estados del componente
    const [valorInput, setValorInput] = useState("");
    const [lista, setLista] = useState([]);


    const handleOnchange = (e) => {
        setValorInput(e.target.value);
    };

    const handleOnKeyDown = (e) => {
        if (e.key == 'Enter') {
            setLista([...lista, valorInput]);
            setValorInput("");
        }
    };
    const deleteTask = (taskId) => {
        setLista(lista.toSpliced(taskId, 1));
    };
    return (

        <div className='container-fluid text-center pt-5'>
            <div className="row d-flex justify-content-center">
                <div className="col-5">
                    <h1 className="display-1 text-body-tertiary mb-4">Todo's</h1>
                    <div>
                        <input
                            type="text"
                            onChange={(e) => { handleOnchange(e) }}
                            onKeyDown={(e) => { handleOnKeyDown(e) }}
                            value={valorInput}
                            placeholder='What needs to be done?' className='form-control' aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" />
                    </div>
                    <div>
                        <ul className='list-group'>
                            {lista.map((value, index) => {
                                return <li className="list-group-item tarea container" key={index}>
                                    <div className='row text-center'>
                                        <div className='col-11'>
                                            <p className='fs-4 mb-0 texto'>{value}</p>
                                        </div>
                                        <div className='col-1 mt-2 me-sm-1 me-md-0 text-danger text-center close'>
                                            <button onClick={() => { deleteTask(index); }} type="button" className="btn-close close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                    </div>
                                </li>
                            })}
                            <p className='footer list-group-item text-body-tertiary text-start'>{lista.length} items left</p>
                        </ul>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Todolist;