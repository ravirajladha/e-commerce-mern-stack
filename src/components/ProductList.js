import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'


const ProductList = () => {
    const [products, setProducts] = useState([])
    useEffect(() => {
        getProducts();
    }, [])
    //will call api here, this api call can be done in the usedeffect too
    // learn use state and useEffect more
    const getProducts = async () => {
        let result = await fetch('http://localhost:5000/products',{
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        result = await result.json();
        setProducts(result)
    }
  const deleteProduct = async (id) => {
    let result = await fetch('http://localhost:5000/product/'+id,{
        method:"delete",
        headers: {
            authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
        }

    })
    result = await result.json();
    if(result){
       getProducts();
    }
  }

//   const searchHandle = async (event) => {
//    let  key = event.target.value
//    if(key){
//     let result = await fetch('http://localhost:5000/search/'+key)
//     result =await  result.json()
//     if(result){
//      setProducts(result)
//     }
//    }else{
//     getProducts();
//    }
   
//   }

  const searchHandle = async (event) => {
    let key = event.target.value;
    if (key) {
      let result = await fetch('http://localhost:5000/search/' + key, {
        headers: {
            authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
      });
      result = await result.json();
      if (result) {
        setProducts(result);
      }
    } else {
      getProducts();
    }
  };

//   const updateProduct = async (id) => {

//   }
    return (
        <div>
<input type="text" placeholder="Search for products" onChange={searchHandle}/>

            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Category</th>
                        <th scope="col">Compnany</th>
                        <th scope="col">Delete</th>
                        <th scope="col">Update</th>
                    </tr>
                </thead>
                <tbody>
                {products.length === 0 ? (
      <>No products available</>
    ) : ( 
                    products.map((item, index) =>
                    
                            <tr key={item._id}>
                                <th scope="row">{index + 1}</th>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td>{item.category}</td>
                                <td>{item.company}</td>
                                <td><button onClick={() => deleteProduct(item._id)}> Delete</button></td>
                                <td><Link to={"/update/"+item._id} >update</Link></td>
                            </tr>
                     
                    )

    )}

                </tbody>
            </table>

        </div>
    )
}

export default ProductList