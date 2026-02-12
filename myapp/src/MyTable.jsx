function MyTable() {
    const data = [
        {id: 1, brand: 'Ford', model: 'Mystang'},
        {id: 2, brand: 'VM', model: 'Beetle'},
        {id: 3, brand: 'Tesla', model: 'Model S'},
    ];

    return (
        <>
            <table>
                <tbody>
                    {
                        data.map((item) => 
                            <tr key={item.id}>
                                <td>{item.brand}</td>
                                <td>{item.model}</td>
                            </tr>    
                        )
                    }
                </tbody>
            </table>
        </>
    )
}

export default MyTable;