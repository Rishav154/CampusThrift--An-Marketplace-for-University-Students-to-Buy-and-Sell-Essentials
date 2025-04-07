"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { formatDistanceToNow } from "date-fns"

function Orders() {
  const [buyerOrders, setBuyerOrders] = useState([])
  const [sellerOrders, setSellerOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error) {
    return <div className="bg-red-100 text-red-700 p-4 rounded-md">{error}</div>
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      <Tabs defaultValue="purchases">
        <TabsList className="mb-6">
          <TabsTrigger value="purchases">My Purchases</TabsTrigger>
          <TabsTrigger value="sales">My Sales</TabsTrigger>
        </TabsList>

        <TabsContent value="purchases">
          {buyerOrders.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <p className="text-gray-500 mb-4">You haven't made any purchases yet.</p>
              <Link
                to="/"
                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
              >
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="divide-y">
                {buyerOrders.map((order) => (
                  <div key={order.id} className="p-4">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/4 mb-4 md:mb-0">
                        <img
                          src={order.product?.image_url || "/placeholder-product.jpg"}
                          alt={order.product?.name}
                          className="w-full h-32 object-cover rounded-md"
                        />
                      </div>
                      <div className="md:w-3/4 md:pl-4">
                        <div className="flex justify-between items-start">
                          <h3 className="text-lg font-semibold">{order.product?.name || "Product Unavailable"}</h3>
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                            {order.status}
                          </span>
                        </div>
                        <p className="text-blue-600 font-bold">₹{order.amount.toFixed(2)}</p>
                        <p className="text-sm text-gray-500">
                          Purchased{" "}
                          {formatDistanceToNow(new Date(order.created_at), {
                            addSuffix: true,
                          })}
                        </p>
                        <p className="text-sm text-gray-500">Seller: {order.seller?.full_name || "Unknown"}</p>
                        <div className="mt-4">
                          <Link to={`/product/${order.product_id}`} className="text-blue-600 hover:underline text-sm">
                            View Product
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="sales">
          {sellerOrders.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <p className="text-gray-500 mb-4">You haven't made any sales yet.</p>
              <Link
                to="/create-listing"
                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
              >
                Create a Listing
              </Link>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="divide-y">
                {sellerOrders.map((order) => (
                  <div key={order.id} className="p-4">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/4 mb-4 md:mb-0">
                        <img
                          src={order.product?.image_url || "/placeholder-product.jpg"}
                          alt={order.product?.name}
                          className="w-full h-32 object-cover rounded-md"
                        />
                      </div>
                      <div className="md:w-3/4 md:pl-4">
                        <div className="flex justify-between items-start">
                          <h3 className="text-lg font-semibold">{order.product?.name || "Product Unavailable"}</h3>
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                            {order.status}
                          </span>
                        </div>
                        <p className="text-blue-600 font-bold">₹{order.amount.toFixed(2)}</p>
                        <p className="text-sm text-gray-500">
                          Sold{" "}
                          {formatDistanceToNow(new Date(order.created_at), {
                            addSuffix: true,
                          })}
                        </p>
                        <p className="text-sm text-gray-500">Buyer: {order.buyer?.full_name || "Unknown"}</p>
                        <div className="mt-4">
                          <Link to={`/product/${order.product_id}`} className="text-blue-600 hover:underline text-sm">
                            View Product
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Orders

