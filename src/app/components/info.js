import React, { Component } from 'react';

class Info extends Component {

    constructor(props) {
        super(props);
        this.state = {
            responsabilidad : '',
            neuroticismo: '',
            AperturaAlCambio: '',
            extroversion : '',
            amabilidad: ""
            
        };

        this.cambiar= this.cambiar.bind(this);
        this.obtenerInformacion= this.obtenerInformacion.bind(this);
    };
    componentDidMount(){
        this.obtenerInformacion();
    }
    obtenerInformacion(){
        fetch('api/task/members/')
        .then(res=> res.json(res))
        .then(data=>{
            //var id = data[data.length-1]._id;
            var id=this.props.estadoId;
            console.log(id);
            fetch('api/task/members/'+ id, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res=>res.json(res))
            .then(data2=>{
            console.log(data2);
            var numeroApertura = JSON.parse(data2.personality.personality[0].raw_score);
            console.log(data2[data2.length-1]);
            var numeroResponsabilidad = JSON.parse(data2.personality.personality[1].raw_score);
            var numeroExtroversion = JSON.parse(data2.personality.personality[2].raw_score);
            var numeroAmabilidad= JSON.parse(data2.personality.personality[3].raw_score);
            var numeroNeurocitismo = JSON.parse(data2.personality.personality[4].raw_score);
            
            
            this.setState({AperturaAlCambio: Math.trunc(numeroApertura*100) });
            this.setState({responsabilidad:Math.trunc(numeroResponsabilidad*100) });
            this.setState({extroversion:Math.trunc(numeroExtroversion*100) });
            this.setState({amabilidad:Math.trunc(numeroAmabilidad*100) });
            this.setState({neuroticismo:Math.trunc(numeroNeurocitismo*100) });
            })
        })
        
    }

    cambiar(){
        this.props.metodoEquipo();
    }
       
        
        
    

    render(){
        return (
            <div>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <div class="container">
                <div class="p-t-40 p-b-40  text-center">
                    
                        <h2 class="text-center">
                        Observa tus cualidades y caracteristicas de tu personalidad</h2>
</div>
            </div>
        <div >
        <div class="container">
            <div class="p-t-60 p-b-50 ">
                <div class="row feature-list">
                    <div class="col-md-3 ">
                        <h4 class="custom-font title">
                            Resposabiliad</h4>
                        <h1 class="custom-font">
                            <span class="number-animator" data-value="4500" data-animation-duration="800">{this.state.responsabilidad+ "%"}</span></h1>
                        <div class="col-md-8 no-padding">
                            <div class="progress transparent progress-small no-radius ">
                                <div class="progress-bar progress-bar-black animated-progress-bar " data-percentage="79%">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <h4 class="custom-font title">
                            Neuroticismo</h4>
                        <h1 class="custom-font">
                            <span class="number-animator" data-value="376" data-animation-duration="800">{this.state.neuroticismo+ "%"}</span></h1>
                        <div class="col-md-8 no-padding">
                            <div class="progress transparent progress-small no-radius no-margin">
                                <div class="progress-bar progress-bar-black animated-progress-bar" data-percentage="45%">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <h4 class="custom-font title">
                            Apertura al cambio</h4>
                        <h1 class="custom-font">
                            <span class="number-animator" data-value="19,500" data-animation-duration="800">{this.state.AperturaAlCambio + "%"}</span></h1>
                        <div class="col-md-8 no-padding">
                            <div class="progress transparent progress-small no-radius no-margin">
                                <div class="progress-bar progress-bar-black animated-progress-bar" data-percentage="12%">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <h4 class="custom-font title">
                            Amabilidad</h4>
                        <h1 class="custom-font">
                            <span class="number-animator" data-value="19,500" data-animation-duration="800">{this.state.amabilidad + "%"}</span></h1>
                        <div class="col-md-8 no-padding">
                            <div class="progress transparent progress-small no-radius no-margin">
                                <div class="progress-bar progress-bar-black animated-progress-bar" data-percentage="12%">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <h4 class="custom-font title">
                            Extroversion</h4>
                        <h1 class="custom-font">
                            <span class="number-animator" data-value="19,403" data-animation-duration="800">{this.state.extroversion+ "%"}</span></h1>
                        <div class="col-md-8 no-padding">
                            <div class="progress transparent progress-small no-radius no-margin">
                                <div class="progress-bar progress-bar-black animated-progress-bar" data-percentage="85%">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <center><button  type="submit" onClick={this.cambiar} className="btn light-blue darken-4">Regresar</button></center>
    
    <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
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
        )};
};
export default Info; 