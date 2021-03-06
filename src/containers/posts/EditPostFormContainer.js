import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {push} from 'connected-react-router';
import {connect} from 'react-redux';

import {
    editPostRequest,
    removePostRequest,
    resetEditPostStatus,
    resetRemovePostStatus
} from '../../ducks/posts/actions';
import Loading from '../../components/common/Loading/Loading';
import EditPostForm from '../../components/posts/EditPostForm/EditPostForm';
import {selectEditPostStatus, selectRemovePostStatus} from '../../ducks/posts/selectors';
import {ERROR_MSG} from '../../locale';
import {Status, Routes} from '../../constants';


class EditPostFormContainer extends React.Component {
    static propTypes = {
        post: PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            content: PropTypes.string.isRequired,
            totalLikes: PropTypes.number.isRequired
        }).isRequired,
        replacePost: PropTypes.func.isRequired,
        deletePost: PropTypes.func.isRequired,
        onEditPostSuccess: PropTypes.func.isRequired,
        onEditPostError: PropTypes.func.isRequired,
        editPostStatus: PropTypes.string.isRequired,
        onDeletePostSuccess: PropTypes.func.isRequired,
        onDeletePostError: PropTypes.func.isRequired,
        deletePostStatus: PropTypes.string.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            title: this.props.post.title,
            content: this.props.post.content
        };
    }

    componentDidUpdate() {
        const {editPostStatus, onEditPostSuccess, onEditPostError} = this.props;
        const {deletePostStatus, onDeletePostSuccess, onDeletePostError} = this.props;
        if (editPostStatus === Status.SUCCESS) {
            onEditPostSuccess();
        } else if (editPostStatus === Status.ERROR) {
            onEditPostError();
        }
        if (deletePostStatus === Status.SUCCESS) {
            onDeletePostSuccess();
        } else if (deletePostStatus === Status.ERROR) {
            onDeletePostError();
        }
    }

    handleInputChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };

    handlePostDeletion = () => {
        this.props.deletePost(this.props.post.id);
    };

    handleSaveClick = (event) => {
        const {title, content} = this.state;
        const post = {title, content};
        this.props.replacePost(this.props.post.id, post);

        event.preventDefault();
    };

    render() {
        const {editPostStatus, deletePostStatus} = this.props;
        const editInProgress = editPostStatus === Status.IN_PROGRESS;
        const deleteInProgress = deletePostStatus === Status.IN_PROGRESS;
        return (
            <Fragment>
                <EditPostForm
                    title={this.state.title}
                    content={this.state.content}
                    onSave={this.handleSaveClick}
                    onDelete={this.handlePostDeletion}
                    onTitleInputChange={this.handleInputChange}
                    onDescriptionInputChange={this.handleInputChange}
                />
                {(editInProgress || deleteInProgress) && <Loading/>}
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    editPostStatus: selectEditPostStatus(state),
    deletePostStatus: selectRemovePostStatus(state)
});

const mapDispatchToProps = dispatch => ({
    replacePost: (id, post) => dispatch(editPostRequest(id, post)),
    deletePost: id => dispatch(removePostRequest(id)),
    onEditPostSuccess: () => {
        dispatch(push(Routes.POSTS));
        dispatch(resetEditPostStatus());
    },
    onEditPostError: () => {
        alert(ERROR_MSG.EDIT);
        dispatch(resetEditPostStatus());
    },
    onDeletePostSuccess: () => {
        dispatch(push(Routes.POSTS));
        dispatch(resetRemovePostStatus());
    },
    onDeletePostError: () => {
        alert(ERROR_MSG.DELETE);
        dispatch(resetRemovePostStatus());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(EditPostFormContainer);
