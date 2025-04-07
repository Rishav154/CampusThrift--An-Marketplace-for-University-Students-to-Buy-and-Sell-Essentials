"use client"

import { useState, useEffect, useRef } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { Send, ArrowLeft } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import toast from "react-hot-toast"

function Chat() {

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-[calc(100vh-12rem)]">
        {/* Chat Header */}
        <div className="bg-blue-600 text-white p-4">
          <div className="flex items-center">
            <button
              onClick={() => navigate("/chats")}
              className="mr-2 hover:bg-blue-700 p-1 rounded-full transition duration-300"
            >
              <ArrowLeft size={20} />
            </button>

            <div>
              <h2 className="font-semibold">{otherUser ? otherUser.full_name : "Chat"}</h2>
              {product && <p className="text-sm text-blue-200">About: {product.name}</p>}
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 my-8">
              <p>No messages yet</p>
              <p className="text-sm">Start the conversation by sending a message</p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => {
                const isCurrentUser = message.sender_id === user.id

                return (
                  <div key={message.id} className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-xs md:max-w-md rounded-lg p-3 ${
                        isCurrentUser ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
                      }`}
                    >
                      <p>{message.content}</p>
                      <p className={`text-xs mt-1 ${isCurrentUser ? "text-blue-200" : "text-gray-500"}`}>
                        {formatDistanceToNow(new Date(message.created_at), {
                          addSuffix: true,
                        })}
                      </p>
                    </div>
                  </div>
                )
              })}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Message Input */}
        <div className="p-4 border-t">
          <form onSubmit={handleSendMessage} className="flex">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={sending}
            />
            <button
              type="submit"
              disabled={sending || !newMessage.trim()}
              className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition duration-300 disabled:opacity-50 flex items-center"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>

      {/* Product Card */}
      {product && (
        <div className="mt-6 bg-white rounded-lg shadow-md p-4">
          <h3 className="font-semibold mb-2">About this item</h3>
          <div className="flex">
            <div className="w-16 h-16 mr-4">
              <img
                src={product.image_url || "/placeholder-product.jpg"}
                alt={product.name}
                className="w-full h-full object-cover rounded-md"
              />
            </div>
            <div>
              <h4 className="font-medium">{product.name}</h4>
              <p className="text-blue-600 font-bold">₹{product.price.toFixed(2)}</p>
              <Link to={`/product/${product.id}`} className="text-sm text-blue-600 hover:underline">
                View Product
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Chat

