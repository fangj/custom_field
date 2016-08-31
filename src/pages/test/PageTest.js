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
            type: "object",
            required: ["lat", "lon"],
            properties: {
                lat: {
                    type: "number"
                },
                lon: {
                    type: "number"
                }
            }
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
    this.state = {...props.formData};
  }

  onChange(name) {
    return (event) => {
      this.setState({
        [name]: parseFloat(event.target.value)
      }, () => this.props.onChange(this.state));
    };
  }

  render() {
    const {lat, lon} = this.state;
    const {title}=this.props.schema;
    const {$id}=this.props.idSchema;

    return (
      <div>
      <Label label={title} required={this.props.required} id={$id} />
        <div id={$id} >
          <input type="number" value={lat} onChange={this.onChange("lat")} />
          <input type="number" value={lon} onChange={this.onChange("lon")} />
        </div>
      </div>
    );
  }
}

const fields = {geo: GeoPosition};

ReactDOM.render(<Form schema={schema}
     uiSchema={uiSchema}
    fields={fields}
        onChange={log("changed")}
        onSubmit={log("submitted")}
        onError={log("errors")} />, document.getElementById('App'));


