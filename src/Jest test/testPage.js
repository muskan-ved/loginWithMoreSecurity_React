
export default function TestPage (props){
    return (
        <div>
            <div className="row">
            <a
               className={'container'}
               href={props.page || '#'}>
               {props.page}
           </a>
                <div className="col-md-12">
                    <h1>Test Page</h1>
                    <p>This is a test page {props.hello}</p> 
                </div>
                </div>
                </div>)
}