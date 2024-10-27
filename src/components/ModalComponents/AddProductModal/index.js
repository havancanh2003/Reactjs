
import React, { useState } from 'react';
import Modal from 'react-modal'; // Chỉ sử dụng nếu bạn cài react-modal
import className from "classnames/bind";
import style from "./AddProductModal.module.scss";
import axios from 'axios';

const cx = className.bind(style);
Modal.setAppElement('#root'); // Để cho accessibility

const AddProductModal = ({ isOpen, onRequestClose }) => {
    const [productName, setProductName] = useState('');
    const [purchasePrice, setPurchasePrice] = useState('');
    const [sellingPrice, setSellingPrice] = useState('');
    const [taxRate, setTaxRate] = useState(10);
    const [unit, setUnit] = useState("vnd");
    const [isActive, setIsActive] = useState(true);

    const handleSubmit = async  (e) => {
        e.preventDefault();
        const requestBody = {
            productName: productName,
            unit: unit, 
            purchasePrice: Number(purchasePrice), 
            sellingPrice: Number(sellingPrice), 
            taxRatePaid: taxRate, 
            isActive: isActive 
        };
        
        try {
            const response = await axios.post('https://localhost:7091/api/products', requestBody);
            console.log('Sản phẩm đã được tạo:', response);
            resetForm();
            window.location.reload();
        } catch (error) {
            console.error('Có lỗi xảy ra khi tạo sản phẩm:', error);
        }
    };

    const resetForm = () =>{
        setProductName('');
        setPurchasePrice('');
        setSellingPrice('');
        setTaxRate(10);
        setIsActive(true);
        onRequestClose();
    }

    return (
        <Modal 
            isOpen={isOpen} 
            onRequestClose={onRequestClose}
            className={cx("add-product-modal")}
            overlayClassName={cx("modal-overlay")}
        >
            <h2>Thêm Sản Phẩm Mới</h2>
            <form onSubmit={handleSubmit}>
                <div className={cx("form-group")}>
                    <label>Tên Sản Phẩm</label>
                    <input 
                        type="text" 
                        value={productName} 
                        onChange={(e) => setProductName(e.target.value)} 
                        required 
                    />
                </div>
                <div className={cx("form-group")}>
                    <label>Giá Mua</label>
                    <input 
                        type="number" 
                        value={purchasePrice} 
                        onChange={(e) => setPurchasePrice(e.target.value)} 
                        required 
                    />
                </div>
                <div className={cx("form-group")}>
                    <label>Giá Bán</label>
                    <input 
                        type="number" 
                        value={sellingPrice} 
                        onChange={(e) => setSellingPrice(e.target.value)} 
                        required 
                    />
                </div>
                <div className={cx("form-group")}>
                    <label>Đơn vị tính</label>
                    <input 
                        style={{backgroundColor: '#F1F2F3'}}
                        type="text" 
                        value={unit} 
                        readOnly
                        required 
                    />
                </div>
                <div className={cx("form-group")}>
                    <label>Thuế</label>
                    <select value={taxRate} onChange={(e) => setTaxRate(Number(e.target.value))} required>
                        <option value={8}>8%</option>
                        <option value={10}>10%</option>
                    </select>
                </div>

                <div className={cx("form-group")}>
                    <label>Trạng Thái</label>
                    <select value={isActive} onChange={(e) => setIsActive(e.target.value === 'true')}>
                        <option value={true}>Kích Hoạt</option>
                        <option value={false}>Không Kích Hoạt</option>
                    </select>
                </div>
                <button className={cx("btn-create")} type="submit">Tạo Mới</button>
                <button className={cx("btn-create")} type="button" onClick={() => {resetForm()}}>Đóng</button>
            </form>
        </Modal>
    );
};

export default AddProductModal;
