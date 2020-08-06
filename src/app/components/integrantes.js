import React, {Component} from 'react';

class Integrantes extends Component{
    constructor(props){
        super(props);
        this.state = {
          members: []
        }
      }
    componentDidMount(){
        this.handleAddMember();
    }
      handleAddMember(){
        console.log("si cambia el estado");
        fetch('/api/task/groups')
        .then(res=>res.json(res))
        .then(data=>{
            var miembros = data[data.length-1].members;
            console.log(miembros)
            this.setState({
                members: miembros,
            })           
        })
        /*this.setState({
           members: this.props.estado
        })*/
        
      }

    render(){
        <div><h1>prueba</h1></div>
        this.state.members.map(member=> {
        return(
            <div>
                    
                    <div className="input-field col s8">
					{member.member}    <br/>
                    </div>
                    <div className="input-field col s4">
                        <button onClick = {this.personalidad}type="submit" className="btn light-blue darken-4">
                            Ver personalidad
                        </button>
                    
                </div>
            </div>
        )})
        return(
            <div>
                <div className="row">

                </div>
            </div>
        )
        
    }

}
export default Integrantes;