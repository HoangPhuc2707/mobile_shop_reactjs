import React, { useEffect, useState } from "react";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import { WrapperButtonMore, WrapperProducts, WrapperTypeProduct } from "./style";
import slider1 from '../../assets/images/slider1.png';
import slider2 from '../../assets/images/slider2.png';
import slider3 from '../../assets/images/slider3.png';
import slider4 from '../../assets/images/slider4.png';
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import CardComponent from "../../components/CardComponent/CardComponent";
import FooterComponent from "../../components/FooterComponent/FooterComponent";
import * as ProductService from "../../services/ProductService";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import Loading from "../../components/LoadingComponent/Loading";
import { useDebounce } from "../../hooks/useDebounce";

const HomePage = () => {
    const searchProduct = useSelector((state) => state?.product?.search)
    const searchDebounce = useDebounce(searchProduct, 500)
    const [loading, setLoading] = useState(false)
    const [limit, setLimit] = useState(8)
    const [typeProducts, setTypeProducts] = useState([])
    const fetchProductAll = async (context) => {
        const limit = context?.queryKey && context?.queryKey[1]
        const search = context?.queryKey && context?.queryKey[2]
        const res = await ProductService.getAllProduct(search, limit)
        return res
    }

    const fetchAllTypeProduct = async () => {
        const res = await ProductService.getAllTypeProduct()
        if (res?.status === 'OK') {
            setTypeProducts(res?.data)
        }
    }

    const { isPending, data: products, isPreviousData } = useQuery({
        queryKey: ['product', limit, searchDebounce],
        queryFn: fetchProductAll,
        retry: 3,
        retryDelay: 1000,
        keepPreviousData: true
    });

    useEffect(() => {
        fetchAllTypeProduct()
    }, [])

    return (
        <Loading isPending={isPending || loading}>
            <div style={{ width: '1024px', margin: '0 auto' }}>
                <WrapperTypeProduct>
                    {typeProducts.map((item) => {
                        return (
                            <TypeProduct name={item} key={item} />
                        )
                    })}
                </WrapperTypeProduct>
            </div>
            <div className='body' style={{ width: '100%', backgroundColor: '#efefef' }}>
                <div id="container" style={{ width: '1024px', height: '100%', margin: '0 auto' }}>
                    <SliderComponent arrImages={[slider1, slider2, slider3, slider4]} />
                    <WrapperProducts>
                        {products?.data?.map((product) => {
                            return (
                                <CardComponent
                                    key={product._id}
                                    countInStock={product.countInStock}
                                    description={product.description}
                                    image={product.image}
                                    name={product.name}
                                    price={product.price}
                                    rating={product.rating}
                                    type={product.type}
                                    selled={product.selled}
                                    discount={product.discount}
                                    id={product._id}
                                />
                            )
                        })}
                    </WrapperProducts>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px' }} >
                        <WrapperButtonMore
                            textbutton={isPreviousData ? 'Load more' : 'Xem thêm'}
                            type="outline"
                            styleButton={{
                                border: '1px solid rgb(11, 116, 229)',
                                color: `${products?.total === products?.data?.length ? '#ccc' : 'rgb(11, 116, 229)'}`,
                                width: '240px', height: '38px', borderRadius: '4px'
                            }}
                            isDisabled={products?.total === products?.data?.length || products?.totalPage === 1}
                            styletextbutton={{ fontWeight: '500', color: products?.total === products?.data?.length && '#fff' }}
                            onClick={() => setLimit((prev) => prev + 4)} />
                    </div>
                </div>
            </div>
            <div style={{ width: '100%', backgroundColor: '#efefef', display: 'flex', justifyContent: 'center', paddingTop: '10px', paddingBottom: '10px' }}>
                <FooterComponent />
            </div>
        </Loading>
    );
};

export default HomePage