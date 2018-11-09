import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import uuid from 'uuid/v1';

import { handleAddPost, handleEditPost } from 'Actions/posts';

import Field from './NewPostField';
import Form from './Form';

const X = () => (
  <div className="column is-7 is-offset-2">
    <div className="card">
      <div className="card-content">
        <Form />
      </div>
    </div>
  </div>
);

export default X;

// class NewPost extends Component {
//   static propTypes = {
//     postInfo: PropTypes.shape({
//       id: PropTypes.string,
//       title: PropTypes.string,
//       message: PropTypes.string,
//     }),
//     addPost: PropTypes.func.isRequired,
//     updatePost: PropTypes.func.isRequired,
//     toggleNewPost: PropTypes.func,
//     cancelEdition: PropTypes.func,
//   }

//   static defaultProps = {
//     postInfo: null,
//     toggleNewPost: null,
//     cancelEdition: null,
//   }

//   state = {
//     title: '',
//     author: '',
//     message: '',
//     category: '',
//     invalidForm: false,
//   }

//   componentDidMount() {
//     this.setupInitialState();
//   }

//   setupInitialState = () => {
//     const { postInfo } = this.props;

//     // If postInfo is passed, that's because the NewPost is being rendered by Edit Post method
//     // So it will send the default values for input title and textarea message
//     if (postInfo) {
//       this.setState(() => ({
//         title: postInfo.title,
//         message: postInfo.message,
//       }));
//     }
//   }

//   // Array of objects to setup the form fields of a new post when creating a post
//   fieldsSetup = [
//     {
//       id: 'title',
//       domId: 'new-post-title',
//       domType: 'input',
//       label: 'Title',
//     },
//     {
//       id: 'author',
//       domId: 'new-post-author',
//       domType: 'input',
//       label: 'Author',
//     },
//     {
//       id: 'message',
//       domId: 'new-post-message',
//       domType: 'textarea',
//       label: 'Message',
//     },
//     {
//       id: 'category',
//       domId: 'new-post-category',
//       domType: 'dropdown',
//       label: 'Category',
//     },
//   ]

//   handleFieldValue = field => value => this.setState(() => ({ [field]: value }));

//   // Check if all fields are not empty to set the post form as valid
//   validatePost = fields => fields.every(field => field.trim());

//   handlePost = () => {
//     const {
//       postInfo,
//     } = this.props;

//     if (postInfo) {
//       this.updatePost();
//       return;
//     }

//     this.createPost();
//   }

//   createPost = () => {
//     const {
//       title, author, message, category,
//     } = this.state;

//     const { addPost, toggleNewPost } = this.props;

//     const postIsValid = this.validatePost([title, message, author, category]);

//     // Create the data for a new post
//     const postData = {
//       id: uuid(),
//       timestamp: Date.now(),
//       title: title.trim(),
//       body: message.trim(),
//       author: author.trim(),
//       category,
//     };

//     if (postIsValid) {
//       addPost(postData);
//       toggleNewPost();
//       return;
//     }

//     this.setState(() => ({ invalidForm: true }));
//   }

//   updatePost = () => {
//     const { title, message } = this.state;

//     const {
//       updatePost,
//       postInfo,
//       cancelEdition,
//     } = this.props;

//     const postIsValid = this.validatePost([title, message]);

//     // Create the data for update a post
//     const postData = {
//       id: postInfo.id,
//       details: {
//         title: title.trim(),
//         body: message.trim(),
//       },
//     };

//     if (postIsValid) {
//       updatePost(postData);
//       cancelEdition();
//       return;
//     }

//     this.setState(() => ({ invalidForm: true }));
//   }

//   createFields = () => {
//     const { category } = this.state;
//     const { postInfo } = this.props;

//     // Filter the fields to be created
//     const usedFields = postInfo
//       ? this.fieldsSetup.filter(({ id }) => id === 'title' || id === 'message')
//       : this.fieldsSetup;

//     return usedFields.map(field => (
//       <Field
//         key={field.domId}
//         {...field}
//         handleField={this.handleFieldValue(field.id)}
//         category={category}
//         {...postInfo}
//       />
//     ));
//   }

//   render() {
//     const { invalidForm } = this.state;

//     const { cancelEdition, postInfo } = this.props;

//     const fields = this.createFields();

//     return (
//       <div className="column is-7 is-offset-2">
//         <div className="card">
//           <div className="card-content">
//             <div className="media">
//               <div className="media-content">
//                 { fields }
//               </div>
//             </div>
//           </div>
//           {invalidForm && <p className="help is-danger has-text-centered">Form is invalid!</p>}
//           <footer className="card-footer">
//             <a role="button" className="card-footer-item" onClick={this.handlePost}>
//               {postInfo ? 'Save' : 'Create'}
//             </a>
//             {postInfo && <a role="button" className="card-footer-item" onClick={cancelEdition}>Cancel</a>}
//           </footer>
//         </div>
//       </div>
//     );
//   }
// }

// const mapDispatchToProps = dispatch => ({
//   addPost: (post) => {
//     dispatch(handleAddPost(post));
//   },
//   updatePost: (post) => {
//     dispatch(handleEditPost(post));
//   },
// });

// export default connect(null, mapDispatchToProps)(NewPost);
