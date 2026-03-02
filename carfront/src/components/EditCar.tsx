import { useState } from "react";
import { Car, CarResponse, CarEntry } from "../type";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import CarDialogContent from "./CarDialogContent";
import { updateCar } from "../api/carapi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@mui/material";
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit'
import Tooltip from "@mui/material/Tooltip";

type FormProps = {
    cardata: CarResponse;
}

function EditCar({ cardata }: FormProps) {
    const queryClient = useQueryClient();
    const { mutate } = useMutation(updateCar, {
        onSuccess: () => {
            queryClient.invalidateQueries(["cars"]);
        },
        onError: (err) => {
            console.error(err);
        }
    });

    const [open, setOpen] = useState(false);
    const [car, setCar] = useState<Car>({
        brand: '',
        model: '',
        color: '',
        registrationNumber: '',
        modelYear: 0,
        price: 0
    });

    const handelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCar({...car, [event.target.name]: event.target.value});
    }

    const handelClickOpen = () => {
        setCar({
            brand: cardata.brand,
            model: cardata.model,
            color: cardata.color,
            registrationNumber: cardata.registrationNumber,
            modelYear: cardata.modelYear,
            price: cardata.price,
        })
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }
    const handleSave = () => {
        const url = cardata._links.self.href;
        const carEntry: CarEntry = {car, url};
        mutate(carEntry);
        setCar({ brand: '', model: '', color: '', registrationNumber: '',
            modelYear: 0, price: 0
        });
        setOpen(false);
    }
    return (
        <>
            {/* <Button size="small" onClick={handelClickOpen}>Edit</Button> */}
            <Tooltip title="Edit car">
                <IconButton 
                    aria-label="edit" 
                    size="small"
                    onClick={handelClickOpen}
                    ><EditIcon fontSize="small"/>
                </IconButton>
            </Tooltip>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit car</DialogTitle>
                <CarDialogContent car={car} handleChange={handelChange}/>
                <DialogActions>
                    {/* <button onClick={handleClose}>Cancel</button>
                    <button onClick={handleSave}>Save</button> */}
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
            
        </>
    )
}
export default EditCar;