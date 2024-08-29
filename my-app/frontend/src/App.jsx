import { useState, useEffect } from 'react'
import noteService from './services/notes'
import './App.css'

function App() {
  const [notes, setNotes] = useState([])

  useEffect(() => {

    /*axios
          .get('http://localhost:3001/api/notes')
          .then(response => {
            setNotes(response.data)
            
          })*/
    (async () => {
      const data =  await noteService.getAll()
      setNotes(data)
    })()     
    
  }, [])

  console.log('notes is', notes)

  return (
    <>
    <h1>Notes from the other world</h1>

    {notes.map(note => <div key={note.id}>{note.content}     {note.important.toString().toUpperCase()}</div>)}
    </>
  )
}

export default App
