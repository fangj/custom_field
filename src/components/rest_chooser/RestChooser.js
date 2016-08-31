// require('./RestChooser.less');
import RestReader from "../../components/rest_reader";

const browser=(props)=>{
    const {data,thumbView,keyField,onChoose}=props;
    const ThumbView=thumbView;
    return (<div className="browser">
                    {data.map((d,i)=><div key={d[keyField]} onClick={()=>onChoose(d)} className="old"><ThumbView data={d}/></div>)}
            </div>)
}


class RestChooser extends React.Component {

    static propTypes  ={
        url: React.PropTypes.string.isRequired,
        keyField: React.PropTypes.string.isRequired,
        thumbView: React.PropTypes.func.isRequired,
        onChoose: React.PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
        };
    }



    render() {
        let me = this;
        const {url,thumbView,keyField,onChoose}=this.props;
        return (
              <RestReader view={browser} url={url} thumbView={thumbView} keyField={keyField} onChoose={onChoose}/>
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

module.exports = RestChooser;
