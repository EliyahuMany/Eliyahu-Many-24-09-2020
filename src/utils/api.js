import config from '../config.json';

export const autoComplete = async (text) => {
  const params = new URLSearchParams({
    apikey: config.apikey,
    q: text,
  });

  return await fetch(
    `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?${params}`,
  ).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return {status: res.status};
    }
  });
};

export const currentConditions = async (key) => {
  const params = new URLSearchParams({apikey: config.apikey, details: true});

  return await fetch(
    `https://dataservice.accuweather.com/currentconditions/v1/${key}?${params}`,
  ).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return {status: res.status};
    }
  });
};

export const geoSearch = async (geo) => {
  const params = new URLSearchParams({
    apikey: config.apikey,
    q: `${geo.coords.latitude},${geo.coords.longitude}`,
    details: true,
  });

  return await fetch(
    `https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?${params}`,
  ).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return {status: res.status};
    }
  });
};

export const fiveDaysForecasts = async (key, metric) => {
  const params = new URLSearchParams({
    apikey: config.apikey,
    details: true,
    metric: metric === 'Metric',
  });

  return await fetch(
    `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${key}?${params}`,
  ).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return {status: res.status};
    }
  });
};
