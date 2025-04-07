"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { MessageSquare, ArrowLeft } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import toast from "react-hot-toast"

function ProductDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [seller, setSeller] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showCheckout, setShowCheckout] = useState(false)




  return (
    <div>
      <button onClick={() => navigate(-1)} className="flex items-center text-blue-600 mb-6 hover:underline">
        <ArrowLeft size={16} className="mr-1" />
        Back
      </button>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          {/* Product Image */}
          <div className="md:w-1/2">
            <img
              src={product.image_url || "/placeholder-product.jpg"}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="md:w-1/2 p-6">
            <div className="mb-4">
              <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mb-2">
                {product.category}
              </span>
              <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
              <p className="text-3xl font-bold text-blue-600 mb-4">₹{product.price.toFixed(2)}</p>

              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Description</h2>
                <p className="text-gray-700">{product.description}</p>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Seller Information</h2>
                <div className="flex items-center">
                  <div className="bg-blue-100 text-blue-800 rounded-full w-10 h-10 flex items-center justify-center font-bold mr-3">
                    {seller.full_name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium">{seller.full_name}</p>
                    <p className="text-sm text-gray-500">Listed {formattedDate}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleBuyNow}
                  disabled={product.is_sold}
                  className={`flex-1 py-3 px-4 rounded-md text-white font-medium ${
                    product.is_sold ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                  } transition duration-300`}
                >
                  {product.is_sold ? "Sold Out" : "Buy Now"}
                </button>

                <button
                  onClick={handleStartChat}
                  disabled={product.is_sold && user?.id !== seller.id}
                  className="flex-1 py-3 px-4 bg-gray-200 hover:bg-gray-300 rounded-md font-medium flex items-center justify-center transition duration-300"
                >
                  <MessageSquare size={18} className="mr-2" />
                  Chat with Seller
                </button>
              </div>

              {product.is_sold && (
                <div className="mt-4 bg-red-100 text-red-700 p-3 rounded-md text-center">This item has been sold</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showCheckout && (
        <RazorpayCheckout
          amount={product.price}
          productName={product.name}
          onSuccess={handlePaymentSuccess}
          onCancel={() => setShowCheckout(false)}
        />
      )}
    </div>
  )
}

export default ProductDetails

