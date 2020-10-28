import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { Pie } from "react-chartjs";

const url = "http://localhost:3001/Users";

class App extends Component {
  state = {
    data: [],
    chartData: [],
    modalInserir: false,
    modalEliminar: false,
    form: {
      id: "",
      fistName: "",
      lastName: "",
      participation: "",
    },
  };

  dataGet = () => {
    axios
      .get(url)
      .then((response) => {
        this.setState({ data: response.data });
        const data = this.state.data.map((element, index) => {
          const param = {};
          param.value = parseInt(element.participation);
          param.label = element.firstName;
          return param;
        });
        this.setState({ chartData: data });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  dataPost = async () => {
    delete this.state.form.id;
    await axios
      .post(url, this.state.form)
      .then((response) => {
        this.modalInserir();
        this.dataGet();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };


  modalInserir = () => {
    this.setState({ modalInserir: !this.state.modalInserir });
  };

  handleChange = async (e) => {
    e.persist();
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    })
  };

  componentDidMount() {
    this.dataGet();
  }

  render() {
    const { form } = this.state;
    return (
      <div className="App">

<div  class="container-fluid pt-5 p-3 mb-2 bg-primary text-white pb-5 shadow-lg" style={{ color:"red" }} >
        <button
          className="btn btn-success btn-lg font-weight-bold text-uppercase"
          onClick={() => {
            this.setState({ form: null, tipoModal: "inserir" });
            this.modalInserir();
          }}
        >
          Inserir Usuario
        </button>
        </div>

        <h1 class="col pt-5">DATA</h1>
        <h4>The Lorem Ipsumrem Picsum he Lorem Ipsum</h4>

        <div class="row pt-5 px-5">
          <div class="col-6">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>FirstName</th>
                  <th>LastName</th>
                  <th>Participation</th>
                </tr>
              </thead>
              <tbody>
                {this.state.data.map((user) => {
                  return (
                    <tr>
                      <td>{user.id}</td>
                      <td>{user.firstName}</td>
                      <td>{user.lastName}</td>
                      <td>{user.participation} %</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div class="col-6">
            <Pie
              data={this.state.chartData}
              options={{
                title: "cool pie chart",
                text: "coolest data",
              }}
            />
          </div>
        </div>

        <Modal isOpen={this.state.modalInserir}>
          <ModalHeader style={{ display: "block" }}>
            <span
              style={{ float: "right" }}
              onClick={() => this.modalInserir()}
            >
              x
            </span>
          </ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label htmlFor="id">ID</label>
              <input
                className="form-control"
                type="text"
                name="id"
                id="id"
                readOnly
                onChange={this.handleChange}
                value={form ? form.id : this.state.data.length + 1}
              />
              <br />
              <label htmlFor="nome">FirstName</label>
              <input
                className="form-control"
                type="text"
                name="firstName"
                id="firstName"
                onChange={this.handleChange}
                value={form ? form.firstName : ""}
              />
              <br />
              <label htmlFor="nome">LastName</label>
              <input
                className="form-control"
                type="text"
                name="lastName"
                id="lastName"
                onChange={this.handleChange}
                value={form ? form.lastName : ""}
              />
              <br />
              <label htmlFor="Participation">participation</label>
              <input
                className="form-control"
                type="number"
                name="participation"
                id="participation"
                onChange={this.handleChange}
                value={form ? form.participation : ""}
              />
            </div>
          </ModalBody>

          <ModalFooter>
            {this.state.tipoModal == "inserir" ? (
              <button
                className="btn btn-success"
                onClick={() => this.dataPost()}
              >
                Inserir
              </button>
            ) : (
              <button
                className="btn btn-primary"
                onClick={() => this.dataPut()}
              >
                Atualizar
              </button>
            )}
            <button
              className="btn btn-danger"
              onClick={() => this.modalInserir()}
            >
              Cancelar
            </button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
export default App;


