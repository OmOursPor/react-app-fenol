function HelloWorld (props) {
    const {name, age} = props

    return (
        <div>
            Hello {name}, {age} ans
        </div>
    )
}

export default HelloWorld;