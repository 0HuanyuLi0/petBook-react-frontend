import React, { Component } from "react";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// require('dotenv').config()
class CloudinaryUploadWidget extends Component {

  componentDidMount() {
    var myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: "huanyuli",
        uploadPreset: "y3prair4"
      },
      (error, result) => {
        if (!error && result && result.event === "success") {

          this.props.url(result.info.url)
          console.log("Done! Here is the image info: ", result.info.url);
        }
      }
    );



    document.getElementById("upload_widget").addEventListener(
      "click",
       ()=> myWidget.open()
      ,
      false
    );
  }



  render() {
    return (
      
      <button id="upload_widget" className="cloudinary-button">
        <CloudUploadIcon/>
      </button>
     
      
    );
  }
}

export default CloudinaryUploadWidget;
