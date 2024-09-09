import React, { useState ,useEffect} from 'react'
import APIService from '../components/APIService'
function Form(props) {
     
    const[product_name,setproduct_name]=useState('')
    const[manufacturing_date,setmanufacturing_date]=useState('')
    const[expiry_date ,setexpiry_date]=useState('')
    const[price ,setprice]=useState('')
    const[quantity ,setquantity]=useState('')


    useEffect(()=>{
        setproduct_name(props.article.product_name)
        setmanufacturing_date(props.article.manufacturing_date)
        setexpiry_date(props.article.expiry_date)
        setprice(props.article.price)
        setquantity(props.article.quantity)
    },[props.article])

    const updateArticle = () => {
        APIService.UpdateArticle(props.article.id, {
            product_name,
            manufacturing_date: manufacturing_date.slice(0, 10), // Format as yyyy-MM-dd
            expiry_date: expiry_date.slice(0, 10), // Format as yyyy-MM-dd
            price,
            quantity
        })
        .then(resp => props.updatedData(resp))
        .catch(error => console.log(error));
    };
   
    const insertArticle=()=>{
        APIService.insertArticle({product_name,manufacturing_date,expiry_date,price,quantity})
        .then(resp=>props.insertedArticle(resp))
        .catch(error=>console.log(error))
    }

   


  return (
     <div>
        {
            props.article ?(
                <div className='mb-3'>
                    <label htmlFor='product_name' className='form-label'>product_name</label>
                    <input type='text' className='form-control'
                     value={product_name}
                     placeholder='enter the product Name'
                     onChange={(e)=> setproduct_name(e.target.value)}
                    />
                     <label htmlFor='manufacturing_date' className='form-label'>manufacturing_date</label>
                     <input type='date' className='form-control'
                     value={manufacturing_date}
                     onChange={(e)=> setmanufacturing_date(e.target.value)}
                    
                     placeholder='enter the manufacturing_date'
                     />
                     <label htmlFor='expiry_date' className='form-label'>expiry_date</label>
                     <input type='date' 
                     value={expiry_date}
                     onChange={(e)=> setexpiry_date(e.target.value)}
                     className='form-control'
                     placeholder='enter the expiry_date'
                     />
                     <label htmlFor='price' className='form-label'>price</label>
                     <input type='number' 
                     value={price}
                     onChange={(e)=> setprice(e.target.value)}
                     className='form-control'
                     placeholder='enter the  price'
                     />
                     <label htmlFor='quantity' className='form-label'>quantity</label>
                     <input type='number' 
                     value={quantity}
                     onChange={(e)=> setquantity(e.target.value)}
                     className='form-control'
                     placeholder='enter the quantity'
                     />
                {
                    props.article.id ?<button 
                    onClick={updateArticle}
                    className='btn btn-success mt-3'
                     >Update</button>
                     :
                     <button 
                    onClick={insertArticle}
                    className='btn btn-success mt-3'
                     >ADD</button>
                     

                     
                }
                 

                   
                </div>
            ):null
        }
     </div>
  )
}

export default Form
