import React,{useContext} from 'react'
import noteContext from '../context/notes/noteContext';

const Noteitem = (props) => {
    const { note,updateNote } = props;
    const context=useContext(noteContext);
    const {deleteNote}=context;
    return (

        <div className="card col-md-3 m-3">

            <div className="card-body">
                <div className="d-flex align-items-center">
                    <h5 className="card-title">{note.title}</h5><i className="fa-sharp fa-solid fa-trash mx-2" onClick={()=>{
                        deleteNote(note._id);
                        props.showAlert("Deleted successfully","success")
                        }}></i>

                    <i className="fa-sharp fa-solid fa-pen-to-square" onClick={()=>{updateNote(note)}}></i>
                </div>
                <p className="card-text">{note.description}</p>

            </div>
        </div>
    )
}

export default Noteitem
