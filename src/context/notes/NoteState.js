import { useState } from "react";
import NoteContext from "./noteContext";
import {API_URL} from '../../api'
const NoteState=(props)=>{
    const notesInitial=[]
      const [notes,setNotes]=useState(notesInitial);
      //Get all Note
      const getNote=async()=>{
        //API CALL
        const response=await fetch(`${API_URL}/api/note/fetchallnotes`,{
          method:'GET',
          headers:{
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
          }
        });
        const json=await response.json()
        // console.log(json);
        setNotes(json)
      }
      //Add a Note
      const addNote=async (title,description,newsUrl,tag)=>{
        //API CALL
        console.log(newsUrl);
        const response=await fetch(API_URL+"/api/note/addnote",{
          method:'POST',
          headers:{
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
          },
          body:JSON.stringify({title,description,newsUrl,tag})
        });
        const note=await response.json();
        setNotes(notes.concat(note))
      }
      //Delete a Note
      const deleteNote=async(id)=>{
        //API CALL
        const response=await fetch(`${API_URL}/api/note/deletenote/${id}`,{
          method:'DELETE',
          headers:{
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
          },
        });
        const json=response.json();
        const newNotes=notes.filter((note)=>{return note._id!=id})
        setNotes(newNotes);
      }


      //Edit a Note
      const editNote=async(id, title, description, newsUrl,tag)=>{
        //API CALL
        const response=await fetch(`${API_URL}/api/note/updatenote/${id}`,{
          method:'PUT',
          headers:{
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
          },
          body:JSON.stringify({title,description,newsUrl,tag})
        });
        const json=response.json();
        let newNotes=JSON.parse(JSON.stringify(notes))
        //Logic to edit in client
        for(let index=0;index<notes.length;index++)
        {
          const element=newNotes[index];
          if(element._id===id)
          {
            newNotes[index].title=title;
            newNotes[index].description=description;
            newNotes[index].newsUrl=newsUrl;
            newNotes[index].tag=tag;
            break;
          }
        }
        setNotes(newNotes);
      }
    return (<NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getNote}}>{props.children}</NoteContext.Provider>)
}
export default NoteState;