  import React, { Component } from 'react';
  import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

  class DishDetail extends Component {

      renderDish(dish) {
        if (dish != null)
             return(
                 <Card>
                      <CardImg src={dish.image} alt={dish.name} />
                      <CardBody>
                       <CardTitle>{dish.name}</CardTitle>
                       <CardText>{dish.description}</CardText>
                     </CardBody>
                 </Card>
             );
         else
             return(
                 <div></div>
             );
      }

      renderComments(comments) {
            if (comments !=null) {
              const commentList = comments.map((c) => {
                return (
                  <div key={c.id}>
                       <li>
                        <p>{c.comment}</p>
                        <p>-- {c.author}, {new Intl.DateTimeFormat('en-US',
                        {year:'numeric', month:'short',day:'2-digit'}).format(new Date(Date.parse(c.date)))}</p>
                      </li>
                  </div>
                );
              });

              return (
                <div>
                  <h4>Comments</h4>
                  <ul className="list-unstyled">
                    { commentList }
                  </ul>
                </div>
              )

            }
            else {
              return (
                <div></div>
              );
            }
        }

        render() {
          const selectedDish = this.props.dish;
          if(selectedDish == null) {
            return (
            <div></div>
          )
          }
          return (
            <div className="container">
              <div className="row">
              <div className="col-12 col-md-5 m-1">
             {this.renderDish(selectedDish)}
             </div>
             <div className="col-12 col-md-5 m-1">
              {this.renderComments(selectedDish.comments) }
              </div>
              </div>
            </div>
          );
        }
    }

  export default DishDetail;
