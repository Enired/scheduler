import { useState } from "react"

export const useVisualMode = (initialMode) => {
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);


  const transition = (newMode, replace=false) => {    
    setMode(newMode);
    if(replace){
      const newHistory = [...history]
      newHistory.pop();
      setHistory([...newHistory, newMode]);
    } else{
      setHistory([...history, newMode]);
    }
    
    } 
      
  const back = () => {
  
    const newHistory = [...history]
    if(newHistory.length >= 2){
      newHistory.pop();
    }
    setHistory(newHistory);
    setMode(newHistory[newHistory.length-1]);
  }


  return {mode, transition, back};
}