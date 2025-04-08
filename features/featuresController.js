const featuresService=require('../features/featuresService');

const postFeaturesController = (req, res) => {
    const featuresData = req.body;
    
    featuresService.postFeaturesService(featuresData, (error, result) => {  
        if (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
        res.status(200).json({ success: true, message: 'Features Added Successfully' });
    });
};

const getAllFeaturesController=(req,res)=>{
    featuresService.getAllFeaturesService((error,result)=>{
        if(error){
            return res.status(500).json({success:false,message:error.message})
        }else{
            res.status(201).json({success:true,data:result})
        }
    })
}


module.exports={
    postFeaturesController,
    getAllFeaturesController
}