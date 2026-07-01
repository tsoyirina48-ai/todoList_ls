import { useState, useMemo, useRef, useEffect } from 'react';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Todo from './Todo';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function App() {
    const [todo, setTodo] = useState(() => {
      const todoStrFromStorage = window.localStorage.getItem('todo');
      return todoStrFromStorage ? JSON.parse(todoStrFromStorage) : [];
   
});
console.log(todo);
  const inputRef = useRef(null);

  const [date, setDate] = useState(null);

  useEffect(() =>{
    const todoString = JSON.stringify(todo);
    window.localStorage.setItem('todo', todoString);
  }, [todo]);

  const nextId = useMemo(() => {
    const maxId = todo.reduce((acc, current) => { 
      return Math.max(acc, current.id);
    }, 0);
    return maxId + 1;
  }, [todo]);

  const addTodo = (_todo, _date) => {
     setTodo(prev=> [...prev, { id: nextId, title: _todo, 
      due: _date ? _date.toLocaleDateString() : '', checked: false }]);
   
  };
  const checkUpdate = (_id, _value) => {
   
    setTodo(prev => prev.map(p => p.id === _id ? {...p, checked: _value}:p),);
  };
  const deleteTodo = (_id) => {
    setTodo(prev => prev.filter(p => p.id !== _id));
  };

  const updateTodo = (_id, _title) => {
    setTodo(prev => 
      prev.map(p => 
        p.id === _id ? 
        {...p, title: _title} 
             : p
            
      )
    );   
  };



  return (
    <>
    <div className="container">
      <h1>My todo App</h1>
      <Form onSubmit={e => {
        e.preventDefault();

        //if (!e.target.todo.value.trim()) return;
        addTodo(e.target.todo.value, date);
        setDate(null);
        inputRef.current.value = '';
        // e.target.reset(); // form 초기화
      }}>
      <Form.Group className="mb-3" controlId="todoInput">

      <Form.Label>할일 입력</Form.Label>
      <Form.Control 
      ref={inputRef}
      type="text" 
      name="todo" 
      placeholder="할일을 입력하세요" />

      </Form.Group>
      <div>
        <label htmlFor="datePicker">마감일:</label>
        <DatePicker
        dateFormat="yyyy/MM/dd"
        selected={date}
        onChange={date => {
          setDate(date);
        }}
        name="dueDate"
        id="dueDate"
        />
      </div>
      

      <Button type="submit" variant="primary">입력</Button>
       
  </Form>
  <hr />
  {todo.map((item, idx) => (
      <Todo key={idx}
      data={item} 
      checkUpdate={checkUpdate} 
      deleteTodo={deleteTodo} 
      updateTodo={updateTodo} />
    ))}
    </div>
    </>
  );
}

export default App;
