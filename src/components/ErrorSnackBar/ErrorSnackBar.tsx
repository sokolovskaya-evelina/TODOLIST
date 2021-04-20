import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../App/store";
import {setAppError} from "../../App/app-reducer";

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}

export function ErrorSnackbar() {
    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        dispatch(setAppError(null))
    }

    const error = useSelector<AppRootStateType, string | null>(state => state.app.error)
    const dispatch = useDispatch()
    const isOpen = error !== null

    return (
        <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
                {error}
            </Alert>
        </Snackbar>
    )
}
