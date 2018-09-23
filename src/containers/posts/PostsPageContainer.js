import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Page from '../../components/common/Page/Page';
import Grid from '../../components/common/Grid/Grid';
import PostContainer from './post/PostContainer';
import NewPostButtonContainer from './NewPostButtonContainer';
import {fetchPostsRequest} from '../../ducks/posts/actions';
import {selectPosts} from '../../ducks/posts/selectors';
import {selectIsAdmin} from '../../ducks/auth/selectors';
import {PAGE_TITLE} from '../../locale';


class PostsPageContainer extends React.Component {
    static propTypes = {
        posts: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            content: PropTypes.string.isRequired,
            totalLikes: PropTypes.number.isRequired
        })),
        fetchPosts: PropTypes.func.isRequired,
        isAdmin: PropTypes.bool.isRequired
    };

    componentDidMount() {
        this.props.fetchPosts();
    }

    render() {
        const posts = this.props.posts.map((post) => <PostContainer key={post.id} post={post}/>);
        const elems = this.props.isAdmin ? [<NewPostButtonContainer key={0}/>, ...posts] : [...posts];

        return (
            <Page title={PAGE_TITLE.POSTS}>
                <Grid>
                    {elems}
                </Grid>
            </Page>
        );
    }
}

const mapStateToProps = state => ({
    posts: selectPosts(state),
    isAdmin: selectIsAdmin(state)
});

const mapDispatchToProps = dispatch => ({
    fetchPosts: () => dispatch(fetchPostsRequest())
});

export default connect(mapStateToProps, mapDispatchToProps)(PostsPageContainer);
