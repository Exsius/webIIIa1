const Skeleton = (props) => (
    <div style={props.sx} className={`loading w-auto h-6 bg-gray-200 my-4 ${props.rounded && 'rounded-lg'} ${props.circular && 'rounded-full'}`} />
)

export default Skeleton