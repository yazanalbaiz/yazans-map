const API_KEY = `C45YZBJ2BWSUEUOSEANMBQL2ECBAWRQABC1JMT5I3YQNZFZK`;

const SECRET = `1Q5XXPGWAO0VP1EQKSKYZTXIHI0QZN5JVOKVSULZ0EIETZUS`;

const URL_AUTH = `client_id=${API_KEY}&client_secret=${SECRET}&v=20180613`;

const URL = `https://api.foursquare.com/v2/venues/`;

export const getInfo = (venue) => (
    fetch(`${URL}search?${URL_AUTH}&intent=match&name=${venue.name}&ll=${venue.position.lat},${venue.position.lng}`)
        .then(data => data.json())
        .then(res => {
            const infoFull = res.response.venues[0];
            
            const info = {
                id: infoFull.id,
                category: infoFull.categories[0].name,
                address: infoFull.location.address,
                postal: infoFull.location.postalCode,
              };

            return info;
        })
        .catch(err => err)
);

export const getPhoto = (id) => {
    if (typeof id === 'string') {
        return fetch(`${URL}/${id}/photos?${URL_AUTH}`)
        .then(data => data.json())
        .then(res => res.response.photos.items[0].prefix
            + res.response.photos.items[0].width 
            +'x'+res.response.photos.items[0].height
            +res.response.photos.items[0].suffix)
        .catch(err => err);
    } else {
        return 'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg'
    }
};