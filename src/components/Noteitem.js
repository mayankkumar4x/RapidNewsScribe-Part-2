import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';

const Noteitem = (props) => {
    const { note, updateNote } = props;
    const context = useContext(noteContext);
    const { deleteNote } = context;
    return (

        <div className="card col-md-5 m-3">

            <div className="card-body p-0">
                <div className="d-flex align-items-center justify-content-between bg-light text-dark p-2">
                    <h5 className="card-title">{note.title}</h5>
                    <span>
                        <i className="fa-sharp fa-solid fa-pen-to-square text-success mx-3" onClick={() => { updateNote(note) }}></i>
                        <i className="fa-sharp fa-solid fa-trash  text-danger" onClick={() => {
                            deleteNote(note._id);
                            props.showAlert("Deleted successfully", "success")
                        }}></i>
                    </span>

                </div>

                <p className="card-text p-2">{note.description}</p>
                <div className='p-2'>
                    <a className='btn btn-success p-12' href={note.newsUrl} target='_blank'>News Link</a>
                </div>
                {/* <p className="card-text">{note.newsUrl}</p> */}
            </div>
        </div>
    )
}

export default Noteitem
