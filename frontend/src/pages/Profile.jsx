"use client"

import { useState, useEffect } from "react"
import { formatDistanceToNow } from "date-fns"
import toast from "react-hot-toast"

function Profile() {

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6">My Profile</h1>

          <Tabs defaultValue="profile">
            <TabsList className="mb-6">
              <TabsTrigger value="profile">Profile Information</TabsTrigger>
              <TabsTrigger value="listings">My Listings</TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="full_name"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={user.email}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100"
                      disabled
                    />
                    <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="university" className="block text-sm font-medium text-gray-700 mb-1">
                      University
                    </label>
                    <input
                      type="text"
                      id="university"
                      name="university"
                      value={formData.university}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex space-x-4">
                    <button
                      type="submit"
                      className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition duration-300"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
                      <p className="mt-1 text-lg">{profile.full_name}</p>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Email</h3>
                      <p className="mt-1 text-lg">{user.email}</p>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Phone Number</h3>
                      <p className="mt-1 text-lg">{profile.phone || "Not provided"}</p>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-gray-500">University</h3>
                      <p className="mt-1 text-lg">{profile.university || "Not provided"}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
                  >
                    Edit Profile
                  </button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="listings">
              {loadingListings ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : myListings.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">You haven't listed any products yet.</p>
                  <a
                    href="/create-listing"
                    className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
                  >
                    Create Your First Listing
                  </a>
                </div>
              ) : (
                <div className="space-y-4">
                  {myListings.map((listing) => (
                    <div key={listing.id} className="border rounded-lg p-4 flex flex-col md:flex-row">
                      <div className="md:w-1/4 mb-4 md:mb-0">
                        <img
                          src={listing.image_url || "/placeholder-product.jpg"}
                          alt={listing.name}
                          className="w-full h-32 object-cover rounded-md"
                        />
                      </div>
                      <div className="md:w-3/4 md:pl-4 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h3 className="text-lg font-semibold">{listing.name}</h3>
                            <span
                              className={`text-xs px-2 py-1 rounded-full ${
                                listing.is_sold ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
                              }`}
                            >
                              {listing.is_sold ? "Sold" : "Available"}
                            </span>
                          </div>
                          <p className="text-blue-600 font-bold">₹{listing.price.toFixed(2)}</p>
                          <p className="text-sm text-gray-500">
                            Listed{" "}
                            {formatDistanceToNow(new Date(listing.created_at), {
                              addSuffix: true,
                            })}
                          </p>
                        </div>
                        <div className="flex mt-4 space-x-2">
                          <button
                            onClick={() => handleMarkAsSold(listing.id, listing.is_sold)}
                            className={`text-xs px-3 py-1 rounded-md ${
                              listing.is_sold
                                ? "bg-green-600 text-white hover:bg-green-700"
                                : "bg-red-600 text-white hover:bg-red-700"
                            } transition duration-300`}
                          >
                            Mark as {listing.is_sold ? "Available" : "Sold"}
                          </button>
                          <button
                            onClick={() => handleDeleteListing(listing.id)}
                            className="text-xs px-3 py-1 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition duration-300"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default Profile

