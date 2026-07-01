import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function Todo({ data, checkUpdate, deleteTodo, updateTodo }) {
    const [isChecked, setIsChecked] = useState(data.checked);
    const [mode, setMode] = useState('read');
    const [title, setTitle] = useState(data.title);

    const handleChecked = () => {
        const value = !isChecked;
        setIsChecked(prev => !prev);
        checkUpdate(data.id, value);
    }

    const deleteItem= () => {
        if (confirm('정말로 삭제하시겠습니까?')) {
            deleteTodo(data.id);
        } else {
            alert('삭제가 취소되었습니다.');
        }
    };
    const changeToEdit = () => {
        setMode('edit');
    };
    const changeToRead = () => {
        setMode('read');
    };
    const handleChange = (e) => {
        setTitle(e.target.value);
    };
    return (
    <>
    {mode === 'read' && (
    <div className="d-flex justify-content-between align-items-center mb-2">
      <Form.Check
        type="checkbox"
        id={`todo-${data.id}`}
        label={data.title}
        checked={data.checked}
        onChange={handleChecked} 
      />
      <p>만기일:{data.due}</p>
        <div className="d-flex gap-2">
            <Button variant="secondary" size="sm" onClick={changeToEdit}>
                수정
            </Button>

            <Button variant="danger" size="sm" onClick={() => {
                deleteItem();
            }}>
          삭제       
           </Button>
        </div>
     </div>
    )}
    {mode === 'edit' && (
     <Form onSubmit={(e) => {
        e.preventDefault();
       updateTodo(data.id, title);
       
         setMode('read');
      }}>
      <Form.Group className="mb-3" controlId="todoInput">
      <Form.Control 
      
      type="text" 
      name="todo" 
      value={title}
      onChange={handleChange} />
      </Form.Group>
    <div className="d-flex gap-2">

      <Button type="submit" variant="primary" size="sm">입력</Button>
      <Button type ="button" variant="secondary" size="sm" onClick={changeToRead}>취소</Button>
    </div>
  </Form>
    )}
    </>
  );
}
