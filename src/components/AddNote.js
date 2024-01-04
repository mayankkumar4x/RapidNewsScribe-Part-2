import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'

const AddNote = (props) => {
  const context = useContext(noteContext);
  const {addNote} = context;
  const [note,setNote]=useState({title:"",description:"",tag:""});
  const handleClick=(e)=>{
    e.preventDefault();
    addNote(note.title,note.description,note.tag);
    setNote({title:"",description:"",tag:""});
    props.showAlert("Note is created successfully","success")
    console.log(note);
  }
  const onChange=(e)=>{
    setNote({...note,[e.target.name]:e.target.value})
  }
  return (
    <div className='container'>
            <h2>Add a Note</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" placeholder="Enter title" value={note.title} onChange={onChange} minLength={5} required/>
                   
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input type="text" className="form-control" id="description" name="description" placeholder="Description" value={note.description} onChange={onChange} minLength={5} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="tag">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" placeholder="Tag" value={note.tag} onChange={onChange} minLength={5} required/>
                </div> 
                <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
            </form>      
    </div>
  )
}

export default AddNote
