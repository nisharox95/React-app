  import React from 'react';
  import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';


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
              {comments.map((c) => {
                return (
                  <li key={c.id}>
                  <p>{c.comment}</p>
                  <p>-- {c.author}, {new Intl.DateTimeFormat('en-US',
                  {year:'numeric', month:'short',day:'2-digit'}).format(new Date(Date.parse(c.date)))}</p>
                  </li>
                );
              })
            }
            </ul>
          </div>
          );

            else
              return (
                <div></div>
              );
            }

        const DishDetail =(props) => {
          const selectedDish = props.dish;
          if(selectedDish == null) {
            return (
            <div></div>
          )
          }
          return (
            <div className="container">
              <div className="row">
             <RenderDish dish = {selectedDish} />
              <RenderComments comments = {selectedDish.comments} />
              </div>
              </div>
          );
        }


  export default DishDetail;
