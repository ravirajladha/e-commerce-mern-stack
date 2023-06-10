import React, { useState } from 'react';

const Addproduct = () => {

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const [error, setError] = useState(false)
    // const navigate = useNavigate();

    // useEffect(() => {
    //     const auth = JSON.parse(localStorage.getItem('user'));
    //     if (auth) {
    //         setUserid(auth.id); // Set userid state with auth.id
    //     } else {
    //         navigate('/');
    //     }
    // }, [navigate]);
    const collectData = async () => {
        if (!name || !company || !category || !price) {
            setError(true)
            return false
        }
        let userid = JSON.parse(localStorage.getItem('user'))
        userid = userid._id;
        // console.warn(name, email, password);
        let result = await fetch('http://localhost:5000/add-product', {
            method: 'post',
            body: JSON.stringify({ name, price, category, company, userid }),
            headers: {
                'Content-Type': 'application/json',
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`

            },

        })
        result = await result.json();
        console.warn(result)
        // localStorage.setItem('user', JSON.stringify(result));

        // if(result){
        //     navigate('/')
        // }else{

        //     console.warn('error')
        // }
    }
    return (
        <div>
            <h1>Add Product</h1>

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

            <button type="button" className="btn btn-primary" onClick={collectData}>Submit</button>
        </div>
    )
}

export default Addproduct;

