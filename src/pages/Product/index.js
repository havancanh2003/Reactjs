import React, { useEffect, useState } from 'react';
import axios from 'axios';
import className from "classnames/bind";
import style from "./Product.module.scss";
import { MdDone } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import AddProductModal from './../../components/ModalComponents/AddProductModal/index';
import UpdateProduct from './../../components/ModalComponents/UpdateProduct/index';

const cx = className.bind(style);

const Product = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalUpdate, setisModalUpdate] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://localhost:7091/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
      }
    };
  
    fetchProducts();
  }, []);
  const fetchProducts = async (searchQuery = '') => {
    try {
        const response = await axios.get(`https://localhost:7091/api/products/searchProducts?nameOrCode=${searchQuery}`);
        setProducts(response.data);
    } catch (error) {
        console.error('Có lỗi khi lấy danh sách sản phẩm:', error);
    }
};

const handleSearch = (e) => {
    const query = e.target.value;
    setSearchTerm(query);
    fetchProducts(query); // Gọi API với query tìm kiếm
};

  const handleDetailClick = (productId) => {
    setSelectedProductId(productId);
    setisModalUpdate(true); // Mở modal khi nhấn nút chi tiết
};

const closeModal = () => {
    setisModalUpdate(false); // Đóng modal
    setSelectedProductId(null); // Reset ID sản phẩm đã chọn
};

const handleDelete = async (productId) => {
  if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      try {
          await axios.delete(`https://localhost:7091/api/products/${productId}`);
          setProducts((prevProducts) => prevProducts.filter(product => product.id !== productId));
      } catch (error) {
          console.error('Có lỗi khi xóa sản phẩm:', error);
      }
  }
};

  return (
    <div className={cx("product-list")}>
      <div className={cx("infor-container")}>
        <h2>Quản Lý Đơn Hàng</h2>
        <input
          style={{
            width: "300px",
            borderRadius: "5px",
            padding: "5px 10px",
            border: "1px solid #dbd4d4",
            marginBottom: "10px",
          }}
          type="text"
          placeholder="Tìm kiếm sản phẩm theo tên hoặc mã code..."
          value={searchTerm}
          onChange={handleSearch} // Gọi hàm handleSearch khi người dùng gõ
        />
        <button
          onClick={() => setIsModalOpen(true)}
          className={cx("btn-create")}
        >
          Tạo mới
        </button>
      </div>
      <AddProductModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
      />
      <table>
        <thead>
          <tr>
            <th>Mã Sản Phẩm</th>
            <th>Tên Sản Phẩm</th>
            <th>Giá Mua</th>
            <th>Giá Bán</th>
            <th>Thuế</th>
            <th>Trạng Thái</th>
            <th>Ngày Tạo</th>
            <th>Cập nhật</th>
            <th>Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.productCode}</td>
              <td>{product.productName}</td>
              <td>
                {product.purchasePrice} {product.unit}
              </td>
              <td>
                {product.sellingPrice} {product.unit}
              </td>
              <td>{product.taxRatePaid}%</td>
              <td>{product.isActive ? <MdDone /> : <IoMdClose />}</td>
              <td>{new Date(product.createdDate).toLocaleDateString()}</td>
              <td>
                {product.updatedDate !== "0001-01-01T00:00:00"
                  ? new Date(product.updatedDate).toLocaleDateString()
                  : ""}
              </td>
              <td>
                <button
                  onClick={() => handleDetailClick(product.id)}
                  className={cx("action-button")}
                >
                  <FaEdit /> Chi tiết
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className={cx("action-button")}
                >
                  <FaTrashAlt /> Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalUpdate && (
        <UpdateProduct
          isOpen={isModalUpdate}
          productId={selectedProductId}
          onRequestClose={closeModal}
        />
      )}
    </div>
  );
};

export default Product;
