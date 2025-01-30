import React from 'react'
import {Col} from 'antd';
import { Link } from 'react-router-dom';

function GridCards(props) {
//console.log(props.landingPage)

  if(props.landingPage){
    return (
      <Col lg={6} md={8} xs={24}>
          <div style={{position:'relative'}}>
              <Link to={`/movie/${props.movieId}`}>
                  <img style={{width:'100%', height:'320px', borderRadius:'20px'}} src={props.image} alt={props.movieName}/>
              </Link>
          </div>
      </Col>
    )

  }else{
    return (
      <Col lg={6} md={8} xs={24}>
      <div style={{position:'relative'}}>
              <img style={{width:'100%', height:'320px', borderRadius:'20px'}} src={props.image} alt={props.actorName}/>
              <div>{props.actorName}</div>
          
      </div>
    </Col>
    )

  }

}

export default GridCards