import { useState } from "react";
import { PlayerList } from '../Components/PlayerList';
import { useFirebaseApp } from 'reactfire';
import { } from "firebase/auth";

export function Login() {

    //usuario: jpsalamanca99@gmail.com
    //contraseña: 123456

    const [state, setState] = useState({
        user: 'jpsalamanca99@gmail.com',
        password: '123456',
        loged: false
    })

    const firebase = useFirebaseApp();

    const onChange = (value, field) => {
        setState({ ...state, [field]: value });
    }

    const onClick = async () => {
        await firebase.auth().signInWithEmailAndPassword(state.user, state.password);
        if (firebase.auth().currentUser) {
            setState({ ...state, loged: true });
        }
    }

    return state.loged ?
        (<>
            <p>Usuario: {firebase.auth().currentUser.email}</p>
            <hr />
            <PlayerList />
        </>) :
        (<>
            <hr />
            <input
                type="text"
                className="form-control"
                placeholder="Correo"
                name="user"
                value={state.user}
                onChange={({ target }) => onChange(target.value, target.name)} />

            <input
                type="password"
                className="form-control mt-2 mb-2"
                placeholder="Contraseña"
                name="password"
                value={state.password}
                onChange={({ target }) => onChange(target.value, target.name)} />

            <button
                className="btn btn-primary"
                onClick={onClick}>
                Login
            </button>
        </>
        )
}
