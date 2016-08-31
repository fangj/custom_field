require('./PageTest.less');
import Form from "react-jsonschema-form";
import {Modal} from "react-bootstrap";
import RestChooser from "../../components/rest_chooser";
import PubSub from 'pubsub-js';

const schema = {
    title: "Todo",
    type: "object",
    required: ["title","loc"],
    properties: {
        title: {
            type: "string",
            title: "Title",
            default: "A new task"
        },
        done: {
            type: "boolean",
            title: "Done?",
            default: false
        },
        loc: {
            title:'location',
            type: "string"
        }
    }
};

const log = (type) => console.log.bind(console, type);


const uiSchema = {
  loc:{"ui:field": "geo"}
}



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

class GeoPosition extends React.Component {
  constructor(props) {
    super(props);
    this.state = {_id:props.formData};
  }

  onChange(event) {
      var value=event.target.value;
      this.setState({
        _id: value
      }, () => this.props.onChange(value));

  }

  close(){
    this.setState({showModal:false})
  }

  render() {
    const {_id} = this.state;
    const {title}=this.props.schema;
    const {$id}=this.props.idSchema;
    const url="/api/post";
    const keyField="_id";
    return (
      <div>
      <Label label={title} required={this.props.required} id={$id} />
        <div id={$id} >
          <div className='thumb' onClick={()=>{this.setState({showModal:true})}}>empty</div>
          <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
          <div className="modal-container">
          <RestChooser  url={url} thumbView={ThumbView} keyField={keyField} 
          onChoose={this.onChoose.bind(this)}/>
          </div>
          </Modal>
        </div>
      </div>
    );
  }

  onChoose(data){
    console.log('choose',data);
    this.props.onChange(data._id)
  }
}

const fields = {geo: GeoPosition};

ReactDOM.render(<Form schema={schema}
  formData={{done : false,
loc : "88",
title: "A new task77"}}
     uiSchema={uiSchema}
    fields={fields}
        onChange={log("changed")}
        onSubmit={log("submitted")}
        onError={log("errors")} />, document.getElementById('App'));


