import { useState } from "react";
import { useFirebaseApp } from 'reactfire';
import { } from "firebase/storage";
import "../Styles/styles.css";

export function CreatePlayer(props) {

    //Player name;0 0 0 0 0;0 0 0 0 0;0 0 0 0 0;0 0 0 0 0;0 0 0 0 0;

    const [state, setState] = useState({
        form: '',
        selectedFile: null
    })

    const firebase = useFirebaseApp();

    const sendData = (player) => {
        props.parentCallback(player);
    }

    const onDataChange = (value) => {
        setState({ ...state, form: value });
    }

    const onImageChange = (target) => {
        setState({ ...state, selectedFile: target.files[0] });
    }

    const onClick = async () => {
        if (state.form !== '' && state.selectedFile !== null) {
            let url = await sendFile();
            let rawString = state.form;
            let arr = rawString.split(';');
            let points = 0;
            for (let i = 1; i < arr.length - 1; i++) {
                points += calculateScore(arr[i]);
            }
            if (parseInt(arr[5].split(' ')[4]) === 1) points++;
            sendData({
                imgURL: url,
                name: arr[0],
                score: points
            });
        }
    }

    const sendFile = async () => {
        const storageRef = firebase.storage().ref();
        const fileRef = storageRef.child(state.selectedFile.name);
        await fileRef.put(state.selectedFile);
        return await fileRef.getDownloadURL();
    }

    const calculateScore = (spot) => {
        let points = 0;
        let shots = spot.split(' ');
        shots.forEach(score => {
            points += parseInt(score);
        });
        return points;
    }

    return (
        <>
            <h3>Agregar jugadores</h3>
            <input
                type="text"
                className="form-control mb-2"
                placeholder="Player name;0 0 0 0 0;0 0 0 0 0;0 0 0 0 0;0 0 0 0 0;0 0 0 0 0;"
                name="data"
                value={state.form}
                onChange={({ target }) => onDataChange(target.value)} />

            <input type="file" accept="image/*" onChange={({ target }) => onImageChange(target)} />
            <br/>
            <button className="btn btn-primary" onClick={onClick}>Crear jugador</button>
        </>
    )

}
