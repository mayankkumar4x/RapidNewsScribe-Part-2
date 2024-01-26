import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/notes/noteContext'
import Noteitem from './Noteitem'
import AddNote from './AddNote';
export default function Notes(props) {
  const context = useContext(noteContext);
  const { notes, getNote, editNote } = context;
  let history = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('token'))
      getNote()
    else
      history('/login');
  }, [])
  const ref = useRef(null)
  const refClose = useRef(null)
  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "default" });
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, newsUrl: currentNote.newsUrl, etag: currentNote.tag });
  }
  const handleClick = (e) => {
    editNote(note.id, note.etitle, note.edescription, note.newsUrl, note.etag)
    props.showAlert("Updated successfully", "success");
    refClose.current.click();

    // addNote(note.title,note.description,note.tag);
  }
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }
  return (
    <>
      {/* Creating a new */}
      <div className='w-100 d-flex flex-row-reverse'>      
        <AddNote showAlert={props.showAlert} />

      {/* for updating note */}
      {/* <!-- Button trigger modal --> */}
      <button type="button" className="d-none btn btn-primary" data-bs-toggle="modal" ref={ref} data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      {/* <!-- Modal --> */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="etitle">Title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" placeholder="Enter title" onChange={onChange} minLength={5} required />

                </div>
                <div className="form-group">
                  <label htmlFor="edescription">Description</label>
                  <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} valueplaceholder="Description" onChange={onChange} minLength={5} required />
                </div>
                <div className="form-group">
                  <label htmlFor="enewsUrl">NewsUrl</label>
                  <input type="text" className="form-control" id="enewsUrl" name="enewsUrl" value={note.enewsUrl} valueplaceholder="newsUrl" onChange={onChange} disabled />
                </div>
                <div className="form-group">
                  <label htmlFor="etag">Tag</label>
                  <input type="text" className="form-control" id="etag" name="etag" value={note.etag} placeholder="Tag" onChange={onChange} minLength={5} required />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleClick}>Save changes</button>
            </div>
          </div>
        </div>
      </div>



      {/* for displaying all the note */}
      <div className="container">
        <h2>Your Notes</h2>
        <div className="d-flex flex-wrap">
          {/* {notes.length === 0 && 'No notes to display'} */}

          {notes.length ? notes.map((note) => {
          return <Noteitem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />
        }) : <p>No notes to display</p>}
        </div>

        {/* {notes.map((note) => {
          return <Noteitem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />
        })} */}
      </div>
      </div>
    </>
  )
}
