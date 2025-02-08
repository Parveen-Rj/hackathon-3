


// eslint-disable-next-line import/no-anonymous-default-export
export default {
    name : "order",
    type :"document",
    title : "Order",
    fields : [
        {
            name : "firstName",
            title : "first Name",
            type : "string",


        },
        {
            name : "lastName",
            title : "last Name",
            type : "string",

        },
        {
            name : "address",
            title : "address",
            type : "string",

        },
    {
     
        name : "city",
        title : "city",
        type : "string"   
    },
    {
        
        name : "zipCode",
        title : "zip code",
        type : "number"
    },
    {
        
        name : "phone",
        title : "phone",
        type : "number"
    },
    
    {
        
        name : "email",
        title : "email",
        type : "string",
    },
    {
        name: "discount",
        type: "number",
        title:"Discount"
    },
{
    
    name : "cartItem",
    title : "cart item",
    type : "array",
    of: [{ type : "reference", to: [{ type : "car"}] }],
},
{
    
    name : "total",
    title : "total",
    type : "number"
},
{
    
    name : "status",
    title : "Order status",
    type : "string",
    options : {
        list : [

        {title : "pending", value : "pending"},
        {title : "Success", value : "success" },
        {title : "Dispatch", value : "dispatch"}
    ],
    layout :"radio",
},
initialValue : "pending"
}
    ]

}