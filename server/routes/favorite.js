const express = require('express')
const router = express.Router();
const {Favorite} = require('../models/Favorite');

//exec() 메서드가 콜백을 받지 않도록 변경
// router.post('/favoriteNumber',(req, res)=>{
//     //console.log("요청 데이터:", req.body);
//     //몽고디비에 숫자가져오기
//     Favorite.find({"movieId":req.body.movieId})
//         .exec((err, info) =>{
//             if(err) return res.status(400).send(err)

//             res.status(200).json({success:true, favoriteNumber: info.length})    
//         })
    
// })

router.post('/favoriteNumber',async (req, res)=>{
    try{
        const info = await Favorite.find({"movieId":req.body.movieId});
        res.status(200).json({success:true, favoriteNumber: info.length});
    }catch(err){
        res.status(400).send(err);
    }
})

//내가 이 영화를 favorited리스트에 넣었는지 정보를 DB에서 가져오가가
router.post('/favorited',async (req, res)=>{
    try{
        const info = await Favorite.find({"movieId":req.body.movieId,"userFrom":req.body.userFrom});

        let result = false;
        if(info.length !== 0){
            result = true;
        }
        res.status(200).json({success:true, favorited: result});
    }catch(err){
        res.status(400).send(err);
    }
})

router.post('/removeFromFavorite',async (req, res)=>{
    
    try{
        await Favorite.findOneAndDelete({movieId:req.body.movieId, userFrom:req.body.userFrom})
        return res.status(200).json({success: true})
    }catch(err){
        return res.status(400).send(err)
        
    }
})

router.post('/addToFavorite',async (req, res)=>{
    const favorite = new Favorite(req.body)
    // favorite.save((err, doc)=>{
    //     if(err) return res.status(400).send(err)
    //     return res.status(200).json({success: true})
    // }) //svae()콜백 이제는 안됨 아래 2가지 중 1택
    favorite
        .save()
        .then(()=>{
            res.status(200).json({success: true})
        })
        .catch(err=>{
            res.status(400).send(err)
        })

    // try {
    //     await favorite.save();  // doc 변수는 사용하지 않으므로 제거
    //     return res.status(200).json({ success: true });
    // } catch (err) {
    //     return res.status(400).send(err);
    // }
})


router.post('/getFavoriteMovie',async (req, res)=>{
   // console.log(res)
    try{
        const favorites = await Favorite.find({'userFrom': req.body.userFrom})
        return res.status(200).json({success: true, favorites})
    }catch(err){
        return res.status(400).send(err)
        
    }
})

router.post('/removeFromFavorite',async (req, res)=>{
    try{
        await Favorite.findOneAndDelete({movieId:req.body.movieId, userFrom:req.body.userFrom})
        return res.status(200).json({success: true})
    }catch(err){
        return res.status(400).send(err)
        
    }
})


module.exports = router;