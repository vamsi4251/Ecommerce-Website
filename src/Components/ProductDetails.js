import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { getProductById } from '../fetcher';
import styled from 'styled-components';






const ProductDetails = () => {
    const [product, setProduct] = useState({errorMessage: '', data: {}});
    const {productId} = useParams();

    useEffect(()=>{
        const fetchData = async () =>{
        const responseObject =await getProductById(productId);
        setProduct(responseObject);
        }
    fetchData();
    },[productId]);

    const createMarkup = () =>{
        return { __html: product.data?.description };
    }

    return (
    <>
    <ProductInfoArticle>
        <ProductTitle className="category-product-title">
            {product.data.title}
        </ProductTitle>
        <figure>
            <ProductImageContainer className="category-product-image-container">
                <ProductImage src={`/assets/${product.data.image}`} alt={product.data.title} />
            </ProductImageContainer>
        </figure>
        <aside>
            <ProductInfo className="category-product-info-dimensions">
                <ProductInfoHeader>Dimensions</ProductInfoHeader>
                <label>{product.data.specs?.dimensions}</label>
            </ProductInfo>
            {product.data.specs?.capacity &&
            <ProductInfo className="category-product-info-capacity">
                <ProductInfoHeader>Capacity</ProductInfoHeader>
                <label>{product.data.specs?.capacity}</label>
            </ProductInfo>
            }

            <ProductInfo className="category-product-info-features">
                <ProductInfoHeader>Features</ProductInfoHeader>
                <ul>
                    {product.data.features?.map((f, i)=>{
                        return <ProductInfoListItem key={`feature${i}`}>{f}</ProductInfoListItem>
                    })}
                </ul>
            </ProductInfo>
        </aside>
        <aside className='category-product-finance'>
            <ProductInfoFinancePrice className="category-product-finance-price">
                &pound;{product.data.price}
            </ProductInfoFinancePrice>
            <ProductInfoStock className="category-product-info-stock">
                <ProductInfoStockLabel>Stock level : {product.data.stock}</ProductInfoStockLabel>
                <ProductInfoStockLabel>Free Delivery</ProductInfoStockLabel>
            </ProductInfoStock>
            <ProductInfoAction className="category-product-action">
                <ProductInfoActionButton>Add to Basket</ProductInfoActionButton>
            </ProductInfoAction>
        </aside>

        <ProductInfoDescription dangerouslySetInnerHTML={createMarkup()}></ProductInfoDescription>
    </ProductInfoArticle>
    </>
)
}

export default ProductDetails





const ProductInfoArticle = styled.article`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 0.25fr 1fr 0.25fr;
    column-gap: 20px;
`;

const ProductInfoDescription = styled.div`
    grid-column: 1 / span 3;
`;

const ProductTitle = styled.div`
    grid-column: 1 / span 3;
    color: darkslategray;
    font-weight: bold;
    font-size: 1.5em;
    padding-left: 10px;
`;

const ProductImageContainer = styled.div`
    padding: 10px;
    width: 60%;
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