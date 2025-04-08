const userAddressService=require('./userAddressService');

const postAddressController=(req,res)=>{
   const userAddressData=req.body;
   userAddressService.postAddressService(userAddressData,(error,result)=>{
    if(error){
        return res.status(500).json({success:false,message:error.message})
    }else{
        res.status(200).json({success:'User Address Added Successfully'});
    }
   })
}

module.exports={
    postAddressController
}