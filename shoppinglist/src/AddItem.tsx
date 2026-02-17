// 모달 폼을 위해 MUI 컴포넌트 임포트
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { Dialog } from "@mui/material";
import { DialogActions } from "@mui/material";
import { DialogContent } from "@mui/material";
import { DialogTitle } from "@mui/material";

// 사용자가 입력한 항목을 저장하는 사용되는 Item 타입 임포트
import type { Item } from "./App";

import { useState } from "react";



// AddItemProps 타입 정의
type AddItemProps = {
    addItem: (item: Item) => void;
}

function AddItem(props: AddItemProps){
    // Dialog 컴포넌트에는 open이라는 프롭이 있으며 값이 true면 표시되고, false면 숨겨짐
    // 상태, handleOpen, handleClose 함수 추가
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }

    // item 상태
    const [item, setItem] = useState<Item>({
        product: '',
        amount: '',
    })

    // addItem함수를 호출하고 item상태를 전달
    const addItem = () => {
        props.addItem(item);
        // 텍스트 필드를 지우고 모달 대화 상자를 닫음
        setItem({ product: '', amount: ''});
        handleClose();
    }
    return(
        <>
            <Button variant="outlined" onClick={handleOpen}>
                AddItem
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Item</DialogTitle>
                <DialogContent>
                    <TextField value={item.product} margin="dense"
                        onChange={e => setItem({...item, 
                            product: e.target.value
                        })}
                        label="Product" fullWidth
                    />
                    <TextField value={item.amount} margin="dense"
                        onChange={e => setItem({...item,
                            amount: e.target.value
                        })}
                        label="Amount" fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button onClick={addItem}>
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
export default AddItem;