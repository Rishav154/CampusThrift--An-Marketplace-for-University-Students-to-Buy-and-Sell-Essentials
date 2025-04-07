"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { formatDistanceToNow } from "date-fns"

function ChatList() {

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Messages</h1>

      {chats.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-500 mb-4">You don't have any messages yet.</p>
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
            {chats.map((chat) => (
              <Link
                key={chat.id}
                to={`/chat/${chat.id}`}
                className="block p-4 hover:bg-gray-50 transition duration-300"
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    {chat.product && chat.product.image_url ? (
                      <img
                        src={chat.product.image_url || "/placeholder.svg"}
                        alt={chat.product.name}
                        className="w-12 h-12 object-cover rounded-md"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center">
                        <span className="text-gray-500">No img</span>
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {chat.otherUser ? chat.otherUser.full_name : "Unknown User"}
                      </p>
                      {chat.lastMessage && (
                        <p className="text-xs text-gray-500">
                          {formatDistanceToNow(new Date(chat.lastMessage.created_at), {
                            addSuffix: true,
                          })}
                        </p>
                      )}
                    </div>

                    <p className="text-sm text-gray-500 truncate">
                      {chat.product ? `About: ${chat.product.name}` : "No product"}
                    </p>

                    <p className="text-sm text-gray-600 mt-1 truncate">
                      {chat.lastMessage
                        ? chat.lastMessage.sender_id === user.id
                          ? `You: ${chat.lastMessage.content}`
                          : chat.lastMessage.content
                        : "No messages yet"}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ChatList

