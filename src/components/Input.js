import React, { useState ,useEffect} from "react";

function Input() {
  const [data, setData] = useState("");
  const [task, setTask] = useState(JSON.parse(localStorage.getItem("0")));

  const handleInputChange = (e) => {
    setData(e.target.value);
  };

  const handleedit=(e)=>{
    setData(task[e]);
    task.splice(e,1)
    setTask(task)
    localStorage.clear();
    localStorage.setItem("0",JSON.stringify(task));
  }

  const handleclick = (e) => {
    setTask([ ...task,data]);
    localStorage.clear();
    localStorage.setItem("0",JSON.stringify(task));
    setData("");
  };

  useEffect(() => {
    localStorage.setItem("0",JSON.stringify(task));
  }, [task]);
  const handledelete = (id)=> {
    const delItem = task.filter((tmp, index) => {
      return index !== id;
    });
    setTask(delItem);
  };

  return (
    <>
      <div className="note">
        <input
          type="text"
          name="heading"
          placeholder="Note"
          onChange={handleInputChange}
          value={data}
          />
        <button className="add" onClick={handleclick}>Add</button>
      </div>
      <div className="tasklist">
      {task.map((tmp,index)=>(
        <div className="tasklist-note" key={index}>
            <p>{tmp}</p>
            <div className="operation">
              <button className="edit" onClick={()=>handleedit(index)}>edit</button>
              <button className="delete" onClick={()=>handledelete(index)}>Delete</button>
            </div>
        </div>
        ))}
      </div>
    </>
  );
}
export default Input;