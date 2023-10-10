// src/App.js
import React, { useEffect, useState } from 'react';
import TourDetailsCard from './tourDetailsCard';

const TextSearch = props => {
  const [tourListData, setTourListData] = useState(props.tourListData);
  const [filterOn, setFilterOn] = useState(false);
  const [filteredItems, setFilteredItems] = useState(tourListData);

  const handleSearch = query => {
    const filtered = tourListData.filter(tourDetails =>
      tourDetails.tourData.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  useEffect(() => {}, [filteredItems]);

  return (
    <div className="display-tours">
      <div className="section-white pt-0 bg-transparent">
        <div className="container">
          <div className="row mb-4">
            <div className="col-md-12 pl-md-2">
              <div className="text-search-filter">
                <label>Text Search Filter</label>{' '}
                <input
                  type="text"
                  placeholder="Search..."
                  value={''}
                  onChange={e => {
                    console.log(`**************************\n\n ${e} \n\n**************`);
                    handleSearch(e.target.value);
                  }}
                />{' '}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="section-white pt-0 bg-transparent">
        <div className="container">
          <div className="row mb-4">
            {filteredItems && !filteredItems.isError && filteredItems.tourList ? (
              <div className="col-md-12 pl-md-2">
                {filteredItems.tourList.map(tourDetail => (
                  <div className="profile-timeline-card" key={Math.random()}>
                    <div>
                      <TourDetailsCard tourDetail={tourDetail} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              'No Tours Found'
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextSearch;
