require('./PageTest.less');
import Form from "react-jsonschema-form";

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

  render() {
    const {_id} = this.state;
    const {title}=this.props.schema;
    const {$id}=this.props.idSchema;

    return (
      <div>
      <Label label={title} required={this.props.required} id={$id} />
        <div id={$id} >
          <input type="text" value={_id} onChange={this.onChange.bind(this)} />
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


