import { useState } from "react"

export const useVisualMode = (initialMode) => {
  const [mode, setMode] = useState(initialMode)
  const [history, setHistory] = useState([initialMode]);


  const transition = (newMode, replace=false) => {    
    if(replace){
      const newHistory = [...history]
      newHistory.pop()
      setHistory(newHistory)
    }
    
    setMode(newMode)
    setHistory(
      (prev) => {
        return [...prev, newMode]
      }
      )
    } 
      
  const back = () => {
    const newHistory = [...history]
    if(newHistory.length >= 2){
      newHistory.pop()
    }
    setHistory(newHistory)
    setMode(newHistory[newHistory.length-1])
  }


  return {mode, transition, back}
}