import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { CarResponse } from "../type";
// import axios from "axios";
import { getCars, deleteCar } from "../api/carapi";
import { DataGrid, GridColDef, GridCellParams } from '@mui/x-data-grid'
import  Snackbar  from "@mui/material/Snackbar";
import { useState } from "react";
import AddCar from "./AddCar";
import EditCar from "./EditCar";
import { Stack } from "@mui/material";
import Button from "@mui/material/Button";

type CarlistProps = {
    logOut?: () => void;
}

function Carlist({ logOut }: CarlistProps){
    // const getCars = async (): Promise<CarResponse[]> => {
    //     const response = await axios.get("http://localhost:8081/api/cars");
    //     return response.data._embedded.cars;
    // }

    // 토스트 메시지 표시를 위한 useState
    const [open, setOpen] = useState(false);

    const queryClient = useQueryClient();

    const { data, error, isSuccess } = useQuery({
        queryKey: ["cars"],
        queryFn: getCars,
    })
    
    // deleteCar 함수를 호출하는 useMutation 훅 추가
    const { mutate } = useMutation(deleteCar, {
        onSuccess: () => {
            // 자동차 삭제 이후 실행되는 로직

            // 자동차 삭제 이후 토스트 메시지 출력
            setOpen(true);
            // 자동차 삭제에 성공한 후 데이터를 다시 가져오기 위한 메서드
            queryClient.invalidateQueries({ queryKey: ['cars']});
        },
        onError: (err) => {
            console.error(err);
        },
    })

    
    // 컬럼 정의
    const columns: GridColDef[] = [
        {field: "brand", headerName: "Brand", width: 200},
        {field: "model", headerName: "Model", width: 200},
        {field: "color", headerName: "Color", width: 200},
        {field: "registrationNumber", headerName: "Reg.nr.", width:150},
        {field: "modelYear", headerName: "ModelYear", width: 150},
        {field: "price", headerName: "Price", width: 150},
        // 수정버튼 추가
        {
            field: 'edit',
            headerName: '',
            width: 90,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params: GridCellParams) => 
                <EditCar cardata={params.row} />
        },
        // 삭제버튼 추가
        {
            field: "delete",
            headerName: "",
            width: 90,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params: GridCellParams) => (
                <button
                // onClick={() => alert(params.row._links.car.href)}
                    // 삭제버튼에서 mutate를 호출
                    onClick={() => {
                        if (window.confirm(
                            `Are you sure want to delete ${params.row.brand} ${params.row.model} ?`)) {
                                mutate(params.row._links.car.href)
                        }
                    }
                }
                    >Delete
                </button>
            ),
        }
    ]
    

    if(!isSuccess) {
        return <span>Loading...</span>
    } else if(error) {
        return <span>Error when fetching cars...</span>
    } else {
        return (
            // <table>
            //     <tbody>
            //         {
            //             data.map((car: CarResponse) => 
            //                 <tr key={car._links.self.href}>
            //                     <td>{car.brand}</td>
            //                     <td>{car.model}</td>
            //                     <td>{car.color}</td>
            //                     <td>{car.registrationNumber}</td>
            //                     <td>{car.modelYear}</td>
            //                     <td>{car.price}</td>
            //                 </tr>
            //             )
            //         }
            //     </tbody>
            // </table>
            <>
                {/* <AddCar /> */}
                <Stack 
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <AddCar />
                    <Button onClick={logOut}>Log out</Button>
                </Stack>
                <DataGrid
                    rows={data}
                    columns={columns}
                    getRowId={row => row._links.self.href}
                    showToolbar
                />
                <Snackbar
                    open={open}
                    autoHideDuration={2000}
                    onClose={() => setOpen(false)}
                    message="Car deleted"
                />
            </>
        )
    }
}
export default Carlist;