

import React, { useEffect, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";


function Todolist() {
    
    
    //Veriables
    const user = "sebaksk";
    const [valorInput, setValorInput] = useState("");
    const [lista, setLista] = useState([]);
    

//crear user
    const crearUsuario = async()=>{
        try{
            const response = await fetch("https://playground.4geeks.com/todo/users/"+user,{
                method: "POST",
                headers: {"Content-Type": "application/json"}
        });
        if(!response.ok){
            throw new Error("Error:",response.statusText)
        }
    }
        catch(error){
            console.log("Error",error);
        }
        Listatareas();
    };



    //sacar listado de tareas
    const Listatareas = async()=> {
        try{
            const response = await fetch('https://playground.4geeks.com/todo/users/'+user,{method:"GET"});
            if(!response.ok){
                throw new Error("Error:",response.statusText)
            }
            const Listado = [];
            const data = await response.json();
             //console.log(data);
             data.todos.map((value,index)=>{
                Listado.push([value.label,value.id,value.is_done]);
            })
            console.log(Listado);
            setLista(Listado);
        }
        catch (error){
            console.log(error);
        }
    };
    
    useEffect(()=>{
        crearUsuario();
        Listatareas();
    },[]);
    
    



    //Agregar tarea nueva

    const handleOnchange = (e) => {
        setValorInput(e.target.value);
    };
    const crearTarea = async(tarea)=>{
        try{
            const response = await fetch("https://playground.4geeks.com/todo/todos/"+user,{
                method: "POST",
                body: JSON.stringify({
                    "label": tarea,
                    "is_done": false,
                    "id": 20
                  }),
                headers: {"Content-Type": "application/json"}
        });
        if(!response.ok){
            throw new Error("Error:",response.statusText)
        }
    }
        catch(error){
            console.log("Error",error);
        }
    };


//apretar enter
    const handleOnKeyDown = (e) => {
        Listatareas();
        if (e.key == 'Enter') {
            let nuevatarea = valorInput;  
            crearTarea(nuevatarea);
            setValorInput("");
        }
    };

    //boton borrar tarea
    // const deleteData = async (tareaurl) => {
    //     const response = await fetch(tareaurl, {
    //         method: 'PUT',
    //         body:JSON.stringify({
    //             "label": "string",
    //             "is_done": true
    //           }),
    //           headers: {
    //             'Content-Type': 'application/json'
    //          }
    //     });
    //     if (response.ok) {
    //         const data = await response.json();
    //         return data;
    //     } else {
    //         console.log('error: ', response.status, response.statusText);
    //         return {error: {status: response.status, statusText: response.statusText}};
    //     };
    // };
    const deleteData = async (id) => {
            try {
                const response = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
                    method: "DELETE",
                });
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
                // Si la eliminación fue exitosa, actualiza la lista
                const updatedLista = lista.filter((item) => item[1] !== id);
                setLista(updatedLista);
            } catch (error) {
                console.log("Error eliminando la tarea:", error);
            }
    };


//boton eliminar

const deleteTask = (taskId) => {
    deleteData(taskId);
};


// Boton eliminar todo
    const deleteAll = () => {
        const deleted = async (taskId) => {
            let eliminar = 'https://playground.4geeks.com/todo/todos/'+taskId;
            const response = await fetch(eliminar, {
                method: 'DELETE',
            });
            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                console.log('error: ', response.status, response.statusText);
                /* Realiza el tratamiento del error que devolvió el request HTTP */
                return {error: {status: response.status, statusText: response.statusText}};
            };
        };

        lista.map((value, index)=>{
        deleted(value[1]);
        Listatareas();
    });
};


//conteo de items en la lista
    let cantidadpendientes = 0;
    lista.map((value,index)=>{
        if(value[2]===false){
            cantidadpendientes=cantidadpendientes+1;
        }
        return cantidadpendientes;
    });



     //retorno html 
    return (

        <div className='container-fluid text-center pt-5'>
            <div className="row d-flex justify-content-center">
                <div className="col-5">
                    <h1 className="display-1 text-body-tertiary text-light-emphasis mb-4">Todo's</h1>
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
                                            <p className='fs-4 mb-0 texto'>{value[0]}</p>
                                        </div>
                                        <div className='col-1 mt-2 me-sm-1 me-md-0 text-danger text-center close'>
                                        <button onClick={() => deleteTask(value[1])} type="button" className="btn-close close" aria-label="Close"></button>
                                        </div>
                                    </div>
                                </li>
                            })}
                            <div className='footer list-group-item text-body-tertiary'>
                            <p className='text-body-tertiary text-start'>{cantidadpendientes} items left</p>
                            <button onClick={() => { deleteAll();}} type="button" className='btn btn-outline-danger' aria-label="Close">Eliminar Todo</button>
                            </div>
                        </ul>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Todolist;