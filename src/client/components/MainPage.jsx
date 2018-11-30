import React, { Component } from "react";
import { Grid, Form, Input, Button, Label, List, Icon, Table } from "semantic-ui-react";
import { findPostByBody } from "../API/ElasticSearchAPI";
import { findPostById } from "../API/MongoDBApi";

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postId: "",
            postFoundById: '',
            postBody: "",
            postsFoundByBody: []
        };
    };


    async requestPostById() { // mongoDB search
        const postId = this.state.postId;
        const posts = await findPostById(postId);
        this.setState({ postFoundById: posts });
    };

    requestTweetByBody = () => {// ElasticSearch
        const tweetBody = this.state.postBody;
        findPostByBody(tweetBody)
            .then(response => this.setState({ postsFoundByBody: response.data }));
    };

    handlePostIdInput = (event, { name, value }) => {
        const isInteger = /^[0-9]+$/;
        const postId = event.target.value;
        this.setState({ [name]: value });
    };

    // handleTweetBodyInput = (event) => {
    //   this.setState({ postBody: event.target.value });
    // };

    render() {
        const { postId, postBody, postFoundById } = this.state;

        return (
            <Grid columns={2} divided>
                <Grid.Row>
                    <Grid.Column>
                        <Input
                            label={
                                <Label>
                                    <Icon name="twitter"/>
                                </Label>
                            }
                            name="postId"
                            value={postId}
                            onChange={this.handlePostIdInput}
                            placeholder="Post Id"
                            action={
                                <Button
                                    color="teal"
                                    icon="search"
                                    content="Find Tweet"
                                    onClick={() => this.requestPostById(postId)}
                                />
                            }/>
                    </Grid.Column>
                    <Grid.Column>
                        <Input
                            label={
                                <Label>
                                    <Icon name="twitter"/>
                                </Label>
                            }
                            name="Tweet message"
                            value={postBody}
                            onChange={this.handleTweetBodyInput}
                            placeholder="Tweet message"
                            action={
                                <Button
                                    color="teal"
                                    icon="search"
                                    content="Find Tweet"
                                    onClick={this.requestTweetByBody}
                                />
                            }/>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column>
                        <Table celled>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Search by Tweet Id from MongoDB</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell>
                                        <List>
                                            {
                                                postFoundById[0]?
                                                    Object.keys(postFoundById[0]).map(key => {
                                                        return(
                                                            <List.Item key={key}>
                                                                {key}: {postFoundById[0][key]}
                                                            </List.Item>
                                                        );
                                                    }):
                                                    null
                                            }
                                        </List>
                                    </Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table>
                    </Grid.Column>
                    <Grid.Column>
                        <Table celled>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Search by Tweet Body from ElasticSearch</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell>
                                        {this.state.postsFoundByBody}
                                    </Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    };
};

export default MainPage;``