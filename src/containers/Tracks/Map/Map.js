import React, { Component, createRef } from 'react';
import { Container } from '@material-ui/core';
import { object } from 'prop-types';
import { GOOGLE_MAP_API_KEY } from '../../../utility/apiKeys';
import classes from './Map.module.css';

let map = null;
let path = null;

class GoogleMap extends Component {
    googleMapRef = createRef();

    componentDidMount() {
        const googleMapScript = document.createElement('script');
        googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}&libraries=places`;
        window.document.body.appendChild(googleMapScript);

        googleMapScript.addEventListener('load', () => {
            this.googleMap = this.createGoogleMap();
            map = this.googleMap;
            window.google.maps.event.addDomListener(window, 'resize', () => {
                const center = map.getCenter();
                window.google.maps.event.trigger(this.googleMap, 'resize');
                map.setCenter(center);
            });
            this.addMapClickListener();
        });
    }

    componentDidUpdate() {
        const { checkpoints } = this.props;

        if (path != null) {
            path.setMap(null);
            path = null;
        }

        path = new window.google.maps.Polyline({
            path: this.drawLines(checkpoints),
            geodesic: true,
            strokeColor: 'white',
            strokeOpacity: 1.0,
            strokeWeight: 2,
        });

        path.setMap(this.googleMap);
    }

    createGoogleMap = () => new window.google.maps.Map(this.googleMapRef.current, {
        zoom: 16,
        center: {
            lat: 59.33331080609333,
            lng: 18.05421561640526,
        },
        disableDefaultUI: true,
        mapTypeId: 'hybrid',
    })


    createMarker = (lat, lng) => {
        const marker = new window.google.maps.Marker({
            position: { lat, lng },
            map: this.googleMap,
            draggable: true,
        });

        const checkpoint = {
            lat: marker.position.lat(),
            lng: marker.position.lng(),
            order: this.props.length + 1,
        };

        marker.addListener('dragend', (event) => {
            this.props.drag(checkpoint.order, event.latLng.lat(), event.latLng.lng());
        });

        this.props.addCheckpoint(checkpoint);
    }

    addMapClickListener = () => {
        map.addListener('click', (event) => {
            this.createMarker(event.latLng.lat(), event.latLng.lng());
        });
    }

    drawLines = (markers) => {
        const pathCoords = [];
        markers.forEach((marker) => {
            pathCoords.push({
                lat: marker.lat,
                lng: marker.lng,
            });
        });
        return pathCoords;
    }

    render() {
        return (
            <div
                id="google-map"
                ref={this.googleMapRef}
                className={classes.mapDiv}
            />
        );
    }
}

export default GoogleMap;
