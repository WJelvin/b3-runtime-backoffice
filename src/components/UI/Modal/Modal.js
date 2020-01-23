import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '8px solid #006A8E',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(3, 5, 4),
    },
}));

export default function TransitionModal(props) {
    const classes = useStyles();


    return (
        <div>
            <Modal
                className={classes.modal}
                open={props.open}
                onClose={props.handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={props.open}>
                    <div className={classes.paper}>
                        {props.children}
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}