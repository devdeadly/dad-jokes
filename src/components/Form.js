import React, { Component } from 'react';
import Button from './Button';
import axios from 'axios';
import AlertContainer from 'react-alert';
import ReactPhoneInput from 'react-phone-input-2';

class Form extends Component {
  
  state = {
    phone: '+1',
    name: ''
  };
  
  alertOptions = {
    offset: 14,
    theme: 'dark',
    time: 10000,
    transition: 'scale'
  }

  onSubmit = (e) => {
    e.preventDefault();
    let { name, phone } = this.state;
    if(name && phone) {
      axios.post('/api', {
        name: this.state.name,
        phone: this.state.phone.replace(/\D+/g, '')
      })
        .then(obj => {
          if(obj.data === 'Invalid Number'){
            this.msg.error((<p>error! check ur number</p>), {
              icon: <img src="/static/images/error.png" />
            });
          } else {
            this.msg.success((<p>joke sent:<br /><br />{obj.data.joke.toLowerCase()}</p>), {
              icon: <img src="/static/images/success.png" />
            });
            this.setState(() => ({
              phone:'+1',
              name: '',
            }));
          }
        });
    } else {
      // if no number has been entered
      if(!this.state.phone){
        this.msg.error((<p>u forgot the number...</p>), {
          icon: <img src="/static/images/error.png" />
        });
        return;
      }
      if(!this.state.name){
        this.msg.error((<p>u have no name?!</p>), {
          icon: <img src="/static/images/error.png" />
        });
        return;
      }
    }
  };
  
  onNameChange = (e) => {
    e.persist();
    this.setState(() => ({
      name: e.target.value
    }));
  }
  
  onPhoneChange = (phone) => {
    this.setState(()=>({phone}))
  };

  render() {
    return (
      <div>
        <form id="form" onSubmit={this.onSubmit}>
          <div className="input-container">
            <input 
              type="text" 
              className="name-input"
              placeholder="ur name"
              value={this.state.name}
              onChange={this.onNameChange}
            />
            <ReactPhoneInput 
              id="phoneInput"
              defaultCountry={'us'}
              onChange={this.onPhoneChange}
              value={this.state.phone}
            />
          </div>
          <Button title="nu fone hu dis" type="submit" />
        </form>
        <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
      </div>
    );
  }
}

export default Form;