import React, { useState } from "react";
// import pin from "./../../Assets/pin.png";
import "./AutoComplete.scss";
import GooglePlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-google-places-autocomplete";
import { withTranslation } from "react-i18next";

const AutoComplete = (props) => {
  const [address, setAddress] = useState(null);
  const [coordinates, setCoordinates] = React.useState({
    lat: null,
    lng: null,
  });

  const { t } = props;

  const handleSelect = async (place) => {
    const results = await geocodeByAddress(place.description);
    const latLng1 = await getLatLng(results[0]);
    const city = place?.terms.slice(-3)[0]?.value;
    const statename = place?.terms.slice(-2)[0]?.value;
    const countryName = place?.terms.slice(-1)[0]?.value;
    const placeZipcode = results[0].address_components.slice(-1)[0].short_name;
    const { lat, lng } = latLng1;
    const latLng = await getLatLng(results[0]);
    setAddress(place);
    setCoordinates(latLng);
    console.log("latLng", latLng.lat);
    localStorage.setItem("placelat", latLng.lat);
    localStorage.setItem("placelong", latLng.lng);

    if (props.setCoordinates) {
      props.setCoordinates(latLng);
    } else if (props.setProfileinfo) {
      props.setProfileinfo({
        ...props.Profileinfo,
        anotherAddress: place.description,
      });

      // }else if(props.setAdd){
      //   props.setAdd({
      //     ...props.Profileinfo,anotherAddress:place.description
      //   })
    } else if (props.id === "mobileAutocomplete") {
      props.mobilePopup("Calender");
    } else if (props.setfamilydata) {
      props.setfamilydata((prevState) => ({
        ...prevState,

        address: {
          ...prevState.address,
          city: city,
          country: countryName,
          state: statename,
          street: place.description,
        },
        location: {
          ...prevState.location,
          coordinates: [lat, lng],
          type: "Point",
        },
      }));
    } else if (props.id === "signup") {
      props.setSignupform((prevState) => ({
        ...prevState,
        zip: placeZipcode && placeZipcode.length > 4 ? placeZipcode : "",
        location: {
          ...prevState.location,
          address: {
            ...prevState.location.address,
            street: place.description,
            city: city,
            state: statename,
            zipCode: placeZipcode && placeZipcode.length > 4 ? placeZipcode : "",
            country: countryName,
          },
          geocode: {
            ...prevState.location.geocode,
            coordinates: [lat, lng],
          },
        },
      }));
      props.setlocationerror();
    }
    if(true){
      "location" :{
        "coordinates":[7.385044,78.486671]
    },
     "address" :{
          "street": "Hyderabad, Telangana, India",
    "city": "Hyderabad",
    "state": "Telangana",
    "country": "India",
    "zipCode": "500018"
     },
    }

  };

  const { street } = props.Addressdata?.location.address ?? {};

  return (
    <div className="AutocompletePlace-container">
      <GooglePlacesAutocomplete
        apiKey="AIzaSyCzj_ngf9JwrP93BG8jNoeFMfNv4ik6n5A"
        placeholder={props.placeholder ? props.placeholder : t("address")}
        initialValue={
          (props.setCoordinates &&
            localStorage.getItem("PlaceName") &&
            localStorage.getItem("PlaceName")) ||
          (props.Addressdata && street)
        }
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
      />
    </div>
  );
};

export default withTranslation()(AutoComplete);
