import React, { Component } from 'react';
import RoomJoinPage from './RoomJoinPage';
import CreateRoomPage from "./CreateRoomPage";
import Room from './Room';
import { Grid, Button, ButtonGroup, Typography} from '@mui/material'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Redirect,
    Navigate
  } from "react-router-dom";

export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roomCode: null,
        };
    }

    // once we've rendered the page we will asynchronusly make the fetch request
    // once that's done we will set the state which will force the componenet to re-render
    async componentDidMount() {
        fetch('/api/user-in-room')
        .then((response) => response.json())
        .then((data) => {
            this.setState({
                roomCode: data.code
            });
        });
    }

    renderHomePage() {
        return (
            <Grid container spacing={3} align="center">
                <Grid item xs={12}>
                    <Typography variant="h3" component="h3">
                        House Party
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <ButtonGroup disableElevation variant="contained" color="primary">
                        <Button color="primary" to='/join' component={Link}>
                            Join a Room
                        </Button>
                        <Button color="secondary" to='/create' component={Link}>
                            Create a Room
                        </Button>
                    </ButtonGroup>
                </Grid>
            </Grid>
        );
    }

    render() {
        return (
            <>
            <Router>
                <Routes>
                    <Route exact path='/' element={this.state.roomCode ? <Navigate to={`/room/${this.state.roomCode}`} />: this.renderHomePage()} />
                    <Route path='/join' element={<RoomJoinPage />} />
                    <Route path='/create' element={<CreateRoomPage />} />
                    <Route path='/room/:roomCode' element={<Room />} />
                </Routes>
            </Router>
            </>
        );
    }
}