import React, { Fragment } from 'react';
import { compose, withProps, withHandlers, withStateHandlers } from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from 'react-google-maps';
import { InfoBox } from 'react-google-maps/lib/components/addons/InfoBox';
import { SearchBox } from 'react-google-maps/lib/components/places/SearchBox';
import { googleMapsApiKey } from './../../shared/config';
import './googleMap.css';

const refs = {};

const infoBoxOptions = { closeBoxURL: '' };
let geocoder = { geocode() {} };
let markerAddress = 'google does not know this place address';

const getPlaceInfo = (position, onLocationChange) => {
  geocoder.geocode({ latLng: position }, results => {
    markerAddress = 'google does not know this place address';

    if (results && results.length > 0)
      markerAddress = results[0].formatted_address;

    onLocationChange(position, markerAddress);
  });
};

const GoogleMapComponent = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div className="map-element" />,
    containerElement: <div className="map-container" />,
    mapElement: <div className="map-element" />
  }),
  withHandlers(props => {
    return {
      onMapMounted: () => ref => {
        const { frozen, position, address, onLocationChange } = props;
        markerAddress = address;
        refs.map = ref;

        if (frozen)
          return;

        if (refs.map) {
          geocoder = new window.google.maps.Geocoder();
          getPlaceInfo(position, onLocationChange);
        }
      },
      onSearchBoxMounted: () => ref => refs.searchBox = ref
    };
  }),
  withStateHandlers(() => ({
    bounds: null,
    center: null,
    isOpenWindow: false,
    isOpenBox: false
  }), {
    onPlacesChanged: () => () => {
      const places = refs.searchBox.getPlaces();
      const bounds = new window.google.maps.LatLngBounds();

      places.forEach(place => {
        if (place.geometry.viewport) {
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });

      const nextMarkers = places.map(place => ({ position: place.geometry.location }));
      return { center: nextMarkers[0].position };
    },
    onLocationChange: (state, props) => (e) => {
      const { onLocationChange } = props;
      const position = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      };

      getPlaceInfo(position, onLocationChange);
      return { position };
    },
    onToggleOpenWindow: ({ isOpenWindow }) => () => ({ isOpenWindow: !isOpenWindow }),
    onToggleOpenBox: ({ isOpenBox }) => () => ({ isOpenBox: !isOpenBox })
  }),
  withScriptjs,
  withGoogleMap
)(({ center, position, onMapMounted, frozen, onLocationChange, onSearchBoxMounted, bounds,
  onPlacesChanged, onToggleOpenWindow, onToggleOpenBox, isOpenWindow, isOpenBox }) =>
  (
    <GoogleMap
      defaultZoom={10}
      center={center || position}
      ref={onMapMounted}
      onClick={frozen ? null : onLocationChange}>
      <SearchBox
        ref={onSearchBoxMounted}
        bounds={bounds}
        controlPosition={window.google.maps.ControlPosition.TOP_LEFT}
        onPlacesChanged={onPlacesChanged}>
        <input
          type="text"
          placeholder="Search address ..."
          className="map-search-input" />
      </SearchBox>
      <Marker
        position={position}
        onClick={onToggleOpenWindow}
        onMouseOver={onToggleOpenBox}
        onMouseOut={onToggleOpenBox}>
        <Fragment>
          {isOpenWindow &&
          <InfoWindow onCloseClick={onToggleOpenWindow}>
            <div className="map-info-window">
              {markerAddress}
            </div>
          </InfoWindow>
          }
          {!isOpenWindow && isOpenBox &&
          <InfoBox
            options={infoBoxOptions}>
            <div className="map-info-box"> Click to view details </div>
          </InfoBox>
          }
        </Fragment>
      </Marker>
    </GoogleMap>
  )
);

export default GoogleMapComponent;
