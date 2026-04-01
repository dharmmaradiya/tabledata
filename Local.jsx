import React, { useState, useEffect } from "react";
import "./Local.css";

export default function Local() {
    const [formData, setFormData] = useState({
 
  
 
  productName: "",
  price: "",
  quantity: "",
   image: ""
});
    const [savedData, setSavedData] = useState([]);
    const [editData,seteditData]=useState(null)
    const [search, setSearch] = useState("");
const filteredData = savedData.filter((item) =>
 
 
  item.image.toLowerCase().includes(search.toLowerCase())    
    
);
    useEffect(() => {
        const oldData = JSON.parse(localStorage.getItem("users")) || [];
        setSavedData(oldData);
    }, []);

    function handleChange(e) {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    }

    function handleSubmit(e) {
        e.preventDefault();

        let updatedData;
        
        if(editData !=null){
        updatedData=[...savedData]
        updatedData[editData]=formData
        seteditData(null)
            
        
        }

        else{
             updatedData = [...savedData, formData];
          }
            setSavedData(updatedData);
            localStorage.setItem("users", JSON.stringify(updatedData));


        setFormData({
            name: "",
            email: "",
            password: "",
            phone: "",
            gender: "",
            checkbox: false,
            selection: ""
        });


    }

    function Delete(id){
            let ans=savedData.filter((el,i)=> i != id)
            setSavedData(ans)
            localStorage.setItem("users", JSON.stringify(ans));
            
            
}   

    function Edit(id){

           
           setFormData(savedData[id])
           seteditData(id)
    }
    return (
        <div className="container mt-5">
            <div className="card p-4 shadow">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
  <label>Product Image URL</label>
  <input
    type="text"
    name="image"
    className="form-control"
    value={formData.image}
    onChange={handleChange}
    placeholder="Enter image URL"
    required
  />
</div>
<div className="mb-3">
  <label>Product Name</label>
  <input
    type="text"
    name="productName"
    className="form-control"
    value={formData.productName}
    onChange={handleChange}
    required
  />
</div>

<div className="mb-3">
  <label>Price</label>
  <input
    type="number"
    name="price"
    className="form-control"
    value={formData.price}
    onChange={handleChange}
    required
  />
</div>
<div className="mb-3">
  <label>Quantity</label>
  <input
    type="number"
    name="quantity"
    className="form-control"
    value={formData.quantity}
    onChange={handleChange}
    required
  />
</div>
                    <button type="submit" className="btn btn-primary w-100">
                        Save
                    </button>
                </form>
            </div>
            <div className="max-w-100px mx-auto mt-8 bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold mb-4 text-center">Saved Data</h3>
                <input type="text"  placeholder="Search by name...."className="form-control mb-3" value={search}onChange={(e) => setSearch(e.target.value)}/>
                <table className="w-full border">
                    <thead>
                        <tr className="border-b ">
                                 <td className="p-2">Product</td>
                                 <td className="p-2">image</td>
                                <td className="p-2">Price</td>
                               <td className="p-2">Qty</td>
                              <td className="p-2">button</td>
                        </tr>
                    </thead>
               <tbody>
  {filteredData.map((item, index) => (
    <tr key={index} className="border-b text-center">
     
      
      <td className="p-2">{item.productName}</td>
<td className="p-2">
  <img src={item.image} alt="product" className="product-img" />
</td>
       <td className="p-2">{item.price}</td>
         <td className="p-2">{item.quantity}</td>
        
      <td className="p-2">
        <button onClick={() => Delete(index)}>Delete</button>
        <button onClick={() => Edit(index)}>Edit</button>
      </td>
    </tr>
  ))}
</tbody>
                </table>
            </div>      
        </div>
    );
}