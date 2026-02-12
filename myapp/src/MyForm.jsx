import { useState } from "react";

function MyForm(){
    // const [text, setText] = useState('');
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
    });

    // 폼이 제출될 때 호출됨
    const handlerSubmit = (event) => {
        event.preventDefault(); // 기본동작을 방지
        // alert(`You typed: ${text}`);
        alert(`Hello ${user.firstName} ${user.lastName}`);
    }

    // 입력 요소의 내용이 변경되면 값을 상태에 저장
    const handlerChange = (event) => {
        // setText(event.target.value);
        setUser({...user, [event.target.name]: 
            event.target.value
        });
    }
    return (
        <form onSubmit={handlerSubmit}>
            <label>First name</label>
            <input 
                type="text" 
                onChange={handlerChange} 
                // value={text}
                name="firstName"
                value={user.firstName}
            />
            <label>Last name</label>
            <input 
                type="text"
                name="lastName"
                onChange={handlerChange}
                value={user.lastName}
            />
            <label>Email</label>
            <input
                type="email"
                name="email"
                onChange={handlerChange}
                value={user.email}
            />
            <input type="submit" value="Submit" />
        </form>
    )
}
export default MyForm;