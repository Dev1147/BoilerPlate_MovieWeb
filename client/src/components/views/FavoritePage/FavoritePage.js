import React, { useEffect, useState } from 'react'
import './favorite.css'
import Axios from 'axios'
import { Popover } from 'antd'
import {IMAGE_BASE_URL} from'../../Config'

function FavoritePage() {
    const[Favorites, setFavorites] = useState([])

    useEffect(()=>{
        fetchFavoriteMovie()
    },[])

    const fetchFavoriteMovie = () => {
        Axios.post('api/favorite/getFavoriteMovie',{userFrom: localStorage.getItem('userId')})
            .then(response =>{
                if(response.data.success){
                    //console.log(response.data.favorites)
                    //console.log(response.data.favorites)
                    
                    setFavorites(response.data.favorites)
                }else{
                    alert('영화 정보를 가져오는데 실패 했습니다.')
                }
            })
    }

    //useState을 활용한 삭제
    const removeFavoriteById = (idToRemove) => {
        const updatedFavorites = Favorites.filter(favorite => favorite.movieId !== idToRemove);
        setFavorites(updatedFavorites);
      };

    //api을 다시 호출하여 삭제
    const onClickDelete=(movieId, userFrom)=>{

        const variables = {
            movieId,
            userFrom
        }

        Axios.post('api/favorite/removeFromFavorite', variables)
            .then(response => {
                if(response.data.success){
                    fetchFavoriteMovie()
                   
                   
                }else{
                    alert("리스트에 지우는데 실패했습니다")
                }
            })

    }

    const renderCards = Favorites.map((favorite, index) => {
        
        const content = (
            <div>
                {favorite.moviePost ? 
                
                    <img src={`${IMAGE_BASE_URL}w500${favorite.moviePost}`}  alt="movie poster" ></img> : "no image"
                }
                
            </div>
        )
        // console.log(IMAGE_BASE_URL)
        // console.log(favorite.moviePost)
        // console.log(`${IMAGE_BASE_URL}w500${favorite.moviePost}`);

        

        return <tr key={index}>
                    <Popover  content={content} title={`${favorite.movieTitle}`}>
                        <td>{favorite.movieTitle}</td>
                    </Popover>
                    <td>{favorite.movieRunTime}분</td>
                    <td><button onClick={() => onClickDelete(favorite.movieId, favorite.userFrom)}>apiRemove</button>
                    <button onClick={() => removeFavoriteById(favorite.movieId)}>stateRemove2</button>
                    </td>
                    
                </tr>
    })

    

  return (
    <div style={{width:'85%', margin:'5rem auto'}}>
        <h2>Favorite Movies My Me</h2>
        <hr/>
        <br/>
        <table>
            <thead>
                <tr>
                    <th>Movie Title</th>
                    <th>Movie Runtime</th>
                    <th>Remove From Favorite</th>
                </tr>
            </thead>

            <tbody>

                {renderCards}

            </tbody>
        </table>
    </div>
  )
}

export default FavoritePage