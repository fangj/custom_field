require('./PageTest.less');
import Form from "react-jsonschema-form";
import restField from "../../components/rest_field";

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
        post: {
            title:'location',
            type: "string"
        }
    }
};
const formData = {
  done: false,
  post: "RqZemlMc8g0Phtqe",
  title: "A new task77"
};



const log = (type) => console.log.bind(console, type);

const ThumbView=(props)=><div>{props.data?props.data.title:""}</div>
const PostField=restField({url:'/api/post',keyField:'_id',thumbView:ThumbView});


const fields = {post: PostField};
const uiSchema = {
  post:{"ui:field": "post"}
}

ReactDOM.render(<Form schema={schema}
  formData={formData}
     uiSchema={uiSchema}
    fields={fields}
        onChange={log("changed")}
        onSubmit={log("submitted")}
        onError={log("errors")} />, document.getElementById('App'));


