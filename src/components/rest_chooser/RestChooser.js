// require('./RestChooser.less');
import RestReader from "../../components/rest_reader";
import cx from "classnames";
const browser=(props)=>{
    const {data,thumbView,keyField,onChoose,chosen}=props;
    const ThumbView=thumbView;
    return (<div className="browser">
                    {data.map((d,i)=><div key={d[keyField]} onClick={()=>onChoose(d)} className={cx("old",{"chosen":chosen===d[keyField]})}><ThumbView data={d}/></div>)}
            </div>)
}


class RestChooser extends React.Component {

    static propTypes  ={
        url: React.PropTypes.string.isRequired,
        keyField: React.PropTypes.string.isRequired,
        thumbView: React.PropTypes.func.isRequired,
        onChoose: React.PropTypes.func.isRequired,
        chosen:React.PropTypes.string
    };

    constructor(props) {
        super(props);
        this.state = {
        };
    }



    render() {
        let me = this;
        const {url,thumbView,keyField,onChoose,chosen}=this.props;

        return (
              <RestReader view={browser} 
              url={url} thumbView={thumbView} keyField={keyField} onChoose={onChoose} chosen={chosen} />
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
