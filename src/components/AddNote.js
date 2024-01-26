import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import {useSearchParams} from 'react-router-dom'
const AddNote = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const myParam = searchParams.get('url');
  const context = useContext(noteContext);
  const {addNote} = context;
  const [note,setNote]=useState({title:"",description:"",newsUrl:myParam,tag:""});
  const handleClick=(e)=>{
    e.preventDefault();
    addNote(note.title,note.description,note.newsUrl,note.tag);
    setNote({title:"",description:"",newsUrl:"",tag:""});
    props.showAlert("Note is created successfully","success")
    console.log(note);
  }
  const onChange=(e)=>{
    setNote({...note,[e.target.name]:e.target.value})
  }
  return (
    <div className='container col-3 bg-dark text-light p-3'>
            <h2 className='text-center mb-4'>Add a Note</h2>
            <form onSubmit={handleClick}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" placeholder="Enter title" value={note.title} onChange={onChange} minLength={5}  required={true}/>
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input type="text" className="form-control" id="description" name="description" placeholder="Description" value={note.description} onChange={onChange} minLength={5} required={true}/>
                </div>
                <div className="form-group">
                    <label htmlFor="newUrl">News URL</label>
                    <input type="text" className="form-control" id="newsURL" name="newsUrl" placeholder="No URL" value={myParam} disabled/>
                </div> 
                <div className="form-group">
                    <label htmlFor="tag">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" placeholder="Tag" value={note.tag} onChange={onChange} minLength={5}  required={true}/>
                </div> 
                <input type="submit" className="btn btn-primary w-100 mt-4" value="Add Note"/>
            </form>      
    </div>
  )
}

export default AddNote
