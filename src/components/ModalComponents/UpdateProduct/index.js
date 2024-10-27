import React, { useEffect, useState } from 'react';
import axios from 'axios';
import className from "classnames/bind";
import style from "./UpdateProductModal.module.scss";
import  Modal  from 'react-modal';

const cx = className.bind(style);
Modal.setAppElement('#root'); 

const UpdateProduct = ({isOpen,productId, onRequestClose }) => {
    const [product, setProduct] = useState({
        productName: '',
        unit: '',
        purchasePrice: 0,
        sellingPrice: 0,
        taxRatePaid: 0,
        isActive: true,
        productCode: '' 
    });

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`https://localhost:7091/api/products/id/${productId}`);
                setProduct(response.data);
            } catch (error) {
                console.error('Có lỗi khi lấy thông tin sản phẩm:', error);
            }
        };

        fetchProduct();
    }, [productId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: name === 'isActive' ? e.target.checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        var reqBody = {
            productName: product.productName,
            unit: product.unit,
            purchasePrice: product.purchasePrice,
            sellingPrice: product.sellingPrice,
            taxRatePaid: product.taxRatePaid,
            isActive: product.isActive,
        }
        try {
            await axios.put(`https://localhost:7091/api/products/${productId}`, reqBody);
            window.location.reload();
            onRequestClose(); 
        } catch (error) {
            console.error('Có lỗi khi cập nhật sản phẩm:', error);
        }
    };

    return (
        <Modal 
            isOpen={isOpen} 
            onRequestClose={onRequestClose}
            className={cx("add-product-modal")}
            overlayClassName={cx("modal-overlay")}
        >
        <div  className={cx("update-product-modal")}>
            <h2>Cập Nhật Sản Phẩm</h2>
            <form onSubmit={handleSubmit}>
            <div className={cx("form-group")}>
                    <label>Mã Sản Phẩm</label>
                    <input
                        type="text"
                        name="code"
                        value={product.productCode}
                        readOnly 
                        style={{backgroundColor: '#F1F2F3'}}
                    />
                </div>
                <div className={cx("form-group")}>
                    <label>Tên Sản Phẩm</label>
                    <input
                        type="text"
                        name="productName"
                        value={product.productName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={cx("form-group")}>
                    <label>Đơn Vị Tính</label>
                    <input
                        type="text"
                        name="unit"
                        value={product.unit}
                        onChange={handleChange}
                        required
                        style={{backgroundColor: '#F1F2F3'}}
                        readOnly
                    />
                </div>

                <div className={cx("form-group")}>
                    <label>Giá Nhập</label>
                    <input
                        type="number"
                        name="purchasePrice"
                        value={product.purchasePrice}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={cx("form-group")}>
                    <label>Giá Bán</label>
                    <input
                        type="number"
                        name="sellingPrice"
                        value={product.sellingPrice}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={cx("form-group")}>
                    <label>Thuế</label>
                    <select
                        name="taxRatePaid"
                        value={product.taxRatePaid}
                        onChange={handleChange}
                        required
                    >
                        <option value="8">8%</option>
                        <option value="10">10%</option>
                    </select>
                </div>

                <div className={cx("form-group")}>
                    <label>Trạng Thái</label>
                    <select value={product.isActive} onChange={handleChange}>
                        <option value={true}>Kích Hoạt</option>
                        <option value={false}>Không Kích Hoạt</option>
                    </select>
                </div>
                

                <button className={cx("btn-create")} type="submit">Cập Nhật</button>
                <button className={cx("btn-create")} type="button" onClick={onRequestClose}>Hủy</button>
            </form>
        </div>
        </Modal>
    );
};

export default UpdateProduct;
