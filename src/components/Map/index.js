import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const handleApiLoaded = (map, maps) => {
  // use map and maps objects
};

export default class MapIndex extends Component {

  constructor(props) {
    super(props);
    this.state = {
      estados: [],
      cidades: [],
      estado_id: null,
      json: null,
      coordinates: {}
    };
  }

  componentDidMount() {
    // states
    fetch('http://'+window.location.hostname+':'+window.location.port+'/files/states/estados.json')
    .then(response => response.json())
    .then(estados => this.setState({ estados }))
    .catch(e => null)
  }

  cities(value) {
    // cities
    this.setState({ estado_id: value })
    fetch('http://'+window.location.hostname+':'+window.location.port+`/files/cities/${value}.json`)
    .then(response => response.json())
    .then(cidades => this.setState({ cidades }))
    .catch(e => null);
  }

  map(event) {
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${event.target.value}+${this.state.estado_id}&key=AIzaSyDggEocyvwSWXzvd-x5x1u3alER12PZCyY`)
    .then(response => response.json())
    .then(json => {
      console.log(json['results'][0].geometry.location)
      this.setState({coordinates: {...json['results'][0].geometry.location}})
      // this.setState({ json })
    }).catch(e => null)
  }

  static defaultProps = {
    center: {
      lat: -11.3516308,
      lng: -63.3349612
    },
    zoom: 4
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div className="container mt-5 mb-5">
        <form>
          <div className="form-group">
            <div className="row">
              <div className="col-md-6">
                <label htmlFor="">Estados:</label>
                <select className="form-control" onChange={(e) => this.cities(e.target.value)}>
                  <option>Selecionar</option>
                  {this.state.estados.map((estado, key) => <option key={key} value={ estado.id }>{ estado.nome }</option>)}
                </select>
              </div>
              <div className="col-md-6">
                <label htmlFor="">Cidades:</label>
                <select className="form-control" onChange={(e) => this.map(e)}>
                  <option>Selecionar</option>
                    {
                      this.state.cidades.map((cidade, key) => (
                        <option key={key} value={ cidade.nome }>{ cidade.nome }</option>
                      ))
                    }
                </select>
              </div>
            </div>
          </div>
        </form>
        <div style={{ height: '100vh', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyDYN8FnJph09sQDKcR9zPgoQTpFJ-J1gIU' }}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
          >
            {Object.keys(this.state.coordinates).length > 0}<AnyReactComponent
              lat={this.state.coordinates.lat}
              lng={this.state.coordinates.lng}
              text=<div><img src="https://png.pngtree.com/svg/20170505/7b67d2699c.svg" width="50px"/></div>
            />
          </GoogleMapReact>
        </div>
      </div>
    );
  }
}

// AIzaSyDYN8FnJph09sQDKcR9zPgoQTpFJ-J1gIU
// AIzaSyDggEocyvwSWXzvd-x5x1u3alER12PZCyY
