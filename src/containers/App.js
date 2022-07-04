import React, { Component } from 'react';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import Navigation from '../components/Navigation/Navigation';
import Logo from '../components/Logo/Logo';
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm';
import Rank from '../components/Rank/Rank';
import FaceRecognition from '../components/FaceRecognition/FaceRecognition';
import Signin from '../components/Signin/Signin';
import Register from '../components/Register/Register';
import './App.css';
import particlesOptions from './particlesProps';

const particlesInit = async (main) => {
  // console.log(main);
  // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
  // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
  // starting from v2 you can add only the features you need reducing the bundle size
  await loadFull(main);
};

const initialState={
  input:'',
  imageUrl:'',
  box:{},
  route: 'signin',
  isSignedIn: false,
  user:{
    id:'',
    name:'',
    email:'',
    entries:0,
    joined: ''
  }
}

class App extends Component {
  constructor(){
    super();
    this.state=initialState;
  }

  loadUser=(data)=>{
    this.setState({user:{
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  calculateFaceLocation=(data)=>{
    const clarifaiFace=data.outputs[0].data.regions[0].region_info.bounding_box;
    const image=document.getElementById('inputimage');
    const width=Number(image.width);
    const height=Number(image.height);
    return this.setState({box:{
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row*height,
      rightCol: width - (clarifaiFace.right_col*width),
      bottomRow: height - (clarifaiFace.bottom_row*height)
    }})
  }

  onInputChange=(event)=>{
    this.setState({input: event.target.value});
  }

  onButtonSubmit=()=>{
    this.setState({ imageUrl: this.state.input });
    fetch('https://beautiful-badlands-10586.herokuapp.com/imageurl', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: this.state.input
      })
    })
    .then(response=>response.json())
    .then(response=>{
      if(response){
        fetch('https://beautiful-badlands-10586.herokuapp.com/image',{
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
        })
      })
      .then(response => response.json())
      .then(count => {
        this.setState(Object.assign(this.state.user, { entries: count}))
      })
      .catch(console.log)
    }
    this.calculateFaceLocation(response);
  })
  .catch(err=>console.log(err));

  }

  onRouteChange=(route)=>{
    (route!='home'
    ?
    this.setState(initialState)
    :
    this.setState({isSignedIn: true})
    );
    this.setState({route: route})
  }

  render(){
    const { isSignedIn,imageUrl,route,box,user }= this.state;
    return (
      <div className="App">
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={particlesOptions}
        />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn}/>
        {route==='home'
        ? 
        <div>
          <Logo />
          <Rank name={this.state.user.name} entries={this.state.user.entries}/>
          <ImageLinkForm 
            onInputChange={this.onInputChange} 
            onButtonSubmit={this.onButtonSubmit}/>
          <FaceRecognition box={box} imageUrl={imageUrl}/>
        </div>
        : (route==='signin' || route==='signout'
        ?
        <Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
        :
        <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
        )
    }
      </div>
    );
}
}

export default App;
