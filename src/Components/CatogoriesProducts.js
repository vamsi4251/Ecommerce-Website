import React, { useContext } from 'react';

import { Link , useNavigate} from 'react-router-dom'

import styled from 'styled-components';
import { CartContext } from '../Contexts/CartContext';


const ProductInfoArticle = styled.article`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 0.25fr 1fr 0.25fr;
    column-gap: 20px;
`;


const ProductTitle = styled.div`
    grid-column: 1/span 3;
    color: darkslategray;
    font-weight: bold;
    font-size: 1.5em;
    padding-left: 10px;
`;

const ProductImageContainer = styled.div`
    padding: 10px;
    width: 60px
`;

const ProductImage = styled.img`
    width: 100%;
    height: 100%;
`;

const ProductInfo = styled.div`
    display: flex;
    flex-direction: column;
`;

const ProductInfoHeader = styled.h3`
    color: darkslategray;
    font-size: 1em;
    font-weight: bold;
    padding-top: 10px;
    padding-bottom: 5px;
`;

const ProductInfoListItem = styled.li`
    padding-top: 5px;
`;

const ProductInfoStock = styled.div`
    padding-left: 10px;
    margin-top: 20px;
    padding-top: 10px;
    background-color: lightgrey;
    height: 20%;
    width: 30%;
    border-radius: 5px;
    font-weight: bold;
    display: flex;
    flex-direction: column;
`;

const ProductInfoStockLabel = styled.label`
    padding-bottom: 5px;
`;

const ProductInfoAction = styled.div`
    display: flex;
    flex-direction: column;
`;

const ProductInfoActionButton = styled.button`
    width: 160px;
    height: 30px;
    border-radius: 10px;
    margin-top: 20px;
    background-color: lightgray;
    border: solid 1px slategrey;
    font-weight: bold;
`;

const ProductInfoFinancePrice = styled.div`
    color: darkslategray;
    font-size: 2em;
    font-weight: bold;
    padding-top: 10px;
`;




const CatogoriesProducts = ({id, title, image, specs, features, price,stock}) => {
    
    const navigate = useNavigate();
    const cardContext = useContext(CartContext);
    const {addProduct} = cardContext;


    return (
    <>
    <ProductInfoArticle>
        <ProductTitle>
            <Link to={`/products/${id}`}>{title}</Link>
        </ProductTitle>
        <figure>
            <ProductImageContainer className="category-product-image-container">
                <ProductImage src={`/assets/${image}`} alt={title} />
            </ProductImageContainer>
        </figure>
        <aside>
            <ProductInfo className="category-product-info-dimensions">
                <ProductInfoHeader>Dimensions</ProductInfoHeader>
                <label>{specs.dimensions}</label>
            </ProductInfo>
            {specs.capacity &&
            <ProductInfo className="category-product-info-capacity">
                <ProductInfoHeader>Capacity</ProductInfoHeader>
                <label>{specs.capacity}</label>
            </ProductInfo>
            }

            <ProductInfo className="category-product-info-features">
                <ProductInfoHeader>Features</ProductInfoHeader>
                <ul>
                    {features?.map((f, i)=>{
                        return <ProductInfoListItem key={`feature${i}`}>{f}</ProductInfoListItem>
                    })}
                </ul>
            </ProductInfo>
        </aside>
        <aside className='category-product-finance'>
            <ProductInfoFinancePrice className="category-product-finance-price">
                &pound;{price}
            </ProductInfoFinancePrice>
            <ProductInfoStock className="category-product-info-stock">
                <ProductInfoStockLabel>Stock level : {stock}</ProductInfoStockLabel>
                <ProductInfoStockLabel>Free Delivery</ProductInfoStockLabel>
            </ProductInfoStock>
            <ProductInfoAction className="category-product-action">
                <ProductInfoActionButton onClick={() => navigate(`products/${id}`)}>View Product</ProductInfoActionButton>
                <ProductInfoActionButton onClick={() => addProduct({id, title, price})}>Add to Basket</ProductInfoActionButton>
            </ProductInfoAction>
        </aside>
    </ProductInfoArticle>
    </>
  )
}

export default CatogoriesProducts