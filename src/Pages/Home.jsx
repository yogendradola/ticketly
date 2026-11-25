
import { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Banner from '../Components/Banner.jsx'
import Category from '../Components/Category.jsx'
import EventSection from '../Components/EventSection.jsx'
import Footer from '../Components/Footer.jsx'
import Header from '../Components/Header.jsx'

const sections = [
  {
    title: 'Recommended for you',
    category: null,
    subtitle: 'A LITTLE SOMETHING FOR EVERYONE',
  },
  {
    title: 'Movies near you',
    category: 'Movies',
    subtitle: 'THE BIG SCREEN IS CALLING',
  },
  {
    title: 'Upcoming events',
    category: 'Events',
    subtitle: 'MAKE ROOM FOR A GOOD TIME',
  },
  {
    title: 'Popular concerts',
    category: 'Concerts',
    subtitle: 'FEEL IT LIVE',
  },
  {
    title: 'Sports events',
    category: 'Sports',
    subtitle: 'THE ENERGY IS UNMATCHED',
  },
  {
    title: 'Popular activities',
    category: 'Activities',
    subtitle: 'DISCOVER SOMETHING NEW',
  },
]

function Home({ events, user, onLogout }) {
  const location = useLocation()

  const [searchTerm, setSearchTerm] = useState(location.state?.search || '')
  const [selectedCategory, setSelectedCategory] = useState(location.state?.category || '')
  const [selectedLocation, setSelectedLocation] = useState(location.state?.location || 'Vijayawada')

  useEffect(() => {
    setSelectedCategory(location.state?.category || '')
    setSearchTerm(location.state?.search || '')
    
    if (location.state?.location) {
      setSelectedLocation(location.state.location)
    }
  }, [location.key])

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const query = searchTerm.trim().toLowerCase()

      const matchesQuery =
        !query ||
        [event.name, event.category, event.location, event.venue]
          .some((value) => String(value || '').toLowerCase().includes(query))

      const matchesCategory =
        !selectedCategory || event.category === selectedCategory

      const matchesLocation =
        !selectedLocation ||
        String(event.location || '').toLowerCase() === selectedLocation.toLowerCase()

      return matchesQuery && matchesCategory && matchesLocation
    })
  }, [events, searchTerm, selectedCategory, selectedLocation])

  const isFiltering = Boolean(searchTerm || selectedCategory)

  function clearFilters() {
    setSearchTerm('')
    setSelectedCategory('')
  }

  return (
    <>
      <Header
        user={user}
        onLogout={onLogout}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedLocation={selectedLocation}
        onLocationChange={setSelectedLocation}
        selectedCategory={selectedCategory}
        onCategoryChange={(category) => {
          setSelectedCategory((current) =>
            current === category ? '' : category
          )
        }}
      />

      <main>
        <div className="home-intro">
          <span>GOOD TIMES, RIGHT THIS WAY</span>
          <strong>{selectedLocation}</strong>
        </div>

        <Banner />

        <div className="home-content">
          <Category
            selectedCategory={selectedCategory}
            onSelect={(category) => {
              setSelectedCategory((current) =>
                current === category ? '' : category
              )
            }}
          />

          {isFiltering ? (
            <>
              <EventSection
                title={
                  searchTerm
                    ? `Results for "${searchTerm}"`
                    : selectedCategory
                }
                subtitle={`${filteredEvents.length} EXPERIENCES FOUND`}
                events={filteredEvents}
                actionLabel="Clear filters"
                onAction={clearFilters}
              />

              {filteredEvents.length === 0 && (
                <div className="empty-state">
                  <span>⌕</span>
                  <h2>No events found</h2>
                  <p>Try a different search or choose another city.</p>
                </div>
              )}
            </>
          ) : (
            sections.map((section) => {
              const sectionEvents = section.category
                ? filteredEvents.filter(
                    (event) => event.category === section.category
                  )
                : filteredEvents

              return (
                <EventSection
                  key={section.title}
                  title={section.title}
                  subtitle={section.subtitle}
                  events={sectionEvents}
                />
              )
            })
          )}
        </div>
      </main>

      <Footer />
    </>
  )
}

export default Home
