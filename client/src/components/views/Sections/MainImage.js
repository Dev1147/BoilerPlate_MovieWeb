import React from 'react'
function MainImage(props) {

  //console.log(props.image);
  return (
    // <div style={{
    //   background: `linear-gradient(to bottom, rgba(0,0,0,0) 39%, rgba(0,0,0,0) 41%, rgba(0,0,0,0.65) 100%),
    //   url('${props.image}'), #1c1c1c`,
    //   height: '500px',
    //   backgroundSize: 'cover', // backgroundSize 속성도 축약형으로만 사용
    //   backgroundPosition: 'center top', // backgroundPosition도 하나로 지정
    //   width: '100%',
    //   position: 'relative'
    // }}>
    <div style={{
      background: `linear-gradient(to bottom, rgba(0,0,0,0) 39%, rgba(0,0,0,0) 41%, rgba(0,0,0,0.65) 100%), 
      url('${props.image}') center top / cover no-repeat`, // background 속성에 모든 스타일을 통합
      height: '500px',
      width: '100%',
      position: 'relative'
    }}>
        <div>
            <div style={{ position:'absolute', maxWidth:'500px', bottom:'2rem',marginLeft:'2rem'}}>
                <h2 style={{color:'white'}}>{props.title}</h2>
                <p style={{color:'white', fontSize:'1rem'}}>{props.text}</p>
            </div>
        </div>
    </div>
  )
}

export default MainImage