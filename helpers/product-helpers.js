var db = require('../config/connection');
var collection = require('../config/collections')
var objectId = require('mongodb').ObjectID;
const { response } = require('../app');

module.exports={
    addProduct: (product, callback)=>{
        console.log(product);
        db.get().collection('product').insertOne(product).then((data)=>{
            callback(data.ops[0]._id)
        })
    },

    getAllProducts: ()=>{
        return new Promise(async(resolve, reject)=>{
            let products = await db.get().collection(collection.PRODUCTS_COLLECTION).find().toArray()
            resolve(products)
        })
    },

    deleteProduct:(prodId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.PRODUCTS_COLLECTION).removeOne({_id:objectId(prodId)}).then((response)=>{
                resolve(response)
            })
        })
    },

    getProductDetails:(proId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.PRODUCTS_COLLECTION).findOne({_id:objectId(proId)}).then((product)=>{
                resolve(product)
            })
        })
    },

    updateProduct:(proId, proDetails)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.PRODUCTS_COLLECTION).updateOne({_id:objectId(proId)},{
                $set:{
                    Name:proDetails.Name,
                    Category:proDetails.Category,
                    Price:proDetails.Price,
                    Description:proDetails.Description
                }
            }).then((response)=>{
                resolve()
            })
        })
    }

}