require('./PageTest.less');
import Form from "react-jsonschema-form";
import {Modal} from "react-bootstrap";
import RestReader from "../../components/rest_reader";
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


const ThumbView=(props)=><div>{props.data?JSON.stringify(props.data,null,2):"new"}</div>

const browser=(props)=>{
    const ThumbView=props.thumbView;
    const keyField=props.keyField;
    console.log('ThumbView',props.data)
    return (<div className="browser">
                    <div onClick={()=>PubSub.publish('create')} className="new"><ThumbView/></div>
                    {props.data.map((d,i)=><div key={i} onClick={()=>PubSub.publish('update',d[keyField])} className="old"><ThumbView data={d}/></div>)}
            </div>)
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
            <RestReader view={browser} url={url} thumbView={ThumbView} keyField={keyField}/>
          </div>
          </Modal>
        </div>
      </div>
    );
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


