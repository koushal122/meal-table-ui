import React, { useEffect, useState } from 'react'
import * as constants from './constants.js'
import genericInterface from '../../../Util/genericInterface'
import './index.scss'
import CustomModal from '../../../Components/commonModel/index.js'
import AddProductForm from './components/addProductForm/index.js'
import ProductItem from '../../../Components/productItem/index.js'
import AdminLayout from '../../../layout/adminLayout/index.js'

const Products = () => {
  const allProductsApi = genericInterface(constants.GET_ALL_PRODUCTS_ENDPOINT);
  const deleteProductApi = genericInterface(constants.DELETE_PRODUCTS_ENDPOINT);
  const [products,setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  async function fetchProducts(){
    const response = await allProductsApi.read();
    setProducts(response.data)
  }

  useEffect(()=>{
    fetchProducts();
  },[])

  const handleSave = () => {
    fetchProducts();
    setIsModalOpen(false);
  };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const deleteProduct = async(id) => {
      try {
        await deleteProductApi.put({},{productId:id});
        alert('product deleted successfully');
        fetchProducts();
      } catch (error) {
        
      }
    }

  return (
    <AdminLayout>
        <div className='header-add-button'>
         <p className='header'>Your Products</p>
         <button onClick={handleOpenModal} className='add-product'>Add Product</button>
        </div>
        <CustomModal isOpen={isModalOpen} onClose={handleCloseModal} title="Add Product">
            <AddProductForm onSave={handleSave} />
        </CustomModal>
        <div className='products-list'>
            {products.map((product) => (
                <ProductItem Item={product} key={product.id} showAddCartButton={false} showDeleteButton={true} deleteProduct={deleteProduct}/>
            ))}
        </div>
    </AdminLayout>
  )
}

export default Products