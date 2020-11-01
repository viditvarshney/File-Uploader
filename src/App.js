import React, { Component } from "react";
import "./App.css";
import { OutTable, ExcelRenderer } from "react-excel-renderer";
import {
  Jumbotron,
  Col,
  Input,
  InputGroup,
  InputGroupAddon,
  FormGroup,
  Label,
  Button,
  Fade,
  FormFeedback,
  Container,
  Card,
} from "reactstrap";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      dataLoaded: false,
      isFormInvalid: false,
      rows: null,
      cols: null,
    };
    this.fileHandler = this.fileHandler.bind(this);
    this.toggle = this.toggle.bind(this);
    this.openFileBrowser = this.openFileBrowser.bind(this);
    this.renderFile = this.renderFile.bind(this);

    this.fileInput = React.createRef();
  }

  renderFile = (fileObj) => {
    //just pass the fileObj as parameter
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err);
      } else {
        this.setState({
          dataLoaded: true,
          cols: resp.cols,
          rows: resp.rows,
        });
      }
    });
  };

  fileHandler = (event) => {
    if (event.target.files.length) {
      let fileObj = event.target.files[0];
      let fileName = fileObj.name;
      let fileType = fileObj.type;

      console.log(fileType);
      console.log(fileName);

      //check for file extension and pass only if it is .xlsx and display error message otherwise
      if (
        fileName.slice(fileName.lastIndexOf(".") + 1) === "xlsx" ||
        fileName.slice(fileName.lastIndexOf(".") + 1) === "xls"
      ) {
        this.setState({
          uploadedFileName: fileName,
          isFormInvalid: false,
        });
        this.renderFile(fileObj);
      } else {
        this.setState({
          isFormInvalid: true,
          uploadedFileName: "",
        });
      }
    }
  };

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  openFileBrowser = () => {
    this.fileInput.current.click();
  };

  fileData = () => {
    if (this.state.fileObj) {
      return (
        <div>
          <h2>File Details:</h2>
          <p>File Name: {this.state.fileObj.name}</p>
          <p>File Type: {this.state.fileObj.type}</p>
          <p>
            Last Modified: {this.state.fileObj.lastModifiedDate.toDateString()}
          </p>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Choose before Pressing the Upload button</h4>
        </div>
      );
    }
  };

  render() {
    return (
      <div>
        <div>
          <Jumbotron className="jumbotron-background">
            <h1 className="display-3">TradeCred File Uploader</h1>
            <p className="lead">Display the file on the UI</p>

            <hr className="my-2" />
          </Jumbotron>
        </div>
        <Container>
          <form>
            <FormGroup row>
              <Label for="exampleFile" xs={6} sm={4} lg={2} size="lg">
                Upload
              </Label>
              <Col xs={4} sm={8} lg={10}>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <Button
                      color="info"
                      style={{ color: "white", zIndex: 0 }}
                      onClick={this.openFileBrowser.bind(this)}
                    >
                      <i className="cui-file"></i> Browse&hellip;
                    </Button>
                    <input
                      type="file"
                      hidden
                      onChange={this.fileHandler.bind(this)}
                      ref={this.fileInput}
                      onClick={(event) => {
                        event.target.value = null;
                      }}
                      style={{ padding: "10px" }}
                    />
                  </InputGroupAddon>
                  <Input
                    type="text"
                    className="form-control"
                    value={this.state.uploadedFileName}
                    readOnly
                    invalid={this.state.isFormInvalid}
                  />
                  <FormFeedback>
                    <Fade
                      in={this.state.isFormInvalid}
                      tag="h6"
                      style={{ fontStyle: "italic" }}
                    >
                      Please select a .xlsx or xls file only !
                    </Fade>
                  </FormFeedback>
                </InputGroup>
              </Col>
            </FormGroup>
          </form>

          {this.state.dataLoaded && (
            <div>
              <Card body outline color="secondary" className="restrict-card">
                <OutTable
                  data={this.state.rows}
                  columns={this.state.cols}
                  tableClassName="ExcelTable2007"
                  tableHeaderRowClass="heading"
                />
                {/* {this.fileData()} */}
              </Card>
            </div>
          )}
        </Container>
        <div>
          <h2>File Details:</h2>
          <p>File Name: {this.state.fileName}</p>
          <p>File Type: {this.state.fileType}</p>
          {/* <p>
              Last Modified:{" "}
              {this.state.fileObj.lastModifiedDate.toDateString()}
            </p> */}
        </div>
      </div>
    );
  }
}

export default App;
