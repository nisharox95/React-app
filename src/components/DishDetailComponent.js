  import React, {Component} from 'react';
  import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button,
    Col, Label, Row, Modal, ModalHeader, ModalBody } from 'reactstrap';
  import { Link } from 'react-router-dom';
  import {Control, LocalForm, Errors} from 'react-redux-form';

  const required = (val) => val && val.length;
  const maxLength = (len) => (val) => !(val) || (val.length <= len)
  const minLength = (len) => (val) => (val) && (val.length >= len)


  class CommentForm extends Component {

      constructor(props) {
      super(props);
      this.state={
        isModalOpen: false
      }
      this.toggleModal = this.toggleModal.bind(this);
      this.handleSubmit=this.handleSubmit.bind(this);
    }

    toggleModal() {
      this.setState({
        isModalOpen: !this.state.isModalOpen
      });
    }

  handleSubmit(values) {
      console.log("Current State is: " + JSON.stringify(values));
      alert("Current State is:" + JSON.stringify(values));
    }

    render() {
      return(
        <>
    <div className="ml-auto">
        <Button outline onClick={this.toggleModal}>
          <span class ="fa fa-pencil fa-lg"></span> Submit Comment
        </Button>
      </div>
      <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
        <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
        <ModalBody>
        <div className="col-12 col-md-9">
          <LocalForm onSubmit = {(values) => this.handleSubmit(values)}>
            <Row className="form-group">
            <Label htmlFor="rating" >Rating</Label>
            <Control.select model =".rating" name="rating"
              className="form-control" >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
          </Control.select>
          </Row>
          <Row className="form-group">
            <Label htmlFor="yourname">Your Name</Label>
              <Control.text model=".author" id="yourname" name="yourname"
                  placeholder="Your Name"
                  className="form-control"
                  validators={{
                    required, minLength: minLength(3), maxLength: maxLength(15)
                  }}
                  />
                <Errors
                  className="text-danger"
                  model=".yourname"
                  show="touched"
                  messages={{
                    required: 'Required ',
                    minLength: 'Must be greater than 2 characters',
                    maxLength: 'Must be 15 characters or less'
                  }}
                />
          </Row>
          <Row className="form-group">
            <Label htmlFor="comment">Comment</Label>
              <Control.textarea model=".message" id="message" name="message"
                  className="form-control"
                  rows="6"
              />
          </Row>
          <Row className="form-group">
              <Button type="submit" color="primary">
              Send feedback
              </Button>
              </Row>
        </LocalForm>
        </div>
        </ModalBody>
      </Modal>
      </>
    );
  }
}

      function RenderDish({dish}) {
             return (
               <div className="col-12 col-md-5 m-1">
                 <Card>
                      <CardImg src={dish.image} alt={dish.name} />
                      <CardBody>
                       <CardTitle>{dish.name}</CardTitle>
                       <CardText>{dish.description}</CardText>
                     </CardBody>
                 </Card>
                </div>
             );
      }

      function RenderComments({comments}) {
          if (comments != null)
            return(
              <div className="col-12 col-md-5 m-1">
              <h4>Comments</h4>
              <ul className="list-unstyled">
              {comments.map((comments) => {
                return (
                  <li key={comments.id}>
                  <p>{comments.comment}</p>
                  <p>-- {comments.author}, {new Intl.DateTimeFormat('en-US',
                  {year:'numeric', month:'short',day:'2-digit'}).format(new Date(Date.parse(comments.date)))}</p>
                  </li>
                );
              })
            }
            </ul>
            <CommentForm />
          </div>
          );

            else
              return (
                <div></div>
              );
            }


        const DishDetail =(props) => {
          if(props.dish == null) {
            return (
            <div></div>
          )
          }
          return (
            <div className="container">
            <div className="row">
              <Breadcrumb>
                <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
              </Breadcrumb>
              <div className="col-12">
                <h3>{props.dish.name}</h3>
              </div>
            </div>
              <div className="row">
             <RenderDish dish = {props.dish} />
              <RenderComments comments = {props.comments} />
              </div>
              </div>
          );
        }


  export default DishDetail;
