const API_KEY = `C45YZBJ2BWSUEUOSEANMBQL2ECBAWRQABC1JMT5I3YQNZFZK`;

const SECRET = `1Q5XXPGWAO0VP1EQKSKYZTXIHI0QZN5JVOKVSULZ0EIETZUS`;

const URL = `https://api.foursquare.com/v2/venues/search?client_id=${API_KEY}&client_secret=${SECRET}&v=20180613`;

export const getInfo = (venue) => (
    fetch(`${URL}&intent=match&name=${venue.name}&ll=${venue.position.lat},${venue.position.lng}`)
        .then(data => data.json())
        .then(res => {
            const infoFull = res.response.venues[0];
            
            const info = {
                category: infoFull.categories[0].name,
                address: infoFull.location.address,
                postal: infoFull.location.postalCode,
                city: infoFull.location.city,
                country: infoFull.location.country
              };

            return info;
        })
);