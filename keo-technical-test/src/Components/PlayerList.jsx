import React from "react";
import { CreatePlayer } from '../Components/CreatePlayer';
import "../Styles/styles.css";

export class PlayerList extends React.Component {

    state = { players: undefined }

    callbackGetNewPlayer = (player) => {
        if (this.state.players === undefined) {
            let temp = [player];
            this.setState({ players: temp });
        } else {
            let temp = this.state.players;
            temp.push(player);
            this.setState({ player: temp });
        }
    }

    constructor(props) {
        super(props);
        this.state = {};
    }

    sortPlayers(playerA, playerB) {
        if (playerA.score > playerB.score) return -1;
        else if (playerB.score > playerA.score) return 1;
        else {
            if (playerA.name > playerB.name) return -1;
            else return 1;
        }
    }

    getPlayers() {
        if (this.state.players !== undefined) {
            let temp = this.state.players;
            temp.sort(this.sortPlayers);
            let listItems = temp.map((player, index) =>
                <li key={index} className="ml-5">
                    <img src={player.imgURL} alt=""/>
                    <span>{player.name}: {player.score}</span>
                </li>
            );
            return listItems;
        } else {
            return (<li>No hay jugadores</li>);
        }

    }

    render() {
        return (
            <>
                <h3>Lista de jugadores</h3>
                <ul>{this.getPlayers()}</ul>
                <hr/>
                <CreatePlayer parentCallback={this.callbackGetNewPlayer} />
            </>
        );
    }
}
