import React from "react";
import "../style/style.Footer.css";

function MainFooter() {
  return (
    <div id="footer-container">
      <div className="general box">
        <h2>THÔNG TIN CHUNG</h2>
        <p>
          <span> Bedminton Shop </span>
          là hệ thống cửa hàng cầu lông với hơn 50 chi nhánh trên toàn quốc,
          cung cấp sỉ và lẻ các mặt hàng dụng cụ cầu lông từ phong trào tới
          chuyên nghiệp
        </p>
      </div>
      <div className="contact box">
        <h2>THÔNG TIN LIÊN HỆ</h2>
        <ul>
          <li>
            Hotline: <span>096xxxxxxx</span>
          </li>
          <li>
            Email: <span>bedminton.store@gmail.com</span>
          </li>
          <li>
            Phản ánh dịch vụ: <span>096xxxxxxx</span>
          </li>
          <li>
            Hợp tác kinh doanh: <span>096xxxxxxx</span>
          </li>
        </ul>
      </div>
      <div className="service box">
        <h2>DỊCH VỤ</h2>
        <ul>
          <li>Cung cấp các mặt hàng, dụng cụ càu lông</li>
          <li>Bảo hành thiết bị/dụng cụ</li>
          <li>Sửa chửa thiết bị/dụng cụ</li>
          <li>Tổ chức giải thi đấu</li>
        </ul>
      </div>
      <div className="store box">
        <h2>HỆ THỐNG CỬA HÀNG</h2>
        <p>
          <span>50 cửa hàng </span> trên toàn quốc
        </p>
        <button>Xem tất cả các cửa hàng</button>
      </div>
    </div>
  );
}

export default MainFooter;
