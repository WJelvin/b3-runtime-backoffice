import React from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';

import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import EditButton from '../../Button/EditButton/EditButton';
import DeleteButton from '../../Button/DeleteButton/DeleteButton';
import Aux from '../../../../hoc/Auxiliary/Auxiliary';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    container: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    containerItem: {
        width: '50%',
    },
}));

function PanelDetail(props) {
    const classes = useStyles();

    const {
        categories, object, type, onEdit, onDelete, onSelect,
    } = props;

    let content = null;
    if (type === 'question') {
        const { id } = object;
        let categoryName = null;
        const matchedCategory = categories.find((cat) => cat.id === object.categoryKey);
        if (matchedCategory == null) {
            categoryName = 'No category found';
        } else {
            categoryName = matchedCategory.name;
        }
        content = (
            <Aux>
                <div className={classes.containerItem}>
                    <p>Text:</p>
                    {' '}
                    <p>{object.text}</p>
                    <p>Category:</p>
                    {' '}
                    <p>{categoryName}</p>
                </div>
                <div className={classes.containerItem}>
                    Options:
                    {' '}
                    {object.options.map((option) => (
                        <p key={option.option}>
                            {option.option}
                            {' '}
                            {option.text}
                        </p>
                    ))}
                    <p>
                        Correct Answer:
                        {object.correctAnswer}
                    </p>
                    {onEdit ? (<EditButton click={() => onEdit(id)} />) : null}
                    {onDelete ? (<DeleteButton click={() => onDelete(id)} />) : null }
                    {onSelect
                        ? (<Button onClick={() => onSelect(id, object.title)}>SELECT</Button>)
                        : null}
                </div>
            </Aux>
        );
    } else if (type === 'competition') {
        const { tracks } = props;
        let matchedTracks = null;
        if (tracks) {
            matchedTracks = object.trackKeys.map((key) => tracks.find((t) => t.id === key));
        }
        content = (
            <Aux>
                <div className={classes.containerItem}>
                    <p>Name:</p>
                    {' '}
                    <p>{object.name}</p>
                    <p>Date:</p>
                    {' '}
                    <p>{object.date}</p>
                    <p>Active:</p>
                    {' '}
                    <p>{object.active.toString()}</p>
                </div>
                <div className={classes.containerItem}>
                    Tracks:
                    {' '}
                    {matchedTracks.length > 0 ? matchedTracks.map((track) => (
                        <p key={track.id}>
                            {track.name}
                        </p>
                    )) : (<p>No tracks</p>) }
                    {onEdit ? (<EditButton click={() => onEdit(object.id)} />) : null }
                </div>
            </Aux>
        );
    } else if (type === 'checkpoint') {
        const { order } = object;
        content = (
            <Aux>
                <div className={classes.containerItem}>
                    <p>Order:</p>
                    {' '}
                    <p>{order}</p>
                    <p>Penalty:</p>
                    {' '}
                    <p>{object.penalty.toString()}</p>
                    {onDelete ? (<DeleteButton click={() => onDelete(order)} />) : null }
                </div>
            </Aux>
        );
    }

    return (
        <ExpansionPanelDetails className={classes.container}>
            {content}
            <Typography />
        </ExpansionPanelDetails>
    );
}

const mapStateToProps = (state) => ({
    categories: state.categories.categories,
    tracks: state.tracks.tracks,
});

export default connect(mapStateToProps)(PanelDetail);
