require('./PageUpload.less');
import UploadZone from "../../components/upload_zone";
import ImageUploader from "../../components/image_uploader";

class Upload extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div className="upload">
                page upload
                <ImageUploader/>
            </div>
        );
    }

    componentWillMount() {
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    componentWillUpdate(nextProps, nextState) {
    }

    componentDidUpdate(prevProps, prevState) {
    }

    componentWillUnmount() {
    }
}

ReactDOM.render(<Upload/>, document.getElementById('App'));

module.exports = Upload;
