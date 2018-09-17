import React from 'react';
import PropTypes from 'prop-types';

import Page from '../../components/Page/Page';
import Grid from '../../components/Grid/Grid';
import CardContainer from '../CardContainer/CardContainer';
import NewCardButtonContainer from '../NewCardButtonContainer/NewCardButtonContainer';
import CardsStorageController from '../../utils/CardStorageController';
import NewCardButton from '../../components/NewCardButton/NewCardButton';


export default class CardListPageContainer extends React.Component {
    constructor(props) {
        super(props);
        this.cards = [];
    }
    componentDidMount() {
        CardsStorageController.deleteTempCards();
    }

    render() {
        const cards = CardsStorageController.fetchCards();
        this.cards = cards.map((card) =>
            <CardContainer
                key={card.id}
                card={card}
                history={this.props.history}
            />);

        return (
            <Page title='Card List'>
                <Grid>
                    <NewCardButtonContainer history={this.props.history}/>
                    {this.cards}
                </Grid>
            </Page>
        );
    }
}

CardListPageContainer.propTypes = {
    history: PropTypes.object.isRequired
};
