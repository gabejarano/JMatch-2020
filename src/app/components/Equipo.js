import React, {Component} from 'react';
import Integrantes from './integrantes';

class Equipo extends Component{
   

    constructor(props){
        super(props);
        this.state={
            idGrup :"",
            nameGroup : "",
            idYo: "",
            members : [],
            idMiembro: ""
        }
        this.personalidad= this.personalidad.bind(this);
        this.cambiar= this.cambiar.bind(this);
        this.resultado= this.resultado.bind(this);
        this.regresar= this.regresar.bind(this);
        this.handleInput= this.handleInput.bind(this);
      }
    
    componentDidMount(){
        this.obtenerInformacion();
    }
    obtenerInformacion(){
        fetch('/api/task/groups')
        .then(res=>res.json(res))
        .then(data=>{
            console.log(data);
            var idGrupo = data[data.length-1]._id;
            var nombreGrupo = data[data.length-1].name;
            var miembros = data[data.length-1].members;
            var id = miembros[miembros.length-1].member;
            console.log(miembros)
            this.setState({
                idGrup:idGrupo, 
                nameGroup: nombreGrupo,
                members: miembros,
                idYo :id
            })           
        }) 
        /*this.setState({
            nameGroup: this.props.estadoGrupo,
            members: this.props.estadoMiembros
        }) */
        
    };
    

    regresar(e){
        this.props.metodoRegistroEquipos()
    }
    cambiar(e){
        this.props.metodoRegistro();
    }
    personalidad(e){
        e.preventDefault();
        this.props.metodo2(this.state.idMiembro);
        console.log('----------------------------------' + this.state.idMiembro);
    }
    handleInput(e){
        const{value, name} = e.target;
        this.setState({
            [name] : value
        })
        console.log(this.state.idMiembro);
    }
    resultado(e){
        this.props.metodoResultado(this.state.idGrup);
    }
    render(){
        return(
            <div>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <div className="container">
                    <div className="row">
                        <div className="col s5">
                            <div className="row">
                                        <div className="input-field col s12">
												<h2>Grupo de desarrollo</h2>
                                            </div>
                                        </div>
                                        <div className="input-field col s8">
                                            Nombre : {this.state.nameGroup}
                                        </div>
                                        <div className="input-field col s8">
                                            Descripcion : 'Descripcion Equipo' 
                                        </div>
                                        <div className = "col s8">
                                            <button onClick= {() => this.resultado(this.state.idGrup)} className="btn light-blue darken-4">Medir rendimiento</button>
                                        </div>
                                        <div className = "col s8">
                                            <button onClick= {this.regresar} className="btn light-blue darken-4">Regresar</button>
                                        </div>
                            </div>
                        <div className="col s7">
                            <div className="card">
                                <div className="card-content">
                                    <form >
                                        <div><h1>Integrantes</h1></div>
                                        {/*<Integrantes estado = {this.state.member}/>*/}
                                        {this.state.members.map(member => { 
                                            return (
                                                <div>
                                                    
                                                    <div className="input-field col s8"  key={member.member}>
                                                       <input type="text" value={member.member} name="idMiembro" onChange={this.handleInput} /> <br />
                                                    </div>
                                                    <div className="input-field col s4">
                                                        <button onClick={this.personalidad} type="submit" className="btn light-blue darken-4">
                                                            Ver personalidad
                                                        </button>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                        
                                        
                                    </form>
                                    
                                </div>
                                <div>
                                        <button  type="submit" onClick={this.cambiar} className="btn light-blue darken-4">Realizar test</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
            </div>
        )
    }
}
export default Equipo;