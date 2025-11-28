import React from "react";
import "../styles/ProductsTable.css";

const ProductsTable = () => {
  const products = [
    {
      id: 1,
      name: "MacBook Pro 15",
      details:
        'معالج M2 (8-core CPU), Apple, شاشة 13.6" بدقة 2560×1664, ذاكرة 16GB, 256 GB SSD',
      image: "https://placehold.co/50x50/B0BEC5/FFFFFF?text=Lap",
    },
    {
      id: 2,
      name: "iPhone 15",
      details:
        'معالج A17 Pro, شاشة 6.1" OLED بدقة 2556×1179, معدل تحديث حتى 120Hz',
      image: "https://placehold.co/50x50/64B5F6/FFFFFF?text=Phn",
    },
    {
      id: 3,
      name: "iPad Pro",
      details:
        "جهاز لوحي فائق القوة بمعالج M4, شاشة 12.9\" OLED, ذاكرة 16GB, تخزين حتى 2 TB",
      image: "https://placehold.co/50x50/FF8A65/FFFFFF?text=Tab",
    },
  ];

  return (
    <div className="products-page-container">
      <div className="max-w-4xl w-full mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center px-2">
          <h1 className="text-xl font-bold text-gray-800">
            المنتجات التي يقدمها المصنع <span className="text-red-500">*</span>
          </h1>
        </div>

        {/* Card Container */}
        <div className="card-container">
          {/* Action Bar */}
          <div className="flex justify-end p-4 border-b border-gray-100 items-center">
            <button className="color-add-button font-semibold py-2 px-6 rounded-lg shadow-md hover:opacity-90">
              إضافة منتج
            </button>
          </div>

          {/* Products Table */}
          <table className="product-table">
            <thead>
              <tr>
                <th className="w-1/12">صورة المنتج</th>
                <th className="w-2/12">إسم المنتج</th>
                <th className="w-4/12">التفاصيل</th>
                <th className="w-1/12 text-center">الإجراء</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>
                    <div className="product-image-container">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="product-image"
                      />
                    </div>
                  </td>
                  <td>{product.name}</td>
                  <td>{product.details}</td>
                  <td className="text-center">
                    <div className="flex justify-center space-x-2 space-x-reverse text-gray-400">
                      {/* Edit Icon */}
                      <span className="action-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M11.528 2.94775H4.8951C4.39249 2.94775 3.91046 3.14742 3.55506 3.50282C3.19966 3.85822 3 4.34025 3 4.84286V18.1086C3 18.6112 3.19966 19.0932 3.55506 19.4486C3.91046 19.804 4.39249 20.0037 4.8951 20.0037H18.1608C18.6634 20.0037 19.1455 19.804 19.5009 19.4486C19.8563 19.0932 20.0559 18.6112 20.0559 18.1086V11.4757"
                            stroke="#8E8E8E"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M17.569 2.5924C17.946 2.21544 18.4572 2.00366 18.9903 2.00366C19.5234 2.00366 20.0347 2.21544 20.4117 2.5924C20.7886 2.96935 21.0004 3.48062 21.0004 4.01372C21.0004 4.54682 20.7886 5.05809 20.4117 5.43505L11.8714 13.9763C11.6464 14.2011 11.3684 14.3656 11.0631 14.4548L8.34081 15.2507C8.25927 15.2745 8.17284 15.2759 8.09057 15.2549C8.00829 15.2338 7.9332 15.191 7.87314 15.1309C7.81308 15.0709 7.77028 14.9958 7.7492 14.9135C7.72812 14.8312 7.72954 14.7448 7.75333 14.6633L8.54927 11.9409C8.63884 11.6359 8.80372 11.3583 9.02873 11.1336L17.569 2.5924Z"
                            stroke="#8E8E8E"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      {/* Delete Icon */}
                      <span className="action-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M6.5625 22C5.90937 22 5.35046 21.7717 4.88575 21.3152C4.42104 20.8586 4.18829 20.3091 4.1875 19.6667V4.5H3V2.16667H8.9375V1H16.0625V2.16667H22V4.5H20.8125V19.6667C20.8125 20.3083 20.5801 20.8578 20.1154 21.3152C19.6507 21.7725 19.0914 22.0008 18.4375 22H6.5625ZM18.4375 4.5H6.5625V19.6667H18.4375V4.5ZM8.9375 17.3333H11.3125V6.83333H8.9375V17.3333ZM13.6875 17.3333H16.0625V6.83333H13.6875V17.3333Z"
                            fill="#8E8E8E"
                          />
                        </svg>
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Fixed Footer */}
      <div className="fixed-footer">
        <button className="color-primary-dark fixed-footer-button">إضافة</button>
      </div>
    </div>
  );
};

export default ProductsTable;
