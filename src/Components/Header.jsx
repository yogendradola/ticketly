
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import SearchBar from './SearchBar.jsx'

const categories = ['Movies', 'Events', 'Concerts', 'Sports', 'Activities']

function Header({
  user,
  onLogout,
  searchTerm,
  onSearchChange,
  selectedLocation,
  onLocationChange,
  selectedCategory,
  onCategoryChange,
}) {
  const navigate = useNavigate()
  const [localSearch, setLocalSearch] = useState('')
  const [localLocation, setLocalLocation] = useState('Vijayawada')

  const searchValue = searchTerm === undefined ? localSearch : searchTerm
  const locationValue = selectedLocation === undefined ? localLocation : selectedLocation

  function changeCategory(category) {
    if (onCategoryChange) {
      onCategoryChange(category)
    } else {
      navigate('/', { state: { category } })
    }
  }

  function goHome() {
    if (onCategoryChange) onCategoryChange('')
    if (onSearchChange) onSearchChange('')
    navigate('/', {
      state: {
        category: '',
        search: '',
      },
    })
  }

  function changeSearch(value) {
    if (onSearchChange) {
      onSearchChange(value)
    } else {
      setLocalSearch(value)
      navigate('/', { state: { search: value } })
    }
  }

  function changeLocation(city) {
    if (onLocationChange) {
      onLocationChange(city)
    } else {
      setLocalLocation(city)
      navigate('/', { state: { location: city } })
    }
  }

  return (
    <header className="site-header">
      <div className="header-main">
        <Link className="brand" to="/" aria-label="Ticketly home" onClick={goHome}>
          <img src="/images/logo.png" alt="" />
          <span>TICKETLY</span>
        </Link>

        <nav className="desktop-nav" aria-label="Main navigation">
          <button className="nav-link" onClick={goHome} type="button">
            Home
          </button>

          {categories.map((category) => (
            <button
              className={selectedCategory === category ? 'nav-link active' : 'nav-link'}
              key={category}
              onClick={() => changeCategory(category)}
              type="button"
            >
              {category}
            </button>
          ))}
        </nav>

        <label className="location-select">
          <span aria-hidden="true">⌖</span>
          <select
            aria-label="Select your city"
            value={locationValue || 'Vijayawada'}
            onChange={(event) => changeLocation(event.target.value)}
          >
            {['Vijayawada', 'Hyderabad', 'Bengaluru'].map((city) => (
              <option key={city}>{city}</option>
            ))}
          </select>
        </label>

        <div className="header-account">
          {user ? (
            <>
              <Link
                className="button button-quiet"
                to={user.role === 'Admin' ? '/admin' : '/dashboard'}
              >
                My account
              </Link>

              <button
                className="button button-primary"
                onClick={onLogout}
                type="button"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link className="button button-quiet" to="/login">
                Log in
              </Link>

              <Link className="button button-primary" to="/signup">
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>

      <div className="header-search">
        <nav className="mobile-nav" aria-label="Event categories">
          {categories.map((category) => (
            <button
              className={selectedCategory === category ? 'nav-link active' : 'nav-link'}
              key={category}
              onClick={() => changeCategory(category)}
              type="button"
            >
              {category}
            </button>
          ))}
        </nav>

        <SearchBar
          value={searchValue || ''}
          onChange={changeSearch}
        />
      </div>
    </header>
  )
}

export default Header
