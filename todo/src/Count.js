     import React, { useState, useEffect } from 'react';

     function Count() {
       const [count, setCount] = useState(0);

       useEffect(() => {
         const storedCount = localStorage.getItem('count');
         if (storedCount) {
           setCount(parseInt(storedCount, 10));
         }
       }, []);

       useEffect(() => {
         localStorage.setItem('count', count);
       }, [count]);

       const increment = () => setCount(count + 1);
       return (
         <div>
           <p>Count: {count}</p>
           <button onClick={increment}>Increment</button>
         </div>
       );
     }
    export default Count;