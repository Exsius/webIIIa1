
// Generic paper card with sx prop because I hate tailwind and love mui

const Paper = (props) => (
    <div style={props.sx} className={`w-auto p-6 bg-white border border-gray-200 rounded-lg shadow${props.className ? ' ' + props.className : ''}`}>
        {props.children}
    </div>
)

export default Paper