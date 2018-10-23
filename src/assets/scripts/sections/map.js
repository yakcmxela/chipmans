import _ from 'lodash';
import $ from 'jquery';
import * as sections from '@shopify/theme-sections';

let config = {
  zoom: 14
};

let apiStatus = null;

let errors = {
  addressNoResults: 'No results.',
  addressQueryLimit: 'Address query limit reached.',
  addressError: 'Address error.',
  authError: 'Authentication error.'
};

let selectors = {
  section: '[data-section-type="map"]',
  map: '[data-map]',
  mapOverlay: '[data-map-overlay]'
};

let classes = {
  mapError: 'map__errors',
  errorMsg: 'map__errors-content'
};

const initApi = (container) => {
  const key = container.data('api-key');
  if (typeof key === 'undefined') {
    return;
  }

  if (apiStatus === 'loaded') {
    createMap(container);
  } else {
    if (apiStatus !== 'loading') {
      apiStatus = 'loading';
      if (typeof window.google === 'undefined') {
        $.getScript(
          'https://maps.googleapis.com/maps/api/js?key=' + key
        ).then(function() {
          apiStatus = 'loaded';
          initAllMaps(container);
        });
      }
    }
  }
}

const initAllMaps = (mapsToLoad) => {
  $.each(mapsToLoad, (index, instance) => {
    createMap($(instance));
  });
}

const geolocate = (address) => {
  var deferred = $.Deferred();
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({ address: address }, function(results, status) {
    if (status !== google.maps.GeocoderStatus.OK) {
      deferred.reject(status);
    }
    deferred.resolve(results);
  });

  return deferred;
}

const createMap = (instance) => {
  let address = instance.attr('data-address-setting');
  return geolocate(address)
    .then((results) => {
        var mapOptions = {
          zoom: config.zoom,
          center: results[0].geometry.location,
          draggable: false,
          clickableIcons: false,
          scrollwheel: false,
          disableDoubleClickZoom: true,
          disableDefaultUI: true
        };

        var mapId = instance.attr('id');

        var map = new google.maps.Map(document.getElementById(mapId), mapOptions);
        var center = map.getCenter();

        //eslint-disable-next-line no-unused-vars
        var marker = new google.maps.Marker({
          map: map,
          position: map.getCenter()
        });
      }
    )
    .fail(() => {
      var errorMessage;

      switch (status) {
        case 'ZERO_RESULTS':
          errorMessage = errors.addressNoResults;
          break;
        case 'OVER_QUERY_LIMIT':
          errorMessage = errors.addressQueryLimit;
          break;
        case 'REQUEST_DENIED':
          errorMessage = errors.authError;
          break;
        default:
          errorMessage = errors.addressError;
          break;
      }

      // Show errors only to merchant in the editor.
      if (Shopify.designMode) {
        instance
          .parent()
          .addClass(classes.mapError)
          .html(
            '<div class="' +
              classes.errorMsg +
              '">' +
              errorMessage +
              '</div>'
          );
      }
    });
}


sections.register('map', {
	onLoad: () => {
    let container = $('.map-section__container');
		initApi(container);
	}
});

