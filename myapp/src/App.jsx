// import { useEffect, useState, useRef } from 'react'
import './App.css'
// import useTitle from './useTitle';
import MyList from './MyList.jsx';
import MyTable from './MyTable.jsx';
import MyComponent from './MyComponent.jsx';
import MyForm from './MyForm.jsx';


function App() {
  // const [count, setCount] = useState(0);
  // useTitle(`You clicked ${count} times`);

  // const inputRef = useRef(null);
  // useEffect(() => {
  //   console.log('Hello from useEffect')
  // })

  // count 상태 값이 변경될 때 useEffect 콜백함수 호출
  // useEffect(() => {
  //   console.log('Counter value is now '+count);
  // }, [count]);

  // 두번째 인수로 빈 배열을 전달하면 첫번째 렌더링 후에만 콜백함수 호출
  // useEffect(() => {
  //   console.log('Hello from useEffect');
  // }, []);


  // 정리함수 호출
  // useEffect(() => {
  //   console.log('Hello from useEffect');
  //   return () => {
  //     console.log('Clean up function');
  //   }
  // }, [count]);


  return (
    <>
      {/* <p>Counter = {count}</p>
      <button onClick={() => setCount(count+1)}>Increment</button> */}

      {/* <input ref={inputRef} />
      <button onClick={() => inputRef.current.focus()}>
        Focus input
      </button> */}

      {/* <MyList/>
      <MyTable/>
      <MyComponent/> */}
      <MyForm />
    </>
  )
}

export default App
