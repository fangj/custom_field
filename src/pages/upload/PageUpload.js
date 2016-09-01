require('./PageUpload.less');
import UploadZone from "../../components/upload_zone";

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
                <UploadZone url="/upload" onUploaded={this.onUploaded.bind(this)} />
            </div>
        );
    }

    onUploaded(files){
        console.log(files[0])
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
