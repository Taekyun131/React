import { useState } from 'react'
import './App.css'
import axios from 'axios'
// ag-grid이용
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css'
// ICellRederParams 임포트
import type{ ICellRendererParams } from 'ag-grid-community';
// ColDef 타입 임포트
import type{ ColDef } from 'ag-grid-community';


type Repository = {
  id: number;
  full_name: string;
  html_url: string;
};


function App() {
  const [keyword, setKeyword] = useState('');
  const [repodata, setRepodata] = useState<Repository[]>([]);

  // 칼럼 정의
  const [columnDefs] = useState<ColDef[]>([
  {field: 'id', sortable: true, filter: true},
  {field: 'full_name', sortable: true, filter: true},
  {field: 'html_url', sortable: true, filter: true},
  {
    headerName: 'Actions',
    field: 'full_name',
    cellRenderer: (params:ICellRendererParams) => (
      <button 
        onClick={() => alert(params.value)}>
          Press me
        </button>
    )
  }
])

  const handleClick = () => {
    // REST API 호출
    axios.get<{items: Repository[] }> (`https://api.github.com/search/repositories?q=${keyword}`)
    .then(response => setRepodata(response.data.items))
    .catch(err => console.error(err))
  }

  return (
    <>
      <input
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
      />
      <button onClick={handleClick}>Fetch</button>
      {/* {repodata.length === 0 ? (
        <p>No data available</p>
      ):(
        <table>
          <tbody>
            {repodata.map(repo => (
              <tr key={repo.id}>
                <td>{repo.full_name}</td>
                <td>
                  <a href={repo.html_url}>{repo.html_url}</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )} */}


      <div className='ag-theme-material' 
          style={{height: 500, width: 850}}>
        <AgGridReact 
            theme="legacy"
            rowData={repodata}
            columnDefs={columnDefs}
            pagination={true}
            paginationPageSize={8}
        />
      </div>
    </>
  )
}

export default App
