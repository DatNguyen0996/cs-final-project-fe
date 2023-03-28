import React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

function CreateProductFields({
  register,
  fileInput,
  handleFile,
  productTypeLogic,
  isSubmitting,
  name,
  errors,
}) {
  return (
    <>
      <div className="body">
        <div>
          <div className="common-infor wrapper">
            <p>Thông tin chung</p>
            <div className="box-input">
              <div className="field-wrapper">
                <label htmlFor="inputProductName">Tên sản phẩm:</label>
                <input
                  id="inputProductName"
                  type="text"
                  {...register(`name`)}
                />
              </div>

              <div className="field-wrapper">
                <label htmlFor="inputCode">Mã sản phẩm:</label>
                <input id="inputCode" type="text" {...register(`code`)} />
              </div>

              <div className="field-wrapper">
                <label htmlFor="inputBrand">Thương hiệu:</label>
                <input id="inputBrand" type="text" {...register(`brand`)} />
              </div>

              <div className="field-wrapper">
                <label htmlFor="inputPrice">Giá thành:</label>
                <input id="inputPrice" type="number" {...register(`price`)} />
              </div>

              <div className="field-wrapper">
                <label htmlFor="inputGender">Giới tính:</label>
                <select id="inputGender" {...register(`gender`)}>
                  <option value="">---</option>
                  <option value="bold">Cả nam và nữ</option>
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                </select>
              </div>

              <div className="field-wrapper">
                <label htmlFor="inputSaleOff">Khuyến mãi (%):</label>
                <input
                  id="inputSaleOff"
                  type="number"
                  {...register(`saleOff`)}
                />
              </div>
            </div>

            <div className="description-wrapper">
              <div className="field-wrapper">
                <label htmlFor="inputImage">Hình ảnh:</label>
                <input
                  id="inputImage"
                  type="file"
                  ref={fileInput}
                  onChange={handleFile}
                />
              </div>
              <div className="field-wrapper">
                <label htmlFor="inputDescription">Mô tả:</label>
                <textarea
                  id="inputDescription"
                  type="text"
                  {...register(`description`)}
                />
              </div>
            </div>
          </div>
          {productTypeLogic !== "racket" ? (
            <></>
          ) : (
            <div className="specification wrapper">
              <p>Thông số kỹ thuật</p>
              <div className="box-input">
                <>
                  <div className="field-wrapper">
                    <label htmlFor="inputLevelOfPlay">Trình độ chơi:</label>
                    <select id="inputLevelOfPlay" {...register(`levelOfPlay`)}>
                      <option value="">---</option>
                      <option value="Nhập môn">Nhập môn</option>
                      <option value="Nghiệp dư">Nghiệp dư</option>
                      <option value="Bán chuyên">Bán chuyên</option>
                      <option value="Chuyên Nhiệp">Chuyên Nhiệp</option>
                      <option value="Cao thủ">Cao thủ</option>
                    </select>
                  </div>

                  <div className="field-wrapper">
                    <label htmlFor="inputPlayStyle">Phong cách chơi:</label>
                    <select id="inputPlayStyle" {...register(`playStyle`)}>
                      <option value="">---</option>
                      <option value="Công thủ toàn diện">
                        Công thủ toàn diện
                      </option>
                      <option value="Tấn Công">Tấn Công</option>
                      <option value="Phòng thủ">Phòng thủ</option>
                    </select>
                  </div>

                  <div className="field-wrapper">
                    <label htmlFor="inputFormality">Nội dung chơi:</label>
                    <select id="inputFormality" {...register(`formality`)}>
                      <option value="">---</option>
                      <option value="Cả đơn và đôi">Cả đơn và đôi</option>
                      <option value="Đánh đơn">Đánh đơn</option>
                      <option value="Đánh đôi">Đánh đôi</option>
                    </select>
                  </div>

                  <div className="field-wrapper">
                    <label htmlFor="inputHardness">Độ cứng đũa:</label>
                    <select id="inputHardness" {...register(`hardness`)}>
                      <option value="">---</option>
                      <option value="Yếu">Yếu</option>
                      <option value="Trung bình">Trung bình</option>
                      <option value="Cứng">Cứng</option>
                      <option value="Siêu cứng">Siêu cứng</option>
                    </select>
                  </div>

                  <div className="field-wrapper">
                    <label htmlFor="inputBalancedPoint">Điểm cân bằng:</label>
                    <select
                      id="inputBalancedPoint"
                      {...register(`balancedPoint`)}
                    >
                      <option value="">---</option>
                      <option value="Nhẹ đầu">Nhẹ đầu</option>
                      <option value="Hơi nhẹ đầu">Hơi nhẹ đầu</option>
                      <option value="Cân bằng<">Cân bằng</option>
                      <option value="Hơi nặng đầu">Hơi nặng đầu</option>
                      <option value="Nặng đầu">Nặng đầu</option>
                    </select>
                  </div>

                  <div className="field-wrapper">
                    <label htmlFor="inputWeight">Trọng lượng:</label>
                    <select id="inputWeight" {...register(`weight`)}>
                      <option value="">---</option>
                      <option value="2U">2U</option>
                      <option value="2U5">2U5</option>
                      <option value="3U">3U</option>
                      <option value="3U5">3U5</option>
                      <option value="4U">4U</option>
                      <option value="4U5">4U5</option>
                      <option value="5U">5U</option>
                      <option value="5U5">5U5</option>
                    </select>
                  </div>
                </>
              </div>
            </div>
          )}
        </div>
      </div>
      <Stack sx={{ width: "100%" }} spacing={1}>
        {errors.name && (
          <Alert severity="warning">{errors.name?.message}</Alert>
        )}
        {errors.code && (
          <Alert severity="warning">{errors.code?.message}</Alert>
        )}
        {errors.brand && (
          <Alert severity="warning">{errors.brand?.message}</Alert>
        )}
        {errors.price && (
          <Alert severity="warning">{errors.price?.message}</Alert>
        )}
        {errors.saleOff && (
          <Alert severity="warning">{errors.saleOff?.message}</Alert>
        )}
      </Stack>

      <div className="btn">
        <button>{isSubmitting ? "Đang gửi..." : name}</button>
      </div>
    </>
  );
}

export default CreateProductFields;
