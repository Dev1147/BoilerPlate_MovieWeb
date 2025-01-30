import React, { useEffect, useState } from 'react' //, { useEffect }
import {API_URI, API_KEY, IMAGE_BASE_URL} from '../../Config'
import GridCards from '../../commons/GridCards';
import {Row, Button, Input,Space } from 'antd';
import MainImage from '../Sections/MainImage';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function LandingPage() {

  const [Movies, setMovies] = useState([])
  const [MainMovieImage, setMainMovieImage] = useState(null)
  const [CurrentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect (()=>{
    const endpoint = `${API_URI}movie/popular?api_key=${API_KEY}&language=en-US&page=1`; // ko-KR, en-US

    // fetch(endpoint)
    // .then(response => response.json())
    // .then(response => {
    //   //console.log(response)
    //   setMovies(response.results)
    //   setMainMovieImage(response.results[0])
    //})

    //fetchMovies(endpoint)
    fetchMoviesData(endpoint,false)
    
  },[])

  // const fetchMovies = (endpoint) =>{
  //   fetch(endpoint)
  //   .then(response => response.json())
  //   .then(response => {
  //     //console.log(response)
  //     setMovies([...Movies, ...response.results])
  //     setMainMovieImage(response.results[0])
  //     setCurrentPage(response.page)
  //   })
  // }

  // const fetchMoviesSearch = (endpoint) =>{
  //   fetch(endpoint)
  //   .then(response => response.json())
  //   .then(response => {
  //     //console.log(response)
  //     setMovies([...response.results])
  //     setMainMovieImage(response.results[0])
  //     setCurrentPage(response.page)
  //   })
  // }

 //코드 중복 개선
  const fetchMoviesData = (endpoint, isSearch = false) =>{
    fetch(endpoint)
    .then(response => response.json())
    .then(response => {
      //console.log(response.results)
      if(isSearch){ // 검색 결과만 설정
        setMovies([...response.results])
      }
      else{ // 기존 목록에 추가
        setMovies([...Movies, ...response.results])
      }
      
      setMainMovieImage(response.results[0]) // 첫 번째 영화 이미지
      setCurrentPage(response.page) // 현재 페이지 설정
    }) 
  }

  const loadMoreItems = () =>{
    const endpoint = `${API_URI}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage + 1}`;
    //fetchMovies(endpoint)
    fetchMoviesData(endpoint,false)

  }

  const handleSearch = () =>{
   
    const endpointSearch = `${API_URI}search/movie?api_key=${API_KEY}&language=en-US&query=${search}&page=1`;

    const endpointInitial  = `${API_URI}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    // console.log(search)
    // console.log(endpointSearch)
    //fetchMoviesSearch(endpointSearch)

    if(!search){
      fetchMoviesData(endpointInitial,false)
    }else{
      fetchMoviesData(endpointSearch,true)
    }
    
  }

  return (
    <div  style={{ width: '100%', margin: '0'}}>
      {/* <button onClick={onLogoutClickHandler}>로그아웃</button> */}
      {/* <button onClick={onLoginClickHandler}>로그인</button> */}

      {/*Main Image MainMovieImage && 랜더링시 에러 발생하여 이후에 발생시키 위해서서 */}
      {MainMovieImage &&
        <MainImage 
        image={`${IMAGE_BASE_URL}w1280${MainMovieImage.backdrop_path}`}
        title={MainMovieImage.original_title}
        text={MainMovieImage.overview}
        />
      }

      {/* 영화 검색 */}
      <div style={{width:'300px', margin: '1rem auto'}}>
        <Space.Compact>
          <Input type='text' 
            style={{ width: 'calc(100% - 80px)' }} 
            placeholder='영화 제목을 입력하세요'  
            value={search} 
            onChange={(e) => setSearch(e.target.value)}
            onPressEnter={handleSearch}/>
          <Button type="primary" onClick={handleSearch} >검색</Button>
        </Space.Compact>
      </div>

      {/* Movie Grid Cards */}
      <div style={{width:'85%', margin: '1rem auto'}}>
        <h2>Movies By Latest</h2>
        <hr/>     
        <Row gutter={[16,16]}>
          {Movies && Movies.map((movie, index) => (
            <React.Fragment key={index}>
              <GridCards 
                landingPage
                image={movie.poster_path ? 
                  `${IMAGE_BASE_URL}w500${movie.poster_path}` :null}
                movieId={movie.id}
                movieName={movie.original_title}
              />
            </React.Fragment>
          ))}
          
        </Row>
      </div>

      <div style={{display:'flex', justifyContent:'center'}}>
        <Button onClick={loadMoreItems}>Load More</Button>
      </div>

    </div>
  )
}

export default LandingPage