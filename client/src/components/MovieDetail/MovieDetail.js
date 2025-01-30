import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { API_URI, API_KEY,IMAGE_BASE_URL } from '../Config';
import MainImage from '../views/Sections/MainImage';
import MovieInfo from './Sections/MovieInfo';
import GridCards from '../commons/GridCards';
import Favorite from './Sections/Favorite';
import VideoDetail from './Sections/VideoDetail';
import {Row,Button} from 'antd';

function MovieDetail(props) {

    //const movieId = props.match.params.movieId 더이상 사용안함
    const {movieId} = useParams();
    //console.log(movieId)
    const [Movie, setMovie] = useState([]);
    const [Casts, setCasts] = useState([]);
    const [ActorToggle, setActorToggle] = useState(false);
    const [Video, setVideo] = useState([]);
    // const imageURL = `${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`;
    // console.log(imageURL);
    //console.log('로커스토리지 유저아이디',localStorage.getItem('userId'));
    useEffect(()=>{
        //console.log(movieId);
        let endpointCrew = `${API_URI}movie/${movieId}/credits?api_key=${API_KEY}`;
        //console.log(endpointCrew)
        let endpointInfo = `${API_URI}movie/${movieId}?api_key=${API_KEY}`;

        let endpointVideo = `${API_URI}movie/${movieId}/videos?api_key=${API_KEY}`;

        fetch(endpointInfo)
        .then(response => response.json())
        .then(response => {
            //console.log(response)
            setMovie(response)

        })

        fetch(endpointCrew)
        .then(response => response.json())
        .then(response => {
            //console.log(response.cast)
            setCasts(response.cast)

        })

        fetch(endpointVideo)
        .then(response => response.json())
        .then(response => {
            //console.log('영화 key',response.results[0].key)
            //console.log('해당 영화 정보',response)
            if ( response.results.length > 0) {
                setVideo(response.results[0])
                
            } else {
            console.log('영화정보: key가 없습니다.');
            }
            
            //console.log('비디오',response.results[0])

        })

    },[])

    const toggleActorView = () =>{
        setActorToggle(!ActorToggle)
    }

  return (
    <div>
        {/*Header */}
        <MainImage 
        image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
        title={Movie.original_title}
        text={Movie.overview}
        />

        {/* video */}
        <VideoDetail videoInfo={Video}/>

        {/*Body */}
        <div style={{width:'85%', margin:'1rem auto'}}>
            {/* favorite button */}
            <div style={{display:'flex', justifyContent:'flex-end'}}>
                <Favorite movieInfo={Movie} movieId={movieId} userFrom={localStorage.getItem('userId')}/>
            </div>

            {/* Movie Info */}
            <MovieInfo movie={Movie}/>
            <br/>

            {/* Actors Grid */}
            <div style={{display:'flex', justifyContent:'Content', margin:'2rem'}}>
                <Button onClick={toggleActorView}>Toggle Actor View</Button>
            </div>

            {ActorToggle &&
                <Row gutter={[16,16]}>
                {Casts && Casts.map((casts, index) => (
                    <React.Fragment key={index}>
                    <GridCards
                        image={casts.profile_path ? 
                        `${IMAGE_BASE_URL}w500${casts.profile_path}` :null}
                        actorName={casts.name}
                        
                    />
                    </React.Fragment>
                ))}
                
                </Row>
            }




        </div>

    </div>
  )
}

export default MovieDetail