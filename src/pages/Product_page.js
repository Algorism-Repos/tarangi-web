import React, { useState, useEffect } from "react";
import axios from "axios";

// Images
import down_arrow from '../assets/Products/down_arrow.png'

// Component
import Product_Filter from "../components/Product_filter";
import Product_Listing from "./Product_Listing";

function Product_page() {

    const [product, setProduct] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedPrices, setSelectedPrices] = useState([]);
    const [sortOption, setSortOption] = useState("Latest");
    const SortOptions = [
        "Price High to Low",
        "Price Low to High",
    ];
    const productList = async () => {
        try {
            const response = await axios.get(
                "https://tarangi-website.de.r.appspot.com/api/shopify/products"
            );
            setProduct(response.data);
        } catch (error) {
            console.error(
                "Error fetching products:",
                error.response?.data || error.message
            );
        }
    };
    console.log(product);
    const categorizedProducts = product.reduce((acc, product) => {
        const type = product.product_type || "Uncategorized";
        if (!acc[type]) acc[type] = [];
        acc[type].push({
            id: product.id,
            title: product.title,
            image: product.image?.src,
            price: product.variants?.[0]?.price,
            vendor: product.vendor,
            created_at: product.created_at,
        });
        return acc;
    }, {});
    console.log("-------categorizedProducts-------", categorizedProducts)
    const handleFilterChange = (categories = [], prices = []) => {
        setSelectedCategories(categories);
        setSelectedPrices(prices);
        let filtered = product;
        if (categories.length > 0) {
            filtered = filtered.filter((p) =>
                categories.includes(p.product_type || "Uncategorized")
            );
        }
        if (prices.length > 0) {
            filtered = filtered.filter((p) => {
                const price = Number(p.variants?.[0]?.price);
                return prices.some((range) => price >= range.min && price <= range.max);
            });
        }
        filtered = sortProducts(filtered, sortOption);
        setFilteredProducts(filtered);
    };
    const sortProducts = (products, sortBy) => {
        const sorted = [...products];
        if (sortBy === "Latest") {
            sorted.sort(
                (a, b) =>
                    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
            );
        } else if (sortBy === "Price High to Low") {
            sorted.sort(
                (a, b) =>
                    Number(b.variants?.[0]?.price) - Number(a.variants?.[0]?.price)
            );
        } else if (sortBy === "Price Low to High") {
            sorted.sort(
                (a, b) =>
                    Number(a.variants?.[0]?.price) - Number(b.variants?.[0]?.price)
            );
        } else if (sortBy === "Featured") {
        }
        return sorted;
    };
    const handleSortChange = (option) => {
        setSortOption(option);
        const sorted = sortProducts(filteredProducts, option);
        setFilteredProducts(sorted);
    };
    console.log(filteredProducts);
    useEffect(() => {
        productList();
    }, []);
    useEffect(() => {
        const sorted = sortProducts(product, sortOption);
        setFilteredProducts(sorted);
        // setFilteredProducts(product);
    }, [product, sortOption]);
    return (
        <>
            <div className="bg-[#FFF5E8] py-[50px] relative">

                {/* Heading */}
                <div className="max-w-[1350px] mx-auto flex flex-wrap justify-between px-4">

                    <div className="lg:flex flex-wrap items-center gap-x-[18px]">
                        <h2 className="font-atteron text-[26px] text-primary sm:text-[36px]">Our Collections</h2>
                        {/* <p className="font-poppins text-font-grey text-[14px] sm:mt-3 sm:text-[16px]">30 Designs</p> */}
                    </div>

                    {/* Drop down */}
                    <div className="lg:flex items-center gap-4 bg-light-sandal p-4 rounded-md hidden">

                        <label className="font-poppins text-font-grey text-[18px]">Sort by</label>

                        <div className="relative" >
                            <select className="appearance-none border w-[155px] border-[#B9B9B9] rounded-md p-2.5 bg-white text-font-grey text-[14px] cursor-pointer outline-none " onChange={(e) => handleSortChange(e.target.value)} >
                                {SortOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                            <div className=" absolute right-1.5 top-2.5">
                                <img src={down_arrow} alt="Down Arrow" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters */}

                <div className="max-w-[1350px] mx-auto lg:flex gap-x-[40px] my-[50px]">
                    <Product_Filter
                        productCatergory={categorizedProducts}
                        onFilterChange={handleFilterChange}
                        selectedCategories={selectedCategories}
                        selectedPrices={selectedPrices}
                        onSortChange={handleSortChange}
                    />
                    <Product_Listing productCatergory={filteredProducts} />


                </div>



            </div>
        </>
    );
}

export default Product_page;