import {useState , useEffect} from'react';
import {Plus , CircleCheck , X , Circle} from 'lucide-react';
import './Todo.css';
function Todo() 
{
    const [input , setInput] = useState("");
    const [tasks , setTasks] = useState(() =>
    {
      const savedTasks = localStorage.getItem("todotasks");
      return savedTasks ? JSON.parse(savedTasks) : []
    });
 
    useEffect(() => {
    const savedTasks = localStorage.getItem("todotasks");
    if (savedTasks) {
      try {
        setTasks(JSON.parse(savedTasks));
      } catch (error) {
        console.error("Error parsing tasks from localStorage:", error);
      }
    }
  }, []); 
   useEffect(() =>
    {
        localStorage.setItem("todotasks" , JSON.stringify(tasks));
    },[tasks]);

    const addTask = () =>
    {
        const newTask = {
            text : input ,
            completed : false
        }
        setTasks([...tasks , newTask]);
        setInput("");
    }
   
    const toggleTask = (i) =>
    {
        setTasks(tasks.map((task , index)=> index === i ? {...task , completed : !task.completed} : task));
    }

    const deleteTask = (i) =>
    {
        setTasks(tasks.filter((task , index) => index !== i));
    }

   return(
    <>
     <div className='to-do-container'>
        <div className='input'>
            <input
             type='text'
             value ={input}
             onChange={(e)=>setInput(e.target.value)}
             placeholder='Add task'
             className='inputfield'
            />
            <button onClick={addTask} className='addbtn'>
             <Plus size={20} color='white'/>
            </button>
        </div>
          <div className='tasks'>
            {
                tasks.length === 0 ? (<p className='notask'>No tasks yet ! Add one above</p>) : (tasks.map((task , i)=>
                (
                    <div key={i} style={{ display: "flex",
                                         alignItems: "center",
                                        justifyContent: "space-between",
                                         width: "320px", 
                                         marginLeft: "53px",
                                       marginTop: "20px"
                    }}>
                     <button onClick={() =>toggleTask(i)} style={{border:"none",backgroundColor:"#FAFAFA"}}>
                        {task.completed ? <CircleCheck size={20}/> : <Circle size={20}/>}
                     </button>
                     <span style={{textDecoration : task.completed ? "line-through" : "none"}}>{task.text}</span>
                      <button onClick={()=>deleteTask(i)} style={{border:"none",backgroundColor:"#FAFAFA"}}><X/></button>
                    </div>
                )))            
                }
          </div>
    <div>
        {tasks.length > 0 && (<p className='rem'>{tasks.filter(task => !task.completed).length} of {tasks.length} remaining</p>)}
    </div>
     </div>
    </>
   )
}
export default Todo;