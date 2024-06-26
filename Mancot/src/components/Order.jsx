import React,{useState,useContext,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { CartContext } from './CartContext';
import axios from 'axios';
import '../index.css'
const Order = () => {
    const {id}=useParams();
    const [c,setc]=useState(0);
    const { count, setCount } = useContext(CartContext);
    const[user,setUser]=useState(null);
    const [product,setProduct]=useState([]);
    useEffect(()=>{
        const fetchProduct=async()=>{
            const response=await axios.get(`${window.location.origin}/api/products/${id}`)
            setProduct(response.data)
        }
        fetchProduct();
    },[id])
    const handleAddtocart=async(ProductId)=>{
        const accesstoken=localStorage.getItem('accesstoken')
        if(accesstoken){
                
                const r=await axios.get(`${window.location.origin}/user/info`,{
                        headers: {
                            Authorization: `Bearer ${accesstoken}`,
                   },
                       
                });
                const respnse=await axios.get(`${window.location.origin}/api/products/${id}`)
                
                setUser(r.data);

                const cartData = {
                    user: r.data._id, 
                    product: ProductId, 
                    quantity: c,
                  };
                  const response=await axios.post(`${window.location.origin}/api/addToCart`,cartData);
                  setCount(response.data.products.length)
        }else{
            alert("Please login before Adding to Cart or Buying")
        }
    }
    const handleChange = (event) => {
        const newValue = parseInt(event.target.value, 10);
        setc(newValue); 

      };
    return (
    <div>
        <div className='OrderContainer'>
            {product.map((product)=>(
                <>
            <div key={product._id}className='OrderImage'>
                <img src={product.images} alt="" />
                </div>
            
            <div key={product.name} className='OrderDetail'>
                <h2 className='oswald-bold'>{product.name}</h2>
                <h3>{product.description}</h3>
                <h3 className='oswald-bold'>{product.price}</h3> 
                <input type="number"value={c} onChange={handleChange} />
                <button onClick={()=>handleAddtocart(product._id)}>Add To Cart</button>
                <button>Buy Now</button>
            </div>
            </>    
            ))}
        </div>
    </div>
  )
}

export default Order
