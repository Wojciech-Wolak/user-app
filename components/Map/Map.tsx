import React from 'react'
import { DivIcon } from 'leaflet';
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import { MapProps } from './Map.types'

const Map = ({lat, lng}: MapProps) => {

  const icon = new DivIcon({
    html: '<span class="map__markerIcon"></span>',
    iconSize: [20, 30],
  })

  return (
    <MapContainer className='map' center={[lat, lng]} zoom={7} scrollWheelZoom={false}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[lat, lng]} icon={icon} />
    </MapContainer>
  )
}

export default Map