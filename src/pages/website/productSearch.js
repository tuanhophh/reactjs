import { Link,useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  addCate,
  getAllCate,
  getAllCateLimit,
  removeCate,
  editCate,
} from "../../api/categoryAPI";
import { getAllLimit, getAll, getAllSort,getProductSearch } from "../../api/productAPI";

import image from "../../components/website/assets/img/banner_img_01.jpg";
import "../../components/website/assets/css/fontawesome.min.css";
import "../../components/website/assets/css/custom.css";
import "../../components/website/assets/css/templatemo.css";
import "../../components/website/assets/css/bootstrap.min.css";
import "../../components/website/assets/img/favicon.ico";
import "../../components/website/assets/img/apple-icon.png";
import "../website/css/a.css";
import { useForm } from "react-hook-form";

export default function ProductSearch(props) {
  const {
    register,
    handleSubmit,
  } = useForm();
  const [categories, setCategories] = useState([]);
  console.log("cate", categories);
  useEffect(() => {
    const getCategory = async () => {
      try {
        const { data } = await getAllCate();
        setCategories(data);
        console.log("cate2", categories);
      } catch (error) {
        console.log(error);
      }
    };
    getCategory();
  }, []);
  const history = useHistory()
  
  const [products, setProducts] = useState([]);
  
  console.log("pro", products);
  useEffect(() => {
    const getProduct = async () => {
      try {
        const { data } = await getAll();
        setProducts(data);
        console.log("pro2", products);
      } catch (error) {
        console.log(error);
      }
    };
    getProduct();
  }, []);
 
const [productSearch, setProductSearch] = useState([]);
const onSubmit = async (value) => {   
  try {
      const { data } = await getProductSearch(value);
      setProductSearch(...productSearch,data);
      console.log(data)
      console.log(value);
  } catch (error) {
      console.log(error);
  }       
  history.push('/shop/search')

};
  return (
    <>
      <div className="container py-5 margintop">
        <div className="row">
          <div className="col-lg-3">
            <h1 className="h2 pb-4">Categories</h1>
            <ul className="list-unstyled templatemo-accordion">
              {categories.map((item, index) => (
                <div key={index}>
                  <li className="pb-3">
                    <Link
                      to={`/shop/${item.id}`}
                      className="text-decoration-none text-dark mau-text"
                    >
                      <span className="mau-text">{item.name}</span>
                    </Link>
                  </li>
                </div>
              ))}
            </ul>
          </div>
          <div className="col-lg-9">
            <div className="row">
              <div className="col-md-6">
                <ul className="list-inline shop-top-menu pb-3 pt-1">
                  <li className="list-inline-item">
                    <a
                      className="h3 text-dark text-decoration-none mr-3"
                      href="#"
                    >
                      All
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-md-6 pb-4">
                <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-group">
                
                    <div className="">
                      <input
                        type="text" name="name"
                        className="form-control"
                        {...register("name")}
                      />
                    </div>
                    <button type="submit" className="btn btn-primary">
                      <i className="fas fa-search" />
                    </button>
                  </div>
                  </form>
                  
                <div className="d-flex">
                  <select className="form-control">
                    <option>Select</option>

                    <option>Sort</option>
                    <option>Reverse</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="row">
              {}
              {products.map((item, index) => (
                <div className="col-md-4" key={index}>
                  <div className="card mb-4 product-wap rounded-0">
                    <div className="card rounded-0">
                      <img
                        className="card-img rounded-0 "
                        src={item.image}
                        width="250px"
                        height="350px"
                      />
                      <div className="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                        <ul className="list-unstyled">
                          <li>
                            <a
                              className="btn btn-success text-white"
                              href="shop-single.html"
                            >
                              <i className="far fa-heart" />
                            </a>
                          </li>
                          <li>
                            <a
                              className="btn btn-success text-white mt-2"
                              href="shop-single.html"
                            >
                              <i className="far fa-eye" />
                            </a>
                          </li>
                          <li>
                            <a
                              className="btn btn-success text-white mt-2"
                              href="shop-single.html"
                            >
                              <i className="fas fa-cart-plus" />
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="card-body">
                      <Link
                        to={`/detailProduct/${item.id}/categoryId/${item.category.id}`}
                        className="text-decoration-none text-dark mau-text"
                      >
                        <span className="mau-text">{item.name}</span>
                      </Link>
                      <ul className="w-100 list-unstyled d-flex justify-content-between mb-0">
                        <li>M/L/X/XL</li>
                        <li className="pt-2">
                          <span className="product-color-dot color-dot-red float-left rounded-circle ml-1" />
                          <span className="product-color-dot color-dot-blue float-left rounded-circle ml-1" />
                          <span className="product-color-dot color-dot-black float-left rounded-circle ml-1" />
                          <span className="product-color-dot color-dot-light float-left rounded-circle ml-1" />
                          <span className="product-color-dot color-dot-green float-left rounded-circle ml-1" />
                        </li>
                      </ul>
                      <ul className="list-unstyled d-flex justify-content-center mb-1">
                        <li>
                          <i className="text-warning fa fa-star" />
                          <i className="text-warning fa fa-star" />
                          <i className="text-warning fa fa-star" />
                          <i className="text-muted fa fa-star" />
                          <i className="text-muted fa fa-star" />
                        </li>
                      </ul>
                      <p className="text-center mb-0">{item.price}$</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
