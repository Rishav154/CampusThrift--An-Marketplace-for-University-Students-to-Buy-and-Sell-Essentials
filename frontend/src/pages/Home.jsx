"use client"

import { useState, useEffect } from "react"
import { useLocation, Link } from "react-router-dom"
import { Filter, ChevronDown, ChevronUp } from "lucide-react"

// Components

const categories = [
  { id: "books", name: "Books" },
  { id: "electronics", name: "Electronics" },
  { id: "hostel-essentials", name: "Hostel Essentials" },
  { id: "stationery", name: "Stationery" },
  { id: "clothing", name: "Clothing" },
  { id: "sports", name: "Sports Equipment" },
  { id: "other", name: "Other" },
]

function Home() {
  const location = useLocation()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState("")
  const [priceRange, setPriceRange] = useState({ min: "", max: "" })
  const [sortBy, setSortBy] = useState("newest")
  const [showFilters, setShowFilters] = useState(false)

  // Get search query from URL
  const searchParams = new URLSearchParams(location.search)
  const searchQuery = searchParams.get("search") || ""
  const categoryFromUrl = searchParams.get("category") || ""

  useEffect(() => {
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl)
    }
  }, [categoryFromUrl])

  const handleCategoryChange = (category) => {
    setSelectedCategory(category === selectedCategory ? "" : category)
  }

  const handlePriceChange = (type, value) => {
    setPriceRange((prev) => ({
      ...prev,
      [type]: value,
    }))
  }

  const handleSortChange = (e) => {
    setSortBy(e.target.value)
  }

  const toggleFilters = () => {
    setShowFilters(!showFilters)
  }

  const clearFilters = () => {
    setSelectedCategory("")
    setPriceRange({ min: "", max: "" })
    setSortBy("newest")
  }

  return (
    <div>
      {/* Hero Section */}
      {!searchQuery && !selectedCategory && (
        <div className="bg-blue-600 text-white py-12 px-4 mb-8 rounded-lg">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Buy & Sell on Your Campus</h1>
            <p className="text-xl mb-6">The marketplace exclusively for university students</p>
            <Link
              to="/create-listing"
              className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-md transition duration-300"
            >
              Sell Your Item
            </Link>
          </div>
        </div>
      )}

      {/* Filter Toggle Button (Mobile) */}
      <div className="md:hidden mb-4">
        <button onClick={toggleFilters} className="flex items-center justify-between w-full bg-gray-100 p-3 rounded-md">
          <div className="flex items-center">
            <Filter size={18} className="mr-2" />
            <span>Filters & Sort</span>
          </div>
          {showFilters ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters Sidebar */}
        <div
          className={`${
            showFilters ? "block" : "hidden"
          } md:block w-full md:w-64 bg-white p-4 rounded-lg shadow-md h-fit`}
        >
          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-3">Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={category.id}
                    checked={selectedCategory === category.id}
                    onChange={() => handleCategoryChange(category.id)}
                    className="mr-2"
                  />
                  <label htmlFor={category.id}>{category.name}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-3">Price Range</h3>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                placeholder="Min"
                value={priceRange.min}
                onChange={(e) => handlePriceChange("min", e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <span>-</span>
              <input
                type="number"
                placeholder="Max"
                value={priceRange.max}
                onChange={(e) => handlePriceChange("max", e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-3">Sort By</h3>
            <select value={sortBy} onChange={handleSortChange} className="w-full p-2 border border-gray-300 rounded-md">
              <option value="newest">Newest First</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
            </select>
          </div>

          <button
            onClick={clearFilters}
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-md transition duration-300"
          >
            Clear Filters
          </button>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          {/* Search Results Header */}
          {(searchQuery || selectedCategory) && (
            <div className="mb-6">
              <h2 className="text-2xl font-bold">
                {searchQuery ? `Search results for "${searchQuery}"` : ""}
                {selectedCategory && !searchQuery
                  ? `${categories.find((c) => c.id === selectedCategory)?.name || "Category"}`
                  : ""}
                {selectedCategory && searchQuery
                  ? ` in ${categories.find((c) => c.id === selectedCategory)?.name || "Category"}`
                  : ""}
              </h2>
            </div>
          )}

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="bg-red-100 text-red-700 p-4 rounded-md">{error}</div>
          ) : products.length === 0 ? (
            <div className="bg-gray-100 p-8 rounded-lg text-center">
              <h3 className="text-xl font-semibold mb-2">No products found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
              <button
                onClick={clearFilters}
                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home

