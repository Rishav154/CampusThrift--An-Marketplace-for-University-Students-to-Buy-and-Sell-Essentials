"use client"

import { useState, useEffect } from "react"
import { Routes, Route, Link, useNavigate } from "react-router-dom"
import { Users, ShoppingBag, AlertTriangle, Home } from "lucide-react"
import AdminUsers from "./Users"
import AdminProducts from "./Products"
import AdminReports from "./Reports"

function AdminDashboard() {

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Sidebar */}
      <div className="md:w-64 bg-white rounded-lg shadow-md p-4 h-fit">
        <h2 className="text-xl font-bold mb-6">Admin Dashboard</h2>

        <nav className="space-y-2">
          <Link to="/admin" className="flex items-center p-2 rounded-md hover:bg-gray-100 transition duration-300">
            <Home size={18} className="mr-2" />
            <span>Dashboard</span>
          </Link>

          <Link
            to="/admin/users"
            className="flex items-center p-2 rounded-md hover:bg-gray-100 transition duration-300"
          >
            <Users size={18} className="mr-2" />
            <span>Users</span>
          </Link>

          <Link
            to="/admin/products"
            className="flex items-center p-2 rounded-md hover:bg-gray-100 transition duration-300"
          >
            <ShoppingBag size={18} className="mr-2" />
            <span>Products</span>
          </Link>

          <Link
            to="/admin/reports"
            className="flex items-center p-2 rounded-md hover:bg-gray-100 transition duration-300"
          >
            <AlertTriangle size={18} className="mr-2" />
            <span>Reports</span>
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center">
                      <div className="bg-blue-100 p-3 rounded-full mr-4">
                        <Users size={24} className="text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Total Users</p>
                        <p className="text-2xl font-bold">{stats.users}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center">
                      <div className="bg-green-100 p-3 rounded-full mr-4">
                        <ShoppingBag size={24} className="text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Total Products</p>
                        <p className="text-2xl font-bold">{stats.products}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center">
                      <div className="bg-red-100 p-3 rounded-full mr-4">
                        <AlertTriangle size={24} className="text-red-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Reports</p>
                        <p className="text-2xl font-bold">{stats.reports}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Link
                      to="/admin/users"
                      className="bg-blue-600 text-white p-4 rounded-md hover:bg-blue-700 transition duration-300"
                    >
                      <h3 className="font-bold mb-2">Manage Users</h3>
                      <p className="text-sm">View and manage user accounts</p>
                    </Link>

                    <Link
                      to="/admin/products"
                      className="bg-green-600 text-white p-4 rounded-md hover:bg-green-700 transition duration-300"
                    >
                      <h3 className="font-bold mb-2">Manage Products</h3>
                      <p className="text-sm">Review and moderate product listings</p>
                    </Link>
                  </div>
                </div>
              </div>
            }
          />
          <Route path="/users" element={<AdminUsers />} />
          <Route path="/products" element={<AdminProducts />} />
          <Route path="/reports" element={<AdminReports />} />
        </Routes>
      </div>
    </div>
  )
}

export default AdminDashboard

