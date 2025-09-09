const activityTypesJoi = require('./activityTypesJoi');
const activityTypesService = require('./activityTypesService');

const postActivityTypesDataController = async (req, res) => {
    try {
        
        const { error } = activityTypesJoi.activityTypesJoi.validate(req.body);
        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }

        const result = await activityTypesService.postActivityTypesService(req.body);

        res.status(201).json({
            success: true,
            message: 'Activity Type Added Successfully',
            data: result
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

const getAllActivityTypesController=async(req,res)=>{
    try{

        const result=await activityTypesService.getAllActivityTypesService();
        res.status(200).json({success:true,data:result});

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

const getAllActivityTypesByIdController=async(req,res)=>{
    try{

        const activityTypesId=req.params.id;
        const result=await activityTypesService.getAllActivityTypesByIdService(activityTypesId);

        if(result.length===0){
            res.status(404).json({success:false,message:'Activity Types Not Found'})
        }else{
            res.status(200).json({success:true,data:result[0]});
        }
    }catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

const updateActivityTypesController=async(req,res)=>{
    try{
        const activityTypesId=req.params.id;
        const activityTypesData=req.body;
        const result=await activityTypesService.updateActivityTypesService(activityTypesId,activityTypesData);

        if(result.affectedRows>0){
            res.status(201).json({success:true,message:'Activity Types Update Successfully',data:result});
        }else{
            res.status(404).json({success:false,message:'Activity Types Not Found'})
        }
    }catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

const deleteActivityTypesController=async(req,res)=>{
    try{
        const activityTypesId=req.params.id;
        const result=await activityTypesService.deleteActivityTypesService(activityTypesId);

        if(result.affectedRows>0){
            res.status(200).json({success:'true',message:'Activity Types Delete Successfully'});
        }else{
            res.status(404).json({success:'false',message:'Activity Types Not Found'});
        }
    }catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

module.exports = {
    postActivityTypesDataController,
    getAllActivityTypesController,
    getAllActivityTypesByIdController,
    updateActivityTypesController,
    deleteActivityTypesController
};
