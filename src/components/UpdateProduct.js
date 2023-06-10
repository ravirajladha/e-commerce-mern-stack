import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
const UpdateProduct = () => {

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const [error, setError] = useState(false)
    const params = useParams();
    const navigate = useNavigate()
    useEffect(() => {
        console.log(params)
        getProductDetails();
    }, [])

    const getProductDetails = async () => {
        console.warn(params);
        let result = await fetch('http://localhost:5000/product/' + params.id,
            {
                headers: {
                    authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            })
        result = await result.json()
        setName(result.name)
        setPrice(result.price)
        setCompany(result.company)
        setCategory(result.category)
    }
    const updateProduct = async () => {
        console.warn(name, price, category, company)
        let result = await fetch('http://localhost:5000/product/' + params.id, {
            method: 'Put',
            body: JSON.stringify({ name, price, category, company }),
            headers: {
                'Content-Type': 'application/json',

                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`

            }
        })
        result = await result.json()
        navigate('/')
        if (!name || !company || !category || !price) {
            setError(true)
            return false
        }
    }

    return (
        <div>
            <h1>Update Product</h1>

            <input className="form-control" type="text" placeholder="Enter name" style={{ width: '50%' }} value={name} onChange={(e) => setName(e.target.value)} />
            {error && !name && <span className="form-control-error">Enter valid name</span>}
            <br />
            <input className="form-control" type="text" placeholder="Enter price" value={price} onChange={(e) => setPrice(e.target.value)} />
            {error && !price && <span className="form-control-error">Enter valid price</span>}

            <br />
            <input className="form-control" type="text" placeholder="Enter category" value={category} onChange={(e) => setCategory(e.target.value)} />
            {error && !category && <span className="form-control-error">Enter category name</span>}

            <br />
            <input className="form-control" type="text" placeholder="Enter company" value={company} onChange={(e) => setCompany(e.target.value)} required />
            {error && !company && <span className="form-control-error">Enter price name</span>}

            <br />

            <button type="button" className="btn btn-primary" onClick={updateProduct}>Submit</button>
        </div>
    )
}

export default UpdateProduct;

