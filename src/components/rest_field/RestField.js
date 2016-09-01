import {Modal} from "react-bootstrap";
import RestChooser from "../../components/rest_chooser";
import RestReader from "../../components/rest_reader";

function Label(props) {
  const {label, required, id} = props;
  if (!label) {
    return null;
  }
  return (
    <label className="control-label" htmlFor={id}>
      {required ? label + "*" : label}
    </label>
  );
}
const ThumbView=(props)=><div>{props.data?JSON.stringify(props.data,null,2):"new"}</div>


function restField({url,keyField,thumbView}){

    class RestField extends React.Component {
      constructor(props) {
        super(props);
        this.state = {_id:props.formData};
      }

      close(){
        this.setState({showModal:false})
      }

      render() {
        const _id = this.props.formData;
        const {title}=this.props.schema;
        const {$id}=this.props.idSchema;
        thumbView=thumbView||ThumbView;
        return (
          <div>
          <Label label={title} required={this.props.required} id={$id} />
            <div id={$id} >
              <div className='thumb' onClick={()=>{this.setState({showModal:true})}}>
                 {!_id?"+":<RestReader view={thumbView} url={url+'/'+_id}/>}
              </div>
              <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
              <div className="modal-container">
              <RestChooser  url={url} thumbView={thumbView} keyField={keyField} chosen={_id}
              onChoose={this.onChoose.bind(this)}/>
              </div>
              </Modal>
            </div>
          </div>
        );
      }

      onChoose(data){
        // console.log('choose',data);
        this.props.onChange(data._id);
        this.setState({showModal:false});
      }
    }

    return RestField;
}
module.exports = restField;
