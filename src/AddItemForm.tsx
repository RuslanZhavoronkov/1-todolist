import { Button, TextField } from '@mui/material';
import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import AcUnitIcon from '@mui/icons-material/AcUnit';


type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<boolean>(false)

    const addItem = () => {
        if (title.trim() !== "") {
            props.addItem(title);
            setTitle("");
        } else {
           setError(false);
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(true);
        if (e.charCode === 13) {
            addItem();
        }
    }

    return <div
        style={{
            display: 'flex',
            minHeight: '100px',
            alignItems: 'flex-start'
        }}>
        <TextField variant={"outlined"} value={title}
            sx={{ mr: '5px' }}
            onChange={onChangeHandler}
            size={"small"}
            onKeyPress={onKeyPressHandler}
            error={!!error}
        />
        <Button
            size={'small'}
            color={"primary"}
            onClick={addItem}
            endIcon={<AcUnitIcon />}
            variant={'contained'}
            sx={{mt:"3px"}}
        ></Button>

        {error && <div className="error-message">{error}</div>}
    </div>
}
