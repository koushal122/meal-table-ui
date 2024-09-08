import React, { useEffect, useState } from 'react'
import HeadingText from '../headingTexts'
import './index.scss'
import { mainDishProducts, products } from '../../Constants/constants'
import { starterProduct } from '../../Constants/constants'
import { dessertsProduct } from '../../Constants/constants'
import ProductItem from '../productItem'
import genericInterface from '../../Util/genericInterface'
import * as constants from './constants.js'
import Loader from '../loader/index.js'

const ProductMenu = (props) => {  
  const { itemLimit} = props;    
  const [tags,setTags] = useState([]);
  const [products,setProducts] = useState([]);  
  const [activeMenuTag,setActiveMenuTag]=useState(null); 
  const getAllProductApi= genericInterface(constants.GET_ALL_PRODUCTS_ENDPOINT);
  const getSpecificProductApi= genericInterface(constants.GET_SPECFIC_TYPE_PRODUCTS_ENDPOINT+activeMenuTag);
  const getAllTagsApi = genericInterface(constants.GET_ALL_TAGS_ENDPOINT);
  const [loading,setLoading]= useState(false);

    const fetchAllTags =  async () => {
        const response = await getAllTagsApi.read();
        if (response.data) {
            setTags(response.data);
            setActiveMenuTag(response.data[0]);  // Set the first tag as active
        }
    }

    const fetchProduts = async () =>{
        if (activeMenuTag) {
            setLoading(true);
            const response = await getSpecificProductApi.read();
            setLoading(false);
            setProducts(response.data);
          }
    }

    useEffect(()=>{
       fetchAllTags();
    },[]);

    useEffect(()=>{
        fetchProduts();
    },[activeMenuTag]);

  return (
    <div>
        <div className="product-menu-heading">
            <HeadingText heading1="Discover" heading2="Our Products"/>
        </div>
        <div className="product-menu-body">
            <div className="menu-type">
                {
                    tags.map((tag,index)=>{
                        return <button onClick={()=>{setActiveMenuTag(tag)}} className={`menu-type-option ${activeMenuTag===tag?"active-menu-type":""}`} key={index}>{tag}</button>
                    })
                }
            </div>
           <div className="menu-items-container">
                {
                    loading ? <Loader size='large'/> :
                    products.map((product,index)=>{
                        if(itemLimit && index>=itemLimit) return null;
                        return <ProductItem key={index} Item={product} className="menu-items"/>
                    })
                }
            </div>
        </div>
    </div>
  )
}

export default ProductMenu