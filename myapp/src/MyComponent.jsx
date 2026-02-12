function MyComponent(){
    //  버튼을 누르면 호출
    const handleClick = () => {
        alert("Button pressed");
    }

    return(
        <>
            <button onClick={handleClick}>Press Me</button>
        </>
    )
}
export default MyComponent