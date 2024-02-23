import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { bridgera_logo, profile_img } from "../assets";
import { Rating } from "react-simple-star-rating";
import ReactPaginate from "react-paginate";

const Home = () => {
  const loginData = useSelector((state) => state.login);
  const [productList, setProductList] = useState([]);
  const [filterProdList, setFilterProdList] = useState([]);
  const [searchTxt, setSearchTxt] = useState("");
  const [categories, setCategories] = useState([]);
  const [selCat, setSelCat] = useState([]);
  const [curList, setCurList] = useState([]);
  const [curPage, setCurPage] = useState(1);

  const getProdList = async () => {
    const { data } = await axios("https://fakestoreapi.com/products");
    setProductList(data);
    console.log(data);
  };

  useEffect(() => {
    const tmp = [];
    productList.forEach((el) => {
      if (tmp?.includes(el?.category)) {
      } else {
        tmp.push(el?.category);
      }
    });
    setCategories(tmp);
  }, [productList]);

  useEffect(() => {
    getProdList();
  }, []);

  //   useEffect(() => {
  // if (searchTxt?.length > 0) {
  //   const tmp = productList.filter(
  //     (e) => e?.title?.includes(searchTxt) || e?.category?.includes(searchTxt)
  //   );
  //   setFilterProdList(tmp);
  // } else {
  //   setFilterProdList(productList);
  // }
  //   }, [searchTxt, productList]);

  useEffect(() => {
    if (selCat?.length > 0) {
      let newArr = [];
      selCat?.forEach((item) => {
        const tmp = productList.filter((e) => e?.category?.includes(item));
        newArr = [...tmp, ...newArr];
      });

      setFilterProdList(newArr);
    } else {
      setFilterProdList(productList);
    }
  }, [selCat, productList]);

  const onClickCat = (item) => {
    if (item == searchTxt) {
      setSearchTxt("");
    } else {
      setSearchTxt(item);
    }
  };

  const onCheckboxClick = (e, item) => {
    console.log(e.target.checked, item);
    if (e.target.checked) {
      const tmp = [...selCat, item];
      setSelCat(tmp);
    } else {
      const tmp = [...selCat];
      const tmp2 = tmp.filter((el) => el !== item);
      setSelCat(tmp2);
    }
  };

  useEffect(() => {
    console.log(filterProdList?.length);
    console.log(Math.ceil(filterProdList?.length / 10));
    if (filterProdList?.length <= 10) {
      setCurList(filterProdList);
    } else {
      if (curPage === 1) {
        setCurList(filterProdList.slice(0, 10));
      } else {
        setCurList(filterProdList.slice((curPage - 1) * 10));
      }
      // const tmp = filterProdList?.slice()
    }
  }, [filterProdList, curPage]);

  const handlePageClick = ({ selected }) => {
    setCurPage(selected + 1);
  };

  return (
    <div>
      <div className="home-top">
        <img src={bridgera_logo} className="home-logo" alt="Logo" />
        <div className="profile">
          <p>{loginData?.name ? loginData?.name : "User"}</p>
          <img src={profile_img} className="profile-img" alt="Logo" />
        </div>
      </div>
      <div className="home-body">
        <div className="category">
          <h3>Category</h3>
          {categories?.map((item, ind) => {
            return (
              <div key={ind} className="checkbox-wrapper">
                <label>
                  <input
                    name={item}
                    type="checkbox"
                    onChange={(e) => onCheckboxClick(e, item)}
                  />
                  <p>{item}</p>
                </label>
              </div>
            );
          })}
        </div>
        <div className="list">
          {curList?.map((item) => {
            return (
              <div key={item?.id} className="single-product">
                <img src={item?.image} className="prod-img" alt="product" />
                <div>
                  <span>
                    <p>{item?.title}</p>
                    <p>{item?.category}</p>
                  </span>
                  <div className="rating">
                    <p> {item?.rating?.rate}</p>
                    <Rating
                      readonly
                      initialValue={item?.rating?.rate}
                      size={18}
                      className="stars"
                    />
                    <p> ({item?.rating?.count})</p>
                  </div>

                  <p className="price">₹{item?.price}</p>
                </div>
              </div>
            );
          })}
          <ReactPaginate
            className="paginate"
            pageClassName="page-num"
            activeClassName="page-active"
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={Math.ceil(filterProdList?.length / 10)}
            previousLabel="<"
            renderOnZeroPageCount={null}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
