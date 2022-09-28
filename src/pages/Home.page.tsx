import { useEffect } from 'react';
import Header from '../features/product/components/Header.components';
import ProductComponent from '../features/product/components/Product.component';
import { getProducts } from '../features/product/productSlice';
import { useAppSelector, useAppDispatch } from '../hooks/redux/hooks';

const HomePage = () => {
  const { cart, products } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <div>
      <Header />
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '48px',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '48px',
        }}
      >
        {products.length > 0 &&
          products.map((product) => <ProductComponent key={product._id} product={product} />)}
      </div>
    </div>
  );
};

export default HomePage;
