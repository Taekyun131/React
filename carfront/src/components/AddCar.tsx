import { useState } from "react";
import { Dialog } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogContent";
import { Car } from "../type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCar } from "../api/carapi";
import CarDialogContent from "./CarDialogContent";

function AddCar(){
    const [open, setOpen] = useState(false);
    const [car, setCar] = useState<Car>({
        brand: '',
        model: '',
        color: '',
        registrationNumber: '',
        modelYear: 0,
        price: 0,
    })

    // 모달 폼 열기
    const handleClickOpen = () => {
        setOpen(true);
    };

    // 모달 폼 닫기
    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        setCar({...car, [event.target.name]: event.target.value});
    }

    const handleSave = () => {
        mutate(car);
        setCar({ brand: '', model: '', color: '', registrationNumber: '',
            modelYear: 0, price: 0
        })
        handleClose();
    }

    const queryClient = useQueryClient();

    const { mutate } = useMutation(addCar, {
        onSuccess: () => {
            queryClient.invalidateQueries(["cars"]);
        },
        onError: (err) => {
            console.error(err);
        },
    });

    return (
        <>
            <button onClick={handleClickOpen}>New Car</button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Car</DialogTitle>
                {/* <DialogContent>
                    <input placeholder="Brand" name="brand" 
                        value={car.brand} onChange={handleChange}/>
                    <input placeholder="Model" name="model"
                        value={car.model} onChange={handleChange} />
                    <input placeholder="Color" name="color"
                        value={car.color} onChange={handleChange} />
                    <input placeholder="Year" name="modelYear"
                        value={car.modelYear} onChange={handleChange} />
                    <input placeholder="Reg.nr" name="registrationNumber"
                        value={car.registrationNumber} onChange={handleChange} />
                    <input placeholder="Price" name="price"
                        value={car.price} onChange={handleChange} />
                </DialogContent> */}
                <CarDialogContent car={car} handleChange={handleChange} />
                <DialogActions>
                    <button onClick={handleClose}>Cancel</button>
                    <button onClick={handleSave}>Save</button>
                </DialogActions>
            </Dialog>
        </>
    )
}
export default AddCar;