const dbConnection=require('../config/connection');

const postAddressService=(userAddressData,callback)=>{
    const query='INSERT INTO userAddress (userId, addressLineOne, addressLineTwo, city, state, country, postalCode) VALUES (?,?,?,?,?,?,?)';
    dbConnection.query(query,
        [
            userAddressData.userId,
            userAddressData.addressLineOne,
            userAddressData.addressLineTwo,
            userAddressData.city,
            userAddressData.state,
            userAddressData.country,
            userAddressData.postalCode
        ]
    )
}

module.exports={
    postAddressService
}