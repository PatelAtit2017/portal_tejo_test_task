import React from 'react';
import { FormattedMessage } from 'react-intl';

import A from './A';
import Img from './Img';
import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
import Banner from './banner.jpg';
import messages from './messages';
import XLSX from 'xlsx';
import workbook from './Truck.xlsx';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import $ from "jquery";

function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}

function containsAll(needles, haystack){ 
  for(var i = 0 , len = needles.length; i < len; i++){
     if($.inArray(needles[i], haystack) == -1) return false;
  }
  return true;
}

// usage example:
class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
constructor(props) {
  super(props);
  this.state = {
    brandValue: 'Mercedes-Benz',
    modelValue: '',
    maxPower: '',
    maxrpm: '',
    maxTorque: '',
    rpm: '',
    tankSize: '',
    PowerTrain: '',
    gearbox: '',

  };
  this.brandChange = this.brandChange.bind(this);
  this.modelChange = this.modelChange.bind(this);
  this.calculateOtherFields = this.calculateOtherFields.bind(this);
}
  brandChange(event, index, value){
  this.setState({
          brandValue: value
          }, function(){
            this.calculateOtherFields();
  })
  }
  modelChange(event, index, value){
  this.setState({
          modelValue: value
          }, function(){
            this.calculateOtherFields();
  })
  }
  calculateOtherFields(){
  for(var i=1; i<9; i++){
    if(containsAll([this.state.brandValue, this.state.modelValue], workbook[0].data[i])){
      this.setState({maxPower: workbook[0].data[i][2] })
      this.setState({maxrpm: workbook[0].data[i][3] })
      this.setState({maxTorque: workbook[0].data[i][3] })
      this.setState({rpm: workbook[0].data[i][4] })
      this.setState({tankSize: workbook[0].data[i][5] })
      this.setState({PowerTrain: workbook[0].data[i][6] })
      this.setState({gearbox: workbook[0].data[i][7] })
      break;
    }
    if(i === 8){
      this.setState({maxPower: '' })
      this.setState({maxrpm: '' })
      this.setState({maxTorque: '' })
      this.setState({rpm: '' })
      this.setState({tankSize: '' })
      this.setState({PowerTrain: '' })
      this.setState({gearbox: '' })
    }
  }
  }
  render() {
    var brand=[]
    var model = []
    for(var i=1; i<9; i++){
      brand.push(workbook[0].data[i][0])
      model.push(workbook[0].data[i][1])
    }
    var brand_unique = brand.filter( onlyUnique );
    var model_unique = model.filter( onlyUnique ); 

    return (
      <div>
        <label>Brand</label>
        <DropDownMenu value={this.state.brandValue} onChange={this.brandChange}>
          {brand_unique.map((i) => {
            return (<MenuItem value={i} key={i} primaryText={i} />)
          })}
        </DropDownMenu>
        <br />
        <label>Model</label>
        <DropDownMenu value={this.state.modelValue} onChange={this.modelChange}>
          {model_unique.map((i) => {
            return (<MenuItem value={i} key={i} primaryText={i} />)
          })}
        </DropDownMenu>
        <br />
        <br />
        <TextField
            hintText="Max Power (hp):"
            value = {this.state.maxPower}
        /><br />
        <TextField
            hintText=" @rpm max:"
            value = {this.state.maxrpm}
        /><br />
        <TextField
            hintText=" Max Torque (Nm):"
            value = {this.state.maxTorque}
        /><br />
        <TextField
            hintText=" @rpm:"
            value = {this.state.rpm}
        /><br />
        <TextField
            hintText=" Tank size (L):"
            value = {this.state.tankSize}
        /><br />
        <TextField
            hintText=" Power train:"
            value = {this.state.PowerTrain}
        /><br />
        <TextField
            hintText=" Gearbox:"
            value = {this.state.gearbox}
        /><br />  
      </div>
    );
  }
}

export default Header;
